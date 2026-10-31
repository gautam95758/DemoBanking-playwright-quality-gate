import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(private readonly page: Page) {
    this.username = page.getByLabel('Username');
    this.password = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: /sign in/i });
    this.errorMessage = page.getByRole('alert');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async submitEmpty(): Promise<void> {
    await this.loginButton.click();
  }

  async expectVisible(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Sign in to Northstar' })).toBeVisible();
  }

  async expectError(message: RegExp | string): Promise<void> {
    await expect(this.errorMessage).toContainText(message);
  }
}