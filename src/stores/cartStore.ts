import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export interface CartItem {
  productId: string
  name: string
  brand: string
  image: string
  size: number
  price: number
  quantity: number
}

const CART_STORAGE_KEY = 'luxury-perfume-cart'

function loadCartFromStorage(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (item): item is CartItem =>
        typeof item === 'object' &&
        item !== null &&
        typeof item.productId === 'string' &&
        typeof item.name === 'string' &&
        typeof item.brand === 'string' &&
        typeof item.image === 'string' &&
        typeof item.size === 'number' &&
        typeof item.price === 'number' &&
        typeof item.quantity === 'number' &&
        item.quantity > 0,
    )
  } catch {
    return []
  }
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(loadCartFromStorage())
  const isOpen = ref(false)

  const itemCount = computed(() => items.value.reduce((sum, it) => sum + it.quantity, 0))

  const subtotal = computed(() => items.value.reduce((sum, it) => sum + it.price * it.quantity, 0))

  const totalItems = computed(() => itemCount.value)

  function findIndex(productId: string, size: number) {
    return items.value.findIndex((i) => i.productId === productId && i.size === size)
  }

  function addToCart(item: CartItem) {
    const idx = findIndex(item.productId, item.size)
    if (idx > -1) {
      const existing = items.value[idx]
      if (existing) existing.quantity += item.quantity
    } else {
      items.value.push({ ...item })
    }
    isOpen.value = true
  }

  function removeItem(productId: string, size: number) {
    items.value = items.value.filter((i) => !(i.productId === productId && i.size === size))
  }

  function removeFromCart(productId: string, size: number) {
    removeItem(productId, size)
  }

  function increaseQty(productId: string, size: number) {
    const idx = findIndex(productId, size)
    if (idx > -1) {
      const existing = items.value[idx]
      if (existing) existing.quantity += 1
    }
  }

  function decreaseQty(productId: string, size: number) {
    const idx = findIndex(productId, size)
    if (idx > -1) {
      const existing = items.value[idx]
      if (existing && existing.quantity > 1) existing.quantity -= 1
    }
  }

  function updateQuantity(productId: string, size: number, quantity: number) {
    const idx = findIndex(productId, size)
    if (idx > -1) {
      const existing = items.value[idx]
      if (existing) {
        if (quantity > 0) {
          existing.quantity = quantity
        } else {
          removeItem(productId, size)
        }
      }
    }
  }

  function clearCart() {
    items.value = []
  }

  function toggleCart() {
    isOpen.value = !isOpen.value
  }

  function closeCart() {
    isOpen.value = false
  }

  // Persist cart to localStorage whenever items change
  watch(
    () => items.value,
    (newItems) => {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems))
      } catch {
        // Silently fail if localStorage is not available
      }
    },
    { deep: true },
  )

  return {
    items,
    isOpen,
    itemCount,
    subtotal,
    totalItems,
    addToCart,
    removeItem,
    removeFromCart,
    increaseQty,
    decreaseQty,
    updateQuantity,
    clearCart,
    toggleCart,
    closeCart,
  }
})
