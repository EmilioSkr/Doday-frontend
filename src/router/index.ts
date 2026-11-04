import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/tasks',
      name: 'tasks',
      // route level code-splitting: wird erst beim Aufruf der Route geladen
      component: () => import('../views/TaskView.vue'),
    },
    {
      path: '/habits',
      name: 'habits',
      component: () => import('../views/HabitView.vue'),
    },
  ],
})

export default router
