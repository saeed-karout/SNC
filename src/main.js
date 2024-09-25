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
  locale: JSON.parse(localStorage.getItem('myAppData') || '{"language": "ar"}').language.toLowerCase(), // default is Arabic
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
  e.preventDefault()
  deferredPrompt = e

  // Create install button
  installButton = document.createElement('button')
  installButton.textContent = i18n.global.t('install')

  // Style the button
  installButton.style.position = 'fixed'
  installButton.style.bottom = '15px'
  installButton.style.left = '50%'
  installButton.style.transform = 'translate(-50%, -50%)'
  installButton.style.padding = '10px 20px'
  installButton.style.zIndex = '1000'
  installButton.style.fontSize = '16px'
  installButton.style.color = '#BB936A'
  installButton.style.borderRadius = '20px'
  installButton.style.backgroundColor = '#293340'

  // Add the button to the DOM
  document.body.appendChild(installButton)

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
      installButton = null // Remove the reference
    })
  })
})

updateDirection()
