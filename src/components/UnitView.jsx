import KnowledgeCheck from './KnowledgeCheck.jsx'
import ScribeEmbed from './ScribeEmbed.jsx'

const C = {
  navy: '#0f1f4b', border: '#e2e8f0', surf: '#f8fafc',
  textMid: '#374151', textLight: '#6b7280', textHint: '#9ca3af',
  success: '#059669',
}

export default function UnitView({
  unit, unitIndex, totalUnits, config,
  quizResult, completed, onQuizSubmit, onNext, onPrev
}) {
  const { brand } = config
  const isDone = completed.has(unitIndex)

  return (
    <div style={{ flex: 1, overflow: 'auto' }}>
      {/* Unit header */}
      <div style={{
        background: 'white', borderBottom: `1px solid ${C.border}`,
        padding: '20px 28px', flexShrink: 0
      }}>
        <div style={{
          fontSize: 11, color: C.textHint, letterSpacing: '0.05em',
          textTransform: 'uppercase', fontWeight: 600, marginBottom: 7
        }}>
          Unit {unitIndex + 1} of {totalUnits} · {unit.duration}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 30 }}>{unit.emoji}</span>
          <div>
            <h1 style={{
              fontSize: 20, fontWeight: 700, color: C.navy,
              letterSpacing: '-0.02em', margin: 0, lineHeight: 1.2
            }}>{unit.title}</h1>
            <p style={{ margin: '4px 0 0', color: C.textLight, fontSize: 13 }}>
              {unit.tagline}
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: '22px 28px', maxWidth: 760 }}>

        {/* Overview */}
        <div style={{
          background: 'white', borderRadius: 12, padding: '20px 24px',
          marginBottom: 16, border: `1px solid ${C.border}`
        }}>
          <h2 style={{
            fontSize: 13, fontWeight: 600, color: C.navy, margin: '0 0 12px',
            display: 'flex', alignItems: 'center', gap: 7
          }}>
            <span style={{
              background: '#eff6ff', width: 22, height: 22, borderRadius: 6,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12
            }}>📖</span>
            Overview
          </h2>
          <div style={{ color: C.textMid, lineHeight: 1.8, fontSize: 13 }}>
            {unit.summary.split('\n\n').map((p, i) => (
              <p key={i} style={{ margin: i === 0 ? 0 : '10px 0 0' }}>{p}</p>
            ))}
          </div>
        </div>

        {/* Scribe walkthrough */}
        <ScribeEmbed url={unit.scribeUrl} title={unit.scribeTitle} />

        {/* Key concepts */}
        {unit.concepts?.length > 0 && (
          <div style={{
            background: 'white', borderRadius: 12, padding: '20px 24px',
            marginBottom: 16, border: `1px solid ${C.border}`
          }}>
            <h2 style={{
              fontSize: 13, fontWeight: 600, color: C.navy, margin: '0 0 14px',
              display: 'flex', alignItems: 'center', gap: 7
            }}>
              <span style={{
                background: '#fff7ed', width: 22, height: 22, borderRadius: 6,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12
              }}>🔑</span>
              Key Concepts
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {unit.concepts.map((c, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 11, padding: '9px 13px',
                  background: C.surf, borderRadius: 8, border: '1px solid #f1f5f9'
                }}>
                  <div style={{
                    width: 3, background: brand.accent, borderRadius: 2,
                    flexShrink: 0, alignSelf: 'stretch', minHeight: 18
                  }} />
                  <div>
                    <span style={{ fontWeight: 600, fontSize: 12, color: C.navy }}>{c.term}</span>
                    <span style={{ fontSize: 12, color: C.textLight, marginLeft: 7 }}>— {c.definition}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Watch-outs */}
        {unit.watchouts?.length > 0 && (
          <div style={{
            background: '#fffbeb', borderRadius: 12, padding: '20px 24px',
            marginBottom: 16, border: '1px solid #fde68a'
          }}>
            <h2 style={{
              fontSize: 13, fontWeight: 600, color: '#92400e', margin: '0 0 14px',
              display: 'flex', alignItems: 'center', gap: 7
            }}>
              <span style={{ fontSize: 15 }}>⚠️</span> Watch-outs
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {unit.watchouts.map((w, i) => (
                <div key={i}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#92400e', marginBottom: 2 }}>
                    {w.title}
                  </div>
                  <div style={{ fontSize: 13, color: '#78350f', lineHeight: 1.6 }}>{w.detail}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Knowledge check */}
        <KnowledgeCheck
          unit={unit}
          unitIndex={unitIndex}
          saved={quizResult}
          onSubmit={(answers, score, total) => onQuizSubmit(unitIndex, answers, score, total)}
          accentColor={brand.primary}
        />

        {/* Navigation */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', paddingBottom: 32
        }}>
          <button
            onClick={onPrev}
            disabled={unitIndex === 0}
            style={{
              padding: '9px 18px',
              background: unitIndex === 0 ? C.border : 'white',
              color: unitIndex === 0 ? C.textHint : C.navy,
              border: `1px solid ${C.border}`, borderRadius: 8,
              cursor: unitIndex === 0 ? 'not-allowed' : 'pointer',
              fontSize: 13, fontWeight: 500, fontFamily: 'inherit'
            }}>
            ← Previous
          </button>

          <span style={{ fontSize: 11, color: C.textHint }}>
            {isDone ? '✓ Unit complete' : 'Finish quiz to mark done'}
          </span>

          {unitIndex < totalUnits - 1 ? (
            <button onClick={onNext} style={{
              padding: '9px 20px', background: brand.accent, color: 'white',
              border: 'none', borderRadius: 8, cursor: 'pointer',
              fontSize: 13, fontWeight: 600, fontFamily: 'inherit'
            }}>
              Next Unit →
            </button>
          ) : (
            <div style={{
              padding: '9px 18px',
              background: isDone ? '#10b981' : C.border,
              color: isDone ? 'white' : C.textHint,
              borderRadius: 8, fontSize: 13, fontWeight: 500
            }}>
              {isDone ? '🎉 All done!' : 'Finish all units'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
