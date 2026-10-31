import { test, expect } from '../fixtures/test';
import { validUser } from '../helpers/testData';
import type { AccountsResponse, LoginResponse } from '../types/api.types';

test('dashboard account balances match authenticated API data', async ({ authApi, accountsApi, loginPage, dashboardPage, page }) => {
  const loginResponse = await authApi.login(validUser);
  const { token } = await loginResponse.json() as LoginResponse;
  const accountsResponse = await accountsApi.list(token);
  const { accounts } = await accountsResponse.json() as AccountsResponse;

  await loginPage.goto();
  await loginPage.login(validUser.username, validUser.password);
  await dashboardPage.expectLoaded();
  for (const account of accounts) {
    await expect(page.getByTestId(`account-balance-${account.id}`)).toHaveText(
      `$${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    );
  }
});