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

  e.preventDefault();
  deferredPrompt = e;

 
  const installButton = document.createElement('button');
  installButton.textContent = 'Install App';
  
  
  installButton.style.position = 'fixed';
  installButton.style.top = '50%';
  installButton.style.left = '50%';
  installButton.style.transform = 'translate(-50%, -50%)';  
  installButton.style.padding = '10px 20px';  
  installButton.style.zIndex = '1000'; 
  installButton.style.fontSize = '16px';
  installButton.style.color = '#BB936A';  
  installButton.style.backgroundColor = '#293340';  

 
setTimeout(() => {
  document.body.removeChild(installButton);
}, 20000); 

  
  document.body.appendChild(installButton);

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
    });
  });
});


updateDirection();