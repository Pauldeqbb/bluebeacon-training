export default function Sidebar({ config, modules, activeUnit, completed, showTutor, onUnitSelect, onToggleTutor, onHome }) {
  const { brand, systemName, shortName } = config
  const pct = Math.round((completed.size / modules.length) * 100)

  return (
    <div style={{
      width: 268, background: brand.primary, display: 'flex',
      flexDirection: 'column', flexShrink: 0, overflow: 'hidden'
    }}>
      {/* Brand */}
      <div style={{ padding: '18px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        {/* Back to home */}
        <button onClick={onHome} style={{
          display: 'flex', alignItems: 'center', gap: 5,
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.38)', fontSize: 11, padding: '0 0 12px',
          fontFamily: 'inherit', transition: 'color 0.15s',
        }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.38)'}
        >
          ← All modules
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{
            width: 34, height: 34, background: brand.accent, borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, flexShrink: 0
          }}>
            {brand.emoji}
          </div>
          <div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: 13, letterSpacing: '-0.01em' }}>
              {systemName}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>
              {shortName} Training
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 10, padding: '11px 13px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>Your progress</span>
            <span style={{ color: brand.accent, fontSize: 12, fontWeight: 700 }}>
              {completed.size}/{modules.length} units
            </span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 4, height: 4, overflow: 'hidden' }}>
            <div style={{
              background: brand.accent, height: '100%', width: `${pct}%`,
              borderRadius: 4, transition: 'width 0.6s ease'
            }} />
          </div>
          {pct === 100 && (
            <div style={{ marginTop: 8, fontSize: 12, color: '#6ee7b7', fontWeight: 500 }}>
              🎉 Module complete!
            </div>
          )}
        </div>
      </div>

      {/* Unit list */}
      <div style={{ flex: 1, overflow: 'auto', padding: '8px 8px' }}>
        <div style={{
          fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.28)', padding: '10px 8px 5px', fontWeight: 600
        }}>
          Units
        </div>
        {modules.map((unit, i) => {
          const isActive = i === activeUnit
          const isDone = completed.has(i)
          return (
            <button key={i} onClick={() => onUnitSelect(i)} style={{
              width: '100%', textAlign: 'left',
              background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
              border: `1px solid ${isActive ? 'rgba(255,255,255,0.15)' : 'transparent'}`,
              borderRadius: 9, padding: '9px 11px', marginBottom: 2,
              cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'inherit'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                <div style={{
                  width: 21, height: 21, borderRadius: '50%',
                  background: isDone ? '#10b981' : isActive ? brand.accent : 'rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, color: 'white', fontWeight: 700,
                  flexShrink: 0, marginTop: 2, transition: 'background 0.3s'
                }}>
                  {isDone ? '✓' : i + 1}
                </div>
                <div>
                  <div style={{
                    color: isActive ? 'white' : 'rgba(255,255,255,0.62)',
                    fontSize: 12, fontWeight: isActive ? 600 : 400, lineHeight: 1.35
                  }}>
                    {unit.title}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.28)', fontSize: 10, marginTop: 1 }}>
                    {unit.duration}
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* AI Tutor toggle */}
      <div style={{ padding: '8px 8px 14px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <button onClick={onToggleTutor} style={{
          width: '100%',
          background: showTutor ? 'rgba(0,153,184,0.25)' : 'rgba(0,153,184,0.1)',
          border: `1px solid ${showTutor ? 'rgba(0,153,184,0.45)' : 'rgba(0,153,184,0.2)'}`,
          borderRadius: 9, padding: '10px 13px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 9,
          transition: 'all 0.2s', fontFamily: 'inherit'
        }}>
          <div style={{
            width: 28, height: 28, background: '#0099b8', borderRadius: 7,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 15, flexShrink: 0
          }}>🤖</div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ color: 'white', fontSize: 12, fontWeight: 600 }}>AI Tutor</div>
            <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: 10 }}>
              {showTutor ? 'Click to close' : 'Ask me anything'}
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}
