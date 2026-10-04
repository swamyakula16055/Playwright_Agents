import { type Locator, type Page } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly paymentInformation: Locator;
  readonly shippingInformation: Locator;
  readonly itemTotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  private readonly cartItems: Locator;
  private readonly finishButton: Locator;

  constructor(private readonly page: Page) {
    this.paymentInformation = page.getByText('SauceCard #31337', { exact: true });
    this.shippingInformation = page.getByText('Free Pony Express Delivery!', { exact: true });
    this.itemTotal = page.getByText('Item total: $49.99', { exact: true });
    this.tax = page.getByText('Tax: $4.00', { exact: true });
    this.total = page.getByText('Total: $53.99', { exact: true });
    this.cartItems = page.locator('.cart_item');
    this.finishButton = page.getByRole('button', { name: 'Finish' });
  }

  item(name: string): Locator {
    return this.cartItems.filter({ hasText: name });
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }
}
