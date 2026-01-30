export type ScentFamily = 'Floral' | 'Woody' | 'Oriental' | 'Fresh' | 'Citrus' | 'Gourmand'

export type Gender = 'Men' | 'Women' | 'Unisex'

export interface PerfumeNotes {
  top: string[]
  middle: string[]
  base: string[]
}

export interface PerfumeSize {
  size: number // ml
  price: number
}

export interface Perfume {
  id: string
  name: string
  brand: string
  description: string

  scentFamily: ScentFamily
  gender: Gender
  notes: PerfumeNotes

  sizes: PerfumeSize[]

  image: string
  isBestSeller: boolean
  isNewArrival: boolean
  inStock: boolean
}
