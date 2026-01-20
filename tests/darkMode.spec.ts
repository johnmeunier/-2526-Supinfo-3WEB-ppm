import { test, expect } from "@playwright/test";

test("dark mode toggle should work correctly", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  
  // Wait for the page to load
  await page.waitForSelector("header");
  
  // Check that the theme toggle button is present
  const themeToggleButton = page.getByRole("button", { name: /Basculer vers le mode/i });
  await expect(themeToggleButton).toBeVisible();
  
  // Get the initial theme (should be light mode or based on system preference)
  const initialTheme = await page.evaluate(() => {
    return document.documentElement.getAttribute("data-theme");
  });
  
  // Click the theme toggle button
  await themeToggleButton.click();
  
  // Check that the theme has changed
  const newTheme = await page.evaluate(() => {
    return document.documentElement.getAttribute("data-theme");
  });
  
  expect(newTheme).not.toBe(initialTheme);
  expect(["light", "dark"]).toContain(newTheme);
  
  // Verify localStorage was updated
  const storedTheme = await page.evaluate(() => {
    return localStorage.getItem("theme");
  });
  
  expect(storedTheme).toBe(newTheme);
});

test("theme preference should persist after page reload", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  
  // Wait for the page to load
  await page.waitForSelector("header");
  
  // Get the theme toggle button
  const themeToggleButton = page.getByRole("button", { name: /Basculer vers le mode/i });
  
  // Toggle to dark mode
  await themeToggleButton.click();
  
  // Get the current theme
  const themeBeforeReload = await page.evaluate(() => {
    return document.documentElement.getAttribute("data-theme");
  });
  
  // Reload the page
  await page.reload();
  
  // Wait for the page to load again
  await page.waitForSelector("header");
  
  // Check that the theme is still the same
  const themeAfterReload = await page.evaluate(() => {
    return document.documentElement.getAttribute("data-theme");
  });
  
  expect(themeAfterReload).toBe(themeBeforeReload);
});

test("theme toggle button should show correct icon", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  
  // Wait for the page to load
  await page.waitForSelector("header");
  
  // Get the theme toggle button
  const themeToggleButton = page.getByRole("button", { name: /Basculer vers le mode/i });
  
  // Get the initial theme
  const initialTheme = await page.evaluate(() => {
    return document.documentElement.getAttribute("data-theme");
  });
  
  // Check the icon based on the initial theme
  const buttonText = await themeToggleButton.textContent();
  
  if (initialTheme === "dark") {
    expect(buttonText).toBe("☀️");
  } else {
    expect(buttonText).toBe("🌙");
  }
  
  // Click the toggle and check the icon again
  await themeToggleButton.click();
  
  const newButtonText = await themeToggleButton.textContent();
  expect(newButtonText).not.toBe(buttonText);
});
