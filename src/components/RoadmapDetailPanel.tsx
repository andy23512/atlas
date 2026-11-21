import { useEffect, useRef } from 'react'
import type { RoadmapItem } from '../data/roadmap'
import './RoadmapDetailPanel.css'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function RoadmapDetailPanel({
  item,
  onClose,
}: {
  item: RoadmapItem | null
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!item) return
    const opener = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    // The page behind the dialog must not scroll while it is open.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      // Keep Tab inside the dialog: wrap around at either end.
      const panel = panelRef.current
      if (!panel) return
      const focusable = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)]
      if (focusable.length === 0) {
        e.preventDefault()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement
      if (!panel.contains(active)) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      opener?.focus()
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div className="detail-overlay" onClick={onClose}>
      <aside
        ref={panelRef}
        className="detail-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="detail-close"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>
        <h2 id="detail-title">{item.title}</h2>
        {item.note && <p className="detail-note">{item.note}</p>}
        <p className="detail-description">{item.description}</p>
        {item.details?.map((block, i) => (
          <section key={i} className="detail-block">
            {block.heading && <h3>{block.heading}</h3>}
            {block.paragraphs?.map((text) => <p key={text}>{text}</p>)}
            {block.bullets && (
              <ul>
                {block.bullets.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
        {item.links && (
          <section className="detail-block">
            <h3>Links</h3>
            <ul className="detail-links">
              {item.links.map((link) => (
                <li key={link.url}>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </aside>
    </div>
  )
}
