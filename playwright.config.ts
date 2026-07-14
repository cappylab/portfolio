import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  retries: 1,
  use: {
    baseURL: "http://localhost:3100",
    headless: true,
  },
  webServer: {
    command: "npm run dev -- --port 3100",
    url: "http://localhost:3100/",
    timeout: 60_000,
    reuseExistingServer: true,
  },
});
