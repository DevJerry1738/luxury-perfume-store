# Quick Start: Fragella Integration

## 30-Second Setup

### 1. Add your API key

```bash
cp .env.example .env.local
# Edit .env.local and add FRAGELLA_API_KEY=your_key_here
```

### 2. Install & run

```bash
npm install
npm run dev          # Starts both Vite + Express
```

### 3. Seed data (in another terminal)

```bash
npm run seed
```

### 4. Browse products

- Open http://localhost:5173
- Products load from Express backend via `/api/products`
- Uses local cache if backend unavailable

---

## What Was Added

### Backend Structure

```
server/
├── index.ts                   # Express server
├── lib/fragella.ts           # Fragella API client (server-side only!)
├── lib/normalize.ts          # Convert Fragella → internal format
├── lib/types.ts              # TypeScript interfaces
├── db/store.ts               # Database operations
├── db/products.json          # Cached product data
├── routes/products.ts        # API routes (/api/products)
└── scripts/seed.ts           # Import data from Fragella
```

### Updated Frontend

- `src/stores/productStore.ts` – now fetches from `/api/products`
- `src/pages/ProductList.vue` – loading/error states, fetches on mount
- `vite.config.ts` – proxy `/api/*` to backend

### Configuration

- `.env.local` – Fragella API key (git-ignored)
- `package.json` – Express, CORS, tsx, new scripts

---

## Key Points

✅ **API Key is Safe**

- Only used in `server/lib/fragella.ts`
- Never sent to browser
- Stored in `.env.local` (not committed)

✅ **Data is Cached**

- One-time seed to `server/db/products.json`
- Frontend always reads from cache
- API calls limited to seed script

✅ **No Direct Client Access to Fragella**

- Frontend only calls `/api/products` (internal)
- Vite proxy routes through Express
- Fragella never touched by browser

---

## Scripts

| Command              | What it does                          |
| -------------------- | ------------------------------------- |
| `npm run dev`        | Start Vite + Express (both terminals) |
| `npm run dev:vite`   | Start Vite only (frontend)            |
| `npm run dev:server` | Start Express only (backend)          |
| `npm run seed`       | Import fragrances from Fragella API   |
| `npm run server`     | Run Express in production mode        |
| `npm run build`      | Build frontend for production         |

---

## API Endpoints

All available at `http://localhost:3001/api`

| Endpoint                       | Purpose                |
| ------------------------------ | ---------------------- |
| `GET /products`                | All products           |
| `GET /products/:id`            | Single product         |
| `GET /products/search?q=rose`  | Search                 |
| `GET /products/family/Floral`  | Filter by scent family |
| `GET /products/internal/stats` | Database stats (debug) |

---

## Quota Reminder

- Fragella API: **20 requests/month**
- Seed script limits to **10 per run** by default
- Each `npm run seed` = ~2-5 API calls (depending on brands)
- **Do NOT run seed multiple times in one month** unless you refresh products

Edit `server/scripts/seed.ts` to change limits.

---

## Troubleshooting

**Backend won't start?**

```bash
# Check API key is set
cat .env.local | grep FRAGELLA_API_KEY

# Check port 3001 is free
netstat -ano | findstr :3001  # Windows
lsof -i :3001                  # Mac/Linux
```

**Frontend shows "Could not load"?**

```bash
# Check backend is running
curl http://localhost:3001/health

# Check products are in database
curl http://localhost:3001/api/products | head
```

**Seed fails?**

```bash
# Check API key is valid
# Check you haven't exceeded monthly limit
# See SERVER_SETUP.md for detailed troubleshooting
```

---

## Next Steps

1. ✅ Add API key to `.env.local`
2. ✅ Run `npm install && npm run dev`
3. ✅ In another terminal: `npm run seed`
4. ✅ Browse http://localhost:5173

For detailed architecture, see [SERVER_SETUP.md](SERVER_SETUP.md)
