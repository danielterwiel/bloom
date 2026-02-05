import { expect, test } from "@playwright/test";

test.describe("About Page", () => {
  test("renders headline", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("About Bloom");
  });

  test("renders mission section cards", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByText("Our Mission")).toBeVisible();
    await expect(page.getByText("What We Offer")).toBeVisible();
    await expect(page.getByText("Our Commitment")).toBeVisible();
  });

  test("renders Why Choose Bloom section", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByText("Why Choose Bloom?")).toBeVisible();
    await expect(page.getByText("Powerful Search")).toBeVisible();
    await expect(page.getByText("Global Coverage")).toBeVisible();
    await expect(page.getByText("Industry Insights")).toBeVisible();
    await expect(page.getByText("Verified Data")).toBeVisible();
  });

  test("CTA links to companies and insights", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByText("Ready to explore?")).toBeVisible();
    await expect(page.getByRole("link", { name: "Browse Companies" })).toHaveAttribute(
      "href",
      "/companies",
    );
    await expect(page.getByRole("link", { name: "View Insights" })).toHaveAttribute(
      "href",
      "/insights",
    );
  });

  test("page has correct title", async ({ page }) => {
    await page.goto("/about");
    await expect(page).toHaveTitle(/About/);
  });
});
