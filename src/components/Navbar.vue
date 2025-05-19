
<template>
      <!-- preloader -->
    <div class="sb-preloader">
      <div class="sb-preloader-bg"></div>
      <div class="sb-preloader-body">
        <div class="sb-loading">
          <div class="sb-percent"><span class="sb-preloader-number" data-count="101">00</span><span>%</span></div>
        </div>
        <div class="sb-loading-bar">
          <div class="sb-bar"></div>
        </div>
      </div>
    </div>
    <!-- preloader end -->
    <!-- click effect -->
    <div class="sb-click-effect"></div>
    <!-- loader -->
    <div class="sb-load"></div>
   <!-- top bar -->
    <div class="sb-top-bar-frame">
      <div class="sb-top-bar-bg"></div>
      <div class="container">
        <div class="sb-top-bar">
          <router-link to="/" class="sb-logo-frame">
            <!-- logo img -->
            <img src="@/assets/img/ui/logo-org.jpg" alt="Starbelly">
          </router-link >
          <!-- menu -->
          <div class="sb-right-side">
            <nav id="sb-dynamic-menu" class="sb-menu-transition">
              <ul class="sb-navigation">
                <li class="sb-active">
                  <router-link to="/">Home</router-link>
                </li>

                <li>
                  <router-link to="/menu">Menu</router-link>
                </li>

                <li>
                  <router-link to="/reservation">Reservation</router-link>
                </li>

                <li>
                  <router-link to="/contact-us">Contact</router-link>
                </li>
              </ul>
            </nav>
            <div class="sb-buttons-frame">
              <!-- button -->
              <div class="sb-btn sb-btn-2 sb-btn-gray sb-btn-icon sb-m-0 sb-btn-cart">
                <span class="sb-icon">
                  <img src="@/assets/img/ui/icons/cart.svg" alt="icon">
                </span>
                <i class="sb-cart-number">{{ cartItemCount }}</i>
              </div>
              <!-- button end -->
              <!-- menu btn -->
              <div class="sb-menu-btn"><span></span></div>
              <!-- info btn -->
              <div class="sb-info-btn"><span></span></div>
            </div>
          </div>
        </div>
      </div>
      <!-- info bar -->
      <div class="sb-info-bar">
        <div class="sb-infobar-content">
          <div class="sb-ib-title-frame sb-mb-30">
            <h4>Contact</h4><i class="fas fa-arrow-down"></i>
          </div>
          <ul class="sb-list sb-mb-30">
            <li><b>Address:</b><span>Montréal, 1510 Rue Sauvé</span></li>
            <li><b>Working hours:</b><span>09:00 - 23:00</span></li>
            <li><b>Phone:</b><span>+02 (044) 756-X6-52</span></li>
            <li><b>Email:</b><span>umjtraditional@mail.com</span></li>
          </ul>
          
          
          
        </div>
        
      </div>
      <!-- info bar end -->
      <!-- minicart -->
      <div class="sb-minicart">
    <div class="sb-minicart-content">
      <div class="sb-ib-title-frame sb-mb-30">
        <h4>Your order.</h4>
        <i class="fas fa-arrow-down"></i>
      </div>

      <!-- Loop through cart items -->
      <template v-if="cartStore.items.length">
        <a
          v-for="item in cartStore.items"
          :key="item.id"
          href="#"
          class="sb-menu-item sb-menu-item-sm sb-mb-15"
        >
          <div class="sb-cover-frame">
            <img :src="getImageUrl(item.image)" alt="{{item.title}}" />
          </div>
          <div class="sb-card-tp">
            <h4 class="sb-card-title">{{ item.title }}</h4>
            <div class="sb-price">
              <sub>AED</sub> {{ item.price * item.quantity }}
            </div>
          </div>
        </a>
      </template>

      <!-- Empty cart fallback -->
      <div v-else class="sb-menu-item sb-menu-item-sm sb-mb-15">
        <p>Your cart is empty.</p>
      </div>
    </div>

    <div class="sb-minicart-footer">
      <a href="/cart" class="sb-btn sb-btn-gray sb-btn-text">
        <span>View order</span>
      </a>
      <a href="/checkout" class="sb-btn sb-btn-text">
        <span>Checkout</span>
      </a>
    </div>
  </div>
      <!-- minicart end -->
    </div>
    <!-- top bar end -->
</template>

<script setup >
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

// Compute cart item count
const cartItemCount = computed(() => cartStore.totalItems)
function getImageUrl(image) {
  return `${import.meta.env.VITE_MEDIA_URL || '/assets/img'}/${image}`
}
</script>
