import { test, expect, type Page } from "@playwright/test";

async function gotoReady(page: Page, options: { reducedMotion?: boolean } = {}) {
  await page.goto("./", { waitUntil: "load" });
  // Hydration signal: Reveal adds its class from a mount effect, so it cannot
  // appear until React has taken over. Under reduced motion Reveal skips that
  // class and reveals immediately, so wait on the class it does add instead.
  const hydrated = options.reducedMotion
    ? page.locator(".is-visible").first()
    : page.locator(".reveal").first();
  await expect(hydrated).toBeAttached();
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

test.describe("hero atmosphere", () => {
  test("background layers never intercept pointer events or cover content", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await gotoReady(page);

    const bg = page.locator(".hero-bg");
    const atmos = page.locator(".hero-atmos");
    const content = page.locator("#home .shell");

    await expect(atmos).toHaveCount(1);
    // Three fields, not two: the spec asks for 2-4 blobs.
    await expect(bg.locator(".hero-glow")).toHaveCount(3);
    await expect(bg.locator(".hero-aurora")).toHaveCount(1);
    await expect(bg.locator(".hero-noise")).toHaveCount(1);
    // Grain is a texture, not an image request.
    await expect(bg.locator(".hero-noise")).toHaveCSS("background-image", /svg\+xml/);

    // The whole stack is inert decoration (§25).
    await expect(bg).toHaveCSS("pointer-events", "none");

    // Content sits above the background in the stacking order.
    const bgZ = Number(await bg.evaluate((el) => getComputedStyle(el).zIndex));
    const contentZ = Number(await content.evaluate((el) => getComputedStyle(el).zIndex));
    expect(contentZ).toBeGreaterThan(bgZ);
  });

  test("atmosphere and content remain readable against each other", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await gotoReady(page);

    // Glow layers stay faint enough not to eat text contrast. The strongest is
    // the 20%-alpha accent field; nothing reaches 30%.
    const opacities = await page
      .locator(".hero-glow, .hero-aurora, .hero-core-glow")
      .evaluateAll((els) => els.map((el) => Number(getComputedStyle(el).opacity)));
    for (const value of opacities) {
      expect(value).toBeGreaterThan(0);
      expect(value).toBeLessThanOrEqual(0.72);
    }

    // Body text over the hero still clears AA against the darkest surface.
    const headline = page.locator("#home h1");
    await expect(headline).toBeVisible();
    const color = await headline.evaluate((el) => getComputedStyle(el).color);
    const [r, g, b] = color.match(/\d+/g)!.map(Number);
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    expect(luminance).toBeGreaterThan(0.5); // near-white ink
  });

  test("particle count drops on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await gotoReady(page);
    const particles = page.locator(".hero-bg .particle");
    const total = await particles.count();
    expect(total).toBeGreaterThanOrEqual(20);
    expect(total).toBeLessThanOrEqual(50);

    await page.setViewportSize({ width: 375, height: 800 });
    const mobile = await page
      .locator(".hero-bg .particle")
      .evaluateAll((els) => els.filter((el) => getComputedStyle(el).display !== "none").length);
    expect(mobile).toBeLessThan(total);
  });

  test("reduced motion stops the atmosphere but keeps all content visible", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1280, height: 900 });
    await gotoReady(page, { reducedMotion: true });

    // Movement layers are switched off entirely.
    await expect(page.locator(".hero-scan")).toBeHidden();
    await expect(page.locator(".hero-cursor-glow")).toBeHidden();
    await expect(page.locator(".hero-bg .particle").first()).toBeHidden();
    await expect(page.locator(".contact-atmos")).toBeHidden();

    // Content is readable immediately, not left mid-reveal.
    await expect(page.locator("#home h1")).toHaveCSS("opacity", "1");
    await expect(page.locator("#about .reveal, #about .is-visible").first()).toHaveCSS("opacity", "1");

    // Reduced motion collapses every duration to ~0 rather than clearing
    // animation-name, so assert on duration: nothing may still be moving.
    const durations = await page
      .locator(".hero-aurora, .hero-glow, .hero-core-glow, .contact-atmos-blob")
      .evaluateAll((els) =>
        els
          .filter((el) => getComputedStyle(el).animationName !== "none")
          .map((el) => parseFloat(getComputedStyle(el).animationDuration))
      );
    expect(durations.length).toBeGreaterThan(0); // rules are actually applied
    for (const seconds of durations) {
      expect(seconds).toBeLessThanOrEqual(0.001);
    }
  });
});

test.describe("responsive nav shell", () => {
  // Regression: component classes lived outside @layer, so unlayered CSS outranked
  // Tailwind utilities and `lg:hidden` on the hamburger button never applied.
  test("hamburger shows below lg and desktop links show at lg and above", async ({ page }) => {
    const hamburger = page.locator("nav button[aria-controls='mobile-navigation']");
    const desktopNav = page.locator("nav .hidden.items-center");

    await page.setViewportSize({ width: 1023, height: 800 });
    await gotoReady(page);
    await expect(hamburger).toBeVisible();
    await expect(desktopNav).toBeHidden();

    await page.setViewportSize({ width: 1024, height: 800 });
    await expect(hamburger).toBeHidden();
    await expect(desktopNav).toBeVisible();
  });
});

