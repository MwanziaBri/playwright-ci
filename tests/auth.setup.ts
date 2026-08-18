// tests/auth.setup.ts
import { test as setup, expect } from '@playwright/test';

setup('authenticate user', async ({ page }) => {
  await page.goto('/web/index.php/auth/login');
  
  // Login
  await page.getByRole('textbox', { name: 'Username' }).fill('admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Wait for dashboard
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  
  // Save auth state
  await page.context().storageState({ path: 'auth.json' });
});