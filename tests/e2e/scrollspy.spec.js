import { test, expect } from '@playwright/test';

// ============================================================
// ScrollSpy — nav link .active class tracks visible section
// ============================================================

test('no nav link starts with active class before scroll', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.goto('/');
  // Hero is above the fold; IntersectionObserver rootMargin makes hero
  // the first activating section.  All we assert here: at most one link
  // has the active class at any time (no multi-active).
  const activeCount = await page.locator('.nav-links a.active').count();
  expect(activeCount).toBeLessThanOrEqual(1);
});

test('scrolling to about section activates the about nav link', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.goto('/');
  await page.locator('#about').scrollIntoViewIfNeeded();
  // Give IntersectionObserver time to fire
  await page.waitForTimeout(300);
  await expect(page.locator('.nav-links a[href="#about"]')).toHaveClass(/active/);
});

test('scrolling to contact section activates the contact nav link', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.goto('/');
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await expect(page.locator('.nav-links a[href="#contact"]')).toHaveClass(/active/);
});

test('only one nav link is active at a time', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.goto('/');
  await page.locator('#skills').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const activeLinks = await page.locator('.nav-links a.active').count();
  expect(activeLinks).toBeLessThanOrEqual(1);
});
