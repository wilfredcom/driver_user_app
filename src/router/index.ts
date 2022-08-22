import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { Storage } from '@capacitor/storage';

import store from '../store/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/login',
    
  },
  {
    path: '/folder/home',
    component: () => import('../views/FolderPage.vue'),
    beforeEnter: async () => {
      const user_login: any = await Storage.get({ key: 'user_login' });
      
      if (user_login.value == null) {
        return { path: '' }
      } else {
        store.commit('setUser', JSON.parse(user_login.value).user)
        return true
      }

    },
  },
  {
    path: '/folder/mis_viajes',
    component: () => import('../views/MisViajesPage.vue')
  },
  {
    path: '/login',
    component: () => import('../views/LoginPage.vue'),
    beforeEnter: async () => {
      const user_login: any = await Storage.get({ key: 'user_login' });
      if (user_login.value != null) {
        return { path: '/folder/home' }
      } else {
        return true
      }

    },
  },
  {
    path: '/register',
    component: () => import('../views/RegisterPage.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router
