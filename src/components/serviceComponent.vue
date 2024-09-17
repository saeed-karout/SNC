<template>
  <section id="new-features" class="pb-8 sm:pb-10 lg:py-10">
    <div class="mx-auto sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="font-bold leading-tight text-4xl xl:text-5xl" style="color: #B99269; padding-top: 50px;">
          {{ t('services.title') }}
        </h2>
        <hr class="my-4 mt-8 border-t-2 border-gray-300 dark:border-yellow-500 w-1/3 mx-auto">
      </div>

      <div class="grid mt-10 text-center sm:mt-16 sm:grid-cols-3 md:grid-cols-4 xl:mt-24">
        <!-- عند النقر، يتم تمرير id العنصر إلى صفحة الخدمة -->
        <router-link 
          v-for="(feature, index) in features" 
          :key="feature.id" 
          :to="{ name: 'service-detail', params: { selectedFeature: feature.id } }" 
  class="p-4 flex flex-col justify-center items-center relative cursor-pointer"
          :class="getBorderClass(index)"
        >
          <Fwb-card img-alt="Desk" class="flex flex-col justify-center items-center" variant="image">
            <img :src="feature.main_image || '/path/to/default/image.jpg'" loading="lazy" class="w-[350px] h-48" style="border-radius: 15px;" alt="">
            <div class="p-5">
              <p class="mb-2 text-2xl font-bold tracking-tight text-[#304452] dark:text-[#B99269]">
                {{ feature.name }}
              </p>
            </div>
          </Fwb-card>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { BASE_URL } from '@/config';

const { t, locale } = useI18n();
const features = ref([]);

const fetchFeatures = async () => {
  try {
    const response = await fetch(`${BASE_URL}/services`, {
      headers: {
        'Accept-Language': locale.value,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch features');
    }

    const data = await response.json();
    features.value = data.data;
  } catch (error) {
    console.error('Error fetching features:', error);
  }
};

const getBorderClass = (index) => {
  return index % 2 === 0 ? 'border-blue-500' : 'border-red-500';
};

watch(locale, () => {
  fetchFeatures();
});

onMounted(() => {
  fetchFeatures();
});
</script>
