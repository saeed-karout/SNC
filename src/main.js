import { createApp, watch } from 'vue'
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

// إعداد i18n
const i18n = createI18n({
  legacy: false,
  locale: JSON.parse(localStorage.getItem('myAppData') || '{"language": "en"}').language.toLowerCase(),
  messages: {
    en: enMsg,
    ar: arMsg
  }
})

const app = createApp(App)

// إنشاء مثيل Pinia
const pinia = createPinia()

// تسجيل FontAwesomeIcon بشكل عام
app.component('font-awesome-icon', FontAwesomeIcon)

// استخدام i18n في التطبيق
app.use(i18n)
app.use(router)
app.use(pinia)


// تثبيت تطبيق Vue في الـ DOM
app.mount('#app')

// الوصول إلى المتجر
const dataStore = useDataStore()

// **نقل تعريف `installButton` و `deferredPrompt` قبل استخدامهما**
let installButton = null
let deferredPrompt = null

// تعريف دالة updateDirection قبل استخدامها
const updateDirection = () => {
  const dir = dataStore.language.toLowerCase() === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.setAttribute('dir', dir)
}

// استدعاء updateDirection في البداية لضبط الاتجاه عند تحميل التطبيق
updateDirection()

// مراقبة خاصية 'language' مباشرةً
watch(
  () => dataStore.language,
  (newLanguage) => {
    const newLocale = newLanguage.toLowerCase()
    i18n.global.locale.value = newLocale
    updateDirection()

    // تحديث نص زر التثبيت إذا كان موجودًا
    if (installButton) {
      installButton.textContent = i18n.global.t('install')
    }
  },
  { immediate: true }
)

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  deferredPrompt = e

  // إنشاء زر التثبيت
  installButton = document.createElement('button')
  installButton.textContent = i18n.global.t('install')

  // تنسيق الزر
  installButton.style.position = 'fixed'
  installButton.style.bottom = '15px'
  installButton.style.left = '50%'
  installButton.style.transform = 'translate(-50%, -50%)'
  installButton.style.padding = '10px 20px'
  installButton.style.zIndex = '49'
  installButton.style.fontSize = '16px'
  installButton.style.color = '#BB936A'
  installButton.style.borderRadius = '20px'
  installButton.style.backgroundColor = '#293340'
  installButton.style.transition = 'opacity 1s ease'

  // إضافة الزر إلى الـ DOM
  document.body.appendChild(installButton)

  // إضافة مستمع لحدث التمرير
  window.addEventListener('scroll', () => {
    if (installButton) {
      const scrollPosition = window.scrollY
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercentage = (scrollPosition / windowHeight) * 100

      if (scrollPercentage > 50) {
        // إخفاء الزر
        installButton.style.opacity = '0'
        installButton.style.pointerEvents = 'none'
      } else {
        // إظهار الزر
        installButton.style.opacity = '1'
        installButton.style.pointerEvents = 'auto'
      }
    }
  })

  installButton.addEventListener('click', () => {
    deferredPrompt.prompt()

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt')
      } else {
        console.log('User dismissed the install prompt')
      }
      deferredPrompt = null
      document.body.removeChild(installButton)
      installButton = null // إزالة المرجع
    })
  })
})
