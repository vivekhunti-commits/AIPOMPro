export function parsePrice(text: string): number {
  const amount = Number(text.replace(/[^\d.]/g, ''));
  if (!Number.isFinite(amount)) {
    throw new Error(`Could not parse a price from: ${text}`);
  }
  return amount;
}

export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}