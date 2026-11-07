import { defineConfig } from '@playwright/test'
export default defineConfig({
  globalSetup: './fixtures/astro-payload/e2e/global-setup.ts', testDir: './fixtures/astro-payload/e2e', timeout: 30_000,
  use: { baseURL: 'http://127.0.0.1:4321' },
  projects: [{ name: 'integration', testMatch: /integration\.spec\.ts/ }, { name: 'chromium', testMatch: /website\.spec\.ts/, use: { browserName: 'chromium' } }],
  webServer: [
    { command: 'npm run start', cwd: 'fixtures/astro-payload/cms', port: 3001, reuseExistingServer: false },
    { command: 'npm run start', cwd: 'fixtures/astro-payload/web', port: 4321, reuseExistingServer: false, env: { HOST: '127.0.0.1', PORT: '4321' } },
  ],
})