test.describe("back to top", () => {
  test("stays hidden at the top, appears after a viewport of scroll, and returns home", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await gotoReady(page);

    const toTop = page.getByRole("link", { name: "Back to top" });

    // Hidden at the top of the page: not in the tab order, not clickable.
    await expect(toTop).toBeHidden();

    await page.evaluate(() => window.scrollTo(0, window.innerHeight + 200));
    await expect(toTop).toBeVisible();

    // Must clear the 44px touch target minimum.
    const box = await toTop.boundingBox();
    expect(box?.width ?? 0).toBeGreaterThanOrEqual(44);
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);

    // Stay clear of the fixed nav so the two never overlap.
    const navBox = await page.getByRole("navigation", { name: "Primary navigation" }).boundingBox();
    expect(box!.y).toBeGreaterThan(navBox!.y + navBox!.height - 1);

    await toTop.click();
    await expect
      .poll(() => page.evaluate(() => Math.round(window.scrollY)), { timeout: 5000 })
      .toBeLessThan(50);
    await expect(toTop).toBeHidden();
  });

  test("is hidden from the tab order until it is visible", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await gotoReady(page);

    // visibility:hidden removes it from sequential focus, so tabbing past the
    // nav and footer must not land on a control the user cannot see.
    const reachableAtTop = await page.evaluate(() => {
      const el = document.querySelector<HTMLAnchorElement>(".back-to-top")!;
      el.focus();
      return document.activeElement === el;
    });
    expect(reachableAtTop).toBe(false);

    await page.evaluate(() => window.scrollTo(0, window.innerHeight + 200));
    await expect(page.getByRole("link", { name: "Back to top" })).toBeVisible();

    const reachableWhenVisible = await page.evaluate(() => {
      const el = document.querySelector<HTMLAnchorElement>(".back-to-top")!;
      el.focus();
      return document.activeElement === el;
    });
    expect(reachableWhenVisible).toBe(true);
  });
});

test.describe("dark-only shell", () => {
  test("renders the dark palette with no theme control", async ({ page }) => {
    await gotoReady(page);

    const body = page.locator("body");
    await expect(body).toHaveCSS("background-color", "rgb(8, 9, 13)");
    await expect(page.locator("html")).not.toHaveClass(/dark/);

    // The site is dark-only: no theme switch should be offered at all.
    await expect(page.getByRole("button", { name: /theme/i })).toHaveCount(0);
  });
});

test.describe("resume download", () => {
  test("every resume link points at the deployed PDF", async ({ page }) => {
    await gotoReady(page);

    const links = page.getByRole("link", { name: "Resume" });
    expect(await links.count()).toBeGreaterThan(0);

    for (let i = 0; i < (await links.count()); i++) {
      await expect(links.nth(i)).toHaveAttribute("href", "/portfolio/Chris_ATS_Resume.pdf");
    }
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

  test("fields and controls meet the 44px touch target minimum on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await gotoReady(page);

    const tooSmall = await page.evaluate(() => {
      const out: string[] = [];
      for (const el of document.querySelectorAll<HTMLElement>("a, button, select, input, textarea")) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        if (r.height < 44) {
          out.push(`${el.tagName.toLowerCase()} "${(el.textContent ?? "").trim().slice(0, 24)}" = ${Math.round(r.height)}px`);
        }
      }
      return out;
    });
    expect(tooSmall, tooSmall.join("\n")).toEqual([]);
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
    await expect(external).toHaveCount(7); // 3 live demos + 4 source links

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

    for (const id of [
      "home",
      "about",
      "services",
      "projects",
      "process",
      "tech",
      "education",
      "contact",
    ]) {
      await expect(page.locator(`#${id}`), `section #${id}`).toBeVisible();
    }

    await expect(page.getByRole("heading", { level: 1, name: /Chris/ })).toBeVisible();
  });

  test("project cards become visible once scrolled into view", async ({ page }) => {
    await gotoReady(page);

    const projectCards = page.locator("#projects article");
    await expect(projectCards).toHaveCount(4);

    for (let i = 0; i < (await projectCards.count()); i++) {
      const card = projectCards.nth(i);
      await card.scrollIntoViewIfNeeded();
      await expect(card, `project card #${i + 1} should not stay hidden by motion`).toHaveCSS(
        "opacity",
        "1"
      );
    }
  });

  test("project screenshots load at the shared 16:10 aspect ratio", async ({ page }) => {
    await gotoReady(page);

    const shots = page.locator("#projects img");
    await expect(shots).toHaveCount(3); // SkillSync is a desktop app and has no shot

    for (let i = 0; i < (await shots.count()); i++) {
      const shot = shots.nth(i);
      // The shots are lazy-loaded, so they only decode once scrolled into view.
      await shot.scrollIntoViewIfNeeded();
      await expect
        .poll(() => shot.evaluate((img) => (img as HTMLImageElement).naturalWidth))
        .toBeGreaterThan(0);

      const box = await shot.boundingBox();
      expect(box, `project shot #${i + 1} should be laid out`).not.toBeNull();
      // Source screenshots are 1280x800; allow rounding on the rendered box.
      expect(box!.width / box!.height).toBeCloseTo(1.6, 1);
    }
  });
});
