import { expect, test } from "@playwright/test";

test.describe("Companies Page", () => {
  test("renders headline", async ({ page }) => {
    await page.goto("/companies");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Browse Companies");
  });

  test("loads company data and displays results count", async ({ page }) => {
    await page.goto("/companies");
    // Wait for data to load — the text "Showing" appears after fetch completes
    await expect(page.getByText(/Showing.*companies/)).toBeVisible({ timeout: 15000 });
    // Should show 1000 companies initially
    await expect(page.getByText(/1,000/)).toBeVisible();
  });

  test("renders company cards in virtualized list", async ({ page }) => {
    await page.goto("/companies");
    // Wait for data load
    await expect(page.getByText(/Showing.*companies/)).toBeVisible({ timeout: 15000 });
    // Company cards should be visible (at least one with data-index attribute)
    await expect(page.locator("[data-index]").first()).toBeVisible();
  });

  test("company cards display expected fields", async ({ page }) => {
    await page.goto("/companies");
    await expect(page.getByText(/Showing.*companies/)).toBeVisible({ timeout: 15000 });
    // Cards should show location, employees, founded, type labels
    await expect(page.getByText("Location").first()).toBeVisible();
    await expect(page.getByText("Employees").first()).toBeVisible();
    await expect(page.getByText("Founded").first()).toBeVisible();
    await expect(page.getByText("Type").first()).toBeVisible();
  });

  test("virtual list only renders visible items", async ({ page }) => {
    await page.goto("/companies");
    await expect(page.getByText(/Showing.*companies/)).toBeVisible({ timeout: 15000 });
    // With 1000 items and virtualization, DOM should have far fewer items
    const visibleItems = await page.locator("[data-index]").count();
    expect(visibleItems).toBeLessThan(50);
    expect(visibleItems).toBeGreaterThan(0);
  });

  test("search filter reduces results", async ({ page }) => {
    await page.goto("/companies");
    await expect(page.getByText(/Showing.*companies/)).toBeVisible({ timeout: 15000 });

    const searchInput = page.getByPlaceholder("Search companies by name or description...");
    await searchInput.fill("rose");
    // Wait for debounce (300ms) and results to update
    await page.waitForTimeout(500);
    // Results count should be less than 1000
    await expect(page.getByText(/Showing.*of.*1,000.*companies/)).toBeVisible();
  });

  test("API endpoint returns valid data", async ({ request }) => {
    const response = await request.get("/api/companies");
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.total).toBe(1000);
    expect(data.data).toHaveLength(1000);
    expect(data.data[0]).toHaveProperty("name");
    expect(data.data[0]).toHaveProperty("category");
    expect(data.data[0]).toHaveProperty("country");
  });
});
