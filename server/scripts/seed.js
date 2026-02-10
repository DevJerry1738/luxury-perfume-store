"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
/**
 * Seed Script for Fragella Data Import
 * One-time use to populate initial database with fragrances
 *
 * Usage:
 *   npx ts-node server/scripts/seed.ts
 *   or npm run seed
 *
 * This script explicitly limits API calls and logs progress
 */
const fragella_1 = require("../lib/fragella");
const normalize_1 = require("../lib/normalize");
const store_1 = require("../db/store");
// Configuration - modify these to control API usage
const SEED_CONFIG = {
    brands: ['Dior', 'Chanel', 'Tom Ford', 'Creed', 'Guerlain'],
    maxItemsPerBrand: 4,
    maxTotalRequests: 10, // IMPORTANT: Keep under 20/month limit
};
async function seedDatabase() {
    console.log('🌱 Starting Fragella Data Seed\n');
    // Validate configuration
    if (!(0, fragella_1.isFragellaConfigured)()) {
        console.error('❌ Error: FRAGELLA_API_KEY not configured. Add it to .env before running seed.');
        process.exit(1);
    }
    const client = (0, fragella_1.getFragellaClient)();
    let totalAdded = 0;
    let totalRequests = 0;
    const startTime = Date.now();
    try {
        for (const brand of SEED_CONFIG.brands) {
            if (totalRequests >= SEED_CONFIG.maxTotalRequests) {
                console.log(`⚠️  Reached request limit (${SEED_CONFIG.maxTotalRequests}). Stopping to preserve API quota.`);
                break;
            }
            console.log(`\n📦 Fetching fragrances from brand: ${brand}`);
            try {
                const fragrances = await client.searchFragrances(brand, SEED_CONFIG.maxItemsPerBrand);
                if (!fragrances || fragrances.length === 0) {
                    console.log(`   ⚠️  No fragrances found for "${brand}"`);
                    totalRequests++;
                    continue;
                }
                // Normalize and add to database
                const normalized = (0, normalize_1.normalizeFragrances)(fragrances);
                const added = (0, store_1.addProducts)(normalized);
                console.log(`   ✅ ${added}/${fragrances.length} fragrances added (${fragrances.length - added} duplicates)`);
                totalAdded += added;
                totalRequests++;
            }
            catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                console.error(`   ❌ Error fetching ${brand}: ${message}`);
                totalRequests++;
            }
        }
        // Summary
        const elapsedMs = Date.now() - startTime;
        const stats = (0, store_1.getDbStats)();
        console.log('\n' + '='.repeat(60));
        console.log('✨ Seed Complete');
        console.log('='.repeat(60));
        console.log(`  Added: ${totalAdded} new fragrances`);
        console.log(`  Requests used: ${totalRequests}/${SEED_CONFIG.maxTotalRequests}`);
        console.log(`  Database total: ${stats.totalProducts} products`);
        console.log(`  Time: ${elapsedMs}ms`);
        console.log(`  Last updated: ${stats.lastSyncedAt}`);
        console.log('='.repeat(60));
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error('\n❌ Seed failed:', message);
        process.exit(1);
    }
}
// Run the seed
seedDatabase().catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
});
