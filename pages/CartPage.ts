import type { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly title: Locator = this.page.getByText('Your Cart', { exact: true });
  readonly cartItems: Locator = this.page.locator('.cart_item');
  readonly itemNames: Locator = this.page.locator('.inventory_item_name');
  readonly itemPrices: Locator = this.page.locator('.inventory_item_price');

  private cartItem(productName: string): Locator {
    return this.cartItems.filter({ has: this.page.getByText(productName, { exact: true }) });
  }

  async getItemNames(): Promise<string[]> {
    return this.itemNames.allTextContents();
  }

  async getItemPrices(): Promise<string[]> {
    return this.itemPrices.allTextContents();
  }

  async getItemQuantity(productName: string): Promise<string> {
    return this.cartItem(productName).locator('.cart_quantity').innerText();
  }

  async removeItem(productName: string): Promise<void> {
    await this.cartItem(productName).getByRole('button', { name: 'Remove' }).click();
  }

  async continueShopping(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
  }

  async checkout(): Promise<void> {
    await this.page.getByRole('button', { name: 'Checkout' }).click();
  }
}