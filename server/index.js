"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
/**
 * Express Server
 * Handles API routes and database management
 * Fragella API is NEVER called from routes - only from seed script
 */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const products_1 = __importDefault(require("./routes/products"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Request logging
app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});
// Health check
app.get('/health', (_req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
    });
});
// API Routes
app.use('/api/products', products_1.default);
// 404 handler
app.use((_req, res) => {
    res.status(404).json({
        error: 'Route not found',
        availableRoutes: [
            'GET /health',
            'GET /api/products',
            'GET /api/products/:id',
            'GET /api/products/search?q=...',
            'GET /api/products/family/:family',
        ],
    });
});
// Error handler
app.use((err, _req, res, _next) => {
    console.error('[Error]', err);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
});
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
  `);
});
