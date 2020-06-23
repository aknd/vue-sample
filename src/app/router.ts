import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { TopPage } from '@/top'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'TopPage',
    component: TopPage
  },
  {
    path: '/todos',
    name: 'TodoListPage',
    // route level code-splitting
    // this generates a separate chunk (todo-list-page.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: 'todo-list-page' */ '@/todos/TodoListPage.vue')
  },
  {
    path: '/loading_button',
    name: 'LoadingButtonPage',
    // route level code-splitting
    // this generates a separate chunk (loading-button-page.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: 'loading-button-page' */ '@/loadingButton/LoadingButtonPage.vue')
  },
  {
    path: '/job_errors',
    name: 'JobErrorsPage',
    // route level code-splitting
    // this generates a separate chunk (job-errors-page.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: 'job-errors-page' */ '@/jobErrors/JobErrorsPage.vue')
  },
  {
    path: '/cart',
    name: 'CartPage',
    // route level code-splitting
    // this generates a separate chunk (cart-page.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: 'cart-page' */ '@/cart/CartPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
