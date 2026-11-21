import { describe, expect, it } from 'vitest'
import { roadmap } from '../src/data/roadmap'
import type { RoadmapItem } from '../src/data/roadmap'

const items = roadmap.flatMap((section) => section.items)
const dupes = (values: string[]) => values.filter((v, i) => values.indexOf(v) !== i)

describe('roadmap data', () => {
  it('has five numbered sections, in order', () => {
    expect(roadmap.map((s) => s.title.split('.')[0])).toEqual(['1', '2', '3', '4', '5'])
    for (const [i, section] of roadmap.entries()) {
      expect(section.title, section.title).toMatch(new RegExp(`^${i + 1}\\. \\S`))
    }
  })

  it('gives every section and item a title and a description with no stray whitespace', () => {
    for (const section of roadmap) {
      expect(section.title.trim(), section.title).toBe(section.title)
      expect(section.description.trim().length, section.title).toBeGreaterThan(0)
      expect(section.items.length, section.title).toBeGreaterThan(0)
    }
    for (const item of items) {
      expect(item.title.trim(), item.title).toBe(item.title)
      expect(item.title.length, item.title).toBeGreaterThan(0)
      expect(item.description.trim().length, item.title).toBeGreaterThan(0)
    }
  })

  it('uses titles that are unique, since they are React keys', () => {
    expect(dupes(roadmap.map((s) => s.title))).toEqual([])
    for (const section of roadmap) {
      expect(dupes(section.items.map((i) => i.title)), section.title).toEqual([])
    }
  })

  it('has no repeated link address inside one item, since they are React keys', () => {
    for (const item of items) {
      expect(dupes((item.links ?? []).map((l) => l.url)), item.title).toEqual([])
    }
  })

  it('has no repeated paragraph or bullet inside one block, since they are React keys', () => {
    for (const item of items) {
      for (const block of item.details ?? []) {
        expect(dupes(block.paragraphs ?? []), item.title).toEqual([])
        expect(dupes(block.bullets ?? []), item.title).toEqual([])
      }
    }
  })

  it('has only https links, each with a label, and no stray whitespace in the address', () => {
    let count = 0
    for (const item of items) {
      for (const link of item.links ?? []) {
        count++
        expect(link.label.trim().length, `${item.title}: ${link.url}`).toBeGreaterThan(0)
        expect(link.url, item.title).toBe(link.url.trim())
        expect(new URL(link.url).protocol, link.url).toBe('https:')
      }
    }
    expect(count).toBeGreaterThan(20)
  })

  it('gives each item with details non-empty blocks that have something to show', () => {
    for (const item of items) {
      for (const block of item.details ?? []) {
        const content = (block.paragraphs?.length ?? 0) + (block.bullets?.length ?? 0)
        expect(content, `${item.title}: ${block.heading ?? '(no heading)'}`).toBeGreaterThan(0)
        for (const text of [...(block.paragraphs ?? []), ...(block.bullets ?? [])]) {
          expect(text.trim().length, item.title).toBeGreaterThan(0)
        }
        if (block.heading !== undefined) expect(block.heading.trim().length, item.title).toBeGreaterThan(0)
      }
    }
  })

  it('writes every speed note as "Suggested WPM: low–high" with low below high', () => {
    const noted = items.filter((i): i is RoadmapItem & { note: string } => i.note !== undefined)
    expect(noted.length).toBeGreaterThan(0)
    for (const item of noted) {
      const match = /^Suggested WPM: (\d+)–(\d+)$/.exec(item.note)
      expect(match, `${item.title}: ${item.note}`).not.toBeNull()
      expect(Number(match![1]), item.title).toBeLessThan(Number(match![2]))
    }
  })

  it('has the speed ranges rise from one practice step to the next', () => {
    const range = (title: string) => {
      const note = items.find((i) => i.title === title)!.note!
      return [...note.matchAll(/\d+/g)].map((m) => Number(m[0]))
    }
    const steps = ['Practice the device layout', 'Practice letters in depth', 'Practice trigrams', 'Practice words']
    const lows = steps.map((t) => range(t)[0])
    expect(lows).toEqual([...lows].sort((a, b) => a - b))
    expect(range(steps[0])[0]).toBe(0)
  })

  it('lists the four tools named in the other-tools section', () => {
    const other = roadmap[4]
    expect(other.items.map((i) => i.title)).toEqual(['Mira', 'Sirius', 'Alnasl', 'Arcturus'])
    // Sirius is a desktop app, so it points at its GitHub releases; the others are web apps.
    for (const item of other.items) {
      expect(item.links, item.title).toHaveLength(1)
      const { host, pathname } = new URL(item.links![0].url)
      expect(['andy23512.github.io', 'github.com'], item.title).toContain(host)
      expect(pathname.toLowerCase(), item.title).toContain(item.title.toLowerCase())
    }
    expect(new URL(other.items[1].links![0].url).host).toBe('github.com')
  })
})
