import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { RoadmapDetailPanel } from '../src/components/RoadmapDetailPanel'
import { RoadmapItem } from '../src/components/RoadmapItem'
import { RoadmapSection } from '../src/components/RoadmapSection'
import type { RoadmapItem as Item, RoadmapSection as Section } from '../src/data/roadmap'

afterEach(cleanup)

const plain: Item = { title: 'Plain', description: 'Just words.' }
const rich: Item = {
  title: 'Rich',
  description: 'Has more.',
  note: 'Suggested WPM: 1–2',
  links: [
    { label: 'First', url: 'https://example.com/1' },
    { label: 'Second', url: 'https://example.com/2' },
  ],
  details: [
    { paragraphs: ['Intro paragraph.'] },
    { heading: 'Steps', bullets: ['one', 'two'] },
    { heading: 'Both', paragraphs: ['para A', 'para B'], bullets: ['bullet A'] },
  ],
}

describe('RoadmapItem', () => {
  it('shows the title as plain text, with no button, when there are no details', () => {
    const { container } = render(<RoadmapItem item={plain} onOpen={vi.fn()} />)
    expect(screen.queryByRole('button')).toBeNull()
    expect(container.querySelector('h3')!.textContent).toBe('Plain')
    expect(container.querySelector('p')!.textContent).toBe('Just words.')
    expect(container.firstElementChild!.className).toBe('roadmap-item')
  })

  it('treats an empty details list the same as none', () => {
    const { container } = render(<RoadmapItem item={{ ...plain, details: [] }} onOpen={vi.fn()} />)
    expect(screen.queryByRole('button')).toBeNull()
    expect(container.firstElementChild!.className).toBe('roadmap-item')
  })

  it('makes the title a button when there are details, and opens that item when clicked', () => {
    const onOpen = vi.fn()
    const { container } = render(<RoadmapItem item={rich} onOpen={onOpen} />)
    expect(container.firstElementChild!.className).toBe('roadmap-item roadmap-item-clickable')
    fireEvent.click(screen.getByRole('button', { name: 'Rich' }))
    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(onOpen).toHaveBeenCalledWith(rich)
  })

  it('shows the note beside the title only when there is one', () => {
    const { container, rerender } = render(<RoadmapItem item={rich} onOpen={vi.fn()} />)
    expect(container.querySelector('.roadmap-item-note')!.textContent).toBe('Suggested WPM: 1–2')
    rerender(<RoadmapItem item={plain} onOpen={vi.fn()} />)
    expect(container.querySelector('.roadmap-item-note')).toBeNull()
  })

  it('lists links that open in a new tab without leaking the opener, only when there are some', () => {
    const { container, rerender } = render(<RoadmapItem item={rich} onOpen={vi.fn()} />)
    const links = [...container.querySelectorAll<HTMLAnchorElement>('.roadmap-item-links a')]
    expect(links.map((a) => [a.textContent, a.href])).toEqual([
      ['First', 'https://example.com/1'],
      ['Second', 'https://example.com/2'],
    ])
    for (const a of links) expect([a.target, a.rel]).toEqual(['_blank', 'noreferrer'])
    rerender(<RoadmapItem item={plain} onOpen={vi.fn()} />)
    expect(container.querySelector('.roadmap-item-links')).toBeNull()
  })
})

describe('RoadmapSection', () => {
  const section: Section = {
    title: '1. First',
    description: 'About the first.',
    items: [plain, rich],
  }

  it('shows the title and description, then every item in order', () => {
    const { container } = render(<RoadmapSection section={section} onOpenItem={vi.fn()} />)
    expect(container.querySelector('h2')!.textContent).toBe('1. First')
    expect(container.querySelector('header p')!.textContent).toBe('About the first.')
    expect([...container.querySelectorAll('.roadmap-item h3')].map((h) => h.textContent)).toEqual([
      'Plain',
      'Rich',
    ])
  })

  it('passes a click on an item up with that item', () => {
    const onOpenItem = vi.fn()
    render(<RoadmapSection section={section} onOpenItem={onOpenItem} />)
    fireEvent.click(screen.getByRole('button', { name: 'Rich' }))
    expect(onOpenItem).toHaveBeenCalledWith(rich)
    expect(onOpenItem).toHaveBeenCalledTimes(1)
  })
})

