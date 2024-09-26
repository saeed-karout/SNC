<template>
    <footer class="w-full bg-white relative block bottom-0 dark:bg-gray-800 dark:opacity-80" style="direction: ltr;">
        <div class="mx-auto border-t dark:border-yellow-500 border-gray-200 px-4 sm:px-6">

            <!-- Main Footer Content -->
            <div class="flex flex-col lg:flex-row items-center justify-center  py-8 gap-8 lg:mx-20">

                <!-- Left Column: Logo -->
                <div class="flex items-center justify-center lg:justify-start lg:w-1/3">
                    <a href="https://pagedone.io/" class="flex">
                        <img src="../../assets/logosham.svg" class="w-36" alt="Logo">
                    </a>
                </div>

                      <a class="lg:hidden" href="/SNC.apk"  download>
                        <p class="dark:text-white font-inter text-[18px] font-medium">Download the app</p>
                    <button class="inline-flex items-center px-6 py-2 rounded-lg shadow-2xl bg-primary text-white" >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            class="fill-current w-16 h-8 text-primary ">
                            <path
                                d="M 5.4160156 2.328125 L 12.935547 10.158203 C 13.132547 10.363203 13.45925 10.363203 13.65625 10.158203 L 15.179688 8.5742188 C 15.405688 8.3392188 15.354312 7.956875 15.070312 7.796875 C 11.137313 5.571875 6.2620156 2.811125 5.4160156 2.328125 z M 3.140625 2.8476562 C 3.055625 3.0456562 3 3.2629063 3 3.5039062 L 3 20.591797 C 3 20.788797 3.044375 20.970625 3.109375 21.140625 L 11.576172 12.324219 C 11.762172 12.131219 11.762172 11.826813 11.576172 11.632812 L 3.140625 2.8476562 z M 17.443359 9.2578125 C 17.335484 9.2729375 17.233297 9.32375 17.154297 9.40625 L 15.015625 11.632812 C 14.829625 11.825812 14.829625 12.130219 15.015625 12.324219 L 17.134766 14.529297 C 17.292766 14.694297 17.546141 14.729188 17.744141 14.617188 C 19.227141 13.777188 20.226563 13.212891 20.226562 13.212891 C 20.725562 12.909891 21.007 12.443547 21 11.935547 C 20.992 11.439547 20.702609 10.981938 20.224609 10.710938 C 20.163609 10.676937 19.187672 10.124359 17.763672 9.3183594 C 17.664172 9.2623594 17.551234 9.2426875 17.443359 9.2578125 z M 13.296875 13.644531 C 13.165875 13.644531 13.034047 13.696328 12.935547 13.798828 L 5.4746094 21.566406 C 6.7566094 20.837406 11.328781 18.249578 15.050781 16.142578 C 15.334781 15.981578 15.386156 15.599281 15.160156 15.363281 L 13.65625 13.798828 C 13.55775 13.696328 13.427875 13.644531 13.296875 13.644531 z"
                                >
                            </path>
                        </svg>
                        <span class="flex flex-col items-start ml-8 leading-5">
                            <p class="mb-1 text-sm">GET  IT  ON</p>
                            <span class="font-semibold title-font">Direct Link</span>
                        </span>
                    </button>
                </a>
                <!-- Middle Column: Lists -->
                <!-- Middle Column: Lists -->
                <div class="flex flex-row lg:flex-row  lg:gap-12 items-center lg:items-start mx-10">
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
                       <GoogleMapsWidget />

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
import GoogleMapsWidget from '../GoogleMapsWidget.vue';
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
