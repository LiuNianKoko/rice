(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-logon-setPassword"],{"010f":function(t,e,i){"use strict";var a=i("2101"),r=i.n(a);r.a},"03c2":function(t,e,i){"use strict";i.r(e);var a=i("e216"),r=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,(function(){return a[t]}))}(n);e["default"]=r.a},2101:function(t,e,i){var a=i("323d");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var r=i("4f06").default;r("28b8d324",a,!0,{sourceMap:!1,shadowMode:!1})},3107:function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return r})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){return a}));var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-view",{staticClass:"input-box"},[i("v-uni-view",{staticClass:"input-item"},[i("v-uni-view",{staticClass:"input-label"},[t._v("登录密码")]),i("v-uni-view",{staticClass:"input-body"},[i("v-uni-input",{staticClass:"input",staticStyle:{"margin-right":"50upx"},attrs:{type:"text",placeholder:"输入登录密码",maxlength:"20"},model:{value:t.password1,callback:function(e){t.password1=e},expression:"password1"}})],1)],1),i("v-uni-view",{staticClass:"input-item"},[i("v-uni-view",{staticClass:"input-label"},[t._v("确认密码")]),i("v-uni-view",{staticClass:"input-body"},[i("v-uni-input",{staticClass:"input",staticStyle:{"margin-right":"50upx"},attrs:{type:"text",placeholder:"再次输入登录密码",maxlength:"20"},model:{value:t.password2,callback:function(e){t.password2=e},expression:"password2"}})],1)],1),i("v-uni-view",{staticClass:"explain"},[t._v("密码长度6-32位，数字英文组合区分大小写")]),i("v-uni-button",{staticClass:"button",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.submit.apply(void 0,arguments)}}},[t._v("确认")]),i("v-uni-view",{staticClass:"agreement disFlex"},[i("v-uni-image",{attrs:{src:t.isHide?"/static/select-green.png":"/static/unselect.png"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.isSure.apply(void 0,arguments)}}}),t._v("我已阅读并同意"),i("v-uni-navigator",{staticClass:"agree-text",attrs:{url:"/pages/index/logon/useragree"}},[t._v("《用户隐私保护提示》")])],1)],1)],1)},n=[]},"323d":function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.boxsizing[data-v-52a12950]{-webkit-box-sizing:border-box;box-sizing:border-box}.left[data-v-52a12950]{float:left}.right[data-v-52a12950]{float:right}.disflex[data-v-52a12950]{display:-webkit-box;display:-webkit-flex;display:flex}.flxe-1[data-v-52a12950]{-webkit-box-flex:1;-webkit-flex:1;flex:1}\r\n/*【处理移动端1px线条粗的问题】*/.border_top[data-v-52a12950],\r\n.border_bottom[data-v-52a12950],\r\n.border_left[data-v-52a12950],\r\n.border_right[data-v-52a12950],\r\n.border_tb[data-v-52a12950],\r\n.border[data-v-52a12950]{position:relative}.border_top[data-v-52a12950]:after,\r\n.border_bottom[data-v-52a12950]:after,\r\n.border_left[data-v-52a12950]:after,\r\n.border_right[data-v-52a12950]:after,\r\n.border_tb[data-v-52a12950]:after,\r\n.border[data-v-52a12950]:after{content:"";display:block;position:absolute;top:0;right:0;bottom:0;left:0;-webkit-transform-origin:0 0;-webkit-transform:scale(1);pointer-events:none;z-index:2}.border_left[data-v-52a12950]:after{border-left:1px solid #e8e8e8}.border_right[data-v-52a12950]:after{border-right:1px solid #e8e8e8}.border_top[data-v-52a12950]:after{border-top:1px solid #e8e8e8}.border_bottom[data-v-52a12950]:after{border-bottom:1px solid #e8e8e8}.border_tb[data-v-52a12950]:after{border-top:1px solid #e8e8e8;border-bottom:1px solid #e8e8e8}.border[data-v-52a12950]:after{border:1px solid #e8e8e8}@media screen and (-webkit-min-device-pixel-ratio:1.5){.border_top[data-v-52a12950]:after,\r\n  .border_bottom[data-v-52a12950]:after,\r\n  .border_left[data-v-52a12950]:after,\r\n  .border_right[data-v-52a12950]:after,\r\n  .border_tb[data-v-52a12950]:after,\r\n  .border[data-v-52a12950]:after{right:-100%;bottom:-100%;-webkit-transform:scale(.5)}}\r\n/*end【处理移动端1px线条粗的问题】*/uni-button[data-v-52a12950]::after{border:none}.input-box[data-v-52a12950]{padding:%?60?%;font-size:%?30?%}.input-box .explain[data-v-52a12950]{color:#333;margin-top:%?30?%}.input-box .input-item[data-v-52a12950]{display:-webkit-box;display:-webkit-flex;display:flex;background:#fff;border-bottom:%?1?% solid #eee;line-height:%?133?%;height:%?133?%}.input-box .input-item .input-label[data-v-52a12950]{width:%?150?%}.input-box .input-item .input-body[data-v-52a12950]{position:relative;height:%?133?%;width:calc(100% - %?150?%)}.input-box .input-item .input-body .input[data-v-52a12950]{line-height:%?133?%;height:%?133?%;position:relative;font-size:%?28?%}.input-box .input-item .input-body .eye[data-v-52a12950]{position:absolute;height:%?50?%;width:%?50?%;right:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.input-box .input-item .input-body .btn-code[data-v-52a12950]{position:absolute;right:%?0?%;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);color:#45b443;-webkit-box-sizing:border-box;box-sizing:border-box;text-align:center;padding:0;line-height:%?60?%;width:%?160?%;height:%?60?%;border:%?2?% solid #45b443;-webkit-border-radius:%?6?%;border-radius:%?6?%}.input-box .agreement[data-v-52a12950]{margin-top:%?33?%;font-size:%?32?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.input-box .agreement uni-image[data-v-52a12950]{width:%?36?%;height:%?36?%;margin-right:%?16?%}.input-box .agreement .agree-text[data-v-52a12950]{color:#00a0e9}.button[data-v-52a12950]{line-height:%?100?%;height:%?100?%;font-size:%?40?%;width:%?630?%;height:%?100?%;color:#fff;margin-top:%?60?%;background:#00a0e9;-webkit-border-radius:%?10?%;border-radius:%?10?%}',""]),t.exports=e},a67b:function(t,e,i){"use strict";function a(t){uni.showToast({icon:"none",title:t})}function r(t){var e=/^1\d{10}$/;return!!e.test(t)||(a("手机号格式错误"),!1)}function n(t){return t.length>=6||(a("密码必须大于6位"),!1)}function o(t){return 5==t.length||(a("验证码必须是5位数字"),!1)}function s(t){var e=/^\d{15}|\d{18}$/;return!!e.test(t)||(a("身份证必须是15或18位数字"),!1)}function d(t){var e=/^([1-9]{1})(\d{14}|\d{15}|\d{16}|\d{18})$/;return!!e.test(t)||(a("请输入正确的银行卡号"),!1)}Object.defineProperty(e,"__esModule",{value:!0}),e.toast=a,e.checkPhone=r,e.checkPwd=n,e.checkCode=o,e.checkIdCard=s,e.checkBankCard=d},c81a:function(t,e,i){"use strict";i.r(e);var a=i("3107"),r=i("03c2");for(var n in r)"default"!==n&&function(t){i.d(e,t,(function(){return r[t]}))}(n);i("010f");var o,s=i("f0c5"),d=Object(s["a"])(r["default"],a["b"],a["c"],!1,null,"52a12950",null,!1,a["a"],o);e["default"]=d.exports},e216:function(t,e,i){"use strict";var a=i("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(i("8cc3")),n=i("a67b"),o={data:function(){return{isHide:!0,phone:"",password1:"",password2:"",cid:"",islogon:0,spellid:0,isCur:1,spread_user_id:0}},onLoad:function(t){this.phone=t.phone,t.islogon&&(this.islogon=t.islogon,this.spellid=t.id),t.spread_user_id&&(this.spread_user_id=t.spread_user_id),t.isCur&&(this.isCur=t.isCur),this.cid=uni.getStorageSync("cid")},methods:{isSure:function(){this.isHide=!this.isHide},submit:function(){var t=this;if(""!=this.password1&&""!=this.password2)if(this.password1==this.password2)if((0,n.checkPwd)(this.password1)&&(0,n.checkPwd)(this.password2))if(1==this.isHide){var e={type:1,phone:this.phone,password:this.password1,repassword:this.password2};(0,r.default)("/api/Login/register","post",e).then((function(e){"200"==e.data.status?(uni.showToast({title:"注册成功"}),uni.setStorageSync("token",e.data.data.token),uni.setStorageSync("vip",e.data.data.vip),2==t.islogon?uni.navigateTo({url:"/pages/mine/spellDetail?id="+t.spellid+"&spread_user_id="+t.spread_user_id}):3==t.islogon?uni.navigateTo({url:"/pages/index/detail?goodsid="+t.spellid+"&spread_user_id="+t.spread_user_id}):4==t.islogon?uni.navigateTo({url:"/pages/index/advanceBuy?presaleid="+t.spellid+"&spread_user_id="+t.spread_user_id}):5==t.islogon?uni.navigateTo({url:"/pages/index/gorupBuy?groupid="+t.spellid+"&spread_user_id="+t.spread_user_id}):6==t.islogon?uni.navigateTo({url:"/pages/index/seckillBuy?seckillid="+t.spellid+"&isCur="+t.isCur+"&spread_user_id="+t.spread_user_id}):setTimeout((function(){uni.reLaunch({url:"/pages/mine/proinfo"})}),1e3),console.log(e)):uni.showToast({title:e.data.message||e.data.msg,icon:"none"})}))}else uni.showToast({title:"请阅读并勾选协议",icon:"none"});else uni.showToast({title:"请输入正确的密码",icon:"none"});else uni.showToast({title:"两次密码不一致",icon:"none"});else uni.showToast({title:"请输入正确的密码",icon:"none"})},getcid:function(t){console.log(this.cid);var e={token:t,cid:this.cid};(0,r.default)("/api/user/set_user_push","post",e).then((function(t){"200"==t.data.status?console.log("success"):console.log("fail")}))}}};e.default=o}}]);