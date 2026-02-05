<template>
  <div class="skeleton-grid">
    <SkeletonCard v-for="n in count" :key="n" />
  </div>
</template>

<script setup lang="ts">
import SkeletonCard from './SkeletonCard.vue'

const props = defineProps<{ count?: number }>()
const count = props.count ?? 8
</script>

<style scoped>
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 18px;
}

@media (max-width: 640px) {
  .skeleton-grid {
    gap: 12px;
  }
}
</style>
