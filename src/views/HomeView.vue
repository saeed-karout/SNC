<template>


  <div >
    <Videos />
    <StatisticsComponent />
    <Service />
    <ProjectsComponents />
    <Carousel />
    <ContactView />
    <profileCompany />
  
  </div>
</template>

<script setup>
import Videos from '@/components/VideoHomeComponent.vue';
import Service from '@/components/serviceComponent.vue';
import ContactView from './ContactView.vue';
import Carousel from '@/components/Carousel.vue';
import ProjectsComponents from '@/components/ProjectsComponents.vue';
import StatisticsComponent from '@/components/StatisticsComponent.vue';
import profileCompany from '@/components/profileCompany.vue';



</script>
