import { expect, test } from "@playwright/test";

test.describe("Landing Page", () => {
  test("renders hero section with headline", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Flower Industry Directory",
    );
  });

  test("displays stats section", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("1000+")).toBeVisible();
    await expect(page.getByText("Companies").first()).toBeVisible();
    await expect(page.getByText("Countries").first()).toBeVisible();
    await expect(page.getByText("Categories").first()).toBeVisible();
  });

  test("CTA button links to companies page", async ({ page }) => {
    await page.goto("/");
    const ctaLink = page.getByRole("link", { name: "Explore Companies" });
    await expect(ctaLink).toBeVisible();
    await expect(ctaLink).toHaveAttribute("href", "/companies");
  });

  test("View Insights link exists", async ({ page }) => {
    await page.goto("/");
    const insightsLink = page.getByRole("link", { name: "View Insights" });
    await expect(insightsLink).toBeVisible();
    await expect(insightsLink).toHaveAttribute("href", "/insights");
  });

  test("Explore by Category section renders", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Explore by Category")).toBeVisible();
  });

  test("category cards link to filtered companies", async ({ page }) => {
    await page.goto("/");
    const floristCard = page.getByRole("link", { name: /Florists/ });
    await expect(floristCard).toBeVisible();
    await floristCard.click();
    await expect(page).toHaveURL(/\/companies\?.*category=Florist/);
  });

  test("CTA navigates to companies page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Explore Companies" }).click();
    await expect(page).toHaveURL(/\/companies/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Browse Companies");
  });
});
