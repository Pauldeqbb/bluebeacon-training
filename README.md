# Bluebeacon Training Platform

A multi-tenant, AI-powered training platform for Salesforce Nonprofit Cloud implementations. Each client gets their own branded training environment with interactive knowledge checks and an AI tutor pre-loaded with their system's context.

## Architecture

```
src/
  clients/
    shared/
      modules/          ← canonical module content (one source of truth)
        care-plans.js
    pgf/
      config.js         ← PGF brand, terminology, AI context, module overrides
    mapumaia/
      config.js         ← Mapu Maia brand, terminology, AI context, module overrides
    index.js            ← client registry
  components/
    Sidebar.jsx
    UnitView.jsx
    KnowledgeCheck.jsx
    AITutor.jsx
  lib/
    resolveClient.js    ← reads URL to determine which client to load
    buildSystemPrompt.js← assembles AI tutor prompt from client config
    useProgress.js      ← localStorage-based progress persistence
  App.jsx
  main.jsx
```

## URL Structure

| URL | Client |
|-----|--------|
| `/pgf` | Problem Gambling Foundation |
| `/pgf/2` | PGF — Unit 3 (0-indexed) |
| `/mapumaia` | Mapu Maia |
| `/mapumaia/4` | Mapu Maia — Unit 5 |

In production each client can also have their own subdomain. Set `VITE_CLIENT=pgf` as an environment variable in Vercel to lock a deployment to a specific client regardless of URL.

## Local Development

```bash
# Install dependencies
npm install

# Copy env file and add your Anthropic API key
cp .env.example .env.local

# Run dev server
npm run dev

# Visit:
# http://localhost:3000/pgf       — PGF training
# http://localhost:3000/mapumaia  — Mapu Maia training
```

## Deploying to Vercel

1. Push this repo to GitHub
2. Import the project in [vercel.com](https://vercel.com)
3. Add environment variable: `VITE_ANTHROPIC_API_KEY` = your key
4. Deploy

To give each client their own subdomain:
- Add `pgf.yourdomain.com` → set env var `VITE_CLIENT=pgf` for that domain
- Add `mapumaia.yourdomain.com` → set env var `VITE_CLIENT=mapumaia`

Vercel handles multiple custom domains on a single project natively.

## Adding a New Client

1. Create `src/clients/{slug}/config.js` — copy `pgf/config.js` as a template
2. Update brand, terminology, aiContext, tutorStarters
3. Override any module units that differ from shared content
4. Register the client in `src/clients/index.js`
5. Done — no other changes needed

## Adding a New Module

1. Create `src/clients/shared/modules/{module-name}.js` — use `care-plans.js` as a template
2. Import and add to each client's `modules` array in their `config.js`
3. The module selector UI will appear automatically when more than one module exists

## Generating Module Content with Claude

Use this prompt to generate a new module from source PDFs:

```
You are building a Salesforce training module for [CLIENT] using [SYSTEM NAME].

Here is the source training content for one unit:
[PASTE SLIDE CONTENT]

Generate the following for this unit in JavaScript object format
matching this schema:
{
  id: 'unit-slug',
  title: 'Unit Title',
  duration: 'X mins',
  emoji: '🎯',
  tagline: 'One-line subtitle',
  summary: 'Multi-paragraph plain English overview (\\n\\n between paragraphs)',
  concepts: [{ term: '', definition: '' }],
  watchouts: [{ title: '', detail: '' }],
  quiz: [{
    question: '',
    options: ['', '', '', ''],
    correct: 0,       // 0-indexed
    explanation: ''
  }]
}

Terminology: [LIST CLIENT TERMINOLOGY]
Audience: [DESCRIBE STAFF ROLES]
```

Copy the output directly into the appropriate module file.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_ANTHROPIC_API_KEY` | Yes | Anthropic API key for the AI tutor |
| `VITE_CLIENT` | No | Lock a deployment to a specific client slug (e.g. `pgf`) |

## Notes on API Key Security

The API key is used directly from the browser. For an internal staff tool with a known audience this is acceptable — set spend limits on your Anthropic account to cap exposure.

If you need server-side key protection (for a public-facing tool), add a small proxy endpoint. Vercel serverless functions are the easiest approach.
