<template>
	<view class="index-wraps">
		<!-- #ifdef MP-WEIXIN -->
		<view class="header-search-wrap w-100">
			<view class="index-header">
				<view class="input-wrap">
					<input class="inputs" type="text" placeholder="搜索商品" @click="toSearch" disabled="true"/>
					<!-- <image class="input-fangdajing" :src="getsrc('search.png')"  @click="toSearch"></image> -->
					<image class="input-fangdajing" :src="imag+'search.png'"  @click="toSearch"></image>
				</view>
				<navigator url="/pages/index/msg/systemMsg">
					<image class="input-message" :src='imag+"xinfeng.png"'></image>
				</navigator>
				<view class="redcircle" v-if="redcircle==1"></view>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view class="header-search-wrap w-100">
			<view class="index-header">
				<view class="input-wrap">
					<input class="inputs" type="text" placeholder="搜索商品" @click="toSearch" disabled="true"/>
					<!-- <image class="input-fangdajing" :src="getsrc('search.png')"  @click="toSearch"></image> -->
					<image class="input-fangdajing" :src="imag+'search.png'"  @click="toSearch"></image>
				</view>
				<!-- <image class="input-saoyisao" :src='imag+"saoyisao.png"' @click="saoyisao"></image> -->
				<navigator url="/pages/index/msg/systemMsg">
					<image class="input-message" :src='imag+"xinfeng.png"'></image>
				</navigator>
				<view class="redcircle" v-if="redcircle==1"></view>
			</view>
		</view>
		<!-- #endif -->
		<view class="blank"></view>
		<!-- 轮播图 -->
		<view class="index-swiper w-100">
			<view class="page-section-spacing">
				<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplays" :interval="interval" :duration="duration"
				 circular="true">
					<swiper-item v-for="(item,index) in bannerImg" :key="index">
						<view class="swiper-item" @click="bannerTo(item)">
							<image :src="item.cover"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<!-- <image src="/static/index.png" alt=""></image> -->
		</view>
		<!-- 公告 -->
		<view class="notice">
			<view class="notice-img">
				<image :src='imag+"new-notice.png"'></image>
			</view>
			<swiper class="swiper-notice" autoplay=true circular=true vertical=true :interval="interval">
				<swiper-item v-for="item in noticeList" :key="item.id" class="swiper-notice-item">
					<view class="notice-item line1" @click="noticeTo(item)">
						{{item.content}}
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 首页按钮 -->
		<view class="index-items w-100">
			<view class="index-item-main">
				<view class="index-item" v-for="(item,index) in indexItem" :key="index" @tap="toTotalList(item,item.jump,index)">
					<view>
						<image :src="item.img" alt=""></image>
					</view>
					<view class="item-name">{{item.name}}</view>
				</view>
			</view>
			<!-- <view class="item-swiper"></view> -->
		</view>
		
		<!-- 商品 -->
		<view class="index-product w-100">
			<view class="recomon" v-for="data in indexpro" :key="data.name" v-show="data.list.length>0|| data.type==3||data.type==2">
				<image class="picture" :src="data.image" v-if="data.type==3" @click="pictureTo(data)"></image>
				<view class="recomon-pro w-100 pro-100u" v-if="data.list.length>0||data.type==2" @click="proTo(data)">
					<image class="pic-300u" :src="data.image" v-if="data.type==2||data.list.length>0 && data.name != 'video'" ></image>
					<!-- <image :class="[data.name=='memberGoods'||data.name=='recommendGoods'||data.name=='spikeLists'||data.name=='presaleLists'||data.name=='groupBuyList'?'pic-100u':'pic-300u']" :src="data.image" v-if="data.type==2||data.list.length>0 && data.name != 'video'" ></image> -->
				</view>
				<view class="downtime w-100" v-if="data.name=='spikeLists'&&data.list.length>0 ">
					距离结束：<text class="downtime-x">{{hr}} : {{min}} : {{sec}}</text>
				</view>
				
				<view class="recomon-main disFlex" :class="[data.reveal==2?'recomon-main2':'']">
					<!-- 推荐 三图 -->
					<view class="recomon-item3-wrap disFlex" v-if="data.reveal==3">
						<view class="recomon-item3 marginBottom20" v-for="item in data.list" :key="item.id" @tap="toDetail(item.id,data)">
							<image :src="item.cover" alt=""></image>
							<view class="recomon-text3">
								<view class="recomon-title3 line1 marginBottom5">
									{{item.goods_name}}
								</view>
								<view class=" recomon-intr3 line1 marginBottom10">
									{{item.desc}}
								</view>
								<view class="recomon-price3  disFlex">
									￥{{item.price}}
									<image class="gouwuche3" :src='imag+"gouwuche2.png"'></image>
								</view>
								<view class="x3-wrap">
								<!-- 	<view class="recomon-price-x3" v-if="data.name!='groupBuyList'||data.name!='spikeLists'||data.name!='presaleLists'">农户价￥{{item.member_price}}</view> -->
									<view class="recomon-price-x3" v-if="data.name=='presaleLists'">预售价￥{{item.reveal_price}}</view>
									<view class="recomon-price-x3" v-else-if="data.name=='spikeLists'">秒杀价￥{{item.reveal_price}}</view>
									<view class="recomon-price-x3" v-else-if="data.name=='groupBuyList'">拼团价￥{{item.reveal_price}}</view>
									<view class="recomon-price-x3" v-else>农户价￥{{item.member_price}}</view>
									
								</view>
								
								<!-- <view class=" member-rob-wrap3">
									<view class="member-rob" v-if="data.name=='memberGoods'||data.name=='presaleLists'">
										马上抢
									</view>
									<view class="member-rob" v-if="data.name=='groupBuyList'">
										拼团
									</view>
									<view class="member-rob" v-if="data.name=='spikeLists'">
										立即秒杀
									</view>
									<view class="member-rob" v-if="data.name=='presaleLists'">
										立即预定
									</view>
								</view> -->
								<!-- <view class="recomon-lowprice3 disFlex" v-if="data.name=='recommendGoods'">
									<text class="recomon-num3">已售 {{item.alsalenum}}</text>
								</view> -->
							</view>
						</view>
						<view class="w-100" v-if="data.name=='memberGoods'||data.name=='recommendGoods'||data.name=='presaleLists'||data.name=='spikeLists'||data.name=='groupBuyList'">
							<view class="turn-more w-100 disFlex" @click="toMore(data)">
								<text>查看更多</text>
								<image class="marginTop5 margingLeft10" :src='imag+"more-black.png"'></image>
							</view>
						</view>
					</view>

				<!-- 推荐 二图 -->
				<view class="recomon-item2-wrap disFlex" v-if="data.reveal==2">
					
					<view class="recomon-item2 marginBottom20" v-for="item in data.list" :key="item.id" @tap="toDetail(item.id,data)">
						<image :src="item.cover" alt=""></image>
						<view class="recomon-text2">
							<view class="recomon-title2 line1">
								{{item.goods_name}}
							</view>
							<view class=" recomon-intr2 line1">
								{{item.desc}}
							</view>
							<view class="recomon-price2 disFlex">
								<view class="recomon-price2-2 disFlex">
									<text class="symbol">￥</text>
									{{item.price}}
									<view class="gouwuche-text"></view>
								</view>
								
								<!-- <view class="recomon-lowprice2 disFlex">
									<text class="recomon-num2">已售{{item.alsalenum}}</text>
								</view> -->
								
							</view>
							<!-- <view class="member-rob-wrap3">
								<view class="member-rob" v-if="data.name=='memberGoods'||data.name=='presaleLists'">
									马上抢
								</view>
								<view class="member-rob" v-if="data.name=='groupBuyList'">
									拼团
								</view>
								<view class="member-rob" v-if="data.name=='spikeLists'">
									立即抢购
								</view>
								<view class="member-rob" v-if="data.name=='presaleLists'">
									立即预定
								</view>
							</view> -->
							<view class="recomon-gouwuche2 disFlex">
								
								<!-- <view class="recomon-price-x2" v-if="data.name!='groupBuyList'||data.name!='spikeLists'||data.name!='presaleLists'">
									<text class="x2-symbol">￥</text>
									<text class="x2-price">{{item.member_price}}</text>
									<image class="x2-img" :src='imag+"member-man.png"'></image>
								</view> -->
								<view class="recomon-price-x2" v-if="data.name=='presaleLists'">
									<!-- 预售价￥{{item.reveal_price}} -->
									<text class="x2-symbol">￥</text>
									<text class="x2-price">{{item.reveal_price}}</text>
									<image class="x2-img3" src="/static/member-man4.png"></image>
								</view>
								<view class="recomon-price-x2" v-else-if="data.name=='spikeLists'">
									<!-- 秒杀价￥{{item.reveal_price}} -->
									<text class="x2-symbol">￥</text>
									<text class="x2-price">{{item.reveal_price}}</text>
									<image class="x2-img3" src="/static/member-man2.png"></image>
								</view>
								<view class="recomon-price-x2" v-else-if="data.name=='groupBuyList'">
									<!-- 拼团价￥{{item.reveal_price}} -->
									<text class="x2-symbol">￥</text>
									<text class="x2-price">{{item.reveal_price}}</text>
									<image class="x2-img3" src="/static/member-man3.png"></image>
								</view>
								<view class="recomon-price-x2" v-else>
									<text class="x2-symbol">￥</text>
									<text class="x2-price">{{item.member_price}}</text>
									<image class="x2-img" :src='imag+"member-man.png"'></image>
								</view>
								<image class="gouwuche" :src='imag+"gouwuche2.png"'></image>
								
							</view>
						</view>
					</view>
					<view class="w-100" v-if="data.name=='memberGoods'||data.name=='recommendGoods'||data.name=='presaleLists'||data.name=='spikeLists'||data.name=='groupBuyList'">
						<view class="turn-more w-100 disFlex" @click="toMore(data)">
							<text>查看更多</text>
							<image class="marginTop5 margingLeft10" :src='imag+"more-black.png"'></image>
						</view>
					</view>
					
				</view>

				<!-- 推荐 一图 -->
				<view class="recomon-item-wrap" v-if="data.reveal==1">
					
					<view v-if="data.name != 'video'">
						<view class="recomon-item marginBottom20" v-for="item in data.list" :key="item.id" @tap="toDetail(item.id,data)">
							<view class="recom-img">
								<image :src="item.cover" alt=""></image>
							</view>
							
							<view class="recomon-text">
								<view class="recomon-title line1 ">
									{{item.goods_name}}
								</view>
								<view class=" recomon-intr line1 ">
									{{item.desc}}
								</view>
								<!-- 秒杀 -->
								<view class="seckill-speed w-100" v-if="data.name=='spikeLists'">
									<view class="seckill-bar">
										<view class="progress-box">
											<progress :percent="item.contrast" activeColor="#F84949" active stroke-width="6" />
										</view>
									</view>
									<view class="seckill-bar-num">已抢{{item.surplus_num}}件 还剩<text class="seckill-bar-save">{{item.surplus_number}}</text>件</view>
								</view>
								<!-- 预售  拼团 -->
								<view class="seckill-speed w-100" v-else-if="data.name=='groupBuyList'||data.name=='presaleLists'">
									<view class="seckill-bar">
										<view class="progress-box">
											<progress :percent="item.contrast" activeColor="#F84949" active stroke-width="6" />
										</view>
									</view>
									<view class="seckill-bar-num">已抢{{item.surplus_num}}件 还剩<text class="seckill-bar-save">{{item.stock}}</text>件</view>
								</view>
								<!-- <view class="open-status disFlex" v-if="data.name=='presaleLists'">
									<text class="open-status02">{{item.end_time}}结束</text>
									<text class="open-status03" v-if="item.remark">{{item.remark}}</text>
								</view> -->
								<view class="open-status disFlex" v-else>
									
								</view>
								<view class=" recomon-price-x-wrap">
									<text class="symbol">￥</text>
									{{item.price}}
									<!-- <view class="recomon-price-x" v-if="data.name=='presaleLists'">预售价￥{{item.reveal_price}}</view>
									<view class="recomon-price-x" v-if="data.name=='spikeLists'">秒杀价￥{{item.reveal_price}}</view>
									<view class="recomon-price-x marginBottom10" v-if="data.name=='memberGoods'||data.name=='recommendGoods'">农户价￥{{item.member_price}}</view>
									<view class="recomon-price-x" v-if="data.name=='groupBuyList'">
										拼团价￥{{item.reveal_price}}
									</view> -->
									
									<view class="member-rob-wrap">
										<!-- <view class="member-rob" v-if="data.name!='groupBuyList'||data.name!='spikeLists'">
											马上抢
										</view> -->
										<view class="member-rob" v-if="data.name=='groupBuyList'">
											拼团
										</view>
										<view class="member-rob" v-else-if="data.name=='spikeLists'">
											立即抢购
										</view>
										<view class="member-rob" v-else>
											马上抢
										</view>
										<!-- <view class="member-rob" v-if="data.name=='presaleLists'">
											立即预定
										</view> -->
									</view>
									
								</view>
								<view class="recomon-price">
									<view class="recomon-price1">
										<text class="recomon-price-symbol">￥</text>
										<text class="recomon-price-price" v-if="data.name=='groupBuyList'||data.name=='spikeLists'||data.name=='presaleLists'">{{item.reveal_price}}</text>
										<text class="recomon-price-price" v-else>{{item.member_price}}</text>
										<image class="recomon-price-img" src="/static/member-man3.png" v-if="data.name=='groupBuyList'"></image>
										<image class="recomon-price-img" src="/static/member-man2.png" v-else-if="data.name=='spikeLists'"></image>
										<image class="recomon-price-img" src="/static/member-man4.png" v-else-if="data.name=='presaleLists'"></image>
										<image class="recomon-price-img recomon-price-img2" :src='imag+"member-man.png"' v-else></image>
									</view>
									
									<!-- <view class="open-have" v-if="data.name=='presaleLists'">
										剩余<text>{{item.stock}}</text>件
									</view>
									<view class=" disFlex" v-if="data.name=='spikeLists'||data.name=='groupBuyList'">
										<text class="open-status02">{{item.end_time_date}}结束</text>
									</view> -->
									
								</view>
								
								<!-- <view class="group-blank" v-if="data.name=='groupBuyList'">
									拼团价{{item.reveal_price}}
								</view> -->
								
								<!-- <view class="recomon-lowprice disFlex" v-if="data.name=='recommendGoods'">
									<text class="recomon-num">已售 {{item.alsalenum}}</text>
								</view> -->
							</view>
						</view>
						<view class="w-100" v-if="data.name=='memberGoods'||data.name=='recommendGoods'||data.name=='presaleLists'||data.name=='spikeLists'||data.name=='groupBuyList'">
							<view class="turn-more w-100 disFlex" @click="toMore(data)">
								<text>查看更多</text>
								<image class="marginTop5 margingLeft10" :src='imag+"more-black.png"'></image>
							</view>
						</view>
					</view>
					<!-- #ifndef MP-WEIXIN -->
					<view class="recomon-item-wrap recomon-video-wrap" v-if="data.name == 'video'">
						<view class="video-wrap" v-for="item in data.list" :key="item.id" @click="videoplay(item.video_link)">
							<!-- <video id="myVideo" :src="item.video_link" :poster="item.video_cover" objectFit="fill" :autoplay="autovideo" show-play-btn show-center-play-btn controls></video> -->
							<image class="poster" :src="item.video_cover" mode="aspectFill"></image>
							<image class="play-btn" src="/static/play.png"></image>
							<!-- <web-view :src="item.video_link" style="height: 450upx;"></web-view> -->
						</view>
					</view>
					<!-- #endif -->
				</view>
				
			</view>
		</view>
		<!-- 推荐商品 -->
		<!-- <view class="recomon">
				<view class="recomon-pro w-100 pro-100u">
					<image class="pic-100u" src="/static/recommond.png"></image> -->
		<!-- <text class="tex-24u">Recommend commodities</text> -->
		<!-- </view>
				
				<view class="recomon-main disFlex"> -->
		<!-- 推荐 三图 -->
		<!-- <view class="recomon-item3 marginBottom20" v-for="item in recomonList" :key="item.id" @tap="toDetail(item.id)">
						<image :src="item.cover" alt=""></image>
						<view class="recomon-text3">
							<view class="recomon-title3 line1 marginBottom10">
								{{item.goods_name}}
							</view>
							<view class=" recomon-intr3 line1 marginBottom15">
								{{item.desc}}
							</view>
							<view class="recomon-price3 marginBottom10 disFlex">
								￥{{item.price}}
								<text class="recomon-price-x3">农户价{{item.member_price}}</text>
							</view>
							<view class="recomon-lowprice3 disFlex">
								<text class="recomon-num3">月销1000</text>
							</view>
						</view>
					</view> -->
		<!-- 推荐 二图 -->
		<!-- <view class="recomon-item2 marginBottom20" v-for="item in recomonList" :key="item.id" @tap="toDetail(item.id)">
						<image :src="item.cover" alt=""></image>
						<view class="recomon-text2">
							<view class="recomon-title2 line1 marginBottom10">
								{{item.goods_name}}
							</view>
							<view class=" recomon-intr2 line1 marginBottom15">
								{{item.desc}}
							</view>
							<view class="recomon-price2 marginBottom10 disFlex">
								￥{{item.price}}
								<text class="recomon-price-x2">农户价{{item.member_price}}</text>
							</view>
							<view class="recomon-lowprice2 disFlex">
								<text class="recomon-num2">月销1000</text>
							</view>
						</view>
					</view> -->
		<!-- 推荐 一图 -->
		<!-- <view class="recomon-item marginBottom20" v-for="item in recomonList" :key="item.id" @tap="toDetail(item.id)">
						<image :src="item.cover" alt=""></image>
						<view class="recomon-text">
							<view class="recomon-title line1 marginBottom20">
								{{item.goods_name}}
							</view>
							<view class=" recomon-intr line1 marginBottom20">
								{{item.desc}}
							</view>
							<view class="recomon-price marginBottom20">
								￥{{item.price}}
							</view>
							<view class="recomon-price-x marginBottom20">农户价{{item.member_price}}</view>
							<view class="recomon-lowprice disFlex">
								<text class="recomon-num">月销1000</text>
							</view>
						</view>
					</view>
				</view>
			</view> -->
		<!-- 秒杀 -->
		<!-- <view class="seckill" v-if="spikeList.length>0">
			<view class="seckill-pro w-100 pro-100u">
				<image class="pic-100u" src="/static/seconds.png"></image>
			</view>
			<view class="downtime w-100">
				本场还剩：<text class="downtime-x">{{hr}} : {{min}} : {{sec}}</text>
			</view>
			<view class="seckill-main">
				<view class="seckill-item marginBottom20" v-for="item in spikeList" :key="item.id" @click="toSeckillDetail(item.id)">
					<image :src="item.cover" alt=""></image>
					<view class="seckill-text">
						<view class="seckill-title line1 marginBottom15">
							{{item.goods_name}}
						</view>
						<view class=" seckill-intr line1 marginBottom15">
							{{item.desc}}
						</view>
						<view class="seckill-speed marginBottom10 disFlex w-100">
							<view class="seckill-bar">
								<view class="progress-box">
									<progress :percent="progressd" activeColor="#F84949" active stroke-width="6" />
								</view>
							</view>
							<text>已抢{{alreadyrob}}件 还剩{{surplus}}件 </text>
						</view>
						<view class="seckill-price">
							<text class="seckill-cost-price">￥{{item.price}}</text>
						</view>
					</view>
					<view class="seckill-immed common-immed">
						<text>立即秒杀</text>
					</view>
				</view>
			</view>
			<navigator url="/pages/index/seckill/seckill">
				<view class="turn-more w-100 disFlex">
					<text>查看更多</text>
					<image class="marginTop5 margingLeft10" src="/static/more.png"></image>
				</view>
			</navigator>
		</view> -->
		<!-- 拼团 -->
		<!-- <view class="spell" v-if="groupBuyList.length>0">
			<view class="spell-pro w-100 pro-100u">
				<image class="pic-100u" src="/static/spell.png"></image>
			</view>
			<view class="spell-main marginTop20">
				<view class="spell-item marginBottom20 disFlex" v-for="item in groupBuyList" :key="item.id" @click="toGroupBuy(item.id)">
					<image :src="item.cover" alt=""></image>
					<view class="spell-text">
						<view class="spell-title line1 marginBottom15">
							{{item.goods_name}}
						</view>
						<view class=" spell-intr line1 marginBottom15">
							{{item.desc}}
						</view>
						<view class="spell-price">
							<text class="spell-cost-price">￥{{item.price}}</text>
						</view>
						<view class="spell-status">
							已拼
						</view>
					</view>
					<view class="spell-immed common-immed">
						<text>拼团</text>
					</view>
				</view>
			</view>
			<navigator url="/pages/index/pinTuan/pinTuan">
				<view class="turn-more w-100 disFlex">
					<text>查看更多</text>
					<image class="marginTop5 margingLeft10" src="/static/more.png"></image>
				</view>
			</navigator>
		</view> -->
		<!-- 预售 -->
		<!-- <view class="open" v-if="presaleList.length>0">
			<view class="open-pro w-100 pro-100u">
				<image class="pic-100u" src="/static/opento.png"></image>
			</view>
			<view class="open-main marginTop20">
				<view class="open-item marginBottom20 disFlex" v-for="item in presaleList" :key="item.id" @click="toAdvanceBuy(item.id)">
					<image :src="item.cover" alt=""></image>
					<view class="open-text">
						<view class="open-title line1 marginBottom15">
							{{item.goods_name}}
						</view>
						<view class=" open-intr line1 marginBottom15">
							{{item.desc}}
						</view>
						<view class="open-price">
							<text class="open-cost-price">￥{{item.price}}</text>
							<text class="open-vip-price margingLeft15">农户价￥{{item.member_price}}</text>
						</view>
						<view class="open-have marginTop15">
							库存<text>{{item.stock}}</text>件
						</view>
						<view class="open-status">
							<text class="open-status02">{{item.end_time}}结束</text>
							<text class="open-status03" v-if="item.remark">{{item.remark}}</text>
						</view>
					</view>
					<view class="open-immed common-immed">
						<text>立即预定</text>
					</view>
				</view>

			</view>
			<navigator url="/pages/index/advanceSale/advanceSale">
				<view class="turn-more w-100 disFlex">
					<text>查看更多</text>
					<image class="marginTop5 margingLeft10" src="/static/more.png"></image>
				</view>
			</navigator>

		</view> -->
		<!-- 会员商品 -->
		<!-- <view class="member">
			<view class="member-pro w-100 pro-100u">
				<image class="pic-100u pic-100u-member" src="/static/member2.png"></image>
			</view>
		<view class="member-main disFlex"> -->
		<!-- 三图 -->
		<!-- <view class="member-item3 marginBottom20" v-for="item in memberList" :key="item.id" @tap="toDetail(item.id)">
						<image class="member-pic3" :src="item.cover" alt=""></image>
						<view class="member-text3">
							<view class="member-title3 line2 marginBottom10">
								{{item.goods_name}}
							</view>
							<view class="member-price marginBottom20">
								￥{{item.member_price}}
							</view>
							<view class="member-rob-wrap">
								<view class="member-rob">
									马上抢
								</view>
							</view>
						</view>
					</view> -->
		<!-- 二图 -->
		<!-- <view class="member-item2 marginBottom20" v-for="item in memberList" :key="item.id" @tap="toDetail(item.id)">
						<image class="member-pic2" :src="item.cover" alt=""></image>
						<view class="member-text2">
							<view class="member-title2 line2 marginBottom10">
								{{item.goods_name}}
							</view>
							<view class="member-price marginBottom20">
								￥{{item.member_price}}
							</view>
							<view class="member-rob-wrap">
								<view class="member-rob">
									马上抢
								</view>
							</view>
						</view>
					</view> -->
		<!-- 一图 -->
		<!-- <view class="member-item marginBottom20" v-for="item in memberList" :key="item.id" @tap="toDetail(item.id)">
						<image class="member-pic" :src="item.cover" alt=""></image>
						<view class="member-text">
							<view class="member-title line2 marginBottom10">
								{{item.goods_name}}
							</view>
							<view class="member-price marginBottom20">
								￥{{item.member_price}}
							</view>
							<view class="member-rob-wrap">
								<view class="member-rob">
									马上抢
								</view>
							</view>
						</view>
					</view>
				</view>
			</view> -->

	</view>
	</view>
