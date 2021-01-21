let imageSrc = "../../static/image/"

let userToken = () => {
	var info = ""
	// uni.getStorage({ key: keys,
	// 	success: function (res) {
	// 		info = res.data
	// 	}
	// });
	// console.log( info , "===========js" );
	// return info
	try {
	    const value = uni.getStorageSync("token");
	    if (value) {
			info = value
	    }
	}catch(e){}
	return info
}

const request = (urls,data) => {
	let httpDefaultOpts = {
		url: "http://qiangma.sayyin.com/api/" + urls,
		data: data,
		method:'post',
		header:{
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		dataType: 'json',
	}
	let promise = new Promise(function(reslove,reject){
		uni.request(httpDefaultOpts).then((res) =>{
			let data = res[1]
			if( data.data.code == 200 ){
				reslove(data)
			}else if( data.data.code == 1004){
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
			}else if( data.data.code == 1006 ){
				uni.showToast({icon:"none",title:data.data.mess})
				uni.reLaunch({
					url:"/pages/login/login"
				})
			}else{
				// uni.showToast({icon:"none",title:data.data.mess})
				reslove(data)
			}
		})
	})
	return promise
}
export default {request,imageSrc,userToken};