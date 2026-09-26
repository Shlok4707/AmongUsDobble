import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'))

export default defineConfig({
  plugins: [react()],
  // Stamped into the app so you can tell at a glance which build is running —
  // the usual cause of "my changes aren't showing" is an old dev server still
  // serving an old folder.
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
})
