(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mine-setpaypwd"],{"19a3":function(t,e,a){"use strict";var i=a("1e5f"),o=a.n(i);o.a},"1e5f":function(t,e,a){var i=a("3537");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=a("4f06").default;o("3fa612ec",i,!0,{sourceMap:!1,shadowMode:!1})},"34ae":function(t,e,a){"use strict";var i;a.d(e,"b",(function(){return o})),a.d(e,"c",(function(){return n})),a.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("v-uni-view",{staticClass:"header-wrap"},[a("v-uni-view",{staticClass:"index-header"},[t._v("设置支付密码"),a("v-uni-view",{staticClass:"back-icon-wrap",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toMine.apply(void 0,arguments)}}},[a("v-uni-image",{staticClass:"back-icon",attrs:{src:"/static/back-icon.png"}})],1)],1)],1),a("v-uni-view",{staticClass:"blank"}),0==t.setpaystatus?a("v-uni-view",{},[a("v-uni-view",{staticClass:"content",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.hiddenKeyboard.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"content-title"},[t._v("首次设置支付密码")]),a("v-uni-view",{staticClass:"input-row",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.showKeyboard.apply(void 0,arguments)}}},t._l(t.arr,(function(e,i){return a("v-uni-view",{key:i,class:["item",{"item-active":t.codeLength==i}]},[t._v(t._s(t.code.charAt(i)))])})),1),a("DigitalKeyboard",{attrs:{keyBoardSwitch:t.keyBoardSwitch,decimalPoint:!0},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.contToggle.apply(void 0,arguments)},closeKeyboard:function(e){arguments[0]=e=t.$handleEvent(e),t.closeKeyboard.apply(void 0,arguments)}}})],1)],1):t._e(),1==t.setpaystatus?a("v-uni-view",{},[a("v-uni-view",{staticClass:"content",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.hiddenKeyboard.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"content-title"},[t._v("再次确认支付密码")]),a("v-uni-view",{staticClass:"input-row",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.showKeyboard.apply(void 0,arguments)}}},t._l(t.arr,(function(e,i){return a("v-uni-view",{key:i,class:["item",{"item-active":t.codeLength2==i}]},[t._v(t._s(t.code2.charAt(i)))])})),1),a("DigitalKeyboard",{attrs:{keyBoardSwitch:t.keyBoardSwitch,decimalPoint:!0},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.contToggle2.apply(void 0,arguments)},closeKeyboard:function(e){arguments[0]=e=t.$handleEvent(e),t.closeKeyboard.apply(void 0,arguments)}}})],1)],1):t._e(),a("QSPopup",{ref:"QSPopupSuccess"},[a("v-uni-view",{staticClass:"success"},[a("v-uni-image",{attrs:{src:"/static/pay-success.png"}}),t._v("密码设置成功")],1)],1)],1)},n=[]},3537:function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.boxsizing[data-v-0af3c1c1]{-webkit-box-sizing:border-box;box-sizing:border-box}.left[data-v-0af3c1c1]{float:left}.right[data-v-0af3c1c1]{float:right}.disflex[data-v-0af3c1c1]{display:-webkit-box;display:-webkit-flex;display:flex}.flxe-1[data-v-0af3c1c1]{-webkit-box-flex:1;-webkit-flex:1;flex:1}\r\n/*【处理移动端1px线条粗的问题】*/.border_top[data-v-0af3c1c1],\r\n.border_bottom[data-v-0af3c1c1],\r\n.border_left[data-v-0af3c1c1],\r\n.border_right[data-v-0af3c1c1],\r\n.border_tb[data-v-0af3c1c1],\r\n.border[data-v-0af3c1c1]{position:relative}.border_top[data-v-0af3c1c1]:after,\r\n.border_bottom[data-v-0af3c1c1]:after,\r\n.border_left[data-v-0af3c1c1]:after,\r\n.border_right[data-v-0af3c1c1]:after,\r\n.border_tb[data-v-0af3c1c1]:after,\r\n.border[data-v-0af3c1c1]:after{content:"";display:block;position:absolute;top:0;right:0;bottom:0;left:0;-webkit-transform-origin:0 0;-webkit-transform:scale(1);pointer-events:none;z-index:2}.border_left[data-v-0af3c1c1]:after{border-left:1px solid #e8e8e8}.border_right[data-v-0af3c1c1]:after{border-right:1px solid #e8e8e8}.border_top[data-v-0af3c1c1]:after{border-top:1px solid #e8e8e8}.border_bottom[data-v-0af3c1c1]:after{border-bottom:1px solid #e8e8e8}.border_tb[data-v-0af3c1c1]:after{border-top:1px solid #e8e8e8;border-bottom:1px solid #e8e8e8}.border[data-v-0af3c1c1]:after{border:1px solid #e8e8e8}@media screen and (-webkit-min-device-pixel-ratio:1.5){.border_top[data-v-0af3c1c1]:after,\r\n  .border_bottom[data-v-0af3c1c1]:after,\r\n  .border_left[data-v-0af3c1c1]:after,\r\n  .border_right[data-v-0af3c1c1]:after,\r\n  .border_tb[data-v-0af3c1c1]:after,\r\n  .border[data-v-0af3c1c1]:after{right:-100%;bottom:-100%;-webkit-transform:scale(.5)}}\r\n/*end【处理移动端1px线条粗的问题】*/.header-wrap[data-v-0af3c1c1]{width:100%;position:fixed;top:0;z-index:999;background:-webkit-gradient(linear,left top,right top,from(#60bff7),to(#00a0e9));background:-webkit-linear-gradient(left,#60bff7,#00a0e9);background:linear-gradient(90deg,#60bff7,#00a0e9)}.header-wrap .index-header[data-v-0af3c1c1]{height:%?176?%;padding:0 %?30?%;padding-top:%?100?%;-webkit-box-sizing:border-box;box-sizing:border-box;text-align:center;font-size:%?40?%;color:#fff;position:relative}.header-wrap .index-header .back-icon[data-v-0af3c1c1]{width:%?25?%;height:%?44?%}.header-wrap .index-header .back-icon-wrap[data-v-0af3c1c1]{width:%?50?%;height:%?50?%;position:absolute;left:%?32?%;top:%?106?%}.blank[data-v-0af3c1c1]{width:100%;height:%?176?%}uni-page-body[data-v-0af3c1c1], .content[data-v-0af3c1c1]{width:100vw;min-height:94vh;margin:0;-webkit-box-sizing:border-box;box-sizing:border-box}uni-page-body .content-title[data-v-0af3c1c1], .content .content-title[data-v-0af3c1c1]{height:%?100?%;line-height:%?100?%;text-align:center;border-top:1px solid #eee;padding-top:%?60?%;font-size:%?32?%}.input-row[data-v-0af3c1c1]{width:%?600?%;margin:0 auto;padding:%?30?% 0;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:24px;text-align:center}.input-row .item[data-v-0af3c1c1]{float:left;text-align:center;width:%?80?%;height:%?80?%;line-height:%?80?%;-webkit-border-radius:%?10?%;border-radius:%?10?%;margin:0 %?10?%;border:1px solid #c8c8c8;background:#fff;-webkit-box-sizing:border-box;box-sizing:border-box}.input-row .item-active[data-v-0af3c1c1]{position:relative;border:1px solid #f4000a;-webkit-transform:scale(1.2);transform:scale(1.2);--webkit-transform:scale(1.2)}.success[data-v-0af3c1c1]{width:%?500?%;height:%?300?%;background-color:#fff;-webkit-border-radius:%?20?%;border-radius:%?20?%;padding:%?40?%;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:%?40?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-weight:700}.success uni-image[data-v-0af3c1c1]{width:%?56?%;height:%?56?%;margin-right:%?22?%}',""]),t.exports=e},3940:function(t,e,a){"use strict";var i=a("4ea4");a("d3b7"),a("25f0"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(a("8cc3")),n=i(a("8af5")),r=i(a("81c7")),c={components:{DigitalKeyboard:r.default,QSPopup:n.default},data:function(){return{arr:["","","","","",""],code:"",code2:"",codeLength:null,codeLength2:null,length:6,keyBoardSwitch:!1,setpaystatus:0}},onLoad:function(){console.log(this.$util.getStorage("phone"))},methods:{toMine:function(){uni.switchTab({url:"/pages/mine/mine"})},show:function(t){this.$refs[t].show()},showKeyboard:function(){this.codeLength=6==this.code.length?5:this.code.length,this.codeLength2=6==this.code2.length?5:this.code2.length,this.keyBoardSwitch=!0},hiddenKeyboard:function(){this.keyBoardSwitch=!1,this.codeLength=null,this.codeLength2=null},closeKeyboard:function(t){console.log(t)},contToggle:function(t){var e=this.code.length;if(""===t)return this.code=this.code.substring(0,e-1),void(this.codeLength=this.code.length);this.codeLength=e+1,this.code+=t.toString(),console.log(this.code),this.length===e+1&&(this.keyBoardSwitch=!1,this.setpaystatus=1)},contToggle2:function(t){var e=this,a=this.code2.length;if(""===t)return this.code2=this.code2.substring(0,a-1),void(this.codeLength2=this.code2.length);if(this.codeLength2=a+1,this.code2+=t.toString(),console.log(this.code2),this.length===a+1)if(this.keyBoardSwitch=!1,this.code2===this.code){var i={token:uni.getStorageSync("token"),payment_password:this.code,repassword:this.code2};(0,o.default)("/api/user/setUserPaymentPassword","post",i).then((function(t){"200"==t.data.status?(e.show("QSPopupSuccess"),setTimeout((function(){uni.switchTab({url:"/pages/mine/mine"})}),1500),console.log(t)):(e.$util.showToast(t.data.msg),e.setpaystatus=0,e.code="",e.code2="",e.codeLength=null,e.codeLength2=null)}))}else this.$util.showToast("前后密码不一致，请重新设置!"),this.setpaystatus=0,this.code="",this.code2="",this.codeLength=null,this.codeLength2=null}}};e.default=c},"62bd":function(t,e,a){"use strict";a.r(e);var i=a("34ae"),o=a("f756");for(var n in o)"default"!==n&&function(t){a.d(e,t,(function(){return o[t]}))}(n);a("19a3");var r,c=a("f0c5"),d=Object(c["a"])(o["default"],i["b"],i["c"],!1,null,"0af3c1c1",null,!1,i["a"],r);e["default"]=d.exports},f756:function(t,e,a){"use strict";a.r(e);var i=a("3940"),o=a.n(i);for(var n in i)"default"!==n&&function(t){a.d(e,t,(function(){return i[t]}))}(n);e["default"]=o.a}}]);