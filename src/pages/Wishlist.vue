<template>
  <div class="wishlist-page">
    <header class="header">
      <router-link to="/products" class="back-link">← Back to Catalogue</router-link>
      <h1 class="title">My Wishlist</h1>
    </header>

    <EmptyState
      v-if="wishlistStore.wishlistIds.length === 0"
      title="Your Wishlist is Empty"
      message="Start adding your favorite perfumes to your wishlist!"
    />

    <div v-else class="grid">
      <ProductCard v-for="product in wishlistedProducts" :key="product.id" :perfume="product" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWishlistStore } from '@/stores/wishlistStore'
import { useProductStore } from '@/stores/productStore'
import ProductCard from '@/components/ProductCard.vue'
import EmptyState from '@/components/EmptyState.vue'

const wishlistStore = useWishlistStore()
const productStore = useProductStore()

const wishlistedProducts = computed(() => {
  return productStore.products.filter((product) => wishlistStore.wishlistIds.includes(product.id))
})
</script>

<style scoped>
.wishlist-page {
  background: #ffffff;
  color: #333333;
  min-height: 100vh;
  padding: 28px;
}

.header {
  margin-bottom: 36px;
}

.back-link {
  display: inline-block;
  margin-bottom: 16px;
  color: #d4af37;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  transition: color 0.2s;
}

.back-link:hover {
  color: #e6c200;
}

.title {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
  }

  .title {
    font-size: 20px;
  }

  .wishlist-page {
    padding: 16px;
  }
}
</style>
