<!-- src/components/GoogleMapsWidget.vue -->
<template>
  <div v-if="isAllowed" class="w-full h-42 ">
    <iframe
      class="w-full h-full"
      :src="mapSrc"
      frameborder="0"
      style="border:0;"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCookieConsent } from '../composables/useCookieConsent';
import { useI18n } from 'vue-i18n';

const { isConsentGiven } = useCookieConsent();
const { locale } = useI18n();

// استخدم isConsentGiven.value بدلاً من isConsentGiven()
const isAllowed = computed(() => isConsentGiven.value);

const mapSrcBase = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d226.4872564586018!2d46.757482785309676!3d24.733879353303628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2ee32a7e7e3233%3A0x160dc46ac045c22c!2z2LTYsdmD2Kkg2LTYqNmD2Kkg2KfZhNi02KfZhSDZhNmE2YXZgtin2YjZhNin2Ko!5e0!3m2!1sar!2snl!4v1724571034205!5m2!1sar!2snl';

const mapSrc = computed(() => {
  // يمكنك تخصيص الرابط بناءً على اللغة إذا لزم الأمر
  return mapSrcBase;
});
</script>

<style scoped>
/* يمكنك إضافة تخصيصات إضافية هنا إذا لزم الأمر */
</style>
