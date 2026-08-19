import { test, expect, type Page } from "@playwright/test";

async function gotoReady(page: Page) {
  await page.goto("./", { waitUntil: "load" });
  // Wait for hydration: the ThemeToggle only renders its button after mount.
  await expect(page.getByRole("button", { name: /theme selected/i })).toBeVisible();
  // Wait for webfonts so layout measurements reflect the final state.
  await page.evaluate(() => (document as Document & { fonts: FontFaceSet }).fonts.ready);
}

test.describe("load health", () => {
  test("loads with no console errors or failed requests", async ({ page }) => {
    const problems: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") problems.push(`console.error: ${msg.text()}`);
    });
    page.on("pageerror", (err) => problems.push(`pageerror: ${err.message}`));
    page.on("requestfailed", (req) =>
      problems.push(`requestfailed: ${req.method()} ${req.url()} (${req.failure()?.errorText})`)
    );
    page.on("response", (res) => {
      if (res.status() >= 400) problems.push(`http ${res.status()}: ${res.url()}`);
    });

    await gotoReady(page);

    expect(problems, problems.join("\n")).toEqual([]);
  });
});

test.describe("responsive layout", () => {
  test("no horizontal overflow at 320px", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await gotoReady(page);

    const overflow = await page.evaluate(() => ({
      documentScrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      innerWidth: window.innerWidth,
    }));

    expect(overflow.documentScrollWidth, JSON.stringify(overflow)).toBeLessThanOrEqual(320);
    expect(overflow.bodyScrollWidth, JSON.stringify(overflow)).toBeLessThanOrEqual(320);
  });
});

test.describe("mobile navigation", () => {
  test("menu opens, focuses first link, Escape closes and restores focus", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await gotoReady(page);

    const menuButton = page.getByRole("button", { name: "Open menu" });
    await expect(menuButton).toBeVisible();

    await menuButton.click();
    await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");

    const firstLink = page.locator("#mobile-navigation a").first();
    await expect(firstLink).toHaveText("About");
    await expect(firstLink).toBeFocused();

    await page.keyboard.press("Escape");

    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  });
});

test.describe("theme control", () => {
  test("cycles system -> light -> dark -> system with accessible labels", async ({ page }) => {
    await gotoReady(page);

    const toggle = page.getByRole("button", { name: /theme selected/i });
    await expect(toggle).toHaveAttribute("aria-label", "system theme selected. Switch to light theme");

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-label", "light theme selected. Switch to dark theme");
    await expect(page.locator("html")).not.toHaveClass(/dark/);

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-label", "dark theme selected. Switch to system theme");
    await expect(page.locator("html")).toHaveClass(/dark/);

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-label", "system theme selected. Switch to light theme");
  });
});

test.describe("contact form", () => {
  test("labels and required/optional semantics are correct", async ({ page }) => {
    await gotoReady(page);

    const form = page.locator("form");
    await expect(form).toBeVisible();

    const fields: Array<[label: string, id: string, required: boolean]> = [
      ["Name (required)", "name", true],
      ["Email (required)", "email", true],
      ["Project Type (required)", "projectType", true],
      ["Budget Range (optional)", "budget", false],
      ["Tell me about your project (required)", "message", true],
    ];

    for (const [label, id, required] of fields) {
      await expect(form.locator(`label[for="${id}"]`)).toHaveText(label);
      const field = form.locator(`#${id}`);
      if (required) {
        await expect(field).toHaveAttribute("required");
      } else {
        await expect(field).not.toHaveAttribute("required");
      }
    }
  });

  test("generates a safely encoded mailto URL on submit", async ({ page }) => {
    await gotoReady(page);

    const form = page.locator("form");
    await form.scrollIntoViewIfNeeded();

    await form.locator("#name").fill("Ada Lovelace");
    await form.locator("#email").fill("ada@example.com");
    await form.locator("#projectType").selectOption("Website");
    await form.locator("#budget").selectOption("PHP 15,000+");
    await form.locator("#message").fill('Build a site for "A & B" <urgent>');

    // The form assigns window.location.href = "mailto:..."; Chromium surfaces that
    // as a request, which we capture instead of navigating away.
    const [mailtoRequest] = await Promise.all([
      page.waitForRequest((req) => req.url().startsWith("mailto:"), { timeout: 10_000 }),
      form.getByRole("button", { name: "Continue in email" }).click(),
    ]);

    const href = mailtoRequest.url();
    const url = new URL(href);
    expect(url.protocol).toBe("mailto:");
    expect(url.pathname).toBe("chrismakesweb@gmail.com");
    expect(url.searchParams.get("subject")).toBe("Project Inquiry - Website");
    expect(url.searchParams.get("body")).toContain("Name: Ada Lovelace");
    expect(url.searchParams.get("body")).toContain("Email: ada@example.com");
    expect(url.searchParams.get("body")).toContain("Project Type: Website");
    expect(url.searchParams.get("body")).toContain("Budget: PHP 15,000+");
    expect(url.searchParams.get("body")).toContain('Build a site for "A & B" <urgent>');

    // User input must be percent-encoded, not interpolated raw into the URL.
    expect(href).not.toContain("<urgent>");
    expect(href).not.toContain("A & B");
    expect(href).toContain("%26");
    expect(href).toContain("%3Curgent%3E");
  });
});

test.describe("project external links", () => {
  test("external links use target=_blank with noopener noreferrer", async ({ page }) => {
    await gotoReady(page);

    const external = page.locator('#projects a[target="_blank"]');
    await expect(external).toHaveCount(5); // 2 live demos + 3 source links

    const count = await external.count();
    for (let i = 0; i < count; i++) {
      const rel = (await external.nth(i).getAttribute("rel")) ?? "";
      expect(rel, `rel on external link #${i}`).toContain("noopener");
      expect(rel, `rel on external link #${i}`).toContain("noreferrer");
    }

    // Every anchor in the projects section that opens a new tab must be covered.
    const missing = await page
      .locator('#projects a[target="_blank"]:not([rel*="noopener"]):not([rel*="noreferrer"])')
      .count();
    expect(missing).toBe(0);
  });
});

test.describe("key sections", () => {
  test("all key sections render on the page", async ({ page }) => {
    await gotoReady(page);

    for (const id of ["about", "services", "projects", "process", "skills", "contact"]) {
      await expect(page.locator(`#${id}`), `section #${id}`).toBeVisible();
    }

    const projectCards = page.locator("#projects article");
    await expect(projectCards).toHaveCount(3);
    for (let i = 0; i < (await projectCards.count()); i++) {
      await expect(projectCards.nth(i), `project card #${i + 1} should not be hidden by motion`).toHaveCSS("opacity", "1");
    }

    await expect(page.getByRole("heading", { level: 1, name: "Chris" })).toBeVisible();
  });
});
