<template>
    <!-- app wrapper -->
  <div class="sb-app">
   

    <!-- dynamic content -->
    <div id="sb-dynamic-content" class="sb-transition-fade">

      <!-- banner -->
      <section class="sb-banner sb-banner-xs sb-banner-color">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <!-- main title -->
              <div class="sb-main-title-frame">
                <div class="sb-main-title">
                  <h1 class="sb-h2">Your order</h1>
                  <ul class="sb-breadcrumbs">
                    <li><router-link href="/">Home</router-link></li>
                    <li><a href="#.">Cart</a></li>
                  </ul>
                </div>
              </div>
              <!-- main title end -->
            </div>
          </div>
        </div>
      </section>
      <!-- banner end -->

      <!-- cart -->
      <section class="sb-p-90-90">
        <div class="container">
          <div class="sb-cart-table">
            <div class="sb-cart-table-header">
              <div class="row">
                <div class="col-lg-6">Product</div>
                <div class="col-lg-3">Quantity</div>
                <div class="col-lg-1">Price</div>
                <div class="col-lg-1">Total</div>
                <div class="col-lg-1"></div>
              </div>
            </div>

            <!-- Dynamic items -->
            <div
              v-for="item in cartStore.items"
              :key="item.id"
              class="sb-cart-item"
            >
              <div class="row align-items-center">
                <div class="col-lg-6">
                  <a class="sb-product" href="#">
                    <div class="sb-cover-frame">
                      <img :src="getImageUrl(item.image)" :alt="item.name" />
                    </div>
                    <div class="sb-prod-description">
                      <h4 class="sb-mb-10">{{ item.title }}</h4>
                      <p class="sb-text sb-text-sm">
                        <span v-for="(ing, index) in item.ingredients" :key="index">
                          {{ ing }}<span v-if="index < item.ingredients.length - 1">, </span>
                        </span>
                      </p>
                    </div>
                  </a>
                </div>
                <div class="col-6 col-lg-3">
                  <div class="sb-input-number-frame">
                    <div
                      class="sb-input-number-btn sb-sub"
                      @click="cartStore.decrementItem(item.id)"
                    >-</div>
                    <input type="number" :value="item.quantity" min="1" readonly />
                    <div
                      class="sb-input-number-btn sb-add"
                      @click="cartStore.incrementItem(item.id)"
                    >+</div>
                  </div>
                </div>
                <div class="col-3 col-lg-1">
                  <div class="sb-price-1"><span>Price: </span>AED {{ item.price }}</div>
                </div>
                <div class="col-3 col-lg-1">
                  <div class="sb-price-2">
                    <span>Total: </span>${{ (item.price * item.quantity).toFixed(2) }}
                  </div>
                </div>
                <div class="col-1">
                  <a href="#." class="sb-remove" @click.prevent="cartStore.removeItem(item.id)">+</a>
                </div>
              </div>
            </div>

            <!-- Totals -->
            <div class="row justify-content-end">
              <div class="col-lg-6">
                <div class="sb-cart-total">
                  <div class="sb-sum">
                    <div class="row">
                      <div class="col-8">
                        <div class="sb-total-title">Subtotal:</div>
                      </div>
                      <div class="col-4">
                        <div class="sb-price-1 text-right">
                          AED {{ cartStore.subtotal.toFixed(2) }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="sb-sum">
                    <div class="row">
                      <div class="col-8">
                        <div class="sb-total-title">Estimated shipping:</div>
                      </div>
                      <div class="col-4">
                        <div class="sb-price-1 text-right">AED {{ shippingCost.toFixed(2) }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="sb-realy-sum">
                    <div class="row">
                      <div class="col-8">
                        <div class="sb-total-title">Total:</div>
                      </div>
                      <div class="col-4">
                        <div class="sb-price-2 text-right">
                          AED {{ (cartStore.subtotal + shippingCost).toFixed(2) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="sb-cart-btns-frame text-right">
                  <a href="/shop" class="sb-btn sb-btn-2 sb-btn-gray">
                    <span class="sb-icon">
                      <img src="@/assets/img/ui/icons/arrow-2.svg" alt="icon" />
                    </span>
                    <span>Continue purchasing</span>
                  </a>
                  <a href="/checkout" class="sb-btn sb-m-0">
                    <span class="sb-icon">
                      <img src="@/assets/img/ui/icons/arrow.svg" alt="icon" />
                    </span>
                    <span>Checkout</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- cart end -->

      

    </div>
    <!-- dynamic content end -->

  </div>
  <!-- app wrapper end -->
</template>
<script setup>
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

function getImageUrl(image) {
  return `${import.meta.env.VITE_MEDIA_URL || '/assets/img'}/${image}`
}

const shippingCost = 0
</script>
