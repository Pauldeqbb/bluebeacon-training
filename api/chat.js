export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  const { messages, systemPrompt } = req.body

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 800,
      system: systemPrompt,
      messages,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    return res.status(response.status).json({ error: data.error?.message || 'Anthropic API error' })
  }

  const reply = data.content?.find(b => b.type === 'text')?.text
    || 'Sorry, I couldn\'t respond right now.'

  res.status(200).json({ reply })
}
