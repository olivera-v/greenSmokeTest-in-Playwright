import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  timeout:  130 * 1000, // Maksimalno vreme po testu: 150s
  expect: {
    timeout: 5000, // Default timeout za expect assercije
  },
  fullyParallel: true,
  retries: 1, 
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: 'https://greenbsn.com/sr/', 
    browserName: 'chromium',
    headless: true, 
    viewport: { width: 1280, height: 800 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure' 
  },



  
});