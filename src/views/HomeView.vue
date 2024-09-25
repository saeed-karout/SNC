<template>


  <div >
    <Videos />
    <StatisticsComponent />
    <Service />
    <Carousel />
    <ContactView />
  
  </div>
</template>

<script setup>
import Videos from '@/components/VideoHomeComponent.vue';
import Service from '@/components/serviceComponent.vue';
import ContactView from './ContactView.vue';
import Carousel from '@/components/Carousel.vue';
import StatisticsComponent from '@/components/StatisticsComponent.vue';


</script>
