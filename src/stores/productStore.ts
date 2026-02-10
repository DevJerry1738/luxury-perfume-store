//src/stores/productStore.ts
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { localProducts } from '../data/products'
import type { Perfume, ScentFamily, Gender } from '../types/perfume'

// TODO: API Integration Ready
// This store is currently using local data for stability during Sprint 6
// To switch to API-driven data:
// 1. Uncomment fetchProducts() method below
// 2. Remove initializeProducts() method
// 3. Call store.fetchProducts() on component mount instead of initializeProducts()

type SortOption = 'price-asc' | 'price-desc' | 'best-seller' | 'new-arrival'

const SCENT_ORDER: ScentFamily[] = ['Floral', 'Woody', 'Oriental', 'Fresh', 'Citrus', 'Gourmand']

export const useProductStore = defineStore('product', () => {
  // State
  const selectedBrands = ref<string[]>([])
  const selectedScentFamilies = ref<ScentFamily[]>([])
  const selectedGender = ref<Gender | null>(null)
  const sortBy = ref<SortOption>('price-asc')
  const allProducts = ref<Perfume[]>([]) // Start empty, will be populated on init
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

  // Computed: Get lowest price for a perfume
  const getLowestPrice = (perfume: Perfume): number => {
    const prices = perfume.sizes.map((s) => s.price)
    return Math.min(...prices)
  }

  // Computed: Filtered products
  const filteredProducts = computed(() => {
    return allProducts.value.filter((perfume) => {
      const brandMatch =
        selectedBrands.value.length === 0 || selectedBrands.value.includes(perfume.brand)
      const scentMatch =
        selectedScentFamilies.value.length === 0 ||
        selectedScentFamilies.value.includes(perfume.scentFamily)
      const genderMatch = selectedGender.value === null || perfume.gender === selectedGender.value

      return brandMatch && scentMatch && genderMatch
    })
  })

  // Computed: Filtered and sorted products
  const filteredAndSortedProducts = computed(() => {
    const sorted = [...filteredProducts.value]

    switch (sortBy.value) {
      case 'price-asc':
        sorted.sort((a, b) => getLowestPrice(a) - getLowestPrice(b))
        break
      case 'price-desc':
        sorted.sort((a, b) => getLowestPrice(b) - getLowestPrice(a))
        break
      case 'best-seller':
        sorted.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0))
        break
      case 'new-arrival':
        sorted.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0))
        break
    }

    return sorted
  })

  // Actions
  const toggleBrand = (brand: string) => {
    const index = selectedBrands.value.indexOf(brand)
    if (index > -1) {
      selectedBrands.value.splice(index, 1)
    } else {
      selectedBrands.value.push(brand)
    }
  }

  const toggleScentFamily = (family: ScentFamily) => {
    const index = selectedScentFamilies.value.indexOf(family)
    if (index > -1) {
      selectedScentFamilies.value.splice(index, 1)
    } else {
      selectedScentFamilies.value.push(family)
    }
  }

  const setGender = (gender: Gender | null) => {
    selectedGender.value = gender
  }

  const setSortBy = (option: SortOption) => {
    sortBy.value = option
  }

  const resetFilters = () => {
    selectedBrands.value = []
    selectedScentFamilies.value = []
    selectedGender.value = null
    sortBy.value = 'price-asc'
  }

  /**
   * Initialize products from local data
   * Simulates realistic loading with skeleton UI
   *
   * TODO: Replace with API fetch when backend is stable
   * Implement: store.fetchProducts() instead
   */
  const initializeProducts = async () => {
    // Skip if already initialized
    if (isInitialized.value) {
      return
    }

    loading.value = true
    error.value = null

    try {
      // Simulate realistic network delay (300-600ms)
      // This allows skeleton loaders to display briefly
      await new Promise((resolve) => setTimeout(resolve, 350))

      // Load from local hardcoded dataset
      allProducts.value = localProducts
      console.log(`[Store] Initialized ${localProducts.length} products from local data`)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      error.value = message
      console.error(`[Store] Failed to initialize products: ${message}`)
    } finally {
      loading.value = false
      isInitialized.value = true
    }
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
    selectedBrands,
    selectedScentFamilies,
    selectedGender,
    sortBy,
    allProducts,
    loading,
    error,
    isInitialized,
    // Computed
    availableBrands,
    availableScentFamilies,
    filteredAndSortedProducts,
    // Access to all products (needed for wishlist)
    get products() {
      return allProducts.value
    },
    // Actions
    toggleBrand,
    toggleScentFamily,
    setGender,
    setSortBy,
    resetFilters,
    initializeProducts,
    // fetchProducts, // TODO: Uncomment when API is ready
  }
})
