/**
 * Resolves the active client from the URL.
 *
 * URL structure:  /{clientSlug}/{unitIndex}
 * Examples:
 *   /pgf          → client: pgf,      unit: 0
 *   /pgf/2        → client: pgf,      unit: 2
 *   /mapumaia     → client: mapumaia, unit: 0
 *   /mapumaia/3   → client: mapumaia, unit: 3
 *
 * In production each client can also get their own subdomain
 * (pgf.bluebeacontraining.com) by pointing the domain at the same
 * Vercel project and setting a VITE_CLIENT env var override per domain.
 */

const KNOWN_CLIENTS = ['pgf', 'mapumaia']
const DEFAULT_CLIENT = 'pgf'

export function resolveClient() {
  // Allow env var override (useful for per-subdomain Vercel deployments)
  const envClient = import.meta.env.VITE_CLIENT
  if (envClient && KNOWN_CLIENTS.includes(envClient)) {
    return { slug: envClient, unitIndex: 0 }
  }

  const parts = window.location.pathname.replace(/^\//, '').split('/')
  const slug = KNOWN_CLIENTS.includes(parts[0]) ? parts[0] : DEFAULT_CLIENT
  const unitIndex = parseInt(parts[1] ?? '0', 10) || 0

  return { slug, unitIndex }
}

export function buildUrl(slug, unitIndex) {
  return `/${slug}/${unitIndex}`
}
