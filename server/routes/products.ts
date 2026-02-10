/**
 * Products API Route
 * Frontend-facing endpoint that reads from cached database ONLY
 * NO Fragella API calls allowed here
 */

import { Router, type Request, type Response } from 'express'
import { getAllProducts, searchProducts, getProductsByFamily, getDbStats } from '../db/store'
import type { InternalProduct } from '../lib/types'

const router = Router()

/**
 * GET /api/products
 * Fetch all products from local database
 */
router.get('/', (_req: Request, res: Response<InternalProduct[]>) => {
  try {
    const products = getAllProducts()
    res.json(products)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    res.status(500).json([] as InternalProduct[])
  }
})

/**
 * GET /api/products/search?q=...
 * Search products by name, brand, or description
 */
router.get(
  '/search',
  (req: Request<any, any, any, { q?: string }>, res: Response<InternalProduct[]>) => {
    try {
      const query = req.query.q

      if (!query || typeof query !== 'string' || query.trim().length === 0) {
        res.status(400).json([] as InternalProduct[])
        return
      }

      const results = searchProducts(query)
      res.json(results)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      res.status(500).json([] as InternalProduct[])
    }
  },
)

/**
 * GET /api/products/family/:family
 * Filter products by scent family
 */
router.get(
  '/family/:family',
  (req: Request<{ family?: string }>, res: Response<InternalProduct[]>) => {
    try {
      const family = req.params.family

      if (!family) {
        res.status(400).json([] as InternalProduct[])
        return
      }

      const products = getProductsByFamily(family)
      res.json(products)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      res.status(500).json([] as InternalProduct[])
    }
  },
)

/**
 * GET /api/products/:id
 * Get single product by ID
 */
router.get(
  '/:id',
  (req: Request<{ id?: string }>, res: Response<InternalProduct | { error: string }>) => {
    try {
      const { id } = req.params

      if (!id) {
        res.status(400).json({ error: 'Product ID is required' })
        return
      }

      const products = getAllProducts()
      const product = products.find((p) => p.id === id)

      if (!product) {
        res.status(404).json({ error: 'Product not found' })
        return
      }

      res.json(product)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      res.status(500).json({ error: message })
    }
  },
)

/**
 * GET /api/products/stats
 * Database statistics (for debugging/monitoring)
 * Should be removed or gated in production
 */
router.get('/internal/stats', (_req: Request, res: Response) => {
  try {
    const stats = getDbStats()
    res.json({
      ...stats,
      message: 'Database statistics (development only)',
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({ error: message })
  }
})

export default router
