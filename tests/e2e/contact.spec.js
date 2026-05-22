import { test, expect } from '@playwright/test';

test('contact form has all required fields', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.contact-form input[name="full-name"]')).toBeVisible();
  await expect(page.locator('.contact-form input[name="email"]')).toBeVisible();
  await expect(page.locator('.contact-form textarea[name="message"]')).toBeVisible();
  await expect(page.locator('.contact-form button[type="submit"]')).toBeVisible();
});

test('successful submission shows confirmation and resets the form', async ({ page }) => {
  await page.route('https://formspree.io/**', (route) =>
    route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) })
  );
  await page.goto('/');

  await page.fill('.contact-form input[name="full-name"]', 'Test User');
  await page.fill('.contact-form input[name="email"]', 'test@example.com');
  await page.fill('.contact-form textarea[name="message"]', 'Hello from Playwright');
  await page.click('.contact-form button[type="submit"]');

  await expect(page.locator('.form-status')).toHaveText('done. message sent.');
  await expect(page.locator('.form-status')).toHaveClass(/form-status--success/);
  await expect(page.locator('.contact-form input[name="full-name"]')).toHaveValue('');
});

test('failed submission shows error message', async ({ page }) => {
  await page.route('https://formspree.io/**', (route) =>
    route.fulfill({ status: 500, body: 'error' })
  );
  await page.goto('/');

  await page.fill('.contact-form input[name="full-name"]', 'Test User');
  await page.fill('.contact-form input[name="email"]', 'test@example.com');
  await page.fill('.contact-form textarea[name="message"]', 'Test message');
  await page.click('.contact-form button[type="submit"]');

  await expect(page.locator('.form-status')).toHaveClass(/form-status--error/);
});
