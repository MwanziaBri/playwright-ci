import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,   /* Fail the build on CI if you accidentally left test.only in the source code. */

  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results.json' }],
    ['junit', { outputFile: 'junit.xml' }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    // Authentication setup
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    // Browser setup
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        storageState: 'auth.json', // ← Use saved auth
      },
      dependsOn: ['setup'], // ← Run setup first
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'],
        storageState: 'auth.json', // ← Use saved auth
      },
      dependsOn: ['setup'], // ← Run setup first
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'],
        storageState: 'auth.json', // ← Use saved auth
      },
      dependsOn: ['setup'], // ← Run setup first
    },
  ],
});
