"use strict";
/**
 * Products API Route
 * Frontend-facing endpoint that reads from cached database ONLY
 * NO Fragella API calls allowed here
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_1 = require("../db/store");
const router = (0, express_1.Router)();
/**
 * GET /api/products
 * Fetch all products from local database
 */
router.get('/', (_req, res) => {
    try {
        const products = (0, store_1.getAllProducts)();
        res.json(products);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json([]);
    }
});
/**
 * GET /api/products/search?q=...
 * Search products by name, brand, or description
 */
router.get('/search', (req, res) => {
    try {
        const query = req.query.q;
        if (!query || typeof query !== 'string' || query.trim().length === 0) {
            res.status(400).json([]);
            return;
        }
        const results = (0, store_1.searchProducts)(query);
        res.json(results);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json([]);
    }
});
/**
 * GET /api/products/family/:family
 * Filter products by scent family
 */
router.get('/family/:family', (req, res) => {
    try {
        const family = req.params.family;
        if (!family) {
            res.status(400).json([]);
            return;
        }
        const products = (0, store_1.getProductsByFamily)(family);
        res.json(products);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json([]);
    }
});
/**
 * GET /api/products/:id
 * Get single product by ID
 */
router.get('/:id', (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: 'Product ID is required' });
            return;
        }
        const products = (0, store_1.getAllProducts)();
        const product = products.find((p) => p.id === id);
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.json(product);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
});
/**
 * GET /api/products/stats
 * Database statistics (for debugging/monitoring)
 * Should be removed or gated in production
 */
router.get('/internal/stats', (_req, res) => {
    try {
        const stats = (0, store_1.getDbStats)();
        res.json({
            ...stats,
            message: 'Database statistics (development only)',
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
});
exports.default = router;
