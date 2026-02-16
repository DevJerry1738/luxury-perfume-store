<template>
    <footer class="footer">
        <div class="footer-content">
            <!-- Brand Section -->
            <div class="footer-section brand-section">
                <div class="footer-brand">
                    <span class="brand-text">Elysian <span class="brand-subtext">Scents</span></span>
                </div>
                <p class="brand-description">
                    Curating the world's most exquisite fragrances for the discerning connoisseur.
                    Experience luxury in every drop.
                </p>
                <div class="social-links">
                    <a href="#" class="social-link" aria-label="Instagram">
                        <Instagram />
                    </a>
                    <a href="#" class="social-link" aria-label="Twitter">
                        <Twitter />
                    </a>
                    <a href="#" class="social-link" aria-label="Facebook">
                        <Facebook />
                    </a>
                </div>
            </div>

            <!-- Quick Links -->
            <div class="footer-section">
                <h3 class="footer-heading">Discover</h3>
                <ul class="footer-links">
                    <li><router-link to="/" class="footer-link">Home</router-link></li>
                    <li><router-link to="/products" class="footer-link">Shop Collection</router-link></li>
                    <li><router-link to="/about" class="footer-link">Our Story</router-link></li>
                    <li><router-link to="/journal" class="footer-link">Journal</router-link></li>
                </ul>
            </div>

            <!-- Customer Care -->
            <div class="footer-section">
                <h3 class="footer-heading">Support</h3>
                <ul class="footer-links">
                    <li><router-link to="/contact" class="footer-link">Contact Us</router-link></li>
                    <li><router-link to="/shipping" class="footer-link">Shipping & Returns</router-link></li>
                    <li><router-link to="/faq" class="footer-link">FAQ</router-link></li>
                    <li><router-link to="/terms" class="footer-link">Terms of Service</router-link></li>
                </ul>
            </div>

            <!-- Newsletter -->
            <div class="footer-section subscribe-section">
                <h3 class="footer-heading">Stay Connected</h3>
                <p class="subscribe-text">Subscribe to receive updates, access to exclusive deals, and more.</p>
                <form class="subscribe-form" @submit.prevent>
                    <input type="email" placeholder="Your email address" class="subscribe-input" />
                    <button type="submit" class="subscribe-btn">Subscribe</button>
                </form>
            </div>
        </div>

        <div class="footer-bottom">
            <p class="copyright">
                &copy; {{ new Date().getFullYear() }} Elysian Scents. All rights reserved.
            </p>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { Instagram, Twitter, Facebook } from 'lucide-vue-next'
</script>

<style scoped>
.footer {
    background-color: var(--soft-gray);
    color: var(--text-primary);
    padding: 64px 24px 24px;
    border-top: 1px solid var(--border-color);
    font-family: 'Inter', sans-serif;
}

.footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.5fr;
    gap: 48px;
    margin-bottom: 64px;
}

.footer-section {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

/* Brand Section */
.brand-section {
    max-width: 320px;
}

.footer-brand {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
}

.brand-text {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    font-family: 'Futura', 'Roboto Condensed', sans-serif;
    color: var(--deep-charcoal);
}

.brand-subtext {
    font-weight: 400;
    color: var(--text-secondary);
}

.brand-description {
    font-size: 14px;
    line-height: 1.6;
    color: var(--text-secondary);
    margin-bottom: 16px;
}

/* Social Links */
.social-links {
    display: flex;
    gap: 16px;
}

.social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #fff;
    color: var(--deep-charcoal);
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;
}

.social-link:hover {
    background-color: var(--deep-charcoal);
    color: #fff;
    border-color: var(--deep-charcoal);
    transform: translateY(-2px);
}

.social-link svg {
    width: 18px;
    height: 18px;
}

/* Headings & Links */
.footer-heading {
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--deep-charcoal);
    margin-bottom: 8px;
}

.footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.footer-link {
    text-decoration: none;
    color: var(--text-secondary);
    font-size: 14px;
    transition: color 0.2s ease;
    position: relative;
    display: inline-block;
}

.footer-link:hover {
    color: var(--gold-accent);
}

/* Subscribe Section */
.subscribe-section {
    background-color: #fff;
    padding: 24px;
    border-radius: 8px;
    box-shadow: var(--shadow-light);
}

.subscribe-text {
    font-size: 13px;
    color: var(--text-secondary);
    margin-bottom: 12px;
}

.subscribe-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.subscribe-input {
    width: 100%;
    padding: 10px 14px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 14px;
    transition: border-color 0.2s ease;
}

.subscribe-input:focus {
    outline: none;
    border-color: var(--gold-accent);
}

.subscribe-btn {
    width: 100%;
    padding: 10px;
    background-color: var(--deep-charcoal);
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.subscribe-btn:hover {
    background-color: #000;
}

/* Footer Bottom */
.footer-bottom {
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    padding-top: 24px;
    text-align: center;
}

.copyright {
    font-size: 12px;
    color: var(--text-secondary);
}

/* Responsive Design */
@media (max-width: 1024px) {
    .footer-content {
        grid-template-columns: 1fr 1fr;
        gap: 40px;
    }

    .brand-section,
    .subscribe-section {
        grid-column: span 2;
        max-width: 100%;
    }

    .brand-section {
        text-align: center;
        align-items: center;
    }

    .footer-brand,
    .social-links {
        justify-content: center;
    }
}

@media (max-width: 640px) {
    .footer {
        padding: 48px 20px 24px;
    }

    .footer-content {
        display: flex;
        flex-direction: column;
        gap: 40px;
    }

    .brand-section,
    .subscribe-section {
        grid-column: auto;
    }

    .footer-section {
        align-items: center;
        text-align: center;
    }

    .footer-links {
        align-items: center;
    }
}
</style>
