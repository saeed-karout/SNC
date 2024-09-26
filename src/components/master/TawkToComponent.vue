<!-- TawkToWidget.vue -->
<template>
  <div></div>
</template>

<script setup>
import { onMounted, onUnmounted, watch, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
let scriptElement = null;
const isWidgetLoaded = ref(false);

const loadTawkToScript = () => {
  if (!scriptElement) {
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // استخدام onLoad لضمان أن الودجت جاهز قبل محاولة التحكم به
    window.Tawk_API.onLoad = function() {
      isWidgetLoaded.value = true;
      // تطبيق الحالة الأولية بناءً على المسار الحالي
      if (route.path === '/') {
        window.Tawk_API.hideWidget();
      } else {
        window.Tawk_API.showWidget();
      }
    };

    scriptElement = document.createElement("script");
    var s0 = document.getElementsByTagName("script")[0];
    scriptElement.async = true;
    scriptElement.src = 'https://embed.tawk.to/66c5d452ea492f34bc088125/1i5qcaphk';
    scriptElement.charset = 'UTF-8';
    scriptElement.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(scriptElement, s0);
  }
};

onMounted(() => {
  loadTawkToScript();

  watch(
    [() => route.path, isWidgetLoaded],
    ([newPath, widgetLoaded]) => {
      if (widgetLoaded) {
        if (newPath !== '/') {
          window.Tawk_API.showWidget();
        } else {
          window.Tawk_API.hideWidget();
        }
      }
    },
    { immediate: true }
  );
});

onUnmounted(() => {
  // إخفاء الودجت عند إلغاء تحميل المكون
  if (window.Tawk_API && window.Tawk_API.hideWidget) {
    window.Tawk_API.hideWidget();
  }
});
</script>
