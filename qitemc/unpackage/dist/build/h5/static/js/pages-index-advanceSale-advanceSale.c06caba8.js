(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-advanceSale-advanceSale"],{"0359":function(e,t,i){var a=i("9310");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=i("4f06").default;n("fcb41e0c",a,!0,{sourceMap:!1,shadowMode:!1})},"038f":function(e,t,i){"use strict";var a;i.d(t,"b",(function(){return n})),i.d(t,"c",(function(){return o})),i.d(t,"a",(function(){return a}));var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"advance-wraps"},[i("v-uni-view",{staticClass:"header-wrap"},[i("v-uni-view",{staticClass:"index-header"},[e._v("预售商品"),i("v-uni-view",{staticClass:"back-icon-wrap",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.toIndex.apply(void 0,arguments)}}},[i("v-uni-image",{staticClass:"back-icon",attrs:{src:"/static/back-icon.png"}})],1)],1)],1),i("v-uni-view",{staticClass:"blank"}),e.advanceList.length>0?i("v-uni-view",{staticClass:"advance-main"},[i("v-uni-view",{staticClass:"open"},[i("v-uni-view",{staticClass:"open-main marginTop20"},e._l(e.advanceList,(function(t){return i("v-uni-view",{key:t.id,staticClass:"open-item marginBottom20 disFlex",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.toAdvanceBuy(t.id)}}},[i("v-uni-image",{attrs:{src:t.cover,alt:""}}),i("v-uni-view",{staticClass:"open-text"},[i("v-uni-view",{staticClass:"open-title line1 marginBottom5"},[e._v(e._s(t.goods_name))]),i("v-uni-view",{staticClass:" open-intr line1 marginBottom5"},[e._v(e._s(t.desc))]),i("v-uni-view",{staticClass:"seckill-speed marginBottom10 w-100"},[i("v-uni-view",{staticClass:"seckill-bar"},[i("v-uni-view",{staticClass:"progress-box"},[i("v-uni-progress",{attrs:{percent:t.contrast,activeColor:"#F84949",active:!0,"stroke-width":"6"}})],1)],1),i("v-uni-view",{staticClass:"seckill-bar-num"},[e._v("已抢"+e._s(t.surplus_num)+"件 还剩"),i("v-uni-text",{staticClass:"seckill-bar-save"},[e._v(e._s(t.stock))]),e._v("件")],1)],1),i("v-uni-view",{staticClass:"immed-wrap disFlex"},[i("v-uni-view",{staticClass:"open-vip-price"},[e._v("￥"+e._s(t.price))]),i("v-uni-view",{staticClass:"open-immed common-immed"},[i("v-uni-text",[e._v("马上抢")])],1)],1),i("v-uni-view",{staticClass:"open-price disFlex"},[i("v-uni-view",{staticClass:"spell-price-x disFlex"},[i("v-uni-text",{staticClass:"symbol"},[e._v("￥")]),i("v-uni-text",{staticClass:"spell-cost-price"},[e._v(e._s(t.reveal_price))]),i("v-uni-image",{staticClass:"recomon-price-img",attrs:{src:"/static/member-man4.png"}})],1),i("v-uni-view",{staticClass:"open-have"})],1)],1)],1)})),1)],1)],1):i("v-uni-view",{staticClass:"nodata"},[e._v("暂无数据~")])],1)},o=[]},"1cd9":function(e,t,i){"use strict";var a=i("0359"),n=i.n(a);n.a},9310:function(e,t,i){var a=i("24fb");t=a(!1),t.push([e.i,".header-wrap[data-v-75b50bc3]{width:100%;position:fixed;top:0;z-index:999;background:-webkit-gradient(linear,left top,right top,from(#00a0e9),to(#61c2ef));background:-webkit-linear-gradient(left,#00a0e9,#61c2ef);background:linear-gradient(90deg,#00a0e9,#61c2ef)}.header-wrap .index-header[data-v-75b50bc3]{height:%?176?%;padding:0 %?30?%;padding-top:%?100?%;-webkit-box-sizing:border-box;box-sizing:border-box;text-align:center;font-size:%?40?%;color:#fff;position:relative}.header-wrap .index-header .back-icon[data-v-75b50bc3]{width:%?25?%;height:%?44?%}.header-wrap .index-header .back-icon-wrap[data-v-75b50bc3]{width:%?50?%;height:%?50?%;position:absolute;left:%?32?%;top:%?106?%}.blank[data-v-75b50bc3]{width:100%;height:%?176?%}.common-immed[data-v-75b50bc3]{position:absolute;right:%?14?%;bottom:%?22?%;width:%?140?%;height:%?45?%;line-height:%?45?%;background:#00a0e9;-webkit-border-radius:%?27?%;border-radius:%?27?%;text-align:center}.common-immed uni-text[data-v-75b50bc3]{font-size:%?24?%;color:#fff}.open[data-v-75b50bc3]{padding:0 %?30?%}.open .open-item[data-v-75b50bc3]{position:relative}.open .open-item uni-image[data-v-75b50bc3]{width:%?254?%;height:%?254?%}.open .open-item .open-text[data-v-75b50bc3]{width:%?410?%;padding-left:%?20?%}.open .open-item .open-text .open-title[data-v-75b50bc3]{width:%?383?%;font-size:%?32?%;color:#333}.open .open-item .open-text .open-intr[data-v-75b50bc3]{width:%?311?%;font-size:%?24?%;color:#939393}.open .open-item .open-text .open-price[data-v-75b50bc3]{color:#ec614a}.open .open-item .open-text .open-price .spell-price-x[data-v-75b50bc3]{-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end;line-height:%?32?%}.open .open-item .open-text .open-price .spell-cost-price[data-v-75b50bc3]{font-size:%?36?%;font-weight:700}.open .open-item .open-text .open-price .symbol[data-v-75b50bc3]{font-size:%?24?%;line-height:%?24?%}.open .open-item .open-text .open-price .recomon-price-img[data-v-75b50bc3]{width:%?68?%;height:%?30?%;margin-left:%?4?%}.open .open-item .open-text .immed-wrap[data-v-75b50bc3]{-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin-bottom:%?6?%}.open .open-item .open-text .immed-wrap .open-vip-price[data-v-75b50bc3]{font-size:%?24?%;font-weight:700}.open .open-item .open-text .open-have[data-v-75b50bc3]{color:#bbb}.open .open-item .open-text .open-have uni-text[data-v-75b50bc3]{color:#f84949}.open .open-item .open-text .open-status[data-v-75b50bc3]{height:%?50?%;margin-top:%?20?%;color:#bbb;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.open .open-item .open-text .open-status .open-status03[data-v-75b50bc3]{width:%?30?%}.open .open-item .open-text .open-status .open-status02[data-v-75b50bc3]{color:#fc1313;margin-top:%?8?%}.nodata[data-v-75b50bc3]{text-align:center;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);color:#aaa;font-size:%?30?%}.seckill-speed[data-v-75b50bc3]{margin-bottom:%?22?%}.seckill-speed .seckill-bar[data-v-75b50bc3]{width:%?280?%;height:%?12?%;background:#f2f2f5;-webkit-border-radius:%?6?%;border-radius:%?6?%;margin:%?20?% %?12?% 0 0}.seckill-speed .seckill-bar-num[data-v-75b50bc3]{height:%?24?%;line-height:%?24?%;font-size:%?24?%;color:#bbb;margin-top:%?6?%}.seckill-speed .seckill-bar-num .seckill-bar-save[data-v-75b50bc3]{font-size:%?26?%;color:#ec614a;font-weight:700}",""]),e.exports=t},a697:function(e,t,i){"use strict";i.r(t);var a=i("038f"),n=i("c87d");for(var o in n)"default"!==o&&function(e){i.d(t,e,(function(){return n[e]}))}(o);i("1cd9");var s,c=i("f0c5"),r=Object(c["a"])(n["default"],a["b"],a["c"],!1,null,"75b50bc3",null,!1,a["a"],s);t["default"]=r.exports},aaa0:function(e,t,i){"use strict";var a=i("4ea4");i("99af"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(i("8cc3")),o={data:function(){return{advanceList:[],page:1}},onLoad:function(){this.getList()},onReachBottom:function(){this.getNewList()},methods:{toIndex:function(){uni.switchTab({url:"/pages/index/index"})},toAdvanceBuy:function(e){uni.navigateTo({url:"/pages/index/advanceBuy?presaleid="+e})},getList:function(){var e=this,t=this,i={token:uni.getStorageSync("token"),page:1};(0,n.default)("/api/Presale/presaleLists","post",i).then((function(i){"200"==i.data.status&&(t.advanceList=i.data.data.spikeLists.data),"400"!=i.data.status?console.log(i):e.$util.showToast(i.data.msg)}))},getNewList:function(){var e=this,t={token:uni.getStorageSync("token"),page:this.page+1};(0,n.default)("/api/Presale/presaleLists","post",t).then((function(t){"400"!=t.data.status?e.page>t.data.data.spikeLists.last_page?e.$util.showToast("没有更多了"):(e.page++,e.advanceList=e.advanceList.concat(t.data.data.spikeLists.data)):e.$util.showToast(t.data.msg)}))}}};t.default=o},c87d:function(e,t,i){"use strict";i.r(t);var a=i("aaa0"),n=i.n(a);for(var o in a)"default"!==o&&function(e){i.d(t,e,(function(){return a[e]}))}(o);t["default"]=n.a}}]);