import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: process.env.CI ? 1 : undefined,
  retries: 0,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: [["list"]],
  use: {
    // Note: the dev server must be reached as "localhost". Next.js 16's dev server
    // blocks the HMR websocket when the browser sends Origin: http://127.0.0.1:<port>
    // (block-cross-site-dev.js only allows *.localhost / localhost / configured
    // allowedDevOrigins), which deadlocks App Router hydration. localhost resolves
    // to the same dev server instance; the readiness/reuse URL below stays at the
    // required 127.0.0.1 address.
    baseURL: "http://localhost:3002/portfolio/",
    screenshot: "off",
    video: "off",
    trace: "off",
  },
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:3002/portfolio",
    reuseExistingServer: true,
    timeout: 180_000,
  },
});