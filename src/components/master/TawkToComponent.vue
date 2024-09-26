<!-- src/components/TawkToWidget.vue -->
<template>
  <div></div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useCookieConsent } from '../../composables/useCookieConsent';

const route = useRoute();
const { isConsentGiven } = useCookieConsent();

const isScriptLoaded = ref(false);

const loadTawkToScript = () => {
  if (!isScriptLoaded.value && isConsentGiven.value) { // إزالة شرط المسار
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const scriptElement = document.createElement("script");
    scriptElement.async = true;
    scriptElement.src = 'https://embed.tawk.to/66c5d452ea492f34bc088125/1i5qcaphk';
    scriptElement.charset = 'UTF-8';
    scriptElement.setAttribute('crossorigin', '*');
    scriptElement.onload = () => {
      isScriptLoaded.value = true;
      setWidgetVisibility(route.path);
    };
    document.body.appendChild(scriptElement);
  }
};

const setWidgetVisibility = (path) => {
  if (window.Tawk_API && window.Tawk_API.showWidget && window.Tawk_API.hideWidget) {
    window.Tawk_API.showWidget(); // إظهار الودجت في جميع الصفحات
  }
};

onMounted(() => {
  // تحميل السكربت إذا تمت الموافقة
  loadTawkToScript();

  // مراقبة التغييرات في حالة الموافقة
  watch(
    () => isConsentGiven.value,
    (isAllowed) => {
      if (isAllowed && !isScriptLoaded.value) {
        loadTawkToScript();
      } else if (!isAllowed && isScriptLoaded.value) {
        if (window.Tawk_API && window.Tawk_API.hideWidget) {
          window.Tawk_API.hideWidget();
        }
        // لا يمكن إزالة السكربت بسهولة بعد تحميله، لكن يمكن تجاهل استخدامه
      }
    },
    { immediate: true }
  );

  // مراقبة التغييرات في المسار لضبط ظهور الودجت
  watch(
    () => route.path,
    (newPath) => {
      setWidgetVisibility(newPath);
    }
  );
});
</script>

<style scoped>
/* يمكنك إضافة تخصيصات إضافية هنا إذا لزم الأمر */
</style>
