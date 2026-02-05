export const formatPrice = (price: number): string =>
  new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 }).format(price)
