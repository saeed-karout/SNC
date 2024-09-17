<template>
  <div class="relative w-full">
    <!-- عنصر التحميل الذي يظهر حتى يتم تحميل الصورة -->
    <div v-if="!loaded" class="w-full h-48 bg-gray-200 flex items-center justify-center">
      <span>Loading...</span> <!-- يمكنك تغيير هذه الرسالة أو استخدام صورة تحميل هنا -->
    </div>
    
    <!-- الصورة الفعلية التي يتم تحميلها -->
    <img 
      v-if="loaded" 
      :src="src" 
      :alt="alt" 
      @load="onLoad" 
      class="w-full h-48 object-cover rounded-lg" 
      style="display: block;"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['src', 'alt']);
const loaded = ref(false);

const onLoad = () => {
  loaded.value = true;
  console.log("Image loaded:", props.src);
};

</script>

<style scoped>
.relative {
  position: relative;
}
</style>
