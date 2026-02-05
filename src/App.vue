<template>
  <div id="app">
    <Navbar />
    <main class="app-main">
      <router-view />
    </main>

    <CartDrawer />
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import CartDrawer from '@/components/CartDrawer.vue'
import { useCartStore } from '@/stores/cartStore'
import { useWishlistStore } from '@/stores/wishlistStore'
import Navbar from './components/Navbar.vue'

const route = useRoute()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

// Prevent body scroll when cart drawer is open
watch(
  () => cartStore.isOpen,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  },
)

// Close cart drawer on route change
watch(
  () => route.path,
  () => {
    cartStore.closeCart()
  },
)
</script>

<style>
/* Minimal layout styles */
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background: #ffffff;
  color: #333333;
  border-bottom: 1px solid #e0e0e0;
}
.brand {
  font-weight: 700;
}
.app-main {
  min-height: calc(100vh - 60px);
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}
.wishlist-link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background: #f5f5f5;
  color: #d4af37;
  text-decoration: none;
  transition: background 0.2s ease;
}
.wishlist-link:hover {
  background: #e8e8e8;
}
.heart-icon {
  font-size: 16px;
}
.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #d4af37;
  color: #ffffff;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 600;
}
</style>
