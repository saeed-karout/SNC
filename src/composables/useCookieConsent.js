// src/composables/useCookieConsent.js
import { ref, computed, onMounted } from 'vue';

const consentState = ref(null);

export function useCookieConsent() {
  onMounted(() => {
    const consent = localStorage.getItem('cookieConsent');
    consentState.value = consent;
  });

  const setConsent = (value) => {
    consentState.value = value;
    localStorage.setItem('cookieConsent', value);
  };

  const isConsentGiven = computed(() => consentState.value === 'accepted');

  return {
    consentState,
    setConsent,
    isConsentGiven
  };
}
