import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { registerMicroApps, start } from 'qiankun'
Vue.config.productionTip = false
Vue.use(VueRouter)
const routes = []
const router = new VueRouter({
  mode: 'history',
  routes // (缩写) 相当于 routes: routes
})

const apps = [
  {
    name: 'vueApp',
    entry: 'http://localhost:10000/',
    container: '#vue',
    activeRule: '/vue'
  },
]

registerMicroApps(apps)
start()

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
