import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { USERS } from '../test-data/users';

// Shopping cart test cases TC-10 and TC-11 (owner: Johnny).
test.describe('Shopping cart', () => {
  test('TC-10 Add products to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard);

    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');

    // Add the first product: badge shows 1
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(cartBadge).toHaveText('1');

    // Add the second product: badge shows 2
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await expect(cartBadge).toHaveText('2');

    // Both buttons have changed to Remove
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toHaveText('Remove');
    await expect(page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]')).toHaveText('Remove');

    // The cart lists both products with correct names and prices
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText([
      'Sauce Labs Backpack',
      'Sauce Labs Bolt T-Shirt',
    ]);
    await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText(['$29.99', '$15.99']);
  });

  test('TC-11 Remove a product from the cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard);

    // Precondition: two products in the cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    // Remove the Backpack from the cart
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    // Only the Bolt T-Shirt remains and the badge shows 1
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(['Sauce Labs Bolt T-Shirt']);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });
});