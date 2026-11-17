import type { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly title: Locator = this.page.getByText(/Checkout: (Your Information|Overview)/);
  readonly firstName: Locator = this.page.getByRole('textbox', { name: 'First Name' });
  readonly lastName: Locator = this.page.getByRole('textbox', { name: 'Last Name' });
  readonly postalCode: Locator = this.page.getByRole('textbox', { name: 'Zip/Postal Code' });
  readonly errorMessage: Locator = this.page.getByRole('alert');
  readonly itemTotal: Locator = this.page.getByText(/^Item total:/);
  readonly tax: Locator = this.page.getByText(/^Tax:/);
  readonly grandTotal: Locator = this.page.getByText(/^Total:/);
  readonly overviewItemNames: Locator = this.page.locator('.inventory_item_name');
  readonly overviewItemPrices: Locator = this.page.locator('.inventory_item_price');

  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }

  async continue(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async finish(): Promise<void> {
    await this.page.getByRole('button', { name: 'Finish' }).click();
  }

  async getOverviewItemNames(): Promise<string[]> {
    return this.overviewItemNames.allTextContents();
  }

  async getOverviewItemPrices(): Promise<string[]> {
    return this.overviewItemPrices.allTextContents();
  }
}