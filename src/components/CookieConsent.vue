<!-- src/components/CookieConsent.vue -->
<template>
  <Transition name="slide-up">
    <div 
      v-if="!isAccepted && showConsent" 
      :class="[
        'fixed bottom-4 w-[97vw] sm:max-w-full md:max-w-lg md:right-2 justify-end     bg-white dark:bg-secondary  p-3 text-md z-50 rounded-md flex flex-col md:flex-row items-center space-y-2 md:space-y-0  ' 
      ]" 
      :style="{ direction: locale.value === 'ar' ? 'ltr' : 'ltr' }"
    >
      <p class="text-gray-700 dark:text-white">{{ message }}</p>
      <div class="flex space-x-2 mx-2">
        <button 
          @click="accept" 
          class="bg-secondary text-primary px-4 py-2 shadow-2xl rounded hover:bg-gray-600 transition"
        >
          {{ $t('cookieConsent.accept') }}
        </button>
        <button 
          @click="decline" 
          class="bg-secondary text-red-500 px-4 py-2 shadow-2xl rounded hover:bg-gray-600 transition"
        >
          {{ $t('cookieConsent.decline') }}
        </button>
      </div>
      <!-- <a 
        :href="linkUrl" 
        class="text-blue-500 underline mt-2 md:mt-0"
      >
        {{ $t('cookieConsent.learnMore') }}
      </a> -->
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'

// تعريف الخصائص
const props = defineProps({
  message: {
    type: String,
    default: ''
  },
  linkUrl: {
    type: String,
    default: '/privacy-policy'
  }
})

// تعريف الأحداث
const emit = defineEmits(['accepted', 'declined'])

// الحالة لتحديد ما إذا تم قبول/رفض ملفات تعريف الارتباط
const isAccepted = ref(false)

// الحالة لتحديد ما إذا كان الشريط يجب أن يظهر بناءً على التمرير
const showConsent = ref(false)

// استخدام التدويل
const { locale } = useI18n()

// دالة لقبول ملفات تعريف الارتباط
const accept = () => {
  isAccepted.value = true
  localStorage.setItem('cookieConsent', 'accepted')
  emit('accepted')
}

// دالة لرفض ملفات تعريف الارتباط
const decline = () => {
  isAccepted.value = true
  localStorage.setItem('cookieConsent', 'declined')
  emit('declined')
}

// التحقق من حالة الموافقة المخزنة في localStorage
const checkConsent = () => {
  const consent = localStorage.getItem('cookieConsent')
  if (consent === 'accepted' || consent === 'declined') {
    isAccepted.value = true
  }
}

// دالة لمعالجة حدث التمرير
const handleScroll = () => {
  if (window.scrollY >= 100) {
    showConsent.value = true
  } else {
    showConsent.value = false
  }
}

onMounted(() => {
  // فحص الموافقة عند التحميل
  checkConsent()

  // إذا لم يتم قبول أو رفض، قم بمراقبة التمرير
  if (!isAccepted.value) {
    handleScroll() // في حال كان المستخدم قد نزل بالفعل أكثر من 100px
    window.addEventListener('scroll', handleScroll)
  }
})

// تنظيف حدث التمرير عند تدمير المكون
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* تعريف حركة السحب من أسفل الشاشة */
.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.5s ease;
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
.slide-up-enter-to, .slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
