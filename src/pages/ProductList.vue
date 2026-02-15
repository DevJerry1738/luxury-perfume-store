<template>
  <div class="layout">
    <!-- ================= DESKTOP SIDEBAR ================= -->
    <FilterSidebar class="desktop-only" :selected-brands="filters.brands"
      :selected-scent-families="filters.scentFamilies" :selected-gender="filters.gender"
      @update:brands="filters.brands = $event" @update:scent-families="filters.scentFamilies = $event"
      @update:gender="filters.gender = $event" @reset="resetFilters" />

    <!-- ================= MAIN CONTENT ================= -->
    <main class="main-content">
      <!-- Sticky Header -->
      <header class="header">
        <div class="title-group">
          <h1 class="title">Catalogue</h1>
          <span class="count">
            {{ filteredAndSortedProducts.length }} items
          </span>
        </div>

        <div class="header-actions">
          <!-- Mobile Filter Button -->
          <button class="mobile-filter-btn" @click="openFilters">
            Filters
          </button>

          <SortDropdown :sort-by="filters.sortBy" @update:sort-by="filters.sortBy = $event" />
        </div>
      </header>

      <!-- Loading State -->
      <div v-if="store.loading" class="state">
        <p>Loading perfumes...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="store.error" class="state error">
        <p>⚠️ Could not load perfumes</p>
        <small>{{ store.error }}</small>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredAndSortedProducts.length === 0" class="state empty">
        <p>No perfumes match your filters.</p>
        <button class="reset-btn" @click="resetFilters">
          Clear filters
        </button>
      </div>

      <!-- Product Grid -->
      <div v-else class="grid">
        <ProductCard v-for="p in filteredAndSortedProducts" :key="p.id" :perfume="p" />
      </div>
    </main>

    <!-- ================= MOBILE FILTER SHEET ================= -->

    <!-- Overlay -->
    <div class="mobile-filter-overlay" :class="{ open: showFilters }" @click="closeFilters" />

    <!-- Bottom Sheet / Side Panel -->
    <div class="mobile-filter-sheet" :class="{ open: showFilters }">
      <div class="sheet-header">
        <h2 class="sheet-title">Filters</h2>
        <button class="close-btn" @click="closeFilters" aria-label="Close filters">
          ✕
        </button>
      </div>

      <div class="sheet-body">
        <FilterSidebar :selected-brands="filters.brands" :selected-scent-families="filters.scentFamilies"
          :selected-gender="filters.gender" @update:brands="filters.brands = $event"
          @update:scent-families="filters.scentFamilies = $event" @update:gender="filters.gender = $event"
          @reset="resetFilters" />
      </div>

      <div class="sheet-footer">
        <button class="apply-btn" @click="closeFilters">
          Show {{ filteredAndSortedProducts.length }} results
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import FilterSidebar from '../components/FilterSidebar.vue'
import SortDropdown from '../components/SortDropdown.vue'
import { useProductStore } from '../stores/productStore'
import type { Perfume, Gender, ScentFamily } from '../types/perfume'

const store = useProductStore()
const route = useRoute()

/* ================= MOBILE FILTER STATE ================= */
const showFilters = ref(false)

const openFilters = () => {
  showFilters.value = true
  document.documentElement.style.overflow = 'hidden'
}

const closeFilters = () => {
  showFilters.value = false
  document.documentElement.style.overflow = ''
}

/* ================= FILTER STATE ================= */
const filters = ref<{
  brands: string[]
  scentFamilies: ScentFamily[]
  gender: Gender | null
  sortBy: 'price-asc' | 'price-desc' | 'best-seller' | 'new-arrival'
}>({
  brands: [],
  scentFamilies: [],
  gender: null,
  sortBy: 'price-asc',
})

/* ================= HELPERS ================= */
const getLowestPrice = (perfume: Perfume): number => {
  if (!perfume.sizes?.length) return 0
  return Math.min(...perfume.sizes.map((s) => s.price))
}

/* ================= FILTER + SORT ================= */
const filteredAndSortedProducts = computed(() => {
  if (!store.products.length) return []

  let result = [...store.products]

  if (filters.value.brands.length > 0) {
    result = result.filter((p) =>
      filters.value.brands.includes(p.brand),
    )
  }

  if (filters.value.scentFamilies.length > 0) {
    result = result.filter((p) =>
      filters.value.scentFamilies.includes(p.scentFamily),
    )
  }

  if (filters.value.gender) {
    result = result.filter(
      (p) => p.gender === filters.value.gender,
    )
  }

  switch (filters.value.sortBy) {
    case 'price-asc':
      result.sort(
        (a, b) => getLowestPrice(a) - getLowestPrice(b),
      )
      break
    case 'price-desc':
      result.sort(
        (a, b) => getLowestPrice(b) - getLowestPrice(a),
      )
      break
    case 'best-seller':
      result.sort(
        (a, b) =>
          Number(b.isBestSeller) - Number(a.isBestSeller),
      )
      break
    case 'new-arrival':
      result.sort((a, b) =>
        b.id.localeCompare(a.id, undefined, {
          numeric: true,
        }),
      )
      break
  }

  return result
})

