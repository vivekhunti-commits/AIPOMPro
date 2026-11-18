import { test, expect } from '@playwright/test';

const authorsUrl = 'https://fakerestapi.azurewebsites.net/api/v1/Authors';
const apiKey = process.env.FAKE_REST_API_KEY;
const headers = {
  'Content-Type': 'application/json',
  ...(apiKey ? { 'api-key': apiKey } : {}),
};

test.describe('Create Authors API', () => {
  test('creates an author with the supplied values', async ({ request }) => {
    const author = {
      id: 9999,
      idBook: 9999,
      firstName: 'vivekk',
      lastName: 'khuntii',
    };

    const response = await request.post(authorsUrl, {
      headers,
      data: author,
    });

    expect(response.status()).toBe(200);
    await expect(response.json()).resolves.toMatchObject(author);
  });

  test('creates another author with valid values', async ({ request }) => {
    const author = {
      id: 10000,
      idBook: 1,
      firstName: 'Test',
      lastName: 'Author',
    };

    const response = await request.post(authorsUrl, {
      headers,
      data: author,
    });

    expect(response.status()).toBe(200);
    await expect(response.json()).resolves.toMatchObject(author);
  });

  test('rejects an author without a first name', async ({ request }) => {
    const response = await request.post(authorsUrl, {
      headers,
      data: {
        id: 9999,
        idBook: 9999,
        lastName: 'khuntii',
      },
    });

    expect(response.status()).toBeGreaterThanOrEqual(400);
    expect(response.status()).toBeLessThan(500);
  });

  test('rejects an author with a nonnumeric book ID', async ({ request }) => {
    const response = await request.post(authorsUrl, {
      headers,
      data: {
        id: 9999,
        idBook: 'not-a-number',
        firstName: 'vivekk',
        lastName: 'khuntii',
      },
    });

    expect(response.status()).toBeGreaterThanOrEqual(400);
    expect(response.status()).toBeLessThan(500);
  });
});