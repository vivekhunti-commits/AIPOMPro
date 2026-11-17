import { test, expect } from '../fixtures/testFixtures';
import { credentials, products } from '../test-data/testData';

test.describe('Products', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(credentials.standard.username, credentials.standard.password);
  });

  test('shows all products with names and prices', async ({ productsPage }) => {
    await expect(productsPage.title).toHaveText('Products');
    await expect(productsPage.productCards).toHaveCount(6);
    expect(await productsPage.getProductNames()).toContain(products.backpack.name);
    expect(await productsPage.getProductPrices()).toContain('$29.99');
  });

  test('adds one product to the cart', async ({ productsPage }) => {
    await productsPage.addToCart(products.backpack.name);
    expect(await productsPage.getCartBadgeCount()).toBe(1);
  });

  test('adds multiple products to the cart', async ({ productsPage }) => {
    await productsPage.addToCart(products.backpack.name);
    await productsPage.addToCart(products.bikeLight.name);
    expect(await productsPage.getCartBadgeCount()).toBe(2);
  });

  test('removes a product from the cart', async ({ productsPage }) => {
    await productsPage.addToCart(products.backpack.name);
    await productsPage.removeFromCart(products.backpack.name);
    expect(await productsPage.getCartBadgeCount()).toBe(0);
  });

  test('shows the correct cart badge count', async ({ productsPage }) => {
    await productsPage.addToCart(products.backpack.name);
    await productsPage.addToCart(products.bikeLight.name);
    expect(await productsPage.getCartBadgeCount()).toBe(2);
  });

  test('sorts products by name from A to Z', async ({ productsPage }) => {
    await productsPage.sortProducts('az');
    const names = await productsPage.getProductNames();
    expect(names).toEqual([...names].sort((first, second) => first.localeCompare(second)));
  });

  test('sorts products by name from Z to A', async ({ productsPage }) => {
    await productsPage.sortProducts('za');
    const names = await productsPage.getProductNames();
    expect(names).toEqual([...names].sort((first, second) => second.localeCompare(first)));
  });

  test('sorts products by price from low to high', async ({ productsPage }) => {
    await productsPage.sortProducts('lohi');
    const prices = (await productsPage.getProductPrices()).map((price) => Number(price.replace('$', '')));
    expect(prices).toEqual([...prices].sort((first, second) => first - second));
  });

  test('sorts products by price from high to low', async ({ productsPage }) => {
    await productsPage.sortProducts('hilo');
    const prices = (await productsPage.getProductPrices()).map((price) => Number(price.replace('$', '')));
    expect(prices).toEqual([...prices].sort((first, second) => second - first));
  });
});