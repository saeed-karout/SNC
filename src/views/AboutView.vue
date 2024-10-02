<template>
  <div class="tem relative overflow-hidden bg-white-100 mt-12 pt-16 pb-32 space-y-24">
    
    <!-- القسم الأول -->
    <div class="relative">
      <h1 class="text-center my-5 text-4xl font-bold leading-tight" style="color:#B38E60;">
        {{ t('aboutUs.title') }}
      </h1>
      <hr class="my-4 mt-8 border-t-2 border-gray-300 dark:border-yellow-500 w-1/3 mx-auto">
      <div class="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
        <div class="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 lg:col-start-2">
          <div>
            <div></div>
            <div :class="{ 'text-start': currentLanguage === 'EN', 'text-end': currentLanguage === 'AR' }">
              <h2 class="text-3xl font-bold tracking-tight text-dark dark:text-[#B99269]">
                {{ t('aboutUs.section2.title') }}
              </h2>
              <p class="mt-4 text-xl text-gray-800 dark:text-white">
                {{ t('aboutUs.section2.content') }}
              </p>
            </div>
            <hr class="my-4 mt-8 border-b-2 border-gray-300 dark:border-yellow-500 w-1/3 mx-auto">
          </div>
        </div>
        <div class="mt-12 sm:mt-16 lg:mt-0">
          <div class="pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0">
            <img
              alt="Inbox user interface"
              loading="lazy"
              width="647"
              height="500"
              class="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-90 lg:w-auto"
              src="../assets/first.webp"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- القسم الثاني -->
    <div class="relative">
      <div class="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
        <div class="mx-auto max-w-xl px-6 lg:mx-0 lg:py-16 lg:px-0">
          <div :class="{ 'text-start': currentLanguage === 'EN', 'text-end': currentLanguage === 'AR' }">
            <h2 class="text-3xl font-bold tracking-tight text-dark dark:text-[#B99269]">
              {{ t('aboutUs.section1.title') }}
            </h2>

            <div>
              <div class="relative">
                <p
                  class="text-xl text-gray-800 dark:text-white text-content"
                  :class="{ expanded: showMore }"
                  ref="textContent"
                >
                  {{ t('aboutUs.section1.content') }}
                </p>

                <div class="my-6" v-if="isOverflowing">
                  <button
                    class="inline-flex rounded-lg bg-secondary px-4 py-1.5 text-base font-semibold leading-7 dark:text-primary text-white shadow-sm ring-1 hover:text-primary dark:hover:text-secondary dark:hover:bg-gray-600"
                    @click="toggleShowMore"
                  >
                    {{ showMore ? t(`aboutUs.show.showLess`) : t(`aboutUs.show.showMore`) }}
                  </button>
                </div>
              </div>
              <h2 class="text-3xl font-bold tracking-tight text-dark mb-2x dark:text-[#B99269]">
                {{ t('aboutUs.section1.subtitle') }}
              </h2>

              <p class="text-2xl font-semibold text-gray-800 dark:text-white">
                {{ t('aboutUs.section1.name') }}
              </p>
            </div>
          </div>
          <hr class="my-4 mt-8 border-b-2 border-gray-300 dark:border-yellow-500 w-1/3 mx-auto">
        </div>

        <div class="mt-12 sm:mt-16 lg:mt-0">
          <div class="pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
            <img
              class="w-full rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:w-auto"
              src="../assets/mr.webp"
              loading="lazy"
              alt="Image MR"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- القسم الثالث -->
    <div class="relative">
      <div class="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
        <div class="mt-12 sm:mt-16 lg:mt-0">
          <div class="pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
            <img
              loading="lazy"
              width="646"
              height="485"
              class="w-full rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:w-auto"
              style="color:transparent"
              src="/src/assets/section3.webp"
              alt="Section 3"
            />
          </div>
        </div>

        <div class="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
          <div>
            <div class="text-end"></div>
            <div :class="{ 'text-start': currentLanguage === 'EN', 'text-end': currentLanguage === 'AR' }" class="mt-2">
              <h2 class="text-3xl font-bold tracking-tight text-dark dark:text-[#B99269]">
                {{ t(`aboutUs.section3.title`) }}
              </h2>
              <p class="mt-4 text-xl text-gray-800 dark:text-white">
                {{ t('aboutUs.section3.content') }}
              </p>

              <h2 class="text-3xl font-bold tracking-tight text-dark mt-4 dark:text-[#B99269]">
                {{ t(`aboutUs.section3.title2`) }}
              </h2>

              <p class="mt-4 text-xl text-gray-800 dark:text-white">
                {{ t('aboutUs.section3.content2') }}
              </p>

              <hr class="my-4 mt-8 border-b-2 border-gray-300 dark:border-yellow-500 w-1/3 mx-auto">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- القسم الرابع -->
    <div class="relative">
      <div class="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
        <div class="mx-auto max-w-xl px-6 lg:mx-0 lg:py-16 lg:px-0">
          <div :class="{ 'text-start': currentLanguage === 'EN', 'text-end': currentLanguage === 'AR' }">
            <h2 class="text-3xl font-bold tracking-tight text-dark dark:text-[#B99269]">
              {{ t('aboutUs.section4.title') }}
            </h2>

            <div>
              <div class="relative">
                <p class="text-xl text-gray-800 dark:text-white text-content" ref="textContent">
                  {{ t('aboutUs.section4.content') }}
                </p>
              </div>
              <h2 class="text-3xl font-bold tracking-tight text-dark mb-2x dark:text-[#B99269]">
                {{ t('aboutUs.section4.title2') }}
              </h2>

              <p class="text-xl  text-gray-800 dark:text-white">
                {{ t('aboutUs.section4.content2') }}
              </p>
              <h2 class="text-3xl font-bold tracking-tight text-dark mb-2x dark:text-[#B99269]">
                {{ t('aboutUs.section4.title3') }}
              </h2>

              <p class="text-xl  text-gray-800 dark:text-white">
                {{ t('aboutUs.section4.content3') }}
              </p>
            </div>
          </div>
          <hr class="my-4 mt-8 border-b-2 border-gray-300 dark:border-yellow-500 w-1/3 mx-auto">
        </div>

        <!-- شبكة الصور مع نافذة منبثقة (Modal) -->
        <div class="mt-12 sm:mt-16 lg:mt-0">
          <div class="pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
            <div class="grid grid-cols-2 grid-rows-2 gap-2 lg:absolute lg:left-0 lg:w-full lg:h-full">
              <!-- الصورة الأولى -->
              <img 
                class="w-full h-full object-cover rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 cursor-pointer"
                :src="images[0].src" 
                :alt="images[0].alt" 
                @click="openModal(images[0])" />

              <!-- الصورة الثانية -->
              <img 
                class="w-full h-full object-cover rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 cursor-pointer"
                :src="images[1].src" 
                :alt="images[1].alt" 
                @click="openModal(images[1])" />

              <!-- الصورة الثالثة -->
              <img 
                class="w-full h-full object-cover rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 cursor-pointer"
                :src="images[2].src" 
                :alt="images[2].alt" 
                @click="openModal(images[2])" />

              <!-- استبدال الصورة الرابعة بصورتين -->
              <div class="flex gap-1">
                <img 
                  class="w-1/2 object-cover rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 cursor-pointer"
                  :src="images[3].src" 
                  :alt="images[3].alt" 
                  @click="openModal(images[3])" />
                <img 
                  class="w-1/2 object-cover rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 cursor-pointer"
                  :src="images[4].src" 
                  :alt="images[4].alt" 
                  @click="openModal(images[4])" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- النافذة المنبثقة (Modal) -->
    <transition name="fade">
      <div 
        v-if="isModalOpen" 
        class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" 
        @click.self="closeModal"
        role="dialog" 
        aria-modal="true"
      >
        <div class="relative">
          <img 
            :src="currentImage.src" 
            :alt="currentImage.alt" 
            class="max-w-full max-h-[80vh] rounded-xl" 
          />
          <button 
            id="close-button"
            @click="closeModal" 
            class="absolute top-2 right-2 bg-white bg-opacity-75 rounded-full p-2 hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <!-- أيقونة الإغلاق (X) -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';

