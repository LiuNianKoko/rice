
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/guide","pages/login/login","pages/index/index","pages/index/shop","pages/index/forum","pages/index/mine","pages/home/infoList","pages/home/infoDetail","pages/home/web","pages/home/msg","pages/home/msgList","pages/home/msgDetail","pages/login/agreement","pages/login/register","pages/login/setPassword","pages/login/forgetPassword","pages/home/search","pages/home/detail","pages/mine/set","pages/mine/aboutUs","pages/mine/feedBack","pages/mine/revisePhone","pages/mine/useHelp","pages/mine/useDetail","pages/mine/address","pages/mine/collect","pages/mine/info","pages/mine/location","pages/mine/editInfo","pages/mine/release","pages/mine/myRelease","pages/mine/fans","pages/mine/idCard","pages/forum/forumSort","pages/forum/forumDetail","pages/forum/releaseNews"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"钢材","navigationBarBackgroundColor":"#fff","backgroundColor":"#fff"},"tabBar":{"backgroundColor":"#FFFFFF","color":"#BCBCBC","selectedColor":"#181C62","borderStyle":"white","midButton":{"text":"发布买卖","iconPath":"/static/tabbar-add.png","iconWidth":"40px","height":"60px"},"list":[{"pagePath":"pages/index/index","iconPath":"static/index2.png","selectedIconPath":"static/index1.png","text":"首页"},{"pagePath":"pages/index/shop","iconPath":"static/shop2.png","selectedIconPath":"static/shop1.png","text":"废钢货架"},{"pagePath":"pages/index/forum","iconPath":"static/forum2.png","selectedIconPath":"static/forum1.png","text":"废钢论坛"},{"pagePath":"pages/index/mine","iconPath":"static/mine2.png","selectedIconPath":"static/mine1.png","text":"我的货仓"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"宁东资讯","compilerVersion":"2.9.8","entryPagePath":"pages/login/guide","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/guide","meta":{"isQuit":true},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/login/login","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","enablePullDownRefresh":true,"titleNView":false}},{"path":"/pages/index/shop","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","enablePullDownRefresh":true,"titleNView":false}},{"path":"/pages/index/forum","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/index/mine","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/home/infoList","meta":{},"window":{"navigationBarTitleText":"资讯列表"}},{"path":"/pages/home/infoDetail","meta":{},"window":{"navigationBarTitleText":"资讯详情"}},{"path":"/pages/home/web","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/home/msg","meta":{},"window":{"navigationBarTitleText":"消息"}},{"path":"/pages/home/msgList","meta":{},"window":{"navigationBarTitleText":"消息"}},{"path":"/pages/home/msgDetail","meta":{},"window":{"navigationBarTitleText":"消息详情"}},{"path":"/pages/login/agreement","meta":{},"window":{"navigationBarTitleText":"用户协议"}},{"path":"/pages/login/register","meta":{},"window":{"navigationBarTitleText":"注册"}},{"path":"/pages/login/setPassword","meta":{},"window":{"navigationBarTitleText":"设置登录密码"}},{"path":"/pages/login/forgetPassword","meta":{},"window":{"navigationBarTitleText":"忘记密码"}},{"path":"/pages/home/search","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/home/detail","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/mine/set","meta":{},"window":{"navigationBarTitleText":"设置"}},{"path":"/pages/mine/aboutUs","meta":{},"window":{"navigationBarTitleText":"关于我们"}},{"path":"/pages/mine/feedBack","meta":{},"window":{"navigationBarTitleText":"意见反馈"}},{"path":"/pages/mine/revisePhone","meta":{},"window":{"navigationBarTitleText":"更换绑定手机号"}},{"path":"/pages/mine/useHelp","meta":{},"window":{"navigationBarTitleText":"使用帮助"}},{"path":"/pages/mine/useDetail","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/mine/address","meta":{},"window":{"navigationBarTitleText":"地址"}},{"path":"/pages/mine/collect","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/mine/info","meta":{},"window":{"navigationBarTitleText":"我的资料","titleNView":{"splitLine":{"color":"#F2F2F5"}}}},{"path":"/pages/mine/location","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/mine/editInfo","meta":{},"window":{"navigationBarTitleText":"我的资料","titleNView":{"splitLine":{"color":"#F2F2F5"}}}},{"path":"/pages/mine/release","meta":{},"window":{"navigationBarTitleText":"添加商品"}},{"path":"/pages/mine/myRelease","meta":{},"window":{"navigationBarTitleText":"我的发布"}},{"path":"/pages/mine/fans","meta":{},"window":{"navigationBarTitleText":"我的关注"}},{"path":"/pages/mine/idCard","meta":{},"window":{"navigationBarTitleText":"身份认证"}},{"path":"/pages/forum/forumSort","meta":{},"window":{"navigationBarTitleText":"分类"}},{"path":"/pages/forum/forumDetail","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/forum/releaseNews","meta":{},"window":{"navigationStyle":"custom","titleNView":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
