<!-- src/components/TawkToWidget.vue -->
<template>
  <div></div>
</template>

<script setup>
import { onMounted, watch, ref, onBeforeUnmount, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCookieConsent } from '../../composables/useCookieConsent';

const route = useRoute();
const { isConsentGiven } = useCookieConsent();

const isScriptLoaded = ref(false);

// تحديد ما إذا كان المستخدم في صفحة "Contact Us"
const isContactUsPage = computed(() => route.path === '/contact');

const loadTawkToScript = () => {
  if (!isScriptLoaded.value && isConsentGiven.value && isContactUsPage.value) {
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const scriptElement = document.createElement("script");
    scriptElement.async = true;
    scriptElement.src = 'https://embed.tawk.to/66c5d452ea492f34bc088125/1i5qcaphk';
    scriptElement.charset = 'UTF-8';
    scriptElement.setAttribute('crossorigin', '*');
    scriptElement.onload = () => {
      isScriptLoaded.value = true;
      setWidgetVisibility();
    };
    document.body.appendChild(scriptElement);
  }
};

const setWidgetVisibility = () => {
  if (window.Tawk_API && window.Tawk_API.showWidget && window.Tawk_API.hideWidget) {
    if (isContactUsPage.value) {
      window.Tawk_API.showWidget(); // إظهار الودجت في صفحة "Contact Us"
    } else {
      window.Tawk_API.hideWidget(); // إخفاء الودجت في الصفحات الأخرى
    }
  }
};

onMounted(() => {
  loadTawkToScript();

  // مراقبة التغييرات في حالة الموافقة والمسار
  watch(
    () => [isConsentGiven.value, route.path],
    ([consent, path]) => {
      if (consent && path === '/contact' && !isScriptLoaded.value) {
        loadTawkToScript();
      } else if (window.Tawk_API) {
        setWidgetVisibility();
      }
    },
    { immediate: true }
  );
});

// إخفاء الودجت عند إزالة المكون من العرض
onBeforeUnmount(() => {
  if (window.Tawk_API && window.Tawk_API.hideWidget) {
    window.Tawk_API.hideWidget();
  }
});
</script>

<style scoped>
/* يمكنك إضافة تخصيصات إضافية هنا إذا لزم الأمر */
</style>
