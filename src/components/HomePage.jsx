const C = {
  border: '#e2e8f0',
  surf: '#f8fafc',
  text: '#1e293b',
  textMid: '#374151',
  textLight: '#6b7280',
  textHint: '#9ca3af',
  bg: '#f0f4f8',
}

export default function HomePage({ config, completed, onSelectModule, onToggleTutor, showTutor }) {
  const { brand, systemName, shortName, modules } = config

  // First module is the available one (Care Plans); rest are coming soon
  const availableModule = modules.find(m => !m.comingSoon)
  const totalUnits = availableModule?.units?.length || 0
  const completedCount = completed.size
  const overallPct = totalUnits > 0 ? Math.round((completedCount / totalUnits) * 100) : 0
  const hasProgress = completedCount > 0

  return (
    <div style={{
      minHeight: '100vh', background: C.bg,
      fontFamily: "-apple-system, 'Segoe UI', sans-serif", fontSize: 14,
    }}>

      {/* Header */}
      <div style={{ background: brand.primary }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '20px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 42, height: 42, background: brand.accent, borderRadius: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
              }}>
                {brand.emoji}
              </div>
              <div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: 17, letterSpacing: '-0.01em' }}>
                  {systemName}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>
                  {shortName} Training Platform
                </div>
              </div>
            </div>

            <button onClick={onToggleTutor} style={{
              background: showTutor ? 'rgba(0,153,184,0.3)' : 'rgba(0,153,184,0.12)',
              border: `1px solid ${showTutor ? 'rgba(0,153,184,0.5)' : 'rgba(0,153,184,0.25)'}`,
              borderRadius: 9, padding: '8px 14px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 8,
              transition: 'all 0.2s', fontFamily: 'inherit',
            }}>
              <span style={{ fontSize: 15 }}>🤖</span>
              <span style={{ color: 'white', fontSize: 12, fontWeight: 500 }}>AI Tutor</span>
            </button>
          </div>

          {/* Hero text */}
          <div style={{ marginTop: 28, paddingBottom: 32 }}>
            <h1 style={{
              color: 'white', fontSize: 24, fontWeight: 700, margin: '0 0 8px',
              letterSpacing: '-0.02em',
            }}>
              Welcome to {shortName} Training
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, margin: 0, maxWidth: 540 }}>
              Learn how to use {systemName} with guided lessons, interactive walkthroughs, and AI support.
            </p>

            {/* Progress card — only shown once they've started */}
            {hasProgress && (
              <div style={{
                marginTop: 22, background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12, padding: '14px 18px',
                display: 'flex', alignItems: 'center', gap: 16, maxWidth: 400,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    marginBottom: 7, alignItems: 'baseline',
                  }}>
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>
                      Care Plan Management
                    </span>
                    <span style={{ color: brand.accent, fontSize: 12, fontWeight: 700 }}>
                      {completedCount}/{totalUnits}
                    </span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 4, height: 5, overflow: 'hidden' }}>
                    <div style={{
                      background: overallPct === 100 ? '#10b981' : brand.accent,
                      height: '100%', width: `${overallPct}%`,
                      borderRadius: 4, transition: 'width 0.6s ease',
                    }} />
                  </div>
                  {overallPct === 100 && (
                    <div style={{ color: '#6ee7b7', fontSize: 11, marginTop: 5, fontWeight: 500 }}>
                      Module complete!
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Module grid */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 28px' }}>
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ color: C.text, fontSize: 16, fontWeight: 600, margin: '0 0 4px' }}>
            Training Modules
          </h2>
          <p style={{ color: C.textLight, fontSize: 13, margin: 0 }}>
            {modules.filter(m => !m.comingSoon).length} module available ·{' '}
            {modules.filter(m => m.comingSoon).length} coming soon
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
          gap: 16,
        }}>
          {modules.map((module, i) => {
            // For the first (available) module pass the real completed set; others have no progress
            const moduleCompleted = (!module.comingSoon && i === 0) ? completed : new Set()
            // Find the first incomplete unit to resume at
            const nextUnit = !module.comingSoon && module.units
              ? (module.units.findIndex((_, j) => !moduleCompleted.has(j)) ?? 0)
              : 0
            return (
              <ModuleCard
                key={module.id}
                module={module}
                moduleIndex={i}
                completed={moduleCompleted}
                brand={brand}
                onSelect={() => onSelectModule(i, Math.max(0, nextUnit))}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

function ModuleCard({ module, moduleIndex, completed, brand, onSelect }) {
  const totalUnits = module.comingSoon ? (module.totalUnits || 0) : module.units.length
  const completedCount = completed.size
  const pct = totalUnits > 0 ? Math.round((completedCount / totalUnits) * 100) : 0
  const isComplete = pct === 100
  const hasProgress = completedCount > 0 && !module.comingSoon

  let ctaLabel = 'Start module'
  if (isComplete) ctaLabel = 'Review module'
  else if (hasProgress) ctaLabel = 'Continue'

  return (
    <div
      onClick={!module.comingSoon ? onSelect : undefined}
      style={{
        background: 'white',
        borderRadius: 14,
        padding: '22px 24px',
        border: `1px solid ${!module.comingSoon && hasProgress ? `${brand.accent}40` : C.border}`,
        cursor: module.comingSoon ? 'default' : 'pointer',
        opacity: module.comingSoon ? 0.6 : 1,
        transition: 'box-shadow 0.15s, border-color 0.15s',
        position: 'relative',
      }}
      onMouseEnter={e => {
        if (!module.comingSoon) e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Coming soon badge */}
      {module.comingSoon && (
        <div style={{
          position: 'absolute', top: 16, right: 16,
          background: '#f1f5f9', color: '#64748b',
          fontSize: 10, fontWeight: 600, letterSpacing: '0.06em',
          padding: '3px 8px', borderRadius: 20, textTransform: 'uppercase',
        }}>
          Coming Soon
        </div>
      )}

      {/* Complete badge */}
      {isComplete && (
        <div style={{
          position: 'absolute', top: 16, right: 16,
          background: '#ecfdf5', color: '#059669',
          fontSize: 10, fontWeight: 600, letterSpacing: '0.06em',
          padding: '3px 8px', borderRadius: 20, textTransform: 'uppercase',
        }}>
          Complete
        </div>
      )}

      {/* Module icon + title row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 10 }}>
        <div style={{
          width: 48, height: 48, flexShrink: 0,
          background: module.comingSoon ? '#f1f5f9' : `${brand.accent}15`,
          borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
        }}>
          {module.emoji || '📚'}
        </div>
        <div style={{ paddingTop: 2 }}>
          <div style={{ fontWeight: 600, fontSize: 15, color: C.text, lineHeight: 1.3 }}>
            {module.title}
          </div>
          <div style={{ color: C.textHint, fontSize: 11, marginTop: 3 }}>
            {totalUnits} units · {module.totalDuration || computeDuration(module)}
          </div>
        </div>
      </div>

      {/* Description */}
      <p style={{ color: '#475569', fontSize: 13, lineHeight: 1.6, margin: '0 0 16px' }}>
        {module.description}
      </p>

      {/* Progress bar (only when in progress) */}
      {hasProgress && !isComplete && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ background: '#f1f5f9', borderRadius: 4, height: 4, overflow: 'hidden' }}>
            <div style={{
              background: brand.accent, height: '100%', width: `${pct}%`,
              borderRadius: 4, transition: 'width 0.6s ease',
            }} />
          </div>
          <div style={{ color: C.textHint, fontSize: 11, marginTop: 4 }}>
            {completedCount} of {totalUnits} units complete
          </div>
        </div>
      )}

      {/* CTA */}
      {!module.comingSoon && (
        <button
          onClick={e => { e.stopPropagation(); onSelect() }}
          style={{
            background: isComplete ? '#f0fdf4' : brand.accent,
            color: isComplete ? '#16a34a' : 'white',
            border: isComplete ? '1px solid #bbf7d0' : 'none',
            borderRadius: 8, padding: '8px 16px',
            fontSize: 13, fontWeight: 500, cursor: 'pointer',
            fontFamily: 'inherit', transition: 'opacity 0.15s',
          }}
        >
          {ctaLabel}
        </button>
      )}

      {/* Unit preview chips (available modules only) */}
      {!module.comingSoon && module.units && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 14 }}>
          {module.units.map((unit, i) => {
            const done = completed.has(i)
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 4,
                background: done ? '#f0fdf4' : '#f8fafc',
                border: `1px solid ${done ? '#bbf7d0' : C.border}`,
                borderRadius: 20, padding: '3px 9px',
                fontSize: 11, color: done ? '#16a34a' : C.textLight,
              }}>
                {done ? '✓' : unit.emoji}
                <span>{unit.title}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function computeDuration(module) {
  if (!module.units) return ''
  const mins = module.units.reduce((sum, u) => {
    const m = u.duration?.match(/(\d+)/)
    return sum + (m ? parseInt(m[1], 10) : 0)
  }, 0)
  return mins >= 60 ? `~${(mins / 60).toFixed(1).replace('.0', '')} hrs` : `~${mins} mins`
}
