import type { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export type ProductSortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class ProductsPage extends BasePage {
  readonly title: Locator = this.page.getByText('Products', { exact: true });
  readonly productCards: Locator = this.page.locator('.inventory_item');
  readonly productNames: Locator = this.page.locator('.inventory_item_name');
  readonly productPrices: Locator = this.page.locator('.inventory_item_price');
  readonly sortControl: Locator = this.page.getByRole('combobox', { name: 'Sort products' });
  readonly cartLink: Locator = this.page.getByRole('button', { name: /^Cart/ });

  private productCard(productName: string): Locator {
    return this.productCards.filter({
      has: this.page.getByRole('button', { name: `View details for ${productName}` }),
    });
  }

  async getProductNames(): Promise<string[]> {
    return this.productNames.allTextContents();
  }

  async getProductPrices(): Promise<string[]> {
    return this.productPrices.allTextContents();
  }

  async addToCart(productName: string): Promise<void> {
    await this.productCard(productName).getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeFromCart(productName: string): Promise<void> {
    await this.productCard(productName).getByRole('button', { name: 'Remove' }).click();
  }

  async sortProducts(option: ProductSortOption): Promise<void> {
    await this.sortControl.selectOption(option);
  }

  async getCartBadgeCount(): Promise<number> {
    const label = (await this.cartLink.getAttribute('aria-label')) ?? await this.cartLink.innerText();
    return Number(label.match(/\d+/)?.[0] ?? 0);
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}