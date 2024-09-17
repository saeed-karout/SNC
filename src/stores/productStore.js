// stores/productStore.js
import { defineStore } from 'pinia';

export const useProductStore = defineStore('product', {
  state: () => ({
    selectedProduct: {
      title: 'Select a product',
      description: 'Please select a product from the sidebar.',
      thumbnail: '',
      images: [],
    },
  }),
  actions: {
    setSelectedProduct(product) {
      this.selectedProduct = product;
    },
  },
});
