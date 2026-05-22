import { test, expect } from '@playwright/test';

// ============================================================
// Responsive layout — key CSS breakpoint behaviours
// ============================================================

test('projects grid is single column on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  // On mobile the grid collapses to 1fr. Both cards should stack vertically.
  const cards = page.locator('.project-card');
  await expect(cards).toHaveCount(2);
  const box0 = await cards.nth(0).boundingBox();
  const box1 = await cards.nth(1).boundingBox();
  // Stacked means card 1 starts below card 0 (y2 > y1)
  expect(box1.y).toBeGreaterThan(box0.y + box0.height - 10); // 10px tolerance
});

test('contact grid is single column on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const grid = page.locator('.contact-grid');
  const style = await grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns);
  // Single-column layout produces one track
  expect(style.trim().split(' ').length).toBe(1);
});

test('nav links are hidden on mobile (hamburger takes over)', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await expect(page.locator('.nav-links')).toBeHidden();
  await expect(page.locator('.hamburger')).toBeVisible();
});

test('nav links are visible and hamburger hidden on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  await expect(page.locator('.nav-links')).toBeVisible();
  await expect(page.locator('.hamburger')).toBeHidden();
});
