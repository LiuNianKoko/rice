import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import util from '@/common/util.js'
Vue.prototype.$util = util;

import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store

import cuCustom from './components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
