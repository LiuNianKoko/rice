import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store=new Vuex.Store({
    state:{
        atoggle:1
    },
    mutations:{
        changeAclick(state,type) {
            state.atoggle=type
        }
    }
})
export default store