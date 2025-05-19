<template>
  <div class="sb-app">
    <div id="sb-dynamic-content" class="sb-transition-fade">
      <!-- banner -->
      <section class="sb-banner sb-banner-xs sb-banner-color">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="sb-main-title-frame">
                <div class="sb-main-title">
                  <h1 class="sb-h2">UMJ Traditional Kitchen</h1>
                  <ul class="sb-breadcrumbs">
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/menu">Menu</router-link></li>
                    <li><span> &nbsp Product</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- product -->
      <section class="sb-p-90-0" v-if="product">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <div class="sb-gallery-item sb-gallery-square sb-mb-90">
                <img :src="getImageUrl(product.image)" alt="{{product.title}}" />
                <div class="sb-badge sb-vegan" v-if="product.is_vegan">
                  <i class="fas fa-leaf"></i> Vegan
                </div>
                <a
                  :href="getImageUrl(product.image)"
                  class="sb-btn sb-btn-2 sb-btn-icon sb-btn-gray sb-zoom"
                  data-fancybox="menu"
                  data-no-swup
                >
                  <span class="sb-icon">
                    <img src="@/assets/img/ui/icons/zoom.svg" alt="icon" />
                  </span>
                </a>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="sb-product-description sb-mb-90">
                <div class="sb-price-frame sb-mb-30">
                  <h3>{{ product.title }}</h3>
                  <div class="sb-price">
                    <sub>AED </sub>{{ product.price }}
                  </div>
                </div>

                

                <p class="sb-text sb-mb-30">
                  <span
                    v-for="(ingredient, index) in product.ingredients"
                    :key="index"
                  >
                    {{ ingredient }}<span v-if="index !== product.ingredients.length - 1">, </span>
                  </span>
                </p>

                <div class="row">
                  <div class="col-lg-4" v-for="step in steps" :key="step.number">
                    <div class="sb-features-item sb-features-item-sm sb-mb-30">
                      <div class="sb-number">{{ step.number }}</div>
                      <div class="sb-feature-text">
                        <h4 class="sb-mb-15">{{ step.title }}</h4>
                        <p class="sb-text sb-text-sm">{{ step.description }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="sb-buttons-frame">
                  
                  <span class="sb-btn sb-atc"@click.prevent="handleAddToCart(product)">
                    <span class="sb-icon">
                      <img src="@/assets/img/ui/icons/cart.svg" alt="icon" />
                    </span>
                    <span class="sb-add-to-cart-text">Add to cart</span>
                    <span class="sb-added-text">Added</span>
                </span>
                </div>
              </div>
            </div>
          </div>

          <p class="sb-text sb-mb-15">{{ product.detail }}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart.js'
import { useToast } from 'vue-toastification'
const toast = useToast()

export default {
  data() {
    return {
      productId: null,
      product: null,
      quantity: 1,
      steps: [
        {
          number: '01',
          title: 'Add to the cart and place an order',
          description: 'Porro comirton pera nemo veniam',
        },
        {
          number: '02',
          title: 'Enter your phone number and address',
          description: 'Eligendi adipisci numquam.',
        },
        {
          number: '03',
          title: 'Enjoy your favorite food at home!',
          description: 'Necessitatibus praesentium',
        },
      ],
    };
  },
  created() {
    this.productId = this.$route.params.id;
    this.fetchProduct();
  },
  methods: {
    async fetchProduct() {
      try {
        const res = await api.get(`/products/${this.productId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        this.product = res.data.data;
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    },
      handleAddToCart(product) {
  const cart = useCartStore()

  if (cart.isInCart(product.id)) {
    toast.info('Product is already added to the cart.')
    return
  }

  cart.addToCart(product)
  this.addedToCartMap = { ...this.addedToCartMap, [product.id]: true }
  setTimeout(() => {
    this.addedToCartMap = { ...this.addedToCartMap, [product.id]: false }
  }, 1500)
},
     getImageUrl(image) {
      // If images are stored in public folder or remote server
      return `${import.meta.env.VITE_MEDIA_URL || '/assets/img'}/${image}`;
    },
  },
};
</script>
