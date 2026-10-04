import { type Locator, type Page } from '@playwright/test';

export class ProductDetailsPage {
  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly backToProductsButton: Locator;

  constructor(private readonly page: Page) {
    this.productName = page.getByText('Sauce Labs Fleece Jacket', { exact: true });
    this.productDescription = page.locator('.inventory_details_desc');
    this.productPrice = page.getByText('$49.99', { exact: true });
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    this.backToProductsButton = page.getByRole('button', { name: 'Back to products' });
  }

  async backToProducts(): Promise<void> {
    await this.backToProductsButton.click();
  }
}
