(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-viper-vipGoods"],{1376:function(t,e,i){"use strict";var o;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){return o}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[0==t.current?i("v-uni-view",{staticClass:"pri-goods"},[i("v-uni-view",{staticClass:"pri-quota"},[t.userInfo.total_catty?i("v-uni-view",{staticClass:"quota-total"},[t._v("总额度："+t._s(t.userInfo.total_catty)+"斤")]):i("v-uni-view",{staticClass:"quota-total"},[t._v("总额度：0斤")]),t.userInfo.surplus_catty?i("v-uni-view",{staticClass:"quota-last"},[t._v("剩余额度："+t._s(t.userInfo.surplus_catty)+"斤")]):i("v-uni-view",{staticClass:"quota-total"},[t._v("剩余额度：0斤")])],1),i("v-uni-view",{staticClass:"recomon"},[i("v-uni-view",{staticClass:"recomon-main disFlex"},t._l(t.tequan,(function(e){return i("v-uni-view",{key:e.id,staticClass:"recomon-item marginBottom20",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.toDetail(e.id,e.catty)}}},[i("v-uni-image",{attrs:{src:e.cover,alt:""}}),i("v-uni-view",{staticClass:"recomon-text"},[i("v-uni-view",{staticClass:"recomon-title line1"},[t._v(t._s(e.goods_name))]),i("v-uni-view",{staticClass:" recomon-intr line1"},[t._v(t._s(e.desc))]),i("v-uni-view",{staticClass:"recomon-price-wrap disFlex"},[i("v-uni-view",{staticClass:"recomon-price"},[i("v-uni-text",{staticClass:"symbol"},[t._v("￥")]),t._v(t._s(e.member_price))],1),i("v-uni-image",{staticClass:"gouwuche",attrs:{src:"/static/gouwuche2.png"}})],1)],1)],1)})),1)],1)],1):t._e(),1==t.current?i("v-uni-view",{staticClass:"gift-goods"},[i("v-uni-view",{staticClass:"recomon"},[i("v-uni-view",{staticClass:"recomon-main disFlex"},t._l(t.tequan,(function(e){return i("v-uni-view",{key:e.id,staticClass:"recomon-item marginBottom20",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.toGiftDetail(e.id,e.catty)}}},[i("v-uni-image",{attrs:{src:e.cover,alt:""}}),i("v-uni-view",{staticClass:"recomon-text"},[i("v-uni-view",{staticClass:"recomon-title line1"},[t._v(t._s(e.goods_name))]),i("v-uni-view",{staticClass:" recomon-intr line1"},[t._v(t._s(e.desc))]),i("v-uni-view",{staticClass:"recomon-price-wrap disFlex"},[i("v-uni-view",{staticClass:"recomon-price"},[i("v-uni-text",{staticClass:"symbol"},[t._v("￥")]),t._v("0")],1),i("v-uni-image",{staticClass:"gouwuche",attrs:{src:"/static/gouwuche2.png"}})],1)],1)],1)})),1)],1)],1):t._e()],1)},n=[]},"3d35":function(t,e,i){"use strict";i.r(e);var o=i("1376"),a=i("e40c");for(var n in a)"default"!==n&&function(t){i.d(e,t,(function(){return a[t]}))}(n);i("f991");var r,s=i("f0c5"),c=Object(s["a"])(a["default"],o["b"],o["c"],!1,null,"04a0750c",null,!1,o["a"],r);e["default"]=c.exports},"5c6e":function(t,e,i){var o=i("c921");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var a=i("4f06").default;a("291e7176",o,!0,{sourceMap:!1,shadowMode:!1})},"82cc":function(t,e,i){"use strict";var o=i("4ea4");i("99af"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(i("8cc3")),n={data:function(){return{priGoods:["特权商品","礼包商品"],current:0,list:{},tequan:[],type:1,userInfo:{},page:1}},onLoad:function(){this.getList(),this.getUserInfo()},onReachBottom:function(){this.getNewList()},methods:{changePri:function(t){this.current=t,this.getList()},toDetail:function(t,e){uni.navigateTo({url:"/pages/index/detail?goodsid="+t+"&tequan=tequan"})},toGiftDetail:function(t,e){uni.navigateTo({url:"/pages/index/giftDetail?goodsid="+t+"&gift=gift"})},getUserInfo:function(){var t=this,e={token:uni.getStorageSync("token")};(0,a.default)("/api/User/get_userinfo","post",e).then((function(e){"200"==e.data.status&&(t.userInfo=e.data.data),console.log(e)}))},getList:function(){var t=this;0==t.current?t.type=1:1==t.current&&(t.type=2);var e={token:uni.getStorageSync("token"),type:t.type,page:1,pagesize:10};(0,a.default)("/api/user/getMemberGoods","post",e).then((function(e){"200"==e.data.status&&(t.list=e.data.data,t.tequan=e.data.data.goodsLists),console.log(e)}))},getNewList:function(){var t=this;0==this.current?this.type=1:1==this.current&&(this.type=2);var e={token:uni.getStorageSync("token"),page:this.page+1,type:this.type};(0,a.default)("/api/user/getMemberGoods","post",e).then((function(e){"400"!=e.data.status?(t.page++,t.tequan=t.tequan.concat(e.data.data.goodsLists)):t.$util.showToast(e.data.msg)}))}}};e.default=n},c921:function(t,e,i){var o=i("24fb");e=o(!1),e.push([t.i,".header[data-v-04a0750c]{height:%?86?%;border-top:%?2?% solid #f2f2f5;line-height:%?80?%;padding:0 %?190?%;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.header .header-title[data-v-04a0750c]{font-size:%?32?%}.header .header-title .vip-line[data-v-04a0750c]{width:%?124?%;height:%?6?%;background:#fb4142;-webkit-border-radius:%?3?%;border-radius:%?3?%}.pri-goods .pri-quota[data-v-04a0750c]{height:%?50?%;margin-top:%?40?%;line-height:%?50?%;padding:0 %?50?%;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.recomon[data-v-04a0750c]{width:100%;padding:0 %?34?%;-webkit-box-sizing:border-box;box-sizing:border-box}.recomon .recomon-main[data-v-04a0750c]{margin-top:%?30?%;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-flex-wrap:wrap;flex-wrap:wrap}.recomon .recomon-main .recomon-item[data-v-04a0750c]{width:%?335?%;background:#fff;-webkit-box-shadow:0 0 %?20?% 0 rgba(0,0,0,.1);box-shadow:0 0 %?20?% 0 rgba(0,0,0,.1);-webkit-border-radius:%?10?%;border-radius:%?10?%}.recomon .recomon-main .recomon-item uni-image[data-v-04a0750c]{width:%?335?%;height:%?335?%}.recomon .recomon-main .recomon-item .recomon-text[data-v-04a0750c]{padding:%?25?% %?20?%}.recomon .recomon-main .recomon-item .recomon-text .recomon-title[data-v-04a0750c]{width:%?279?%;font-size:%?32?%;line-height:%?40?%;color:#333;margin-bottom:%?4?%}.recomon .recomon-main .recomon-item .recomon-text .recomon-intr[data-v-04a0750c]{width:%?259?%;line-height:%?30?%;font-size:%?24?%;color:#939393;margin-bottom:%?30?%}.recomon .recomon-main .recomon-item .recomon-text .recomon-price-wrap[data-v-04a0750c]{width:100%;position:relative}.recomon .recomon-main .recomon-item .recomon-text .recomon-price-wrap .recomon-price[data-v-04a0750c]{font-weight:700;color:#ec614a;font-size:%?36?%}.recomon .recomon-main .recomon-item .recomon-text .recomon-price-wrap .pri-num[data-v-04a0750c]{font-size:%?24?%}.recomon .recomon-main .recomon-item .recomon-text .recomon-price-wrap .symbol[data-v-04a0750c]{font-size:%?24?%}.recomon .recomon-main .recomon-item .recomon-text .recomon-price-wrap .gouwuche[data-v-04a0750c]{-webkit-border-radius:50%;border-radius:50%;width:%?58?%;height:%?56?%;position:absolute;top:%?-10?%;right:%?-6?%}",""]),t.exports=e},e40c:function(t,e,i){"use strict";i.r(e);var o=i("82cc"),a=i.n(o);for(var n in o)"default"!==n&&function(t){i.d(e,t,(function(){return o[t]}))}(n);e["default"]=a.a},f991:function(t,e,i){"use strict";var o=i("5c6e"),a=i.n(o);a.a}}]);