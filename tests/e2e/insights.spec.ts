import { expect, test } from "@playwright/test";

test.describe("Insights Page", () => {
  test("renders headline", async ({ page }) => {
    await page.goto("/insights");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Insights");
  });

  test("renders all four chart sections", async ({ page }) => {
    await page.goto("/insights");
    await expect(page.locator("#category-chart")).toBeVisible();
    await expect(page.locator("#business-type-chart")).toBeVisible();
    await expect(page.locator("#founding-year-chart")).toBeVisible();
    await expect(page.locator("#geographic-chart")).toBeVisible();
  });

  test("chart section headings are present", async ({ page }) => {
    await page.goto("/insights");
    await expect(page.getByText("Category Distribution")).toBeVisible();
    await expect(page.getByText("Business Types")).toBeVisible();
    await expect(page.getByText("Companies by Founding Year")).toBeVisible();
    await expect(page.getByText("Geographic Distribution")).toBeVisible();
  });

  test("key statistics section renders", async ({ page }) => {
    await page.goto("/insights");
    await expect(page.getByText("Key Statistics")).toBeVisible();
    await expect(page.getByText("1,000+")).toBeVisible();
    await expect(page.getByText("Total Companies")).toBeVisible();
  });

  test("charts render canvas or content when scrolled into view", async ({ page }) => {
    await page.goto("/insights");
    // Scroll to the charts section to trigger client:visible hydration
    await page.locator("#category-chart").scrollIntoViewIfNeeded();
    // Wait for React hydration — charts render canvas elements or SVG
    await expect(
      page.locator("#category-chart").locator("canvas, svg, [data-testid]").first(),
    ).toBeVisible({ timeout: 10000 });
  });

  test("Browse Companies CTA works", async ({ page }) => {
    await page.goto("/insights");
    const cta = page.getByRole("link", { name: "Browse Companies" });
    await expect(cta).toBeVisible();
    await cta.click();
    await expect(page).toHaveURL(/\/companies/);
  });
});
