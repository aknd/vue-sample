import Vue from 'vue'
import { App, router, store } from '@/app'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
