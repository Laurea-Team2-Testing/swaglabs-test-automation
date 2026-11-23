import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { USERS } from '../test-data/users';

// Customer information used in the checkout test cases
const CUSTOMER = { firstName: 'Test', lastName: 'User', postalCode: '00100' };

// Data rows for TC-13: which fields are filled and the expected error
const REQUIRED_FIELD_CASES = [
  { row: '(a) all fields empty', firstName: '', lastName: '', postalCode: '', error: 'Error: First Name is required' },
  { row: '(b) first name only', firstName: CUSTOMER.firstName, lastName: '', postalCode: '', error: 'Error: Last Name is required' },
  { row: '(c) first and last name only', firstName: CUSTOMER.firstName, lastName: CUSTOMER.lastName, postalCode: '', error: 'Error: Postal Code is required' },
];

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

  for (const data of REQUIRED_FIELD_CASES) {
    test(`TC-13 Checkout required-field validation ${data.row}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(USERS.standard);

      // Precondition: one product in the cart, on the "Checkout: Your Information" page
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('[data-test="shopping-cart-link"]').click();
      await page.locator('[data-test="checkout"]').click();

      // Fill the fields according to the data row and continue
      await page.locator('[data-test="firstName"]').fill(data.firstName);
      await page.locator('[data-test="lastName"]').fill(data.lastName);
      await page.locator('[data-test="postalCode"]').fill(data.postalCode);
      await page.locator('[data-test="continue"]').click();

      // The expected error is shown and the user stays on the information page
      await expect(page.locator('[data-test="error"]')).toHaveText(data.error);
      await expect(page).toHaveURL(/checkout-step-one\.html/);
    });
  }

  test('TC-14 Order overview totals are correct', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard);

    // Add two products and go to the overview page
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill(CUSTOMER.firstName);
    await page.locator('[data-test="lastName"]').fill(CUSTOMER.lastName);
    await page.locator('[data-test="postalCode"]').fill(CUSTOMER.postalCode);
    await page.locator('[data-test="continue"]').click();

    // Item total = $29.99 + $9.99, total = item total + tax
    await expect(page.locator('[data-test="subtotal-label"]')).toHaveText('Item total: $39.98');
    await expect(page.locator('[data-test="tax-label"]')).toHaveText('Tax: $3.20');
    await expect(page.locator('[data-test="total-label"]')).toHaveText('Total: $43.18');
  });
});