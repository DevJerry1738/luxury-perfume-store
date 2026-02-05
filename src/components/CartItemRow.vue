<template>
  <div class="cart-row">
    <img :src="item.image" :alt="item.name" class="thumb" />
    <div class="meta">
      <div class="title">
        {{ item.name }} <span class="size">{{ item.size }}ml</span>
      </div>
      <div class="controls">
        <button @click="decrease" class="qty">−</button>
        <span class="qty-value">{{ item.quantity }}</span>
        <button @click="increase" class="qty">+</button>
        <button @click="remove" class="remove">Remove</button>
      </div>
    </div>
    <div class="price">₦{{ formatPrice(item.price * item.quantity) }}</div>
  </div>
</template>

<script setup lang="ts">
import type { CartItem } from '@/stores/cartStore'
import { useCartStore } from '@/stores/cartStore'
import { formatPrice } from '@/utils/formatPrice'

const props = defineProps<{ item: CartItem }>()
const store = useCartStore()

const increase = () => store.increaseQty(props.item.productId, props.item.size)
const decrease = () => store.decreaseQty(props.item.productId, props.item.size)
const remove = () => store.removeItem(props.item.productId, props.item.size)
</script>

<style scoped>
.cart-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #e0e0e0;
}
.thumb {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 6px;
}
.meta {
  flex: 1;
}
.title {
  font-weight: 700;
  margin-bottom: 6px;
}
.size {
  color: #999999;
  font-weight: 600;
  margin-left: 6px;
}
.controls {
  display: flex;
  align-items: center;
  gap: 8px;
}
.qty {
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  color: #333333;
  padding: 6px 8px;
  border-radius: 4px;
  cursor: pointer;
}
.qty-value {
  min-width: 24px;
  text-align: center;
}
.remove {
  background: transparent;
  border: none;
  color: #999999;
  cursor: pointer;
  margin-left: 8px;
}
.price {
  font-weight: 700;
  color: #d4af37;
}
</style>
