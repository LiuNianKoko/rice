import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		address:{},//地址
		addrName:'',//收件人姓名
		orderData:{},//订单数据
		sortId:0,//分类id
	},
    mutations: {
    	
    },
    actions: {}
})
export default store