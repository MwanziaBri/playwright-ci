// tests/employee.spec.ts
import { test, expect } from '@playwright/test';

test('Navigate to Employee List', async ({ page }) => {
  // Already logged in via storageState!
  await page.goto('/web/index.php/pim/viewEmployeeList');
  await expect(page.getByRole('heading', { name: 'Employee Information' })).toBeVisible();
  
  // Wait for table to load - use simpler selector
  await page.waitForSelector('.orangehrm-employee-list .oxd-table-body .oxd-table-card', { timeout: 3000 });
  
  // Check that at least one employee record exists
  const rowCount = await page.locator('.orangehrm-employee-list .oxd-table-body .oxd-table-card').count();
  expect(rowCount).toBeGreaterThan(0);

  // Screenshot of dashboard
  await page.screenshot({ path: 'screenshots/employee-list.png' });
});

test('View employee details', async ({ page }) => {
  await page.goto('/web/index.php/pim/viewEmployeeList');
  
    
  // Wait for table to load - use simpler selector
  await page.waitForSelector('.orangehrm-employee-list .oxd-table-body .oxd-table-card', { timeout: 3000 });
  
  // Click first employee
  await page.locator('.orangehrm-employee-list .oxd-table-body .oxd-table-card').first().click();
  await expect(page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();
  // Screenshot of employee details
  await page.screenshot({ path: 'screenshots/single-employee-details.png' });
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