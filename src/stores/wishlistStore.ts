import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

const WISHLIST_STORAGE_KEY = 'luxury-perfume-wishlist'

function loadWishlistFromStorage(): string[] {
  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((id): id is string => typeof id === 'string')
  } catch {
    return []
  }
}

export const useWishlistStore = defineStore('wishlist', () => {
  const wishlistIds = ref<string[]>(loadWishlistFromStorage())

  const count = computed(() => wishlistIds.value.length)

  function isInWishlist(productId: string): boolean {
    return wishlistIds.value.includes(productId)
  }

  function toggleWishlist(productId: string): void {
    const idx = wishlistIds.value.indexOf(productId)
    if (idx > -1) {
      wishlistIds.value.splice(idx, 1)
    } else {
      wishlistIds.value.push(productId)
    }
  }

  function addToWishlist(productId: string): void {
    if (!isInWishlist(productId)) {
      wishlistIds.value.push(productId)
    }
  }

  function removeFromWishlist(productId: string): void {
    const idx = wishlistIds.value.indexOf(productId)
    if (idx > -1) {
      wishlistIds.value.splice(idx, 1)
    }
  }

  function clearWishlist(): void {
    wishlistIds.value = []
  }

  // Persist wishlist to localStorage whenever it changes
  watch(
    () => wishlistIds.value,
    (newIds) => {
      try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(newIds))
      } catch {
        // Silently fail if localStorage is not available
      }
    },
    { deep: true },
  )

  return {
    wishlistIds,
    count,
    isInWishlist,
    toggleWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
  }
})
