import { type Locator, type Page } from '@playwright/test';

export class CheckoutCompletePage {
  readonly confirmationHeading: Locator;
  readonly dispatchMessage: Locator;
  readonly cartButton: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.confirmationHeading = page.getByRole('heading', { name: 'Thank you for your order!' });
    this.dispatchMessage = page.getByText('Your order has been dispatched', { exact: false });
    this.cartButton = page.getByRole('button', { name: /^Cart/ });
    this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
  }
}
