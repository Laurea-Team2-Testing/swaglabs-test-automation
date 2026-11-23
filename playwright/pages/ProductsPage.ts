
import { type Locator, type Page } from '@playwright/test';

// Page object for the Swag Labs products page.
export class ProductsPage {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productNames = page.locator('[data-test="inventory-item-name"]');
    this.productPrices = page.locator('[data-test="inventory-item-price"]');
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption({ label: option });
  }

  async getProductNames(): Promise<string[]> {
    return await this.productNames.allTextContents();
  }

  async getProductPrices(): Promise<string[]> {
    return await this.productPrices.allTextContents();
  }

  async openBackpackDetails() {
    await this.page.locator('[data-test="item-4-title-link"]').click();
  }

  async getDetailProductName(): Promise<string> {
    return await this.page.locator('.inventory_details_name').innerText();
  }

  async getDetailProductPrice(): Promise<string> {
    return await this.page.locator('.inventory_details_price').innerText();
  }

  async backToProducts() {
    await this.page.locator('[data-test="back-to-products"]').click();
  }
}
