//src/stores/productStore.ts
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { localProducts } from '../data/products'
import type { Perfume, ScentFamily } from '../types/perfume'

// TODO: API Integration Ready
// This store is currently using local data for stability during Sprint 6
// To switch to API-driven data:
// 1. Uncomment fetchProducts() method below
// 2. Remove initializeProducts() method
// 3. Call store.fetchProducts() on component mount instead of initializeProducts()

const SCENT_ORDER: ScentFamily[] = ['Floral', 'Woody', 'Oriental', 'Fresh', 'Citrus', 'Gourmand']

export const useProductStore = defineStore('product', () => {
  // State
  const allProducts = ref<Perfume[]>(localProducts) // Load synchronously
  console.log('[STORE PRODUCTS]', allProducts.value.length)

  /* 
   * Previous async initialization removed to ensure immediate data availability.
   * API simulation can be added back when backend is ready.
   */
  const loading = ref(false)
  const error = ref<string | null>(null)
  const isInitialized = ref(false)

  // Computed: Unique brands from products
  const availableBrands = computed(() => {
    const brands = new Set(allProducts.value.map((p) => p.brand))
    return Array.from(brands).sort()
  })

  // Computed: Unique scent families from products
  const availableScentFamilies = computed(() =>
    SCENT_ORDER.filter((family) => allProducts.value.some((p) => p.scentFamily === family)),
  )

  // Computed: Best sellers
  const bestSellers = computed(() => {
    return allProducts.value.filter((p) => p.isBestSeller)
  })

  /**
   * Initialize products from local data
   * Simulates realistic loading with skeleton UI
   *
   * TODO: Replace with API fetch when backend is stable
   * Implement: store.fetchProducts() instead
   */
  const initializeProducts = async () => {
    // products already loaded synchronously
    if (isInitialized.value) return 
    
    // Optional: Keep a small delay if you want to show skeleton for UI testing, 
    // otherwise just set initialized
    isInitialized.value = true
  }

  /**
   * Fetch products from API (DISABLED - for future use)
   *
   * Uncomment this method when backend is stable and ready.
   * Then replace initializeProducts() calls with fetchProducts() calls.
   *
   * See SERVER_SETUP.md for complete implementation details.
   */
  // const fetchProducts = async () => {
  //   loading.value = true
  //   error.value = null

  //   try {
  //     const response = await fetch('/api/products')

  //     if (!response.ok) {
  //       throw new Error(`HTTP ${response.status}: Failed to fetch products`)
  //     }

  //     const data = await response.json()
  //     allProducts.value = data
  //     console.log(`[Store] Loaded ${data.length} products from API`)
  //   } catch (err) {
  //     const message = err instanceof Error ? err.message : 'Unknown error'
  //     error.value = message
  //     console.warn(`[Store] Failed to fetch from API, using local data: ${message}`)
  //     // Keep using the fallback local data
  //   } finally {
  //     loading.value = false
  //   }
  // }

  return {
    // State
    allProducts,
    loading,
    error,
    isInitialized,
    // Computed
    availableBrands,
    availableScentFamilies,
    bestSellers,
    // Access to all products (needed for wishlist)
    get products() {
      return allProducts.value
    },
    // Actions
    initializeProducts,
    // fetchProducts, // TODO: Uncomment when API is ready
  }
})
