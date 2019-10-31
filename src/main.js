// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import FastClick from 'fastclick'
// FastClick.attach(document.body);
//引入图标
import './assets/css/iconfont.css'
//引入适配font.js文件
// import './assets/js/font.js'
//引入bootstrap
import jquery from 'jquery'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min'
//引入主题样式
// import '@/assets/css/topic.less'
//引入axios
import axios from 'axios'
Vue.prototype.axios = axios
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.baseURL = apiConfig.baseUrl;
//弹框插件
import layer from 'vue-layer'
import 'vue-layer/lib/vue-layer.css'
Vue.prototype.$layer = layer(Vue);

import share from 'vue-shares'
Vue.use(share)
Vue.component('V-share',share)

Vue.config.productionTip = false

// Vue.prototype.commonUrl = 'http://10.111.144.242:8080'; // SUST
// Vue.prototype.mainUrl = 'http://10.111.144.242:8080';
// Vue.prototype.mainUrl = 'http://192.168.0.109:8080' // 2A311
// Vue.prototype.commonUrl = 'http://192.168.0.109:8080'
Vue.prototype.commonUrl = 'http://patriotiosm.duizhankeji.com:8181'; // 服务器
Vue.prototype.mainUrl = 'http://patriotiosm.duizhankeji.com:8181';

//时间戳解码
Vue.filter('formatDate',function (value) {
    let date = new Date(value);
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes();
    m = m < 10 ? ('0' + m) : m;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
