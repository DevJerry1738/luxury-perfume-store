<template>
  <button class="cart-btn" @click="store.toggleCart">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 3h2l.4 2M7 13h10l4-8H5.4"
        stroke="#333333"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx="10" cy="20" r="1" fill="#333333" />
      <circle cx="18" cy="20" r="1" fill="#333333" />
    </svg>
    <span v-if="store.itemCount > 0" class="badge">{{ store.itemCount }}</span>
  </button>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
const store = useCartStore()
</script>

<style scoped>
.cart-btn {
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px;
}
.badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #d4af37;
  color: #ffffff;
  font-weight: 700;
  border-radius: 999px;
  padding: 2px 6px;
  font-size: 11px;
}
</style>
