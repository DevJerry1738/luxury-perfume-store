<template>
  <section class="hero-section" aria-label="Elysian Scents Promotions">
    <div class="promo-grid">
      <!-- Main Hero Banner -->
      <div class="promo-large">
        <div class="promo-content">
          <span class="promo-label">VALENTINE’S COLLECTION</span>
          <h1 class="promo-headline">
            Celebrate Love<br />
            With Timeless Scents
          </h1>
          <p class="promo-sub">Curated fragrances crafted for unforgettable moments</p>

          <RouterLink
            to="/products"
            class="promo-cta"
            role="button"
            aria-label="Shop Valentine Collection"
          >
            Shop Collection
          </RouterLink>
        </div>

        <img
          :src="heroimg"
          alt="Luxury perfume bottles for Valentine’s collection"
          class="promo-image"
          loading="eager"
        />
      </div>

      <!-- Small Promo: Gift Sets -->
      <div class="promo-small promo-top">
        <div class="promo-content">
          <h2 class="promo-headline-small">Valentine’s Gift Sets</h2>
          <p class="promo-sub-small">Perfectly paired for love</p>
        </div>
        <img
          :src="giftimg"
          alt="Luxury perfume gift sets"
          class="promo-image-small"
          loading="lazy"
        />
      </div>

      <!-- Small Promo: Best Sellers -->
      <div class="promo-small promo-bottom">
        <div class="promo-content">
          <h2 class="promo-headline-small">Best Sellers</h2>
          <p class="promo-sub-small">Customer favorites</p>
        </div>
        <img
          :src="bestsellerimg"
          alt="Best selling perfumes"
          class="promo-image-small"
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import heroimg from '@/assets/images/hero.webp' // Reuse existing for large banner; update path as needed
import bestsellerimg from '@/assets/images/bestseller.jpg' // Add your diffuser image asset
import giftimg from '@/assets/images/gift.webp' // Add your gift set image asset
</script>

<style scoped>
.hero-section {
  background: var(--bg-surface, #fff);
  padding: 0;
  margin: 0 auto 48px auto;
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.promo-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: repeat(2, auto);
  gap: 16px;
  width: 100%;
  animation: fadeIn 0.9s cubic-bezier(0.4, 0, 0.2, 1) both;
}

.promo-large {
  grid-column: 1;
  grid-row: 1 / 3;
  background-color: #d32f2f; /* Red to match image */
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 32px;
  color: #fff;
  min-height: 300px; /* Adjust based on image */
}

.promo-small {
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  color: #fff;
  height: 140px; /* Approximate to match stacked rights */
  margin: auto 0px;
}

.promo-top {
  background-color: #8d6e63; /* Brown to match image */
  grid-column: 2;
  grid-row: 1;
}

.promo-bottom {
  background-color: #1976d2; /* Blue to match image */
  grid-column: 2;
  grid-row: 2;
}

.promo-content {
  z-index: 2;
  max-width: 50%;
}

.promo-label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
  opacity: 0.9;
}

.promo-headline {
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 700;
  line-height: 1.1;
  margin: 0 0 8px 0;
}

.promo-headline-small {
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 4px 0;
}

.promo-sub {
  font-size: 1rem;
  opacity: 0.85;
  margin-bottom: 16px;
}

.promo-sub-small {
  font-size: 0.9rem;
  opacity: 0.85;
}

.promo-cta {
  background: #fff;
  color: #d32f2f;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 999px;
  padding: 10px 24px;
  text-decoration: none;
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s;
}

.promo-cta:hover {
  background: #f5f5f5;
  color: #b71c1c;
}

.promo-image {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 60%;
  height: auto;
  object-fit: contain;
  z-index: 1;
  filter: brightness(1.05);
}

.promo-image-small {
  position: absolute;
  right: 16px;
  bottom: 16px;
  width: 40%;
  height: auto;
  object-fit: contain;
  z-index: 1;
}

@media (max-width: 799px) {
  .promo-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
  .promo-large {
    grid-row: 1;
    min-height: 200px;
    padding: 24px;
  }
  .promo-small {
    grid-column: 1;
    height: 120px;
    padding: 16px;
  }
  .promo-content {
    max-width: 60%;
  }
  .promo-image {
    width: 50%;
  }
  .promo-image-small {
    width: 35%;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
