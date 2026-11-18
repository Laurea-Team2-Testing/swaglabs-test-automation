import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { USERS } from '../test-data/users';

// Logout and Reset App State test cases TC-08 and TC-09 (owner: Johnny).
test.describe('Session', () => {
  test('TC-08 Logout and protected page access', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard);

    // Open the menu and log out
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('[data-test="logout-sidebar-link"]').click();

    // The login page is shown again
    await expect(page).toHaveURL('/');
    await expect(loginPage.loginButton).toBeVisible();

    // Opening the product page without logging in is refused
    await page.goto('/inventory.html');
    await expect(loginPage.error).toHaveText(
      "Epic sadface: You can only access '/inventory.html' when you are logged in."
    );
  });
});