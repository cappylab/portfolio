import { test, expect } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3100";

test.describe("Home page", () => {
  test("loads hero section", async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator("h1")).toContainText("Crafting digital");
    await expect(page.locator("nav")).toBeVisible();
  });

  test("nav links are present", async ({ page }) => {
    await page.goto(BASE);
    const nav = page.getByRole("navigation");
    await expect(nav.getByRole("link", { name: "Work", exact: true })).toBeVisible();
    await expect(nav.getByRole("link", { name: "About" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Contact" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Blog" })).toBeVisible();
  });

  test("project cards link to case study", async ({ page }) => {
    await page.goto(BASE);
    const card = page.locator("article").filter({ hasText: "MyCar" }).first();
    await expect(card).toBeVisible();
  });

  test("renders three lazy static project previews without iframes", async ({ page }) => {
    await page.goto(BASE);
    const work = page.locator("#work");

    await expect(work.locator("article")).toHaveCount(3);
    await expect(work.locator("iframe")).toHaveCount(0);
    await expect(work.getByAltText("Preview of Hey Nabi")).toBeVisible();
    await expect(work.getByAltText("Preview of MyCar")).toBeVisible();
    await expect(work.getByAltText("Preview of Cluber")).toBeVisible();
    await expect(work.getByAltText("Preview of Cluber")).toHaveAttribute(
      "loading",
      "lazy"
    );
  });

  test("shows project context without restoring live previews", async ({ page }) => {
    await page.goto(BASE);
    const work = page.locator("#work");
    const heyNabi = work.locator("article").filter({ hasText: "Hey Nabi" });

    await expect(heyNabi).toContainText("AI Product");
    await expect(heyNabi).toContainText("Full-stack developer");
    await expect(heyNabi).toContainText("5-language real-time translation");
    await expect(work.locator("iframe")).toHaveCount(0);
  });

  test("uses a decorative lightweight hero signature", async ({ page }) => {
    await page.goto(BASE);
    await expect(page.getByTestId("hero-signature")).toBeVisible();
    await expect(
      page.locator(".bg-ambient .orb, .bg-ambient .orb-reverse")
    ).toHaveCount(0);
  });

  test("lists all projects on the catalogue route", async ({ page }) => {
    await page.goto(`${BASE}/work`);
    await expect(
      page.getByRole("heading", { name: "All work" })
    ).toBeVisible();
    await expect(page.locator("article")).toHaveCount(3);
    await expect(page.locator("article").first()).toContainText("Hey Nabi");
  });

  test("localizes the project-card overlay", async ({ page }) => {
    await page.goto(`${BASE}/ko`);
    await expect(
      page.locator("#work .live-preview").first().getByText("사례 연구 보기")
    ).toBeAttached();
  });

  test("contact form renders", async ({ page }) => {
    await page.goto(`${BASE}/#contact`);
    await expect(page.getByRole("textbox", { name: "Name", exact: true })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Email", exact: true })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Message", exact: true })).toBeVisible();
  });

  test("presents a product-builder story and professional social actions", async ({ page }) => {
    await page.goto(BASE);

    const about = page.locator("#about");
    await expect(
      about.getByRole("heading", {
        name: "I design and build digital products worth using every day.",
      })
    ).toBeVisible();
    await expect(about.getByText("Built with intent")).toBeVisible();

    const socialActions = page.getByRole("group", { name: "Professional links" });
    await expect(socialActions.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:jeonghamin1909@gmail.com"
    );
    await expect(socialActions.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/jhm1909"
    );
    await expect(socialActions.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/ha-min-jeong-a3a904401"
    );
    await expect(socialActions.locator("svg")).toHaveCount(4);

    await socialActions
      .getByRole("button", { name: "Copy Discord username cappyeo" })
      .click();
    await expect(socialActions.getByRole("status")).toHaveText(
      "Discord username copied"
    );
  });

  test("skip to content link works", async ({ page }) => {
    await page.goto(BASE);
    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Skip to content" });
    await expect(skipLink).toBeFocused();
  });
});

test.describe("Blog", () => {
  test("blog listing loads with posts", async ({ page }) => {
    await page.goto(`${BASE}/blog`);
    await expect(page.locator("h1")).toContainText("Thoughts & writings");
    await expect(page.locator("article").first()).toBeVisible();
  });

  test("blog search filters posts", async ({ page }) => {
    await page.goto(`${BASE}/blog`);
    await page.getByPlaceholder("Search posts...").fill("liquid glass");
    await expect(page.locator("article")).toHaveCount(1);
    await expect(page.locator("article").first()).toContainText("Liquid Glass");
  });

  test("blog tag filter works", async ({ page }) => {
    await page.goto(`${BASE}/blog`);
    await page.getByRole("button", { name: "CSS" }).click();
    await expect(page.locator("article")).toHaveCount(1);
  });

  test("blog post loads with content", async ({ page }) => {
    await page.goto(`${BASE}/blog/building-liquid-glass-ui`);
    await expect(page.locator("h1")).toContainText("Liquid Glass UI");
    await expect(page.locator("h2").first()).toBeVisible();
  });

  test("blog post has prev/next nav", async ({ page }) => {
    await page.goto(`${BASE}/blog/why-simplicity-wins`);
    await expect(page.getByText("Previous")).toBeVisible();
    await expect(page.getByText("Next")).toBeVisible();
  });

  test("blog post has table of contents", async ({ page }) => {
    await page.goto(`${BASE}/blog/building-liquid-glass-ui`);
    await expect(
      page
        .getByRole("complementary")
        .getByRole("link", { name: "The Three Layers", exact: true })
    ).toBeVisible();
  });
});

