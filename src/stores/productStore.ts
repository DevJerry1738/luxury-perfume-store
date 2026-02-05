//src/stores/productStore.ts
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { perfumes } from '@/data/perfumes'
import type { Perfume, ScentFamily, Gender } from '@/types/perfume'

type SortOption = 'price-asc' | 'price-desc' | 'best-seller' | 'new-arrival'

const SCENT_ORDER: ScentFamily[] = ['Floral', 'Woody', 'Oriental', 'Fresh', 'Citrus', 'Gourmand']

export const useProductStore = defineStore('product', () => {
  // State
  const selectedBrands = ref<string[]>([])
  const selectedScentFamilies = ref<ScentFamily[]>([])
  const selectedGender = ref<Gender | null>(null)
  const sortBy = ref<SortOption>('price-asc')

  // Computed: Unique brands from products
  const availableBrands = computed(() => {
    const brands = new Set(perfumes.map((p) => p.brand))
    return Array.from(brands).sort()
  })

  // Computed: Unique scent families from products
  const availableScentFamilies = computed(() =>
    SCENT_ORDER.filter((family) => perfumes.some((p) => p.scentFamily === family)),
  )

  // Computed: Get lowest price for a perfume
  const getLowestPrice = (perfume: Perfume): number => {
    const prices = perfume.sizes.map((s) => s.price)
    return Math.min(...prices)
  }

  // Computed: Filtered products
  const filteredProducts = computed(() => {
    return perfumes.filter((perfume) => {
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

  return {
    // State
    selectedBrands,
    selectedScentFamilies,
    selectedGender,
    sortBy,
    // Computed
    availableBrands,
    availableScentFamilies,
    filteredAndSortedProducts,
    // Access to all products (needed for wishlist)
    get products() {
      return perfumes
    },
    // Actions
    toggleBrand,
    toggleScentFamily,
    setGender,
    setSortBy,
    resetFilters,
  }
})
