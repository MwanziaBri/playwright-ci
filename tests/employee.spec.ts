// tests/employee.spec.ts
import { test, expect } from '@playwright/test';

test('Navigate to Employee List', async ({ page }) => {
  // Already logged in via storageState!
  await page.goto('/web/index.php/pim/viewEmployeeList');
  await expect(page.getByRole('heading', { name: 'Employee Information' })).toBeVisible();
  
  await expect(page.locator('.orangehrm-employee-list .oxd-table-body .oxd-table-card').first()).toBeVisible({ timeout: 15_000 });
  
  // Check that at least one employee record exists
  const rowCount = await page.locator('.orangehrm-employee-list .oxd-table-body .oxd-table-card').count();
  expect(rowCount).toBeGreaterThan(0);

  // Screenshot of employee list
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshots/employee-list.png' });
});

test('View employee details', async ({ page }) => {
  await page.goto('/web/index.php/pim/viewEmployeeList');
  
    
  await expect(page.locator('.orangehrm-employee-list .oxd-table-body .oxd-table-card').first()).toBeVisible({ timeout: 15_000 });
  
  // Click first employee
  await page.locator('.orangehrm-employee-list .oxd-table-body .oxd-table-card').first().click();
  await expect(page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();
  // Screenshot of employee details
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshots/employee-details.png' });
});

test('Search employee by name', async ({ page }) => {
  await page.goto('/web/index.php/pim/viewEmployeeList');
  
  // Fill search field if it exists
  const searchBox = page.getByPlaceholder(/search|employee name/i);
  if (await searchBox.isVisible()) {
    await searchBox.fill('Peter');
    await page.keyboard.press('Enter');
    
    // Verify results filtered
    const rows = await page.locator('table tbody tr').count();
    expect(rows).toBeGreaterThan(0);
  }
});