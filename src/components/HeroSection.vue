<template>
  <section class="hero" role="region" aria-label="Hero">
    <div class="hero-bg" />
    <div class="hero-overlay" />

    <div class="hero-inner">
      <h1 class="hero-title enter-up">SCENTS THAT DEFINE PRESENCE</h1>
      <p class="hero-sub enter-up delay">
        An editorial collection of fine fragrances crafted for presence and memory.
      </p>
      <button class="btn-primary hero-cta enter-up delay-2" @click="scrollToCatalog">
        View Collection
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
function scrollToCatalog() {
  const el = document.getElementById('catalog')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  overflow: hidden;
}
.hero-bg {
  position: absolute;
  inset: 0;
  background-image: url('/hero.jpg');
  background-size: cover;
  background-position: center;
  filter: contrast(0.9) saturate(0.9);
  transform: scale(1.05);
  will-change: transform;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2), rgba(51, 51, 51, 0.5));
}
.hero-inner {
  position: relative;
  z-index: 2;
  max-width: 920px;
  text-align: center;
  padding: 32px;
}
.hero-title {
  font-size: clamp(24px, 4.5vw, 48px);
  letter-spacing: 2px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 12px;
}
.hero-sub {
  color: #f5f5f5;
  max-width: 720px;
  margin: 0 auto 24px;
  font-size: clamp(14px, 1.6vw, 18px);
}
.hero-cta {
  padding: 12px 22px;
}

.enter-up {
  transform: translateY(10px);
  opacity: 0;
  animation: enterUp 520ms ease forwards;
}
.enter-up.delay {
  animation-delay: 160ms;
}
.enter-up.delay-2 {
  animation-delay: 300ms;
}

@keyframes enterUp {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
