let URL = '';
//#ifndef MP-WEIXIN

if(process.env.NODE_ENV === 'development'){
    console.log('开发环境');
	// URL = 'http://steels.sayyin.com';
	URL = 'http://applet.ningdongzixun.com';
}else{
    console.log('生产环境');
	// URL = 'http://steels.sayyin.com';
	URL = 'http://applet.ningdongzixun.com';
}
// #endif

switch(uni.getSystemInfoSync().platform){
    case 'android':
       console.log('运行Android上')
       break;
    case 'ios':
       console.log('运行iOS上')
       break;
    default:
       console.log('运行在开发者工具上')
       break;
};

const http = (url, method,data) => {
	
  return new Promise(function (resolve, reject) {
    uni.request({
      url: URL+url || '',
      method: method || 'get',
	  data:  data || null,
      header: {
        "Content-Type": "application/x-www-form-urlencoded", // application/json
        // "Access-Token":uni.getStorageSync('jwt') || '',
		
      },
      success: function (res) {
		if(res.data.status == 201 || res.data.status == 202 || res.data.status == 203){
			// uni.showToast({
			// 	title:'用户信息已失效，请重新登录',
			// 	icon:'none'
			// })
			// uni.setStorageSync('token','')
			// setTimeout(()=>{
			// 	uni.reLaunch({
			// 		url:'/pages/login/login'
			// 	})
			// },1300)
			uni.showModal({
				title:'您暂未登录',
				content:'是否前往登录!',
				success: function (res) {
					if (res.confirm) {
						console.log('用户点击确定');
						uni.reLaunch({
							url:'/pages/login/login'
						})
					} else if (res.cancel) {
						console.log('用户点击取消');
						uni.switchTab({
							url:'/pages/index/index'
						})
					}
				}
			})
		}else{
			resolve(res.data);
		}
      },
      fail: function (err) {
		 console.log(data)
		console.log(JSON.stringify(err));
        reject({ error: '网络错误' });
      },
    })
  })
}

export default http