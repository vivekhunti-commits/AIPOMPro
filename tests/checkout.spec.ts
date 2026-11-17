import { test, expect } from '../fixtures/testFixtures';
import { checkoutInformation, credentials, products, taxRate } from '../test-data/testData';
import { formatPrice, parsePrice } from '../utils/testHelpers';

test.describe('Checkout', () => {
  test.beforeEach(async ({ loginPage, productsPage, cartPage }) => {
    await loginPage.open();
    await loginPage.login(credentials.standard.username, credentials.standard.password);
    await productsPage.addToCart(products.backpack.name);
    await productsPage.openCart();
    await cartPage.checkout();
  });

  test('shows the checkout information page and advances with valid data', async ({ checkoutPage }) => {
    await expect(checkoutPage.title).toHaveText('Checkout: Your Information');
    await checkoutPage.fillInformation(
      checkoutInformation.firstName,
      checkoutInformation.lastName,
      checkoutInformation.postalCode,
    );
    await checkoutPage.continue();
    await expect(checkoutPage.title).toHaveText('Checkout: Overview');
  });

  test('validates mandatory checkout information', async ({ checkoutPage }) => {
    await checkoutPage.continue();
    await expect(checkoutPage.errorMessage).toHaveText('Error: First Name is required');
    await checkoutPage.firstName.fill(checkoutInformation.firstName);
    await checkoutPage.continue();
    await expect(checkoutPage.errorMessage).toHaveText('Error: Last Name is required');
    await checkoutPage.lastName.fill(checkoutInformation.lastName);
    await checkoutPage.continue();
    await expect(checkoutPage.errorMessage).toHaveText('Error: Postal Code is required');
  });

  test('calculates item total, tax, and grand total in the overview', async ({ checkoutPage }) => {
    await checkoutPage.fillInformation(
      checkoutInformation.firstName,
      checkoutInformation.lastName,
      checkoutInformation.postalCode,
    );
    await checkoutPage.continue();

    await expect(checkoutPage.title).toHaveText('Checkout: Overview');
    await expect(checkoutPage.overviewItemNames).toHaveText([products.backpack.name]);
    await expect(checkoutPage.overviewItemPrices).toHaveText('$29.99');

    const itemTotal = products.backpack.price;
    const tax = Math.round(itemTotal * taxRate * 100) / 100;
    await expect(checkoutPage.itemTotal).toHaveText(`Item total: ${formatPrice(itemTotal)}`);
    await expect(checkoutPage.tax).toHaveText(`Tax: ${formatPrice(tax)}`);
    await expect(checkoutPage.grandTotal).toHaveText(`Total: ${formatPrice(itemTotal + tax)}`);
    expect(parsePrice(await checkoutPage.grandTotal.innerText())).toBe(itemTotal + tax);
  });

  test('finishes checkout and confirms the order', async ({ checkoutPage, orderConfirmationPage }) => {
    await checkoutPage.fillInformation(
      checkoutInformation.firstName,
      checkoutInformation.lastName,
      checkoutInformation.postalCode,
    );
    await checkoutPage.continue();
    await checkoutPage.finish();
    await expect(orderConfirmationPage.heading).toBeVisible();
    await expect(orderConfirmationPage.completionMessage).toBeVisible();
  });
});