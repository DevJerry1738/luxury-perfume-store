<template>
  <aside class="filter-sidebar">
    <h2 class="sidebar-title">Filters</h2>

    <!-- Brand Filter -->
    <fieldset class="filter-group">
      <legend class="filter-label">Brand</legend>
      <div class="options">
        <label v-for="brand in store.availableBrands" :key="brand" class="checkbox">
          <input
            type="checkbox"
            :checked="store.selectedBrands.includes(brand)"
            @change="store.toggleBrand(brand)"
          />
          <span>{{ brand }}</span>
        </label>
      </div>
    </fieldset>

    <!-- Scent Family Filter -->
    <fieldset class="filter-group">
      <legend class="filter-label">Scent Family</legend>
      <div class="options">
        <label v-for="family in store.availableScentFamilies" :key="family" class="checkbox">
          <input
            type="checkbox"
            :checked="store.selectedScentFamilies.includes(family)"
            @change="store.toggleScentFamily(family)"
          />
          <span>{{ family }}</span>
        </label>
      </div>
    </fieldset>

    <!-- Gender Filter -->
    <fieldset class="filter-group">
      <legend class="filter-label">Gender</legend>
      <select :value="store.selectedGender || ''" @change="updateGender" class="select">
        <option value="">All</option>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Unisex">Unisex</option>
      </select>
    </fieldset>

    <!-- Reset Button -->
    <button @click="store.resetFilters" :disabled="!hasActiveFilters" class="reset-btn">
      Reset Filters
    </button>
  </aside>
</template>

<script setup lang="ts">
import { useProductStore } from '@/stores/productStore'
import type { Gender } from '@/types/perfume'
import { computed } from 'vue'

const store = useProductStore()

const updateGender = (e: Event) => {
  const target = e.target as HTMLSelectElement
  const value = target.value as Gender | ''
  store.setGender(value === '' ? null : value)
}

const hasActiveFilters = computed(
  () =>
    store.selectedBrands.length ||
    store.selectedScentFamilies.length ||
    store.selectedGender !== null,
)
</script>

<style scoped>
.filter-sidebar {
  padding: 20px;
  background: #f5f5f5;
  border-right: 1px solid #e0e0e0;
  max-width: 220px;
  min-height: 100vh;
  color: #333333;
}

.sidebar-title {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 700;
}

.filter-group {
  margin-bottom: 24px;
  border: none;
  padding: 0;
}

.filter-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: #999999;
  margin-bottom: 10px;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  cursor: pointer;
  user-select: none;
}

.checkbox input[type='checkbox'] {
  accent-color: #d4af37;
  cursor: pointer;
}

.checkbox input[type='checkbox']:checked + span {
  color: #d4af37;
  font-weight: 500;
}

.select {
  width: 100%;
  padding: 8px 10px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  color: #333333;
  font-size: 13px;
  cursor: pointer;
}

.select:focus {
  outline: none;
  border-color: #d4af37;
}

.reset-btn {
  width: 100%;
  padding: 10px;
  background: #e0e0e0;
  border: none;
  border-radius: 4px;
  color: #333333;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.reset-btn:hover:not(:disabled) {
  background: #d0d0d0;
}

.reset-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
