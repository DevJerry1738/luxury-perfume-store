<template>
  <section class="hero-section" aria-label="Elysian Scents Promotions">
    <div class="promo-grid">
      <!-- Main Hero Banner -->
      <div class="promo-card promo-large promo-valentine">
        <div class="promo-content">
          <span class="promo-label">VALENTINE’S COLLECTION</span>
          <h1 class="promo-headline">
            Celebrate Love<br />
            With Timeless Scents
          </h1>
          <p class="promo-sub">Curated fragrances crafted for unforgettable moments</p>

          <RouterLink to="/products" class="promo-cta"> Shop Collection </RouterLink>
        </div>
      </div>

      <!-- Top Right: New Arrivals -->
      <div class="promo-card promo-small promo-new">
        <div class="promo-content">
          <h2 class="promo-headline-small">New Arrivals</h2>
          <p class="promo-sub-small">Fresh drops just landed</p>
        </div>
      </div>

      <!-- Bottom Right: Best Sellers -->
      <div class="promo-card promo-small promo-best">
        <div class="promo-content">
          <h2 class="promo-headline-small">Best Sellers</h2>
          <p class="promo-sub-small">Loved by our customers</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.hero-section {
  max-width: 1200px;
  margin: 0 auto 56px;
  padding: 0 16px;
}

/* ===== GRID ===== */
.promo-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: repeat(2, 1fr);
  gap: 16px;
  animation: fadeUp 0.8s ease both;
}

/* ===== BASE CARD ===== */
.promo-card {
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  color: #fff;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  transition:
    transform 0.45s ease,
    box-shadow 0.45s ease;
}

.promo-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom right, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.55));
  transition: background 0.45s ease;
}

.promo-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);
}

.promo-card:hover::before {
  background: linear-gradient(to bottom right, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.7));
}

.promo-card:hover {
  background-size: 105%;
}

/* ===== CONTENT ===== */
.promo-content {
  position: relative;
  z-index: 2;
  max-width: 60%;
  padding: 32px;
}

.promo-label {
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: 600;
  opacity: 0.9;
  margin-bottom: 10px;
  display: inline-block;
}

.promo-headline {
  font-size: clamp(1.9rem, 3vw, 2.6rem);
  line-height: 1.1;
  margin-bottom: 12px;
  font-weight: 700;
}

.promo-headline-small {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 6px;
}

.promo-sub {
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 20px;
}

.promo-sub-small {
  font-size: 0.9rem;
  opacity: 0.9;
}

/* ===== CTA ===== */
.promo-cta {
  display: inline-block;
  padding: 10px 28px;
  border-radius: 999px;
  background: #fff;
  color: #111;
  font-weight: 600;
  text-decoration: none;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.promo-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
}

/* ===== CARD SIZES ===== */
.promo-large {
  grid-row: 1 / 3;
  min-height: 360px;
}

.promo-small {
  min-height: 170px;
  display: flex;
  align-items: flex-end;
}

/* ===== BACKGROUND IMAGES ===== */
.promo-valentine {
  background-image: url('@/assets/images/hero.webp');
}

.promo-new {
  background-image: url('@/assets/images/gift.webp');
}

.promo-best {
  background-image: url('@/assets/images/bestseller.jpg');
}

/* ===== MOBILE ===== */
@media (max-width: 900px) {
  .promo-grid {
    grid-template-columns: 1fr;
  }

  .promo-large {
    min-height: 300px;
  }

  .promo-content {
    max-width: 100%;
    padding: 24px;
  }
}

/* ===== ANIMATION ===== */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
