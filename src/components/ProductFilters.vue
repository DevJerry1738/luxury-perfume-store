<template>
  <section class="product-filters">
    <div class="filters-container">
      <!-- Search Input -->
      <div class="search-wrapper">
        <div class="search-input-group">
          <svg
            class="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            v-model="localSearchQuery"
            type="text"
            class="search-input"
            placeholder="Search fragrances, brands..."
            @input="handleSearchInput"
          />
        </div>
      </div>

      <!-- Filter Row -->
      <div class="filter-row">
        <!-- Scent Family Dropdown -->
        <div class="filter-group">
          <label class="filter-label">Scent Family</label>
          <select v-model="localScentFamily" class="filter-select" @change="emitFilters">
            <option value="">All</option>
            <option value="Floral">Floral</option>
            <option value="Woody">Woody</option>
            <option value="Fresh">Fresh</option>
            <option value="Oriental">Oriental</option>
            <option value="Citrus">Citrus</option>
            <option value="Gourmand">Gourmand</option>
          </select>
        </div>

        <!-- Price Range Dropdown -->
        <div class="filter-group">
          <label class="filter-label">Price Range</label>
          <select v-model="localPriceRange" class="filter-select" @change="emitFilters">
            <option value="">All</option>
            <option value="under-50k">Under ₦50,000</option>
            <option value="50k-100k">₦50,000 – ₦100,000</option>
            <option value="100k-200k">₦100,000 – ₦200,000</option>
            <option value="above-200k">Above ₦200,000</option>
          </select>
        </div>

        <!-- Sort Dropdown -->
        <div class="filter-group">
          <label class="filter-label">Sort By</label>
          <select v-model="localSort" class="filter-select" @change="emitFilters">
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A–Z</option>
            <option value="name-desc">Name: Z–A</option>
          </select>
        </div>
      </div>

      <!-- Product Count & Clear Filters -->
      <div class="filter-footer">
        <p class="product-count">
          Showing {{ filteredCount }} of {{ totalCount }} fragrances
        </p>
        <button v-if="hasActiveFilters" class="clear-filters-btn" @click="handleClearFilters">
          ✕ Clear Filters
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Props
const props = defineProps<{
  filteredCount: number
  totalCount: number
}>()

// Emits
const emit = defineEmits<{
  'update:filters': [value: { search: string; scentFamily: string; priceRange: string; sort: string }]
}>()

// Local state for form controls
const localSearchQuery = ref('')
const localScentFamily = ref('')
const localPriceRange = ref('')
const localSort = ref('price-asc')

// Debounce timer
let searchDebounceTimer: ReturnType<typeof setTimeout> | null = null

// Computed
const hasActiveFilters = computed(() => {
  return (
    localSearchQuery.value !== '' ||
    localScentFamily.value !== '' ||
    localPriceRange.value !== '' ||
    localSort.value !== 'price-asc'
  )
})

// Emit filters to parent
const emitFilters = () => {
  emit('update:filters', {
    search: localSearchQuery.value,
    scentFamily: localScentFamily.value,
    priceRange: localPriceRange.value,
    sort: localSort.value,
  })
}

// Handlers
const handleSearchInput = () => {
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer)
  }

  searchDebounceTimer = setTimeout(() => {
    emitFilters()
  }, 300)
}

const handleClearFilters = () => {
  localSearchQuery.value = ''
  localScentFamily.value = ''
  localPriceRange.value = ''
  localSort.value = 'price-asc'
  emitFilters()
}
</script>

<style scoped>
.product-filters {
  max-width: 1200px;
  margin: 0 auto 40px;
  padding: 0 20px;
}

.filters-container {
  background: #f8f8f8;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Search Input */
.search-wrapper {
  width: 100%;
}

.search-input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 14px;
  color: #999;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 12px 14px 12px 44px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  background: #fff;
  transition: border-color 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #333;
}

.search-input::placeholder {
  color: #aaa;
}

/* Filter Row */
.filter-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-label {
  font-size: 13px;
  font-weight: 600;
  color: #666;
  letter-spacing: 0.3px;
}

.filter-select {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background: #fff;
  cursor: pointer;
  transition: border-color 0.2s;
}

.filter-select:focus {
  outline: none;
  border-color: #333;
}

/* Footer */
.filter-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  border-top: 1px solid #e5e5e5;
}

.product-count {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.clear-filters-btn {
  padding: 8px 16px;
  background: transparent;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s,
    border-color 0.2s;
}

.clear-filters-btn:hover {
  background: #333;
  color: #fff;
  border-color: #333;
}

/* Responsive */
@media (max-width: 900px) {
  .filter-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .filters-container {
    padding: 20px 16px;
    gap: 16px;
  }

  .filter-row {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .filter-footer {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .clear-filters-btn {
    width: 100%;
  }
}
</style>
