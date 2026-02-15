<template>
  <aside class="filter-sidebar">
    <h2 class="sidebar-title">Filters</h2>

    <!-- Brand Filter -->
    <fieldset class="filter-group">
      <legend class="filter-label">Brand</legend>
      <div class="options">
        <label v-for="brand in availableBrands" :key="brand" class="checkbox">
          <input
            type="checkbox"
            :checked="selectedBrands.includes(brand)"
            @change="toggleBrand(brand)"
          />
          <span>{{ brand }}</span>
        </label>
      </div>
    </fieldset>

    <!-- Scent Family Filter -->
    <fieldset class="filter-group">
      <legend class="filter-label">Scent Family</legend>
      <div class="options">
        <label v-for="family in availableScentFamilies" :key="family" class="checkbox">
          <input
            type="checkbox"
            :checked="selectedScentFamilies.includes(family)"
            @change="toggleScentFamily(family)"
          />
          <span>{{ family }}</span>
        </label>
      </div>
    </fieldset>

    <!-- Gender Filter -->
    <fieldset class="filter-group">
      <legend class="filter-label">Gender</legend>
      <select :value="selectedGender || ''" @change="updateGender" class="select">
        <option value="">All</option>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Unisex">Unisex</option>
      </select>
    </fieldset>

    <!-- Reset Button -->
    <button @click="handleReset" :disabled="!hasActiveFilters" class="reset-btn">
      Reset Filters
    </button>
  </aside>
</template>

<script setup lang="ts">
import { useProductStore } from '../stores/productStore'
import type { Gender, ScentFamily } from '../types/perfume'
import { computed } from 'vue'

// Props
const props = defineProps<{
  selectedBrands: string[]
  selectedScentFamilies: ScentFamily[]
  selectedGender: Gender | null
}>()

// Emits
const emit = defineEmits<{
  'update:brands': [value: string[]]
  'update:scent-families': [value: ScentFamily[]]
  'update:gender': [value: Gender | null]
  reset: []
}>()

const store = useProductStore()

// Available options from store
const availableBrands = computed(() => store.availableBrands)
const availableScentFamilies = computed(() => store.availableScentFamilies)

const updateGender = (e: Event) => {
  const target = e.target as HTMLSelectElement
  const value = target.value as Gender | ''
  emit('update:gender', value === '' ? null : (value as Gender))
}

const toggleBrand = (brand: string) => {
  const newBrands = props.selectedBrands.includes(brand)
    ? props.selectedBrands.filter((b) => b !== brand)
    : [...props.selectedBrands, brand]
  emit('update:brands', newBrands)
}

const toggleScentFamily = (family: ScentFamily) => {
  const newFamilies = props.selectedScentFamilies.includes(family)
    ? props.selectedScentFamilies.filter((f) => f !== family)
    : [...props.selectedScentFamilies, family]
  emit('update:scent-families', newFamilies)
}

const handleReset = () => {
  emit('reset')
}

const hasActiveFilters = computed(
  () =>
    props.selectedBrands.length ||
    props.selectedScentFamilies.length ||
    props.selectedGender !== null,
)
</script>

<style scoped>
.filter-sidebar {
  padding: 20px;
  background: #f5f5f5;
  /* Removed border-right as it's handled by container or not needed in drawer */
  /* border-right: 1px solid #e0e0e0; */ 
  width: 100%;
  height: 100%;
  color: #333333;
  overflow-y: auto; /* Ensure scrolling within if needed */
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
