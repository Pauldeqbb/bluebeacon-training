import { useState, useEffect, useRef } from 'react'
import Sidebar from './components/Sidebar.jsx'
import UnitView from './components/UnitView.jsx'
import AITutor from './components/AITutor.jsx'
import HomePage from './components/HomePage.jsx'
import { resolveClient, buildUrl, buildHomeUrl } from './lib/resolveClient.js'
import { loadClient } from './clients/index.js'
import { useProgress } from './lib/useProgress.js'
import { buildSystemPrompt } from './lib/buildSystemPrompt.js'

export default function App() {
  const [config, setConfig] = useState(null)
  const [activeModule, setActiveModule] = useState(0)
  const [activeUnit, setActiveUnit] = useState(0)
  const [showTutor, setShowTutor] = useState(false)
  const [showHome, setShowHome] = useState(false)
  const [clientSlug, setClientSlug] = useState(null)
  const [loading, setLoading] = useState(true)
  const mainRef = useRef(null)

  const { completed, quizResults, saveQuizResult } = useProgress(clientSlug || 'default')

  useEffect(() => {
    const { slug, unitIndex, showHome: startOnHome } = resolveClient()
    setClientSlug(slug)
    setActiveUnit(unitIndex)
    setShowHome(startOnHome)

    loadClient(slug).then(cfg => {
      setConfig(cfg)
      document.title = `${cfg.systemName} — ${cfg.shortName} Training`
      setLoading(false)
    })
  }, [])

  const goToUnit = (moduleIndex, unitIndex) => {
    setActiveModule(moduleIndex)
    setActiveUnit(unitIndex)
    setShowHome(false)
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    window.history.pushState({}, '', buildUrl(clientSlug, unitIndex))
  }

  const goHome = () => {
    setShowHome(true)
    window.history.pushState({}, '', buildHomeUrl(clientSlug))
  }

  const handleQuizSubmit = (unitIndex, answers, score, total) => {
    saveQuizResult(unitIndex, answers, score, total)
  }

  if (loading) {
    return (
      <div style={{
        height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#f0f4f8', flexDirection: 'column', gap: 12,
      }}>
        <div style={{ fontSize: 32 }}>🏮</div>
        <div style={{ fontSize: 14, color: '#6b7280' }}>Loading training...</div>
      </div>
    )
  }

  const systemPrompt = buildSystemPrompt(config)
  // Current module's units (only available modules have .units)
  const currentModuleUnits = config.modules[activeModule]?.units || config.modules[0]?.units || []
  const currentUnit = currentModuleUnits[activeUnit] || currentModuleUnits[0]

  // Home page view
  if (showHome) {
    return (
      <div style={{
        display: 'flex', height: '100vh', overflow: 'hidden',
        fontFamily: "-apple-system, 'Segoe UI', sans-serif", fontSize: 14,
      }}>
        <div style={{ flex: 1, overflow: 'auto' }}>
          <HomePage
            config={config}
            completed={completed}
            onSelectModule={(moduleIndex, unitIndex = 0) => goToUnit(moduleIndex, unitIndex)}
            onToggleTutor={() => setShowTutor(v => !v)}
            showTutor={showTutor}
          />
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

  // Module / unit view
  return (
    <div style={{
      display: 'flex', height: '100vh',
      fontFamily: "-apple-system, 'Segoe UI', sans-serif",
      background: '#f0f4f8', overflow: 'hidden', fontSize: 14,
    }}>
      <Sidebar
        config={config}
        modules={currentModuleUnits}
        activeUnit={activeUnit}
        completed={completed}
        showTutor={showTutor}
        onUnitSelect={(i) => goToUnit(activeModule, i)}
        onToggleTutor={() => setShowTutor(v => !v)}
        onHome={goHome}
      />

      <div ref={mainRef} style={{ flex: 1, overflow: 'auto', display: 'flex' }}>
        {currentUnit && (
          <UnitView
            unit={currentUnit}
            unitIndex={activeUnit}
            totalUnits={currentModuleUnits.length}
            config={config}
            quizResult={quizResults[activeUnit]}
            completed={completed}
            onQuizSubmit={handleQuizSubmit}
            onNext={() => goToUnit(activeModule, activeUnit + 1)}
            onPrev={() => goToUnit(activeModule, activeUnit - 1)}
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
