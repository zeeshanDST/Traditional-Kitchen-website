// stores/cart.js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  getters: {
  isInCart: (state) => {
    return (productId) => state.items.some(item => item.id === productId)
  },
  totalItems: (state) => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  },
  totalPrice: (state) => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  },
  subtotal: (state) =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
},
  actions: {
     incrementItem(id) {
      const item = this.items.find(i => i.id === id)
      if (item) item.quantity++
    },
    decrementItem(id) {
      const item = this.items.find(i => i.id === id)
      if (item && item.quantity > 1) item.quantity--
    },
    removeItem(id) {
      this.items = this.items.filter(i => i.id !== id)
    },
    addToCart(product) {
      const existingItem = this.items.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
    },

    removeFromCart(productId) {
      this.items = this.items.filter(item => item.id !== productId)
    },
    clearCart() {
      this.items = [];
      this.subtotal = 0;
    },
  },

  persist: {
    enabled: true,
    storage: sessionStorage,
  }
})

