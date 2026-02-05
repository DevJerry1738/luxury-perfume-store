import type { Perfume } from '@/types/perfume'
import noirImage from '@/assets/images/noir-elite.jpg'
import velourImage from '@/assets/images/velour-rose.jpg'

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

    image: noirImage,
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

    image: velourImage,
    isBestSeller: false,
    isNewArrival: true,
    inStock: true,
  },
  {
    id: 'p003',
    name: 'Velour Rose',
    brand: 'Atelier Belle',
    description: 'A luxurious floral scent with a modern, velvety rose accord.',

    scentFamily: 'Oriental',
    gender: 'Men',

    notes: {
      top: ['Pink Pepper', 'Lychee'],
      middle: ['Damask Rose', 'Peony'],
      base: ['Musk', 'Cashmere Wood'],
    },

    sizes: [
      { size: 50, price: 48000 },
      { size: 100, price: 82000 },
    ],

    image: velourImage,
    isBestSeller: false,
    isNewArrival: true,
    inStock: true,
  },
]
