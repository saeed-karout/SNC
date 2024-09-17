import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ServiceView from '@/views/ServiceView.vue';
import ProjectsView from '@/views/ProjectsView.vue';
import ProjectDetailsPage from '../components/projects/ProjectDetailsPage.vue';
import NewsList from '@/views/NewsView.vue';
import NewsDetail from '@/components/NewsDetail.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/service',
      name: 'service',
      component: ServiceView
    },
    {
      path: '/service/:selectedFeature',
      name: 'service-detail',
      component: ServiceView,
      props: true
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/news',
      name: 'news-list',
      component: NewsList
    },
    {
      path: '/news/:id',
      name: 'news-detail',
      component: NewsDetail,
      props: true
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView
    },
    {
      path: '/projects/:id',
      name: 'project-details',
      component: ProjectDetailsPage,
      props: true // تأكد من تمرير الـ id كـ prop إلى المكون
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: () => import('../components/errorView.vue')
    }
  ]
});

export default router;
