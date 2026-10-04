import { type Locator, type Page } from '@playwright/test';

export class AppMenuPage {
  private readonly openMenuButton: Locator;
  private readonly logoutButton: Locator;

  constructor(page: Page) {
    this.openMenuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
  }

  async open(): Promise<void> {
    await this.openMenuButton.click();
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
  }
}
