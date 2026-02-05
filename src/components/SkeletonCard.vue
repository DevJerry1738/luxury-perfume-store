<template>
  <div class="skeleton-card" aria-hidden="true">
    <div class="skeleton image" />
    <div class="skeleton line short" />
    <div class="skeleton line" />
    <div class="skeleton line tiny" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.skeleton-card {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: transparent;
}
.skeleton {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.03) 0%,
    rgba(255, 255, 255, 0.06) 20%,
    rgba(255, 255, 255, 0.03) 40%
  );
  background-size: 200% 100%;
  animation: shimmer 1.2s linear infinite;
  border-radius: 6px;
}
.skeleton.image {
  height: 160px;
  margin-bottom: 12px;
}
.skeleton.line {
  height: 14px;
  margin-bottom: 8px;
}
.skeleton.line.short {
  width: 60%;
}
.skeleton.line.tiny {
  width: 35%;
  height: 12px;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
