import { test, expect } from '../fixtures/testFixtures';
import { credentials } from '../test-data/testData';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('logs in with valid credentials and opens Products', async ({ loginPage, productsPage }) => {
    await loginPage.login(credentials.standard.username, credentials.standard.password);
    await expect(productsPage.title).toHaveText('Products');
    await expect(productsPage.productCards).toHaveCount(6);
  });

  test('rejects an invalid username', async ({ loginPage }) => {
    await loginPage.login(credentials.invalidUsername.username, credentials.invalidUsername.password);
    await expect(loginPage.errorMessage).toContainText('Username and password do not match any user');
  });

  test('rejects an invalid password', async ({ loginPage }) => {
    await loginPage.login(credentials.invalidPassword.username, credentials.invalidPassword.password);
    await expect(loginPage.errorMessage).toContainText('Username and password do not match any user');
  });

  test('requires a username', async ({ loginPage }) => {
    await loginPage.login('', credentials.standard.password);
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');
  });

  test('requires a password', async ({ loginPage }) => {
    await loginPage.login(credentials.standard.username, '');
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Password is required');
  });

  test('shows the locked-out user error', async ({ loginPage }) => {
    await loginPage.login(credentials.lockedOut.username, credentials.lockedOut.password);
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  });
});