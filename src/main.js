import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import FontAwesomeIcon from './plugins/font-awesome'
import './assets/main.css'

import '../node_modules/flowbite-vue/dist/index.css'
import { useDataStore } from './stores/useDataStore.js'

// Import translation files
import enMsg from '../src/plugins/locales/en.json'
import arMsg from '../src/plugins/locales/ar.json'

// Setup i18n
const i18n = createI18n({
  legacy: false,
  locale: JSON.parse(localStorage.getItem('myAppData') || '{"language": "en"}').language.toLowerCase(), // default is

messages: {
    en: enMsg,
    ar: arMsg
  }
})

const app = createApp(App)

// Create Pinia instance
const pinia = createPinia()

// Register FontAwesomeIcon globally
app.component('font-awesome-icon', FontAwesomeIcon)

// Use i18n in the app
app.use(i18n)
app.use(router)
app.use(pinia)

// Mount the Vue app to the DOM
app.mount('#app')

// Access the store
const dataStore = useDataStore()

// Store references to the install button and deferred prompt
let installButton = null
let deferredPrompt = null

// Watch the 'language' property directly
watch(
  () => dataStore.language,
  (newLanguage) => {
    const newLocale = newLanguage.toLowerCase()
    i18n.global.locale.value = newLocale
    updateDirection()

    // Update the installButton text if it exists
    if (installButton) {
      installButton.textContent = i18n.global.t('install')
    }
  },
  { immediate: true }
)

const updateDirection = () => {
  const dir = dataStore.language.toLowerCase() === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.setAttribute('dir', dir)
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // إنشاء زر التثبيت
  installButton = document.createElement('button');
  installButton.textContent = i18n.global.t('install');

  // تنسيق الزر
  installButton.style.position = 'fixed';
  installButton.style.bottom = '15px';
  installButton.style.left = '50%';
  installButton.style.transform = 'translate(-50%, -50%)';
  installButton.style.padding = '10px 20px';
  installButton.style.zIndex = '1000';
  installButton.style.fontSize = '16px';
  installButton.style.color = '#BB936A';
  installButton.style.borderRadius = '20px';
  installButton.style.backgroundColor = '#293340';
  installButton.style.transition = 'opacity 0.5s ease';
  // إضافة الزر إلى الـ DOM
  document.body.appendChild(installButton);

  // إضافة مستمع لحدث التمرير
  window.addEventListener('scroll', () => {
    if (installButton) {
      const scrollPosition = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollPosition / windowHeight) * 100;

      if (scrollPercentage > 50) {
        // إخفاء الزر
        installButton.style.opacity = '0';
        installButton.style.pointerEvents = 'none';
      } else {
        // إظهار الزر
        installButton.style.opacity = '1';
        installButton.style.pointerEvents = 'auto';
      }

    }
  });


  installButton.addEventListener('click', () => {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
      document.body.removeChild(installButton);
      installButton = null; // إزالة المرجع
    });
  });
});


updateDirection()
