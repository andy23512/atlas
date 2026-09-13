import { roadmap } from './data/roadmap'
import { RoadmapSection } from './components/RoadmapSection'
import './App.css'

function App() {
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
          <RoadmapSection key={section.title} section={section} />
        ))}
      </main>
    </div>
  )
}

export default App
