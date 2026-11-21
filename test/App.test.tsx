import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from '../src/App'
import { roadmap } from '../src/data/roadmap'

afterEach(cleanup)

const clickable = roadmap.flatMap((s) => s.items).filter((i) => i.details?.length)
const plain = roadmap.flatMap((s) => s.items).filter((i) => !i.details?.length)

describe('App', () => {
  it('shows the title, the subtitle and every section of the roadmap in order', () => {
    const { container } = render(<App />)
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Atlas')
    expect(container.querySelector('.app-subtitle')!.textContent).toMatch(/learning roadmap for CharaChorder 3D input devices/)
    expect([...container.querySelectorAll('.roadmap-section h2')].map((h) => h.textContent)).toEqual(
      roadmap.map((s) => s.title),
    )
    expect(container.querySelectorAll('.roadmap-item')).toHaveLength(roadmap.flatMap((s) => s.items).length)
  })

  it('links to the source in a new tab', () => {
    render(<App />)
    const link = screen.getByRole('link', { name: 'Source on GitHub' }) as HTMLAnchorElement
    expect(link.href).toBe('https://github.com/andy23512/atlas')
    expect([link.target, link.rel]).toEqual(['_blank', 'noopener'])
  })

  it('has no panel open at first', () => {
    render(<App />)
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('makes a button of exactly the items that have details', () => {
    render(<App />)
    const buttons = screen.getAllByRole('button').map((b) => b.textContent)
    expect(buttons).toEqual(clickable.map((i) => i.title))
    for (const item of plain) expect(screen.queryByRole('button', { name: item.title })).toBeNull()
  })

  it('opens the panel for the item clicked, and for each item in turn', () => {
    render(<App />)
    for (const item of clickable) {
      fireEvent.click(screen.getByRole('button', { name: item.title }))
      expect(screen.getByRole('dialog', { name: item.title })).toBeTruthy()
      fireEvent.keyDown(document, { key: 'Escape' })
      expect(screen.queryByRole('dialog')).toBeNull()
    }
  })

  it('closes the panel with the button and with the backdrop, and puts focus back on the item', () => {
    const { container } = render(<App />)
    const open = screen.getByRole('button', { name: clickable[0].title })
    open.focus()
    fireEvent.click(open)
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Close' }))
    fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(document.activeElement).toBe(open)
    fireEvent.click(open)
    fireEvent.click(container.querySelector('.detail-overlay')!)
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(document.activeElement).toBe(open)
  })

  it('opens the same item again after it was closed', () => {
    render(<App />)
    const title = clickable[0].title
    fireEvent.click(screen.getByRole('button', { name: title }))
    fireEvent.keyDown(document, { key: 'Escape' })
    fireEvent.click(screen.getByRole('button', { name: title }))
    expect(screen.getByRole('dialog', { name: title })).toBeTruthy()
  })

  it('shows every link of the opened item in the panel', () => {
    render(<App />)
    const item = clickable.find((i) => i.links?.length)!
    fireEvent.click(screen.getByRole('button', { name: item.title }))
    const dialog = screen.getByRole('dialog')
    const hrefs = [...dialog.querySelectorAll<HTMLAnchorElement>('.detail-links a')].map((a) => a.href)
    expect(hrefs).toEqual(item.links!.map((l) => new URL(l.url).href))
  })
})
