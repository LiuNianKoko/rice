let URL = '';
let version = uni.getStorageSync('version')?uni.getStorageSync('version'):100
console.log(version)
//#ifndef MP-WEIXIN

if(process.env.NODE_ENV === 'development'){
    console.log('开发环境');
	// URL = 'http://api.beishenliangpin.com';
	// URL = 'http://shop_demo.sayyin.com';
	URL = 'http://api.qitemc.com';
}else{
    console.log('生产环境');
	// URL = 'http://api.beishenliangpin.com';
	// URL = 'http://shop_demo.sayyin.com';
	URL = 'http://api.qitemc.com';
}
// #endif
//#ifdef MP-WEIXIN
URL = 'https://api.qitemc.com';
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
	  data:  {...data,version:version} || null,
      header: {
        "Content-Type": "application/x-www-form-urlencoded", // application/json
        // "Access-Token":uni.getStorageSync('jwt') || '',
		
      },
      success: function (res) {
        resolve(res);
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