describe('RoadmapDetailPanel', () => {
  it('renders nothing without an item', () => {
    const { container } = render(<RoadmapDetailPanel item={null} onClose={vi.fn()} />)
    expect(container.innerHTML).toBe('')
  })

  it('is a modal dialog named by the item title', () => {
    render(<RoadmapDetailPanel item={rich} onClose={vi.fn()} />)
    const dialog = screen.getByRole('dialog', { name: 'Rich' })
    expect(dialog.getAttribute('aria-modal')).toBe('true')
    expect(within(dialog).getByRole('heading', { level: 2 }).textContent).toBe('Rich')
  })

  it('shows the note, the description, each detail block and the links', () => {
    const { container } = render(<RoadmapDetailPanel item={rich} onClose={vi.fn()} />)
    expect(container.querySelector('.detail-note')!.textContent).toBe('Suggested WPM: 1–2')
    expect(container.querySelector('.detail-description')!.textContent).toBe('Has more.')
    const blocks = [...container.querySelectorAll('.detail-block')]
    expect(blocks).toHaveLength(4) // 3 details + links
    expect(blocks[0].querySelector('h3')).toBeNull()
    expect([...blocks[0].querySelectorAll('p')].map((p) => p.textContent)).toEqual(['Intro paragraph.'])
    expect(blocks[1].querySelector('h3')!.textContent).toBe('Steps')
    expect([...blocks[1].querySelectorAll('li')].map((li) => li.textContent)).toEqual(['one', 'two'])
    expect(blocks[1].querySelector('p')).toBeNull()
    expect([...blocks[2].querySelectorAll('p')].map((p) => p.textContent)).toEqual(['para A', 'para B'])
    expect([...blocks[2].querySelectorAll('li')].map((li) => li.textContent)).toEqual(['bullet A'])
    expect(blocks[3].querySelector('h3')!.textContent).toBe('Links')
    const links = [...blocks[3].querySelectorAll<HTMLAnchorElement>('a')]
    expect(links.map((a) => [a.textContent, a.href, a.target, a.rel])).toEqual([
      ['First', 'https://example.com/1', '_blank', 'noreferrer'],
      ['Second', 'https://example.com/2', '_blank', 'noreferrer'],
    ])
  })

  it('leaves out the note, the blocks and the links an item does not have', () => {
    const { container } = render(<RoadmapDetailPanel item={plain} onClose={vi.fn()} />)
    expect(container.querySelector('.detail-note')).toBeNull()
    expect(container.querySelector('.detail-block')).toBeNull()
    expect(container.querySelector('.detail-description')!.textContent).toBe('Just words.')
  })

  it('moves focus to the close button when it opens', () => {
    render(<RoadmapDetailPanel item={rich} onClose={vi.fn()} />)
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Close' }))
  })

  it('closes from the button, from Escape, and from a click on the backdrop', () => {
    const onClose = vi.fn()
    const { container } = render(<RoadmapDetailPanel item={rich} onClose={onClose} />)
    fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalledTimes(1)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(2)
    fireEvent.click(container.querySelector('.detail-overlay')!)
    expect(onClose).toHaveBeenCalledTimes(3)
  })

  it('stays open for a click inside the panel, and for other keys', () => {
    const onClose = vi.fn()
    render(<RoadmapDetailPanel item={rich} onClose={onClose} />)
    fireEvent.click(screen.getByRole('dialog'))
    fireEvent.click(screen.getByRole('heading', { level: 2 }))
    for (const key of ['Enter', 'Tab', 'a', ' ']) fireEvent.keyDown(document, { key })
    expect(onClose).not.toHaveBeenCalled()
  })

  describe('focus trap', () => {
    const tab = (shiftKey = false) => {
      const event = new KeyboardEvent('keydown', { key: 'Tab', shiftKey, bubbles: true, cancelable: true })
      document.dispatchEvent(event)
      return event
    }

    it('wraps Tab from the last link back to the close button', () => {
      render(<RoadmapDetailPanel item={rich} onClose={vi.fn()} />)
      const links = screen.getAllByRole('link')
      links[links.length - 1].focus()
      const event = tab()
      expect(event.defaultPrevented).toBe(true)
      expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Close' }))
    })

    it('wraps Shift+Tab from the close button to the last link', () => {
      render(<RoadmapDetailPanel item={rich} onClose={vi.fn()} />)
      const links = screen.getAllByRole('link')
      expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Close' }))
      const event = tab(true)
      expect(event.defaultPrevented).toBe(true)
      expect(document.activeElement).toBe(links[links.length - 1])
    })

    it('leaves Tab alone in the middle of the dialog, so the browser moves focus', () => {
      render(<RoadmapDetailPanel item={rich} onClose={vi.fn()} />)
      expect(tab().defaultPrevented).toBe(false)
      screen.getAllByRole('link')[0].focus()
      expect(tab().defaultPrevented).toBe(false)
      expect(tab(true).defaultPrevented).toBe(false)
    })

    it('pulls focus back into the dialog when it is somewhere outside', () => {
      const outside = document.createElement('button')
      document.body.append(outside)
      render(<RoadmapDetailPanel item={rich} onClose={vi.fn()} />)
      outside.focus()
      const event = tab()
      expect(event.defaultPrevented).toBe(true)
      expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Close' }))
      outside.remove()
    })

    it('keeps focus on the only focusable element when there is just the close button', () => {
      render(<RoadmapDetailPanel item={plain} onClose={vi.fn()} />)
      const close = screen.getByRole('button', { name: 'Close' })
      expect(tab().defaultPrevented).toBe(true)
      expect(document.activeElement).toBe(close)
      expect(tab(true).defaultPrevented).toBe(true)
      expect(document.activeElement).toBe(close)
    })

    it('stops trapping Tab once the dialog is closed', () => {
      const { rerender } = render(<RoadmapDetailPanel item={rich} onClose={vi.fn()} />)
      rerender(<RoadmapDetailPanel item={null} onClose={vi.fn()} />)
      expect(tab().defaultPrevented).toBe(false)
    })
  })

  describe('background scroll lock', () => {
    afterEach(() => {
      document.body.style.overflow = ''
    })

    it('locks the page scroll while open and restores it when closed', () => {
      document.body.style.overflow = 'scroll'
      const { rerender } = render(<RoadmapDetailPanel item={rich} onClose={vi.fn()} />)
      expect(document.body.style.overflow).toBe('hidden')
      rerender(<RoadmapDetailPanel item={null} onClose={vi.fn()} />)
      expect(document.body.style.overflow).toBe('scroll')
    })

    it('restores the scroll when it is unmounted while open', () => {
      const { unmount } = render(<RoadmapDetailPanel item={rich} onClose={vi.fn()} />)
      unmount()
      expect(document.body.style.overflow).toBe('')
    })

    it('does not touch the page scroll while closed', () => {
      document.body.style.overflow = 'auto'
      render(<RoadmapDetailPanel item={null} onClose={vi.fn()} />)
      expect(document.body.style.overflow).toBe('auto')
    })
  })

  it('returns focus to whatever opened it when it closes', () => {
    const opener = document.createElement('button')
    document.body.append(opener)
    opener.focus()
    const { rerender } = render(<RoadmapDetailPanel item={rich} onClose={vi.fn()} />)
    expect(document.activeElement).not.toBe(opener)
    rerender(<RoadmapDetailPanel item={null} onClose={vi.fn()} />)
    expect(document.activeElement).toBe(opener)
    opener.remove()
  })

  it('stops listening for Escape once it is closed or gone', () => {
    const onClose = vi.fn()
    const { rerender, unmount } = render(<RoadmapDetailPanel item={rich} onClose={onClose} />)
    rerender(<RoadmapDetailPanel item={null} onClose={onClose} />)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).not.toHaveBeenCalled()
    rerender(<RoadmapDetailPanel item={rich} onClose={onClose} />)
    unmount()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).not.toHaveBeenCalled()
  })

  it('does not listen for Escape twice', () => {
    const onClose = vi.fn()
    render(<RoadmapDetailPanel item={rich} onClose={onClose} />)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('switching straight to another item shows it and keeps focus on the close button', () => {
    const { rerender } = render(<RoadmapDetailPanel item={rich} onClose={vi.fn()} />)
    rerender(<RoadmapDetailPanel item={{ ...plain, details: [{ paragraphs: ['x'] }] }} onClose={vi.fn()} />)
    expect(screen.getByRole('dialog', { name: 'Plain' })).toBeTruthy()
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Close' }))
  })
})
