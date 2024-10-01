<template>
  <div class="flex ">
    <!-- Sidebar -->
    <div class="w-64 bg-gray-800 text-[#B99269] p-4 ">
      <h2 class="text-xl font-bold mb-6">Projects</h2>
      <nav class="space-y-4">
        <button
          v-for="project in allProjects"
          :key="project.id"
          @click="goToProject(project.id)"
          :class="[
            'w-full text-xl p-4 rounded-lg opacity-80 transition-colors duration-300',
            selectedProjectId === project.id ? 'bg-gray-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-[#B99269]'
          ]"
        >
          {{ project.name }}
        </button>
      </nav>
    </div>

    <!-- Project Details -->

  </div>
</template>

<script>

export default {
  data() {
    return {
      allProjects: [], // قائمة جميع المشاريع
      selectedProject: null, // المشروع الذي تم اختياره
      selectedProjectId: null, // معرف المشروع المختار
    };
  },
  created() {
    this.fetchProjects();
  },
  watch: {
    // مراقبة معرف المشروع وتحديث التفاصيل
    '$route.params.id': {
      immediate: true,
      handler(newId) {
        this.goToProject(newId);
      }
    }
  },
  methods: {
    // جلب قائمة المشاريع
    fetchProjects() {
      fetch('https://snc.shamnet.com.sa/api/projects')
        .then(response => response.json())
        .then(data => {
          this.allProjects = data.data;
          if (this.$route.params.id) {
            this.goToProject(this.$route.params.id);
          }
        });
    },
    // جلب تفاصيل المشروع عند تغييره
    goToProject(projectId) {
      this.selectedProjectId = projectId;
      fetch(`https://snc.shamnet.com.sa/api/projects/${projectId}`)
        .then(response => response.json())
        .then(data => {
          this.selectedProject = data.data;
        });
    }
  }
};
</script>

<style scoped>


.overflow-y-auto {
  overflow-y: auto;
}
</style>
