import { useState, useEffect } from 'react'

const C = {
  border: '#e2e8f0', surf: '#f8fafc', navy: '#0f1f4b',
  textMid: '#374151', textLight: '#6b7280', textHint: '#9ca3af',
  success: '#059669', danger: '#dc2626',
}

export default function KnowledgeCheck({ unit, unitIndex, saved, onSubmit, accentColor }) {
  const [answers, setAnswers] = useState(saved?.answers || Array(unit.quiz.length).fill(null))
  const [submitted, setSubmitted] = useState(saved?.submitted || false)

  useEffect(() => {
    setAnswers(saved?.answers || Array(unit.quiz.length).fill(null))
    setSubmitted(saved?.submitted || false)
  }, [unitIndex])

  const score = submitted ? answers.filter((a, i) => a === unit.quiz[i].correct).length : 0
  const allAnswered = !answers.includes(null)
  const perfect = submitted && score === unit.quiz.length

  const setAnswer = (qi, oi) => {
    if (submitted) return
    setAnswers(prev => { const n = [...prev]; n[qi] = oi; return n })
  }

  return (
    <div style={{
      background: 'white', borderRadius: 12, padding: '22px 26px',
      marginBottom: 18, border: `1px solid ${C.border}`
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2 style={{
          fontSize: 14, fontWeight: 600, color: C.navy, margin: 0,
          display: 'flex', alignItems: 'center', gap: 8
        }}>
          <span style={{
            background: '#f0fdf4', width: 24, height: 24, borderRadius: 6,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13
          }}>✏️</span>
          Knowledge Check
        </h2>
        {submitted && (
          <div style={{
            padding: '3px 12px',
            background: perfect ? '#f0fdf4' : score >= unit.quiz.length - 1 ? '#fef3c7' : '#fef2f2',
            borderRadius: 20, fontSize: 12, fontWeight: 700,
            color: perfect ? C.success : score >= unit.quiz.length - 1 ? '#d97706' : C.danger
          }}>
            {score}/{unit.quiz.length} correct {perfect ? '🎉' : ''}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {unit.quiz.map((q, qi) => {
          const isCorrect = submitted && answers[qi] === q.correct
          return (
            <div key={qi}>
              <div style={{
                fontSize: 13, fontWeight: 500, color: C.navy,
                marginBottom: 10, lineHeight: 1.6
              }}>
                <span style={{ color: C.textHint, marginRight: 6, fontSize: 11, fontWeight: 600 }}>
                  Q{qi + 1}
                </span>
                {q.question}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {q.options.map((opt, oi) => {
                  const sel = answers[qi] === oi
                  const corr = oi === q.correct
                  let bg = C.surf, bdr = C.border, col = C.textMid, fw = 400
                  if (submitted) {
                    if (corr) { bg = '#f0fdf4'; bdr = '#86efac'; col = C.success; fw = 500 }
                    else if (sel) { bg = '#fef2f2'; bdr = '#fca5a5'; col = C.danger }
                  } else if (sel) { bg = '#eff6ff'; bdr = '#93c5fd'; col = '#1d4ed8'; fw = 500 }

                  return (
                    <button key={oi} onClick={() => setAnswer(qi, oi)} style={{
                      textAlign: 'left', padding: '9px 13px',
                      background: bg, border: `1px solid ${bdr}`, borderRadius: 8,
                      cursor: submitted ? 'default' : 'pointer',
                      fontSize: 13, color: col, fontWeight: fw,
                      transition: 'all 0.12s', display: 'flex', alignItems: 'center',
                      gap: 9, fontFamily: 'inherit', width: '100%'
                    }}>
                      <span style={{
                        width: 17, height: 17, borderRadius: '50%',
                        border: `2px solid ${bdr}`,
                        background: (sel || (submitted && corr)) ? bdr : 'white',
                        flexShrink: 0, display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: 9
                      }}>
                        {submitted && corr ? '✓' : submitted && sel && !corr ? '✗' : ''}
                      </span>
                      {opt}
                    </button>
                  )
                })}
              </div>
              {submitted && (
                <div style={{
                  marginTop: 9, padding: '9px 13px', background: C.surf,
                  borderRadius: 8, borderLeft: `3px solid ${isCorrect ? '#10b981' : '#f59e0b'}`
                }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: isCorrect ? C.success : '#d97706' }}>
                    {isCorrect ? 'Correct! ' : 'Not quite — '}
                  </span>
                  <span style={{ fontSize: 13, color: C.textLight, lineHeight: 1.6 }}>
                    {q.explanation}
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div style={{ marginTop: 18, display: 'flex', gap: 10, alignItems: 'center' }}>
        {!submitted ? (
          <button
            onClick={() => { if (allAnswered) { setSubmitted(true); onSubmit(answers, score, unit.quiz.length) } }}
            style={{
              padding: '10px 22px',
              background: allAnswered ? accentColor : C.border,
              color: allAnswered ? 'white' : C.textHint,
              border: 'none', borderRadius: 8,
              cursor: allAnswered ? 'pointer' : 'not-allowed',
              fontSize: 13, fontWeight: 500, fontFamily: 'inherit',
              transition: 'background 0.15s'
            }}>
            {allAnswered ? 'Submit Answers' : `Answer all ${unit.quiz.length} questions`}
          </button>
        ) : score < unit.quiz.length ? (
          <button
            onClick={() => { setAnswers(Array(unit.quiz.length).fill(null)); setSubmitted(false) }}
            style={{
              padding: '9px 18px', background: 'white', color: C.textLight,
              border: `1px solid ${C.border}`, borderRadius: 8, cursor: 'pointer',
              fontSize: 13, fontFamily: 'inherit'
            }}>
            Try again
          </button>
        ) : (
          <div style={{ fontSize: 13, color: C.success, fontWeight: 500 }}>
            ✓ Unit complete — move to the next when ready
          </div>
        )}
      </div>
    </div>
  )
}
