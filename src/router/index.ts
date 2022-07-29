import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/folder/home',
    component: () => import ('../views/FolderPage.vue')
  },
  {
    path: '/folder/mis_viajes',
    component: () => import ('../views/MisViajesPage.vue')
  },
  {
    path: '/login',
    component: () => import ('../views/LoginPage.vue')
  },
  {
    path: '/register',
    component: () => import ('../views/RegisterPage.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
