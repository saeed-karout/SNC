<template>
  <header :class="headerClass" class="navbar fixed inset-x-0 top-0 transition-all duration-300 mb-24">
    <nav class="flex items-center justify-between p-6 lg:px-8 px-8 dark:bg-gray-800" aria-label="Global">
      <!-- Logo Section -->
      <div class="flex lg:flex-1">
        <router-link to="/">
          <img class="logo" :src="logoSrc" alt="Company Logo" />
        </router-link>
      </div>

      <!-- Mobile Menu Buttons -->
      <div class="flex lg:hidden gap-6 items-center">
        <!-- تعديل زر تغيير الوضع مع الأنيميشن -->
        <button
          @click="toggleDarkModeWithAnimation"
          class="text-gray-700 hover:text-gray-900 dark:text-[#B99269] relative transition-all duration-500 transform hover:scale-110"
          aria-label="Toggle Dark Mode"
        >
          <div class="icon-wrapper">
            <template v-if="darkModeStore.isDarkMode">
              <SunIcon class="h-6 w-6 sun-icon transition-all duration-500" aria-hidden="true" />
            </template>
            <template v-else>
              <MoonIcon class="h-6 w-6 moon-icon transition-all duration-500" aria-hidden="true" />
            </template>
          </div>
        </button>

        <button
          @click="toggleLanguage"
          class="text-gray-700 hover:text-gray-900 text-lg dark:text-gray-300"
          aria-label="Toggle Language"
        >
          {{ dataStore.language === 'ar' ? 'EN' : 'AR' }}
        </button>

        <button
          type="button"
          @click="toggleMobileMenu"
          class="relative flex items-center"
          aria-label="Toggle Mobile Menu"
        >
          <Bars3Icon class="h-6 w-6 dark:text-white" aria-hidden="true" />
        </button>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden lg:flex lg:gap-x-14">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          :class="[ 
            'text-md font-semibold leading-6 hover:text-[#314351]',
            isActive(item.href) ? 'text-[#B99269] dark:text-[#B99269]' : 'text-gray-900 dark:text-gray-100',
          ]"
        >
          {{ item.name }}
        </router-link>
      </div>

      <!-- Desktop Dark Mode & Language Buttons -->
      <div class="hidden lg:flex lg:flex-1 lg:justify-end gap-6 items-center">
        <!-- نفس التعديل على زر تغيير الوضع في نسخة الديسكتوب -->
        <button
          @click="toggleDarkModeWithAnimation"
          class="text-gray-700 hover:text-gray-900 dark:text-[#B99269] relative transition-all duration-500 transform hover:scale-110"
          aria-label="Toggle Dark Mode"
        >
          <div class="icon-wrapper">
            <template v-if="darkModeStore.isDarkMode">
              <SunIcon class="h-6 w-6 sun-icon transition-all duration-500" aria-hidden="true" />
            </template>
            <template v-else>
              <MoonIcon class="h-6 w-6 moon-icon transition-all duration-500" aria-hidden="true" />
            </template>
          </div>
        </button>

        <button
          @click="toggleLanguage"
          class="text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          aria-label="Toggle Language"
        >
          {{ dataStore.language === 'ar' ? 'EN' : 'AR' }}
        </button>
      </div>
    </nav>

    <!-- Mobile Menu with Transition -->
    <transition name="mobile-menu" @after-leave="afterLeave">
      <div v-if="mobileMenuOpen" class="fixed inset-0 bg-white dark:bg-gray-800 z-50 animate-slide-in">
        <div class="fixed inset-y-0 right-0 w-full overflow-y-auto bg-white dark:bg-gray-800">
          <div class="flex items-center justify-between p-6">
            <!-- Logo in Mobile Menu -->
            <img class="logo mobile-logo" :src="logoSrc" alt="Company Logo" />
            <button type="button" @click="toggleMobileMenu" aria-label="Close Menu">
              <XMarkIcon class="h-6 w-6 text-gray-300 hover:text-red-500" aria-hidden="true" />
            </button>
          </div>
          <div class="py-6 px-6 space-y-6">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              @click.native="toggleMobileMenu"
              :class="[ 
                'text-2xl font-semibold leading-6 flex justify-center bg-[#b8b8b9] dark:bg-[#747678] dark:opacity-70 p-4 rounded-xl hover:text-[#314351] dark:hover:text-[#B99269]',
                isActive(item.href) ? 'bg-secondary p-4 rounded-xl text-[#B99269] dark:text-[#B99269]' : 'text-gray-900 dark:text-gray-100',
              ]"
            >
              {{ item.name }}
            </router-link>
            <hr class="border-gray-300 dark:border-gray-700">
            <div class="flex justify-between items-center">
              <button
                @click="toggleLanguage"
                class="text-gray-700 hover:text-gray-900 text-lg dark:text-gray-300"
                aria-label="Toggle Language"
              >
                {{ dataStore.language === 'ar' ? 'EN' : 'AR' }}
              </button>
              <button
                @click="toggleDarkModeWithAnimation"
                class="text-gray-700 hover:text-gray-900 dark:text-[#B99269] relative transition-all duration-500 transform hover:scale-110"
                aria-label="Toggle Dark Mode"
              >
                <template v-if="darkModeStore.isDarkMode">
                  <SunIcon class="h-6 w-6 sun-icon transition-all duration-500" aria-hidden="true" />
                </template>
                <template v-else>
                  <MoonIcon class="h-6 w-6 moon-icon transition-all duration-500" aria-hidden="true" />
                </template>
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, watch, onUnmounted } from 'vue';
import { useDarkModeStore } from '@/stores/useDarkModeStore';
import { Bars3Icon, SunIcon, MoonIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { useRoute } from 'vue-router';
import { useDataStore } from '@/stores/useDataStore';
import { useI18n } from 'vue-i18n';
import logoD from '@/assets/LOGO_DARK.png';
import logoL from '@/assets/LOGO_LIGHT.png';

const dataStore = useDataStore();
const darkModeStore = useDarkModeStore();
const route = useRoute();
const { t, locale } = useI18n();

const mobileMenuOpen = ref(false);
const headerClass = ref('');

const navigation = computed(() => [
  { name: t('nav.home'), href: '/' },
  { name: t('nav.services'), href: '/service' },
  { name: t('nav.about'), href: '/about' },
  { name: t('nav.news'), href: '/news' },
  { name: t('nav.contact'), href: '/contact' },
  { name: t('nav.projects'), href: '/projects' },
]);

const logoSrc = computed(() => (darkModeStore.isDarkMode ? logoD : logoL));

const isActive = (href) => {
  if (href === '/') {
    return route.path === href;
  }
  return route.path.startsWith(href);
};

const toggleLanguage = () => {
  const newLanguage = dataStore.language === 'en' ? 'ar' : 'en';
  dataStore.setLanguage(newLanguage);
  locale.value = newLanguage;
  updateDirection();
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const handleScroll = () => {
  headerClass.value = window.scrollY > 100 ? 'bg-white dark:bg-gray-800 shadow-lg' : '';
};

const updateDirection = () => {
  document.documentElement.setAttribute('dir', dataStore.language === 'ar' ? 'rtl' : 'ltr');
};

// دالة لتفعيل الأنيميشن عند تغيير الوضع
const toggleDarkModeWithAnimation = () => {
  darkModeStore.toggleDarkMode();
};

onMounted(() => {
  darkModeStore.loadDarkModePreference();
  dataStore.fetchData();
  updateDirection();
  window.addEventListener('scroll', handleScroll);
});

watch(
  () => dataStore.language,
  (newLang, oldLang) => {
    if (newLang !== oldLang) {
      dataStore.fetchData();
      updateDirection();
    }
  }
);

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* Navbar Styles */
.navbar {
  direction: ltr;
  z-index: 1111;
}

.logo {
  width: 8rem;
  height: auto;
  z-index: 10;
}

.mobile-logo {
  display: block;
  width: 6rem;
}

@media (min-width: 768px) {
  .logo {
    width: 8rem;
  }
}

@media (min-width: 1024px) {
  .logo {
    width: 11rem;
  }
}

/* Mobile Menu Styles */
.fixed {
  z-index: 101;
}

/* Transition styles for mobile menu */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  animation: slide-in-out 0.3s ease;
}

@keyframes slide-in-out {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.mobile-menu-leave-active {
  animation: slide-out 0.3s ease;
}

@keyframes slide-out {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

/* تأثير الأنيميشن على أيقونة الوضع الداكن */
.icon-wrapper {
  display: inline-block;
  position: relative;
  top: 5px;
}

.sun-icon, .moon-icon {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

button:hover .sun-icon, button:hover .moon-icon {
  transform: rotate(360deg);
  opacity: 1;
}
</style>
