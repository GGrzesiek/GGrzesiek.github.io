import { test, expect } from '@playwright/test';

// ============================================================
// Accessibility — aria attributes, landmark roles, semantics
// ============================================================

test('nav has aria-label', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('nav[aria-label="Primary"]')).toBeAttached();
});

test('hamburger button has aria-label="Menu"', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hamburger[aria-label="Menu"]')).toBeAttached();
});

test('nav overlay has role=dialog and aria-modal=true', async ({ page }) => {
  await page.goto('/');
  const overlay = page.locator('.nav-overlay[role="dialog"][aria-modal="true"]');
  await expect(overlay).toBeAttached();
});

test('form status has aria-live="polite"', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.form-status[aria-live="polite"]')).toBeAttached();
});

test('form inputs have associated labels', async ({ page }) => {
  await page.goto('/');
  // Each input/textarea must resolve to a label via htmlFor
  await expect(page.locator('label[for="form-name"]')).toBeAttached();
  await expect(page.locator('label[for="form-email"]')).toBeAttached();
  await expect(page.locator('label[for="form-message"]')).toBeAttached();
});

test('hero section has aria-labelledby pointing to existing element', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#hero[aria-labelledby="hero-name"]')).toBeAttached();
  await expect(page.locator('#hero-name')).toBeAttached();
});

test('page title is set', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/.+/);
});

test('page has lang attribute on html element', async ({ page }) => {
  await page.goto('/');
  const lang = await page.locator('html').getAttribute('lang');
  expect(lang).toBeTruthy();
});

test('project links have rel="noopener"', async ({ page }) => {
  await page.goto('/');
  const projectLinks = page.locator('.project-link[target="_blank"]');
  const count = await projectLinks.count();
  for (let i = 0; i < count; i++) {
    const rel = await projectLinks.nth(i).getAttribute('rel');
    expect(rel).toContain('noopener');
  }
});

test('footer is present', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('footer')).toBeVisible();
});
