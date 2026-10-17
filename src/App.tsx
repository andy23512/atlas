import { useCallback, useState } from 'react'
import { roadmap } from './data/roadmap'
import type { RoadmapItem } from './data/roadmap'
import { RoadmapSection } from './components/RoadmapSection'
import { RoadmapDetailPanel } from './components/RoadmapDetailPanel'
import './App.css'

function App() {
  const [selected, setSelected] = useState<RoadmapItem | null>(null)
  const closePanel = useCallback(() => setSelected(null), [])

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Atlas</h1>
        <p className="app-subtitle">
          An unofficial learning roadmap for CharaChorder 3D input devices — from
          before you have a device through chorded entry and beyond.
        </p>
      </header>
      <main className="app-roadmap">
        {roadmap.map((section) => (
          <RoadmapSection
            key={section.title}
            section={section}
            onOpenItem={setSelected}
          />
        ))}
      </main>
      <RoadmapDetailPanel item={selected} onClose={closePanel} />
    </div>
  )
}

export default App
