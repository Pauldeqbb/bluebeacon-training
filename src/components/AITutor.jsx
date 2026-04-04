import { useState, useRef } from 'react'

const C = {
  navy: '#0f1f4b', teal: '#0099b8', border: '#e2e8f0',
  surf: '#f8fafc', textMid: '#374151', textLight: '#6b7280', textHint: '#9ca3af',
}

export default function AITutor({ systemPrompt, config, onClose }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)

  const starters = config.tutorStarters || [
    "What's the difference between a top goal and an intermediate goal?",
    "Why must I publish an action plan template before linking it?",
    "What happens if I publish a care plan template before adding goals?",
    "How do I add a task to an active care plan?",
  ]

  const send = async (text) => {
    const msg = text || input.trim()
    if (!msg || loading) return
    setInput('')
    const next = [...messages, { role: 'user', content: msg }]
    setMessages(next)
    setLoading(true)
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, systemPrompt }),
      })
      const data = await res.json()
      const reply = data.reply || 'Sorry, I couldn\'t respond right now. Please try again.'
      setMessages([...next, { role: 'assistant', content: reply }])
    } catch {
      setMessages([...next, { role: 'assistant', content: 'Something went wrong connecting to the AI. Please try again.' }])
    }
    setLoading(false)
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  return (
    <div style={{
      width: 340, background: 'white', borderLeft: `1px solid ${C.border}`,
      display: 'flex', flexDirection: 'column', flexShrink: 0
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 16px', borderBottom: `1px solid ${C.border}`,
        background: C.surf, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 30, height: 30, background: C.teal, borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15
          }}>🤖</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13, color: C.navy }}>AI Tutor</div>
            <div style={{ fontSize: 11, color: C.textHint }}>{config.systemName} expert</div>
          </div>
        </div>
        <button onClick={onClose} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: C.textHint, fontSize: 20, padding: 4, lineHeight: 1
        }}>×</button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflow: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {messages.length === 0 ? (
          <div style={{ padding: '16px 8px', textAlign: 'center' }}>
            <div style={{ fontSize: 26, marginBottom: 10 }}>💬</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.navy, marginBottom: 6 }}>
              Ask me anything about {config.systemName}
            </div>
            <div style={{ fontSize: 12, color: C.textLight, marginBottom: 14, lineHeight: 1.5 }}>
              I know {config.shortName}'s processes and terminology. Try one of these:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {starters.map((s, i) => (
                <button key={i} onClick={() => send(s)} style={{
                  background: C.surf, border: `1px solid ${C.border}`, borderRadius: 8,
                  padding: '8px 12px', fontSize: 12, color: C.textMid,
                  cursor: 'pointer', textAlign: 'left', lineHeight: 1.4, fontFamily: 'inherit'
                }}>{s}</button>
              ))}
            </div>
          </div>
        ) : messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '88%', padding: '9px 13px',
              borderRadius: m.role === 'user' ? '12px 12px 2px 12px' : '2px 12px 12px 12px',
              background: m.role === 'user' ? C.navy : C.surf,
              color: m.role === 'user' ? 'white' : C.textMid,
              fontSize: 13, lineHeight: 1.65,
              border: m.role === 'user' ? 'none' : `1px solid ${C.border}`,
              whiteSpace: 'pre-wrap'
            }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              padding: '9px 13px', background: C.surf, border: `1px solid ${C.border}`,
              borderRadius: '2px 12px 12px 12px', fontSize: 13, color: C.textHint
            }}>Thinking...</div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div style={{ padding: 10, borderTop: `1px solid ${C.border}`, flexShrink: 0 }}>
        <div style={{
          display: 'flex', gap: 7, background: C.surf,
          border: `1px solid ${C.border}`, borderRadius: 10,
          padding: '7px 10px', alignItems: 'flex-end'
        }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
            placeholder="Ask a question..."
            rows={2}
            style={{
              flex: 1, border: 'none', background: 'none', resize: 'none',
              fontSize: 13, color: C.textMid, outline: 'none',
              fontFamily: 'inherit', lineHeight: 1.5, maxHeight: 80
            }}
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || loading}
            style={{
              width: 28, height: 28,
              background: input.trim() && !loading ? C.teal : C.border,
              border: 'none', borderRadius: 7,
              cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
              flexShrink: 0, fontSize: 13, color: 'white',
              transition: 'background 0.15s', display: 'flex',
              alignItems: 'center', justifyContent: 'center'
            }}>↑</button>
        </div>
        <div style={{ fontSize: 11, color: C.textHint, textAlign: 'center', marginTop: 6 }}>
          Enter to send · Shift+Enter for new line
        </div>
      </div>
    </div>
  )
}
