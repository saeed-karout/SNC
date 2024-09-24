import { createApp } from 'vue'
import { createPinia } from 'pinia'
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
import './registerServiceWorker'

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
  // تحقق مما إذا كان الـ store الخاص بتغيير اللغة هو dataStore
  if (mutation.storeId === 'dataStore' && mutation.events === 'language') {
    // تعيين اللغة الجديدة بناءً على الحالة الجديدة
    const newLocale = state.language === 'EN' ? 'en' : 'ar';
    i18n.global.locale.value = newLocale;
    updateDirection(); // تحديث اتجاه النص
  }
});


const updateDirection = () => {
  const dir = dataStore.language === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', dir);
};

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // منع المتصفح من إظهار التنبيه الافتراضي
  e.preventDefault();
  deferredPrompt = e;

  // هنا يمكنك إظهار زر يطلب من المستخدم تثبيت التطبيق
  const installButton = document.createElement('button');
  installButton.textContent = 'Install App';
  installButton.style.position = 'fixed';
  installButton.style.bottom = '10px';
  installButton.style.right = '10px';
  document.body.appendChild(installButton);

  installButton.addEventListener('click', () => {
    // إظهار نافذة تحميل التطبيق
    deferredPrompt.prompt();
    
    // تحقق من رد المستخدم
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
      document.body.removeChild(installButton);
    });
  });
});


updateDirection();