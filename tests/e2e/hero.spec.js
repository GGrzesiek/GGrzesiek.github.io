import { test, expect } from '@playwright/test';

// ============================================================
// HERO section — static content, CTA links, particles canvas
// ============================================================

test('hero name and tagline render', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#hero-name')).toBeVisible();
  await expect(page.locator('.hero-tagline')).toBeVisible();
});

test('hero CTA contact link points to #contact', async ({ page }) => {
  await page.goto('/');
  const contactBtn = page.locator('.hero-cta a[href="#contact"]');
  await expect(contactBtn).toBeVisible();
  await expect(contactBtn).toHaveText('./contact.sh');
});

test('hero resume download link has download attribute', async ({ page }) => {
  await page.goto('/');
  const resumeLink = page.locator('.hero-cta a[download]');
  await expect(resumeLink).toBeVisible();
  await expect(resumeLink).toHaveAttribute('href', /resume\.pdf/);
});

test('particles canvas is present in hero', async ({ page }) => {
  await page.goto('/');
  // tsParticles injects a <canvas> inside #particles
  await expect(page.locator('#particles')).toBeVisible();
});

test('typed element exists in hero role line', async ({ page }) => {
  await page.goto('/');
  // The #typed span is where Typed.js renders; it must be present
  await expect(page.locator('#typed')).toBeAttached();
});