test.describe("Case Study", () => {
  test("case study page loads", async ({ page }) => {
    await page.goto(`${BASE}/work/mycar`);
    await expect(page.locator("h1")).toContainText("MyCar");
    await expect(page.locator("h2").filter({ hasText: "The Challenge" })).toBeVisible();
    await expect(page.locator("h2").filter({ hasText: "The Solution" })).toBeVisible();
    await expect(page.locator("h2").filter({ hasText: "The Result" })).toBeVisible();
  });

  test("case study has key features", async ({ page }) => {
    await page.goto(`${BASE}/work/heynabi`);
    await expect(page.locator("h2").filter({ hasText: "Key Features" })).toBeVisible();
  });

  test("case study has metrics", async ({ page }) => {
    await page.goto(`${BASE}/work/heynabi`);
    await expect(page.getByText("99%", { exact: true })).toBeVisible();
    await expect(page.getByText("STT Accuracy", { exact: true })).toBeVisible();
  });

  test("Cluber case study exposes the deployed app and source code", async ({ page }) => {
    await page.goto(`${BASE}/work/cluber`);
    await expect(page.locator("h1")).toContainText("Cluber");
    await expect(page.getByRole("link", { name: "Visit live site" })).toHaveAttribute(
      "href",
      "https://cluber-seven.vercel.app"
    );
    await expect(page.getByRole("link", { name: "View source" })).toHaveAttribute(
      "href",
      "https://github.com/cappylab/cluber"
    );
  });
});

test.describe("RSS & SEO", () => {
  test("RSS feed returns XML", async ({ request }) => {
    const res = await request.get(`${BASE}/feed.xml`);
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("xml");
    const body = await res.text();
    expect(body).toContain("<rss");
    expect(body).toContain("Ha-min Jeong");
  });

  test("sitemap returns XML", async ({ request }) => {
    const res = await request.get(`${BASE}/sitemap.xml`);
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("<urlset");
    expect(body).toContain("<loc>https://jeonghamin.dev/work</loc>");
    expect(body).toContain("/work/mycar");
    expect(body).toContain("/work/cluber");
    expect(body).toContain("/blog/building-liquid-glass-ui");
  });

  test("security headers are present", async ({ request }) => {
    const res = await request.get(BASE);
    expect(res.headers()["x-frame-options"]).toBe("DENY");
    expect(res.headers()["x-content-type-options"]).toBe("nosniff");
    expect(res.headers()["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(res.headers()["content-security-policy"]).toBeTruthy();
  });
});

test.describe("i18n", () => {
  test("Korean locale loads with translated nav", async ({ page }) => {
    await page.goto(`${BASE}/ko`);
    await expect(page.locator("html")).toHaveAttribute("lang", "ko");
    const nav = page.getByRole("navigation");
    await expect(nav.getByRole("link", { name: "프로젝트" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "소개" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "블로그" })).toBeVisible();
  });

  test("Vietnamese locale loads with translated nav", async ({ page }) => {
    await page.goto(`${BASE}/vi`);
    await expect(page.locator("html")).toHaveAttribute("lang", "vi");
    const nav = page.getByRole("navigation");
    await expect(nav.getByRole("link", { name: "Dự án" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Giới thiệu" })).toBeVisible();
  });

  test("English default locale has no prefix", async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    expect(page.url()).toBe(`${BASE}/`);
  });

  test("sitemap contains locale alternates", async ({ request }) => {
    const res = await request.get(`${BASE}/sitemap.xml`);
    const body = await res.text();
    expect(body).toContain("hreflang=\"ko\"");
    expect(body).toContain("hreflang=\"vi\"");
    expect(body).toContain("/ko/blog");
    expect(body).toContain("/vi/work/mycar");
  });
});

test.describe("Mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("hamburger menu opens and closes", async ({ page }) => {
    await page.goto(BASE);
    const toggle = page.getByLabel("Open menu");
    await toggle.click();
    await expect(page.getByRole("menuitem", { name: "Work" })).toBeVisible();
    // Close via hamburger button (now shows "Close menu")
    await page.getByLabel("Close menu").click();
    // Menu animates to max-h-0 — check the container is collapsed
    const menu = page.locator("[role=menu]");
    await expect(menu).toHaveCSS("max-height", "0px");
  });
});
