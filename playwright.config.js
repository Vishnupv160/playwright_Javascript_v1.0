const { defineConfig, devices } = require('@playwright/test');
import config from './automation-test-config.cjs';

module.exports = defineConfig({
  fullyParallel: config.needParallelExecution,
  reporter: [[config.reportType, { open: 'never', outputFolder: './test-results/test-execution-reports/' }],
  ['allure-playwright', { outputFolder: './test-results/allure/allure-results', open: 'always' }]],
  outputDir: './test-results/screenshot-video',
  timeout: config.testTimeOut * 1000,
  use: {
    video: { mode: config.needVideoRecording ? 'retain-on-failure' : 'off', size: { width: 1920, height: 1080 } },
    headless: config.needHeadlessExecution,
    screenshot: config.needVisualStepsInReport ? (config.needScreenshotOnTestFailure ? 'on' : 'on') : (config.needScreenshotOnTestFailure ? 'only-on-failure' : 'off'),//Capture screenshots of your test. Options include 'off', 'on' and 'only-on-failure'
    acceptDownloads: true,
    actionTimeout: config.actionTimeOut * 1000,
    launchOptions: {
      slowMo: config.slowExecutionSpeed * 1000,
    },
    locale: config.locale,
    timezoneId: config.timeZone,
    geolocation: { longitude: config.longitude, latitude: config.latitude },
    permissions: ['geolocation'],
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },

    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Test against mobile viewports. 
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    // Test against branded browsers. 
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },

  ],
});
/**
 * @Reference https://playwright.dev/docs/test-configuration
 */