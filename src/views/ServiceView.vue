<template>
  <div class="flex hv-70 flex-col lg:flex-row mt-24 ">
    <Sidebar @select-service="handleServiceSelect" :activeProduct="selectedProductId" />
    <MainContent :selectedProduct="selectedProduct" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Sidebar from '@/components/services/SidebarCom.vue';
import MainContent from '@/components/services/MainContentCom.vue';
import { BASE_URL } from '@/config.js';

const route = useRoute(); // للحصول على المعرف من المسار
const { locale } = useI18n();

const selectedProduct = ref(null);
const selectedProductId = ref(route.params.selectedFeature || null);

// دالة لجلب تفاصيل العنصر بناءً على المعرف
const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/services/${id}`, {
      headers: {
        'Accept-Language': locale.value, // استخدام اللغة الحالية في الطلب
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch the product');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

// جلب بيانات العنصر عند تحميل الصفحة
onMounted(async () => {
  if (selectedProductId.value) {
    selectedProduct.value = await fetchProductById(selectedProductId.value);
  }
});

// تحديث البيانات عند تغيير معرف العنصر في الـ route
watch(() => route.params.selectedFeature, async (newFeatureId) => {
  if (newFeatureId) {
    selectedProductId.value = newFeatureId;
    selectedProduct.value = await fetchProductById(newFeatureId);
  }
});

// إعادة جلب البيانات عند تغيير اللغة
watch(() => locale.value, async () => {
  if (selectedProductId.value) {
    selectedProduct.value = await fetchProductById(selectedProductId.value);
  }
});

// معالجة التحديد من القائمة الجانبية
const handleServiceSelect = async (product) => {
  selectedProduct.value = product;
  selectedProductId.value = product.id;
};
</script>
