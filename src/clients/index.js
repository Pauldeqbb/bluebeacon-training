/**
 * Client registry — add new clients here.
 * Dynamic imports keep bundle sizes small: each client's config
 * is only loaded when that client is actually requested.
 */

const CLIENT_LOADERS = {
  pgf: () => import('./pgf/config.js'),
  mapumaia: () => import('./mapumaia/config.js'),
}

export const KNOWN_SLUGS = Object.keys(CLIENT_LOADERS)
export const DEFAULT_SLUG = 'pgf'

export async function loadClient(slug) {
  const loader = CLIENT_LOADERS[slug] || CLIENT_LOADERS[DEFAULT_SLUG]
  const mod = await loader()
  return mod.default
}
