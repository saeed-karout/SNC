<!-- src/App.vue -->
<template>
  <div :dir="currentDir" :class="['flex', 'flex-col', currentDirClass]">
    <NavbarComponent />
    <RouterView />
    <FooterComponent />
    <UpToTopCom />
    <!-- عرض TawkToWidget فقط في صفحة "Contact Us" -->
    <TawkToWidget v-if="isContactUsPage" />
    <CookieConsent 
      v-if="showCookieConsent" 
      :message="$t('cookieConsent.message')" 
      :linkUrl="cookieConsentConfig.linkUrl" 
      @accepted="handleAccept" 
      @declined="handleDecline" 
    />
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import NavbarComponent from './components/master/NavbarComponent.vue';
import FooterComponent from './components/master/FooterComponent.vue';
import UpToTopCom from './components/master/UpToTopCom.vue';
import TawkToWidget from './components/master/TawkToComponent.vue';
import CookieConsent from './components/CookieConsent.vue';
import { useCookieConsent } from './composables/useCookieConsent'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const route = useRoute()
const { consentState, setConsent, isConsentGiven } = useCookieConsent()

const showCookieConsent = ref(false)

const cookieConsentConfig = {
  linkUrl: '/privacy-policy',
}

const checkCookieConsent = () => {
  if (!consentState.value) { // شريط الموافقة يظهر في جميع الصفحات بما في ذلك الصفحة الرئيسية
    showCookieConsent.value = true
  } else {
    showCookieConsent.value = false
  }
}

// فحص الموافقة عند التحميل
checkCookieConsent()

// مراقبة التغييرات في المسار
watch(
  () => route.path,
  () => {
    checkCookieConsent()
  }
)

// التعامل مع أحداث الموافقة
const handleAccept = () => {
  setConsent('accepted')
}

const handleDecline = () => {
  setConsent('declined')
}

// تحديد اتجاه النص بناءً على اللغة الحالية
const currentDir = computed(() => {
  return locale.value === 'ar' ? 'rtl' : 'ltr'
})

const currentDirClass = computed(() => {
  return locale.value === 'ar' ? 'text-right' : 'text-left'
})

// تحديد ما إذا كان المستخدم في صفحة "Contact Us"
const isContactUsPage = computed(() => route.path === '/contact')
</script>
