import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

/**
 * GitHub Pages "project sites" are served from https://<user>.github.io/<repo>/,
 * so every asset URL must be prefixed with /<repo>/.
 *
 * The repository name is read from VITE_REPO_NAME:
 *  - In GitHub Actions it is set automatically from the real repository name
 *    (see .github/workflows/deploy.yml), so renaming the repo needs no code change.
 *  - Locally it falls back to DEFAULT_REPO_NAME below. Change that one constant
 *    if you build locally under a different repository name.
 *
 * A "user site" repository (named <user>.github.io) is served from the domain
 * root, so it gets base "/". Same for a custom domain: set VITE_BASE_PATH=/.
 */
const DEFAULT_REPO_NAME = 'mechlab'

function resolveBasePath(isDevServer: boolean): string {
  if (isDevServer) return '/'

  const explicitBase = process.env.VITE_BASE_PATH
  if (explicitBase) return explicitBase

  const repoName = process.env.VITE_REPO_NAME ?? DEFAULT_REPO_NAME
  if (repoName.toLowerCase().endsWith('.github.io')) return '/'
  return `/${repoName}/`
}

// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => ({
  // `vite preview` also reports command "serve"; it must use the production base path
  // so that it behaves exactly like GitHub Pages. Only the dev server uses "/".
  base: resolveBasePath(command === 'serve' && !isPreview),
  plugins: [react(), tailwindcss()],
}))
