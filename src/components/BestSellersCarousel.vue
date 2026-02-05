<template>
  <section class="bestsellers" aria-label="Best sellers">
    <div class="container">
      <div class="heading">Best Sellers</div>
      <div class="track" ref="track" tabindex="0">
        <ProductCard v-for="p in items" :key="p.id" :perfume="p" class="card-item" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import { useProductStore } from '@/stores/productStore'

const store = useProductStore()

const items = computed(() => {
  const sellers = store.products.filter((p: any) => p.isBestSeller)
  if (sellers.length > 0) return sellers.slice(0, 6)
  // fallback: top items from filtered list
  return store.filteredAndSortedProducts.slice(0, 6)
})

const track = ref<HTMLElement | null>(null)

// Allow keyboard arrow scrolling
function onKey(e: KeyboardEvent) {
  if (!track.value) return
  if (e.key === 'ArrowRight') track.value.scrollBy({ left: 260, behavior: 'smooth' })
  if (e.key === 'ArrowLeft') track.value.scrollBy({ left: -260, behavior: 'smooth' })
}
</script>

<style scoped>
.bestsellers {
  padding: 28px 0;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.heading {
  font-size: 13px;
  letter-spacing: 1px;
  color: #999999;
  margin-bottom: 12px;
  font-weight: 600;
}
.track {
  display: flex;
  gap: 18px;
  overflow-x: auto;
  padding-bottom: 8px;
  scroll-snap-type: x proximity;
  -webkit-overflow-scrolling: touch;
}
.card-item {
  flex: 0 0 220px;
  scroll-snap-align: start;
  transition:
    transform 200ms ease,
    box-shadow 200ms ease;
}
.card-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(51, 51, 51, 0.1);
}

/* hide scrollbar lightly */
.track::-webkit-scrollbar {
  height: 8px;
}
.track::-webkit-scrollbar-thumb {
  background: rgba(200, 200, 200, 0.08);
  border-radius: 999px;
}

@media (min-width: 900px) {
  .card-item {
    flex-basis: 240px;
  }
}
</style>
