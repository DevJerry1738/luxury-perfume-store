<template>
  <div class="sort-wrapper">
    <label for="sort-select" class="sort-label">Sort by:</label>
    <select id="sort-select" :value="sortBy" @change="updateSort" class="sort-select">
      <option v-for="option in SORT_OPTIONS" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps<{
  sortBy: 'price-asc' | 'price-desc' | 'best-seller' | 'new-arrival'
}>()

// Emits
const emit = defineEmits<{
  'update:sort-by': [value: 'price-asc' | 'price-desc' | 'best-seller' | 'new-arrival']
}>()

const SORT_OPTIONS = [
  { value: 'price-asc' as const, label: 'Price: Low → High' },
  { value: 'price-desc' as const, label: 'Price: High → Low' },
  { value: 'best-seller' as const, label: 'Best Sellers' },
  { value: 'new-arrival' as const, label: 'New Arrivals' },
]

const updateSort = (e: Event) => {
  const target = e.target as HTMLSelectElement
  emit('update:sort-by', target.value as typeof props.sortBy)
}
</script>

<style scoped>
.sort-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%; /* Allow wrapper to take full width */
}

.sort-label {
  font-size: 13px;
  font-weight: 600;
  color: #999999;
  white-space: nowrap;
}

.sort-select {
  flex: 1; /* Allow select to grow */
  padding: 8px 12px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  color: #333333;
  font-size: 13px;
  cursor: pointer;
  min-width: 150px;
  width: 100%;
}

.sort-select:focus {
  outline: none;
  border-color: #d4af37;
}
</style>
