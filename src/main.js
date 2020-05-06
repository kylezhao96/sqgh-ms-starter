import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// import VueLocalStorage from 'vue-localstorage'
import VueRouter from 'vue-router'
import WorkBench from './components/WorkBench.vue'
import Analysis  from './components/Analysis.vue'


Vue.config.productionTip = false
import axios from 'axios'

Vue.prototype.$http= axios
// Vue.prototype.prefixInteger = function(num, n) {
//   return (Array(n).join(0) + num).slice(-n);
// }
// Vue.use(VueLocalStorage, {
//   name: 'ls',
//   bind: true //created computed members from your variable declarations
// })
Vue.use(VueRouter)
Vue.use(ElementUI)

axios.defaults.baseURL = 'http://localhost:8081'
axios.defaults.headers.post['Content-Type'] = 'application/json';

const routes  = [
  {path:'/',component:WorkBench },
  {path:'/workbench', component:WorkBench},
  {path:'/analysis', component:Analysis}
]   
const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
