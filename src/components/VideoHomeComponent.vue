<template>
  <div class="relative h-screen z-20">
    <video v-if="videoBlobUrl" autoplay loop muted class="absolute inset-0 w-full h-full object-cover z-[-1]" preload="auto">
      <source :src="videoBlobUrl" type="video/webm" />
      Your browser does not support the video tag.
    </video>

    <div class="relative isolate px-6 pt-14 lg:px-8">
      <div class="mx-auto max-w-2xl py-56 sm:py-48 lg:py-56">
        <div class="text-center">
          <div class="text-container">
            <transition name="fade">
              <h1 v-if="showText" key="text" class="text-4xl font-semibold tracking-tight sm:text-6xl fade-text">{{ currentText }}</h1>
            </transition>
          </div>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <router-link to="/contact" class="btn-primary">
              {{ $t('buttons.getStarted') }}
            </router-link>
            <router-link to="/about" class="btn-secondary">
              {{ $t('buttons.learnMore') }} <span aria-hidden="true">→</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useVideoStore } from '../stores/videoStroe';
import { BASE_URL } from '../config.js';

const { t } = useI18n();
const videoStore = useVideoStore();
const videoBlobUrl = ref(null); // تغيير النوع إلى ref

const texts = computed(() => [
  t('slogans.slogan1'),
  t('slogans.slogan2'),
  t('slogans.slogan3')
]);

const currentTextIndex = ref(0);
const currentText = ref(texts.value[currentTextIndex.value]);
const showText = ref(true);

onMounted(async () => {
  try {
    const response = await fetch(`${BASE_URL}/profiles`);
    const data = await response.json();

    // videoBlobUrl
    videoBlobUrl.value = data.data.main_page_video;

    await videoStore.loadVideo(videoBlobUrl.value);
  } catch (error) {
    console.error('Failed to load video:', error);
  }

  const intervalId = setInterval(() => {
    showText.value = false;
    setTimeout(() => {
      currentTextIndex.value = (currentTextIndex.value + 1) % texts.value.length;
      currentText.value = texts.value[currentTextIndex.value];
      showText.value = true;
    }, 500); // Shorter fade-out duration
  }, 5000);

  onUnmounted(() => {
    clearInterval(intervalId);
  });
});

</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
.fade-text {
  color: #ffffff;
  text-shadow: 1px 5px 4px #314351;
}
.text-container {
  min-height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-primary {
  background-color: #314351;
  color: #B99269;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 600;
}
.btn-secondary {
  background-color: #314351;
  color: #B99269;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
