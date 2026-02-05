<template>
  <div class="empty-state">
    <div class="empty-content">
      <h2 class="empty-title">{{ title }}</h2>
      <p class="empty-message">{{ message }}</p>
      <router-link to="/products" class="cta-btn">Browse Products</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  message: string
}>()
</script>

<style scoped>
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 40px 20px;
  background: #ffffff;
  color: #333333;
}

.empty-content {
  text-align: center;
}

.empty-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 12px;
  color: #333333;
}

.empty-message {
  font-size: 16px;
  color: #999999;
  margin: 0 0 24px;
  line-height: 1.5;
}

.cta-btn {
  display: inline-block;
  padding: 12px 24px;
  background: #d4af37;
  color: #ffffff;
  border: 1px solid #d4af37;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition:
    background-color 0.2s,
    color 0.2s;
}

.cta-btn:hover {
  background-color: transparent;
  color: #d4af37;
}
</style>
