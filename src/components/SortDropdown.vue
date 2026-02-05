<template>
  <div class="sort-wrapper">
    <label for="sort-select" class="sort-label">Sort by:</label>
    <select id="sort-select" :value="store.sortBy" @change="updateSort" class="sort-select">
      <option v-for="option in SORT_OPTIONS" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '@/stores/productStore'

const store = useProductStore()

const SORT_OPTIONS = [
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'best-seller', label: 'Best Sellers' },
  { value: 'new-arrival', label: 'New Arrivals' },
] as const

const updateSort = (e: Event) => {
  const target = e.target as HTMLSelectElement
  store.setSortBy(target.value as 'price-asc' | 'price-desc' | 'best-seller' | 'new-arrival')
}
</script>

<style scoped>
.sort-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sort-label {
  font-size: 13px;
  font-weight: 600;
  color: #999999;
  white-space: nowrap;
}

.sort-select {
  padding: 8px 12px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  color: #333333;
  font-size: 13px;
  cursor: pointer;
  min-width: 150px;
}

.sort-select:focus {
  outline: none;
  border-color: #d4af37;
}
</style>
