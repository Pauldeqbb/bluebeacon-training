import { useState, useEffect, useRef } from 'react'
import Sidebar from './components/Sidebar.jsx'
import UnitView from './components/UnitView.jsx'
import AITutor from './components/AITutor.jsx'
import { resolveClient, buildUrl } from './lib/resolveClient.js'
import { loadClient } from './clients/index.js'
import { useProgress } from './lib/useProgress.js'
import { buildSystemPrompt } from './lib/buildSystemPrompt.js'

export default function App() {
  const [config, setConfig] = useState(null)
  const [modules, setModules] = useState([])
  const [activeModule, setActiveModule] = useState(0)
  const [activeUnit, setActiveUnit] = useState(0)
  const [showTutor, setShowTutor] = useState(false)
  const [clientSlug, setClientSlug] = useState(null)
  const [loading, setLoading] = useState(true)
  const mainRef = useRef(null)

  const { completed, quizResults, saveQuizResult } = useProgress(clientSlug || 'default')

  // Resolve client from URL and load config
  useEffect(() => {
    const { slug, unitIndex } = resolveClient()
    setClientSlug(slug)
    setActiveUnit(unitIndex)

    loadClient(slug).then(cfg => {
      setConfig(cfg)
      // Flatten all module units for now (single module MVP)
      setModules(cfg.modules[0]?.units || [])
      document.title = `${cfg.systemName} — ${cfg.shortName} Training`
      setLoading(false)
    })
  }, [])

  const goToUnit = (index) => {
    setActiveUnit(index)
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    // Update URL without page reload
    const url = buildUrl(clientSlug, index)
    window.history.pushState({}, '', url)
  }

  const handleQuizSubmit = (unitIndex, answers, score, total) => {
    saveQuizResult(unitIndex, answers, score, total)
  }

  if (loading) {
    return (
      <div style={{
        height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#f0f4f8', flexDirection: 'column', gap: 12
      }}>
        <div style={{ fontSize: 32 }}>🏮</div>
        <div style={{ fontSize: 14, color: '#6b7280' }}>Loading training module...</div>
      </div>
    )
  }

  const systemPrompt = buildSystemPrompt(config)
  const currentUnits = modules
  const currentUnit = currentUnits[activeUnit] || currentUnits[0]

  return (
    <div style={{
      display: 'flex', height: '100vh',
      fontFamily: "-apple-system, 'Segoe UI', sans-serif",
      background: '#f0f4f8', overflow: 'hidden', fontSize: 14
    }}>
      <Sidebar
        config={config}
        modules={currentUnits}
        activeUnit={activeUnit}
        completed={completed}
        showTutor={showTutor}
        onUnitSelect={goToUnit}
        onToggleTutor={() => setShowTutor(v => !v)}
      />

      <div ref={mainRef} style={{ flex: 1, overflow: 'auto', display: 'flex' }}>
        {currentUnit && (
          <UnitView
            unit={currentUnit}
            unitIndex={activeUnit}
            totalUnits={currentUnits.length}
            config={config}
            quizResult={quizResults[activeUnit]}
            completed={completed}
            onQuizSubmit={handleQuizSubmit}
            onNext={() => goToUnit(activeUnit + 1)}
            onPrev={() => goToUnit(activeUnit - 1)}
          />
        )}
      </div>

      {showTutor && (
        <AITutor
          systemPrompt={systemPrompt}
          config={config}
          onClose={() => setShowTutor(false)}
        />
      )}
    </div>
  )
}
