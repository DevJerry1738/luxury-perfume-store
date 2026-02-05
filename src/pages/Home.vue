<template>
  <div class="home-page">
    <HeroSection />

    <ScentFamilySelector />

    <BestSellersCarousel />

    <section class="about container">
      <div class="about-inner">
        <h2 class="about-title">A Quiet Confidence</h2>
        <p class="about-text">
          We craft distinctive fragrances that linger like a signature. Each composition is built
          with care, sourced ingredients, and an editorial eye for balance.
        </p>
      </div>
    </section>

    <section id="catalog" class="catalog container">
      <header class="catalog-header">
        <h2>Collection</h2>
        <p class="muted">Curated selection of our current collection.</p>
      </header>

      <transition name="fade" mode="out-in">
        <SkeletonGrid v-if="isLoading" :count="8" key="skeleton" />
        <div v-else key="products" class="grid">
          <ProductCard v-for="p in products" :key="p.id" :perfume="p" />
        </div>
      </transition>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import ScentFamilySelector from '@/components/ScentFamilySelector.vue'
import BestSellersCarousel from '@/components/BestSellersCarousel.vue'
import SkeletonGrid from '@/components/SkeletonGrid.vue'
import ProductCard from '@/components/ProductCard.vue'
import { useProductStore } from '@/stores/productStore'

const store = useProductStore()
const isLoading = ref(true)

const products = store.filteredAndSortedProducts

onMounted(() => {
  // minimal skeleton flash to show loading UI, replace with real image-load hooks if needed
  setTimeout(() => {
    isLoading.value = false
  }, 350)
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.about {
  padding: 48px 0;
}
.about-inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  text-align: center;
}
.about-title {
  font-size: clamp(20px, 3.2vw, 28px);
  margin: 0 0 8px;
}
.about-text {
  color: #666666;
  max-width: 900px;
  margin: 0 auto;
}

.catalog {
  padding: 40px 0 80px;
}
.catalog-header {
  text-align: center;
  margin-bottom: 24px;
}
.catalog-header h2 {
  margin: 0;
  font-size: 20px;
}
.muted {
  color: #999999;
  margin-top: 6px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 18px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 240ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .grid {
    gap: 12px;
  }
  .about {
    padding: 28px 0;
  }
}
</style>
