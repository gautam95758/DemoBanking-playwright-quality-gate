import { test as base, expect } from '@playwright/test';
import { AccountsApiClient } from '../clients/AccountsApiClient';
import { AuthApiClient } from '../clients/AuthApiClient';
import { TransactionsApiClient } from '../clients/TransactionsApiClient';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { TransactionsPage } from '../pages/TransactionsPage';
import { validUser } from '../helpers/testData';

type Fixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  transactionsPage: TransactionsPage;
  authApi: AuthApiClient;
  accountsApi: AccountsApiClient;
  transactionsApi: TransactionsApiClient;
  signedIn: void;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  dashboardPage: async ({ page }, use) => use(new DashboardPage(page)),
  transactionsPage: async ({ page }, use) => use(new TransactionsPage(page)),
  authApi: async ({ request }, use) => use(new AuthApiClient(request)),
  accountsApi: async ({ request }, use) => use(new AccountsApiClient(request)),
  transactionsApi: async ({ request }, use) => use(new TransactionsApiClient(request)),
  signedIn: async ({ loginPage, dashboardPage }, use) => {
    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);
    await dashboardPage.expectLoaded();
    await use();
  },
});

export { expect };