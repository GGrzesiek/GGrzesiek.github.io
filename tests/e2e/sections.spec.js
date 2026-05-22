import { test, expect } from '@playwright/test';

test('all six sections are present', async ({ page }) => {
  await page.goto('/');
  for (const id of ['hero', 'about', 'skills', 'experience', 'projects', 'contact']) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
});

test('section labels render correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#about .section-label')).toHaveText('// ABOUT_ME');
  await expect(page.locator('#skills .section-label')).toHaveText('// SKILLS');
  await expect(page.locator('#experience .section-label')).toHaveText('// EXPERIENCE');
  await expect(page.locator('#projects .section-label')).toHaveText('// PROJECTS');
  await expect(page.locator('#contact .section-label')).toHaveText('// CONTACT');
});

test('skills grid has five groups', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.skill-group')).toHaveCount(5);
});

test('timeline has at least two entries', async ({ page }) => {
  await page.goto('/');
  const count = await page.locator('.timeline-entry').count();
  expect(count).toBeGreaterThanOrEqual(2);
});

test('projects grid has at least two cards', async ({ page }) => {
  await page.goto('/');
  const count = await page.locator('.project-card').count();
  expect(count).toBeGreaterThanOrEqual(2);
});
