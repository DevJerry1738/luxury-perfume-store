"use strict";
/**
 * Database Persistence Layer
 * Stores normalized products locally to avoid repeated API calls
 * Uses JSON file for simplicity (can be migrated to SQLite/PostgreSQL)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
exports.addProduct = addProduct;
exports.addProducts = addProducts;
exports.clearAllProducts = clearAllProducts;
exports.searchProducts = searchProducts;
exports.getProductsByFamily = getProductsByFamily;
exports.getDbStats = getDbStats;
const fs_1 = require("fs");
const path_1 = require("path");
const DB_DIR = (0, path_1.resolve)(process.cwd(), 'server', 'db');
const PRODUCTS_FILE = (0, path_1.resolve)(DB_DIR, 'products.json');
/**
 * Initialize database with empty schema if it doesn't exist
 */
function initializeDb() {
    if (!(0, fs_1.existsSync)(DB_DIR)) {
        throw new Error(`Database directory does not exist: ${DB_DIR}`);
    }
    if (!(0, fs_1.existsSync)(PRODUCTS_FILE)) {
        const initialDb = {
            version: 1,
            lastSyncedAt: new Date().toISOString(),
            products: [],
        };
        (0, fs_1.writeFileSync)(PRODUCTS_FILE, JSON.stringify(initialDb, null, 2));
        console.log(`[Database] Initialized ${PRODUCTS_FILE}`);
    }
}
/**
 * Read current database
 */
function readDb() {
    initializeDb();
    try {
        const content = (0, fs_1.readFileSync)(PRODUCTS_FILE, 'utf-8');
        return JSON.parse(content);
    }
    catch (error) {
        console.error('[Database] Error reading products.json:', error);
        return {
            version: 1,
            lastSyncedAt: new Date().toISOString(),
            products: [],
        };
    }
}
/**
 * Write database with formatting
 */
function writeDb(db) {
    (0, fs_1.writeFileSync)(PRODUCTS_FILE, JSON.stringify(db, null, 2));
}
/**
 * Get all products from database
 */
function getAllProducts() {
    const db = readDb();
    return db.products;
}
/**
 * Get product by ID
 */
function getProductById(id) {
    const db = readDb();
    return db.products.find((p) => p.id === id) || null;
}
/**
 * Check if product already exists (by name + brand as unique key)
 * Prevents duplicate entries from multiple API calls
 */
function productExists(name, brand) {
    const db = readDb();
    return db.products.some((p) => p.name === name && p.brand === brand);
}
/**
 * Add product to database (skips duplicates)
 * @returns true if added, false if skipped as duplicate
 */
function addProduct(product) {
    if (productExists(product.name, product.brand)) {
        console.log(`[Database] Skipped duplicate: ${product.brand} - ${product.name} (Fragella ID: ${product.fragellaId})`);
        return false;
    }
    const db = readDb();
    db.products.push(product);
    db.lastSyncedAt = new Date().toISOString();
    writeDb(db);
    console.log(`[Database] Added product: ${product.brand} - ${product.name}`);
    return true;
}
/**
 * Add multiple products to database
 * @returns count of products actually added (excluding duplicates)
 */
function addProducts(products) {
    let addedCount = 0;
    for (const product of products) {
        if (addProduct(product)) {
            addedCount++;
        }
    }
    return addedCount;
}
/**
 * Clear all products from database (use with caution)
 */
function clearAllProducts() {
    const db = readDb();
    db.products = [];
    db.lastSyncedAt = new Date().toISOString();
    writeDb(db);
    console.log('[Database] Cleared all products');
}
/**
 * Search products by name or brand
 */
function searchProducts(query) {
    const db = readDb();
    const lowerQuery = query.toLowerCase();
    return db.products.filter((p) => p.name.toLowerCase().includes(lowerQuery) ||
        p.brand.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery));
}
/**
 * Filter products by scent family
 */
function getProductsByFamily(family) {
    const db = readDb();
    return db.products.filter((p) => p.scentFamily === family);
}
/**
 * Get database stats for monitoring
 */
function getDbStats() {
    const db = readDb();
    return {
        totalProducts: db.products.length,
        lastSyncedAt: db.lastSyncedAt,
        version: db.version,
    };
}
