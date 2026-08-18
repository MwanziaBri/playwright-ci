import { test, expect } from '@playwright/test';

test.use({ storageState: { cookies: [], origins: [] } }); // ← No auth for these tests

test('User is on the login page', async ({ page }) => {
  await page.goto('/web/index.php/auth/login');
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshots/login-page.png' });

});

test('Invalid login attempt', async ({ page }) => {
  await page.goto('/web/index.php/auth/login');

  await page.getByRole('textbox', { name: 'Username' }).fill('admin123');
  await page.getByRole('textbox', { name: 'Password' }).fill('password');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByRole('alert')).toContainText('Invalid credentials');
});