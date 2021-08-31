import './public-path';
import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
let install=null

function render () {
  install=new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap () {
}

export async function mount (props) {
  console.log(props)
  render(props)
}

export async function unmount () {
  install.$destroy()
}