<template>
  <div class="sb-app">
    <section class="sb-banner sb-banner-xs sb-banner-color">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="sb-main-title-frame">
              <div class="sb-main-title">
                <h1 class="sb-h2">Checkout</h1>
                <ul class="sb-breadcrumbs">
                  <li><router-link to="/">Home</router-link></li>
                  <li><a href="#">Checkout</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="sb-p-90-90">
      <div class="container" data-sticky-container>
        <div class="row">
          <!-- Form Section -->
          <div class="col-lg-8">
            <form @submit.prevent="placeOrder" class="sb-checkout-form">
              <div class="sb-mb-30">
                <h3>Billing details</h3>
              </div>
              <div class="row">
                <template v-for="field in billingFields" :key="field.name">
                  <div class="col-lg-6">
                    <div class="sb-group-input">
                      <input :type="field.type" v-model="billing[field.name]" required />
                      <span class="sb-bar"></span>
                      <label>{{ field.label }}</label>
                    </div>
                  </div>
                </template>
              </div>

              <div class="sb-mb-30">
                <h3>Additional information</h3>
              </div>
              <div class="sb-group-input">
                <textarea v-model="billing.notes" required></textarea>
                <span class="sb-bar"></span>
                <label>Order notes</label>
              </div>

              <div class="sb-mb-30">
                <h3 class="sb-mb-30">Payment method</h3>
                <ul>
                  <li class="sb-radio" v-for="method in paymentMethods" :key="method">
                    <input
                      type="radio"
                      :id="method"
                      :value="method"
                      v-model="billing.payment_method"
                      name="payment_method"
                    />
                    <label :for="method">{{ method }}</label>
                    <div class="sb-check"></div>
                  </li>
                </ul>
              </div>

              <button type="submit" class="sb-btn sb-m-0">
                <span class="sb-icon">
                  <img src="@/assets/img/ui/icons/arrow.svg" alt="icon" />
                </span>
                <span>Place order</span>
              </button>
            </form>
          </div>

          <!-- Cart Summary -->
          <div class="col-lg-4">
            <div class="sb-pad-type-2 sb-sticky" data-margin-top="120">
              <div class="sb-co-cart-frame">
                <div class="sb-cart-table">
                  <div class="sb-cart-table-header">
                    <div class="row">
                      <div class="col-lg-9">Product</div>
                      <div class="col-lg-3 text-right">Total</div>
                    </div>
                  </div>

                  <div v-for="item in cartStore.items"
              :key="item.id" class="sb-cart-item">
                    <div class="row align-items-center">
                      <div class="col-lg-9">
                        <router-link class="sb-product" :to="'/product/' + item.id">
                          <div class="sb-cover-frame">
                            <img :src="getImageUrl(item.image)" :alt="item.title" />
                          </div>
                          <div class="sb-prod-description">
                            <h4 class="sb-mb-10">{{ item.title }}</h4>
                            <p class="sb-text sb-text-sm">x{{ item.quantity }}</p>
                          </div>
                        </router-link>
                      </div>
                      <div class="col-lg-3 text-md-right">
                        <div class="sb-price-2">
                          <span>Total:</span> AED {{ (item.price * item.quantity).toFixed(2) }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="sb-cart-total sb-cart-total-2">
                    <div class="sb-sum">
                      <div class="row">
                        <div class="col-6"><div class="sb-total-title">Subtotal:</div></div>
                        <div class="col-6">
                          <div class="sb-price-1 text-right">AED {{ (cartStore.subtotal).toFixed(2) }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="sb-sum">
                      <div class="row">
                        <div class="col-6"><div class="sb-total-title">Sgipping:</div></div>
                        <div class="col-6">
                          <div class="sb-price-1 text-right">AED {{ (shippingCost).toFixed(2) }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="sb-realy-sum">
                      <div class="row">
                        <div class="col-6"><div class="sb-total-title">Total:</div></div>
                        <div class="col-6">
                          <div class="sb-price-2 text-right">AED {{ (cartStore.subtotal + shippingCost).toFixed(2) }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> 
              </div>
            </div>
          </div>
          <!-- End Cart Summary -->
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useCartStore } from '@/stores/cart';
import api from '@/services/api';
import { useToast } from 'vue-toastification'
const toast = useToast()

const cartStore = useCartStore();

function getImageUrl(image) {
  return `${import.meta.env.VITE_MEDIA_URL || '/assets/img'}/${image}`;
}

const shippingCost = 0; // Update if you want dynamic shipping calculation

const billing = reactive({
  first_name: '',
  last_name: '',
  company: '',
  country: '',
  city: '',
  state: '',
  street: '',
  postcode: '',
  phone: '',
  email: '',
  notes: '',
  payment_method: 'Cash on delivery',
});

const billingFields = [
  { name: 'first_name', label: 'First name', type: 'text' },
  { name: 'last_name', label: 'Last name', type: 'text' },
  { name: 'company', label: 'Company name', type: 'text' },
  { name: 'country', label: 'Country', type: 'text' },
  { name: 'city', label: 'City', type: 'text' },
  { name: 'state', label: 'State / Province', type: 'text' },
  { name: 'street', label: 'Street', type: 'text' },
  { name: 'postcode', label: 'Postcode', type: 'text' },
  { name: 'phone', label: 'Phone', type: 'tel' },
  { name: 'email', label: 'Email', type: 'email' },
];

const paymentMethods = ['Direct bank transfer', 'Cash on delivery'];

const placeOrder = async () => {
  try {
    const payload = {
      total: cartStore.subtotal + shippingCost,
      order_detail: cartStore.items.map(item => ({
        id: item.id,
        name: item.title,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
      })),
      order_billing: { ...billing }, // ✅ Send as plain object
      status: 'Receiving orders',
    };

    await api.post('/orders', payload);
    cartStore.clearCart();
    alert('Order placed successfully!');
        toast.info('Thank You! Your order placed successfully!')
    
  } catch (error) {
    console.error(error.response?.data || error);
    toast.info('Error placing order.');
  }
};

</script>

