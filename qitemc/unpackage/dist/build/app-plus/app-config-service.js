
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/guidelist","pages/index/index","pages/index/logon/h5Register","pages/index/videoplay","pages/index/logon/h5Load","pages/index/pay/yinhkaPay","pages/index/logon/logon","pages/mine/set/helpDetail","pages/mine/set/aboutDetail","pages/index/giftDetail","pages/index/pay/giftPay","pages/index/msg/msg","pages/index/msg/systemMsg","pages/index/msg/msgDetail","pages/index/msg/serviceMsg","pages/index/search","pages/index/seckill/seckill","pages/index/cutPrice/cutPrice","pages/index/pinTuan/pinTuan","pages/index/advanceSale/advanceSale","pages/index/logon/register","pages/index/logon/setPassword","pages/index/logon/useragree","pages/index/logon/userpro","pages/index/detail","pages/index/gorupBuy","pages/index/seckillBuy","pages/index/advanceBuy","pages/index/totalList","pages/index/memberGoods","pages/item/item","pages/viper/viper","pages/viper/priDetail","pages/viper/myextend","pages/viper/goodsExtend","pages/viper/becomeVip","pages/viper/library","pages/viper/libDetail","pages/viper/sonTeam","pages/viper/mymoney","pages/viper/monthPri","pages/viper/vipGoods","pages/viper/shareCode","pages/shopcar/shopcar","pages/index/pay/pay","pages/index/pay/groupPay","pages/index/pay/seckillPay","pages/index/pay/advancePay","pages/mine/set/otherPhone","pages/mine/set/usehelp","pages/mine/set/about","pages/mine/set/suggestion","pages/mine/mine","pages/index/address/address","pages/index/address/addAddress","pages/index/address/editAddress","pages/index/address/chooseAddress","pages/mine/mySpellTeam","pages/mine/spellDetail","pages/index/pinTuan/order-group","pages/mine/proinfo","pages/mine/moneyBalance","pages/mine/setpaypwd","pages/mine/reforgetpaypwd","pages/mine/resetpaypwd","pages/mine/forgetpaypwd","pages/mine/cashdrawal","pages/mine/cashdsuccess","pages/mine/myorderlist","pages/mine/mycash","pages/mine/order-pingjia","pages/mine/mycollect","pages/mine/loadapp","pages/mine/myset","pages/mine/order-daifuk","pages/mine/order-daifahuo","pages/mine/order-daishouh","pages/mine/order-aftersale","pages/mine/applysale"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"棋特买菜","navigationBarBackgroundColor":"#ffffff"},"tabBar":{"color":"#bbbbbb","selectedColor":"#00a0e9","borderStyle":"black","backgroundColor":"#ffffff","height":"50px","fontSize":"10px","iconWidth":"24px","spacing":"3px","list":[{"pagePath":"pages/index/index","iconPath":"/static/home2.png","selectedIconPath":"/static/home3.png","text":"首页"},{"pagePath":"pages/item/item","iconPath":"/static/item2.png","selectedIconPath":"/static/item3.png","text":"分类"},{"pagePath":"pages/viper/viper","iconPath":"/static/viper2.png","selectedIconPath":"/static/viper3.png","text":"会员中心"},{"pagePath":"pages/shopcar/shopcar","iconPath":"/static/shopcar2.png","selectedIconPath":"/static/shopcar3.png","text":"购物车"},{"pagePath":"pages/mine/mine","iconPath":"/static/mine2.png","selectedIconPath":"/static/mine3.png","text":"我的"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"棋特买菜","compilerVersion":"3.0.5","entryPagePath":"pages/index/guidelist","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/guidelist","meta":{"isQuit":true},"window":{"navigationStyle":"custom","enablePullDownRefresh":true,"titleNView":false}},{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","enablePullDownRefresh":true,"titleNView":false}},{"path":"/pages/index/logon/h5Register","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/index/videoplay","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/index/logon/h5Load","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/index/pay/yinhkaPay","meta":{},"window":{"navigationBarTitleText":"结算"}},{"path":"/pages/index/logon/logon","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/mine/set/helpDetail","meta":{},"window":{"navigationBarTitleText":"帮助详情"}},{"path":"/pages/mine/set/aboutDetail","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/index/giftDetail","meta":{},"window":{"navigationBarTitleText":"礼包商品详情"}},{"path":"/pages/index/pay/giftPay","meta":{},"window":{"navigationBarTitleText":"礼包商品结算"}},{"path":"/pages/index/msg/msg","meta":{},"window":{"navigationBarTitleText":"消息"}},{"path":"/pages/index/msg/systemMsg","meta":{},"window":{"navigationBarTitleText":"系统消息"}},{"path":"/pages/index/msg/msgDetail","meta":{},"window":{"navigationBarTitleText":"消息详情"}},{"path":"/pages/index/msg/serviceMsg","meta":{},"window":{"navigationBarTitleText":"客服消息"}},{"path":"/pages/index/search","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/index/seckill/seckill","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/index/cutPrice/cutPrice","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/index/pinTuan/pinTuan","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/index/advanceSale/advanceSale","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/index/logon/register","meta":{},"window":{"navigationBarTitleText":"注册"}},{"path":"/pages/index/logon/setPassword","meta":{},"window":{"navigationBarTitleText":"设置登录密码"}},{"path":"/pages/index/logon/useragree","meta":{},"window":{"navigationBarTitleText":"用户协议"}},{"path":"/pages/index/logon/userpro","meta":{},"window":{"navigationBarTitleText":"隐私政策"}},{"path":"/pages/index/detail","meta":{},"window":{"navigationBarTitleText":"商品详情"}},{"path":"/pages/index/gorupBuy","meta":{},"window":{"navigationBarTitleText":"商品详情"}},{"path":"/pages/index/seckillBuy","meta":{},"window":{"navigationBarTitleText":"商品详情"}},{"path":"/pages/index/advanceBuy","meta":{},"window":{"navigationBarTitleText":"商品详情"}},{"path":"/pages/index/totalList","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/index/memberGoods","meta":{},"window":{"navigationBarTitleText":"会员商品"}},{"path":"/pages/item/item","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/viper/viper","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/viper/priDetail","meta":{},"window":{"navigationBarTitleText":"会员权益"}},{"path":"/pages/viper/myextend","meta":{},"window":{"navigationBarTitleText":"我的推广","navigationBarBackgroundColor":"#00a0e9","navigationBarTextStyle":"white"}},{"path":"/pages/viper/goodsExtend","meta":{},"window":{"navigationBarTitleText":"商品推广团队"}},{"path":"/pages/viper/becomeVip","meta":{},"window":{"navigationBarTitleText":"成为会员"}},{"path":"/pages/viper/library","meta":{},"window":{"navigationBarTitleText":"基地风采"}},{"path":"/pages/viper/libDetail","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/viper/sonTeam","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#00a0e9","navigationBarTextStyle":"white"}},{"path":"/pages/viper/mymoney","meta":{},"window":{"navigationBarTitleText":"我的收益","navigationBarBackgroundColor":"#00a0e9","navigationBarTextStyle":"white","bounce":"none","titleNView":{"buttons":[{"text":"提现","fontSize":"14","float":"right","color":"#ffffff"}]}}},{"path":"/pages/viper/monthPri","meta":{},"window":{"navigationBarTitleText":"月收益"}},{"path":"/pages/viper/vipGoods","meta":{},"window":{"navigationBarTitleText":"我的特权商品","navigationBarBackgroundColor":"#00a0e9","navigationBarTextStyle":"white"}},{"path":"/pages/viper/shareCode","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/shopcar/shopcar","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","onReachBottomDistance":50,"titleNView":false}},{"path":"/pages/index/pay/pay","meta":{},"window":{"navigationBarTitleText":"结算"}},{"path":"/pages/index/pay/groupPay","meta":{},"window":{"navigationBarTitleText":"结算"}},{"path":"/pages/index/pay/seckillPay","meta":{},"window":{"navigationBarTitleText":"结算"}},{"path":"/pages/index/pay/advancePay","meta":{},"window":{"navigationBarTitleText":"结算"}},{"path":"/pages/mine/set/otherPhone","meta":{},"window":{"navigationBarTitleText":"更换绑定手机号"}},{"path":"/pages/mine/set/usehelp","meta":{},"window":{"navigationBarTitleText":"使用帮助"}},{"path":"/pages/mine/set/about","meta":{},"window":{"navigationBarTitleText":"关于我们"}},{"path":"/pages/mine/set/suggestion","meta":{},"window":{"navigationBarTitleText":"意见反馈"}},{"path":"/pages/mine/mine","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","titleNView":false}},{"path":"/pages/index/address/address","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":true,"titleNView":false}},{"path":"/pages/index/address/addAddress","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/index/address/editAddress","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/index/address/chooseAddress","meta":{},"window":{"navigationBarTitleText":"我的收货地址"}},{"path":"/pages/mine/mySpellTeam","meta":{},"window":{"navigationBarTitleText":"我的拼团","titleNView":false}},{"path":"/pages/mine/spellDetail","meta":{},"window":{"navigationBarTitleText":"拼团详情"}},{"path":"/pages/index/pinTuan/order-group","meta":{},"window":{"navigationBarTitleText":"拼团订单"}},{"path":"/pages/mine/proinfo","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/mine/moneyBalance","meta":{},"window":{"navigationBarTitleText":"余额明细"}},{"path":"/pages/mine/setpaypwd","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/mine/reforgetpaypwd","meta":{},"window":{"navigationBarTitleText":"忘记支付密码"}},{"path":"/pages/mine/resetpaypwd","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/mine/forgetpaypwd","meta":{},"window":{"navigationBarTitleText":"忘记密码"}},{"path":"/pages/mine/cashdrawal","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/mine/cashdsuccess","meta":{},"window":{"navigationBarTitleText":"提现详情"}},{"path":"/pages/mine/myorderlist","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/mine/mycash","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/mine/order-pingjia","meta":{},"window":{"navigationBarTitleText":"待评价"}},{"path":"/pages/mine/mycollect","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/mine/loadapp","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/mine/myset","meta":{},"window":{"navigationBarTitleText":"设置"}},{"path":"/pages/mine/order-daifuk","meta":{},"window":{"navigationBarTitleText":"订单详情"}},{"path":"/pages/mine/order-daifahuo","meta":{},"window":{"navigationBarTitleText":"待发货"}},{"path":"/pages/mine/order-daishouh","meta":{},"window":{"navigationBarTitleText":"待收货"}},{"path":"/pages/mine/order-aftersale","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/mine/applysale","meta":{},"window":{"navigationBarTitleText":"申请售后"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
