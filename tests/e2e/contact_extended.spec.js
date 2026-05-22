import { test, expect } from '@playwright/test';

// ============================================================
// Contact form — edge cases not covered by contact.spec.js
// ============================================================

test('status element shows "sending..." immediately on submit', async ({ page }) => {
  // Delay the network response so we can observe the intermediate state
  await page.route('https://formspree.io/**', async (route) => {
    await new Promise((r) => setTimeout(r, 500));
    await route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) });
  });
  await page.goto('/');

  await page.fill('.contact-form input[name="full-name"]', 'Tester');
  await page.fill('.contact-form input[name="email"]', 'tester@example.com');
  await page.fill('.contact-form textarea[name="message"]', 'Ping');
  await page.click('.contact-form button[type="submit"]');

  // The "sending..." text should appear before the response arrives
  await expect(page.locator('.form-status')).toHaveText('sending...');
});

test('status class is cleared to bare form-status on submit start', async ({ page }) => {
  // First get into a success state
  await page.route('https://formspree.io/**', (route) =>
    route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) })
  );
  await page.goto('/');
  await page.fill('.contact-form input[name="full-name"]', 'First');
  await page.fill('.contact-form input[name="email"]', 'first@example.com');
  await page.fill('.contact-form textarea[name="message"]', 'First message');
  await page.click('.contact-form button[type="submit"]');
  await expect(page.locator('.form-status')).toHaveClass(/form-status--success/);

  // Now submit again with a slow route to catch the reset
  await page.unroute('https://formspree.io/**');
  await page.route('https://formspree.io/**', async (route) => {
    await new Promise((r) => setTimeout(r, 400));
    await route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) });
  });

  await page.fill('.contact-form input[name="full-name"]', 'Second');
  await page.fill('.contact-form input[name="email"]', 'second@example.com');
  await page.fill('.contact-form textarea[name="message"]', 'Second message');
  await page.click('.contact-form button[type="submit"]');

  // className should be reset — no longer has --success while sending
  await expect(page.locator('.form-status')).not.toHaveClass(/form-status--success/);
});

test('network failure (fetch throws) shows error message', async ({ page }) => {
  await page.route('https://formspree.io/**', (route) => route.abort());
  await page.goto('/');

  await page.fill('.contact-form input[name="full-name"]', 'Tester');
  await page.fill('.contact-form input[name="email"]', 'tester@example.com');
  await page.fill('.contact-form textarea[name="message"]', 'Network drop test');
  await page.click('.contact-form button[type="submit"]');

  await expect(page.locator('.form-status')).toHaveClass(/form-status--error/);
  await expect(page.locator('.form-status')).toHaveText(/something went wrong/);
});

test('form is reset (fields cleared) after successful submission', async ({ page }) => {
  await page.route('https://formspree.io/**', (route) =>
    route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) })
  );
  await page.goto('/');

  await page.fill('.contact-form input[name="full-name"]', 'Clear Me');
  await page.fill('.contact-form input[name="email"]', 'clear@example.com');
  await page.fill('.contact-form textarea[name="message"]', 'Should be cleared');
  await page.click('.contact-form button[type="submit"]');

  await expect(page.locator('.form-status')).toHaveClass(/form-status--success/);
  await expect(page.locator('.contact-form input[name="email"]')).toHaveValue('');
  await expect(page.locator('.contact-form textarea[name="message"]')).toHaveValue('');
});

test('form is NOT reset after a failed submission', async ({ page }) => {
  await page.route('https://formspree.io/**', (route) =>
    route.fulfill({ status: 500, body: 'server error' })
  );
  await page.goto('/');

  await page.fill('.contact-form input[name="full-name"]', 'Keep Me');
  await page.fill('.contact-form input[name="email"]', 'keep@example.com');
  await page.fill('.contact-form textarea[name="message"]', 'Should stay');
  await page.click('.contact-form button[type="submit"]');

  await expect(page.locator('.form-status')).toHaveClass(/form-status--error/);
  // Field values survive an error so the user does not lose their message
  await expect(page.locator('.contact-form input[name="email"]')).toHaveValue('keep@example.com');
  await expect(page.locator('.contact-form textarea[name="message"]')).toHaveValue('Should stay');
});

test('contact social links are present and have external targets', async ({ page }) => {
  await page.goto('/');
  const githubLink = page.locator('.contact-links a[href*="github.com"]');
  const linkedinLink = page.locator('.contact-links a[href*="linkedin.com"]');
  await expect(githubLink).toBeVisible();
  await expect(linkedinLink).toBeVisible();
  await expect(githubLink).toHaveAttribute('target', '_blank');
  await expect(linkedinLink).toHaveAttribute('target', '_blank');
});

test('error message text is correct', async ({ page }) => {
  await page.route('https://formspree.io/**', (route) =>
    route.fulfill({ status: 422, body: 'validation error' })
  );
  await page.goto('/');

  await page.fill('.contact-form input[name="full-name"]', 'Tester');
  await page.fill('.contact-form input[name="email"]', 'tester@example.com');
  await page.fill('.contact-form textarea[name="message"]', 'Test');
  await page.click('.contact-form button[type="submit"]');

  await expect(page.locator('.form-status')).toHaveText(
    'something went wrong. try emailing directly.'
  );
});
