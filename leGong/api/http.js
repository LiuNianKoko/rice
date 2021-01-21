let URL = '';
//#ifndef MP-WEIXIN

if(process.env.NODE_ENV === 'development'){
    console.log('开发环境');
	// URL = 'http://happyshop.sayyin.com';
	URL = 'http://api.toptyouxuan.com';
}else{
    console.log('生产环境');
	// URL = 'http://happyshop.sayyin.com';
	URL = 'http://api.toptyouxuan.com';
}
// #endif
// #ifdef MP-WEIXIN
// URL = 'https://topt.sayyin.com';
URL = 'https://api.toptyouxuan.com';
// URL = 'http://192.168.0.105'
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
        resolve(res.data);
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