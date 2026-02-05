<template>
  <div class="checkout-page">
    <header class="header">
      <router-link to="/products" class="back-link">← Back to Catalogue</router-link>
      <h1 class="title">Checkout Summary</h1>
    </header>

    <EmptyState
      v-if="cartStore.items.length === 0"
      title="Your Cart is Empty"
      message="Add some perfumes to proceed with checkout."
    />

    <div v-else class="checkout-container">
      <section class="items-section">
        <h2 class="section-title">Order Summary</h2>

        <div class="items-list">
          <div v-for="item in cartStore.items" :key="getItemKey(item)" class="cart-item">
            <div class="item-image">
              <img :src="item.image" :alt="item.name" />
            </div>

            <div class="item-details">
              <h3 class="item-name">{{ item.name }}</h3>
              <p class="item-brand">{{ item.brand }}</p>
              <p class="item-size">{{ item.size }}ml</p>
            </div>

            <div class="item-quantity">
              <span class="qty-label">Qty:</span>
              <span class="qty-value">{{ item.quantity }}</span>
            </div>

            <div class="item-price">
              <p class="price-label">{{ formatPrice(item.price * item.quantity) }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="summary-section">
        <h2 class="section-title">Order Total</h2>

        <div class="summary-card">
          <div class="summary-row">
            <span class="summary-label">Subtotal</span>
            <span class="summary-value">{{ formatPrice(cartStore.subtotal) }}</span>
          </div>

          <div class="summary-row">
            <span class="summary-label">Shipping</span>
            <span class="summary-value">FREE</span>
          </div>

          <div class="summary-row total">
            <span class="summary-label">Total</span>
            <span class="summary-value">{{ formatPrice(cartStore.subtotal) }}</span>
          </div>

          <button class="checkout-btn" disabled>Proceed to Payment</button>

          <p class="checkout-notice">Payment processing is not yet available</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore, type CartItem } from '@/stores/cartStore'
import EmptyState from '@/components/EmptyState.vue'

const cartStore = useCartStore()

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount)
}

function getItemKey(item: CartItem): string {
  return `${item.productId}-${item.size}`
}
</script>

<style scoped>
.checkout-page {
  background: #ffffff;
  color: #333333;
  min-height: 100vh;
  padding: 28px;
}

.header {
  margin-bottom: 36px;
}

.back-link {
  display: inline-block;
  margin-bottom: 16px;
  color: #d4af37;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  transition: color 0.2s;
}

.back-link:hover {
  color: #e6c200;
}

.title {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
}

.checkout-container {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;
  max-width: 1200px;
}

.section-title {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333333;
}

.items-section {
  background: #f5f5f5;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-item {
  display: grid;
  grid-template-columns: 80px 1fr 100px 120px;
  gap: 16px;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
}

.cart-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.item-image {
  width: 80px;
  height: 80px;
  background: #ffffff;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-name {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #333333;
}

.item-brand {
  margin: 0;
  font-size: 12px;
  color: #999999;
}

.item-size {
  margin: 0;
  font-size: 12px;
  color: #999999;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
}

.qty-label {
  font-size: 12px;
  color: #999999;
}

.qty-value {
  font-size: 14px;
  font-weight: 600;
  color: #333333;
}

.item-price {
  text-align: right;
}

.price-label {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: #d4af37;
}

.summary-section {
  position: sticky;
  top: 20px;
  height: fit-content;
}

.summary-card {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e0e0e0;
}

.summary-row.total {
  border: none;
  padding: 16px 0;
  margin-top: 8px;
  border-top: 2px solid #e0e0e0;
}

.summary-label {
  font-size: 14px;
  color: #666666;
}

.summary-row.total .summary-label {
  font-weight: 600;
  color: #333333;
}

.summary-value {
  font-size: 14px;
  font-weight: 600;
  color: #333333;
}

.summary-row.total .summary-value {
  font-size: 18px;
  color: #d4af37;
}

.checkout-btn {
  width: 100%;
  padding: 14px;
  margin-top: 20px;
  background: #cccccc;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  font-size: 14px;
  cursor: not-allowed;
  transition: background-color 0.2s;
}

.checkout-btn:disabled {
  background: #cccccc;
  color: #999999;
}

.checkout-notice {
  margin: 12px 0 0 0;
  font-size: 12px;
  color: #999999;
  text-align: center;
}

@media (max-width: 1024px) {
  .checkout-container {
    grid-template-columns: 1fr;
  }

  .summary-section {
    position: static;
  }
}

@media (max-width: 768px) {
  .checkout-page {
    padding: 16px;
  }

  .title {
    font-size: 20px;
  }

  .cart-item {
    grid-template-columns: 60px 1fr;
    gap: 12px;
  }

  .item-quantity,
  .item-price {
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;
  }

  .item-image {
    width: 60px;
    height: 60px;
  }
}
</style>
