# Server-Side Fragella Integration

This guide explains the complete server-side Fragella API integration, data normalization, and database persistence layer.

## Overview

The luxury perfume store uses a secure server-side architecture:

```
┌─────────────────────────────────────────────────────────┐
│  Frontend (Vue 3)                                       │
│  - Calls /api/products (internal route)                 │
│  - Never touches Fragella API                           │
└────────────────────────────┬────────────────────────────┘
                             │ fetch /api/products
                             ▼
┌─────────────────────────────────────────────────────────┐
│  Express Backend (server/index.ts)                      │
│  - Routes: GET /api/products, /api/products/:id, etc.   │
│  - Reads from cached database (server/db/products.json) │
│  - NO Fragella API calls in routes                      │
└────────────────────────────┬────────────────────────────┘
                             │ store.ts
                             ▼
┌─────────────────────────────────────────────────────────┐
│  Database Layer (server/db/store.ts)                    │
│  - Local JSON file persistence                          │
│  - Duplicate prevention (brand + name = unique key)     │
│  - Search and filter operations                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Seed Script (server/scripts/seed.ts) - One-time use    │
│  - Fetches from Fragella API (LIMITED CALLS)            │
│  - Normalizes data via lib/normalize.ts                 │
│  - Stores in database via db/store.ts                   │
│  - Carefully tracks quota usage                         │
└────────────────────────────┬────────────────────────────┘
                             │ Fragella API client
                             │ (lib/fragella.ts)
                             ▼
                      Fragella API
                      (20 requests/month limit)
```

## Key Security Features

✅ **API Key Protection**

- `FRAGELLA_API_KEY` is server-side only
- Never exposed in browser network requests
- Stored in `.env.local` (not committed to git)
- Used only in `server/lib/fragella.ts`

✅ **No Direct Client Calls**

- Frontend only calls `/api/products` (internal route)
- Vite proxy in `vite.config.ts` routes to localhost:3001

✅ **Quota Safety**

- Hard limit of 20 requests per session (configurable)
- Seed script tracks every API call
- Falls back to cached data when quota exhausted

## File Structure

