import Vue from 'vue'
import App from './App'

import InitRequest from './common/common.js'
Vue.prototype._$InitRequest = InitRequest;
import ImageSrc from './common/common.js'
Vue.prototype._globalSrc = ImageSrc.imageSrc
import userToken from './common/common.js'
Vue.prototype._$userToken = userToken.userToken


Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
