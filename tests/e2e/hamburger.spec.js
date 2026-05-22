import { test, expect } from '@playwright/test';

// ============================================================
// Hamburger menu — extended edge cases beyond nav.spec.js
// ============================================================

test('close button (×) closes the overlay', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  await page.locator('.hamburger').click();
  await expect(page.locator('.nav-overlay')).toHaveClass(/open/);

  await page.locator('.nav-overlay-close').click();
  await expect(page.locator('.nav-overlay')).not.toHaveClass(/open/);
});

test('close button resets aria-expanded to false', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  await page.locator('.hamburger').click();
  await expect(page.locator('.hamburger')).toHaveAttribute('aria-expanded', 'true');

  await page.locator('.nav-overlay-close').click();
  await expect(page.locator('.hamburger')).toHaveAttribute('aria-expanded', 'false');
});

test('hamburger aria-expanded toggles correctly on open and close', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  // Initial state
  await expect(page.locator('.hamburger')).toHaveAttribute('aria-expanded', 'false');

  // Open
  await page.locator('.hamburger').click();
  await expect(page.locator('.hamburger')).toHaveAttribute('aria-expanded', 'true');

  // Close via hamburger second click
  await page.locator('.hamburger').click();
  await expect(page.locator('.hamburger')).toHaveAttribute('aria-expanded', 'false');
});

test('all five overlay links are present', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.locator('.hamburger').click();

  for (const href of ['#about', '#skills', '#experience', '#projects', '#contact']) {
    await expect(page.locator(`.nav-overlay a[href="${href}"]`)).toBeVisible();
  }
});

test('clicking each overlay link closes the menu', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  for (const href of ['#skills', '#experience', '#projects', '#contact']) {
    await page.locator('.hamburger').click();
    await expect(page.locator('.nav-overlay')).toHaveClass(/open/);
    await page.locator(`.nav-overlay a[href="${href}"]`).click();
    await expect(page.locator('.nav-overlay')).not.toHaveClass(/open/);
  }
});

test('hamburger button has open class while menu is open', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  await page.locator('.hamburger').click();
  await expect(page.locator('.hamburger')).toHaveClass(/open/);

  await page.locator('.hamburger').click();
  await expect(page.locator('.hamburger')).not.toHaveClass(/open/);
});
