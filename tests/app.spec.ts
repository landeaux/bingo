import { test, expect } from "@playwright/test";

test.describe("App", () => {
  test("has title", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Bingo/);
  });

  test("can generate band names", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText(/.+, .+, .+/)).not.toBeVisible();

    await page.getByLabel("Genre").click();
    await page.getByLabel("Genre").fill("Indie Rock");
    await page.getByRole("button", { name: "Generate names" }).click();

    await expect(page.getByText(/.+, .+, .+/)).toBeVisible();
  });
});
