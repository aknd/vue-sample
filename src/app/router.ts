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
    component: () =>
      import(
        /* webpackChunkName: 'todo-list-page' */ '@/todos'
      ).then(m => m.TodoListPage)
  },
  {
    path: '/loading_button',
    name: 'LoadingButtonPage',
    component: () =>
      import(
        /* webpackChunkName: 'loading-button-page' */ '@/loadingButton'
      ).then(m => m.LoadingButtonPage)
  },
  {
    path: '/job_errors',
    name: 'JobErrorsPage',
    component: () =>
      import(
        /* webpackChunkName: 'job-errors-page' */ '@/jobErrors'
      ).then(m => m.JobErrorsPage)
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: () =>
      import(
        /* webpackChunkName: 'cart-page' */ '@/cart'
      ).then(m => m.CartPage)
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
