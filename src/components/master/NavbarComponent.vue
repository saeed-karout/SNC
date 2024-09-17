<template>
  <header :class="headerClass" class="navbar fixed inset-x-0 top-0  transition-all duration-300 mb-24">
    <nav class="flex items-center justify-between p-6 lg:px-8 px-8 dark:bg-gray-800" aria-label="Global">
      <!-- Logo Section -->
      <div class="flex lg:flex-1">
        <router-link to="/">
          <img class="logo" :src="logoSrc" alt="Company Logo" />
        </router-link>
      </div>

      <!-- Mobile Menu Buttons -->
      <div class="flex lg:hidden gap-6 items-center">
        <button
          @click="darkModeStore.toggleDarkMode"
          class="text-gray-700 hover:text-gray-900 dark:text-[#B99269]"
          aria-label="Toggle Dark Mode"
        >
          <template v-if="darkModeStore.isDarkMode">
            <SunIcon class="h-6 w-6" aria-hidden="true" />
          </template>
          <template v-else>
            <MoonIcon class="h-6 w-6" aria-hidden="true" />
          </template>
        </button>

        <button
          @click="toggleLanguage"
          class="text-gray-700 hover:text-gray-900 dark:text-gray-300"
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
        <button
          @click="darkModeStore.toggleDarkMode"
          class="text-gray-700 hover:text-gray-900 dark:text-[#B99269]"
          aria-label="Toggle Dark Mode"
        >
          <template v-if="darkModeStore.isDarkMode">
            <SunIcon class="h-6 w-6" aria-hidden="true" />
          </template>
          <template v-else>
            <MoonIcon class="h-6 w-6" aria-hidden="true" />
          </template>
        </button>

        <button
          @click="toggleLanguage"
          class="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          aria-label="Toggle Language"
        >
          {{ dataStore.language === 'ar' ? 'EN' : 'AR' }}
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="fixed inset-0 bg-white dark:bg-gray-800 z-50">
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
              'text-md font-semibold leading-6 flex hover:text-[#314351] dark:hover:text-[#B99269]',
              isActive(item.href) ? 'text-[#B99269] dark:text-[#B99269]' : 'text-gray-900 dark:text-gray-100',
            ]"
          >
            {{ item.name }}
          </router-link>
          <hr class="border-gray-300 dark:border-gray-700">
          <div class="flex justify-between items-center">
            <button
              @click="toggleLanguage"
              class="text-gray-700 hover:text-gray-900 dark:text-gray-300"
              aria-label="Toggle Language"
            >
              {{ dataStore.language === 'ar' ? 'EN' : 'AR' }}
            </button>
            <button
              @click="darkModeStore.toggleDarkMode"
              class="text-gray-700 hover:text-gray-900 dark:text-[#B99269]"
              aria-label="Toggle Dark Mode"
            >
              <template v-if="darkModeStore.isDarkMode">
                <SunIcon class="h-6 w-6" aria-hidden="true" />
              </template>
              <template v-else>
                <MoonIcon class="h-6 w-6" aria-hidden="true" />
              </template>
            </button>
          </div>
        </div>
      </div>
    </div>
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

// Store instances
const dataStore = useDataStore();
const darkModeStore = useDarkModeStore();

// Route instance
const route = useRoute();

// i18n instance
const { t, locale } = useI18n();

// Reactive variables
const mobileMenuOpen = ref(false);
const headerClass = ref('');

// Computed properties
const navigation = computed(() => [
  { name: t('nav.home'), href: '/' },
  { name: t('nav.services'), href: '/service' },
  { name: t('nav.about'), href: '/about' },
  { name: t('nav.news'), href: '/news' },
  { name: t('nav.contact'), href: '/contact' },
  { name: t('nav.projects'), href: '/projects' }, 
]);


const logoSrc = computed(() => (darkModeStore.isDarkMode ? logoD : logoL));

// Methods
const isActive = (href) => {
  // إذا كان href هو الجذر ("/")، فإنه يجب أن يكون المسار الحالي بالضبط الجذر أيضًا
  if (href === '/') {
    return route.path === href;
  }
  // إذا لم يكن href هو الجذر، تحقق من مطابقة المسار
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

// Lifecycle hooks
onMounted(() => {
  darkModeStore.loadDarkModePreference();
  dataStore.fetchData();
  updateDirection();
  window.addEventListener('scroll', handleScroll);
});

watch(
  () => dataStore.language,
  () => {
    dataStore.fetchData();
    updateDirection();
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
  z-index: 1111; /* سيتم تحديث الاتجاه ديناميكيًا */
}

.logo {
  width: 8rem;
  height: auto;
  z-index: 10; /* Ensure the logo is on top of other elements */
}

.mobile-logo {
  display: block; /* Ensure the logo is visible in mobile menu */
  width: 6rem; /* Adjust the size if needed */
}

@media (min-width: 768px) {
  .logo {
    width: 8rem; /* Adjust width for tablets and up */
  }
}

@media (min-width: 1024px) {
  .logo {
    width: 11rem; /* Adjust width for desktops */
  }
}

/* Mobile Menu Styles */
.fixed {
  z-index: 101; /* Ensure menu appears above other elements */
}

.dark .logo {
  /* Additional styles if needed for dark mode */
}
</style>
