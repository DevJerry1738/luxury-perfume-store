import type { Perfume } from '../types/perfume'
import p001 from '../assets/images/p001.jpg'
import p002 from '../assets/images/p002.jpg'
import p003 from '../assets/images/p003.jpg'
import p004 from '../assets/images/p004.jpg'
import p005 from '../assets/images/p005.jpg'
import p006 from '../assets/images/p006.jpg'
import p007 from '../assets/images/p007.jpg'

export const localProducts: Perfume[] = [
  {
    id: 'p001',
    name: 'Noir Élite',
    brand: 'Maison Lux',
    description:
      'A deep and seductive fragrance blending smoky woods with warm spices. Perfect for evening wear.',
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
    image: p001,
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
  },

  {
    id: 'p002',
    name: 'Velour Rose',
    brand: 'Atelier Belle',
    description:
      'A luxurious floral scent with a modern, velvety rose accord. Sophisticated and timeless.',
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
    image: p002,
    isBestSeller: false,
    isNewArrival: true,
    inStock: true,
  },

  {
    id: 'p003',
    name: 'Aqua Meridian',
    brand: 'Crystallo',
    description: 'A fresh and crisp marine fragrance evoking the essence of coastal simplicity.',
    scentFamily: 'Fresh',
    gender: 'Unisex',
    notes: {
      top: ['Grapefruit', 'Sea Salt', 'Bergamot'],
      middle: ['Aquatic Notes', 'Cyclamen'],
      base: ['Driftwood', 'Ambroxan'],
    },
    sizes: [
      { size: 50, price: 52000 },
      { size: 100, price: 88000 },
    ],
    image: p003,
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
  },

  {
    id: 'p004',
    name: "Soleil d'Or",
    brand: 'Dior Essence',
    description:
      'Golden citrus notes mixed with warm spices create an energizing daytime fragrance.',
    scentFamily: 'Citrus',
    gender: 'Women',
    notes: {
      top: ['Mandarin', 'Lemon Zest'],
      middle: ['Orange Blossom', 'Neroli'],
      base: ['Sandalwood', 'Musk'],
    },
    sizes: [
      { size: 50, price: 58000 },
      { size: 100, price: 95000 },
    ],
    image: p004,
    isBestSeller: false,
    isNewArrival: true,
    inStock: true,
  },

  {
    id: 'p005',
    name: 'Oud Royale',
    brand: 'Creed Heritage',
    description:
      'A rich, complex blend of precious oud with leather and spice. For the discerning connoisseur.',
    scentFamily: 'Woody',
    gender: 'Men',
    notes: {
      top: ['Cardamom', 'Cinnamon'],
      middle: ['Agarwood (Oud)', 'Leather'],
      base: ['Sandalwood', 'Patchouli', 'Tobacco'],
    },
    sizes: [
      { size: 50, price: 72000 },
      { size: 100, price: 125000 },
    ],
    image: p005,
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
  },

  {
    id: 'p006',
    name: 'Enfleurage Sensuel',
    brand: 'Guerlain Privé',
    description: 'An intoxicating oriental fragrance with creamy florals and amber. Pure luxury.',
    scentFamily: 'Oriental',
    gender: 'Women',
    notes: {
      top: ['Saffron', 'Iris'],
      middle: ['Tuberose', 'Gardenia', 'Jasmine'],
      base: ['Amber', 'Vanilla', 'Sandalwood'],
    },
    sizes: [
      { size: 50, price: 65000 },
      { size: 100, price: 110000 },
    ],
    image: p006,
    isBestSeller: false,
    isNewArrival: false,
    inStock: true,
  },

  {
    id: 'p007',
    name: "Gentleman's Reserve",
    brand: 'Chanel Allure',
    description:
      "A sophisticated aromatic composition with timeless appeal. The gentleman's choice.",
    scentFamily: 'Fresh',
    gender: 'Men',
    notes: {
      top: ['Neroli', 'Lavender', 'Lemon'],
      middle: ['Cedar', 'Amber'],
      base: ['Moss', 'Musk', 'Vanilla'],
    },
    sizes: [
      { size: 50, price: 54000 },
      { size: 100, price: 92000 },
    ],
    image: p007,
    isBestSeller: false,
    isNewArrival: true,
    inStock: true,
  },

  {
    id: 'p008',
    name: 'Gourmand Dreams',
    brand: "L'Artisan Parfumeur",
    description:
      'Delicious notes of caramel, chocolate, and vanilla create a sweet gourmand fantasy.',
    scentFamily: 'Gourmand',
    gender: 'Women',
    notes: {
      top: ['Caramel', 'Coconut'],
      middle: ['Chocolate', 'Hazelnut'],
      base: ['Vanilla', 'Tonka Bean', 'Musk'],
    },
    sizes: [
      { size: 50, price: 51000 },
      { size: 100, price: 86000 },
    ],
    image: p001,
    isBestSeller: false,
    isNewArrival: false,
    inStock: true,
  },

  {
    id: 'p009',
    name: 'Jasmine Nocturne',
    brand: 'Tom Ford Beauty',
    description: 'An elegant floral fragrance centered on intoxicating jasmine and exotic spices.',
    scentFamily: 'Floral',
    gender: 'Women',
    notes: {
      top: ['Pink Pepper', 'Bergamot'],
      middle: ['Jasmine Sambac', 'Tuberose'],
      base: ['Amber', 'Sandalwood', 'Musk'],
    },
    sizes: [
      { size: 50, price: 62000 },
      { size: 100, price: 105000 },
    ],
    image: p002,
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
  },

  {
    id: 'p010',
    name: 'Citrus Surge',
    brand: 'Hermès',
    description:
      'A vibrant splash of Mediterranean citrus with green notes. Fresh and invigorating.',
    scentFamily: 'Citrus',
    gender: 'Men',
    notes: {
      top: ['Grapefruit', 'Lime', 'Petitgrain'],
      middle: ['Green Galbanum', 'Basil'],
      base: ['Cedarwood', 'Ambrette'],
    },
    sizes: [
      { size: 50, price: 56000 },
      { size: 100, price: 94000 },
    ],
    image: p003,
    isBestSeller: false,
    isNewArrival: true,
    inStock: true,
  },

  {
    id: 'p011',
    name: 'Midnight Espresso',
    brand: 'Yves Saint Laurent',
    description:
      'Dark, mysterious, and bold. Featuring notes of coffee and dark chocolate for the night owls.',
    scentFamily: 'Gourmand',
    gender: 'Unisex',
    notes: {
      top: ['Coffee', 'Cardamom'],
      middle: ['Dark Chocolate', 'Osmanthus'],
      base: ['Vetiver', 'Oakmoss', 'Vanilla'],
    },
    sizes: [
      { size: 50, price: 49000 },
      { size: 100, price: 84000 },
    ],
    image: p004,
    isBestSeller: false,
    isNewArrival: false,
    inStock: true,
  },

  {
    id: 'p012',
    name: 'Iris Ethereal',
    brand: "Penhaligon's",
    description:
      'A delicate iris-centered composition with violet and soft florals. Beautifully balanced.',
    scentFamily: 'Floral',
    gender: 'Unisex',
    notes: {
      top: ['Violet Leaf', 'Citrus'],
      middle: ['Iris Root', 'Violet', 'Peony'],
      base: ['Sandalwood', 'Musk', 'Amber'],
    },
    sizes: [
      { size: 50, price: 60000 },
      { size: 100, price: 100000 },
    ],
    image: p005,
    isBestSeller: false,
    isNewArrival: true,
    inStock: true,
  },
  {
    id: 'p013',
    name: 'Amber Haze',
    brand: 'Maison Lux',
    description: 'A warm, resinous scent with touches of vanilla and smoke.',
    scentFamily: 'Oriental',
    gender: 'Unisex',
    notes: {
      top: ['Amber', 'Bergamot'],
      middle: ['Vanilla', 'Labdanum'],
      base: ['Patchouli', 'Musk'],
    },
    sizes: [
      { size: 50, price: 53000 },
      { size: 100, price: 89000 },
    ],
    image: p001,
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
  },
  {
    id: 'p014',
    name: 'Crystal Bloom',
    brand: 'Atelier Belle',
    description: 'Light and airy floral notes with a crystal-clear finish.',
    scentFamily: 'Floral',
    gender: 'Women',
    notes: {
      top: ['Magnolia', 'Pear'],
      middle: ['Lotus', 'Peony'],
      base: ['Musk', 'Amber'],
    },
    sizes: [
      { size: 50, price: 47000 },
      { size: 100, price: 81000 },
    ],
    image: p002,
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
  },
  {
    id: 'p015',
    name: 'Ocean Mist',
    brand: 'Crystallo',
    description: 'The refreshing scent of the ocean breeze on a summer day.',
    scentFamily: 'Fresh',
    gender: 'Unisex',
    notes: {
      top: ['Sea Salt', 'Lemon'],
      middle: ['Sage', 'Mineral Notes'],
      base: ['Driftwood', 'Ambrette'],
    },
    sizes: [
      { size: 50, price: 51000 },
      { size: 100, price: 87000 },
    ],
    image: p003,
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
  },
  {
    id: 'p016',
    name: 'Golden Hour',
    brand: 'Dior Essence',
    description: 'Capturing the warmth of the setting sun with citrus and spice.',
    scentFamily: 'Citrus',
    gender: 'Women',
    notes: {
      top: ['Mandarin', 'Ginger'],
      middle: ['Jasmine', 'Honey'],
      base: ['Amber', 'Sandalwood'],
    },
    sizes: [
      { size: 50, price: 59000 },
      { size: 100, price: 96000 },
    ],
    image: p004,
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
  },
  {
    id: 'p017',
    name: 'Royal Oud Intense',
    brand: 'Creed Heritage',
    description: 'A more intense version of our classic Oud Royale.',
    scentFamily: 'Woody',
    gender: 'Men',
    notes: {
      top: ['Pepper', 'Lime'],
      middle: ['Oud', 'Rose'],
      base: ['Musk', 'Birch'],
    },
    sizes: [
      { size: 50, price: 75000 },
      { size: 100, price: 130000 },
    ],
    image: p005,
    isBestSeller: true,
    isNewArrival: true,
    inStock: true,
  },
  {
    id: 'p018',
    name: 'Velvet Night',
    brand: 'Guerlain Privé',
    description: 'Soft and caressing, like velvet against the skin.',
    scentFamily: 'Oriental',
    gender: 'Women',
    notes: {
      top: ['Blackcurrant', 'Bergamot'],
      middle: ['Iris', 'Rose'],
      base: ['Vanilla', 'Tonka'],
    },
    sizes: [
      { size: 50, price: 68000 },
      { size: 100, price: 115000 },
    ],
    image: p006,
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
  },
  {
    id: 'p019',
    name: 'Classic Sport',
    brand: 'Chanel Allure',
    description: 'Dynamic and energetic, perfect for the active man.',
    scentFamily: 'Fresh',
    gender: 'Men',
    notes: {
      top: ['Mint', 'Mandarin'],
      middle: ['Pepper', 'Cedar'],
      base: ['Musk', 'Tonka'],
    },
    sizes: [
      { size: 50, price: 55000 },
      { size: 100, price: 93000 },
    ],
    image: p007,
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
  },
  {
    id: 'p020',
    name: 'Sweet Delight',
    brand: "L'Artisan Parfumeur",
    description: 'A playful and sugary treat for the senses.',
    scentFamily: 'Gourmand',
    gender: 'Women',
    notes: {
      top: ['Sugar', 'Strawberry'],
      middle: ['Cotton Candy', 'Vanilla'],
      base: ['Musk', 'Caramel'],
    },
    sizes: [
      { size: 50, price: 50000 },
      { size: 100, price: 85000 },
    ],
    image: p001, // Reusing p001
    isBestSeller: true,
    isNewArrival: false,
    inStock: true,
  },
]
