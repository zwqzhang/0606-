// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// 引入jquery
import $ from 'jquery'
Vue.prototype.$=$;

// 引入animate.css
import 'animate.css'

// 引入axios
import axios from 'axios'
Vue.prototype.$http=axios

// 引入全局组件
import comComponent from './components/common/index'
for(var i in comComponent){
  Vue.component(i,comComponent[i])
}
// 全局过滤器
import filters from './filters'
for (var i in filters) {
  Vue.filter(i, filters[i])
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
