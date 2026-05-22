import { test, expect } from '@playwright/test';

test('nav links visible on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.goto('/');
  await expect(page.locator('.nav-links')).toBeVisible();
  await expect(page.locator('.nav-links a[href="#about"]')).toBeVisible();
  await expect(page.locator('.nav-links a[href="#contact"]')).toBeVisible();
});

test('hamburger hidden on desktop, visible on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.goto('/');
  await expect(page.locator('.hamburger')).toBeHidden();

  await page.setViewportSize({ width: 375, height: 812 });
  await expect(page.locator('.hamburger')).toBeVisible();
});

test('hamburger toggles nav overlay open and closed', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  const overlay = page.locator('.nav-overlay');
  await expect(overlay).not.toHaveClass(/open/);

  await page.locator('.hamburger').click();
  await expect(overlay).toHaveClass(/open/);

  await page.locator('.hamburger').click();
  await expect(overlay).not.toHaveClass(/open/);
});

test('clicking an overlay link closes the menu', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.locator('.hamburger').click();
  await page.locator('.nav-overlay a[href="#about"]').click();
  await expect(page.locator('.nav-overlay')).not.toHaveClass(/open/);
});
