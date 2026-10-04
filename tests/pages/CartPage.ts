import { type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly cartButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;
  private readonly cartItems: Locator;

  constructor(private readonly page: Page) {
    this.cartButton = page.getByRole('button', { name: /^Cart/ });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.cartItems = page.locator('.cart_item');
  }

  item(name: string): Locator {
    return this.cartItems.filter({ hasText: name });
  }

  quantity(name: string): Locator {
    return this.item(name).locator('.cart_quantity');
  }

  async removeItem(name: string): Promise<void> {
    await this.item(name).getByRole('button', { name: 'Remove' }).click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
