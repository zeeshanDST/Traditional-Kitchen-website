
import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import Menu from '@/pages/Menu.vue'
import Reservation from '@/pages/Reservation.vue'
import Contact from '@/pages/Contact.vue'
import ProductDetail from '@/pages/ProductDetail.vue'
import Cart from '@/pages/Cart.vue'
import Checkout from '@/pages/Checkout.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/menu', component: Menu },
  { path: '/reservation', component: Reservation },
  { path: '/contact-us', component: Contact },
  { path: '/product-detail/:id', component: ProductDetail },
  { path: '/cart', component: Cart },
  { path: '/checkout', component: Checkout },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
