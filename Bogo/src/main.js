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



import scoreView from './pages/components/ScoreView'
import integralItem from './pages/components/IntegralItem'
import imgSelectItems from './pages/components/imgSelectItems'

// Import App Component
import app from './main.vue'
import store from './store/index'
import axios from 'axios'

// var axiosInstance = axios.create({
//   baseURL: location.protocol + '//127.0.0.1:8081/',
//   transformRequest: function (data) {
//     return Qs.stringify(data)
//   },
//   headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
// })
//
// Vue.use(VueAxios, axiosInstance)

import config from 'config'
import {GameManager} from 'data/gamemanager'
// 注册全局自定义组件
Vue.component('score-view', scoreView)
Vue.component('integral-item', integralItem)
Vue.component('img-select-items', imgSelectItems)

import {DefaultSocket} from 'socket/socket'
import {DataManager} from "src/data/datamanager";


//Vue.use(vueTouch)
Vue.prototype.$axios = axios;
Vue.prototype.$config = config;
Vue.prototype.$gameManager = new GameManager();
Vue.prototype.$websocket = new DefaultSocket(config.connectIp, config.connectPort, false, true);
Vue.prototype.$dataManager = new DataManager();
Framework7.use(Framework7Vue)

Vue.prototype.$EventBus = new Vue()
// Init Vue App
export default new Vue({
  // Root Element
  el: '#app',
  store,
  render: c => c('app'),
  components: {
    app
  },
});
