(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-address-address"],{1150:function(e,a,t){var i=t("1da8");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var d=t("4f06").default;d("1d7ebcfb",i,!0,{sourceMap:!1,shadowMode:!1})},"1da8":function(e,a,t){var i=t("24fb");a=i(!1),a.push([e.i,".header-wrap[data-v-1412ee49]{width:100%;position:fixed;top:0;z-index:999;background:-webkit-gradient(linear,left top,right top,from(#60bff7),to(#00a0e9));background:-webkit-linear-gradient(left,#60bff7,#00a0e9);background:linear-gradient(90deg,#60bff7,#00a0e9)}.header-wrap .index-header[data-v-1412ee49]{height:%?176?%;padding:0 %?30?%;padding-top:%?100?%;-webkit-box-sizing:border-box;box-sizing:border-box;text-align:center;font-size:%?40?%;color:#fff;position:relative}.header-wrap .index-header .back-icon[data-v-1412ee49]{width:%?25?%;height:%?44?%}.header-wrap .index-header .back-icon-wrap[data-v-1412ee49]{width:%?50?%;height:%?50?%;position:absolute;left:%?32?%;top:%?106?%}.header-wrap .index-header .addNew[data-v-1412ee49]{position:absolute;right:%?32?%;top:%?110?%}.blank[data-v-1412ee49]{width:100%;height:%?176?%}.address-wraps[data-v-1412ee49]{position:absolute;width:100%;height:100%;background-color:#f2f2f5}.address-empty[data-v-1412ee49]{height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.address-empty .address-img[data-v-1412ee49]{margin-top:%?-80?%}.address-empty .address-img uni-image[data-v-1412ee49]{width:%?243?%;height:%?233?%}.address-empty .address-text[data-v-1412ee49]{font-size:%?32?%;font-weight:700;margin-top:%?60?%}.address-empty .address-intr[data-v-1412ee49]{color:#aaa;margin-bottom:%?30?%;margin-top:%?30?%}.address-empty .address-btn[data-v-1412ee49]{width:%?240?%;height:%?66?%;background:#45b443;-webkit-box-shadow:0 %?10?% %?20?% 0 rgba(69,67,180,.35);box-shadow:0 %?10?% %?20?% 0 rgba(69,67,180,.35);-webkit-border-radius:%?33?%;border-radius:%?33?%;line-height:%?66?%;color:#fff;text-align:center;font-weight:700;letter-spacing:%?5?%}.address-full[data-v-1412ee49]{margin-top:%?26?%;background-color:#fff;padding:0 %?30?%;-webkit-box-sizing:border-box;box-sizing:border-box}.address-full .address-item[data-v-1412ee49]{height:%?210?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.address-full .address-item .address-person[data-v-1412ee49]{width:100%;height:%?210?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.address-full .address-item .address-person .person-name[data-v-1412ee49]{font-size:%?32?%}.address-full .address-item .address-person .person-name .person-phone[data-v-1412ee49]{color:#aaa}.address-full .address-item .address-person .person-location[data-v-1412ee49]{margin-top:%?20?%;font-size:%?24?%}.address-full .address-item .address-edit[data-v-1412ee49]{width:%?100?%;height:%?50?%;font-size:%?24?%;color:#aaa;border-left:1px solid #eee;text-align:right;line-height:%?50?%}.default-sign[data-v-1412ee49]{color:red;font-size:%?24?%;background-color:#fff0f0;margin-right:%?10?%}",""]),e.exports=a},"96a5":function(e,a,t){"use strict";var i;t.d(a,"b",(function(){return d})),t.d(a,"c",(function(){return s})),t.d(a,"a",(function(){return i}));var d=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("v-uni-view",{staticClass:"address-wraps"},[t("v-uni-view",{staticClass:"header-wrap"},[t("v-uni-view",{staticClass:"index-header"},[e._v("收货地址"),t("v-uni-view",{staticClass:"back-icon-wrap",on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.toMine.apply(void 0,arguments)}}},[t("v-uni-image",{staticClass:"back-icon",attrs:{src:"/static/back-icon.png"}})],1),t("v-uni-text",{staticClass:"addNew",on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.toAddAddress.apply(void 0,arguments)}}},[e._v("添加新地址")])],1)],1),t("v-uni-view",{staticClass:"blank"}),e.isEmpty?t("v-uni-view",{staticClass:"address-empty"},[t("v-uni-view",{staticClass:"address-img"},[t("v-uni-image",{attrs:{src:e.imag+"empty-address.png"}})],1),t("v-uni-view",{staticClass:"address-text"},[e._v("暂未设置")]),t("v-uni-view",{staticClass:"address-intr"},[e._v("没有收货地址寄不了快递哦~")]),t("v-uni-view",{staticClass:"address-btn",on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.toAddAddress.apply(void 0,arguments)}}},[e._v("新增地址")])],1):e._e(),e.isEmpty?e._e():t("v-uni-view",{staticClass:"address-full"},e._l(e.addressList,(function(a){return t("v-uni-view",{key:a.id,staticClass:"address-item scale-1px-bottom"},[t("v-uni-view",{staticClass:"address-person",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.toPayPage(a.id)}}},[t("v-uni-view",{staticClass:"person-name"},[e._v(e._s(a.username)),t("v-uni-text",{staticClass:"person-phone margingLeft20"},[e._v(e._s(a.phone))])],1),t("v-uni-view",{staticClass:"person-location"},[1==a.default?t("v-uni-text",{staticClass:"default-sign"},[e._v("默认")]):e._e(),e._v(e._s(a.address)+" "+e._s(a.detail_address))],1)],1),t("v-uni-view",{staticClass:"address-edit",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.toEdit(a.id)}}},[e._v("编辑")])],1)})),1)],1)},s=[]},"9af8":function(e,a,t){"use strict";t.r(a);var i=t("96a5"),d=t("9d46");for(var s in d)"default"!==s&&function(e){t.d(a,e,(function(){return d[e]}))}(s);t("c4a1");var n,r=t("f0c5"),o=Object(r["a"])(d["default"],i["b"],i["c"],!1,null,"1412ee49",null,!1,i["a"],n);a["default"]=o.exports},"9d46":function(e,a,t){"use strict";t.r(a);var i=t("b5e1"),d=t.n(i);for(var s in i)"default"!==s&&function(e){t.d(a,e,(function(){return i[e]}))}(s);a["default"]=d.a},b5e1:function(e,a,t){"use strict";var i=t("4ea4");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var d=i(t("5530")),s=i(t("8cc3")),n=getApp(),r={data:function(){return{imag:n.globalData.imag,isEmpty:!0,addressList:[],orderdata:{},changeType:0,member:"",tequan:"",group_buy_records_id:0}},onLoad:function(e){this.changeType=e.changeType,e.member&&(this.member=e.member),e.tequan&&(this.tequan=e.tequan),e.recordid&&(this.group_buy_records_id=e.recordid),this.getAddress()},onShow:function(){this.getAddress()},methods:{toAddAddress:function(){uni.navigateTo({url:"/pages/index/address/addAddress?member="+this.member+"&tequan="+this.tequan+"&changeType="+this.changeType+"&recordid="+this.group_buy_records_id})},toEdit:function(e){uni.navigateTo({url:"/pages/index/address/editAddress?id="+e+"&member="+this.member+"&tequan="+this.tequan+"&changeType="+this.changeType+"&recordid="+this.group_buy_records_id})},toPayPage:function(e){if(0!=this.changeType)if(1==this.changeType){console.log(uni.getStorageSync("orderdata"));var a=uni.getStorageSync("orderdata"),t={address_id:e},i=(0,d.default)((0,d.default)({},a),t);console.log(i),uni.setStorageSync("orderdata",i),uni.navigateTo({url:"/pages/index/pay/pay?addressid="+e+"&member="+this.member+"&tequan="+this.tequan})}else if(2==this.changeType){console.log(uni.getStorageSync("groupOrderdata"));var s=uni.getStorageSync("groupOrderdata"),n={address_id:e},r=(0,d.default)((0,d.default)({},s),n);console.log(r),uni.setStorageSync("groupOrderdata",r),uni.navigateTo({url:"/pages/index/pay/groupPay?addressid="+e+"&recordid="+this.group_buy_records_id})}else if(3==this.changeType){console.log(uni.getStorageSync("secOrderdata"));var o=uni.getStorageSync("secOrderdata"),c={address_id:e},l=(0,d.default)((0,d.default)({},o),c);console.log(l),uni.setStorageSync("secOrderdata",l),uni.navigateTo({url:"/pages/index/pay/seckillPay?addressid="+e})}else if(4==this.changeType){console.log(uni.getStorage("presaleOrderdata"));var u=uni.getStorageSync("presaleOrderdata"),g={address_id:e},p=(0,d.default)((0,d.default)({},u),g);console.log(p),uni.setStorageSync("presaleOrderdata",p),uni.navigateTo({url:"/pages/index/pay/advancePay?addressid="+e})}else if(5==this.changeType){console.log(uni.getStorageSync("giftOrderdata"));var f=uni.getStorageSync("giftOrderdata"),h={address_id:e},b=(0,d.default)((0,d.default)({},f),h);console.log(b),uni.setStorageSync("giftOrderdata",b),uni.navigateTo({url:"/pages/index/pay/giftPay?addressid="+e})}},getAddress:function(){var e=this,a={token:uni.getStorageSync("token"),page:1,pagesize:10};(0,s.default)("/api/User/address_list","post",a).then((function(a){"200"==a.data.status&&(0==a.data.data.length?e.isEmpty=!0:a.data.data.length>0&&(e.addressList=a.data.data,e.isEmpty=!1)),console.log(a)}))},toMine:function(){1==this.changeType?uni.redirectTo({url:"/pages/index/pay/pay?member="+this.member+"&tequan="+this.tequan}):2==this.changeType?uni.redirectTo({url:"/pages/index/pay/groupPay?recordid="+this.group_buy_records_id}):3==this.changeType?uni.redirectTo({url:"/pages/index/pay/seckillPay"}):4==this.changeType?uni.redirectTo({url:"/pages/index/pay/advancePay"}):5==this.changeType?uni.redirectTo({url:"/pages/index/pay/giftPay"}):uni.switchTab({url:"/pages/mine/mine"})}}};a.default=r},c4a1:function(e,a,t){"use strict";var i=t("1150"),d=t.n(i);d.a}}]);