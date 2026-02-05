import { expect, test } from "@playwright/test";

test.describe("Navigation", () => {
  test("header displays logo and nav links", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.getByRole("link", { name: "Bloom" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Home" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "About" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Insights" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Companies" }).first()).toBeVisible();
  });

  test("nav link to About page works", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "About" }).first().click();
    await expect(page).toHaveURL(/\/about/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("About Bloom");
  });

  test("nav link to Insights page works", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Insights" }).first().click();
    await expect(page).toHaveURL(/\/insights/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Insights");
  });

  test("nav link to Companies page works", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Companies" }).first().click();
    await expect(page).toHaveURL(/\/companies/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Browse Companies");
  });

  test("nav link to Home page works from another page", async ({ page }) => {
    await page.goto("/about");
    await page.getByRole("link", { name: "Home" }).first().click();
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Flower Industry Directory",
    );
  });

  test("logo links to home page", async ({ page }) => {
    await page.goto("/about");
    await page.getByRole("link", { name: "Bloom" }).first().click();
    await expect(page).toHaveURL("/");
  });

  test("footer displays on all pages", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("footer")).toBeVisible();
    await expect(page.locator("footer")).toContainText("Bloom");

    await page.goto("/about");
    await expect(page.locator("footer")).toBeVisible();

    await page.goto("/insights");
    await expect(page.locator("footer")).toBeVisible();
  });

  test("mobile menu button exists", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await expect(page.locator("#mobile-menu-button")).toBeVisible();
  });
});
