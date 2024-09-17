<template>
  <div>
    <!-- Title Section -->
    <div class="text-center pt-20">
      <h2 class="text-3xl font-bold leading-tight sm:text-4xl xl:text-5xl" style="color: #B99269;">
        {{ t('projects.title') }}
      </h2>
      <hr class="my-4 mt-8 border-t-2 border-gray-300 dark:border-yellow-500 w-1/3 mx-auto">
    </div>

    <!-- Slider Section -->
    <section class="flex flex-col lg:h-vh justify-center items-center w-full">
      <div class="flex overflow-hidden w-full relative max-h-[500px]">

        <!-- Slide Wrapper with Animated Transitions -->
        <div class="flex transition-transform duration-700 ease-in-out"
          :style="{ transform: `translateX(-${currentIndex * (100 / imagesToShow)}%)` }">
          
          <!-- Loop through Projects and display them -->
          <div
            v-for="(image, index) in limitedProjects"
            :key="index"
            class="relative flex flex-col items-center m-1 transition ease-in-out duration-700 shrink-0"
            :class="{'w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5': true}"
          >
            <article
              class="mx-auto rounded-3xl overflow-hidden bg-cover ring-2 ring-inset ring-white/50 bg-center min-h-[300px] relative transform duration-700 group hover:scale-100 transition-all ease-in-out"
              :style="{ backgroundImage: `url(${image.main_image})` }"
            >
              <!-- Hover Effect with Description -->
              <div class="relative h-full group-hover:bg-opacity-0 min-h-150 flex flex-wrap flex-col pt-[30rem] md:pt-[22rem] transition duration-500 ease-in-out">
                <div class="group-hover:bg-black/60 p-8 lg:p-10 h-full justify-end flex flex-col transition duration-500 ease-in-out">
                  <p class="opacity-0 text-white text-sm 2xl:text-lg group-hover:opacity-90 transition-all duration-700 ease-in-out">
                    {{ image.name }}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Slider Navigation Buttons -->
        <button @click="prevSlide"
          class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-4 py-2 rounded-full z-10 hover:bg-yellow-500 transition-all duration-300 ease-in-out" style="direction: ltr;">
          ‹
        </button>
        <button @click="nextSlide"
          class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-4 py-2 rounded-full z-10 hover:bg-yellow-500 transition-all duration-300 ease-in-out"
          style="direction: ltr;">
          ›
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios'; // Import Axios
import { useI18n } from 'vue-i18n';
import { BASE_URL } from '@/config';
const { t } = useI18n();

const projects = ref([]); // Use ref to hold fetched data
const currentIndex = ref(0);
const MAX_PROJECTS = 6; // Maximum number of projects to display

// Function to limit the number of projects displayed
const limitedProjects = computed(() => {
  return projects.value.slice(0, MAX_PROJECTS);
});

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % projects.value.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + projects.value.length) % projects.value.length;
};

// Function to fetch project data
const fetchProjects = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/projects`);
    const allProjects = response.data.data;

    // Flattening the project data
    const flattenedProjects = allProjects.reduce((acc, project) => {
      return [...acc, ...project.projects];
    }, []);

    // Update the projects ref with the flattened project data
    projects.value = flattenedProjects;
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
};

// Fetch projects on mount
onMounted(() => {
  fetchProjects();

  setInterval(() => {
    nextSlide();
  }, 5000); // Auto-slide every 5 seconds
});
</script>

<style scoped>
/* Custom Styling for Slide Effect and Layout */
section {
  position: relative;
  margin: 50px auto;
}

article {
  max-width: 280px;
  max-height: 400px;
}

button {
  background-color: rgba(0, 0, 0, 0.5);
}

button:hover {
  background-color: rgba(185, 146, 105, 0.9); /* Highlight color for hover */
}

/* Media queries to handle different screen sizes */
@media (max-width: 640px) {
  .w-full {
    width: 100%;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .w-1\2 {
    width: 50%;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .w-1\3 {
    width: 33.33%;
  }
}

@media (min-width: 1025px) and (max-width: 1280px) {
  .w-1\4 {
    width: 25%;
  }
}

@media (min-width: 1281px) {
  .w-1\5 {
    width: 20%;
  }
}
</style>
