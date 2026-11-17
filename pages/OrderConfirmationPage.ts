import type { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class OrderConfirmationPage extends BasePage {
  readonly heading: Locator = this.page.getByRole('heading', { name: 'Thank you for your order!' });
  readonly completionMessage: Locator = this.page.getByText(
    'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
    { exact: true },
  );

  async backHome(): Promise<void> {
    await this.page.getByRole('button', { name: 'Back Home' }).click();
  }
}