import { test, expect } from '../fixtures/test';
import { expectedTotalBalance, validUser } from '../helpers/testData';

test('dashboard welcomes the customer and presents a populated summary', async ({ signedIn, dashboardPage, page }) => {
  await expect(dashboardPage.welcomeMessage).toContainText(validUser.displayName);
  await expect(dashboardPage.accountSummary).toBeVisible();
  await expect(page.getByTestId('total-balance')).toHaveText('$17,035.72');
  await expect(page.getByText('2 accounts', { exact: true }).first()).toBeVisible();
  expect(expectedTotalBalance).toBe(17035.72);
});

test('dashboard shows account cards and recent transaction activity', async ({ signedIn, dashboardPage, transactionsPage }) => {
  await expect(dashboardPage.accountCards).toHaveCount(2);
  await transactionsPage.expectVisible();
  await expect(transactionsPage.transactionRows).toHaveCount(5);
});