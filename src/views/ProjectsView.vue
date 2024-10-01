<template>
    <div class="container mx-auto p-4 max-w-7xl">
        <h1 class="font-bold mb-4 text-center text-4xl text-primary py-5">
            {{ t('projects.title') }}
        </h1>

        <!-- رسالة الخطأ في حال حدوثه -->
        <div v-if="error" class="text-center my-8">
            <p class="text-red-600">Error fetching projects: {{ error }}</p>
        </div>

        <!-- Grid للمشاريع -->
        <div v-if="!loading && !error" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="project in visibleProjects" :key="project.id"
                :class="['rounded-lg shadow-xl my-4 p-4 bg-white dark:bg-secondaryDark', { 'is-active': isActiveProject(project
                        .id) }]">
                <!-- عرض الدوار أثناء تحميل الصورة -->
                <div v-if="isImageLoading[project.id]" class="flex justify-center items-center h-56">
                    <div class="rounded-md h-12 w-12 border-4 border-t-4 border-secondary animate-spin"></div>
                </div>

                <!-- عرض الصورة عند تحميلها -->
                <img v-else :src="project.main_image" alt="Project image" class="w-full h-56 object-contain mb-4"
                    @load="handleImageLoad(project.id)" @error="handleImageError(project.id)" loading="lazy">

                <div class="flex items-center justify-between self-center">
                    <!-- اسم المشروع -->
                    <h2 class="text-xl font-bold mb-2 dark:text-white opacity-75 flex-shrink-0 w-3/4">
                        {{ project . name }}
                    </h2>
                    <!-- زر عرض التفاصيل -->
                    <router-link :to="'/projects/' + project.id"
                        class="text-primary dark:text-primary hover:underline hover:text-gray-dark text-lg flex-shrink-0 w-1/4">
                        {{ t('projects.view') }}
                    </router-link>
                </div>

            </div>
        </div>

        <!-- زر عرض المزيد -->
        <div v-if="!loading && visibleProjects.length < projects.length" class="text-center mt-6">
            <button @click="showMoreProjects" class="px-4 text-xl py-2 bg-primary text-white rounded-lg hover:bg-secondary">
                {{ t('aboutUs.show.showMore') }}
            </button>
        </div>
    </div>
</template>

<script setup>
    import {
        ref,
        onMounted,
        watch,
        computed
    } from 'vue';
    import {
        useRoute
    } from 'vue-router';
    import {
        BASE_URL
    } from '@/config';
    import {
        useI18n
    } from 'vue-i18n';

    const {
        t,
        locale
    } = useI18n();
    const projects = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const route = useRoute();
    const isImageLoading = ref({});
    const visibleProjectsCount = ref(9);

    // عرض المشاريع المرئية فقط
    const visibleProjects = computed(() => projects.value.slice(0, visibleProjectsCount.value));

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

            // تعيين حالة تحميل الصور لكل مشروع
            projects.value.forEach((project) => {
                isImageLoading.value[project.id] = true; // تعيين حالة تحميل الصورة إلى true عند البدء
            });

            // تحميل الصور مسبقًا
            await Promise.all(projects.value.map(project => preloadImage(project.main_image, project.id)));

        } catch (err) {
            console.error('Error fetching projects:', err);
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    }

    // دالة لتحميل الصور مسبقًا
    function preloadImage(url, projectId) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                handleImageLoad(projectId); // تحديث حالة تحميل الصورة عند نجاح التحميل
                resolve();
            };
            img.onerror = () => {
                handleImageError(projectId); // التعامل مع الخطأ إذا لم تتمكن الصورة من التحميل
                reject();
            };
        });
    }

    // دالة التعامل مع تحميل الصورة بنجاح
    function handleImageLoad(projectId) {
        isImageLoading.value[projectId] = false; // تعيين حالة تحميل الصورة إلى false عند اكتمال التحميل
    }

    // دالة التعامل مع خطأ تحميل الصورة
    function handleImageError(projectId) {
        isImageLoading.value[projectId] = false; // تعيين حالة تحميل الصورة إلى false في حال حدوث خطأ
    }

    // التحقق من المشروع النشط
    function isActiveProject(projectId) {
        return projectId === Number(route.params.id);
    }

    // دالة عرض المزيد من المشاريع
    function showMoreProjects() {
        visibleProjectsCount.value += 9;
    }

    // جلب المشاريع عند تحميل الصفحة
    onMounted(() => {
        fetchProjects();
    });

    // جلب المشاريع عند تغيير اللغة أو الرابط
    watch([locale, route], () => {
        fetchProjects();
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
        background-color: #b99269;
        color: white;
    }
</style>
