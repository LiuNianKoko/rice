(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-search"],{1263:function(t,e,i){"use strict";var a=i("4ea4");i("99af"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(i("8cc3")),o=getApp(),c={data:function(){return{imag:o.globalData.imag,cut:1,upStatus:!0,searchList:[],name:"",page:1}},onLoad:function(){this.changeCut(1)},onReachBottom:function(){this.getNewList()},methods:{searchName:function(){var t=this;setTimeout((function(){var e={token:uni.getStorageSync("token"),name:t.name};t.getSearchList(e)}),50)},changeCut:function(t){if(this.cut=t,1==t){this.page=1;var e={token:uni.getStorageSync("token"),name:this.name};this.getSearchList(e)}if(2==t){this.page=1;var i={token:uni.getStorageSync("token"),alsalenum:1,name:this.name};this.getSearchList(i)}if(3==t){this.page=1;var a={token:uni.getStorageSync("token"),is_new:1,name:this.name};this.getSearchList(a)}if(4==t)if(this.page=1,this.upStatus=!this.upStatus,1==this.upStatus){var n={token:uni.getStorageSync("token"),priceSort:1,name:this.name};this.getSearchList(n)}else{var o={token:uni.getStorageSync("token"),priceSort:2,name:this.name};this.getSearchList(o)}},getSearchList:function(t){var e=this;(0,n.default)("/api/Goods/searchGoods","post",t).then((function(t){if("200"==t.data.status)e.searchList=t.data.data.goodsList.data;else if("400"==t.data.status)return void e.$util.showToast(t.data.msg);console.log(t)}))},getNewList:function(){if(1==this.cut){var t={token:uni.getStorageSync("token"),page:this.page+1,name:this.name};this.getNewListApi(t)}if(2==this.cut){var e={token:uni.getStorageSync("token"),alsalenum:1,page:this.page+1,name:this.name};this.getNewListApi(e)}if(3==this.cut){var i={token:uni.getStorageSync("token"),is_new:1,page:this.page+1,name:this.name};this.getNewListApi(i)}if(4==this.cut)if(1==this.upStatus){var a={token:uni.getStorageSync("token"),priceSort:1,page:this.page+1,name:this.name};this.getNewListApi(a)}else{var n={token:uni.getStorageSync("token"),priceSort:2,page:this.page+1,name:this.name};this.getNewListApi(n)}},getNewListApi:function(t){var e=this;(0,n.default)("/api/Goods/searchGoods","post",t).then((function(t){"400"!=t.data.status?e.page>t.data.data.goodsList.last_page?e.$util.showToast("没有更多了"):(e.page++,e.searchList=e.searchList.concat(t.data.data.goodsList.data)):e.$util.showToast(t.data.msg)}))},toDetail:function(t){uni.navigateTo({url:"/pages/index/detail?goodsid="+t})},back:function(){uni.switchTab({url:"/pages/index/index"})},del:function(){this.name="",this.searchName()}}};e.default=c},2047:function(t,e,i){"use strict";var a=i("90a5"),n=i.n(a);n.a},"7a9b":function(t,e,i){"use strict";i.r(e);var a=i("1263"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},"90a5":function(t,e,i){var a=i("fba1");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("84d9dfa4",a,!0,{sourceMap:!1,shadowMode:!1})},cbec:function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"search-wraps"},[i("v-uni-view",{staticClass:"header-search-wrap w-100"},[i("v-uni-view",{staticClass:"index-header"},[i("v-uni-view",{staticClass:"input-wrap"},[i("v-uni-input",{staticClass:"inputs",attrs:{type:"text",placeholder:"搜索商品"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.searchName.apply(void 0,arguments)}},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),i("v-uni-image",{staticClass:"input-fangdajing",attrs:{src:"/static/search-gray.png"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.searchName.apply(void 0,arguments)}}}),i("v-uni-image",{staticClass:"del-name",attrs:{src:"/static/shanchu.png"},on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.del.apply(void 0,arguments)}}}),i("v-uni-image",{staticClass:"back-icon",attrs:{src:"/static/back-black.png"},on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.back.apply(void 0,arguments)}}})],1)],1)],1),i("v-uni-view",{staticClass:"blank"}),i("v-uni-view",{staticClass:"cut-sort"},[i("v-uni-view",{staticClass:"cut-sort-title",class:[1==t.cut?"cut-active":""],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changeCut(1)}}},[t._v("综合排序")]),i("v-uni-view",{staticClass:"cut-sort-title",class:[2==t.cut?"cut-active":""],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changeCut(2)}}},[t._v("销量优先")]),i("v-uni-view",{staticClass:"cut-sort-title",class:[3==t.cut?"cut-active":""],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changeCut(3)}}},[t._v("新品")]),i("v-uni-view",{staticClass:"cut-sort-title sort-price",class:[4==t.cut?"cut-active":""],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changeCut(4)}}},[t._v("价格"),i("v-uni-view",{staticClass:"sort-position"},[t.upStatus?i("v-uni-image",{attrs:{src:"/static/up1.png"}}):i("v-uni-image",{attrs:{src:"/static/up2.png"}}),t.upStatus?i("v-uni-image",{attrs:{src:"/static/down2.png"}}):i("v-uni-image",{attrs:{src:"/static/down1.png"}})],1)],1)],1),t.searchList.length>0?i("v-uni-view",{staticClass:"recomon"},[i("v-uni-view",{staticClass:"recomon-main disFlex"},t._l(t.searchList,(function(e){return i("v-uni-view",{key:e.id,staticClass:"recomon-item marginBottom20",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.toDetail(e.id)}}},[i("v-uni-image",{attrs:{src:e.cover,alt:""}}),i("v-uni-view",{staticClass:"recomon-text"},[i("v-uni-view",{staticClass:"recomon-title line1"},[t._v(t._s(e.goods_name))]),i("v-uni-view",{staticClass:" recomon-intr line1"},[t._v(t._s(e.desc))]),i("v-uni-view",{staticClass:"recomon-price"},[i("v-uni-text",{staticClass:"recomon-price-s"},[i("v-uni-text",{staticClass:"symbol"},[t._v("￥")]),t._v(t._s(e.price))],1)],1),i("v-uni-view",{staticClass:"recomon-lowprice disFlex"},[i("v-uni-view",{staticClass:"recomon-price-x disFlex"},[i("v-uni-text",{staticClass:"symbol"},[t._v("￥")]),i("v-uni-text",{staticClass:"recomon-prices"},[t._v(t._s(e.member_price))]),i("v-uni-image",{staticClass:"recomon-price-img",attrs:{src:t.imag+"member-man.png"}})],1),i("v-uni-image",{staticClass:"gouwuche",attrs:{src:"/static/gouwuche2.png"}})],1)],1)],1)})),1)],1):i("v-uni-view",{staticClass:"nodata"},[t._v("暂无数据~")])],1)},o=[]},db13:function(t,e,i){"use strict";i.r(e);var a=i("cbec"),n=i("7a9b");for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("2047");var c,s=i("f0c5"),r=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,"35afd9c8",null,!1,a["a"],c);e["default"]=r.exports},fba1:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,".header-search-wrap[data-v-35afd9c8]{position:fixed;top:0;z-index:999}.header-search-wrap .index-header[data-v-35afd9c8]{height:%?146?%;line-height:%?86?%;padding:0 %?30?%;padding-top:%?70?%;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:#fff;font-size:%?28?%;color:#fff;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;position:relative}.header-search-wrap .index-header .input-wrap[data-v-35afd9c8]{width:%?640?%;height:%?60?%;line-height:%?60?%;padding:%?6?% %?30?% %?10?% %?100?%;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:#f2f2f5;-webkit-border-radius:%?50?%;border-radius:%?50?%;color:#333;margin-left:%?50?%;position:relative}.header-search-wrap .index-header .input-wrap .inputs[data-v-35afd9c8]{height:%?44?%;line-height:%?44?%}.header-search-wrap .index-header .input-wrap .input-fangdajing[data-v-35afd9c8]{position:absolute;width:%?44?%;height:%?44?%;left:%?30?%;top:%?10?%}.header-search-wrap .index-header .input-wrap .back-icon[data-v-35afd9c8]{position:absolute;width:%?25?%;height:%?44?%;left:%?-48?%;top:%?8?%}.header-search-wrap .index-header .input-wrap .del-name[data-v-35afd9c8]{position:absolute;width:%?42?%;height:%?42?%;right:%?28?%;top:%?10?%;z-index:5}.blank[data-v-35afd9c8]{height:%?246?%}.cut-active[data-v-35afd9c8]{color:#f84949}.cut-sort[data-v-35afd9c8]{padding:0 %?30?%;position:fixed;top:%?146?%;left:0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;height:%?100?%;line-height:%?46?%;background-color:#fff;z-index:1}.cut-sort .cut-sort-title[data-v-35afd9c8]{font-size:%?32?%;margin-right:%?60?%}.cut-sort .sort-price[data-v-35afd9c8]{display:-webkit-box;display:-webkit-flex;display:flex}.cut-sort .sort-price .sort-position[data-v-35afd9c8]{-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;margin-left:%?14?%}.cut-sort .sort-price .sort-position uni-image[data-v-35afd9c8]{width:%?22?%;height:%?22?%}.w-100[data-v-35afd9c8]{width:100%}.recomon[data-v-35afd9c8]{width:100%;padding:0 %?34?%;-webkit-box-sizing:border-box;box-sizing:border-box}.recomon .recomon-main[data-v-35afd9c8]{margin-top:%?30?%;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-flex-wrap:wrap;flex-wrap:wrap}.recomon .recomon-main .recomon-item[data-v-35afd9c8]{width:%?335?%;background:#fff;-webkit-box-shadow:0 0 %?20?% 0 rgba(0,0,0,.1);box-shadow:0 0 %?20?% 0 rgba(0,0,0,.1);-webkit-border-radius:%?10?%;border-radius:%?10?%}.recomon .recomon-main .recomon-item uni-image[data-v-35afd9c8]{width:%?335?%;height:%?335?%}.recomon .recomon-main .recomon-item .recomon-text[data-v-35afd9c8]{padding:%?25?% %?16?%}.recomon .recomon-main .recomon-item .recomon-text .recomon-title[data-v-35afd9c8]{width:%?279?%;font-size:%?32?%;line-height:%?40?%;color:#333;margin-bottom:%?6?%}.recomon .recomon-main .recomon-item .recomon-text .recomon-intr[data-v-35afd9c8]{width:%?259?%;line-height:%?30?%;font-size:%?24?%;color:#939393;margin-bottom:%?30?%}.recomon .recomon-main .recomon-item .recomon-text .recomon-price[data-v-35afd9c8]{font-weight:700}.recomon .recomon-main .recomon-item .recomon-text .recomon-price .recomon-num[data-v-35afd9c8]{font-size:%?28?%;color:#bbb;font-weight:400}.recomon .recomon-main .recomon-item .recomon-text .recomon-price .recomon-price-s[data-v-35afd9c8]{font-size:%?26?%;line-height:%?26?%;font-weight:700;font-family:numFont;color:#363636}.recomon .recomon-main .recomon-item .recomon-text .recomon-price .symbol[data-v-35afd9c8]{font-size:%?24?%;line-height:%?24?%}.recomon .recomon-main .recomon-item .recomon-text .recomon-lowprice[data-v-35afd9c8]{position:relative}.recomon .recomon-main .recomon-item .recomon-text .recomon-lowprice .recomon-price-x[data-v-35afd9c8]{font-weight:700;position:relative;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end;color:#ec614a;font-family:numFont}.recomon .recomon-main .recomon-item .recomon-text .recomon-lowprice .symbol[data-v-35afd9c8]{font-size:%?24?%;line-height:%?26?%}.recomon .recomon-main .recomon-item .recomon-text .recomon-lowprice .recomon-prices[data-v-35afd9c8]{font-size:%?38?%;line-height:%?38?%}.recomon .recomon-main .recomon-item .recomon-text .recomon-lowprice .recomon-price-img[data-v-35afd9c8]{width:%?68?%;height:%?76?%;position:absolute;right:%?-68?%;top:%?-20?%}.recomon .recomon-main .recomon-item .recomon-text .recomon-lowprice .gouwuche[data-v-35afd9c8]{-webkit-border-radius:50%;border-radius:50%;width:%?58?%;height:%?56?%;position:absolute;top:%?-14?%;right:%?-6?%}.nodata[data-v-35afd9c8]{text-align:center;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);color:#aaa;font-size:%?30?%}",""]),t.exports=e}}]);