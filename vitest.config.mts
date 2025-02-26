import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ['./tests/**/*.{test,spec}.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['cobertura', 'text', 'html', 'json-summary'],
      exclude: ['vitest.config.mts', 'tests', 'src/shared'],
    },
    setupFiles: ['dotenv/config'],
    globalSetup: ['./tests/global.setup.ts'],
    hookTimeout: 300000,
  },
})
