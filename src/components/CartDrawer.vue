<template>
  <div>
    <div v-if="store.isOpen" class="overlay" @click="store.closeCart"></div>

    <aside :class="['drawer', { open: store.isOpen }]" role="dialog" aria-label="Shopping cart">
      <header class="drawer-header">
        <h2>Cart</h2>
        <button @click="store.closeCart" class="close">✕</button>
      </header>

      <div class="drawer-body">
        <div v-if="store.items.length === 0" class="empty">Your cart is empty.</div>

        <div v-else class="items">
          <CartItemRow
            v-for="item in store.items"
            :key="item.productId + '-' + item.size"
            :item="item"
          />
        </div>
      </div>

      <footer class="drawer-footer">
        <div class="subtotal">
          <span>Subtotal</span>
          <strong>₦{{ formatPrice(store.subtotal) }}</strong>
        </div>
        <router-link v-if="store.items.length > 0" to="/checkout" class="checkout-btn">
          Proceed to Checkout
        </router-link>
      </footer>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import CartItemRow from './CartItemRow.vue'
import { formatPrice } from '@/utils/formatPrice'

const store = useCartStore()
const router = useRouter()

// Lock body scroll when cart drawer is open
watch(
  () => store.isOpen,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  },
)

// Close cart drawer when route changes
router.beforeEach(() => {
  store.closeCart()
  return true
})
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(51, 51, 51, 0.4);
  z-index: 40;
}

.drawer {
  position: fixed;
  top: 0;
  right: -420px;
  width: 420px;
  height: 100vh;
  background: #ffffff;
  color: #333333;
  z-index: 50;
  display: flex;
  flex-direction: column;
  transition: right 0.28s ease;
  box-shadow: -8px 0 24px rgba(51, 51, 51, 0.12);
}

.drawer.open {
  right: 0;
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
}
.close {
  background: transparent;
  border: none;
  color: #333333;
  font-size: 18px;
  cursor: pointer;
}
.drawer-body {
  padding: 16px;
  flex: 1;
  overflow: auto;
}
.empty {
  color: #999999;
  padding: 24px;
  text-align: center;
}
.drawer-footer {
  padding: 16px;
  border-top: 1px solid #e0e0e0;
}
.subtotal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  margin-bottom: 16px;
}
.checkout-btn {
  display: block;
  width: 100%;
  padding: 12px;
  background: #d4af37;
  color: #ffffff;
  text-align: center;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease;
}
.checkout-btn:hover {
  background: #e6c200;
}
</style>
