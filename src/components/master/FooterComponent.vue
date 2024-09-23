<template>
    <footer class="w-full bg-white relative block bottom-0 dark:bg-gray-800 dark:opacity-80">
        <div class="mx-auto border-t dark:border-yellow-500 border-gray-200 px-4 sm:px-6">

            <!-- Main Footer Content -->
            <div class="flex flex-col lg:flex-row items-center justify-center  py-8 gap-8 lg:mx-20">

                <!-- Left Column: Logo -->
                <div class="flex items-center justify-center lg:justify-start lg:w-1/3">
                    <a href="https://pagedone.io/" class="flex">
                        <img src="../../assets/logosham.svg" class="w-36" alt="Logo">
                    </a>
                </div>

                <!-- Middle Column: Lists -->
                <!-- Middle Column: Lists -->
                <div class="flex flex-row lg:flex-row gap-4 lg:gap-12 items-center lg:items-start mx-36">
                    <!-- Products List -->
                    <div class="flex flex-col flex-1 min-w-[150px]">
                        <h4 class="text-lg text-gray-900 font-medium dark:text-gray-300 mb-4 text-center lg:text-left">
                        </h4>
                        <ul class="space-y-4 text-center lg:text-left">
                            <li>
                                <RouterLink to="/"
                                    class="text-gray-600 hover:text-gray-900 dark:text-[#A9947E] dark:hover:text-[#b8b1ab]">
                                    {{ t('nav.home') }}
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/service"
                                    class="text-gray-600 hover:text-gray-900 dark:text-[#A9947E] dark:hover:text-[#b8b1ab]">
                                    {{ t('nav.services') }}
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/about"
                                    class="text-gray-600 hover:text-gray-900 dark:text-[#A9947E] dark:hover:text-[#b8b1ab]">
                                    {{ t('nav.about') }}
                                </RouterLink>
                            </li>
                        </ul>
                    </div>

                    <!-- Resources List -->
                    <div class="flex flex-col flex-1 min-w-[150px]">
                        <h4 class="text-lg text-gray-900 font-medium dark:text-gray-300 mb-4 text-center lg:text-left">
                        </h4>
                        <ul class="space-y-4 text-center lg:text-left">
                            <li>
                                <RouterLink to="/news"
                                    class="text-gray-600 hover:text-gray-900 dark:text-[#A9947E] dark:hover:text-[#b8b1ab]">
                                    {{ t('nav.news') }}
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/projects"
                                    class="text-gray-600 hover:text-gray-900 dark:text-[#A9947E] dark:hover:text-[#b8b1ab]">
                                    {{ t('nav.projects') }}
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/contact"
                                    class="text-gray-600 hover:text-gray-900 dark:text-[#A9947E] dark:hover:text-[#b8b1ab]">
                                    {{ t('nav.contact') }}
                                </RouterLink>
                            </li>
                        </ul>
                    </div>
                </div>



                <!-- Right Column: Map -->
                <div class="">
                    <div class="map-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d226.4872564586018!2d46.757482785309676!3d24.733879353303628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2ee32a7e7e3233%3A0x160dc46ac045c22c!2z2LTYsdmD2Kkg2LTYqNmD2Kkg2KfZhNi02KfZhSDZhNmE2YXZgtin2YjZhNin2Ko!5e0!3m2!1sar!2snl!4v1724571034205!5m2!1sar!2snl"
                            class="map-frame" allowfullscreen="" loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>


                    </div>
                </div>
            </div>

            <!-- Footer Bottom Section -->
            <div class="py-6 border-t dark:border-yellow-500 border-gray-200">
                <div class="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-0 lg:mx-20">


                    <span class="text-sm text-gray-500 dark:text-gray-300">{{ t('footer.copyright') }}</span>

                    <span style="direction: ltr;" class="flex gap-1 text-sm text-gray-500 dark:text-gray-300">
                        {{ t('footer.powered') }}
                        <a href="https://www.instagram.com/snc.ltd?igsh=ODEwODVmeXhwdGh6" target="_blank"
                            class="gradient-text flex gap-0 items-center justify-center">
                            {{ t('footer.plateau') }}
                            

                                <img src="/img/icons/icon.png" width="22px" alt="">
                            
                        </a>



                    </span>


                    <div class="flex space-x-4">
                        <SocialMediaComponent />
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
    import SocialMediaComponent from '@/components/SocialMediaComponent.vue'
    import {
        useI18n
    } from 'vue-i18n'
    const {
        t
    } = useI18n()
</script>

<style scoped>
    .map-container {
        position: relative;
        width: 100%;

        border: 2px solid #B99269;
        /* Golden border */
        border-radius: 8px;
        /* Rounded corners */
        overflow: hidden;
        max-width: 400px;
        /* Fixed max width for the map */
        margin: auto;
        /* Center map in its container */
    }

    .gradient-text {
        background: linear-gradient(90deg, #eb2952, #141823);
        /* ألوان التدرج */
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        /* اجعل النص شفافًا لإظهار التدرج */
    }
</style>
