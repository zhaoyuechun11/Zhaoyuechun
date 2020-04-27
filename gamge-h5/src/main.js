// Import Vue
import Vue from 'vue'
// Import Framework7
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import Framework7 Vue
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import F7 Style
import Framework7CSS from 'framework7/css/framework7.md.min.css'

// Import Material Icons
import MaterialIcons from 'material-design-icons/iconfont/material-icons.css'

// Import F7 iOS Icons
import Framework7Icons from 'framework7-icons/css/framework7-icons.css'

// Import Fontawesome Theme Styles
import FontAwesome from 'font-awesome/css/font-awesome.css'

// Import App Custom Styles
import AppStyles from './assets/sass/main.scss'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// Import App Component
import app from './main.vue'
import store from './store/index'
import axios from 'axios'
import routers from './routes.js'
import VueRouter from 'vue-router'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller);
Vue.use(ElementUI);

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//注册
Vue.use(VueRouter);


import config from 'config'
import {GameManager} from 'data/gamemanager'
// 注册全局自定义组件
// Vue.component('img-select-items', imgSelectItems)

import {DefaultSocket} from 'socket/socket'
import {DataManager} from "src/data/datamanager"
import  VConsole  from  'vconsole'
const  vConsole = new VConsole() 

//Vue.use(vueTouch)
Vue.prototype.$axios = axios;
Vue.prototype.$config = config;
Vue.prototype.$gameManager = new GameManager();
Vue.prototype.$websocket = new DefaultSocket(config.connectIp, config.connectPort, false, true);
Vue.prototype.$dataManager = new DataManager();
Framework7.use(Framework7Vue)

Vue.prototype.$EventBus = new Vue()


const router = new VueRouter({
  mode: 'hash',
  routes: routers
})
axios.interceptors.request.use(function(config){  
  store.dispatch('showloader')  
    return config  
},function(err){  
    return Promise.reject(err)  
});  
axios.interceptors.response.use(function(response){  
  store.dispatch('hideloader')  
    return response  
},function(err){  
    return Promise.reject(err)  
});  

// Init Vue App
export default new Vue({
  // Root Element
  el: '#app',
  router,
  store:store,
  render: c => c('app'),
  components: {
    app
  },
});
