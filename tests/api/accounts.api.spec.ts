import { test, expect } from '../fixtures/test';
import { expectedAccounts, validUser } from '../helpers/testData';
import type { AccountResponse, AccountsResponse, ErrorResponse, LoginResponse } from '../types/api.types';

test('authenticated customer receives all expected accounts', async ({ authApi, accountsApi }) => {
  const login = await authApi.login(validUser);
  const { token } = await login.json() as LoginResponse;
  const response = await accountsApi.list(token);
  expect(response.status()).toBe(200);
  const body = await response.json() as AccountsResponse;
  expect(body.accounts).toHaveLength(2);
  expect(body.accounts).toEqual(expectedAccounts);
  for (const account of body.accounts) {
    expect(account).toMatchObject({ id: expect.any(String), type: expect.any(String), maskedNumber: expect.any(String), currency: 'USD', balance: expect.any(Number), status: 'Active' });
    expect(account.maskedNumber).not.toMatch(/\d{8,}/);
  }
});

test('authenticated user can retrieve one account by id', async ({ authApi, accountsApi }) => {
  const login = await authApi.login(validUser);
  const { token } = await login.json() as LoginResponse;
  const response = await accountsApi.get(expectedAccounts[0].id, token);
  expect(response.status()).toBe(200);
  expect((await response.json() as AccountResponse).account).toEqual(expectedAccounts[0]);
});

test('unknown account returns 404', async ({ authApi, accountsApi }) => {
  const login = await authApi.login(validUser);
  const { token } = await login.json() as LoginResponse;
  const response = await accountsApi.get('acct-missing', token);
  expect(response.status()).toBe(404);
  expect((await response.json() as ErrorResponse).error).toMatch(/not found/i);
});

test('account endpoints reject missing and invalid tokens', async ({ accountsApi }) => {
  expect((await accountsApi.list()).status()).toBe(401);
  expect((await accountsApi.list('invalid-demo-token')).status()).toBe(401);
});