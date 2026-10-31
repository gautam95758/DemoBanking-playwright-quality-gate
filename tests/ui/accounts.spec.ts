import { test, expect } from '../fixtures/test';
import { expectedAccounts } from '../helpers/testData';

test('account cards show types, balances, status, and masked numbers', async ({ signedIn, page }) => {
  for (const account of expectedAccounts) {
    const card = page.getByRole('article', { name: account.name });
    await expect(card).toBeVisible();
    await expect(card).toContainText(account.type);
    await expect(card.getByTestId(`account-balance-${account.id}`)).toHaveText(`$${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`);
    await expect(card).toContainText(account.maskedNumber);
    await expect(card).toContainText(account.status);
    await expect(card).not.toContainText(/\b\d{8,}\b/);
  }
});

test('multiple expected accounts are rendered', async ({ signedIn, dashboardPage }) => {
  await expect(dashboardPage.accountCards).toHaveCount(expectedAccounts.length);
});