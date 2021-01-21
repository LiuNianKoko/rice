let until = {
	'showLoading': function(va) {
		uni.showLoading({
			mask:true,
			title: va
		});
	},
	'tokenOverdue': function() {
		uni.showToast({
			title: '请先登录!',
			mask:true,
			icon:'none',
			duration: 1500,
			success:function () {
				setTimeout(function(){
					uni.reLaunch({
						url:'/pages/login/login'
					})
				},1000)
			}
		});
		
	},
	'hideLoading': function() {
		uni.hideLoading();
	},
	'showToast': function(e) {
		// uni.showToast({
		//     title: e,
		//     mask:true,
		//     icon:'none',
		//     duration: 2000
		// });
		uni.showToast({
			title: e,
			mask:true,
			icon:'none',
			duration: 2000
		});
	},
	setStorage(key, val) {
		console.log(key,val);
		uni.setStorageSync(key, val);
	},
	getStorage(key) {
		console.log(key);
		return  uni.getStorageSync(key)
	},
	timestampToTime(timestamp, day) {
		let date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		let Y = date.getFullYear() + '-';
		let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
		let D = until.change(date.getDate()) + ' ';
		let h = until.change(date.getHours()) + ':';
		let m = until.change(date.getMinutes()) + ':';
		let s = until.change(date.getSeconds());
		if (day == 1) {
			return M + '月' + D + '日'
		}else if(day == 3){
			return Y + M +'-'+ D+' '+ h + m + s;
		}else {
			return Y + M +'-'+ D;
		}
	},
	gettime(){
		let date = new Date().getTime();
		let date1 =  new Date(date);
		let year =date1.getFullYear();
		let dayt = until.change(date1.getDate());
		let month = (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() + 1);
		let yearmr = year+'-'+month+'-'+dayt;
		return yearmr
	},
	change(t) {
		if (t < 10) {
			return "0" + t;
		} else {
			return t;
		}
	}
}
export default until
