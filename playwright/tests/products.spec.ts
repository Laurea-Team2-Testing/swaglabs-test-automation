
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { USERS } from '../test-data/users';

// Product test cases TC-05 to TC-07.
test.describe('Products', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard);
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('TC-05 Sort products by price, low to high', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.sortBy('Price (low to high)');

    const prices = await productsPage.getProductPrices();

    expect(prices[0]).toBe('$7.99');
    expect(prices[prices.length - 1]).toBe('$49.99');

    const numericPrices = prices.map(price =>
      Number(price.replace('$', ''))
    );

    expect(numericPrices).toEqual(
      [...numericPrices].sort((a, b) => a - b)
    );
  });

  test('TC-06 Sort products by name, Z to A', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.sortBy('Name (Z to A)');

    const names = await productsPage.getProductNames();

    expect(names[0]).toBe('Test.allTheThings() T-Shirt (Red)');

    expect(names).toEqual(
      [...names].sort((a, b) => b.localeCompare(a))
    );
  });

  test('TC-07 Product details match the product list', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    const productNames = await productsPage.getProductNames();
    const productPrices = await productsPage.getProductPrices();

    const backpackIndex = productNames.indexOf('Sauce Labs Backpack');

    expect(backpackIndex).toBeGreaterThanOrEqual(0);
    expect(productPrices[backpackIndex]).toBe('$29.99');

    await productsPage.openBackpackDetails();

    await expect(
      page.locator('.inventory_details_name')
    ).toHaveText('Sauce Labs Backpack');

    await expect(
      page.locator('.inventory_details_price')
    ).toHaveText('$29.99');

    await expect(
      page.locator('[data-test="add-to-cart"]')
    ).toBeVisible();

    await productsPage.backToProducts();

    await expect(page).toHaveURL(/inventory\.html/);
  });

});
