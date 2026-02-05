<template>
  <section class="scent-selector" aria-label="Scent families">
    <div class="container">
      <div class="heading">Explore by Scent</div>
      <div class="list" role="list">
        <button
          v-for="family in families"
          :key="family"
          :class="['pill', { active: isActive(family) }]"
          @click="toggle(family)"
        >
          {{ family }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProductStore } from '@/stores/productStore'

const store = useProductStore()

const families = computed(() => store.availableScentFamilies)

function toggle(family: any) {
  store.toggleScentFamily(family)
}

function isActive(family: any) {
  return store.selectedScentFamilies.includes(family as any)
}
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
  cursor: pointer;
  transition:
    transform 160ms ease,
    background 160ms ease;
}
.pill:hover {
  transform: translateY(-4px);
}
.pill.active {
  background: #d4af37;
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 6px 18px rgba(212, 175, 55, 0.16);
}

@media (max-width: 640px) {
  .list {
    gap: 8px;
  }
}
</style>
