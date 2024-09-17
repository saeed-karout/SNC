import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import FontAwesomeIcon from './plugins/font-awesome'
import './assets/main.css'

import '../node_modules/flowbite-vue/dist/index.css'
import { useDataStore } from './stores/useDataStore.js'

// استيراد ملفات الترجمة
import enMsg from '../src/plugins/locales/en.json'
import arMsg from '../src/plugins/locales/ar.json'

// إعداد i18n
const i18n = createI18n({
  legacy: false,
  locale: JSON.parse(localStorage.getItem('myAppData') || '{"language": "ar"}').language, // الافتراضي هو العربية
  messages: {
    en: enMsg,
    ar: arMsg
  }
})

const app = createApp(App)

// إنشاء مثيل Pinia
const pinia = createPinia()
pinia.use(piniaPluginPersist)

// تسجيل مكون FontAwesomeIcon عالميًا
app.component('font-awesome-icon', FontAwesomeIcon)

// استخدام i18n في التطبيق
app.use(i18n)
app.use(router)
app.use(pinia)

// تثبيت تطبيق Vue في DOM
app.mount('#app')

  
// تحديث اللغة في i18n عند تغييرها من الـ store
const dataStore = useDataStore()

dataStore.$subscribe((mutation, state) => {
  if (mutation.storeId === 'dataStore' && mutation.events.some(event => event.key === 'language')) {
    const newLocale = state.language === 'EN' ? 'en' : 'ar'
    i18n.global.locale.value = newLocale
    updateDirection();
  }
})

const updateDirection = () => {
  const dir = dataStore.language === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', dir);
};

updateDirection(); // ضبط الاتجاه عند بداية التطبيق
