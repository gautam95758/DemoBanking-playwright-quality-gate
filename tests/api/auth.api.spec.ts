import { test, expect } from '../fixtures/test';
import { invalidUser, validUser } from '../helpers/testData';
import type { ErrorResponse, LoginResponse } from '../types/api.types';

test('valid credentials return a token and safe user profile', async ({ authApi }) => {
  const response = await authApi.login(validUser);
  expect(response.status()).toBe(200);
  const body = await response.json() as LoginResponse;
  expect(body.token).toBeTruthy();
  expect(body.user).toMatchObject({ id: validUser.id, username: validUser.username, displayName: validUser.displayName });
  expect(JSON.stringify(body)).not.toContain(validUser.password);
});

test('invalid credentials return 401 with a meaningful error', async ({ authApi }) => {
  const response = await authApi.login(invalidUser);
  expect(response.status()).toBe(401);
  expect((await response.json() as ErrorResponse).error).toMatch(/incorrect/i);
});

test('empty credentials are rejected as invalid input', async ({ authApi }) => {
  const response = await authApi.login({ username: '', password: '' });
  expect(response.status()).toBe(400);
  expect((await response.json() as ErrorResponse).error).toMatch(/required/i);
});

test('logout invalidates the demo session token', async ({ authApi, accountsApi }) => {
  const login = await authApi.login(validUser);
  const { token } = await login.json() as LoginResponse;
  expect((await authApi.logout(token)).status()).toBe(200);
  expect((await accountsApi.list(token)).status()).toBe(401);
});