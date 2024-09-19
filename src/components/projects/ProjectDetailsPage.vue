<script setup>
    import {
        ref,
        onMounted,
        watch
    } from 'vue';
    import {
        useRoute,
        useRouter
    } from 'vue-router';
    import LandingScreen from '../master/LandingScreen.vue';
    import {
        BASE_URL
    } from '@/config';
    import {
        useI18n
    } from 'vue-i18n';

    const allProjects = ref([]);
    const selectedProject = ref(null);
    const selectedProjectId = ref(null);
    const selectedImage = ref(null);
    const isFullscreen = ref(false);
    const isSidebarVisible = ref(false); // حالة إظهار/إخفاء الـ Sidebar
    const screenWidth = ref(window.innerWidth);
    const loading = ref(true); // حالة التحميل

    const route = useRoute();
    const router = useRouter();
    const {
        locale,
        t
    } = useI18n();

    const isImageLoading = ref(true); // حالة تحميل الصورة

    window.addEventListener('resize', () => {
        screenWidth.value = window.innerWidth;
    });

    async function fetchProjects() {
        loading.value = true;
        try {
            const response = await fetch(`${BASE_URL}/projects`, {
                headers: {
                    'Accept-Language': locale.value,
                },
            });
            const data = await response.json();
            allProjects.value = data.data;
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            loading.value = false;
        }
    }

    async function goToProject(projectId) {
        selectedProjectId.value = projectId;
        loading.value = true;
        try {
            const response = await fetch(`${BASE_URL}/projects/${projectId}`, {
                headers: {
                    'Accept-Language': locale.value,
                },
            });
            const data = await response.json();
            selectedProject.value = data.data;
            selectedImage.value = selectedProject.value.images ? selectedProject.value.images[0] : null;
            router.push(`/projects/${projectId}`);
        } catch (error) {
            console.error('Error fetching project details:', error);
        } finally {
            loading.value = false;
            isSidebarVisible.value = false; // إغلاق الـ Sidebar بعد اختيار مشروع
        }
    }

    function toggleSidebar() {
        isSidebarVisible.value = !isSidebarVisible.value;
    }

    // عند اختيار صورة جديدة من الصور المصغرة
    function selectImage(image) {
        selectedImage.value = image;
        isImageLoading.value = true; // إعادة ضبط حالة التحميل عند اختيار صورة جديدة
    }

    function toggleFullscreen() {
        isFullscreen.value = !isFullscreen.value;
    }

    function prevImage() {
        const index = selectedProject.value.images.indexOf(selectedImage.value);
        if (index > 0) {
            selectedImage.value = selectedProject.value.images[index - 1];
        }
    }

    function nextImage() {
        const index = selectedProject.value.images.indexOf(selectedImage.value);
        if (index < selectedProject.value.images.length - 1) {
            selectedImage.value = selectedProject.value.images[index + 1];
        }
    }

    onMounted(async () => {
        await fetchProjects();
        const projectId = route.params.id;
        if (projectId) {
            goToProject(projectId);
        }
    });

    watch(() => route.params.id, (newId) => {
        if (newId) {
            goToProject(newId);
        }
    });

    watch(locale, () => {
        fetchProjects();
        if (selectedProjectId.value) {
            goToProject(selectedProjectId.value);
        }
    });
</script>

