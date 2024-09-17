<template>
  <div class="sidebar sticky top-8 flex flex-col items-center justify-start h-auto w-full lg:w-64 px-3 py-5 text-[#B99269]">
    <div class="services-title p-4 text-3xl font-bold mb-6">
      {{ t('services.title') }}
    </div>
    <nav class="w-full space-y-4">
      <button
        v-for="product in products"
        :key="product.id"
        @click="selectService(product)"
        :class="[
          'w-full p-4 rounded-lg opacity-80 transition-colors duration-300',
          activeProduct === product.id ? 'bg-gray-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-[#B99269]'
        ]"
      >
        {{ product.name }}
      </button>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineEmits } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { BASE_URL } from '@/config';
const { t, locale } = useI18n(); // Include locale to get the current language
const products = ref([]);
const activeProduct = ref(null);
const route = useRoute();
const router = useRouter();
const emit = defineEmits(['select-service']);

const fetchProducts = async () => {
  try {
    const currentLanguage = locale.value; // Get the current language
    const response = await axios.get(`${BASE_URL}/services`, {
      headers: {
        'Accept-Language': currentLanguage === 'ar' ? 'ar' : 'en', // Use current language
      },
    });
    products.value = response.data.data;

    // Set active product based on route parameter
    if (route.params.selectedFeature) {
      activeProduct.value = parseInt(route.params.selectedFeature, 10);
    } else if (products.value.length > 0) {
      activeProduct.value = products.value[0].id;
      emit('select-service', products.value[0]);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

const selectService = (product) => {
  activeProduct.value = product.id;
  emit('select-service', product);

  // Update the route with the selected product ID
  router.push({ name: 'service-detail', params: { selectedFeature: product.id } });
};

// Initial fetch
onMounted(() => {
  fetchProducts();
});

// Refetch data when language changes
watch(() => locale.value, () => {
  fetchProducts(); // Refetch data on language change
});

// Watch route parameter for selected feature
watch(() => route.params.selectedFeature, (newVal) => {
  if (newVal) {
    activeProduct.value = parseInt(newVal, 10);
  }
});
</script>

<style scoped>
/* Additional styles for sticky sidebar */
.sidebar {
  position: -webkit-sticky; /* For Safari */
  position: sticky;
  top: 80px;
  align-self: flex-start;
}

@media (max-width:1000px) {
    .sidebar{
      position: relative;
      top: 0px;
    }
}
</style>
