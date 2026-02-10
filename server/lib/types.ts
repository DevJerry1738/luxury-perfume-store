/**
 * Fragella API Response Types
 * These are the raw types from Fragella API - NOT exposed to frontend
 */

export interface FragellaNote {
  name: string
  type?: string // 'top', 'middle', 'base'
}

export interface FragellaAccord {
  name: string
  percentage?: number
}

export interface FragellaFragrance {
  id: number
  name: string
  brand: string
  description?: string
  image_url?: string
  male?: boolean
  female?: boolean
  unisex?: boolean
  // Fragrance profile
  top_notes?: FragellaNote[] | string[]
  middle_notes?: FragellaNote[] | string[]
  base_notes?: FragellaNote[] | string[]
  notes?: FragellaNote[]
  accords?: FragellaAccord[]
  // Additional fields
  price?: number
  rating?: number
  release_date?: string
  // Avoid using these fields
  affiliate_url?: string
  purchase_url?: string
  [key: string]: unknown
}

export interface FragellaSearchResponse {
  results?: FragellaFragrance[]
  data?: FragellaFragrance[]
  fragrances?: FragellaFragrance[]
  [key: string]: unknown
}

/**
 * Internal Product Type (matches src/types/perfume.ts)
 * This is what the frontend receives
 */
export interface InternalProduct {
  id: string
  name: string
  brand: string
  description: string
  scentFamily: 'Floral' | 'Woody' | 'Oriental' | 'Fresh' | 'Citrus' | 'Gourmand'
  gender: 'Men' | 'Women' | 'Unisex'
  notes: {
    top: string[]
    middle: string[]
    base: string[]
  }
  sizes: Array<{ size: number; price: number }>
  image: string
  isBestSeller: boolean
  isNewArrival: boolean
  inStock: boolean
  // Track source for debugging
  fragellaId?: number
  lastUpdated?: string
}
