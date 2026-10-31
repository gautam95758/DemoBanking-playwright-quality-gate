import { test, expect } from '../fixtures/test';
import { expectedTransactions } from '../helpers/testData';

test('transaction history includes descriptions, dates, status, amounts, and types', async ({ signedIn, page, transactionsPage }) => {
  await transactionsPage.expectVisible();
  const rows = transactionsPage.transactionRows;
  await expect(rows).toHaveCount(expectedTransactions.length);
  for (const transaction of expectedTransactions) {
    const exactRow = page.locator(`[data-transaction-id="${transaction.id}"]`);
    await expect(exactRow).toContainText(transaction.description);
    await expect(exactRow).toContainText(transaction.status);
    await expect(exactRow).toContainText(transaction.type);
    await expect(exactRow).toContainText(new Date(`${transaction.date}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }));
    await expect(page.getByTestId(`transaction-amount-${transaction.id}`)).toContainText(
      transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 }),
    );
  }
  await expect(page.getByText('Credit', { exact: true }).first()).toBeVisible();
  await expect(page.getByText('Debit', { exact: true }).first()).toBeVisible();
});

test('transaction descriptions match the shared deterministic test data', async ({ signedIn, transactionsPage }) => {
  await expect(await transactionsPage.descriptionsText()).toEqual(expectedTransactions.map((transaction) => transaction.description));
});