</template>

<script>
	import http from '@/api/http.js'
	const app = getApp();
	// var wv
	export default {
		data() {
			return {
				imag: app.globalData.imag,
				// imag:"http://ricepic.sayyin.com/",
				indexItem: [],
				bannerImg: [], //轮播图
				indicatorDots: true,
				autoplays: true,
				interval: 3000,
				duration: 500,
				vipGoods: true, //是否显示会员商品
				autovideo:false,
				recomonList: [], //推荐商品列表
				memberList: [], //会员商品列表
				groupBuyList: [], //团购商品列表
				spikeList: [], //秒杀商品列表
				presaleList: [], //预售商品列表
				endTime: 0,
				hr: 0,
				min: 0,
				sec: 0,
				progressd: 0, //进度完成数
				alreadyrob: 0, //已抢
				surplus: 0, //剩余
				noticeList: [], //公告列表
				indexpro: [], //总列表
				redcircle:0,//消息红点
				videoContext:'',// video
				cid:''
			}
		},
		onLoad() {
			
			this.getBanner()
			this.isVip()
			this.getNotice()
			// #ifdef APP-PLUS
			this.cid = uni.getStorageSync('cid')
			this.getcid()
			this.getquanxian()
			// #endif
		},
		onShow() {
			console.log(this.imag)
			setInterval(() => {
				this.countdown()
			}, 1000)
			this.getBanner()
			this.isVip()
			// #ifdef APP-PLUS
			
			if(!this.cid){
				setTimeout(()=>{
					this.cid = plus.push.getClientInfo().clientid
					this.getcid()
				},1000)
			}
			// #endif
		},
		onHide() {
			
		},
		onShareAppMessage() {
			
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			this.getBanner()
			this.getNotice()
			console.log('refresh');
			setTimeout(function () {
				uni.stopPullDownRefresh();  //停止下拉刷新动画
			}, 1000);
		},
		 onReady: function(res) {
		        // #ifndef MP-ALIPAY
		        this.videoContext = uni.createVideoContext('myVideo')
		        // #endif
				// //#ifdef APP-PLUS
				// let currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
				// setTimeout(function() {
				// 	wv = currentWebview.children()[0]
				// 	wv.setStyle({top:150,height:300})
				// }, 1000); //如果是页面初始化调用时，需要延时一下
				// //#endif
		    },
		methods: {
			getcid(){
				console.log(this.cid)
				let data = {
					token:uni.getStorageSync('token'),
					cid:this.cid
				}
				http('/api/user/set_user_push', 'post',data).then(res => {
					
					if(res.data.status == '200'){
						console.log('success')
					}else{
						console.log('fail')
					}
				})
			},
			// 获取通知权限
			getquanxian(){
				if(uni.getSystemInfoSync().platform=='android'){
					var main = plus.android.runtimeMainActivity();
					var pkName = main.getPackageName(); 
					 var uid = main.getApplicationInfo().plusGetAttribute("uid");
					var NotificationManagerCompat = plus.android.importClass("android.support.v4.app.NotificationManagerCompat");  
					var packageNames = NotificationManagerCompat.from(main);  
					console.log(JSON.stringify(packageNames));  
					if (packageNames.areNotificationsEnabled()) {      
						console.log('已开启通知权限');  
					}else{      
						uni.showModal({          
							title: '北申良品',          
							content: '是否前往打开APP通知权限',          
							// showCancel: false,          
							success: function (res) {              
								if (res.confirm) {                  
									var Intent = plus.android.importClass('android.content.Intent');               
									  var Build = plus.android.importClass("android.os.Build");
									  //android 8.0引导
									  if (Build.VERSION.SDK_INT >= 26) {
									  	var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
									  	intent.putExtra('android.provider.extra.APP_PACKAGE', pkName);
									  } else if (Build.VERSION.SDK_INT >= 21) { //android 5.0-7.0  
									  	var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
									  	intent.putExtra("app_package", pkName);
									  	intent.putExtra("app_uid", uid);
									  } else { //(<21)其他--跳转到该应用管理的详情页  
									  	intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
									  	var uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
									  	intent.setData(uri);
									  }
									 // var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');//可设置表中所有Action字段                  
									 // intent.putExtra('android.provider.extra.APP_PACKAGE', pkName);                  
									 main.startActivity(intent);              
								}          
							},
						});  
					}
				}
				if(uni.getSystemInfoSync().platform=='ios'){
					var UIApplication = plus.ios.import("UIApplication");  
					var app = UIApplication.sharedApplication();  
					var enabledTypes  = 0;  
					if (app.currentUserNotificationSettings) {      
						var settings = app.currentUserNotificationSettings();      
						enabledTypes = settings.plusGetAttribute("types");  
					} else {      //针对低版本ios系统     
						enabledTypes = app.enabledRemoteNotificationTypes();  
					}  
					plus.ios.deleteObject(app);  
					if ( 0 == enabledTypes ) {      
						uni.showModal({          
							title: '北申良品',          
							content: '是否前往打开APP通知权限',          
							// showCancel: false,          
							success: function (res) {              
								if (res.confirm) {                  
									var UIApplication = plus.ios.import("UIApplication");                  
									var NSURL = plus.ios.import("NSURL");                  
									var setting = NSURL.URLWithString("app-settings:");                  
									var application = UIApplication.sharedApplication();                  
									application.openURL(setting);                  
									plus.ios.deleteObject(setting);                  
									plus.ios.deleteObject(application);              
								}          
							},
						});  
					}
					
				}
			},
			toMore(data){
				if(data.name=='memberGoods'){
					uni.navigateTo({
						url: '/pages/index/memberGoods'
					})
				}else if(data.name=='recommendGoods'){
					uni.switchTab({
						url:'/pages/item/item'
					})
				}else if(data.name=='groupBuyList'){
					uni.navigateTo({
						url: '/pages/index/pinTuan/pinTuan'
					})
				}else if(data.name=='presaleLists'){
					uni.navigateTo({
						url: '/pages/index/advanceSale/advanceSale'
					})
				}else if(data.name=='spikeLists'){
					uni.navigateTo({
						url: '/pages/index/seckill/seckill'
					})
				}
			},
			videoplay(link){
				uni.navigateTo({
					url: '/pages/index/videoplay?src=' + link
				})
			},
			// 公告跳转
			noticeTo(item) {
				if (item.link) {
					if(item.type==1){
						uni.navigateTo({
							url: '/pages/index/totalList?src=' + item.link
						})
					}else if(item.type==2){
						uni.navigateTo({
							url:"/pages/viper/libDetail?id=" + item.link
						})
					}else if(item.type==3){
						uni.navigateTo({
							url:"/pages/index/detail?goodsid=" + item.link
						})
					}else if(item.type==4){
						this.$util.setStorage('indexNum',Number(item.link))
						uni.switchTab({
							url:"/pages/item/item"
						})
					}
				}else {
					return
				}
			},
			// 轮播图跳转
			bannerTo(item) {  //1外链；2素材；3商品详情；4分类
				if (item.link) {
					if(item.banner_type==1){
						uni.navigateTo({
							url: '/pages/index/totalList?src=' + item.link
						})
					}else if(item.banner_type==2){
						uni.navigateTo({
							url:"/pages/viper/libDetail?id=" + item.link
						})
					}else if(item.banner_type==3){
						uni.navigateTo({
							url:"/pages/index/detail?goodsid=" + item.link
						})
					}else if(item.banner_type==4){
						this.$util.setStorage('indexNum',Number(item.link))
						uni.switchTab({
							url:"/pages/item/item"
						})
					}
				}
			},
			// 图片模块跳转
			pictureTo(item){
				if (item.link) {
					if(item.pic_type==1){
						uni.navigateTo({
							url: '/pages/index/totalList?src=' + item.link
						})
					}else if(item.pic_type==2){
						uni.navigateTo({
							url:"/pages/viper/libDetail?id=" + item.link
						})
					}else if(item.pic_type==3){
						uni.navigateTo({
							url:"/pages/index/detail?goodsid=" + item.link
						})
					}else if(item.pic_type==4){
						this.$util.setStorage('indexNum',Number(item.link))
						uni.switchTab({
							url:"/pages/item/item"
						})
					}else if(item.pic_type==5){
						uni.navigateTo({
							url: '/pages/index/seckill/seckill'
						})
					}else if(item.pic_type==6){
						uni.navigateTo({
							url: '/pages/index/pinTuan/pinTuan'
						})
					}else if(item.pic_type==7){
						uni.navigateTo({
							url: '/pages/index/advanceSale/advanceSale'
						})
					}
				}
			},
			// 普通模块顶部图片跳转
			proTo(item){
				if (item.pic_link) {
					if(item.pic==1){
						uni.navigateTo({
							url: '/pages/index/totalList?src=' + item.pic_link
						})
					}else if(item.pic==2){
						uni.navigateTo({
							url:"/pages/viper/libDetail?id=" + item.pic_link
						})
					}else if(item.pic==3){
						uni.navigateTo({
							url:"/pages/index/detail?goodsid=" + item.pic_link
						})
					}else if(item.pic==4){
						this.$util.setStorage('indexNum',Number(item.pic_link))
						uni.switchTab({
							url:"/pages/item/item"
						})
					}else if(item.pic==5){
						uni.navigateTo({
							url: '/pages/index/seckill/seckill'
						})
					}else if(item.pic==6){
						uni.navigateTo({
							url: '/pages/index/pinTuan/pinTuan'
						})
					}else if(item.pic==7){
						uni.navigateTo({
							url: '/pages/index/advanceSale/advanceSale'
						})
					}
				}
			},
			beforeCheck(id){
				let data = {
					token:uni.getStorageSync('token'),
					good_id:id
				}
				http('/api/user/check_good','post',data).then(res=>{
					if(res.data.status == 403){
						uni.navigateTo({
							url:'/pages/viper/vipGoods'
						})
					}else{
						uni.navigateTo({
							url: '/pages/index/detail?goodsid=' + id
						})
					}
				})
			},
			toDetail(id,data) {
				if(data.name=='groupBuyList'){
					uni.navigateTo({
						url: '/pages/index/gorupBuy?groupid=' + id
					})
				}else if(data.name=='presaleLists'){
					uni.navigateTo({
						url: '/pages/index/advanceBuy?presaleid=' + id
					})
				}else if(data.name=='spikeLists'){
					uni.navigateTo({
						url: '/pages/index/seckillBuy?seckillid=' + id + '&isCur=1' //1 正在抢   2下期
					})
				}else{
					this.beforeCheck(id)
					// uni.navigateTo({
					// 	url: '/pages/index/detail?goodsid=' + id
					// })
				}
				
			},
			countdown() {
				let that = this
				const end = that.endTime * 1000
				const now = Date.parse(new Date())
				const msec = end - now
				if (msec <= 0) {
					return
				}
				let day = parseInt(msec / 1000 / 60 / 60 / 24)
				let hr = parseInt((msec / 1000 / 60 / 60) % 24)
				let min = parseInt((msec / 1000 / 60) % 60)
				let sec = parseInt((msec / 1000) % 60)
				that.hr = hr > 9 ? hr : '0' + hr
				that.min = min > 9 ? min : '0' + min
				that.sec = sec > 9 ? sec : '0' + sec
			},
			
			toTotalList(e, jump, index) {
				// console.log(e)
				
				if (jump == '2') { //助农
					this.$util.setStorage('indexNum', e.category_id)
					uni.switchTab({
						url: '/pages/item/item'
					})
				}
				if (jump == '6') { //秒杀
					uni.navigateTo({
						url: '/pages/index/seckill/seckill'
					})
				}
				if (jump == '5') { //预售
					uni.navigateTo({
						url: '/pages/index/advanceSale/advanceSale'
					})
				}
				if (jump == '4') { //拼团
					uni.navigateTo({
						url: '/pages/index/pinTuan/pinTuan'
					})
				}
				if (jump == '3') { //会员
					uni.navigateTo({
						url: '/pages/index/memberGoods'
					})
				}
				if (jump == '1') { //基地
					uni.navigateTo({
						url: '/pages/viper/library'
					})
				}
			},
			toSearch() {
				uni.navigateTo({
					url: '/pages/index/search'
				})
			},
			getNotice() {
				let data = {}
				http('/Api/Setting/getNoticeList', 'post',data).then(res => {
					console.log(data) 
					if (res.data.status == '200') {
						this.noticeList = res.data.data
					}
					console.log(res)
				})
			},
			getBanner() {
				let that = this
				let data = {
					token:uni.getStorageSync('token')
				}
				http('/api/index/index', 'post',data).then(res => {
					
					if (res.data.status == '200') {
						that.bannerImg = res.data.data.bannerList.data
						
						that.indexItem = res.data.data.iconList.data
						that.indexpro = res.data.data.guideMap
						
						that.redcircle = res.data.data.is_look
						
						that.recomonList = res.data.data.recommendGoods
						that.memberList = res.data.data.memberGoods
						that.groupBuyList = res.data.data.groupBuyList
						that.presaleList = res.data.data.presaleLists
						if (res.data.data.spikeLists.length > 0) {
							that.spikeList = res.data.data.spikeLists
							that.endTime = res.data.data.spikeLists[0].end_detailed_time
							// that.spikeList.map((item) => {
							// 	that.alreadyrob = parseInt(item.restricted_number) - parseInt(item.surplus_number)
							// 	that.surplus = item.surplus_number
							// 	that.progressd = ((that.alreadyrob / parseInt(item.restricted_number)) * 100).toFixed(0)
							// })
						}
					} else {
						this.$util.showToast(res.data.msg)
						return
					}

					console.log(res)
				})
			},

			isVip() {
				if (uni.getStorageSync('token')) {
					let data = {
						token: uni.getStorageSync('token')
					}
					http('/api/User/get_userinfo', 'post', data).then(res => {
						if (res.data.data.vip) {
							this.$util.setStorage('vip', res.data.data.vip)
						}

						console.log(res)
					})
				}

				// let vip = uni.getStorageSync('vip')

				// if(vip == 1){
				// 	this.vipGoods = false
				// }else if(vip > 1){
				// 	this.vipGoods = true
				// }
				// console.log(vip)
			},
			saoyisao(){
				
				uni.scanCode({
					 success: function (res) {
						 console.log(res)
						 uni.navigateTo({
						 	url: '/pages/index/totalList?src=' + res.result
						 })
					 }
				})
				
			}
		}
	}
