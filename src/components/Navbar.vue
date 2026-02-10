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

  background: white;
  opacity: 0.95;
  border-bottom: 1px solid var(--border-subtle);
}

.brand {
  text-decoration: none;
  color: var(--text-primary);
}

.brand-text {
  font-size: 20px; /* Slightly larger for a more premium feel */
  font-weight: 700;
  letter-spacing: 0.6px; /* Increased spacing for elegance */
  text-transform: uppercase; /* All caps for modern minimalism */
  font-family: 'Futura', 'Roboto Condensed', sans-serif; /* Align with recommended typography */
}

.brand-subtext {
  font-weight: 400; /* Lighter weight for 'Scents' to create subtle contrast */
}

.actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.icon-btn {
  position: relative;
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: transparent;
  border: 1px solid var(--border-subtle);
  border-radius: 999px;

  color: var(--text-primary);
  cursor: pointer;

  transition:
    background 0.2s ease,
    transform 0.15s ease;
}

.icon-btn:hover {
  background: var(--bg-primary);
  transform: translateY(-1px);
}

.icon-btn svg {
  width: 20px;
  height: 20px;
}

.badge {
  position: absolute;
  top: -6px;
  right: -6px;

  min-width: 18px;
  height: 18px;

  padding: 0 4px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--accent);
  color: #fff;

  font-size: 11px;
  font-weight: 600;
  border-radius: 999px;
}
</style>
