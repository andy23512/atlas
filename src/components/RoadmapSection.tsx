import type { RoadmapSection as RoadmapSectionData } from '../data/roadmap'
import { RoadmapItem } from './RoadmapItem'
import './RoadmapSection.css'

export function RoadmapSection({ section }: { section: RoadmapSectionData }) {
  return (
    <section className="roadmap-section">
      <header>
        <h2>{section.title}</h2>
        <p>{section.description}</p>
      </header>
      <div className="roadmap-section-items">
        {section.items.map((item) => (
          <RoadmapItem key={item.title} item={item} />
        ))}
      </div>
    </section>
  )
}