</script>

<style lang="less">
	
	page{
		background-color: #f5f5f5;
	}
	.index-wraps {
		position: relative;
		overflow-x: hidden;
		overflow-y: auto;
	}

	.w-100 {
		width: 100%;
	}

	// 顶部搜索框
	.header-search-wrap {
		position: fixed;
		top: 0;
		z-index: 999;

		.index-header {
			height: 146upx;
			line-height: 86upx;
			padding: 0 30upx;
			padding-top: 70upx;
			box-sizing: border-box;
			background-color: #ffffff;
			font-size: 28upx;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;
			
			.redcircle{
				width: 16upx;
				height: 16upx;
				border-radius: 50%;
				background-color: #f31616;
				position: absolute;
				top: 84upx;
				right: 36upx;
			}
			
			.input-message {
				position: absolute;
				width: 48upx;
				height: 52upx;
				top: 80upx;
				/* #ifdef MP-WEIXIN */
				right: 200upx;
				/* #endif */
				/* #ifndef MP-WEIXIN */
				right: 40upx;
				/* #endif */
			}
			.input-saoyisao{
					position: absolute;
					width: 50upx;
					height: 42upx;
					right: 108upx;
					top: 88upx;
				}
			.input-wrap {
				/* #ifdef MP-WEIXIN */
				width: 450upx;
				/* #endif */
				/* #ifndef MP-WEIXIN */
				width: 600upx;
				/* #endif */
				
				height: 60upx;
				padding: 6upx 30upx 10upx 100upx;
				box-sizing: border-box;
				background-color: #f2f2f5;
				border-radius: 50upx;
				color: #333333;
				position: relative;
				.inputs{
					// margin-top: -2upx;
				}
				.input-fangdajing {
					position: absolute;
					width: 44upx;
					height: 44upx;
					left: 30upx;
					top: 10upx;
				}
				
				
			}
		}
	}

	.blank {
		height: 146upx;
	}
	.picture{
		width: 100%;
		height: 200upx;
	}
	// 会员商品等左上半圆分栏样式    后改为图片
	.pro-100u {
		
		.pic-100u {
			width: 100%;
			height: 100upx;
		}
		.pic-300u {
			width: 100%;
			height: 300upx;
		}
		.pic-100u-member {
			height: 156upx;
			margin-left: -22upx;
			margin-top: -56upx;
			// margin-top: -90upx;
			width: 746upx;
		}
	}

	// 立即秒杀、拼团按钮样式
	.common-immed {
		position: absolute;
		right: 20upx;
		bottom: 29upx;
		width: 160upx;
		height: 54upx;
		line-height: 54upx;
		background: rgba(248, 73, 73, 1);
		box-shadow: 0px 10upx 10upx 0px rgba(248, 73, 73, 0.35);
		border-radius: 27upx;
		text-align: center;

		text {
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
		}
	}

	// 轮播图
	.index-swiper {
		margin-top: 20upx;

		.swiper {
			height: 380upx;

			image {
				width: 100%;
				height: 380upx;
			}
		}
	}

	// 其他
	.index-items {
		box-sizing: border-box;
		height: 380upx;
		padding:12upx 24upx;

		// .item-swiper{
		// 	height: 6upx;
		// 	width:100upx;
		// 	margin:26upx auto;
		// 	background:rgba(248,73,73,1);
		// 	opacity:0.3;
		// 	border-radius:3px;
		// }
		.index-item-main {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.index-item {
				margin-bottom: 20upx;

				image {
					width: 108upx;
					height: 108upx;
					margin: 10upx;
				}

				.item-name {
					text-align: center;
					font-size: 26upx;
					color: rgba(0, 0, 0, 1);
				}
			}

		}
	}

	// 公告
	.notice {
		display: flex;
		padding: 10upx 16upx 10upx 40upx;
		align-items: center;
		box-sizing: border-box;
		height: 104upx;
		margin-top: 20upx;
		
		image {
			width: 56upx;
			height: 54upx;
		}

		.swiper-notice {
			width: 100%;
			height: 104upx;
			margin-left: 26upx;

			.swiper-notice-item {
				height: 104upx;
				line-height: 104upx;
			}

			.notice-item {
				font-size: 32upx;
				font-weight: bold;
				color: #3e3e3e;
			}
		}
	}
	.recomon-image-wrap{
		width: 100%;
		padding: 20upx;
		box-sizing: border-box;
		.recom-image{
			width: 100%;
			height: 300upx;
			margin-top: 20upx;
		}
	}

	// 商品
	.index-product {
		box-sizing: border-box;
		padding: 30upx;
		position: relative;
		
		// 会员商品
		.member {
			.member-main {
				margin-top: 80upx;
				// margin-right: 10upx;
				flex-wrap: wrap;
				padding: 0 0 0 6upx;
				box-sizing: border-box;

				// justify-content: space-between;
				//  会员商品 三图样式
				.member-item3 {
					// width:335upx;  //两图 宽
					height: 480upx; //三图 高
					width: 220upx; //三图 宽
					// height:560upx;//两图 高
					margin-right: 8upx;

					.member-pic3 {
						// width: 335upx;
						// height: 335upx;
						width: 220upx;
						height: 220upx;
					}

					.member-text3 {
						padding: 20upx 20upx;
						box-sizing: border-box;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;

						.member-title3 {
							// width:280upx;   //两图 宽
							width: 216upx; //三图 宽
							height: 70upx;
							padding: 0 20upx;
							box-sizing: border-box;
							font-size: 28upx;
							font-weight: bold;
							color: rgba(0, 0, 0, 1);
							// line-height:40upx;
						}

					}
				}

				//  会员商品 两图样式
				.member-item2 {
					width: 335upx; //两图 宽
					height: 560upx; //两图 高

					.member-pic2 {
						width: 335upx;
						height: 335upx;
					}

					.member-text2 {
						padding: 20upx 20upx;

						.member-title2 {
							width: 280upx; //两图 宽
							height: 70upx;
							padding: 0 20upx;
							box-sizing: border-box;
							font-size: 28upx;
							font-weight: bold;
							color: rgba(0, 0, 0, 1);
							// line-height:40upx;
						}
					}
				}

				//  会员商品 一图样式
				.member-item {
					// width:335upx;  //两图 宽
					// height:560upx;//两图 高
					display: flex;

					.member-pic {
						width: 335upx;
						height: 335upx;
					}

					.member-text {
						padding: 20upx 20upx 50upx;
						box-sizing: border-box;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.member-title {
							width: 280upx; //两图 宽
							height: 70upx;
							padding: 0 20upx;
							box-sizing: border-box;
							font-size: 28upx;
							font-weight: bold;
							color: rgba(0, 0, 0, 1);
							// line-height:40upx;
						}
					}
				}

				.member-price {
					text-align: center;
					height: 30upx;
					font-size: 30upx;
					font-weight: bold;
					// color:rgba(248,73,73,1);
				}

				
			}
		}
		// 推荐商品 按钮    使用中的样式
		.member-rob-wrap3{
			display: flex;
			justify-content: center;
			.member-rob{
				margin-top: 8upx;
			}
		}
		.member-rob-wrap {
			display: flex;
			justify-content: flex-end;
			position: absolute;
			right: 24upx;
			bottom: 26upx;
		}
		.member-rob {
			text-align: center;
			line-height: 44upx;
			width: 130upx;
			height: 44upx;
			background: #00a0e9;
			// box-shadow: 0px 7upx 10upx 0px #00a0e9;
			border-radius: 25upx;
			font-size: 24upx;
			color: rgba(255, 255, 255, 1);
			// margin-top: 8upx;
		}
		
		
		// 推荐商品     使用中的样式
		.recomon {
			.recomon-main2{
				padding: 0 4upx!important;
			}
			.recomon-main {
				margin-top: 20upx;
				// justify-content: space-between;	
				padding: 0 0 0 8upx;
				box-sizing: border-box;
				flex-wrap: wrap;

				// 三图
				.recomon-item3-wrap {
					width: 100%;
					flex-wrap: wrap;
					// padding-left: 4upx;
					box-sizing: border-box;
					.recomon-item3 {
						// width:335upx;
						// height:560upx;
						margin-left: 6upx;
						// height: 430upx; //三图 高
						width: 220upx; //三图 宽
						background: rgba(255, 255, 255, 1);
						box-shadow: 0px 0px 20upx 0px rgba(0, 0, 0, 0.1);
						border-radius: 10upx;
						
						image {
							// width: 335upx;
							// height: 335upx;
							width: 220upx;
							height: 220upx;
						}

						.recomon-text3 {
							padding: 12upx;

							.recomon-title3 {
								// width:279upx;
								width: 210upx;
								font-size: 28upx;
								// font-weight: bold;
								color: rgba(0, 0, 0, 1);
							}

							.recomon-intr3 {
								// width:259upx;
								width: 200upx;
								font-size: 24upx;
								color: rgba(187, 187, 187, 1);
							}

							.recomon-price3 {
								// width:100upx;
								// height:32upx;
								font-size: 24upx;
								font-weight: bold;
								align-items: center;
								justify-content: space-between;
							}
							.gouwuche3{
								border-radius: 50%;
								width: 46upx;
								height: 44upx;
							}
							.x3-wrap{
								display: flex;
								justify-content: space-between;
								align-items: center;
								
							}
							.recomon-price-x3 {
								// width:120upx;
								font-size: 24upx;
								color: #f31616;
								background-color: #dadada;
								border-radius: 20upx;
								padding: 4upx 10upx;
							}

							.recomon-lowprice3 {
								justify-content: flex-end;
								margin-top: 8upx;
								.recomon-num3 {
									// width: 110upx;
									// height: 24upx;
									// line-height: 24upx;
									font-size: 24upx;
									color: rgba(187, 187, 187, 1);
								}
							}
						}
					}
				}

				// 二图
				.recomon-item2-wrap {
					width: 100%;
					flex-wrap: wrap;
					justify-content: space-between;
					.recomon-item2 {
						width: 335upx;
						// height: 540upx;
						// margin-right: 6upx;
						background: rgba(255, 255, 255, 1);
						box-shadow: 0px 0px 20upx 0px rgba(0, 0, 0, 0.1);
						border-radius: 10upx;
					
						image {
							width: 335upx;
							height: 335upx;
						}
					
						.recomon-text2 {
							padding: 25upx 16upx;
					
							.recomon-title2 {
								width: 300upx;
								// font-weight: bold;
								color: #333;
								line-height: 40upx;
								margin-bottom: 6upx;
								font-size: 32upx;
							}
					
							.recomon-intr2 {
								// width: 259upx;
								font-size: 24upx;
								line-height: 30upx;
								margin-bottom: 34upx;
								color:#939393;
							}
					
							.recomon-price2 {
								// width:100upx;
								// height:32upx;
								
								align-items: center;
								justify-content: space-between;
								
							}
							.recomon-price2-2{
								font-size: 26upx;
								// margin-top: 4upx;
								color: #363636;
								line-height: 26upx;
								font-weight: bold;
								font-family: numFont;
								align-items: center;
								.symbol{
									font-size: 24upx;
									line-height: 24upx;
									// font-weight: bold;
								}
							}
							.recomon-price-x2 {
								// width:120upx;
								color: #ec614a;
								display: flex;
								align-items: flex-end;
								line-height: 24upx;
								position: relative;
								// background-color: #dadada;
								// border-radius: 20upx;
								// padding: 4upx 12upx;
								.x2-symbol{
									font-size: 24upx;
									line-height: 26upx;
									font-weight: bold;
								}
								.x2-price{
									font-weight: bold;
									font-size: 38upx;
									line-height: 38upx;
									font-family: numFont;
								}
								
								.x2-img{
									width: 64upx;
									height: 78upx;
									position: absolute;
									top: -20upx;
									right: -64upx;
								}
								.x2-img3{
									width: 58upx;
									height: 24upx;
									position: absolute;
									top: 0;
									right: -62upx;
								}
							}
							.recomon-lowprice2 {
								justify-content: flex-end;
								// margin-top: 20upx;
					
								.recomon-num2 {
									// width: 110upx;
									line-height: 24upx;
									font-size: 30upx;
									color: rgba(187, 187, 187, 1);
									font-weight: normal;
								}
							}
							.recomon-gouwuche2{
								justify-content: space-between;
								align-items: center;
								// padding-right: 8upx;
								font-size: 24upx;
								position: relative;
								margin-top: 8upx;
							}
							.gouwuche{
								border-radius: 50%;
								width: 58upx;
								height: 56upx;
								position: absolute;
								top: -12upx;
								right: -4upx;
								// margin-right: 8upx;
							}
							.gouwuche-text{
								
							}
						}
					}
				}
				

				// 一图
				
				.recomon-video-wrap{
					margin: 0 0 40upx;
					.video-wrap{
						width: 100%;
						height: 450upx;
						margin-bottom: 20upx;
						position: relative;
						.poster{
							width: 100%;
							height: 450upx;
						}
						.play-btn{
							width: 100upx;
							height: 100upx;
							position: absolute;
							top: 39%;
							left: 42%;
						}
						video{
							width: 100%;
							height: 450upx;
						}
					}
				}
				.recomon-item-wrap {
					width: 100%;
					.recomon-item {
						width: 100%;
						// height:560upx;
						margin-right: 6upx;
						background: rgba(255, 255, 255, 1);
						box-shadow: 0px 0px 20upx 0px rgba(0, 0, 0, 0.1);
						border-radius: 10upx;
						display: flex;
						.recom-img{
							padding:26upx 20upx 24upx;
							image {
								width: 212upx;
								height: 218upx;
								// flex: 1;
							}
						}
						

						.recomon-text {
							padding: 25upx 10upx;
							// margin-left: 10upx;
							flex: 1;
							position: relative;
							.recomon-title {
								// font-weight: bold;
								margin-bottom: 2upx;
								font-size: 32upx;
								color: #333;
							}

							.recomon-intr {
								font-size: 24upx;
								color: #939393;
								
							}

							.recomon-price {
								// width:100upx;
								// height:32upx;
								color: #ec614a;
								
								display: flex;
								align-items: flex-end;
								line-height: 30upx;
								
								// justify-content: space-between;
								// margin-bottom: 10upx;
								.recomon-price1{
									position: relative;
									display: flex;
									align-items: flex-end;
								}
								.recomon-price-symbol{
									font-size: 24upx;
									line-height: 20upx;
								}
								.recomon-price-price{
									font-size: 38upx;
									font-weight: bold;
									font-family: numFont;
								}
								.recomon-price-img{
									width: 64upx;
									height: 30upx;
									margin-left: 2upx;
									// position: absolute;
									// top: 10upx;
									// left: 118upx;
								}
								.recomon-price-img2{
									width: 64upx;
									height: 76upx;
									position: absolute;
									top: -24upx;
									right: -64upx;
								}
							}
							
							.recomon-price-x-wrap{
								// margin-top: 24upx;
								// align-items: center;
								// justify-content: space-between;
								line-height: 26upx;
								font-size: 26upx;
								font-weight: bold;
								font-family: numFont;
								margin-bottom: 8upx;
								.symbol{
									font-size: 24upx;
									line-height: 24upx;
									// font-weight: normal;
								}
							}
							.recomon-price-x {
								// width:120upx;
								line-height: 24upx;
								font-size: 24upx;
								// color: #f31616;
								// background-color: #dadada;
								// border-radius: 20upx;
								// padding: 6upx 14upx;
							}
							
							.recomon-lowprice {
								margin-top: 20upx;

								.recomon-num {
									line-height: 24upx;
									font-size: 20upx;
									color: rgba(187, 187, 187, 1);
								}
							}
							.group-blank{
								height: 70upx;
								color:  #F84949;
								font-size: 24upx;
								line-height: 58upx;
							}
							.open-have {
								color: rgba(187, 187, 187, 1);
								
								font-weight: normal;
							
								text {
									color: #F84949;
									
								}
							}
							.open-status02{
								color: #fc1313;
								font-weight: normal;
							}
							.open-status {
								height: 28upx;
								margin-top: 44upx;
								color: rgba(187, 187, 187, 1);
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								.open-status02{
									font-size: 28upx;
									margin-top: -6upx;
								}
								text {
									color: #fc1313;
									font-size: 20upx;
								}
							}
						}
					}
				}

			}
		}

		
		.downtime {
			text-align: center;
			height: 30upx;
			font-size: 28upx;
			font-weight: bold;
			color: rgba(0, 0, 0, 1);
			margin: 26upx 0;
		
			.downtime-x {
				color: #F84949;
			}
		}
		.seckill-speed {
			// margin-bottom: 16upx;
			margin-bottom: 22upx;
			margin-top: -8upx;
			.seckill-bar {
				width: 280upx;
				height: 12upx;
				background: rgba(242, 242, 245, 1);
				border-radius: 6upx;
				margin: 20upx 12upx 0 0;
			}
		
			.seckill-bar-num {
				// width:190upx;
				/* #ifdef APP-PLUS */
				height: 20upx;
				font-size: 20upx;
				/* #endif */
				height: 24upx;
				line-height: 24upx;
				font-size: 24upx;
				color: rgba(187, 187, 187, 1);
				margin-top: 6upx;
				.seckill-bar-save{
					font-size: 26upx;
					color:#ec614a;	
					font-weight: bold;
					// margin: 0 10upx;
				}
			}
		}
		// 整点秒杀  
		.seckill {
			
			.seckill-item {
				height: 586upx;
				background: rgba(255, 255, 255, 1);
				box-shadow: 0px 0px 20upx 0px rgba(0, 0, 0, 0.1);
				border-radius: 10upx;
				position: relative;

				image {
					width: 100%;
					height: 360upx;
				}

				.seckill-text {
					padding: 25upx 20upx;

					.seckill-title {
						width: 415upx;
						height: 32upx;
						font-size: 32upx;
						font-weight: bold;
						color: rgba(0, 0, 0, 1);
					}

					.seckill-intr {
						width: 311upx;
						height: 24upx;
						line-height: 24upx;
						font-size: 24upx;
						color: rgba(187, 187, 187, 1);
					}

					.seckill-speed {
						height: 30upx;

						.seckill-bar {
							width: 280upx;
							height: 12upx;
							background: rgba(242, 242, 245, 1);
							border-radius: 6upx;
							margin: 10upx 12upx 0 0;
						}

						text {
							// width:190upx;
							/* #ifdef APP-PLUS */
							height: 20upx;
							font-size: 20upx;
							/* #endif */
							height: 24upx;
							line-height: 24upx;
							font-size: 24upx;
							color: rgba(187, 187, 187, 1);
						}
					}

					.seckill-price {
						height: 50upx;

						.seckill-cost-price {
							font-size: 38upx;
							font-weight: bold;
							// color:rgba(248,73,73,1);
						}

						.seckill-vip-price {
							font-size: 26upx;
							color: rgba(248, 73, 73, 1);
						}
					}
				}
			}

		}

		// 查看更多
		.turn-more {
			justify-content: center;
			align-items: center;
			padding-top: 10upx;
			height: 50upx;
			margin-bottom: 20upx;

			text {
				font-size: 24upx;
				color: rgba(187, 187, 187, 1);
			}

			image {
				width: 28upx;
				height: 28upx;
				margin-top: 2upx;
			}
		}

		// 拼团
		.spell {
			.spell-item {
				position: relative;

				image {
					width: 280upx;
					height: 280upx;
				}

				.spell-immed {
					right: 10upx;
					bottom: 10upx;

					text {
						letter-spacing: 12upx;
					}
				}

				.spell-text {
					width: 410upx;
					height: 280upx;
					padding-left: 20upx;

					.spell-title {
						width: 383upx;
						height: 35upx;
						line-height: 35upx;
						font-size: 32upx;
						font-weight: bold;
						color: rgba(0, 0, 0, 1);
					}

					.spell-intr {
						width: 311upx;
						height: 24upx;
						line-height: 24upx;
						font-size: 24upx;
						color: rgba(187, 187, 187, 1);
					}

					.spell-price {
						height: 50upx;

						.spell-cost-price {
							font-size: 38upx;
							font-weight: bold;
							// color:rgba(248,73,73,1);
						}

						.spell-vip-price {
							font-size: 26upx;
							color: rgba(248, 73, 73, 1);
						}
					}

					.spell-status {
						font-size: 24upx;
						margin-top: 86upx;
					}
				}
			}
		}

		// 预售
		.open {
			.open-item {
				position: relative;

				image {
					width: 280upx;
					height: 280upx;
				}

				.open-immed {
					right: 10upx;
					bottom: 10upx;
				}

				.open-text {
					width: 410upx;
					height: 280upx;
					padding-left: 20upx;

					.open-title {
						width: 383upx;
						height: 32upx;
						line-height: 32upx;
						font-size: 32upx;
						font-weight: bold;
						color: rgba(0, 0, 0, 1);
					}

					.open-intr {
						width: 311upx;
						height: 24upx;
						line-height: 24upx;
						font-size: 24upx;
						color: rgba(187, 187, 187, 1);
					}

					.open-price {
						height: 50upx;

						.open-cost-price {
							font-size: 38upx;
							font-weight: bold;
							// color:rgba(248,73,73,1);
						}

						.open-vip-price {
							font-size: 26upx;
							color: rgba(248, 73, 73, 1);
						}
					}

					.open-have {
						height: 30upx;
						font-size: 28upx;
						font-weight: bold;

						text {
							color: #F84949;
							margin: 0 15upx;
						}
					}

					.open-status {
						height: 50upx;
						margin-top: 20upx;
						color: rgba(187, 187, 187, 1);
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						text {
							font-size: 18upx;
						}
					}
				}
			}
		}
	}
</style>
