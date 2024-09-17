<template>
    <h1 class="text-center mt-16 text-4xl font-bold leading-10" style="color:#B38E60;padding-top: 100px;">
        {{ t('news.title') }}
    </h1>
    <hr class="my-4 mt-8 border-t-2 border-gray-300 dark:border-yellow-500 w-1/3 mx-auto">

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4" style="padding-bottom: 50px">
        <div v-for="news in paginatedNews" :key="news.id" class="group cursor-pointer relative" @click="viewDetails(news.id)">
            <img :src="news.image" :alt="news.title"
                class="w-full h-48 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105" />
            <div
                class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button class="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                    {{ t('buttons.learnMore') }}
                </button>
            </div>
        </div>
    </div>

    <div :style="{ direction: textDirection }" class="flex justify-center mb-11">
        <fwb-pagination v-model="currentPage" :total-pages="totalPages" show-icons></fwb-pagination>
    </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { FwbPagination } from 'flowbite-vue'
import { BASE_URL } from '@/config'

const { t, locale } = useI18n()
const router = useRouter()

const newsList = ref({})
const paginatedNews = ref([])

const currentPage = ref(1)
const totalPages = ref(1)
const itemsPerPage = 8
const selectedNews = ref(null)

const textDirection = computed(() => (locale.value === 'ar' ? 'ltr' : 'ltr'))

const fetchNews = async (page = 1) => {
    try {
        const response = await fetch(`${BASE_URL}/news?page=${page}`, {
            headers: {
                'Accept-Language': locale.value,
            },
        })
        if (!response.ok) {
            throw new Error('Failed to fetch news')
        }
        const data = await response.json()
        newsList.value[page] = data.data
        totalPages.value = data.meta.last_page
        updatePaginatedNews(page)
    } catch (error) {
        console.error('Error fetching news:', error)
    }
}

const updatePaginatedNews = (page) => {
    paginatedNews.value = newsList.value[page] || []
}

onMounted(() => {
    fetchNews(currentPage.value)
})

watch(locale, () => {
    currentPage.value = 1
    fetchNews(currentPage.value)
})

watch(currentPage, (newPage) => {
    fetchNews(newPage)
})

function viewDetails(id) {
    router.push({ name: 'news-detail', params: { id } })
}
</script>
