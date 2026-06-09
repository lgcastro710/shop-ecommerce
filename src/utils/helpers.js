export const finalPrice = (p) =>
  p.price * (1 - (p.discountPercentage || 0) / 100)

export const fmt = (n) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n)

export const stars = (rating) => {
  const full  = Math.floor(rating)
  const half  = rating % 1 >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty)
}

export const slugify = (str) => str?.toLowerCase().replace(/\s+/g, '-')
