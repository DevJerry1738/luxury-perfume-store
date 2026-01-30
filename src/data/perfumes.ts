import type { Perfume } from '@/types/perfume'

export const perfumes: Perfume[] = [
  {
    id: 'p001',
    name: 'Noir Élite',
    brand: 'Maison Lux',
    description: 'A deep and seductive fragrance blending smoky woods with warm spices.',

    scentFamily: 'Woody',
    gender: 'Unisex',

    notes: {
      top: ['Bergamot', 'Black Pepper'],
      middle: ['Cedarwood', 'Patchouli'],
      base: ['Amber', 'Vanilla'],
    },

    sizes: [
      { size: 50, price: 55000 },
      { size: 100, price: 90000 },
    ],

    image: '/images/noir-elite.jpg',
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
  },

  {
    id: 'p002',
    name: 'Velour Rose',
    brand: 'Atelier Belle',
    description: 'A luxurious floral scent with a modern, velvety rose accord.',

    scentFamily: 'Floral',
    gender: 'Women',

    notes: {
      top: ['Pink Pepper', 'Lychee'],
      middle: ['Damask Rose', 'Peony'],
      base: ['Musk', 'Cashmere Wood'],
    },

    sizes: [
      { size: 50, price: 48000 },
      { size: 100, price: 82000 },
    ],

    image: '/images/velour-rose.jpg',
    isBestSeller: false,
    isNewArrival: true,
    inStock: true,
  },
]
