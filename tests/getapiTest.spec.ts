import { test, expect } from '@playwright/test';

const authorsUrl = 'https://fakerestapi.azurewebsites.net/api/v1/Authors';

test.describe('Authors API', () => {
  test('returns the authors collection', async ({ request }) => {
    const response = await request.get(authorsUrl);

    expect(response.status()).toBe(200);
    const authors: unknown = await response.json();
    expect(Array.isArray(authors)).toBe(true);
    expect(authors).not.toHaveLength(0);
    expect(authors).toContainEqual(
      expect.objectContaining({
        id: 1,
        idBook: 1,
        firstName: 'First Name 1',
        lastName: 'Last Name 1',
      }),
    );
  });

  test('returns an author by ID', async ({ request }) => {
    const response = await request.get(`${authorsUrl}/1`);

    expect(response.status()).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      id: 1,
      idBook: 1,
      firstName: 'First Name 1',
      lastName: 'Last Name 1',
    });
  });

  test('returns a client error for an invalid author ID', async ({ request }) => {
    const response = await request.get(`${authorsUrl}/not-a-number`);

    expect(response.status()).toBeGreaterThanOrEqual(400);
    expect(response.status()).toBeLessThan(500);
  });

  test('returns 404 for a nonexistent author ID', async ({ request }) => {
    const response = await request.get(`${authorsUrl}/0`);

    expect(response.status()).toBe(404);
  });
});