/* ================= RESET ================= */
const resetFilters = () => {
  filters.value = {
    brands: [],
    scentFamilies: [],
    gender: null,
    sortBy: 'price-asc',
  }
}

/* ================= INIT ================= */
onMounted(async () => {
  await store.initializeProducts()

  // Initialize from query params
  const familyParam = route.query.family as string
  if (familyParam && store.availableScentFamilies.includes(familyParam as ScentFamily)) {
    filters.value.scentFamilies = [familyParam as ScentFamily]
  }
})
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  background: #ffffff;
  /* Ensure container doesn't overflow */
  max-width: 100%;
  overflow-x: hidden;
}

/* ================= HEADER ================= */

.header {
  position: sticky;
  /* top: 56px; */
  /* Matches mobile navbar height */
  z-index: 30;
  /* Below navbar (50) and mobile menu (40) */
  background: #ffffff;
  /* padding: 16px; */
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 2rem;
}

.title-group {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 20px;
  margin: 0;
  font-weight: 600;
}

.count {
  font-size: 13px;
  color: #888;
}

.header-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

/* Tablet & Desktop Header */
@media (min-width: 768px) {
  .header {
    /* top: 64px; */
    /* Matches desktop navbar height */
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    /* padding: 20px 24px; */
  }

  .header-actions {
    flex-direction: row;
    width: auto;
    align-items: center;
  }
}

/* ================= MAIN ================= */

.main-content {
  flex: 1;
  width: 100%;
  padding: 16px;
}

@media (min-width: 768px) {
  .main-content {
    padding: 24px;
  }
}

/* ================= GRID ================= */

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

/* Tablet (3 cols) */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
}

/* Desktop (4 cols) */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
}

/* ================= STATES ================= */

.state {
  text-align: center;
  padding: 80px 20px;
  color: #666;
}

.empty {
  color: #888;
}

.error {
  color: #b00020;
}

.reset-btn {
  margin-top: 14px;
  padding: 10px 18px;
  border-radius: 999px;
  background: #f2f2f2;
  border: none;
  cursor: pointer;
}

/* ================= MOBILE FILTER BUTTON ================= */

.mobile-filter-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background: #111;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

.mobile-filter-btn:hover {
  background: #333;
}

@media (min-width: 1024px) {
  .mobile-filter-btn {
    display: none;
  }
}

/* ================= SIDEBARS (Desktop & Tablet Panel) ================= */

/* Desktop Permanent Sidebar */
.desktop-only {
  display: none;
}

@media (min-width: 1024px) {
  .desktop-only {
    display: block;
    width: 280px;
    flex-shrink: 0;
    border-right: 1px solid #f0f0f0;
    height: calc(100vh - 64px);
    position: sticky;
    /* top: 64px; */
    overflow-y: auto;
  }
}

/* ================= FILTER DRAWER (Mobile & Tablet) ================= */

.mobile-filter-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  z-index: 100;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.mobile-filter-overlay.open {
  opacity: 1;
  pointer-events: auto;
}

.mobile-filter-sheet {
  position: fixed;
  background: #fff;
  z-index: 101;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
}

/* Mobile: Bottom Sheet */
@media (max-width: 767px) {
  .mobile-filter-sheet {
    left: 0;
    right: 0;
    bottom: 0;
    height: 85vh;
    border-radius: 20px 20px 0 0;
    transform: translateY(100%);
  }

  .mobile-filter-sheet.open {
    transform: translateY(0);
  }
}

/* Tablet: Side Panel */
@media (min-width: 768px) and (max-width: 1023px) {
  .mobile-filter-sheet {
    top: 0;
    left: 0;
    bottom: 0;
    width: 320px;
    height: 100vh;
    border-radius: 0;
    transform: translateX(-100%);
  }

  .mobile-filter-sheet.open {
    transform: translateX(0);
  }
}

/* Desktop: Hidden (uses permanent sidebar) */
@media (min-width: 1024px) {

  .mobile-filter-sheet,
  .mobile-filter-overlay {
    display: none !important;
  }
}

.sheet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
}

.sheet-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
}

.sheet-body {
  flex: 1;
  overflow-y: auto;
  padding: 0;
}

.sheet-footer {
  padding: 16px 20px;
  border-top: 1px solid #eee;
  background: #fff;
}

.apply-btn {
  width: 100%;
  padding: 14px;
  border-radius: 999px;
  background: #111;
  color: #fff;
  font-weight: 600;
  border: none;
  cursor: pointer;
  font-size: 15px;
}
</style>