```
server/
├── index.ts                    # Express server entry point
├── lib/
│   ├── types.ts               # TypeScript interfaces
│   ├── fragella.ts            # Fragella API client
│   └── normalize.ts           # Data normalization/mapping
├── routes/
│   └── products.ts            # API routes (/api/products)
├── db/
│   ├── store.ts               # Database operations
│   └── products.json          # Local data store (git-ignored)
└── scripts/
    └── seed.ts                # One-time data import script
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

Adds Express, CORS, and TypeScript execution via tsx.

### 2. Configure Environment

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Fragella API key:

```env
FRAGELLA_API_KEY=your_actual_key_here
PORT=3001
NODE_ENV=development
```

**Important:** `.env.local` is git-ignored and will not be committed.

### 3. Run in Development

Two terminals required (or use `npm run dev`):

**Terminal 1: Frontend (Vite)**

```bash
npm run dev:vite
```

Opens http://localhost:5173 with Vite dev server

**Terminal 2: Backend (Express)**

```bash
npm run dev:server
```

Starts Express at http://localhost:3001

Or run both together:

```bash
npm run dev
```

The Vite config proxies `/api/*` requests to `http://localhost:3001/api/*`

### 4. Seed Initial Data

In a new terminal, run the seed script:

```bash
npm run seed
```

This will:

- Fetch fragrances from configured brands (Dior, Chanel, etc.)
- Normalize data to internal Product format
- Store in `server/db/products.json`
- Track API request quota
- Skip duplicates automatically

**Example output:**

```
🌱 Starting Fragella Data Seed

📦 Fetching fragrances from brand: Dior
   ✅ 4/4 fragrances added (0 duplicates)

📦 Fetching fragrances from brand: Chanel
   ✅ 3/4 fragrances added (1 duplicate)

============================================================
✨ Seed Complete
============================================================
  Added: 7 new fragrances
  Requests used: 2/10
  Database total: 7 products
  Time: 1234ms
  Last updated: 2026-02-08T12:34:56.789Z
============================================================
```

## API Routes

All routes are read-only from the database. No Fragella API calls in routes.

### GET /api/products

Returns all products from database

```bash
curl http://localhost:3001/api/products
```

### GET /api/products/:id

Get single product by ID

```bash
curl http://localhost:3001/api/products/frag_dior_sauvage
```

### GET /api/products/search?q=rose

Search by name, brand, or description

```bash
curl http://localhost:3001/api/products/search?q=rose
```

### GET /api/products/family/:family

Filter by scent family

```bash
curl http://localhost:3001/api/products/family/Floral
```

### GET /api/products/internal/stats

Database statistics (for debugging)

```bash
curl http://localhost:3001/api/products/internal/stats
```

## Data Normalization

The `lib/normalize.ts` module converts Fragella responses to the internal Product model:

### Fragella Field Mapping

| Fragella Field             | Internal Field          | Transformation                        |
| -------------------------- | ----------------------- | ------------------------------------- |
| `id`                       | `fragellaId`            | Stored for tracking                   |
| `name`                     | `name`                  | Direct copy                           |
| `brand`                    | `brand`                 | Direct copy                           |
| `description`              | `description`           | Direct copy                           |
| `image_url`                | `image`                 | Optimized (jpg → webp)                |
| `male`, `female`, `unisex` | `gender`                | Mapped to 'Men', 'Women', or 'Unisex' |
| `*_notes`                  | `notes.top/middle/base` | Structured array                      |
| `accords`                  | `scentFamily`           | Heuristic mapping                     |
| `price`                    | `sizes`                 | Ignored; uses placeholder pricing     |
| `affiliate_url`            | (ignored)               | Dropped for safety                    |
| `purchase_url`             | (ignored)               | Dropped for safety                    |

### Scent Family Mapping

The normalizer infers scent family from:

1. Fragrance description
2. Note names (top/middle/base)
3. Accords

Heuristic rules:

- "rose", "iris", "peony" → **Floral**
- "sandalwood", "cedarwood", "oud" → **Woody**
- "amber", "musk", "vanilla" → **Oriental**
- "lemon", "bergamot", "citrus" → **Citrus**
- "aquatic", "fresh", "mint" → **Fresh**
- "chocolate", "caramel", "honey" → **Gourmand**

### Price Tiers

Fragella prices are ignored per requirements. Instead, placeholder luxury pricing:

```typescript
sizes: [
  { size: 50, price: 8500 }, // ~$85
  { size: 100, price: 15000 }, // ~$150
]
```

## Database Operations

### Adding Products

```typescript
import { addProduct, addProducts } from '../db/store'
import { normalizeFragrance } from '../lib/normalize'

// Single product
const normalized = normalizeFragrance(fragellaResponse)
addProduct(normalized) // returns true if added, false if duplicate

// Batch add
const normalized = normalizeFragrances(fragellaResponses)
const count = addProducts(normalized) // returns count added
```

### Querying Products

```typescript
import { getAllProducts, getProductById, searchProducts, getProductsByFamily } from '../db/store'

getAllProducts() // All products
getProductById('frag_123') // Single by ID
searchProducts('rose') // Search
getProductsByFamily('Floral') // Filter by family
```

### Duplicate Prevention

Products are considered duplicates if:

- `brand` AND `name` match exactly

This is checked before every add operation. The seed script logs when duplicates are skipped.

## Quota Management

### Monthly Limit: 20 Requests

The Fragella API allows **20 requests per month**. Our strategy:

1. **Seed script limits per session** (default: 10 requests max)
2. **Each fetch is logged** with timestamp and endpoint
3. **Client validates before each request** in `lib/fragella.ts`
4. **Falls back gracefully** if quota exceeded

### Configuration

Edit `server/scripts/seed.ts`:

```typescript
const SEED_CONFIG: SeedConfig = {
  brands: ['Dior', 'Chanel', 'Tom Ford', 'Creed', 'Guerlain'],
  maxItemsPerBrand: 4,
  maxTotalRequests: 10, // ← Adjust this (keep < 20)
}
```

### Monitoring Usage

Check stats endpoint:

```bash
curl http://localhost:3001/api/products/internal/stats
```

Response:

```json
{
  "totalProducts": 42,
  "lastSyncedAt": "2026-02-08T12:34:56.789Z",
  "version": 1,
  "message": "Database statistics (development only)"
}
```

## Error Handling

### Missing Fields

The normalizer handles gracefully:

- Missing `description` → uses "A luxurious fragrance."
- Missing `image_url` → uses placeholder image
- Missing notes → empty arrays
- Missing gender flags → defaults to 'Unisex'

### API Errors

If Fragella API fails:

1. Seed script logs the error and continues with next brand
2. Frontend receives cached data from database
3. Error message shown in UI with fallback notice

### Network Errors

If backend is down:

1. Frontend switches to local fallback data (`src/data/perfumes.ts`)
2. Yellow warning banner shown: "Could not load perfumes from server"
3. User can still browse with local catalog

## Frontend Integration

### ProductList Component

```vue
<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore'

const store = useProductStore()

onMounted(() => {
  // Fetch from /api/products via proxy
  store.fetchProducts()
})
</script>

<template>
  <div v-if="store.loading">Loading...</div>
  <div v-if="store.error" class="warning">{{ store.error }}</div>
  <ProductCard v-for="p in store.filteredAndSortedProducts" :key="p.id" :perfume="p" />
</template>
```

### Product Store

```typescript
const store = useProductStore()

// State
store.allProducts // Current product list
store.loading // Fetch in progress
store.error // Error message if fetch failed

// Actions
await store.fetchProducts() // Fetch from API (or use fallback)

// Computed
store.filteredAndSortedProducts // With filters/sorting applied
```

## Production Deployment

### Before deploying:

1. **Remove `.env.local` from git**

   ```bash
   git rm --cached .env.local
   echo ".env.local" >> .gitignore
   ```

2. **Set environment variables** on hosting platform

   ```
   FRAGELLA_API_KEY=production_key_here
   PORT=3001
   NODE_ENV=production
   ```

3. **Build frontend**

   ```bash
   npm run build
   ```

4. **Start backend**

   ```bash
   npm run server
   ```

5. **Seed data** (one-time)

   ```bash
   npm run seed
   ```

6. **Monitor quota**
   - Keep detailed logs of all seed runs
   - Only re-seed when needed (data refresh)
   - Consider cron job for monthly refresh

## Troubleshooting

### "FRAGELLA_API_KEY not configured"

- Run `cp .env.example .env.local`
- Add your actual API key to `.env.local`
- Restart the server

### "Quota exhausted (20 requests/session)"

- You've exceeded the monthly limit
- Wait until next month for fresh quota
- Or contact Fragella for limit increase

### Frontend sees "Could not load perfumes from server"

- Check backend is running: `curl http://localhost:3001/health`
- Check API is responding: `curl http://localhost:3001/api/products`
- Check browser console for network errors
- Verify Vite proxy is configured (vite.config.ts)

### Database appears empty

- Run seed script: `npm run seed`
- Check `server/db/products.json` has content
- Verify no errors during seed

### Duplicate products in database

- This is intentional (same brand+name from multiple imports)
- The seed script logs and skips duplicates
- If major issue, clear database:
  ```bash
  rm server/db/products.json
  npm run seed
  ```

## Testing

### Manual API testing

```bash
# Health check
curl http://localhost:3001/health

# Get all products
curl http://localhost:3001/api/products | head -20

# Search
curl http://localhost:3001/api/products/search?q=rose

# Get by family
curl http://localhost:3001/api/products/family/Floral

# Stats
curl http://localhost:3001/api/products/internal/stats
```

### Test seed script (dry run)

Edit `server/scripts/seed.ts` to reduce brands/items:

```typescript
const SEED_CONFIG: SeedConfig = {
  brands: ['Dior'], // Only one brand
  maxItemsPerBrand: 1, // One item per brand
  maxTotalRequests: 2, // Two requests max
}
```

Then run:

```bash
npm run seed
```

## Next Steps

- [ ] Add authentication to seed endpoint (prevent unauthorized data imports)
- [ ] Implement database migration system for schema changes
- [ ] Add product images from Fragella to storage service
- [ ] Set up cron job for monthly data refresh
- [ ] Add analytics: track which fragrances are viewed/added to cart
- [ ] Implement wishlist persistence to backend
- [ ] Add admin dashboard for data management
