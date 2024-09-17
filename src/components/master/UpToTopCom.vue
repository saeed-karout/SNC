<template>
    <div>
      <!-- محتوى الصفحة -->
      
      <!-- زر الرجوع إلى الأعلى -->
      <button
        v-show="showButton"
        @click="scrollToTop"
        class="fixed bottom-5 left-4 text-lg p-3 rounded-full shadow-lg transition duration-500"
      >
        ↑
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  
  const showButton = ref(false)
  
  const handleScroll = () => {
    if (window.scrollY > 100) {
      showButton.value = true
    } else {
      showButton.value = false
    }
  }
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  
  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
  </script>
  
  <style scoped>
  button.fixed {
    position: fixed;
    background-color: #2a353c;
    color: #b99269;
    padding: 0.75rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 2s ease;
  }
  
  button.fixed:hover {
    background-color: #b99269;
    color: #5a6974;
  }
  </style>
  