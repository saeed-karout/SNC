<template>
    <div class="tem relative overflow-hidden bg-white-100 mt-12 pt-16  pb-32 space-y-24  ">
        <div class="relative">
            <h1 class="text-center my-5 text-4xl font-bold leading-tight" style="color:#B38E60;">

                {{ t('aboutUs.title') }}
            </h1>
            <hr class="my-4 mt-8 border-t-2 border-gray-300 dark:border-yellow-500 w-1/3 mx-auto">
            <div class="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8 ">
                <div class="mx-auto max-w-xl px-6 lg:mx-0  lg:py-16 lg:px-0 ">

                    <div
                        :class="{ 'text-start': currentLanguage === 'EN', 'text-end': currentLanguage === 'AR' }">
                        <h2 class="text-3xl font-bold tracking-tight text-dark dark:text-[#B99269]">
                            {{ t('aboutUs.section1.title') }}
                        </h2>

                        <div>
                            <!-- <p class="mt-4 text-lg text-gray-800 dark:text-white overflow-hidden transition-all duration-300"
                                :class="{ 'max-h-32': !showMore, 'max-h-full': showMore }" ref="textContent">
                                {{ t('aboutUs.section1.content') }}
                            </p>


                            <p class="text-3xl font-bold tracking-tight text-dark dark:text-[#B99269] my-4"> -->
                                <!-- زر "مشاهدة المزيد" -->
                                <!-- <div class="my-6" v-if="isOverflowing">
                                <button
                                    class="inline-flex rounded-lg bg-slate-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-amber-600 hover:bg-slate-600 hover:text-amber-200"
                                    @click="toggleShowMore">
                                    {{ showMore ? t(`aboutUs.show.showLess`) : t(`aboutUs.show.showMore`) }}
                                </button>
                            </div> -->
                            <div class="relative">
                                <p class="text-xl text-gray-800 dark:text-white text-content"
                                    :class="{ expanded: showMore }" ref="textContent">
                                    {{ t('aboutUs.section1.content') }}
                                </p>

                                <div class="my-6" v-if="isOverflowing">
                                    <button
                                        class="inline-flex rounded-lg bg-secondary px-4 py-1.5 text-base font-semibold leading-7 dark:text-primary text-white shadow-sm ring-1 hover:text-primary  dark:hover:text-secondary dark:hover:bg-gray-600 "
                                        @click="toggleShowMore">
                                        {{ showMore ? t(`aboutUs.show.showLess`) : t(`aboutUs.show.showMore`) }}
                                    </button>
                                </div>
                            </div>
                            <h2 class="text-3xl font-bold tracking-tight text-dark mb-2x dark:text-[#B99269]">

                                {{ t('aboutUs.section1.subtitle') }}
                            </h2>
                           

                            <p class="text-2xl font-semibold text-gray-800 dark:text-white">
                                {{ t('aboutUs.section1.name') }}
                            </p>
                        </div>
                    </div>

                    <hr class="my-4 mt-8 border-b-2 border-gray-300 dark:border-yellow-500 w-1/3 mx-auto">
                </div>

                <div class="mt-12 sm:mt-16 lg:mt-0">
                    <div class=" pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                        <img class="w-full rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0  lg:w-auto"
                            src="../assets/mr.webp" loading="lazy" />
                    </div>
                </div>

            </div>



        </div>



        <div class="relative">
            <div class="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8 ">
                <div class="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 lg:col-start-2">
                    <div>
                        <div>

                        </div>
                        <div
                            :class="{ 'text-start': currentLanguage === 'EN', 'text-end': currentLanguage === 'AR' }">
                            <h2 class="text-3xl font-bold tracking-tight text-dark dark:text-[#B99269]">
                                {{ t('aboutUs.section2.title') }}
                            </h2>
                            <p class="mt-4 text-xl text-gray-800 dark:text-white">


                                {{ t('aboutUs.section2.content') }}
                            </p>

                        </div>
                        <hr class="my-4 mt-8 border-b-2 border-gray-300 dark:border-yellow-500 w-1/3 mx-auto">
                    </div>
                </div>
                <div class="mt-12 sm:mt-16 lg:mt-0">
                    <div class=" pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                        <img alt="Inbox user interface" loading="lazy" width="647" height="500"
                            class="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-90 lg:w-auto "
                            src="../assets/first.webp">
                    </div>
                </div>
            </div>
        </div>



        <div class="relative">
            <div class="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8 ">
                <div class="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 ">
                    <div>
                        <div class="text-end">

                        </div>
                        <div class="mt-2"
                            :class="{ 'text-start': currentLanguage === 'EN', 'text-end': currentLanguage === 'AR' }">
                            <h2 class="text-3xl font-bold tracking-tight text-dark dark:text-[#B99269]">
                                {{ t(`aboutUs.section3.title`) }}
                            </h2>
                            <p class="mt-4 text-xl text-gray-800 dark:text-white">

                                {{ t('aboutUs.section3.content') }}

                            </p>


                            <h2 class="text-3xl font-bold tracking-tight text-dark mt-4 dark:text-[#B99269]">
                                {{ t(`aboutUs.section3.title2`) }}
                            </h2>



                            <p class="mt-4 text-xl text-gray-800 dark:text-white">

                                {{ t('aboutUs.section3.content2') }}
                            </p>



                            <hr class="my-4 mt-8 border-b-2 border-gray-300 dark:border-yellow-500 w-1/3 mx-auto">
                        </div>
                    </div>
                </div>
                <div class="mt-12 sm:mt-16 lg:mt-0">
                    <div class=" pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                        <img loading="lazy" width="646" height="485"
                            class="w-full rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0  lg:w-auto "
                            style="color:transparent" src="/src/assets/section3.webp">
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup>
    import {
        ref,
        onMounted,
        computed
    } from 'vue';
    import {
        useI18n
    } from 'vue-i18n';

    const {
        t,
        locale
    } = useI18n();
    const showMore = ref(false);
    const isOverflowing = ref(false);
    const textContent = ref(null);
    const currentLanguage = computed(() => locale.value);

    const toggleShowMore = () => {
        showMore.value = !showMore.value;
    };

    onMounted(() => {
        if (textContent.value) {
            const lineHeight = parseFloat(getComputedStyle(textContent.value).lineHeight);
            const maxHeight = lineHeight * 6; // تقريباً 6 أسطر

            if (textContent.value.scrollHeight > maxHeight) {
                isOverflowing.value = true;
            }
        }
    });
</script>

<style scoped>
    @media (max-width:700px) {
        .tem {
            margin-left: 15px;
            margin-right: 15px;
        }
    }

    .text-content {
        max-height: 8rem;
        /* ارتفاع افتراضي لـ 4 أسطر */
        overflow: hidden;
        transition: max-height 0.3s ease-out;
    }

    .text-content.expanded {
        max-height: none;
    }
</style>
