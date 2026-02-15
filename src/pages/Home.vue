<template>
  <div class="home-page">
    <HeroSection />



    <ScentFamilySelector />

    <BestSellersCarousel />

    <section id="catalog" class="catalog container">
      <header class="catalog-header">
        <h2>Collection</h2>
        <p class="muted">Curated selection of our current collection.</p>
      </header>

      <ProductFilters :filtered-count="filteredProducts.length" :total-count="store.products.length"
        @update:filters="handleFilterUpdate" />

      <transition name="fade" mode="out-in">
        <SkeletonGrid v-if="isLoading" :count="8" key="skeleton" />
        <div v-else key="products" class="grid">
          <ProductCard v-for="p in filteredProducts" :key="p.id" :perfume="p" class="card-item" />
        </div>
      </transition>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import ProductFilters from '../components/ProductFilters.vue'
import ScentFamilySelector from '../components/ScentFamilySelector.vue'
import BestSellersCarousel from '../components/BestSellersCarousel.vue'
import SkeletonGrid from '../components/SkeletonGrid.vue'
import ProductCard from '../components/ProductCard.vue'
import { useProductStore } from '../stores/productStore'
import type { Perfume, ScentFamily } from '../types/perfume'

const store = useProductStore()
const isLoading = ref(true)

// Local filter state
const filters = ref({
  search: '',
  scentFamily: '',
  priceRange: '',
  sort: 'price-asc',
})

// Helper: Get lowest price for a perfume
const getLowestPrice = (perfume: Perfume): number => {
  const prices = perfume.sizes?.map((s) => s.price) ?? []
  return prices.length ? Math.min(...prices) : 0
}

// Watch for store changes for debugging
// eslint-disable-next-line vue/no-watch-after-await
import { watchEffect } from 'vue'
watchEffect(() => {
  console.log('[HOME] products from store:', store.products.length)
})

// Computed: Filtered and sorted products
const filteredProducts = computed(() => {
  // Guard: If store is empty, return empty (or handle loading)
  if (!store.products.length) return []

  // Fallback: If no filters active, return raw products for performance
  const noFiltersActive =
    !filters.value.search &&
    !filters.value.scentFamily &&
    !filters.value.priceRange &&
    filters.value.sort === 'price-asc'

  if (noFiltersActive) {
    return store.products
  }

  let result = [...store.products]

  // Apply search filter
  if (filters.value.search.trim()) {
    const query = filters.value.search.toLowerCase().trim()
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query)
    )
  }

  // Apply scent family filter
  if (filters.value.scentFamily) {
    result = result.filter((p) => p.scentFamily === filters.value.scentFamily)
  }

  // Apply price range filter
  if (filters.value.priceRange) {
    result = result.filter((p) => {
      // Guard against products with no sizes
      if (!p.sizes?.length) return true

      const lowestPrice = getLowestPrice(p)
      switch (filters.value.priceRange) {
        case 'under-50k':
          return lowestPrice < 50000
        case '50k-100k':
          return lowestPrice >= 50000 && lowestPrice <= 100000
        case '100k-200k':
          return lowestPrice > 100000 && lowestPrice <= 200000
        case 'above-200k':
          return lowestPrice > 200000
        default:
          return true
      }
    })
  }

  // Apply sorting
  switch (filters.value.sort) {
    case 'price-asc':
      result.sort((a, b) => getLowestPrice(a) - getLowestPrice(b))
      break
    case 'price-desc':
      result.sort((a, b) => getLowestPrice(b) - getLowestPrice(a))
      break
    case 'name-asc':
      result.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'name-desc':
      result.sort((a, b) => b.name.localeCompare(a.name))
      break
  }

  return result
})

// Handle filter updates from ProductFilters component
const handleFilterUpdate = (newFilters: {
  search: string
  scentFamily: string
  priceRange: string
  sort: string
}) => {
  filters.value = newFilters
}

onMounted(() => {
  // Store is now synchronous, but we keep this call for any future logic
  store.initializeProducts()

  // minimal skeleton flash to show loading UI
  setTimeout(() => {
    isLoading.value = false
  }, 350)
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.about {
  padding: 48px 0;
}

.about-inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  text-align: center;
}

.about-title {
  font-size: clamp(20px, 3.2vw, 28px);
  margin: 0 0 8px;
}

.about-text {
  color: #666666;
  max-width: 900px;
  margin: 0 auto;
}

.catalog {
  padding: 40px 0 80px;
}

.catalog-header {
  text-align: center;
  margin-bottom: 24px;
}

.catalog-header h2 {
  margin: 0;
  font-size: 20px;
}

.muted {
  color: #999999;
  margin-top: 6px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 18px;
  margin: 0 auto;
  padding: 0 20px;
}

.card-item {
  flex: 0 0 220px;
  scroll-snap-align: start;
  transition:
    transform 200ms ease,
    box-shadow 200ms ease;
}

.card-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(51, 51, 51, 0.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 240ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .grid {
    gap: 12px;
  }

  .about {
    padding: 28px 0;
  }
}
</style>
