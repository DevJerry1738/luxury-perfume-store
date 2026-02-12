<template>
  <div class="layout">
    <FilterSidebar
      :selected-brands="filters.brands"
      :selected-scent-families="filters.scentFamilies"
      :selected-gender="filters.gender"
      @update:brands="filters.brands = $event"
      @update:scent-families="filters.scentFamilies = $event"
      @update:gender="filters.gender = $event"
      @reset="resetFilters"
    />
    <main class="main-content">
      <header class="header">
        <h1 class="title">Catalogue</h1>
        <SortDropdown :sort-by="filters.sortBy" @update:sort-by="filters.sortBy = $event" />
      </header>

      <!-- Loading state -->
      <div v-if="store.loading" class="loading">
        <p>Loading perfumes...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="store.error" class="error">
        <p>⚠️ Could not load perfumes from server</p>
        <p class="error-message">{{ store.error }}</p>
        <p class="fallback-notice">Using local data as fallback</p>
      </div>

      <!-- Empty state -->
      <div v-else-if="filteredAndSortedProducts.length === 0" class="empty">
        <p>No perfumes match your filters.</p>
      </div>

      <!-- Products grid -->
      <div v-else class="grid">
        <ProductCard v-for="p in filteredAndSortedProducts" :key="p.id" :perfume="p" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import FilterSidebar from '../components/FilterSidebar.vue'
import SortDropdown from '../components/SortDropdown.vue'
import { useProductStore } from '../stores/productStore'
import type { Perfume, Gender, ScentFamily } from '../types/perfume'

const store = useProductStore()

// Local filter state
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

// Helper: Get lowest price for a perfume
const getLowestPrice = (perfume: Perfume): number => {
  const prices = perfume.sizes.map((s) => s.price)
  return Math.min(...prices)
}

// Computed: Filtered and sorted products
const filteredAndSortedProducts = computed(() => {
  let result = [...store.products]

  // Apply brand filter
  if (filters.value.brands.length > 0) {
    result = result.filter((p) => filters.value.brands.includes(p.brand))
  }

  // Apply scent family filter
  if (filters.value.scentFamilies.length > 0) {
    result = result.filter((p) => filters.value.scentFamilies.includes(p.scentFamily))
  }

  // Apply gender filter
  if (filters.value.gender) {
    result = result.filter((p) => p.gender === filters.value.gender)
  }

  // Apply sorting
  switch (filters.value.sortBy) {
    case 'price-asc':
      result.sort((a, b) => getLowestPrice(a) - getLowestPrice(b))
      break
    case 'price-desc':
      result.sort((a, b) => getLowestPrice(b) - getLowestPrice(a))
      break
    case 'best-seller':
      result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0))
      break
    case 'new-arrival':
      // Assuming newer products have higher IDs
      result.sort((a, b) => b.id.localeCompare(a.id, undefined, { numeric: true }))
      break
  }

  return result
})

const resetFilters = () => {
  filters.value = {
    brands: [],
    scentFamilies: [],
    gender: null,
    sortBy: 'price-asc',
  }
}

// Initialize products from local data with simulated loading
// TODO: Replace with store.fetchProducts() when API is ready
onMounted(() => {
  store.initializeProducts()
})
</script>

<style scoped>
.layout {
  display: flex;
  background: #ffffff;
  min-height: 100vh;
  color: #333333;
}

.main-content {
  flex: 1;
  padding: 28px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
}

.title {
  margin: 0;
  font-size: 22px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 18px;
}

.empty {
  padding: 60px 28px;
  text-align: center;
  color: #999999;
  font-size: 16px;
}

.loading {
  padding: 60px 28px;
  text-align: center;
  color: #666666;
  font-size: 16px;
}

.error {
  padding: 40px 28px;
  background: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 4px;
  margin-bottom: 28px;
}

.error p {
  margin: 8px 0;
  color: #856404;
}

.error-message {
  font-size: 14px;
  color: #999999;
}

.fallback-notice {
  font-size: 13px;
  margin-top: 8px;
  color: #666666;
}
</style>
