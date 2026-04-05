const C = {
  navy: '#0f1f4b', border: '#e2e8f0', surf: '#f8fafc',
  textLight: '#6b7280', textHint: '#9ca3af',
}

export default function ScribeEmbed({ url, title }) {
  if (!url) return null

  return (
    <div style={{
      background: 'white', borderRadius: 12, marginBottom: 16,
      border: `1px solid ${C.border}`, overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 24px', borderBottom: `1px solid ${C.border}`,
        background: C.surf, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <h2 style={{
          fontSize: 13, fontWeight: 600, color: C.navy, margin: 0,
          display: 'flex', alignItems: 'center', gap: 8
        }}>
          <span style={{
            background: '#ede9fe', width: 24, height: 24, borderRadius: 6,
            display: 'inline-flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 13
          }}>🎬</span>
          Step-by-Step Walkthrough
          {title && (
            <span style={{ fontWeight: 400, color: C.textLight, marginLeft: 4 }}>
              — {title}
            </span>
          )}
        </h2>
        <a
          href={url.replace('/embed/', '/')}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 12, color: '#7c3aed', fontWeight: 500,
            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4
          }}
        >
          Open full screen ↗
        </a>
      </div>

      {/* Scribe iframe */}
      <div style={{ position: 'relative', paddingBottom: '100%', height: 0 }}>
        <iframe
          src={url}
          title={title || 'Step-by-step walkthrough'}
          allowFullScreen
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%', border: 'none'
          }}
        />
      </div>

      {/* Footer hint */}
      <div style={{
        padding: '10px 24px', borderTop: `1px solid ${C.border}`,
        background: C.surf, display: 'flex', alignItems: 'center', gap: 8
      }}>
        <span style={{ fontSize: 13 }}>💡</span>
        <span style={{ fontSize: 12, color: C.textLight }}>
          Follow these steps in Tō Pikitanga alongside this guide. Use the arrows to move through each step.
        </span>
      </div>
    </div>
  )
}
