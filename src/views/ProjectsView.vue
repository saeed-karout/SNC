<template>
  <div class="container mx-auto p-4 max-w-7xl">
    <h1 class="font-bold mb-4 text-center text-4xl text-primary py-5">
      {{ t(`projects.title`) }}
    </h1>

   

    <!-- رسالة الخطأ في حال حدوثه -->
    <div v-if="error" class="text-center my-8">
      <p class="text-red-600">Error fetching projects: {{ error }}</p>
    </div>

    <!-- Grid للمشاريع -->
    <div v-if="!loading && !error" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="project in projects"
        :key="project.id"
        :class="['rounded-lg shadow-xl my-4 p-4 bg-white dark:bg-secondaryDark', { 'is-active': isActiveProject(project.id) }]">

        <!-- عنصر تحميل الصورة -->
        <div v-if="isImageLoading[project.id]" class="flex justify-center items-center h-56">
          <div class="rounded-md h-12 w-12 border-4 border-t-4 border-secondary animate-spin"></div>
        </div>

        <!-- صورة المشروع -->
        <img v-show="!isImageLoading[project.id]" :src="project.main_image" alt="Project image" class="w-full h-56 object-contain mb-4"
          @load="handleImageLoad(project.id)" @error="handleImageError(project.id)"
          loading="lazy">

        <div class="flex items-center justify-between self-center">
          <!-- اسم المشروع -->
          <h2 class="text-2xl font-bold mb-2 dark:text-white opacity-75">{{ project.name }}</h2>
          <!-- زر عرض التفاصيل -->
          <router-link :to="'/projects/' + project.id" class="text-primary dark:text-primary hover:underline hover:text-gray-dark">
            {{ t(`projects.view`) }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { BASE_URL } from '@/config';
import { useI18n } from 'vue-i18n';
import LandingScreen from '@/components/master/LandingScreen.vue';

const { t ,locale } = useI18n();
const projects = ref([]);
const loading = ref(true); // حالة التحميل
const error = ref(null); // حالة الخطأ
const route = useRoute(); // للوصول إلى route الحالي
const isImageLoading = ref({}); // حالة تحميل لكل صورة

// دالة لجلب المشاريع
async function fetchProjects() {
  loading.value = true;
  try {
    const response = await fetch(`${BASE_URL}/projects`, {
      headers: {
        'Accept-Language': locale.value,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    projects.value = data.data;
    
    // تهيئة حالات تحميل الصور لكل مشروع
    isImageLoading.value = projects.value.reduce((acc, project) => {
      acc[project.id] = true;
      return acc;
    }, {});
  } catch (err) {
    console.error('Error fetching projects:', err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

// دالة التعامل مع تحميل الصورة
function handleImageLoad(projectId) {
  isImageLoading.value[projectId] = false;
}

// دالة التعامل مع خطأ تحميل الصورة
function handleImageError(projectId) {
  isImageLoading.value[projectId] = false;
}

// التحقق من المشروع النشط
function isActiveProject(projectId) {
  return projectId === Number(route.params.id); // مقارنة معرف المشروع مع الـroute
}

// جلب المشاريع عند تحميل الصفحة
onMounted(() => {
  fetchProjects();
});

watch([locale, route], () => {
  fetchProjects(); // جلب المشاريع عند تغيير اللغة أو الرابط
});

</script>

<style scoped>
/* تنسيقات الصفحة الرئيسية */
.container {
  margin-top: 100px;
}

/* تعديل عرض Grid للتوافق مع الشاشات الصغيرة */
.grid {
  display: grid;
  gap: 20px;
  margin-bottom: 50px;
}

/* تحديد المشروع النشط */
.is-active {
  background-color: #b99269; /* لون المشروع النشط */
  color: white;
}
</style>
