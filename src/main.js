import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import VueLocalStorage from 'vue-localstorage'


Vue.config.productionTip = false
import axios from 'axios'

Vue.prototype.$http= axios
Vue.use(VueLocalStorage, {
  name: 'ls',
  bind: true //created computed members from your variable declarations
})
axios.defaults.baseURL = 'http://localhost:8081'
axios.defaults.headers.post['Content-Type'] = 'application/json';

new Vue({
  render: h => h(App),
}).$mount('#app')
