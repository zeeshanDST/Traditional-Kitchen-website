<template>
    <div class="container py-5">
      <h1>Products</h1>
      
      <div v-if="loading">Loading...</div>
      
      <div v-else>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        
        <div v-else-if="products.length > 0">
          <div class="row">
            <div v-for="product in products" :key="product.id" class="col-12 col-sm-6 col-md-4 mb-4">
              <div class="card h-100">
                <div class="card-body">
                  <h5 class="card-title">{{ product.name }}</h5>
                  <p class="card-text">{{ product.description }}</p>
                  <p class="card-text text-success">{{ product.price }} PKR</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else>
          <p>No products found.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from '@/services/api';
  
  export default {
    name: 'Home',
    data() {
      return {
        products: [],
        loading: true,
        error: null, // Add error property
      };
    },
    mounted() {
      this.fetchProducts();
    },
    methods: {
      async fetchProducts() {
        try {
          const response = await api.get('/products'); // this hits Laravel
          this.products = response.data?.data || []; // Fallback to an empty array if data is undefined
          this.error = null; // Clear any previous error
        } catch (error) {
          console.error('Error fetching products:', error);
          this.error = 'Failed to load products. Please try again later.';
          this.products = [];
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
