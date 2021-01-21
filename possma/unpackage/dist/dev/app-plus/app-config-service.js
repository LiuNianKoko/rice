
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/login/login","pages/user/user","pages/user/set/set","pages/user/set/about/about","pages/user/set/about/agree/agree","pages/user/changTel/changTel","pages/user/forgetPassWord/forgetPassWord","pages/user/myProceeds/myProceeds","pages/user/myProceeds/Alipay/Alipay","pages/user/myProceeds/bankCard/bankCard","pages/user/myProceeds/details/details","pages/user/order/order","pages/user/order/comment/comment","pages/user/myItem/myItem","pages/user/dailyTask/dailyTask","pages/user/dailyTask/robCode","pages/user/dailyTask/codeNow","pages/user/agent/agent","pages/user/agent/agentCenter","pages/user/agent/PayAgent/PayAgent","pages/user/sureOrder/sureOrder","pages/user/myAddr/myAddr","pages/user/myAddr/newAddr/newAddr","pages/index/details/details","pages/user/allComment/allComment","pages/login/forget/forget","pages/login/register/register","pages/index/bindCard/bindCard","pages/index/agent/agent","pages/index/refund/refund","pages/login/wxRegister/wxRegister","pages/user/share/share","pages/user/dividends/dividends","pages/user/dividends/details/details","pages/user/dividends/details/getMoney/getMoney","pages/user/dividends/details/detail/detail","pages/index/askFor/askFor","pages/index/msg/msgList","pages/index/msg/msgDetail","pages/index/question/question","pages/user/socket/socket","pages/index/mine/mine","pages/user/socket_addr/socket_addr"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"backgroundColor":"#FFFFFF","color":"#bbbbbb","selectedColor":"#409BE0","borderStyle":"white","list":[{"pagePath":"pages/index/index","iconPath":"static/image/img/index1.png","selectedIconPath":"static/image/img/index2.png","text":"首页"},{"pagePath":"pages/user/user","iconPath":"static/image/img/mine1.png","selectedIconPath":"static/image/img/mine2.png","text":"我的"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"一码天下","compilerVersion":"2.9.8","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页","titleNView":false,"enablePullDownRefresh":true}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录","titleNView":false}},{"path":"/pages/user/user","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"个人中心","titleNView":false}},{"path":"/pages/user/set/set","meta":{},"window":{"navigationBarTitleText":"设置"}},{"path":"/pages/user/set/about/about","meta":{},"window":{"navigationBarTitleText":"关于我们"}},{"path":"/pages/user/set/about/agree/agree","meta":{},"window":{"navigationBarTitleText":"协议"}},{"path":"/pages/user/changTel/changTel","meta":{},"window":{"navigationBarTitleText":"更换绑定手机号"}},{"path":"/pages/user/forgetPassWord/forgetPassWord","meta":{},"window":{"navigationBarTitleText":"修改密码"}},{"path":"/pages/user/myProceeds/myProceeds","meta":{},"window":{"navigationBarTitleText":"提现","titleNView":{"buttons":[{"text":"提现记录","fontSize":"14px","color":"#409BE0","width":"64px"}]}}},{"path":"/pages/user/myProceeds/Alipay/Alipay","meta":{},"window":{"navigationBarTitleText":"支付宝提现"}},{"path":"/pages/user/myProceeds/bankCard/bankCard","meta":{},"window":{"navigationBarTitleText":"银行卡提现"}},{"path":"/pages/user/myProceeds/details/details","meta":{},"window":{"navigationBarTitleText":"明细"}},{"path":"/pages/user/order/order","meta":{},"window":{"navigationBarTitleText":"任务"}},{"path":"/pages/user/order/comment/comment","meta":{},"window":{"navigationBarTitleText":"立即评论"}},{"path":"/pages/user/myItem/myItem","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/user/dailyTask/dailyTask","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/user/dailyTask/robCode","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/user/dailyTask/codeNow","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/user/agent/agent","meta":{},"window":{"navigationBarTitleText":"代理中心"}},{"path":"/pages/user/agent/agentCenter","meta":{},"window":{"navigationBarTitleText":"代理中心"}},{"path":"/pages/user/agent/PayAgent/PayAgent","meta":{},"window":{"navigationBarTitleText":"代理中心"}},{"path":"/pages/user/sureOrder/sureOrder","meta":{},"window":{"navigationBarTitleText":"确认订单"}},{"path":"/pages/user/myAddr/myAddr","meta":{},"window":{"navigationBarTitleText":"我的地址","titleNView":{"buttons":[{"text":"新增","fontSize":"14px"}]}}},{"path":"/pages/user/myAddr/newAddr/newAddr","meta":{},"window":{"navigationBarTitleText":"添加收货地址","titleNView":{"buttons":[{"text":"保存","fontSize":"14px","color":"#4F9AF4"}]}}},{"path":"/pages/index/details/details","meta":{},"window":{"navigationBarTitleText":"商品详情","titleNView":false}},{"path":"/pages/user/allComment/allComment","meta":{},"window":{"navigationBarTitleText":"查看全部评论"}},{"path":"/pages/login/forget/forget","meta":{},"window":{"navigationBarTitleText":"忘记密码"}},{"path":"/pages/login/register/register","meta":{},"window":{"navigationBarTitleText":"注册"}},{"path":"/pages/index/bindCard/bindCard","meta":{},"window":{"navigationBarTitleText":"绑定车牌信息","titleNView":false}},{"path":"/pages/index/agent/agent","meta":{},"window":{"navigationBarTitleText":"批发商中心"}},{"path":"/pages/index/refund/refund","meta":{},"window":{"navigationBarTitleText":"退款"}},{"path":"/pages/login/wxRegister/wxRegister","meta":{},"window":{"navigationBarTitleText":"微信登录绑定手机号"}},{"path":"/pages/user/share/share","meta":{},"window":{"navigationBarTitleText":"分享推广"}},{"path":"/pages/user/dividends/dividends","meta":{},"window":{"navigationBarTitleText":"推广分红","titleNView":false}},{"path":"/pages/user/dividends/details/details","meta":{},"window":{"navigationBarTitleText":"提现"}},{"path":"/pages/user/dividends/details/getMoney/getMoney","meta":{},"window":{"navigationBarTitleText":"我的分红","titleNView":{"buttons":[{"text":"明细","fontSize":"14px"}]}}},{"path":"/pages/user/dividends/details/detail/detail","meta":{},"window":{"navigationBarTitleText":"分红明细"}},{"path":"/pages/index/askFor/askFor","meta":{},"window":{"navigationBarTitleText":"申请的挪车码","enablePullDownRefresh":false}},{"path":"/pages/index/msg/msgList","meta":{},"window":{"navigationBarTitleText":"消息列表","enablePullDownRefresh":false}},{"path":"/pages/index/msg/msgDetail","meta":{},"window":{"navigationBarTitleText":"消息详情","enablePullDownRefresh":false}},{"path":"/pages/index/question/question","meta":{},"window":{"navigationBarTitleText":"问卷调查","enablePullDownRefresh":false}},{"path":"/pages/user/socket/socket","meta":{},"window":{"navigationBarTitleText":"咨询客服","enablePullDownRefresh":false}},{"path":"/pages/index/mine/mine","meta":{},"window":{"navigationBarTitleText":"我的挪车码","enablePullDownRefresh":false}},{"path":"/pages/user/socket_addr/socket_addr","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"titleNView":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
