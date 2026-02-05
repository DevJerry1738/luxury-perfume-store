import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '@/pages/ProductList.vue'
import ProductDetail from '@/pages/ProductDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/products',
      name: 'products',
      component: ProductList,
    },
    {
      path: '/products/:id',
      name: 'product-detail',
      component: ProductDetail,
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: () => import('@/pages/Wishlist.vue'),
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('@/pages/Checkout.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/pages/Home.vue'),
    },
  ],
})

export default router
