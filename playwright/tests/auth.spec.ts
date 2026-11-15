import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { USERS } from '../test-data/users';

// Authentication test cases TC-01 to TC-04 (owner: Lisa).
// TC-01 also works as the setup check for the Playwright environment.
test.describe('Authentication', () => {
  test('TC-01 Valid login with standard_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });
});
