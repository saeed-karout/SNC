<template>
  <div ref="statisticsSection" class="statistics-section py-16 text-black dark:text-white">
    <div class="container mx-auto">
      <h1 class="text-center mt-10 text-5xl font-bold text-[#B38E60]">{{ t('Statistics.title') }}</h1>
      <hr class="my-4 mt-8 border-t-2 w-1/3 mx-auto border-gray-300 dark:border-yellow-500 mb-12">
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
        <div v-for="stat in statistics" :key="stat.labelKey" class="stat-item">
          <div v-if="stat.type === 'icon'" class="icon-container mb-4">
            <FontAwesomeIcon :icon="stat.icon" class="text-5xl text-[#304452] dark:text-[#476072]" />
          </div>
          <p class="text-5xl font-extrabold counter opacity-70">{{ stat.currentValue }}</p>
          <p class="text-xl font-medium mt-2 text-[#B99269]">{{ t(stat.labelKey) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHouseLaptop, faBuilding, faMoneyBillTrendUp, faCheck } from '@fortawesome/free-solid-svg-icons';

const { t } = useI18n();

const statistics = ref([
  { labelKey: 'Statistics.offices', value: 2500, currentValue: 0, icon: faHouseLaptop, type: 'icon' },
  { labelKey: 'Statistics.builtUpArea', value: 1200, currentValue: 0, icon: faBuilding, type: 'icon' },
  { labelKey: 'Statistics.plotArea', value: 1500, currentValue: 0, icon: faMoneyBillTrendUp, type: 'icon' },
  { labelKey: 'Statistics.projectsCompleted', value: 2500, currentValue: 0, icon: faCheck, type: 'icon' }
]);

const statisticsSection = ref(null);

const countUp = (stat) => {
  const duration = 2000; // Fixed duration
  const stepTime = duration / stat.value;
  let current = 0;

  const updateCounter = () => {
    current += 1;
    stat.currentValue = Math.min(current, stat.value);
    if (current < stat.value) {
      setTimeout(updateCounter, stepTime); // Use setTimeout to reduce pressure
    }
  };

  updateCounter();
};

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statistics.value.forEach(countUp);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  if (statisticsSection.value) observer.observe(statisticsSection.value);
});
</script>

<style scoped>
.statistics-section {
  padding-top: 4rem;
  padding-bottom: 4rem;
  direction: ltr;
}

.stat-item {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  will-change: transform;
}

.icon-container {
  width: 100px;
  padding: 1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.counter {
  margin-top: 15px;
}
</style>
