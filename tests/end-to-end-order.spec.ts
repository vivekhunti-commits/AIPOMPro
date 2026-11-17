import { test, expect } from '../fixtures/testFixtures';
import { checkoutInformation, credentials, products, taxRate } from '../test-data/testData';
import { formatPrice } from '../utils/testHelpers';

test('completes an order from login through returning home', async ({
  loginPage,
  productsPage,
  cartPage,
  checkoutPage,
  orderConfirmationPage,
}) => {
  await loginPage.open();
  await loginPage.login(credentials.standard.username, credentials.standard.password);
  await expect(productsPage.title).toHaveText('Products');

  const selectedProducts = [products.backpack, products.bikeLight];
  for (const product of selectedProducts) {
    await productsPage.addToCart(product.name);
  }
  expect(await productsPage.getCartBadgeCount()).toBe(2);
  await productsPage.openCart();
  await expect(cartPage.itemNames).toHaveText(selectedProducts.map(({ name }) => name));
  await cartPage.checkout();

  await checkoutPage.fillInformation(
    checkoutInformation.firstName,
    checkoutInformation.lastName,
    checkoutInformation.postalCode,
  );
  await checkoutPage.continue();
  await expect(checkoutPage.title).toHaveText('Checkout: Overview');
  await expect(checkoutPage.overviewItemNames).toHaveText(selectedProducts.map(({ name }) => name));
  await expect(checkoutPage.overviewItemPrices).toHaveText(selectedProducts.map(({ price }) => formatPrice(price)));

  const itemTotal = selectedProducts.reduce((total, product) => total + product.price, 0);
  const tax = Math.round(itemTotal * taxRate * 100) / 100;
  await expect(checkoutPage.itemTotal).toHaveText(`Item total: ${formatPrice(itemTotal)}`);
  await expect(checkoutPage.tax).toHaveText(`Tax: ${formatPrice(tax)}`);
  await expect(checkoutPage.grandTotal).toHaveText(`Total: ${formatPrice(itemTotal + tax)}`);

  await checkoutPage.finish();
  await expect(orderConfirmationPage.heading).toBeVisible();
  await expect(orderConfirmationPage.heading).toHaveText('Thank you for your order!');
  await expect(orderConfirmationPage.completionMessage).toBeVisible();
  await orderConfirmationPage.backHome();
  await expect(productsPage.title).toHaveText('Products');
});