import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { USERS } from '../test-data/users';

// Customer information used in the checkout test cases
const CUSTOMER = { firstName: 'Test', lastName: 'User', postalCode: '00100' };

// Checkout test cases TC-12 to TC-15 (owner: Johnny).
test.describe('Checkout', () => {
  test('TC-12 Complete a purchase end to end', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard);

    // Add a product and go to checkout
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    // Fill in the customer information
    await page.locator('[data-test="firstName"]').fill(CUSTOMER.firstName);
    await page.locator('[data-test="lastName"]').fill(CUSTOMER.lastName);
    await page.locator('[data-test="postalCode"]').fill(CUSTOMER.postalCode);
    await page.locator('[data-test="continue"]').click();

    // The overview lists the product
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');

    // Finish the order: confirmation is shown and the cart is empty
    await page.locator('[data-test="finish"]').click();
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
  });
});