import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import QueueView from '@/views/QueueView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: QueueView
  },
  {
    path: '/record',
    name: 'Record',
    component: () => import('../views/RecordView.vue')
  }, 
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/AdminView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
