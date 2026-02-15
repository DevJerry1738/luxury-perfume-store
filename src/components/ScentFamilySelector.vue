<template>
  <section class="scent-selector" aria-label="Scent families">
    <div class="container">
      <div class="heading">Explore by Scent</div>
      <div class="list" role="list">
        <button
          v-for="family in families"
          :key="family"
          class="pill"
          :style="getFamilyStyle(family)"
          @click="selectFamily(family)"
        >
          {{ family }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/productStore'

const store = useProductStore()
const router = useRouter()

const families = computed(() => store.availableScentFamilies)

// Luxury pastel color palette
const FAMILY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Floral: { bg: '#FFF0F5', text: '#C71585', border: '#FFB6C1' },
  Woody: { bg: '#F8F4EB', text: '#795548', border: '#D7CCC8' },
  Fresh: { bg: '#F0F8FF', text: '#4682B4', border: '#B0E0E6' },
  Oriental: { bg: '#FFF8DC', text: '#9B8045', border: '#DEB887' },
  Citrus: { bg: '#FFFFF0', text: '#B8860B', border: '#F0E68C' },
  Gourmand: { bg: '#FFF5E6', text: '#8D6E63', border: '#FFCCBC' },
}

const getFamilyStyle = (family: string) => {
  const theme = FAMILY_COLORS[family] || { bg: '#F5F5F5', text: '#666666', border: '#E0E0E0' }
  return {
    backgroundColor: theme.bg,
    color: theme.text,
    borderColor: theme.border,
    '--hover-border': theme.text, // CSS var for hover state
  }
}

const selectFamily = (family: string) => {
  router.push({ path: '/products', query: { family } })
}
</script>

<style scoped>
.scent-selector {
  padding: 40px 0;
  background: transparent;
}
.scent-selector .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
}
.heading {
  font-size: 14px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 24px;
  font-weight: 600;
}
.list {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}
.pill {
  font-size: 15px;
  font-weight: 500;
  padding: 12px 24px;
  border-radius: 999px;
  border-width: 1px;
  border-style: solid;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.pill:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  border-color: var(--hover-border) !important;
}

.pill:active {
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .list {
    gap: 10px;
  }
  .pill {
    padding: 10px 18px;
    font-size: 14px;
  }
}
</style>
