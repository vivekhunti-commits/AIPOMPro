import type { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly username: Locator = this.page.getByPlaceholder('Username');
  readonly password: Locator = this.page.getByPlaceholder('Password');
  readonly loginButton: Locator = this.page.getByRole('button', { name: 'Login' });
  readonly errorMessage: Locator = this.page.getByRole('alert');

  async open(): Promise<void> {
    await this.goto();
  }

  async login(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}