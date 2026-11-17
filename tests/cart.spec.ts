import { test, expect } from '../fixtures/testFixtures';
import { credentials, products } from '../test-data/testData';

test.describe('Shopping cart', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(credentials.standard.username, credentials.standard.password);
  });

  test('shows selected products, names, prices, and quantity', async ({ productsPage, cartPage }) => {
    await productsPage.addToCart(products.backpack.name);
    await productsPage.openCart();
    await expect(cartPage.title).toHaveText('Your Cart');
    await expect(cartPage.itemNames).toHaveText([products.backpack.name]);
    await expect(cartPage.itemPrices).toHaveText('$29.99');
    await expect(cartPage.cartItems).toHaveCount(1);
    expect(await cartPage.getItemQuantity(products.backpack.name)).toBe('1');
  });

  test('removes products and updates the cart badge', async ({ productsPage, cartPage }) => {
    await productsPage.addToCart(products.backpack.name);
    await productsPage.addToCart(products.bikeLight.name);
    await productsPage.openCart();
    await cartPage.removeItem(products.backpack.name);
    await expect(cartPage.cartItems).toHaveCount(1);
    await cartPage.continueShopping();
    expect(await productsPage.getCartBadgeCount()).toBe(1);
  });

  test('continues shopping back to Products', async ({ productsPage, cartPage }) => {
    await productsPage.openCart();
    await cartPage.continueShopping();
    await expect(productsPage.title).toHaveText('Products');
  });

  test('proceeds to checkout', async ({ productsPage, cartPage, checkoutPage }) => {
    await productsPage.addToCart(products.backpack.name);
    await productsPage.openCart();
    await cartPage.checkout();
    await expect(checkoutPage.title).toHaveText('Checkout: Your Information');
  });
});