<template>
  <div class="detail-page">
    <!-- Back Link -->
    <router-link to="/products" class="back-link">← Back to Catalogue</router-link>

    <!-- Product Not Found State -->
    <div v-if="!product" class="not-found">
      <h1>Product Not Found</h1>
      <p>Sorry, we couldn't find the perfume you're looking for.</p>
      <router-link to="/products" class="cta-btn">Browse All Products</router-link>
    </div>

    <!-- Product Detail -->
    <section v-else class="detail-content">
      <div class="image-section">
        <img :src="product.image" :alt="product.name" class="product-image" />
      </div>

      <div class="info-section">
        <!-- Header with Wishlist Button -->
        <div class="header">
          <div class="header-top">
            <div>
              <p class="brand">{{ product.brand }}</p>
              <h1 class="name">{{ product.name }}</h1>
            </div>
            <WishlistButton :product-id="product.id" />
          </div>
          <p class="description">{{ product.description }}</p>
        </div>

        <!-- Product Details Grid -->
        <div class="details-grid">
          <div class="detail-item">
            <h3 class="detail-label">Scent Family</h3>
            <p class="detail-value">{{ product.scentFamily }}</p>
          </div>
          <div class="detail-item">
            <h3 class="detail-label">For</h3>
            <p class="detail-value">{{ product.gender }}</p>
          </div>
          <div class="detail-item">
            <h3 class="detail-label">Stock</h3>
            <p :class="['detail-value', { 'out-of-stock': !product.inStock }]">
              {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
            </p>
          </div>
        </div>

        <!-- Scent Notes -->
        <div class="notes-section">
          <h3 class="section-title">Scent Notes</h3>
          <div class="notes-grid">
            <div class="note-group">
              <h4 class="note-label">Top</h4>
              <p class="note-content">{{ product.notes.top.join(', ') }}</p>
            </div>
            <div class="note-group">
              <h4 class="note-label">Middle</h4>
              <p class="note-content">{{ product.notes.middle.join(', ') }}</p>
            </div>
            <div class="note-group">
              <h4 class="note-label">Base</h4>
              <p class="note-content">{{ product.notes.base.join(', ') }}</p>
            </div>
          </div>
        </div>

        <!-- Size Selection -->
        <SizeSelector
          v-model="selectedSize"
          :sizes="product.sizes"
          :is-out-of-stock="!product.inStock"
        />

        <!-- CTA -->
        <button
          @click="addToCart"
          :disabled="!product.inStock || !selectedSize"
          class="add-to-cart-btn"
        >
          {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SizeSelector from '@/components/SizeSelector.vue'
import WishlistButton from '@/components/WishlistButton.vue'
import { perfumes } from '@/data/perfumes'
import type { PerfumeSize } from '@/types/perfume'
import { useCartStore } from '@/stores/cartStore'

const route = useRoute()

// Get product ID from route params
const productId = computed(() => route.params.id as string)

// Always lookup from the full product source so filters don't affect detail pages
const product = computed(() => perfumes.find((p) => p.id === productId.value))

// Track selected size (controlled via v-model). Default to first size when product loads.
const selectedSize = ref<PerfumeSize | null>(null)

// When the route changes, scroll to top and set a safe default size (if available).
watch(
  productId,
  () => {
    // UX: scroll to top when opening a product
    if (typeof window !== 'undefined') {
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } catch {
        window.scrollTo(0, 0)
      }
    }

    if (product.value && Array.isArray(product.value.sizes) && product.value.sizes.length > 0) {
      selectedSize.value = product.value.sizes[0] ?? null
    } else {
      selectedSize.value = null
    }
  },
  { immediate: true },
)

// Cart integration
const cart = useCartStore()

const addToCart = () => {
  if (!product.value || !selectedSize.value) return

  cart.addToCart({
    productId: product.value.id,
    name: product.value.name,
    brand: product.value.brand,
    image: product.value.image,
    size: selectedSize.value.size,
    price: selectedSize.value.price,
    quantity: 1,
  })
}
</script>

<style scoped>
.detail-page {
  padding: 20px 28px;
  background: #ffffff;
  color: #333333;
  min-height: 100vh;
}

.back-link {
  display: inline-block;
  margin-bottom: 28px;
  color: #d4af37;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  transition: color 0.2s;
}

.back-link:hover {
  color: #e6c200;
}

.not-found {
  text-align: center;
  padding: 60px 28px;
}

.not-found h1 {
  margin: 0 0 12px 0;
  font-size: 24px;
}

.not-found p {
  margin: 0 0 24px 0;
  color: #999999;
}

.detail-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  max-width: 1000px;
}

.image-section {
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image {
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0 6px 24px rgba(51, 51, 51, 0.12);
}

.info-section {
  padding: 20px 0;
}

.header {
  margin-bottom: 36px;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.brand {
  margin: 0 0 8px 0;
  font-size: 12px;
  color: #999999;
  text-transform: uppercase;
  letter-spacing: 0.2px;
}

.name {
  margin: 0 0 12px 0;
  font-size: 32px;
  line-height: 1.2;
}

.description {
  margin: 0;
  font-size: 14px;
  color: #666666;
  line-height: 1.6;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 36px;
  padding-bottom: 36px;
  border-bottom: 1px solid #e0e0e0;
}

.detail-item {
  flex: 1;
}

.detail-label {
  margin: 0 0 6px 0;
  font-size: 11px;
  font-weight: 600;
  color: #999999;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.detail-value {
  margin: 0;
  font-size: 14px;
  color: #333333;
}

.detail-value.out-of-stock {
  color: #dc2626;
}

.notes-section {
  margin-bottom: 36px;
  padding-bottom: 36px;
  border-bottom: 1px solid #e0e0e0;
}

.section-title {
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: #999999;
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.note-group {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

.note-label {
  margin: 0 0 6px 0;
  font-size: 11px;
  font-weight: 700;
  color: #d4af37;
  text-transform: uppercase;
}

.note-content {
  margin: 0;
  font-size: 12px;
  color: #666666;
  line-height: 1.5;
}

.add-to-cart-btn {
  width: 100%;
  padding: 14px;
  background: #d4af37;
  border: none;
  border-radius: 6px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
}

.add-to-cart-btn:hover:not(:disabled) {
  background: #e6c200;
}

.add-to-cart-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.cta-btn {
  display: inline-block;
  padding: 12px 24px;
  background: #d4af37;
  color: #ffffff;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 700;
  font-size: 14px;
  transition: background 0.2s;
}

.cta-btn:hover {
  background: #e6c200;
}

@media (max-width: 768px) {
  .detail-content {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .details-grid,
  .notes-grid {
    grid-template-columns: 1fr;
  }

  .name {
    font-size: 24px;
  }
}
</style>
