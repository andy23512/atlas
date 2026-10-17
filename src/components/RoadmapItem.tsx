import type { RoadmapItem as RoadmapItemData } from '../data/roadmap'
import './RoadmapItem.css'

export function RoadmapItem({
  item,
  onOpen,
}: {
  item: RoadmapItemData
  onOpen: (item: RoadmapItemData) => void
}) {
  const hasDetails = !!item.details?.length
  return (
    <div className={`roadmap-item${hasDetails ? ' roadmap-item-clickable' : ''}`}>
      <div className="roadmap-item-heading">
        <h3>
          {hasDetails ? (
            <button
              type="button"
              className="roadmap-item-open"
              onClick={() => onOpen(item)}
            >
              {item.title}
            </button>
          ) : (
            item.title
          )}
        </h3>
        {item.note && <span className="roadmap-item-note">{item.note}</span>}
      </div>
      <p>{item.description}</p>
      {item.links && (
        <ul className="roadmap-item-links">
          {item.links.map((link) => (
            <li key={link.url}>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
