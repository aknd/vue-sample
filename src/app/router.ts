import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { TopPage } from '@/top'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'TopPage',
    component: TopPage
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