<template>
    <div class="flex">
        <button @click="toggleSidebar" class="custom-btn" :class="{ 'is-sidebar-closed': !isSidebarVisible }">
            <div class="flex flex-col items-center">
                <font-awesome-icon icon="fa-solid fa-trowel" class="fa-icon" />
                <p class="hidden md:block">{{ t(`projects.title`) }}</p>
            </div>
        </button>

        <!-- Sidebar لعرض قائمة المشاريع -->
        <div
            :class="['fixedSidebar top-0 left-0 h-full bg-white dark:bg-secondaryDark text-white p-4 transition-transform',
                { 'transform translate-x-0 ': isSidebarVisible, 'transform -translate-x-full': !isSidebarVisible }
            ]">
            <h2 class="text-4xl font-bold my-10 text-center text-primary">{{ t(`projects.title`) }}</h2>
            <nav class="space-y-4">
                <button v-for="project in allProjects" :key="project.id" @click="goToProject(project.id)"
                    :class="['w-full p-4 rounded-lg text-center bg-secondary opacity-45',
                        selectedProjectId.value === project.id ?
                        'bg-gray-400 text-white' :
                        'bg-gray-700 hover:bg-gray-600'
                    ]">
                    {{ project . name }}
                </button>
            </nav>
        </div>

        <!-- Container يعرض تفاصيل المشروع -->
        <div class="flex-1 p-4 lg:p-8 mt-8 lg:mt-18">
            <div v-if="loading" class="flex justify-center items-center h-full">
                <div class="text-xl font-semibold">
                    <LandingScreen />
                </div>
            </div>

            <div v-else-if="selectedProject"
                class="project-box mx-auto p-6 bg-white dark:bg-secondaryDark rounded-lg shadow-md max-w-4xl lg:max-w-6xl">
                <h2 class="text-3xl lg:text-4xl font-bold text-[#B99269] text-center mb-16">{{ selectedProject . name }}
                </h2>

                <div class="flex flex-col lg:flex-row gap-4 lg:gap-8 items-center">
                    <!-- Main Image -->
                    <div class="flex-1 relative">
                        <div class="cursor-pointer" @click="toggleFullscreen">
                            <!-- عنصر تحميل الصورة -->
                            <div v-if="isImageLoading"
                                class="rounded-md h-12 w-12 border-4 border-t-4 border-secondary animate-spin absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            </div>

                            <!-- صورة المشروع الرئيسية -->
                            <img v-if="selectedImage" :src="selectedImage" loading="lazy" :alt="selectedProject.name"
                                class="w-full h-[300px] lg:h-[500px] object-cover rounded-lg shadow-lg"
                                @load="isImageLoading = false" @error="isImageLoading = false"
                                @loadstart="isImageLoading = true" />
                        </div>

                        <!-- الصور المصغرة -->
                        <div class="mt-4 flex flex-wrap gap-2">
                            <img v-for="(image, index) in selectedProject.images" :key="index"
                                :src="image" :alt="`${selectedProject.name} - ${index + 1}`"
                                @click="selectImage(image)"
                                :class="{ 'border-2 border-[#B99269]': selectedImage === image }"
                                class="w-16 h-16 lg:w-24 lg:h-24 object-cover rounded-md cursor-pointer transition-transform transform hover:scale-105"
                                loading="lazy" @load="isImageLoading = false" @error="isImageLoading = false"
                                @loadstart="isImageLoading = true" />
                        </div>
                    </div>

                    <!-- Project Description -->
                    <div class="flex-1 flex-col max-w-lg">
                        <p class="dark:text-white leading-relaxed mb-6">{{ selectedProject . description }}</p>

                        <div class="flex flex-col gap-4">
                            <hr class="border-b border-[#6F7782] dark:border-yellow-500 w-full mb-4">
                            <div class="flex flex-row lg:flex-row justify-between " style="align-items: normal;">
                                <div class="text-center">
                                    <h3 class="text-lg dark:text-white font-semibold opacity-75">
                                        {{ t(`projects.start`) }}</h3>
                                    <p class="text-sm dark:text-white">{{ selectedProject . starting_date }}</p>
                                </div>
                                <div class="text-center">
                                    <h3 class="text-lg dark:text-white font-semibold opacity-75">{{ t(`projects.end`) }}
                                    </h3>
                                    <p class="text-sm dark:text-white">{{ selectedProject . ending_date }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Fullscreen Image View -->
            <div v-if="isFullscreen" class="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
                style="z-index: 1000;" @click.self="toggleFullscreen">
                <img :src="selectedImage" alt="Fullscreen Image"
                    class="max-w-[95%] max-h-[95%] rounded-lg shadow-lg" />
                <button class="absolute top-4 right-4 bg-transparent text-white text-3xl font-bold"
                    @click="toggleFullscreen">×</button>
                <button
                    class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-70 text-white text-3xl font-bold px-2 py-1"
                    @click="prevImage" style="direction: ltr;">❮</button>
                <button
                    class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-70 text-white text-3xl font-bold px-2 py-1"
                    @click="nextImage" style="direction: ltr;">❯</button>
            </div>
        </div>
    </div>
</template>


<style scoped>
    /* Fullscreen Image View */
    .fullscreen-image {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999999999999999;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .fullscreen-image img {
        max-width: 95%;
        max-height: 95%;
        border-radius: 8px;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    }

    /* Sidebar تنسيقات */
    .fixedSidebar {
        position: fixed;
        top: 10%;
        left: 0;
        height: 90vh;
        width: 16rem;
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
        z-index: 50;
        overflow-y: auto;
        --sb-track-color: #34505d;
        --sb-thumb-color: #314351;
        --sb-size: 5px;
    }

    .fixedSidebar::-webkit-scrollbar {
        width: var(--sb-size);
    }

    .fixedSidebar::-webkit-scrollbar-track {
        background: var(--sb-track-color);
        border-radius: 10px;
    }

    .fixedSidebar::-webkit-scrollbar-thumb {
        background: var(--sb-thumb-color);
        border-radius: 10px;
        border: 8px solid #c7a887;
    }

    @supports not selector(::-webkit-scrollbar) {
        .fixedSidebar {
            scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
        }
    }

    :root {
        --sb-track-color: #c7a887;
        --sb-thumb-color: #314351;
        --sb-size: 5px;
    }

    /* زر فتح وإغلاق الـ Sidebar */
    button {
        border: none;
        cursor: pointer;
        padding: 0.5rem 0.75rem;
    }

    button:hover {
        opacity: 0.9;
    }

    button.is-sidebar-closed {
        padding: 0.5rem;
        position: fixed;
        top: 15%;
        left: 4%;
        z-index: 100;
        background-color: #BB936A;
        color: white;
        border-radius: 20px;
        text-align: center;
    }

    .project-box {
        box-shadow: 1px 3px 35px 0px #293340;
        padding: 20px;
        margin-top: 100px;
        margin-bottom: 50px;
    }

    .dark .project-box {
        box-shadow: 1px 3px 35px 0px #BB936A;
    }

    button.active {
        background-color: #4a4a4a;
        color: white;
    }

    .custom-btn {
        position: fixed;
        top: 16px;
        left: 16px;
        width: 100px;
        height: 50px;
        border-radius: 8px;
        font-size: 18px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        z-index: 50;
    }

    .fa-icon {
        font-size: 24px;
        margin-bottom: 5px;
    }

    /* شاشات الجوال */
    @media (max-width: 768px) {
        .custom-btn {
            width: 50px;
            height: 50px;
        }

        .fa-icon {
            font-size: 20px;
        }
    }

    /* شاشات العرض الكبيرة */
    @media (min-width: 768px) {
        .custom-btn {
            width: 120px;
            height: 70px;
            left: 16px;
            top: 16px;
        }

        .fa-icon {
            font-size: 28px;
        }
    }

    /* عنصر تحميل الصورة */
    img {
        position: relative;
    }
</style>
