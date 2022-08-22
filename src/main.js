// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import $ from 'jquery'
import store from './control/index'
import './config/rem'
import './config/rotate';
import './style/base.css'
import 'mint-ui/lib/style.css'
//import 'element-ui/lib/theme-default/index.css'
import MintUI from 'mint-ui'

import VueClipboard from 'vue-clipboard2';
Vue.use(VueClipboard);

import GoogleLogin from 'vue-google-login';
Vue.use(GoogleLogin)

import facebookLogin from 'facebook-login-vuejs';
Vue.use(facebookLogin)

import GoogleSignInButton from 'vue-google-signin-button-directive'
new Vue({
    GoogleSignInButton,
    // render: h => h(App),
}).$mount('#app')
import FacebookLoginButton from 'vue-facebook-login-button-directive'
new Vue({
    FacebookLoginButton,
}).$mount('#app')
import { MonthPicker } from 'vue-month-picker'
import { MonthPickerInput } from 'vue-month-picker'

Vue.use(MonthPicker)
Vue.use(MonthPickerInput)

import scrollTitle from "./utils/scrollTitle";
Vue.prototype.showScroll = scrollTitle;

import QRCode from "qrcodejs2";
Vue.prototype.$qrCode = QRCode;

import VueQRCodeComponent from 'vue-qrcode-component'
Vue.component('qr-code', VueQRCodeComponent)
const myanmarPhoneNumber = require('myanmar-phonenumber');
Vue.prototype.myanmarPhoneNumber = myanmarPhoneNumber;

//检验字符串不为空
import checkWord from "./utils/nullCheck";
Vue.prototype.showCheck = checkWord;

Vue.filter('formatDate', function(value) { //时间戳转换
    var time = new Date(Number(value) * 1000);
    var Y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var H = time.getHours();
    var mi = time.getMinutes();
    var s = time.getSeconds();
    if (m < 10) {
        m = '0' + m;
    }
    if (d < 10) {
        d = '0' + d;
    }
    if (H < 10) {
        H = "0" + H;
    }
    if (mi < 10) {
        mi = '0' + mi;
    }
    if (s < 10) {
        s = "0" + s;
    }
    return (Y + "-" + m + "-" + d + " " + H + ":" + mi + ":" + s);
});
Vue.filter('keepTwoNum', function(value) {
    value = Number(value);
    var b = value.toFixed(3);
    return b.substring(0, b.toString().length - 1)
});
Vue.prototype.msg = function(msg) {
    return msg.replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    msg.replace(/&lt;/g, "<")
    msg.replace(/&gt;/g, ">")
    msg.replace(/&quot;/g, "\"")
    msg.replace(/&#39;/g, "\'");
};
import httpConfig from './httpConfig';
import constant from './config/constant';
import HTTP from './config/HTTP';
Vue.prototype.$HTTP = HTTP;
Vue.prototype.$constant = constant;
Vue.prototype.$httpConfig = httpConfig;
// import { Spinner } from 'mint-ui'
import '../config/globle.js' //常量
const URl = URL,
    load_wrap = true;
Vue.config.productionTip = false;
axios.defaults.withCredentials = true; //让ajax携带cookie
Vue.prototype.axios = axios;

Vue.prototype.URL = URl;

// Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(MintUI);


import wx from 'weixin-js-sdk'
Vue.prototype.$wx = wx;

//wechat
import VueWeChatShare from 'vue-wechat-share'
Vue.use(VueWeChatShare)

import OtpInput from "@bachdgvn/vue-otp-input";
Vue.component("v-otp-input", OtpInput);

// import WeChatShare from './lib/wechatSocialShare.js';
// Vue.prototype.$wechat = WeChatShare;
import WeChatShare from './utils/wxSocialshare.js';
Vue.use(WeChatShare)
Vue.prototype.$wechat = WeChatShare;

// import { Indicator } from 'mint-ui';
Vue.directive('title', {
    inserted: function(el, binding) {
        document.title = el.innerText
        el.remove()
    }
});
Vue.directive('img', {
    inserted: function(el, bindimg) {
        let color = Math.floor(Math.random() * 1000000);
        ek.style.backgroundColor = "#" + color;

        let img = new Image();
        img.src = binding.value;
        img.onload = function() {
            el.style.backgroundImage = `url${binding.value}`
        }
    }
});

router.beforeEach((to, from, next) => {
    // Indicator.open('初始化...');
    switch (to.name) {
        case 'home':
            {
                sessionStorage.setItem('router_index', 0);
                document.title = "MGD MALL";
            }
            break;
        case 'class':
            sessionStorage.setItem('router_index', 1);
            break;
        case 'activity':
            sessionStorage.setItem('router_index', 2);
            break;
        case 'Cart':
            sessionStorage.setItem('router_index', 3);
            break;
        case 'person':
            sessionStorage.setItem('router_index', 4);
            break;
    };
    next();
});
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})