<template>
    <div v-if="news">
        <div
            class="news my-32 dark:bg-[#293340] bg-[#FFFFFD] flex flex-col mx-auto gap-7  px-4 sm:px-6 lg:px-8 items-center max-w-[1200px]">
            <h1 class="text-2xl sm:text-3xl md:text-4xl text-primary my-7">{{ news . title }}</h1>
            <!-- تعديل طريقة عرض الصورة لاستخدام الفئات المتجاوبة -->
            <div class="w-full flex flex-col items-center justify-center">
                <img class="w-full max-w-xl sm:max-w-sm md:max-w-lg lg:max-w-4xl" loading="lazy" :src="news.image"
                    :alt="news.title">
                <p class="self-center dark:text-white opacity-70 text-sm sm:text-base lg:max-w-3xl mt-2">
                    {{ news . date }}</p>
            </div>
            <p
                class="text-lg sm:text-xl md:text-2xl text-secondary dark:text-white opacity-90 max-w-[600px] text-center mt-4">
                {{ news . subtitle }}</p>
            <p class="text-sm sm:text-base md:text-lg max-w-[800px] dark:text-white opacity-50 text-center mt-2">
                {{ news . description }}</p>
        </div>
    </div>

    <!-- يمكنك إضافة تحميل مؤقت حتى تظهر البيانات -->
    <div v-else>
        <div>
            <LandingScreen />
        </div>
    </div>
</template>


<script setup>
    import LandingScreen from './master/LandingScreen.vue';
    import {
        ref,
        onMounted,
        watch
    } from 'vue'
    import {
        useRoute
    } from 'vue-router'
    import {
        BASE_URL
    } from '@/config'
    import {
        useI18n
    } from 'vue-i18n'

    const news = ref(null) // هنا ستبدأ البيانات بقيمة null
    const route = useRoute()
    const {
        locale
    } = useI18n() // جلب اللغة الحالية

    // دالة لجلب البيانات
    const fetchData = async () => {
        const newsId = route.params.id
        try {
            const response = await fetch(`${BASE_URL}/news/${newsId}`, {
                headers: {
                    'Accept-Language': locale.value,
                }
            })

            if (!response.ok) throw new Error('Failed to fetch news details.')

            const data = await response.json()
            news.value = data.data
        } catch (error) {
            console.error('Error fetching news:', error)
        }
    }

    // جلب البيانات عند تحميل المكون
    onMounted(fetchData)

    // مراقبة تغيير اللغة وإعادة جلب البيانات
    watch(locale, () => {
        fetchData()
    })
</script>
<style scoped>
    .news {
        box-shadow: 1px 3px 35px 0px #293340;
        padding: 20px;
        /* تقليل padding للتوافق مع الموبايل */
        text-align: center;
    }

    .dark .news {
        box-shadow: 1px 3px 35px 0px #BB936A;
    }

    /* تخصيص حواف ومسافات أكبر لشاشات الموبايل */
    @media (max-width: 640px) {
        .news {
            border-radius: 5px;
            padding: 10px;
            margin: 110px 14px;
        }
    }
</style>
