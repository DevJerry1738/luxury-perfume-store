/**
 * Data Normalization Layer
 * Converts Fragella API responses to internal Product model
 * Handles missing fields gracefully
 */

import type { FragellaFragrance, InternalProduct } from './types'

/**
 * Map Fragella gender flags to internal Gender type
 */
function mapGender(fragrance: FragellaFragrance): 'Men' | 'Women' | 'Unisex' {
  const { male, female, unisex } = fragrance

  if (unisex) return 'Unisex'
  if (male && female) return 'Unisex'
  if (male) return 'Men'
  if (female) return 'Women'

  // Default to Unisex if not specified
  return 'Unisex'
}

/**
 * Map fragrance profile to scent family
 * Uses accords or notes to infer scent family
 */
function mapScentFamily(
  fragrance: FragellaFragrance,
): 'Floral' | 'Woody' | 'Oriental' | 'Fresh' | 'Citrus' | 'Gourmand' {
  const description = (fragrance.description || '').toLowerCase()
  const noteNames = getAllNoteNames(fragrance).join(' ').toLowerCase()
  const accordNames = (fragrance.accords || [])
    .map((a) => (typeof a === 'string' ? a : a.name))
    .join(' ')
    .toLowerCase()

  const searchText = `${description} ${noteNames} ${accordNames}`

  // Simple heuristic mapping based on common perfume notes
  if (
    searchText.includes('rose') ||
    searchText.includes('iris') ||
    searchText.includes('peony') ||
    searchText.includes('peony') ||
    searchText.includes('floral') ||
    searchText.includes('bouquet')
  ) {
    return 'Floral'
  }

  if (
    searchText.includes('sandalwood') ||
    searchText.includes('cedarwood') ||
    searchText.includes('oud') ||
    searchText.includes('agarwood') ||
    searchText.includes('woody')
  ) {
    return 'Woody'
  }

  if (
    searchText.includes('amber') ||
    searchText.includes('musk') ||
    searchText.includes('vanilla') ||
    searchText.includes('caramel') ||
    searchText.includes('oriental')
  ) {
    return 'Oriental'
  }

  if (
    searchText.includes('lemon') ||
    searchText.includes('grapefruit') ||
    searchText.includes('bergamot') ||
    searchText.includes('citrus') ||
    searchText.includes('zest')
  ) {
    return 'Citrus'
  }

  if (
    searchText.includes('aquatic') ||
    searchText.includes('ocean') ||
    searchText.includes('watermelon') ||
    searchText.includes('mint') ||
    searchText.includes('fresh')
  ) {
    return 'Fresh'
  }

  if (
    searchText.includes('chocolate') ||
    searchText.includes('caramel') ||
    searchText.includes('honey') ||
    searchText.includes('gourmand') ||
    searchText.includes('sweet')
  ) {
    return 'Gourmand'
  }

  // Default to Floral if unknown
  return 'Floral'
}

/**
 * Extract all note names from Fragella response
 * Handles both string arrays and object arrays
 */
function getAllNoteNames(fragrance: FragellaFragrance): string[] {
  const names: string[] = []

  const processNotes = (notes?: (string | { name?: string })[]) => {
    if (!notes) return
    notes.forEach((note) => {
      if (typeof note === 'string' && note) {
        names.push(note)
      } else if (typeof note === 'object' && note.name) {
        names.push(note.name)
      }
    })
  }

  processNotes(fragrance.top_notes)
  processNotes(fragrance.middle_notes)
  processNotes(fragrance.base_notes)
  processNotes(fragrance.notes)

  return names
}

/**
 * Extract notes in structured format
 */
function extractNotes(fragrance: FragellaFragrance) {
  const extractFromArray = (notes?: (string | { name?: string })[]) => {
    if (!notes) return []
    return notes
      .map((n) => (typeof n === 'string' ? n : n.name))
      .filter((n): n is string => !!n && n.trim().length > 0)
  }

  return {
    top: extractFromArray(fragrance.top_notes),
    middle: extractFromArray(fragrance.middle_notes),
    base: extractFromArray(fragrance.base_notes),
  }
}

/**
 * Convert image URL from JPG to WebP (CDN optimization)
 * Falls back to original if conversion fails
 */
function optimizeImageUrl(imageUrl?: string): string {
  if (!imageUrl) {
    return '/images/placeholder-perfume.jpg'
  }

  // If it's a JPG, suggest WebP version
  if (imageUrl.endsWith('.jpg') || imageUrl.endsWith('.jpeg')) {
    const webpUrl = imageUrl.replace(/\.(jpg|jpeg)$/i, '.webp')
    // In production, verify WebP exists; for now return original
    return imageUrl
  }

  return imageUrl
}

/**
 * Generate placeholder prices based on size
 * Fragella prices are ignored per requirements
 * Using luxury perfume pricing: typically $80-200 for 100ml
 */
function generatePricingTiers(): Array<{ size: number; price: number }> {
  return [
    { size: 50, price: 8500 }, // ~$85 in cents
    { size: 100, price: 15000 }, // ~$150 in cents
  ]
}

/**
 * Normalize Fragella fragrance to internal Product model
 * @param fragrance Raw Fragella API response
 * @param index Used for generating unique IDs
 * @returns Normalized internal product
 */
export function normalizeFragrance(
  fragrance: FragellaFragrance,
  index: number = 0,
): InternalProduct {
  const id = `frag_${fragrance.id || `${fragrance.brand}_${fragrance.name}`.toLowerCase().replace(/\s+/g, '_')}`

  return {
    id,
    name: fragrance.name || 'Unknown Fragrance',
    brand: fragrance.brand || 'Unknown Brand',
    description: fragrance.description || 'A luxurious fragrance.',
    scentFamily: mapScentFamily(fragrance),
    gender: mapGender(fragrance),
    notes: extractNotes(fragrance),
    sizes: generatePricingTiers(),
    image: optimizeImageUrl(fragrance.image_url),
    // These could be set based on API data or metadata
    isBestSeller: index < 5, // Mark first 5 as best sellers
    isNewArrival: false,
    inStock: true,
    // Track source
    fragellaId: fragrance.id,
    lastUpdated: new Date().toISOString(),
  }
}

/**
 * Batch normalize multiple fragrances
 */
export function normalizeFragrances(fragrances: FragellaFragrance[]): InternalProduct[] {
  return fragrances.map((frag, idx) => normalizeFragrance(frag, idx))
}
