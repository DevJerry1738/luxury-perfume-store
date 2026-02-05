<template>
  <article class="product-card">
    <router-link :to="{ name: 'product-detail', params: { id: perfume.id } }" class="link">
      <div class="media">
        <img :src="perfume.image" :alt="perfume.name" />
        <div class="badges" aria-hidden>
          <span v-if="perfume.isBestSeller" class="badge bestseller">Bestseller</span>
          <span v-if="perfume.isNewArrival" class="badge new">New</span>
        </div>
      </div>

      <header class="meta">
        <p class="brand">{{ perfume.brand }}</p>
        <h3 class="name">{{ perfume.name }}</h3>
        <p class="price">From {{ formattedPrice }}</p>
      </header>
    </router-link>
    <div class="wishlist-overlay">
      <WishlistButton :product-id="perfume.id" />
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import WishlistButton from './WishlistButton.vue'
import type { Perfume } from '@/types/perfume'

const props = defineProps<{ perfume: Perfume }>()

const lowestPrice = computed(() => {
  const prices = props.perfume.sizes.map((s) => s.price)
  return Math.min(...prices)
})

const formattedPrice = computed(() =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(lowestPrice.value),
)
</script>

<style scoped>
.link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.product-card {
  background: #f5f5f5;
  color: #333333;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 6px 18px rgba(51, 51, 51, 0.08);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  position: relative;
}

.link {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.link:hover .product-card {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(51, 51, 51, 0.12);
}

.media {
  position: relative;
  height: 220px;
  background: linear-gradient(180deg, #ffffff 0%, #f5f5f5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.badges {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  gap: 8px;
}

.badge {
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.2px;
}

.bestseller {
  background: #d4a574;
  color: #fff;
}
.new {
  background: #4b5563;
  color: #fff;
}

.meta {
  padding: 14px;
}
.brand {
  margin: 0;
  font-size: 12px;
  color: #999999;
}
.name {
  margin: 6px 0;
  font-size: 16px;
  line-height: 1.1;
}
.price {
  margin: 0;
  font-weight: 700;
  color: #333333;
}

.wishlist-overlay {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
