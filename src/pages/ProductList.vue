<template>
  <div class="layout">
    <FilterSidebar />
    <main class="main-content">
      <header class="header">
        <h1 class="title">Catalogue</h1>
        <SortDropdown />
      </header>

      <!-- Loading state -->
      <div v-if="store.loading" class="loading">
        <p>Loading perfumes...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="store.error" class="error">
        <p>⚠️ Could not load perfumes from server</p>
        <p class="error-message">{{ store.error }}</p>
        <p class="fallback-notice">Using local data as fallback</p>
      </div>

      <!-- Empty state -->
      <div v-else-if="store.filteredAndSortedProducts.length === 0" class="empty">
        <p>No perfumes match your filters.</p>
      </div>

      <!-- Products grid -->
      <div v-else class="grid">
        <ProductCard v-for="p in store.filteredAndSortedProducts" :key="p.id" :perfume="p" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import FilterSidebar from '@/components/FilterSidebar.vue'
import SortDropdown from '@/components/SortDropdown.vue'
import { useProductStore } from '@/stores/productStore'

const store = useProductStore()

// Initialize products from local data with simulated loading
// TODO: Replace with store.fetchProducts() when API is ready
onMounted(() => {
  store.initializeProducts()
})
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

.loading {
  padding: 60px 28px;
  text-align: center;
  color: #666666;
  font-size: 16px;
}

.error {
  padding: 40px 28px;
  background: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 4px;
  margin-bottom: 28px;
}

.error p {
  margin: 8px 0;
  color: #856404;
}

.error-message {
  font-size: 14px;
  color: #999999;
}

.fallback-notice {
  font-size: 13px;
  margin-top: 8px;
  color: #666666;
}
</style>