// الاستخدام الحالي للـ i18n
const { t, locale } = useI18n();
const showMore = ref(false);
const isOverflowing = ref(false);
const textContent = ref(null);
const currentLanguage = computed(() => locale.value);

// طريقة لتبديل عرض المزيد
const toggleShowMore = () => {
  showMore.value = !showMore.value;
};

// تحديد إذا ما كان النص يتجاوز الحد المسموح
onMounted(() => {
  if (textContent.value) {
    const lineHeight = parseFloat(getComputedStyle(textContent.value).lineHeight);
    const maxHeight = lineHeight * 6; // تقريباً 6 أسطر

    if (textContent.value.scrollHeight > maxHeight) {
      isOverflowing.value = true;
    }
  }
});

// ** التعديلات الجديدة لعرض الصور في نافذة منبثقة **
// مصفوفة الصور
const images = ref([
  { src: "../src/assets/certificate/1.png", alt: "شهادة 1" },
  { src: "../src/assets/certificate/2.png", alt: "شهادة 2" },
  { src: "../src/assets/certificate/3.png", alt: "شهادة 3" },
  { src: "../src/assets/certificate/4.png", alt: "شهادة 4a" },
  { src: "../src/assets/certificate/5.png", alt: "شهادة 4b" },
]);

// متغيرات التحكم في النافذة المنبثقة
const isModalOpen = ref(false);
const currentImage = ref({});

// طريقة لفتح النافذة المنبثقة مع الصورة المختارة
const openModal = (image) => {
  currentImage.value = image;
  isModalOpen.value = true;
  // منع التمرير خلف النافذة المنبثقة
  document.body.style.overflow = 'hidden';

  // تركيز على زر الإغلاق لتحسين الوصولية
  nextTick(() => {
    const closeButton = document.getElementById('close-button');
    if (closeButton) {
      closeButton.focus();
    }
  });
};

// طريقة لإغلاق النافذة المنبثقة
const closeModal = () => {
  isModalOpen.value = false;
  currentImage.value = {};
  // السماح بالتمرير مرة أخرى
  document.body.style.overflow = '';
};

// إضافة دعم مفتاح "Escape" لإغلاق النافذة المنبثقة
const handleKeyDown = (event) => {
  if (event.key === 'Escape' && isModalOpen.value) {
    closeModal();
  }
};

// إضافة مستمع للأحداث عند التركيب
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

// إزالة مستمع للأحداث قبل التدمير
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>


<style scoped>
    @media (max-width:700px) {
        .tem {
            margin-left: 15px;
            margin-right: 15px;
        }
    }

    .text-content {
        max-height: 8rem;
        /* ارتفاع افتراضي لـ 4 أسطر */
        overflow: hidden;
        transition: max-height 0.3s ease-out;
    }

    .text-content.expanded {
        max-height: none;
    }
</style>
