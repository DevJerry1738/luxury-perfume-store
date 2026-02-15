<template>
  <div class="size-selector">
    <h3 class="label">Size</h3>
    <div class="sizes">
      <button v-for="size in sizes" :key="size.size" :disabled="isOutOfStock"
        :class="['size-btn', { active: modelValue?.size === size.size }]" @click="handleSelectSize(size)">
        {{ size.size }}ml
      </button>
    </div>
    <p v-if="modelValue" class="price">₦{{ formatPrice(modelValue.price) }}</p>
  </div>
</template>

<script setup lang="ts">
import type { PerfumeSize } from '../types/perfume'

interface Props {
  sizes: PerfumeSize[]
  modelValue: PerfumeSize | null
  isOutOfStock?: boolean
}

interface Emits {
  (e: 'update:modelValue', size: PerfumeSize): void
}

const props = withDefaults(defineProps<Props>(), {
  isOutOfStock: false,
})

const emit = defineEmits<Emits>()

const handleSelectSize = (size: PerfumeSize) => {
  if (!props.isOutOfStock) {
    emit('update:modelValue', size)
  }
}

const formatPrice = (price: number): string =>
  new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 }).format(price)
</script>

<style scoped>
.size-selector {
  margin: 24px 0;
}

.label {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: #999999;
}

.sizes {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
}

.size-btn {
  padding: 10px 16px;
  background: #ffffff;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  color: #333333;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  -webkit-tap-highlight-color: transparent;
  /* Remove native highlight */
}

/* Only apply hover on devices that support it */
@media (hover: hover) {
  .size-btn:hover:not(:disabled) {
    border-color: #d4af37;
    background: #f5f5f5;
  }
}

/* Active State (Selected) - defined after hover/default */
.size-btn.active {
  background: #d4af37;
  border-color: #d4af37;
  color: #ffffff;
}

/* Press state for immediate feedback */
.size-btn:active:not(:disabled) {
  transform: scale(0.96);
  background: #f0f0f0;
}

/* Ensure active+press still looks selected */
.size-btn.active:active:not(:disabled) {
  background: #c49f30;
  /* Darker gold */
  border-color: #c49f30;
}

.size-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.price {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #d4af37;
}
</style>
