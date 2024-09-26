<script setup>

import { RouterView } from 'vue-router';
import NavbarComponent from './components/master/NavbarComponent.vue';
import FooterComponent from './components/master/FooterComponent.vue';
import UpToTopCom from './components/master/UpToTopCom.vue';
import TawkToWidget from './components/master/TawkToComponent.vue'; // Importing TawkTo component


</script>

<template>
  <div>
    <NavbarComponent />  <!-- Navbar App -->
         <RouterView />       <!-- Children -->
    <FooterComponent />  <!-- Footer -->
    <UpToTopCom />       <!-- Up icon to top -->
    <TawkToWidget  /> 
         <!-- Live chat component -->
  </div>
</template>




