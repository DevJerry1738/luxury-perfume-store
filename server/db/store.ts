/**
 * Database Persistence Layer
 * Stores normalized products locally to avoid repeated API calls
 * Uses JSON file for simplicity (can be migrated to SQLite/PostgreSQL)
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve } from 'path'
import type { InternalProduct } from '../lib/types'

const DB_DIR = resolve(process.cwd(), 'server', 'db')
const PRODUCTS_FILE = resolve(DB_DIR, 'products.json')

interface DatabaseSchema {
  version: number
  lastSyncedAt: string
  products: InternalProduct[]
}

/**
 * Initialize database with empty schema if it doesn't exist
 */
function initializeDb(): void {
  if (!existsSync(DB_DIR)) {
    throw new Error(`Database directory does not exist: ${DB_DIR}`)
  }

  if (!existsSync(PRODUCTS_FILE)) {
    const initialDb: DatabaseSchema = {
      version: 1,
      lastSyncedAt: new Date().toISOString(),
      products: [],
    }
    writeFileSync(PRODUCTS_FILE, JSON.stringify(initialDb, null, 2))
    console.log(`[Database] Initialized ${PRODUCTS_FILE}`)
  }
}

/**
 * Read current database
 */
function readDb(): DatabaseSchema {
  initializeDb()

  try {
    const content = readFileSync(PRODUCTS_FILE, 'utf-8')
    return JSON.parse(content) as DatabaseSchema
  } catch (error) {
    console.error('[Database] Error reading products.json:', error)
    return {
      version: 1,
      lastSyncedAt: new Date().toISOString(),
      products: [],
    }
  }
}

/**
 * Write database with formatting
 */
function writeDb(db: DatabaseSchema): void {
  writeFileSync(PRODUCTS_FILE, JSON.stringify(db, null, 2))
}

/**
 * Get all products from database
 */
export function getAllProducts(): InternalProduct[] {
  const db = readDb()
  return db.products
}

/**
 * Get product by ID
 */
export function getProductById(id: string): InternalProduct | null {
  const db = readDb()
  return db.products.find((p) => p.id === id) || null
}

/**
 * Check if product already exists (by name + brand as unique key)
 * Prevents duplicate entries from multiple API calls
 */
function productExists(name: string, brand: string): boolean {
  const db = readDb()
  return db.products.some((p) => p.name === name && p.brand === brand)
}

/**
 * Add product to database (skips duplicates)
 * @returns true if added, false if skipped as duplicate
 */
export function addProduct(product: InternalProduct): boolean {
  if (productExists(product.name, product.brand)) {
    console.log(
      `[Database] Skipped duplicate: ${product.brand} - ${product.name} (Fragella ID: ${product.fragellaId})`,
    )
    return false
  }

  const db = readDb()
  db.products.push(product)
  db.lastSyncedAt = new Date().toISOString()
  writeDb(db)

  console.log(`[Database] Added product: ${product.brand} - ${product.name}`)
  return true
}

/**
 * Add multiple products to database
 * @returns count of products actually added (excluding duplicates)
 */
export function addProducts(products: InternalProduct[]): number {
  let addedCount = 0

  for (const product of products) {
    if (addProduct(product)) {
      addedCount++
    }
  }

  return addedCount
}

/**
 * Clear all products from database (use with caution)
 */
export function clearAllProducts(): void {
  const db = readDb()
  db.products = []
  db.lastSyncedAt = new Date().toISOString()
  writeDb(db)
  console.log('[Database] Cleared all products')
}

/**
 * Search products by name or brand
 */
export function searchProducts(query: string): InternalProduct[] {
  const db = readDb()
  const lowerQuery = query.toLowerCase()

  return db.products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.brand.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery),
  )
}

/**
 * Filter products by scent family
 */
export function getProductsByFamily(family: string): InternalProduct[] {
  const db = readDb()
  return db.products.filter((p) => p.scentFamily === family)
}

/**
 * Get database stats for monitoring
 */
export function getDbStats() {
  const db = readDb()
  return {
    totalProducts: db.products.length,
    lastSyncedAt: db.lastSyncedAt,
    version: db.version,
  }
}
