import 'dotenv/config'
/**
 * Express Server
 * Handles API routes and database management
 * Fragella API is NEVER called from routes - only from seed script
 */

import express, { type Request, type Response, type NextFunction } from 'express'
import cors from 'cors'
import productsRouter from './routes/products'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Request logging
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
})

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  })
})

// API Routes
app.use('/api/products', productsRouter)

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    availableRoutes: [
      'GET /health',
      'GET /api/products',
      'GET /api/products/:id',
      'GET /api/products/search?q=...',
      'GET /api/products/family/:family',
    ],
  })
})

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Error]', err)
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  Luxury Perfume Store API Server       ║
╠════════════════════════════════════════╣
║  ✅ Server running on http://localhost:${PORT}
║  📦 Database: server/db/products.json
║  🌐 API Base: /api
║
║  Available Endpoints:
║  - GET  /api/products
║  - GET  /api/products/:id
║  - GET  /api/products/search?q=...
║  - GET  /api/products/family/:family
║  - POST /api/admin/seed (from CLI only)
╚════════════════════════════════════════╝
  `)
})
