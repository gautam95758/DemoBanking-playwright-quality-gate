import { test, expect } from '../fixtures/test';

test('logout returns to login and removes protected dashboard access', async ({ signedIn, dashboardPage, loginPage, page }) => {
  await dashboardPage.logout();
  await loginPage.expectVisible();
  await expect(page.getByRole('region', { name: 'Account summary' })).toBeHidden();
  await expect(page.getByRole('article')).toHaveCount(0);
});

test('reloading after logout requires a new login', async ({ signedIn, dashboardPage, loginPage, page }) => {
  await dashboardPage.logout();
  await page.reload();
  await loginPage.expectVisible();
  await expect(page.getByRole('heading', { name: /welcome,/i })).toBeHidden();
});