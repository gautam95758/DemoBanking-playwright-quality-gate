import { expect, type Locator, type Page } from '@playwright/test';

export class DashboardPage {
  readonly welcomeMessage: Locator;
  readonly accountSummary: Locator;
  readonly accountCards: Locator;
  readonly recentTransactions: Locator;
  readonly logoutButton: Locator;

  constructor(private readonly page: Page) {
    this.welcomeMessage = page.getByRole('heading', { name: /welcome,/i });
    this.accountSummary = page.getByRole('region', { name: 'Account summary' });
    this.accountCards = page.locator('.account-card');
    this.recentTransactions = page.getByRole('table', { name: 'Recent transactions' });
    this.logoutButton = page.getByRole('button', { name: /sign out/i });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.welcomeMessage).toBeVisible();
    await expect(this.accountSummary).toBeVisible();
  }

  async accountBalance(accountId: string): Promise<string | null> {
    return this.page.getByTestId(`account-balance-${accountId}`).textContent();
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
  }
}