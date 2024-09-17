<script setup>
    import { ref, onMounted , watch } from 'vue';
    import axios from 'axios';
    import {  Carousel  } from 'flowbite';
    import {  useI18n} from 'vue-i18n';
    const {  t,  locale } = useI18n();

    // Define refs to hold carousel data
    const carouselItems = ref([]);
    const carouselIndicators = ref([]);
    import {  BASE_URL } from '@/config';

    // Fetch the latest 5 news items
    async function fetchCarouselData() {
    try {
            // Fetch data from API
            const response = await axios.get(`${BASE_URL}/news`, {
                headers: {
                    'Accept-Language': locale.value,
                },
            });
            let data = response.data.data; // Accessing the 'data' field from API response

            // Sort data by date (optional step to ensure it's sorted)
            data.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Take only the last 5 items
            data = data.slice(0, 5);

            // Populate carouselItems from API data
            carouselItems.value = data.map(item => ({
                id: item.id,
                imageUrl: item.image,
                description: item.description,
                title: item.title,
                subtitle: item.subtitle
            }));

            // Populate carouselIndicators - this example assumes you want one indicator per item
            carouselIndicators.value = data.map((item, index) => ({
                position: index,
                id: `carousel-indicator-${item.id}`
            }));

        } catch (error) {
            console.error('Failed to fetch carousel data', error);
        }
}

    onMounted(() => {
        fetchCarouselData().then(() => {
            const carouselElement = document.getElementById('carousel-example');

            const items = carouselItems.value.map((item, index) => ({
                position: index,
                el: document.getElementById(`carousel-item-${item.id}`)
            }));

            const indicators = carouselIndicators.value.map((indicator) => ({
                position: indicator.position,
                el: document.getElementById(indicator.id)
            }));

            const options = {
                defaultPosition: 0,
                interval: 3000,
                indicators: {
                    activeClasses: 'bg-dark dark:bg-gray-800',
                    inactiveClasses: 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
                    items: indicators
                },
                onNext: () => {
                    // console.log('next slider item is shown');
                },
                onPrev: () => {
                    // console.log('previous slider item is shown');
                },
                onChange: () => { // console.log('new slider item has been shown');
                }
            };

            if (carouselElement) {
                const carousel = new Carousel(carouselElement, items, options);

                carousel.cycle();

                // Set event listeners for prev and next buttons
                const prevButton = document.getElementById('data-carousel-prev');
                const nextButton = document.getElementById('data-carousel-next');

                prevButton.addEventListener('click', () => {
                    carousel.prev();
                });

                nextButton.addEventListener('click', () => {
                    carousel.next();
                });
            }
        });
    });
    watch(locale, () => {
        fetchCarouselData();
    });
</script>

<template>
    <div class="my-20">
        <h1 class="text-center mt-15 text-5xl font-bold leading-10 text-primary">
            {{ t('news.title') }}
        </h1>
        <hr class="my-4 mt-8 border-t-2 border-gray-300 dark:border-yellow-500 w-1/3 mx-auto">

        <div class="mx-auto">
            <div id="carousel-example" class="relative">
                <div class="relative overflow-hidden rounded-lg" style='height: 80vh;'>
                    <!-- Carousel items -->
                    <template v-for="item in carouselItems" :key="item.id">
                        <div :id="`carousel-item-${item.id}`" class="hidden duration-700 ease-in-out">
                            <img :src="item.imageUrl" loading="lazy"
                                class="absolute bg-contain h-auto block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                alt="carousel image">
                            <div
                                class="absolute bottom-1 bg-black bg-opacity-50 text-white text-center w-full p-8 mb-10">
                                <h2 class="text-2xl font-bold">{{ item . title }}</h2>
                                <!-- <p>{{ item . subtitle }}</p> -->
                            </div>
                        </div>
                    </template>
                </div>
                <!-- Carousel indicators -->
                <div class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                    <template v-for="indicator in carouselIndicators" :key="indicator.id">
                        <button :id="indicator.id" type="button" class="w-3 h-3 rounded-full" aria-current="true"
                            :aria-label="`Slide ${indicator.position}`"></button>
                    </template>
                </div>
                <!-- Slider controls -->
                <button id="data-carousel-prev" type="button"
                    class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                    <span
                        class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-black/30 dark:text-secondaryDark group-hover:bg-white/50 dark:group-hover:bg-secondaryDark group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg class="w-5 h-5 text-white sm:w-6 sm:h-6" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7">
                            </path>
                        </svg>
                        <span class="hidden">Previous</span>
                    </span>
                </button>
                <button id="data-carousel-next" type="button"
                    class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                    <span
                        class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-black/30 dark:secondaryDark group-hover:bg-white/50 dark:group-hover:bg-secondaryDark group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg class="w-5 h-5 text-white sm:w-6 sm:h-6" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7">
                            </path>
                        </svg>
                        <span class="hidden">Next</span>
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>
