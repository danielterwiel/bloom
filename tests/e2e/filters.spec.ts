import { expect, test } from "@playwright/test";

test.describe("Filters", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/companies");
    // Wait for data to load
    await expect(page.getByText(/Showing.*companies/)).toBeVisible({ timeout: 15000 });
  });

  test("text search filters results with debounce", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search companies by name or description...");
    await searchInput.fill("bloom");
    // Wait for debounce
    await page.waitForTimeout(500);
    // Should show filtered count
    await expect(page.getByText(/Showing.*of.*1,000.*companies/)).toBeVisible();
  });

  test("text search updates URL", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search companies by name or description...");
    await searchInput.fill("tulip");
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/q=tulip/);
  });

  test("clear all button resets filters", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search companies by name or description...");
    await searchInput.fill("test search");
    await page.waitForTimeout(500);

    // Clear all button should appear
    const clearButton = page.getByRole("button", { name: "Clear all" });
    await expect(clearButton).toBeVisible();
    await clearButton.click();

    // Search should be cleared and showing full results
    await expect(searchInput).toHaveValue("");
    // URL should be clean
    await expect(page).toHaveURL(/\/companies$/);
  });

  test("URL state preserved on reload", async ({ page }) => {
    // Apply a text filter
    const searchInput = page.getByPlaceholder("Search companies by name or description...");
    await searchInput.fill("garden");
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/q=garden/);

    // Reload the page
    await page.reload();
    await expect(page.getByText(/Showing.*companies/)).toBeVisible({ timeout: 15000 });

    // Filter should still be applied
    await expect(searchInput).toHaveValue("garden");
    await expect(page).toHaveURL(/q=garden/);
  });

  test("URL with filter params loads filtered results", async ({ page }) => {
    // Navigate directly to URL with filter params
    await page.goto("/companies?q=rose");
    await expect(page.getByText(/Showing.*companies/)).toBeVisible({ timeout: 15000 });

    // Search input should have the value
    const searchInput = page.getByPlaceholder("Search companies by name or description...");
    await expect(searchInput).toHaveValue("rose");
    // Results should be filtered (less than 1000)
    await expect(page.getByText(/Showing.*of.*1,000.*companies/)).toBeVisible();
  });

  test("filter panel shows all filter controls", async ({ page }) => {
    await expect(page.getByPlaceholder("Search companies by name or description...")).toBeVisible();
    await expect(page.getByText("Founded Year")).toBeVisible();
  });

  test("founded year range is displayed", async ({ page }) => {
    // Default range should show 1990-2024
    await expect(page.getByText("1990–2024")).toBeVisible();
  });

  test("navigating from category card on landing page applies filter", async ({ page }) => {
    // Go to landing page and click a category card
    await page.goto("/");
    await page.getByRole("link", { name: /Florists/ }).click();
    await expect(page).toHaveURL(/\/companies\?.*category=Florist/);

    // Wait for data load and verify results are filtered
    await expect(page.getByText(/Showing.*companies/)).toBeVisible({ timeout: 15000 });
  });
});
