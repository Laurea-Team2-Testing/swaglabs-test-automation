
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { USERS } from '../test-data/users';

// Authentication test cases TC-01 to TC-04.
test.describe('Authentication', () => {

  test('TC-01 Valid login with standard_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('TC-02 Locked-out user cannot log in', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.lockedOut);

    await expect(loginPage.error).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });

  test('TC-03 Login with wrong password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard, 'wrong_password');

    await expect(loginPage.error).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('TC-04 Login with empty username or password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Both username and password are empty
    await loginPage.login('', '');
    await expect(loginPage.error).toHaveText(
      'Epic sadface: Username is required'
    );

    // Username is empty
    await loginPage.login('', 'secret_sauce');
    await expect(loginPage.error).toHaveText(
      'Epic sadface: Username is required'
    );

    // Password is empty
    await loginPage.login('standard_user', '');
    await expect(loginPage.error).toHaveText(
      'Epic sadface: Password is required'
    );
  });

});
