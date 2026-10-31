import { test, expect } from '../fixtures/test';
import { invalidUser, validUser } from '../helpers/testData';

test('login page loads with branded form and demo hint', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.expectVisible();
  await expect(page.getByText('Username:')).toBeVisible();
  await expect(loginPage.username).toBeVisible();
  await expect(loginPage.password).toBeVisible();
});

test('valid credentials open the banking dashboard', async ({ loginPage, dashboardPage }) => {
  await loginPage.goto();
  await loginPage.login(validUser.username, validUser.password);
  await dashboardPage.expectLoaded();
  await expect(dashboardPage.welcomeMessage).toContainText(validUser.displayName);
});

test('invalid credentials show a useful error without entering the dashboard', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.login(invalidUser.username, invalidUser.password);
  await loginPage.expectError(/incorrect/i);
  await expect(page.getByRole('region', { name: 'Account summary' })).toBeHidden();
});

test('empty username is validated', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.password.fill(validUser.password);
  await loginPage.submitEmpty();
  await loginPage.expectError(/username/i);
});

test('empty password is validated', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.username.fill(validUser.username);
  await loginPage.submitEmpty();
  await loginPage.expectError(/password/i);
});

test('password field masks the entered value', async ({ loginPage }) => {
  await loginPage.goto();
  await expect(loginPage.password).toHaveAttribute('type', 'password');
});