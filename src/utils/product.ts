export const getPrice = (
  price: string | number | undefined,
  currency: string
) =>
  Intl.NumberFormat(undefined, {
    currency,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(parseFloat(price ? `${price}` : '0'));
