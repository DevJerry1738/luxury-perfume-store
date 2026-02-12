<template>
  <section class="scent-selector" aria-label="Scent families">
    <div class="container">
      <div class="heading">Explore by Scent</div>
      <div class="list" role="list">
        <button
          v-for="family in families"
          :key="family"
          class="pill"
          disabled
        >
          {{ family }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProductStore } from '../stores/productStore'

const store = useProductStore()

const families = computed(() => store.availableScentFamilies)
</script>

<style scoped>
.scent-selector {
  padding: 28px 0;
  background: transparent;
}
.scent-selector .container {
  max-width: 1100px;
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
.list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.pill {
  background: #f5f5f5;
  color: #666666;
  border: 1px solid #e0e0e0;
  padding: 8px 14px;
  border-radius: 999px;
  cursor: default;
  transition:
    transform 160ms ease,
    background 160ms ease;
}

@media (max-width: 640px) {
  .list {
    gap: 8px;
  }
}
</style>
