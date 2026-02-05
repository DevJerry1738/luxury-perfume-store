<template>
  <button
    @click.prevent="handleToggle"
    class="wishlist-btn"
    :class="{ active: isWishlisted }"
    :aria-label="ariaLabel"
  >
    <svg
      class="heart-icon"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWishlistStore } from '@/stores/wishlistStore'

const props = defineProps<{
  productId: string
}>()

const wishlistStore = useWishlistStore()

const isWishlisted = computed(() => wishlistStore.isInWishlist(props.productId))

const ariaLabel = computed(() => (isWishlisted.value ? 'Remove from wishlist' : 'Add to wishlist'))

function handleToggle() {
  wishlistStore.toggleWishlist(props.productId)
}
</script>

<style scoped>
.wishlist-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid #d4af37;
  background: transparent;
  color: #d4af37;
  border-radius: 50%;
  cursor: pointer;
  transition:
    background-color 0.2s,
    color 0.2s,
    border-color 0.2s;
  font-size: 20px;
}

.wishlist-btn:hover:not(.active) {
  background-color: rgba(212, 175, 55, 0.08);
}

.wishlist-btn.active {
  background-color: #d4af37;
  color: #ffffff;
  border-color: #d4af37;
}

.heart-icon {
  width: 20px;
  height: 20px;
}
</style>
