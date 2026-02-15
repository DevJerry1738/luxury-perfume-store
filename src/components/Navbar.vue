<template>
  <nav class="navbar">
    <!-- Brand -->
    <router-link to="/" class="brand">
      <span class="brand-text">Elysian <span class="brand-subtext">Scents</span></span>
    </router-link>

    <!-- Actions -->
    <div class="actions">
      <!-- Wishlist -->
      <router-link to="/wishlist" class="icon-btn" aria-label="Wishlist">
        <Heart />
        <span v-if="wishlistStore.count > 0" class="badge">
          {{ wishlistStore.count }}
        </span>
      </router-link>

      <!-- Cart -->
      <button class="icon-btn" aria-label="Cart" @click="cartStore.toggleCart">
        <ShoppingCart />
        <span v-if="cartStore.itemCount > 0" class="badge">
          {{ cartStore.itemCount }}
        </span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Heart, ShoppingCart } from 'lucide-vue-next'
import { useCartStore } from '../stores/cartStore'
import { useWishlistStore } from '../stores/wishlistStore'

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  height: 64px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 24px;

  /* Glassmorphism */
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.brand {
  text-decoration: none;
  color: var(--text-primary);
  display: flex;
  align-items: center;
}

.brand-text {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-family: 'Futura', 'Roboto Condensed', sans-serif;
  color: var(--text-primary);
}

.brand-subtext {
  font-weight: 400;
  color: var(--text-secondary);
}

.actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-btn {
  position: relative;
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: transparent;
  border: 1px solid transparent; /* Cleaner look by default */
  border-radius: 999px;

  color: var(--text-primary);
  cursor: pointer;

  transition: all 0.2s ease;
}

.icon-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  transform: translateY(-1px);
}

.icon-btn svg {
  width: 20px;
  height: 20px;
  stroke-width: 1.5px; /* Thinner stroke for elegance */
}

.badge {
  position: absolute;
  top: -2px;
  right: -2px;

  min-width: 16px;
  height: 16px;

  padding: 0 4px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--gold-accent, #d4af37);
  color: #fff;

  font-size: 10px;
  font-weight: 600;
  border-radius: 999px;
  border: 2px solid #fff; /* White border to separate from icon */
}

/* Mobile Responsiveness */
@media (max-width: 640px) {
  .navbar {
    height: 56px;
    padding: 0 16px;
  }

  .brand-text {
    font-size: 18px;
  }

  .actions {
    gap: 8px;
  }

  .icon-btn {
    width: 36px;
    height: 36px;
  }

  .icon-btn svg {
    width: 18px;
    height: 18px;
  }
}
</style>
