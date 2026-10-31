import { test, expect } from '../fixtures/test';
import { expectedTransactions, validUser } from '../helpers/testData';
import type { LoginResponse, TransactionsResponse } from '../types/api.types';

test('authenticated user receives valid transaction records', async ({ authApi, transactionsApi }) => {
  const login = await authApi.login(validUser);
  const { token } = await login.json() as LoginResponse;
  const response = await transactionsApi.list(token);
  expect(response.status()).toBe(200);
  const body = await response.json() as TransactionsResponse;
  expect(body.transactions).toEqual(expectedTransactions);
  for (const transaction of body.transactions) {
    expect(transaction.amount).toBeGreaterThan(0);
    expect(['Credit', 'Debit']).toContain(transaction.type);
    expect(transaction.status).toBe('Completed');
    expect(transaction.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  }
});

test('account filter returns transactions for that account only', async ({ authApi, transactionsApi }) => {
  const login = await authApi.login(validUser);
  const { token } = await login.json() as LoginResponse;
  const response = await transactionsApi.list(token, 'acct-1001');
  expect(response.status()).toBe(200);
  const body = await response.json() as TransactionsResponse;
  expect(body.transactions.length).toBeGreaterThan(0);
  expect(body.transactions.every((transaction) => transaction.accountId === 'acct-1001')).toBe(true);
});

test('transactions reject unauthenticated requests', async ({ transactionsApi }) => {
  expect((await transactionsApi.list()).status()).toBe(401);
  expect((await transactionsApi.list('invalid-demo-token')).status()).toBe(401);
});