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
import { useCartStore } from '../stores/cartStore'
import CartItemRow from './CartItemRow.vue'
import { formatPrice } from '../utils/formatPrice'

const store = useCartStore()
const router = useRouter()

// Lock body scroll when cart drawer is open
watch(
  () => store.isOpen,
  (isOpen) => {
    document.documentElement.style.overflow = isOpen ? 'hidden' : ''
    document.body.style.overflow = isOpen ? 'hidden' : ''
    document.body.style.touchAction = isOpen ? 'none' : ''
  },
)


// Close cart drawer when route changes
router.beforeEach(() => {
  store.closeCart()
  return true
})
</script>

<style scoped>
/* ================= OVERLAY ================= */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(20, 20, 20, 0.45);
  backdrop-filter: blur(2px);
  z-index: 40;
  touch-action: none;
}

/* ================= BASE DRAWER ================= */
.drawer {
  position: fixed;
  background: #ffffff;
  color: #333333;
  z-index: 50;
  display: flex;
  flex-direction: column;
  box-shadow: -8px 0 24px rgba(51, 51, 51, 0.12);
  transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
}

/* ================= DESKTOP (SIDEBAR) ================= */
@media (min-width: 769px) {
  .drawer {
    top: 0;
    right: 0;
    width: 420px;
    height: 100vh;
    transform: translateX(100%);
  }

  .drawer.open {
    transform: translateX(0);
  }
}

/* ================= MOBILE (BOTTOM SHEET) ================= */
@media (max-width: 768px) {
  .drawer {
    left: 0;
    right: 0;
    bottom: 0;
    height: 92vh;
    border-radius: 18px 18px 0 0;
    transform: translateY(100%);
    box-shadow: 0 -10px 40px rgba(0,0,0,0.18);
  }

  .drawer.open {
    transform: translateY(0);
  }
}

/* ================= HEADER ================= */
.drawer-header {
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 16px;
  border-bottom: 1px solid #ececec;
}

/* mobile grab handle */
@media (max-width: 768px) {
  .drawer-header::before {
    content: "";
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 44px;
    height: 4px;
    border-radius: 999px;
    background: #d9d9d9;
  }
}

.close {
  background: #f5f5f5;
  border: none;
  color: #333;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  font-size: 18px;
  cursor: pointer;
}

/* ================= BODY ================= */
.drawer-body {
  padding: 14px 16px;
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.items {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.empty {
  color: #999999;
  padding: 48px 12px;
  text-align: center;
  font-size: 15px;
}

/* ================= FOOTER ================= */
.drawer-footer {
  position: sticky;
  bottom: 0;
  background: #fff;
  padding: 16px;
  border-top: 1px solid #ececec;
  padding-bottom: calc(16px + env(safe-area-inset-bottom));
}

.subtotal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 17px;
  margin-bottom: 14px;
}

.subtotal strong {
  font-size: 18px;
}

/* ================= CHECKOUT BUTTON ================= */
.checkout-btn {
  display: block;
  width: 100%;
  padding: 16px;
  background: #d4af37;
  color: #ffffff;
  text-align: center;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.2s ease;
  touch-action: manipulation;
}

.checkout-btn:hover {
  background: #e6c200;
  transform: translateY(-1px);
}

.checkout-btn:active {
  transform: scale(0.98);
}

</style>
