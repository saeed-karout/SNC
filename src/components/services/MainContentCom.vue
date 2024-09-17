<template>
  <div class="main-content w-full flex-1 flex flex-col items-center gap-4 justify-center mb-20">
    <div class="flex flex-col justify-center items-center text-center my-4 dark:text-white">
      <h1 class="text-4xl font-bold mb-4">{{ selectedProduct?.name || 'No Name Available' }}</h1>
      <p class="text-[#B99269]  text-3xl min-w-[300px]  mx-auto text-center items-center mb-5">
        {{ selectedProduct?.description || 'No Description Available' }}</p>
    </div>

    <!-- Display main image if available -->
    <div v-if="selectedProduct?.main_image" class="main-image-container">
      <div v-if="!isMainImageLoaded" class="image-placeholder">
        <div class="rounded-md h-12 w-12 border-4 border-t-4 border-secondary animate-spin absolute"></div>
      </div>
      <img v-show="isMainImageLoaded" :src="selectedProduct.main_image" alt="Main Product Image" class="main-image" @load="onMainImageLoad" />
    </div>

    <!-- Display gallery of images if available -->
    <div v-if="selectedProduct?.images && selectedProduct.images.length > 0" class="w-full px-3">

      <!-- Loop through images in chunks -->
      <div v-for="(chunk, index) in chunkedImages" :key="index" class="flex justify-center gap-5 mb-4">
        <div v-for="(image, imgIndex) in chunk" :key="imgIndex" :class="chunk.length === 1 ? 'flex-1 min-w-full' : chunk.length === 2 ? 'flex-1 min-w-[calc(50%-10px)]' : 'flex-1 min-w-[calc(33%-10px)]'">
          <div v-if="!isImageLoaded[image]" class="image-placeholder">
            <div class="rounded-md h-12 w-12 border-4 border-t-4 border-secondary animate-spin absolute"></div>
          </div>
          <img v-show="isImageLoaded[image]" :src="image" alt="Product Image" class="w-full h-full object-cover rounded-lg shadow-lg hover:cursor-pointer" @load="onImageLoad(image)" @click="openImage(image)" />
        </div>
      </div>

    </div>

    <!-- Fullscreen Image Viewer -->
    <div v-if="fullscreenImage" class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" @click="closeImage">
      <img :src="fullscreenImage" loading="lazy" alt="Fullscreen Product Image" class="max-w-full max-h-full object-contain" />
      <button class="absolute top-5 right-5 text-white text-2xl" @click="closeImage">&times;</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  selectedProduct: {
    type: Object,
    default: () => null,
  }
});

const fullscreenImage = ref(null);
const isMainImageLoaded = ref(false);  // حالة تحميل الصورة الرئيسية
const isImageLoaded = ref({});  // حالة تحميل الصور المتعددة

function openImage(image) {
  fullscreenImage.value = image;
}

function closeImage() {
  fullscreenImage.value = null;
}

// 
function onMainImageLoad() {
  isMainImageLoaded.value = true;
}

// عند تحميل الصور المتعددة
function onImageLoad(image) {
  isImageLoaded.value[image] = true;  // تحديث حالة تحميل الصورة بناءً على الـ src الخاص بها
}

// Function to chunk the images into groups of 2 and 3
const chunkedImages = computed(() => {
  if (!props.selectedProduct?.images) return [];
  const images = props.selectedProduct.images;
  const chunks = [];
  let i = 0;
  
  while (i < images.length) {
    // Push chunks of 2 or 3 images
    const chunkSize = (i % 5 === 0 || i % 5 === 3) ? 2 : 3;
    chunks.push(images.slice(i, i + chunkSize));
    i += chunkSize;
  }

  return chunks;
});
</script>

<style scoped>
/* Placeholder style before the image is fully loaded */
.image-placeholder {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #999;
}

.fullscreen-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.fullscreen-image img {
  max-width: 100%;
  max-height: 100%;
}

.fullscreen-image button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}

img {
  object-fit: contain;
}

.main-content {
  padding: 1rem;
  margin-bottom: 60px;
}

.main-image-container {
  width: 100%;
  margin: 0 auto; /* Center the container */
}

.main-image {
  width: 80%;
  height: 50vh;
  margin: 0 auto;
  object-fit: cover; /* Ensure the image covers the container */
}

@media (max-width: 768px) {
  .main-content {
    padding: 0.5rem;
    margin-bottom: 80px;
  }

  .main-image {
    height: 30vh;
  }

  img {
    max-width: 350px;
  }
}
</style>
