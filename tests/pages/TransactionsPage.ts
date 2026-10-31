import { expect, type Locator, type Page } from '@playwright/test';

export class TransactionsPage {
  readonly transactionList: Locator;
  readonly transactionRows: Locator;
  readonly descriptions: Locator;
  readonly amounts: Locator;

  constructor(page: Page) {
    this.transactionList = page.getByRole('table', { name: 'Recent transactions' });
    this.transactionRows = this.transactionList.locator('tbody tr');
    this.descriptions = this.transactionRows.locator('td:first-child');
    this.amounts = this.transactionRows.locator('.transaction-amount');
  }

  async expectVisible(): Promise<void> {
    await expect(this.transactionList).toBeVisible();
    await expect(this.transactionRows.first()).toBeVisible();
  }

  async descriptionsText(): Promise<string[]> {
    return this.descriptions.allTextContents();
  }
}