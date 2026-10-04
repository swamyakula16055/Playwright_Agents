import { type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly pageTitle: Locator;
  readonly productCards: Locator;
  readonly sortControl: Locator;
  readonly cartButton: Locator;
  private readonly productTitleButtons: Locator;

  constructor(private readonly page: Page) {
    this.pageTitle = page.getByText('Products', { exact: true });
    this.productCards = page.locator('.inventory_item');
    this.sortControl = page.getByRole('combobox', { name: 'Sort products' });
    this.cartButton = page.getByRole('button', { name: /^Cart/ });
    this.productTitleButtons = page.locator('[data-test$="-title-link"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  productNameAt(index: number): Locator {
    return this.productTitleButtons.nth(index);
  }

  private productCard(name: string): Locator {
    return this.productCards.filter({ hasText: name });
  }

  async openProduct(name: string): Promise<void> {
    await this.productCard(name).getByRole('button', { name: `View details for ${name}` }).last().click();
  }

  async addProduct(name: string): Promise<void> {
    await this.productCard(name).getByRole('button', { name: 'Add to cart' }).click();
  }

  removeProductButton(name: string): Locator {
    return this.productCard(name).getByRole('button', { name: 'Remove' });
  }

  async sortBy(value: string): Promise<void> {
    await this.sortControl.selectOption(value);
  }

  async openCart(): Promise<void> {
    await this.cartButton.click();
  }
}
