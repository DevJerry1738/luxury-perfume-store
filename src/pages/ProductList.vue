<template>
  <div class="layout">
    <FilterSidebar />
    <main class="main-content">
      <header class="header">
        <h1 class="title">Catalogue</h1>
        <SortDropdown />
      </header>

      <div v-if="store.filteredAndSortedProducts.length === 0" class="empty">
        <p>No perfumes match your filters.</p>
      </div>

      <div v-else class="grid">
        <ProductCard v-for="p in store.filteredAndSortedProducts" :key="p.id" :perfume="p" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue'
import FilterSidebar from '@/components/FilterSidebar.vue'
import SortDropdown from '@/components/SortDropdown.vue'
import { useProductStore } from '@/stores/productStore'

const store = useProductStore()
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
</style>
