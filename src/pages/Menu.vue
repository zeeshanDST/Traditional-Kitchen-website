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
                  <h1 class="sb-h2">UMJ Traditional Kitchen Menu</h1>
                  <ul class="sb-breadcrumbs">
                    <li><router-link to="/">Home</router-link></li>
                    <li><a href="javascript:void(0)">Menu</a></li>
                  </ul>
                </div>
              </div>
              <!-- main title end -->
            </div>
          </div>
        </div>
      </section>
      <!-- banner end -->

      <!-- menu section 1 -->
      <section class="sb-menu-section sb-p-90-60" v-for="category in categoryProducts" :key="category.id">
        <div class="sb-bg-1">
          <div></div>
        </div>
        <div class="container">
          <div class="sb-mb-60">
            <h2 class="sb-cate-title sb-mb-15">{{category.title}}</h2>
            <p class="sb-text">{{category.description}}</p>
          </div>
          <div class="row" v-if="category.products.length">
            <div class="col-lg-3"  v-for="product in category.products" :key="product.id">
              <div class="sb-menu-item sb-mb-30">
                <router-link :to="'/product-detail/' + product.id" class="sb-cover-frame">
                  <img :src="getImageUrl(product.image)" alt="{{product.title}}">

                   <div v-if="product.type === 'seasonal'" class="sb-badge sb-vegan">
                    <i class="fas fa-leaf"></i> Seasonal
                  </div>
                  <div v-else-if="product.type === 'hot'" class="sb-badge sb-hot">
                    <i class="fas fa-pepper-hot"></i> Hot
                  </div>
                   <div v-if="product.type === 'discounted'" class="sb-badge sb-discount">
                    <i class="fas fa-percent"></i> Discounted
                  </div>
                  <div v-else-if="product.type === 'trademark'" class="sb-badge sb-trademark">
                    <i class="fas fa-trademark"></i> Trademark
                  </div>
                </router-link>
                <div class="sb-card-tp">
                  <h4 class="sb-card-title"><router-link :to="'/product-detail/' + product.id">{{product.title}}</router-link></h4>
                  <div class="sb-price"><sub>AED</sub>{{ product.price }}</div>
                </div>
                <div class="sb-description">
                  <p class="sb-text sb-mb-15"><span v-for="(ingredient, index) in product.ingredients" :key="index">
                  {{ ingredient }}<span v-if="index < product.ingredients.length - 1">, </span>
                </span>.</p>
                </div>
                <div class="sb-card-buttons-frame">
                  <!-- button -->
                  <router-link :to="'/product-detail/' + product.id" class="sb-btn sb-btn-2 sb-btn-gray sb-btn-icon sb-m-0">
                    <span class="sb-icon">
                      <img src="@/assets/img/ui/icons/arrow.svg" alt="icon">
                    </span>
                  </router-link>
                  <!-- button end -->

                  <!-- button -->
       
<span class="sb-btn sb-atc">
                    <span class="sb-icon">
                      <img src="@/assets/img/ui/icons/cart.svg" alt="icon">
                    </span>
                    <span class="sb-add-to-cart-text" @click.prevent="handleAddToCart(product)">Add to cart</span>
                    <span class="sb-added-text">Added</span>
                  </span>
                  <!-- button end -->
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-else>
            <h6>No Products Found Under {{category.title}}</h6>
          </div>
        </div>
      </section>
      <!-- menu section 1 end -->

      <!-- promo -->
      <section class="sb-p-0-60">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="sb-promo-frame sb-mb-30">
                <div class="sb-promo-content">
                  <div class="sb-text-frame">
                    <h3 class="sb-mb-10"><sup>-</sup> <b class="sb-h2">50</b> <sup>%</sup></h3>
                    <h3 class="sb-mb-15">Discount for all* burgers!</h3>
                    <p class="sb-text sb-text-sm sb-mb-15">*Et modi itaque praesentium.</p>
                    <!-- button -->
                    <a href="product.html" class="sb-btn sb-ppc">
                      <span class="sb-icon">
                        <img src="@/assets/img/ui/icons/arrow.svg" alt="icon">
                      </span>
                      <span>Get it now</span>
                    </a>
                    <!-- button end -->
                  </div>
                  <div class="sb-image-frame">
                    <div class="sb-illustration-4">
                      <img src="@/assets/img/illustrations/burger.png" alt="burger" class="sb-burger">
                      <div class="sb-cirkle-1"></div>
                      <div class="sb-cirkle-2"></div>
                      <div class="sb-cirkle-3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="sb-promo-frame sb-mb-30">
                <div class="sb-promo-content">
                  <div class="sb-text-frame">
                    <h3 class="sb-mb-15">Visit UMJ kitchen and get your coffee*</h3>
                    <h3 class="sb-mb-10"><b class="sb-h2">For free!</b></h3>
                    <p class="sb-text sb-text-sm sb-mb-15">*Et modi itaque praesentium.</p>
                    <!-- button -->
                    <a href="product.html" class="sb-btn sb-ppc">
                      <span class="sb-icon">
                        <img src="@/assets/img/ui/icons/arrow.svg" alt="icon">
                      </span>
                      <span>Get it now</span>
                    </a>
                    <!-- button end -->
                  </div>
                  <div class="sb-image-frame">
                    <div class="sb-illustration-5">
                      <img src="@/assets/img/illustrations/cup.png" alt="cup" class="sb-cup">
                      <div class="sb-cirkle-1"></div>
                      <div class="sb-cirkle-2"></div>
                      <div class="sb-cirkle-3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- promo end -->



    </div>
    <!-- dynamic content end -->

  </div>
  <!-- app wrapper end -->
</template>
 <script>
  import api from '@/services/api';
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart.js'
import { useToast } from 'vue-toastification'
const toast = useToast()


const addedToCartMap = ref({})
  export default {
    name: 'Menu',
    data() {
      return {
        categoryProducts: [],
        loading: true,
        error: null, // Add error property
        addedToCartMap: {},
      };
    },
    mounted() {
      this.fetchProducts();
    },
    methods: {
       formatPrice(price) {
    const num = Number(price);
    // Check if integer (no decimals)
    if (Number.isInteger(num)) {
      return num.toString();  // no decimals
    }
    // Else show decimals as is
    return num.toFixed(2); // or just price if you want
  },
      getImageUrl(image) {
      // If images are stored in public folder or remote server
      return `${import.meta.env.VITE_MEDIA_URL || '/assets/img'}/${image}`;
    },
      async fetchProducts() {
        try {
          const response = await api.get('/category-products'); // this hits Laravel
          this.categoryProducts = response.data?.data || []; // Fallback to an empty array if data is undefined
          this.error = null; // Clear any previous error
          console.log(this.categoryProducts)
        } catch (error) {
          console.error('Error fetching products:', error);
          this.error = 'Failed to load products. Please try again later.';
          this.categoryProducts = [];
        } finally {
          this.loading = false;
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
}

    },
  };
  </script>