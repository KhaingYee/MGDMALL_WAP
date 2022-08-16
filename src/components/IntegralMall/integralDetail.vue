<template>
	<div class="product" style="position:relative">
		<!-- <div v-title data-title="商品详情">商品详情</div> -->
		<!-- <pr-header :text="title"></pr-header> -->
		<div class="header" :v-if="tabOpacity == 0 && tabOpacity != 1">
			<div :style="tabOpacity == 0 && tabOpacity != 1" class="newTab">积分商品</div>
		</div>
		<div class="header" :style="headBackgroundColor">
		<div :style="tabOpacity" class="tab" id="menu-center">
			<div class="active"><a  href="#tab1">商品</a></div>
                <div><a href="#tab2">详情</a></div>
                <div><a href="#tab3">属性</a></div>
                <div><a href="#tab4">推荐</a></div>
		</div>
		<img class="headerimg" src="../../assets/arrow1@2x.png" @click="goLastPage">
		<img src="../../assets/cart@3x.png" class="sharebtn-ng" @click="toLink('/Cart')">
		<img src="../../assets/about.png" class="btn-ng clearfix" v-if="!btn" v-show="!set" @click="addClass1">

		<transition  name="fade">
			<div class="box-wrap" v-if="staheader">
			<div class="box-bg" @click="addClass1"></div>
			<div class="bomb-box">
			<div class="polygon"></div>
			<div class="btn" @click="toLink('/home')">
			<span class="icon"><i></i></span>首页
			</div>
			<div class="btn" @click="toLink('/myNews')">
			<span class="icon"><i></i></span>消息
			</div>
			<div class="btn" @click="popupVisible=true">
			<span class="icon"><i></i></span>分享
			</div>
			</div>
			</div>
		</transition>
		</div>
	<!-- <PullUpReload
      v-show="tabFlg"
      :on-infinite-load="onInfiniteLoad"
      :parent-pull-up-state="pullUpState"
    > -->
		<div id="tab1">
		<mt-swipe :auto="4000" @change="imgSlideChange">
			<span class="slide-count-indicator">{{(images.length>0?currentImgSlideIndex+1:0)+' / '+images.length}}</span>  
			<mt-swipe-item v-for="item in images" :key="item.id">
				<img :src="URL + item.pic_url">
			</mt-swipe-item>
		</mt-swipe>
		<div class="see-video" v-if="video">
			<img src="../../assets/videoplay.png" class="playimg" @click="showvideo(video)" v-if="video"/>
		</div>
		
		<!--{{$store.state.commodity_data.images}}-->
		<div class="fengee"></div>
		<div  class="describe" v-if="$store.state.commodity_data">
			<p class="fn" v-if="detail">{{$store.state.commodity_data.goods.title}}</p>
			<p class="fn" v-else>{{goodsInfo.title}}</p>
			<p class="description-fn" v-if="detail">{{$store.state.commodity_data.goods.description}}</p>
			<p class="description-fn" v-else>{{goodsInfo.description}}</p>
			<p class="timer">
				{{cut_time}}<b class="gray"></b>
			</p>
			<div class="price active">
				<p class="orc clearfix">
					<em class="icon fl"></em>
					<em class="fl" v-if="detail">{{$store.state.commodity_data.goods.integral}}</em>
					<em class="fl" v-else>{{goodsInfo.integral}}</em>
				</p>
				<p class="new clearfix" v-if="detail">还需支付{{$store.state.commodity_data.goods.money}}元</p>
				<p class="new clearfix" v-else>还需支付{{goodsInfo.money}}元</p>
				<p class="new" v-if="detail">市场参考价：<s>{{$store.state.commodity_data.goods.price}}</s>元</p>
				<p class="new" v-else>市场参考价：<s>{{goodsInfo.price}}</s>元</p>
			</div>
		</div>
		<div class="for-discount" @click="showCoupon">
			<span class="discount_text">优惠</span>
			<span
			class="coupon_img"
			v-for="(item,index) in couponList.slice(0,2)"
					:key="index.id">
					满{{parseInt(item.condition)}}减{{parseInt(item.money)}}元
			</span>
			<span class="btn-right"></span>
		
        </div>
		<div class="speSelected" @click="theSon">
          <span class="title">规格</span>
          <div>
              <span class="select-spec" v-if="detail !== ''">{{detail}} {{$store.state.commodity_val}}个</span>
              <span class="select-spec" v-else-if="option">{{option}} {{$store.state.commodity_val}}个</span>
              <span class="select-spec" v-else>{{nospec}}</span>
          </div>



          <span
              v-if="item"
              v-for="(item, index) in $store.state.guigeidname"
              :key="index"
              class="number"
          >{{$store.state.guigeName[index]}}&nbsp;{{item}}</span>
          <span class="btn-right"></span>
      	</div>
		<!-- 已选 -->
		<div class="selected">已选
			<span class="number">数量{{$store.state.commodity_val}}</span>
			<span v-if="item" v-for="(item, index) in $store.state.guigeidname" :key="index" class="number">{{$store.state.guigeName[index]}}&nbsp;{{item}}</span>
			<!-- <span class="btn-right"></span> -->
		</div>
		<div class="delivery_method">
			<div @click="callingArea" v-if="defStatus_address == 1">
				<div class="delivery_title">送至</div>
				<input v-if="addressAll1 == ''" placeholder="请选择地区" type="tel" class="delivery_input" disabled v-model="defApi_address">
				<input v-else placeholder="请选择地区" type="tel" class="delivery_input" disabled v-model="addressAll1">
				<span class="delivery_right"></span>
			</div>
			<div @click="callingArea" v-else>
				<div class="delivery_title">送至</div>
				<input v-if="addressAll1 == ''" placeholder="请选择地区" type="tel" class="delivery_input" disabled v-model="addressAllData">
				<input v-else placeholder="请选择地区" type="tel" class="delivery_input" disabled v-model="addressAll1">
				<span class="delivery_right"></span>
			</div>
			<div class="transport-delivery" v-if="merchantDelivery">
				服务&nbsp;&nbsp;
				<span class="transport-pass"> 由
				<span class="transport-name" @click="toShop(shopData.id)">{{shopData.shop_name}}</span>&nbsp;负责供货,&nbsp;{{merchantDelivery}}
				</span>
			</div>
			<div class="transport-delivery" v-if="expressDelivery">
				服务&nbsp;&nbsp;
				<span class="transport-pass"> 由
				<span class="transport-name" @click="toShop(shopData.id)">{{shopData.shop_name}}</span>&nbsp;在&nbsp;{{expressDelivery.stock_name}}&nbsp;负责发货,&nbsp;{{expressDelivery.send_time}}小时内发货
				</span>
			</div>
			<div v-if="$store.state.commodity_data.goods.freight_type == 2">
				<div>
				<div class="delivery_title">运费</div>
				<div class="delivery_busi">卖家包邮</div>
				</div>
			</div>
			<div v-else>
				<div v-if="deliveryCal == -1">
				<div class="delivery_title">配送</div>
				<div class="delivery_busi">免配送费</div>
				</div>
				<div v-else-if="deliveryCal">
				<div class="delivery_title">配送</div>
				<div class="delivery_busi">{{deliveryCal}} 元</div>
				</div>
				<div v-else>
				<div class="delivery_title">运费</div>
				<div v-if="freightCal == 0" class="delivery_busi">卖家包邮</div>
				<div v-else-if="callFreStatus == 0" class="delivery_busi">{{callFreMess}}</div>
				<div v-else class="delivery_busi">{{freightCal}} 元</div>
				</div>
			</div>
			<div>
				<div class="delivery_pay">发货时间</div>
				<div class="deliverydate">付款后&nbsp;
					<span class="spanDate">{{$store.state.commodity_data.goods.presell_date}}</span>&nbsp;天内发货
					<span class="presale" v-if="$store.state.commodity_data.goods.is_presell == 0">有现货</span>
					<span class="presale" v-if="$store.state.commodity_data.goods.is_presell == 1">预售商品</span>
				</div>
			</div>
		</div>
		<div class="fenge"></div>
		<div class="comment-display">
			<div class="for_comment" @click="goToComment">
				<span class="coupon_title">商品评论&nbsp;({{allCount}})</span>
				<span class="coupon_number"> 查看更多</span>
				<span class="btn-right"></span>
			</div>
			<!-- 暂无评论 -->
			<div v-if="dataItem == null" class="center"></div>
			<div v-else class="list-wrap" v-for="item in dataItem.slice(0,2)" :key="item.id + 'i'">
				<div class="list-hd clearfix">
					<div class="pull-left fl">
						<!-- <img src="../../../assets/user-d.jpg"> -->
						<img :src="URL + item.user_header">
						<span >{{item.nick_name}}</span>
					</div>
					<div class="pull-right fr">
						<img v-for = "n in parseInt(item.score)" :key = 'n' :src="imgYes">
						<img v-for = 'n in 5-parseInt(item.score)' :key ="n + 'i'" :src="imgNo">
					</div>
				</div>
				<div class="list-purTimer">{{item.create_time}}</div>
				<div class="list-com">{{item.content}}</div>
				<div class="list-img-main clearfix" v-for="items in item.path" :key="items.id">
					<img :class="{ 'active': tempImgValue == items && isChoose  }"  @click="imgScc(items)" :src="URL + items.path" class="fl" >
				</div>
			</div>
		</div>
		<div class="fenge"></div>
                    <div class="ans_display">
                      <div class="for_ans" @click="goToQue">
                      <span class="ans_title">商品咨询({{countTotal}})</span>
                      <span class="ans_number"> 查看更多 </span>
                      <span class="btn-right"></span>
                      </div>
                      <li v-for ="item in product.slice(0,2)" :key="item.id" class="product_li">
                      <div class="use_area_head">
                        <!-- <em>用户g***8的提问：</em> -->
                        <!-- <span class="fr g_ask_time">{{formatTime(item.create_time)}}</span> -->
                      </div>
                      <p class="pro text1-hidden"><span class="g_icon">问</span> {{item.content}}</p>
                        <p class="text1-hidden" v-if="item.answer"><span class="g_icon">答</span>{{item.answer}}</p>
                      <div class="yigong" v-if="item.answer === null">暂无回复</div>
                      <div class="yigong" v-else>已回复</div>
                      <p class="text1-hidden color_grey" v-else><span class="g_icon">答</span> 暂无回答</p>
                      <!-- <div class="g_look_more" v-if="item.answer" @click="lookMore(item.id)">查看全部1个回答</div> -->
                      </li>
                    </div>
		<div class="fenge"></div>
		
		
		<shop-infor :shopData="shopData" :data="$store.state.commodity_data.goods"></shop-infor>
		<!-- keshuchuanmeimobile -->
		<!-- <div class="ji_detail">
            <div class="content">
                <div class="contop">
                    <h3>
                        <span>{{goodsInfo.integral}}</span>积分
                    </h3>
                    <p>￥{{goodsInfo.money}}</p>
                </div>
                <p class="titlegood">{{goodsInfo.title}}</p>
            </div>
            <div class="delivery">
                <div class="deliverytop">
                    <div class="divtext">
                        <span class="text">配送</span>
                        <p v-if="rec_address">{{show_addres ? rec_address.prov+rec_address.city+rec_address.dist+rec_address.address : rec_address.prov_name+rec_address.city_name+rec_address.dist_name+rec_address.address}}</p>
                        <p v-else>您还没有填写收货地址，请填写！</p>
                    </div>

                    <span class="ioc"></span>
                </div>
            </div>
        </div> -->
		
		<!-- </PullUpReload>	 -->
		</div>
		 <div id="tab2" >
           
                <detailspage v-if="goods_id" :original_goods_id="goods_id"></detailspage>
            
        </div>
		<!-- <div class="prompt" @click="toTab">点击查看更多商品信息</div> -->
		<div id="tab3" >
           
                <attributespage></attributespage>
            
        </div>
		<div id="tab4" >
            <!-- 搭配套餐推荐 -->
           
            <pr-list
              v-show="$store.state.matchGood"
              :conItem="conItemRe"
              :storeId="shopData.id"
              :val="1"
              :data="$store.state.matchGood"
              :SpecGodid="specific_id"
            ></pr-list>
            <!-- 猜你喜欢 -->
            <pr-list
              v-if="$store.state.dataLeave&&$store.state.dataLeave.length != 0 "
              :conItem="conItem"
              :val="2"
              :data="$store.state.dataLeave"
            ></pr-list>
        </div>

		<div @focus="handleFocus1" tabindex="0">
          <detail-option
              @recommend="matchGood($store.state.commodity_data.goods.id)"
              v-if="guige"
              :data="$store.state.commodity_data"
              :productData="goodsInfo"
              @sendValue="sendValue"
          ></detail-option> 
      	</div>
		  <mt-popup v-model="popupVisible1" position="bottom" class="mint-popup-4">
          <div class="picker-toolbar">
          <span class="mint-datetime-action mint-datetime-cancel" style="color:#ff8000;" @click="cancleaddress">取消</span>  
                <span class="mint-datetime-action mint-datetime-confirm" style="color:#ff8000;" @click="selectaddress">确定</span>  
          </div>
          <div class="select">
          <ul class="address-area-tit">
            <li
            v-model="prov"
              :class="showProvince?'active':''" 
                        @click="selectedArea('province')">
                        {{ province }}</li>
            <li
            v-model="Bcity"
            v-if="choiceCity"
              :class="showCity?'active':''"
                        @click="selectedArea('city')">
                        {{ city }}</li>
            <li
              v-model="district"
              v-if="choiceArea"
              :class="showArea?'active':''">
                      {{ area }}</li>
          </ul>
          <ul class="address-city" v-if="showProvince">
            <li
            v-for="(n, i) in addressPlace"
            @click="getProvince(n.id, n.name, i)"
              :class="i==provinceIndex?'selected-li':''"
                      :key="i">
                      {{ n.name }}</li>
          </ul>
          <ul class="address-city" v-if="showCity">
            <li
            v-for="(n, i) in cityArr"
            @click="getCity(n.id, n.name, i)"
            :class="i==cityIndex?'selected-li':''"
                      :key="i">
                  {{ n.name }}</li>
          </ul>
          <ul class="address-city" v-if="showArea">
            <li
            v-for="(n, i) in districtArr"
            @click="setCityEnd(n.id, n.name, i)"
            :class="i==areaIndex?'selected-li':''"
            :key="i"
            >{{ n.name }}</li>
          </ul>
          </div>
        </mt-popup>
		<Shopsn></Shopsn>
		<foot-btn :state="sonState" :Number="$store.state.commodity_val" :data="$store.state.commodity_data.goods" @reduce="reduce" @plus="plus" :money='this.$route.params.money' :myIntegralData="myIntegralData"></foot-btn>
		<div class="load-wrap" v-show="load_wrap" @touchmove.prevent>
			<mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner>
		</div>
		<transition  name="fade">
			<div class="coupon_box" v-if="sta">
			<div class="box_main">
			<div class="box_header">
			<p class="box_text">领券</p>
			<span class="box_cross" @click="showCoupon">×</span>
			</div>
		
				<div class="box_box">
					<div class="cou_title">领券</div>
					<div class="box_body" v-for="(item,index) in couponList" :key="index.id" @click="couponReceive(index)">
						<div class="body_left">
							<span class="left_money">￥{{parseInt(item.money)}}</span>
							<span class="left_name">{{item.name}}</span>

							<p class="condition">满{{parseInt(item.condition)}}元可以使用</p>

							<p class="left_time">有效期 {{new Date(item.use_start_time * 1000).getFullYear()+'.'+(new Date(Number(item.use_start_time * 1000)).getMonth()+1)+'.'+new Date(Number(item.use_start_time * 1000)).getDate()}} - {{new Date(item.use_end_time * 1000).getFullYear()+'.'+(new Date(Number(item.use_end_time * 1000)).getMonth()+1)+'.'+new Date(Number(item.use_end_time * 1000)).getDate()}}</p>
							<span class="body_circle"></span>
							<span class="body_circle1"></span>
						</div>
						<div class="body_right" v-if="item.status == 0">立即领取</div>
						<div class="body_right" v-else-if="item.status == 1">已领取</div>
					</div>
				</div>
			</div>
			</div>
		</transition>
	</div>
</template>
<script>
	import PrHeader from '@/components/page/children/shop_header.vue'; // 头部
	import DropDownRefresh from "@/components/IntegralMall/children/DropDownRefresn"; // 上拉刷新组件
	import DropDownRefresh1 from "@/components/IntegralMall/children/DropDownRefresn1";
	import PullUpReload from "@/components/IntegralMall/children/PullUpReload"; //下拉组件
	import prList from '@/components/page/children/list.vue'; //猜你喜欢和搭配套餐
	import FootBtn from '@/components/IntegralMall/children/footBtn.vue'; // 底部按钮
	import PageOption from '@/components/page/children/pageOption.vue';
	import shopInfor from '@/components/IntegralMall/children/shopInfor.vue'; // 店铺信息
	import detailOption from '@/components/page/children/detailOptions.vue'; // 立即购买 || 加入购物车 弹框
	import Shopsn from '@/components/page/Shopsn.vue';
	import detailspage from "@/components/page/children/detailspage";
	import attributespage from "@/components/page/children/attributespage";
	import qs from 'qs';
	import { Popup } from 'mint-ui';
	import { Toast } from 'mint-ui';	

	function onScroll(event){
		var scrollPos = $(document).scrollTop();
		$('#menu-center a').each(function () {
			var currLink = $(this);
			var refElement = $(currLink.attr("href"));
			if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
				$('#menu-center div a').removeClass("active");
				$('#menu-center div a').parent().removeClass("active");
				
				currLink.addClass("active");
				currLink.parent().addClass("active");
			}
			else{
				currLink.removeClass("active");
				currLink.parent().removeClass("active");
			}
		});
	}
	$(document).ready(function () {
		$(document).on("scroll", onScroll);
		
		$('a[href^="#"]').on('click', function (e) {
			e.preventDefault();
			$(document).off("scroll");
			
			$('a').each(function () {
				$(this).removeClass('active');
				$(this).parent().removeClass('active');
			})
			$(this).addClass('active');
			$(this).parent().addClass('active');
		
			var target = this.hash;
			//     menu = target;
			// $target = $(this.hash);
			$('html, body').stop().animate({
				'scrollTop': $(this.hash).offset().top+2
			}, 500, 'swing', function () {
				window.location.hash = target;
				$(document).on("scroll", onScroll);
			});
		});
	});
	export default {
		name: 'integralDetail',
		data() {
			return {
				//是否显示状态条
				showIndicators: true,
				//初始轮播切换索引
				defaultIndex: 0,
				//轮播是否循环播放
				continuous: true,
				number: 1,
				conItem: {
					title: '猜你喜欢'
				},
				conItemRe: {
					title: '搭配套餐推荐'
				},
				imgNo:require('@/assets/images/xinxin.png'),
                imgYes:require('@/assets/images/xu_xinxin.png'),
				product:'',
				scrollWatch: true,
				topStatus: '',
				loadTop: {},
				sonState: false,
				data: '',
				title: '积分商品详情',
				dataLeave: '',
				load_wrap: true,
				link_id: this.$route.params.id,
				guige: false,
				shopData: '',
				popupVisible: false,
				nowday: 0,
				endday: '',
				end: '',
				brand: '',
				countTotal:0,
				goods_id:'',
				start_time:'',
				finish: false,
				images: [],
				cut_time: "",
				popupVisible1:false,
				addressPlace:'',
				
				prov:'',
				cityArr:'',
				district:'',
				districtArr:'',
				Township:'',
				TownshipArr:'',
				addressAll1:'',
				popupVisible:false,
				popup:false,
      			popupV:false,
				addressAllData: '',
				addressPlaceName: '',
				cityArrName: '',
				areaArrName: '',
				isArea: false,  // 选择窗口显示隐藏
				choiceProvince: false, // 省按钮的显示隐藏
				choiceCity: false, // 市按钮的显示隐藏
				choiceArea: false, // 区按钮的显示隐藏
				choiceStreet:false,
				province: '请选择',    // 选中的省
				city: '请选择', // 选中的市
				area: '请选择', // 选中的区
				street:'请选择',//选中的街道
				showProvince: true, // 省选择的显示隐藏
				showCity: false, // 市选择的显示隐藏
				showArea: false, // 区选择的显示隐藏
				showStreet:false,//街道的显示隐藏
				provinceId: '', // 选中的省id
				cityId: '', // 选中的市id
				areaId: '', // 选中的区id
				streetId:'',
				provinceIndex: -1, // 选中态索引
				cityIndex: -1,
				areaIndex: -1,
				streetIndex:-1,
				getProvinceID: '',
				rec_address:'',
				deliveryMoney: '',
				deliveryCal: '',
				freightCal: '',
				merchantDelivery:'',
      			expressDelivery:'',
				defApi_address:'',
				defStatus_address:'',
				defApi_prov:'',
				defApi_city:'',
				defApi_dist:'',
                DFID:'',
				page: 1,
				// callStatus: '',
				allCount: 0,
				dataItem:'',
				headBackgroundColor: {
					//头部背景色
					backgroundColor: "rgba(255,255,255,0)"
				},
				currentTab: 0,
				tabFlg: true,
				tabFlg1: false,
				tabFlg2: false,
				pullUpState: true,
				btnOpacity: {
					//分享按钮于返回按钮的btn
					opacity: 1,
					display: ""
				},
				btnOpacity1: {
					opacity: 0.1,
					display: "none"
				},
				tabOpacity: {
					//tab隐藏于显示
					opacity: 0
				},
				staheader:false,
				nospec: '',
                headParams: {
                    title: sessionStorage.getItem('titleKey'),
                    description: sessionStorage.getItem('updateDescription'),
                    keywords: sessionStorage.getItem('contentKey'),        
                },
				goodsInfo: "", //积分商品信息
				rec_address: "", //默认地址
				myIntegralData: 0, //当前我的积分
				detail: '',
				detArr: [],
				detailId: null,
				detialSubId: null,
				option: '',
				optArr: [],
				opt:false,
				detailAllData: '',
				specification: '',
				specification_id: '',
				productData: '',
				specific: '',
				specId: '',
				IId: '',
				specific_id: '',
				lengthSpeci: 0,
				callFreStatus:'',
      			callFreMess:'',
				countDownInterval:null,
				currentImgSlideIndex:0,
				video:'',
				couponList:[],
				sta:false
            }
        },
        head: {
            meta: function(){
                return [
                    { name: 'title', content: this.headParams.title, id: 'desc' },
                    { name: 'description', content: this.headParams.description, id: 'desc1' },
                    { name: 'keywords', content: this.headParams.keywords, id: 'desc2' },
                ]
            }
        },
		created() {
		    let title = "商品详情" + '-' + sessionStorage.getItem('titleKey') + '-' + sessionStorage.getItem('updateDescription');
            this.showScroll.scrollTitle(title);
			// this.getIntegralInfo().then(()=>{
			// 	this.proAjax(0, 0); 
			// 	this.CArrName();
			// 	this.AArrName();
			// 	this.getAddress();
			// 	this.getMyIntegralInfo();
			// 	this.defaultSpec();
			// });
			 	this.proAjax(0, 0); 
				// this.CArrName();
				// this.AArrName();
				this.getAddress();
				this.getMyIntegralInfo();
			
			this.$store.state.const_join = false;
			this.$store.state.matchGood = "";
			
		},
		beforeRouteLeave(to, from , next){
	
			if(this.countDownInterval){
				clearInterval(this.countDownInterval)
				this.countDownInterval=null;
			}
			next()
		},
		props:{
			btn:null,
			set:null,
		},
		methods: {
		defaultSpec() {
			
			
			this.axios.post(
				this.$httpConfig.goodSpecsByGoodsChildren,
				qs.stringify({
					id: this.goods_id,
					token: sessionStorage.getItem("data_token")
				})
			)
			.then(res => {
				if (res.data.status == 1) {
					this.specification = res.data.data;
					this.option = res.data.data.spec.spec_children[0].item;
					this.IId = res.data.data.spec.spec_children[0].id;
					this.lengthSpeci = Object.keys(res.data.data.spec.spec_group).length;

					this.option = ''
					this.optArr = []
					for (let i in res.data.data.spec.spec_group) {
						let jj = res.data.data.spec.spec_group[i].id
						for(let j = 0; j < res.data.data.spec.spec_children.length; j++) {
							if(jj == res.data.data.spec.spec_children[j].spec_id) {
								this.option += res.data.data.spec.spec_children[j].item
								this.option += ", "
								this.optArr.push(res.data.data.spec.spec_children[j].item)
								break;
							}
						}
					}
		

					let tempdata = this.specification.spec.spec_children
					this.tempequal = tempdata.every((val, i, arr) => val.spec_id == arr[0].spec_id)

					for (let i in this.specification.goods) {
						
						this.specId = res.data.data.goods[i].key.split("_"); 
						
						if(this.IId == this.specId || this.tempequal == false) { 
							this.specific_id = res.data.data.goods[i].goods_id;
							this.goodsInfo = res.data.data.goods[i]

							this.axios.post(this.$httpConfig.integralGoodInfo, qs.stringify({
									id: this.$route.params.id,
									token: sessionStorage.getItem("data_token")
								})).then((res) => {
									if(res.data.status == 10001) {
										this.$router.push('/LogIn');
									} else {
									
										let goods = res.data.data.goods;
								
									
										this.$store.state.commodity_data = res.data.data;
										this.goods_id = goods.goods_id;
										this.images = res.data.data.images;
										this.video = res.data.data.video;
										this.load_wrap = false;

										this.nowday = new Date().getTime();
										
										let date =  (goods.delayed) * 1000 ;
										
										let createTime = (goods.create_time) * 1000;

										this.CouponSendList();
										// this.start_time = date + createTime - this.nowday;

										// this.start_time = 10000;
										// this.cut_time = this.cutDown(this.start_time);
										// let obj = this;
										// this.countDownInterval = setInterval(function() {
										// 	this.start_time -= 1000;
										// 	if (this.start_time < 0) {
										// 		clearInterval(this.countDownInterval);
										// 		this.countDownInterval = null;
										// 	}
										// 	obj.cut_time = obj.cutDown(obj.start_time);
											
										// }, 1000);

										

										// if (this.start_time > 0) {
										// 	this.end = '活动尚未开始';
										// }

									}
								}).catch((err) => {
									console.log(err);
								});
							this.axios.post(
								this.$httpConfig.matchGood,
								qs.stringify({
									goods_id: this.specific_id,
									token: sessionStorage.getItem("data_token")
								})
							)
							.then(res => {
								this.$store.state.matchGood = res.data.data;
							})
							.catch(err => {
								console.log(err);
							});
						}
					}
				}
			})
			.catch(err => {
				console.log(err);
			})
		},
		CouponSendList() {
			this.axios({
				url: this.$httpConfig.CouponSendList,
				method: "get",
				params: {
				// store_id: 2,
				store_id: this.$store.state.commodity_data.goods.store_id,
				token: sessionStorage.getItem("data_token")
				}
			})
				.then(res => {
				this.couponList = res.data.data.records;
				})
				.catch(err => {
				console.log(err);
				});
		},
		 productAjax(){
			this.axios({
				url:this.$httpConfig.goodsProblems,
				method:'get',
				params:{
					goods_id:this.$route.params.id,
					p:1,
					token: sessionStorage.getItem("data_token")
				}
			}).then((res) => {
				if(res.data.status == 1){
					this.product = res.data.data.records;
					this.countTotal= res.data.data.countTotal;
				}
			}).catch((err) => {
				console.log(err);
			});
		},
		theSon() {
			this.guige = true;
			this.$store.state.const_join = true;
			this.opt = !this.opt;

			this.axios.post(this.$httpConfig.integralGoodInfo, qs.stringify({
				id: this.$route.params.id,
				token: sessionStorage.getItem("data_token")
			})).then((res) => {
				if(res.data.status == 10001) {
					this.$router.push('/LogIn');
				} else {
					
					
					let goods = res.data.data.goods;
					this.goodsInfo = goods;
					this.$store.state.commodity_data = res.data.data;
					this.goods_id = goods.goods_id;
					this.images = res.data.data.images;
					this.video = res.data.data.video;
					this.load_wrap = false;

					// this.nowday = new Date().getTime();
					
					// let date =  (goods.delayed) * 1000 ;
					
					// let createTime = (goods.create_time) * 1000;

					// this.start_time = date + createTime - this.nowday;

					// this.cut_time = this.cutDown(this.start_time);
					// let obj = this;
					
					// let id = setInterval(function() {
					// 	obj.start_time -= 1000;
						
					// 	obj.cut_time = obj.cutDown(obj.start_time);
						
					// }, 1000);

					// if (this.start_time < 0) {
					// 	clearInterval(id);
					// }

					// if (this.start_time > 0) {
					// 	this.end = '活动尚未开始';
					// }

				}
			}).catch((err) => {
				console.log(err);
			});
			},
			sendValue(detail, id, subid, optArr){
				if(detail == null) {
					this.option = ''
					this.detail = ''
					this.detailId = ''
					this.detialSubId = ''
					this.detailAllData = ''
					if(subid !== null) {
						this.nospec = subid
					}
				} else if(id == null) {
					this.detail = detail
					this.detArr = optArr
				} else {
					this.detail = detail.item
					this.detailId = id
					this.detialSubId = subid
					this.detailAllData = detail
					this.detArr = []
					this.detArr.push(this.detail)
				
					this.optionSpec2();
				}
			},
			comContent(){
					this.axios({
					url:this.$httpConfig.getAllCommentContent,
					method:'get',
					params:{
						goods_id:this.$route.params.id,
						type: 0,
						status:4,
						page:1,
						token: sessionStorage.getItem("data_token")
					}
				}).then((res) => {
					if(res.data.status==1){
						this.dataItem= res.data.data.list;
						this.allCount = res.data.data.allCount;
					}
					
				}).catch((err) => {
					console.log(err);
				});
			},
			goToComment(){
				this.$router.push({
					name: "commentPage",
					params: {
					id: this.$route.params.id,
					p_id: this.p_id
					}
				});
			},
			 goToQue(){
				this.$router.push({
					name: "quesanswer",
					params: {
					id: this.$route.params.id,
					p: this.p_id  
					}
				});;
			},
			optionSpec2() {
			
				this.axios
						.post(
								this.$httpConfig.goodSpecsByGoodsChildren,
								qs.stringify({
								id: this.goods_id,
								token: sessionStorage.getItem("data_token")
								})
						)
						.then(res => {
						if (res.data.status == 1) {
							this.specification = res.data.data;
							this.lengthSpeci = Object.keys(res.data.data.spec.spec_group).length;
							this.option = this.detailAllData.item
							this.IId = this.detailAllData.id
							for (let i in this.specification.goods) {
							this.specId = res.data.data.goods[i].key.split("_");
							if(this.IId == this.specId) {
								this.specific_id = res.data.data.goods[i].goods_id;
								this.goodsInfo = res.data.data.goods[i];
								
								this.axios.post(this.$httpConfig.integralGoodInfo, qs.stringify({
									id: res.data.data.goods[i].key,
									token: sessionStorage.getItem("data_token")
								})).then((res) => {
									if(res.data.status == 10001) {
										this.$router.push('/LogIn');
									} else {
									
										let goods = res.data.data.goods;
										this.goodsInfo = goods;
										this.$store.state.commodity_data = res.data.data;
										this.goods_id = goods.goods_id;
										this.images = res.data.data.images;
										this.video = res.data.data.video;
										this.load_wrap = false;

										// this.nowday = new Date().getTime();
										
										// let date =  (goods.delayed) * 1000 ;
										
										// let createTime = (goods.create_time) * 1000;

										// this.start_time = date + createTime - this.nowday;

										// this.cut_time = this.cutDown(this.start_time);
										// let obj = this;
										
										// let id = setInterval(function() {
										// 	obj.start_time -= 1000;
											
										// 	obj.cut_time = obj.cutDown(obj.start_time);
											
										// }, 1000);

										// if (this.start_time < 0) {
										// 	clearInterval(id);
										// }

										// if (this.start_time > 0) {
										// 	this.end = '活动尚未开始';
										// }

									}
								}).catch((err) => {
									console.log(err);
								});
							}
							}
						}
						})
						.catch(err => {
						console.log(err);
						});
			},
			getMyIntegralInfo() {
				this.axios
					.post(this.$httpConfig.userIntegral, qs.stringify({
						token: sessionStorage.getItem("data_token")
					}))
					.then(res => {
						if (res.data.status == 10001) {
							this.$router.push("/LogIn");
						} else if (res.data.status == 0) {
							return;
						} else {
							this.myIntegralData = res.data.data.current_integral;
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			// getIntegralInfo() {
			// 	return new Promise((resolve,reject)=>{
			// 		this.axios
			// 		.post(this.$httpConfig.integralGoodInfo,qs.stringify({
			// 			id: this.$route.params.id,
			// 		}))
			// 		.then(res => {
					
			// 			if (res.data.status == 10001) {
			// 				this.$router.push("/LogIn");
			// 			} else if (res.data.status == 0) {
			// 				return;
			// 			} else {
			// 				let goods = res.data.data.goods;
			// 				this.goods_id = goods.goods_id;
			// 				alert(this.goods_id)
			// 				resolve()
			// 			}
			// 		})
			// 		.catch(err => {
			// 			reject();
			// 			console.log(err);
			// 		});
			// 	})
			// },
			goLastPage() {
				this.$router.go(-1);
			},
			addClass1() {
				if(this.staheader == false) {
					this.staheader = true;
				} else {
					this.staheader = false;
				}
			},
			onRefresh() {
			//上拉事件
			this.currentTab = 0;
			this.tabFlg = true;
			this.tabFlg1 = false;
			this.tabFlg2 = false;
			this.slide(0);
			},
			onRefresh1() {
			//上拉事件
			this.currentTab = 0;
			this.tabFlg = true;
			this.slide(0);
			},
			onInfiniteLoad(done) {
			//下拉事件
			this.currentTab = 1;
			this.tabFlg1 = true;
			this.btnOpacity1.display = "";
			this.btnOpacity.display = "none";
			this.btnOpacity1.opacity = 1;
			this.headBackgroundColor.backgroundColor = "rgb(255,255,255)";
			this.tabOpacity.opacity = 1;
			this.slide(1);
			},
			slide(type) {
				var that = this;
				if (type) {
					var loadMoudle = document.getElementById("loadMoudle");
					this.distance =
						loadMoudle.clientHeight || loadMoudle.offsetHeight; //获取商品信息总高度 也就是下拉获取图文详情需要滑动的距离
					// var time = setInterval(function () {
					//     if (document.body.scrollTop + 20 > that.distance) { //防止滑动距离超出
					//         document.body.scrollTop = that.distance
					//         that.tabFlg = false; // 滑动结束后隐藏商品信息
					//     } else {
					//         document.body.scrollTop = document.body.scrollTop + 20;
					//     }
					//     if (document.body.scrollTop >= that.distance) {
					//         clearInterval(time);
					//         $('html,body').animate({scrollTop: 0}, 0);
					//
					//     }
					// }, 10);
					$("html,body").animate(
						{scrollTop: this.distance},
						0,
						function () {
							that.tabFlg = false; // 滑动结束后隐藏商品信息
							document.body.scrollTop = 0;
						}
					);
				} 
				else if(type){
					window.scrollTo(0, this.distance);
					var that = this;

					$("html,body").animate({scrollTop: 0}, 0, function () {
						that.tabFlg1 = false; // 滑动结束后隐藏商品信息
					});
				} 
				else {
					window.scrollTo(0, this.distance);
					var that = this;

					$("html,body").animate({scrollTop: 0}, 0, function () {
						that.tabFlg2 = false; // 滑动结束后隐藏商品信息
					});
				}
			},
			toLink(link) {
				this.$router.push({
					path: link
				});
			},
			handTab(index) {
				if (index != this.currentTab) {
					this.currentTab = index;
					if (index == 1) {
						this.tabFlg1 = true;
						this.tabFlg2 = false;
						this.tabFlg3 = false;
						this.btnOpacity1.display = "";
						this.btnOpacity.display = "none";
						this.btnOpacity1.opacity = 1;
						this.headBackgroundColor.backgroundColor =
							"rgb(255,255,255)";
						this.tabOpacity.opacity = 1;
						this.slide(1);
					}
					else if(index == 2){
						this.tabFlg2 = true;
						this.tabFlg1 = false;
						this.tabFlg3 = false;
						this.btnOpacity1.display = "";
						this.btnOpacity.display = "none";
						this.btnOpacity1.opacity = 1;
						this.headBackgroundColor.backgroundColor =
							"rgb(255,255,255)";
						this.tabOpacity.opacity = 1;
						this.slide(2);
					}
					else if(index=3){
						this.tabFlg = false;
						this.tabFlg1 = false;
						this.tabFlg2 = false;
						this.tabFlg3 = true;
						this.btnOpacity1.display = "";
						this.btnOpacity.display = "none";
						this.btnOpacity1.opacity = 1;
						this.headBackgroundColor.backgroundColor =
							"rgb(255,255,255)";
						this.tabOpacity.opacity = 1;
						this.slide(3);
					}else{
						this.tabFlg = true;
						this.tabFlg1 = false;
						this.tabFlg2 = false;
						this.tabFlg3 = false;
						this.slide(0);
					}
				}
			},
			callingArea(){
				this.popupVisible1 = true;
			},
			cancleaddress(){
			this.popupVisible1 = false;
			},
			selectaddress() {
				this.popupVisible1 = false;
				if(this.province==""||this.province=="请选择") {
				Toast('请选择地址');
				} else if(this.city==""||this.city=="请选择"){
				Toast('请选择地址');
				}else if(this.area==""||this.area=="请选择" ){
				Toast('请选择地址');
				}else{
				this.addressAll1 = this.province + '-' + this.city + '-' + this.area;
				this.choiceCity=false;// 市按钮的显示隐藏
				this.choiceArea=false; // 区按钮的显示隐藏
				this.choiceStreet=false;
				this.choiceProvince=true; // 省按钮的显示隐藏
				this.showStreet = false;
				this.showProvince=true;
				this.showCity = false; 
				this.showArea = false;
				this.province="请选择"
				}
			},
			proAjax(index, selId) {
				this.axios({
					method: 'get',
					url: this.$httpConfig.cityList,
					params: {
						parent_id: index,
						token: sessionStorage.getItem("data_token")
						// id: ''
					}
				})
				.then((res) => {
					let data = res.data.data;
					if(selId == 0) {
						this.addressPlace = data;
					} else if(selId == 1) {
						this.cityArr = data;
					} else if(selId == 2) {
						this.districtArr = data;
					} else if(selId == 3) {
						this.TownshipArr = data;
			}
			// this.addressPlaceName = this.addressPlace[6].name;
				}).catch((err) => {
					console.log(err);
				});
			},
			selectedArea(type) { // 按钮点击
				if (type == "province") {
					this.cityIndex = -1;
					this.areaIndex = -1;
					this.streetIndex=-1
					
					this.choiceCity = false;
					this.choiceArea = false;
					this.choiceStreet=false,
					
					this.showProvince = true;
					this.showCity = false;
					this.showArea = false;
					this.showStreet=false;
					
				} else if (type == "city") {
					this.cityIndex = -1;
					this.areaIndex = -1;
					this.streetIndex=-1
					this.choiceArea = false;
					this.choiceStreet=false;
					
					this.showProvince = false;
					this.showCity = true;
					this.showArea = false;
					this.showStreet=false;
				} 
			},
					
			getProvince (id, name, index) {
					this.getProvinceID = id;
					this.Bcity = '请选择'; // 选中的市
					this.area = '请选择';// 选中的区
					this.city = '请选择';
					this.choiceCity = true;
					this.province = name;
					this.provinceId = id;
					this.showProvince = false;
					this.showCity = true;
					this.showArea = false;
					this.showStreet=false;
					this.cityArr = this.proAjax(this.provinceId, 1);
					// this.getconfirmOrder();
					// this.getDeliveryCal();
			},
			getCity (id, name, index) { // 获取城市列表
					this.area = '请选择', // 选中的区
					this.choiceArea = true;
					this.city = name;
					this.cityId = id;
					this.showProvince = false;
					this.showCity = false;
					this.showArea = true;
					this.showStreet=false;
					this.districtArr = this.proAjax(this.cityId, 2);
				},
			setCityEnd(id, name, index) { // 区点完以后
					this.area = name;
					this.areaId = id;
					this.getDeliveryCal();
					// this.getFreightCal();
				},
			setStreetEnd(id, name, index) {
				this.street=name
			},
			getDeliveryCal(){
				this.axios.post(this.$httpConfig.deliveryCalcus,qs.stringify({
					store_id: this.$store.state.commodity_data.goods.store_id,
				// goods_id: this.getProvinceID,
				goods_id: this.$route.params.id,
				prov_id: this.getProvinceID,
				dist_id: this.cityId,
				city_id: this.areaId,
				token: sessionStorage.getItem("data_token")
				}),'post')
				.then((res) => {
					// this.callStatus = res.data.status;
					// this.merchantDelivery = res.data.data.transport;
				if(res.data.status == 1) {
				this.deliveryCal=res.data.data.money;
				this.merchantDelivery = res.data.data.transport;
				}
				if(res.data.status == 0) {
					this.getFreightCal();
					this.getExpressInfo();
				}
						}).catch((err) => {
							console.log(err);
						})
			},
			getFreightCal(){
						this.axios.post(this.$httpConfig.freightCalcus,qs.stringify({
							store_id: this.$store.state.commodity_data.goods.store_id,
				goods_id: this.$route.params.id,
				prov_id: this.getProvinceID,
				dist_id: this.cityId,
				city_id: this.areaId,
				token: sessionStorage.getItem("data_token")
				}),'post')
				.then((res) => {
				this.freightCal=res.data.data;
				this.callFreStatus = res.data.status;
          		this.callFreMess = res.data.message;
						}).catch((err) => {
							console.log(err);
						})
			},
			getExpressInfo(){
				this.axios.post(this.$httpConfig.getExpressInfo,qs.stringify({
					goods_id: this.$route.params.id,
					token: sessionStorage.getItem("data_token")
					}),'post')
					.then((res) => {
					this.expressDelivery = res.data.data;
				}).catch((err) => {
					this.expressDelivery = err.data.data;
					console.log(err);
				})
			},
			
			CArrName() {
				this.axios({
				method: 'get',
				url: this.$httpConfig.cityList,
				params: {
					parent_id: 31,
					token: sessionStorage.getItem("data_token")
				}
				})
			.then(res => {
				// this.cityArrName = res.data.data[4].name;
			});
			},
			AArrName() {
				this.axios({
					method: 'get',
					url: this.$httpConfig.cityList,
					params: {
					parent_id: 488,  
					token: sessionStorage.getItem("data_token")       
					}
				})
				.then(res => {
					// this.areaArrName = res.data.data[0].name;
					// this.addressAllData = this.addressPlaceName +'-'+ this.cityArrName +'-'+ this.areaArrName;
				});
      		},
			getAddress() {
                this.axios.post(this.$httpConfig.getDefault, qs.stringify({
					token: sessionStorage.getItem("data_token")
				})).then((res) => {
                        this.DFID = res.data.data;
                        this.defApi_prov = res.data.data.prov;
						this.defApi_city = res.data.data.city;
						this.defApi_dist = res.data.data.dist;
						this.defApi_address = this.defApi_prov +'-'+ this.defApi_city +'-'+ this.defApi_dist;
						this.defStatus_address = res.data.status;
                        if(this.defStatus_address == 1){
							this.axios.post(this.$httpConfig.deliveryCalcus,qs.stringify({
								store_id: 2,
								// goods_id: 31
								goods_id: this.$route.params.id,
								prov_id: this.DFID.prov_id,
                                dist_id: this.DFID.dist_id,
                                city_id: this.DFID.city_id,
								token: sessionStorage.getItem("data_token")
								}),'post')
								.then((res) => {
									// this.callStatus = res.data.status;
									// this.merchantDelivery = res.data.data.transport;
								if(res.data.status == 1) {
									// this.deliveryStartMoney=res.data.data.money;
									this.deliveryCal=res.data.data.money;
									this.merchantDelivery = res.data.data.transport;
								}
								if(res.data.status == 0) {
									this.axios.post(this.$httpConfig.freightCalcus,qs.stringify({
									store_id: 2,
									goods_id: this.$route.params.id,
									prov_id: this.DFID.prov_id,
									dist_id: this.DFID.dist_id,
									city_id: this.DFID.city_id,
									token: sessionStorage.getItem("data_token")
									}),'post')
									.then((res) => {
									// this.freightStartCal=res.data.data;
									this.freightCal=res.data.data;
									this.callFreStatus = res.data.status;
									this.callFreMess = res.data.message;
								}).catch((err) => {
									console.log(err);
								})
								this.getExpressInfo();
								}
										}).catch((err) => {
											console.log(err);
								})
                        }
                        else{
							this.axios.post(this.$httpConfig.deliveryCalcus,qs.stringify({
								store_id: 2,
								// goods_id: 31
								goods_id: this.$route.params.id,
								prov_id: 31,
								dist_id: 488,
								city_id: 5020,
								token: sessionStorage.getItem("data_token")
								}),'post')
								.then((res) => {
									// this.callStatus = res.data.status;
									// this.merchantDelivery = res.data.data.transport;
								if(res.data.status == 1) {
									// this.deliveryStartMoney=res.data.data.money;
									this.deliveryCal=res.data.data.money;
									this.merchantDelivery = res.data.data.transport;
								}
								if(res.data.status == 0) {
									this.axios.post(this.$httpConfig.freightCalcus,qs.stringify({
									store_id: 2,
									goods_id: this.$route.params.id,
									prov_id: 31,
									dist_id: 488,
									city_id: 5020,
									token: sessionStorage.getItem("data_token")
									}),'post')
									.then((res) => {
									// this.freightStartCal=res.data.data;
									this.freightCal=res.data.data;
									this.callFreStatus = res.data.status;
									this.callFreMess = res.data.message;
								}).catch((err) => {
									console.log(err);
								})
								this.getExpressInfo();
								}
										}).catch((err) => {
											console.log(err);
								})
                        }
                }).catch((err) => {
                    console.log(err);
                })
            },
			toShop(id){
				this.$router.push({
				name:"shopHome",
				params:{
					id:id,
					index:0
				}})
			},
			handleFocus1() {
      		},
			countDowns() {
				this.finish = true
			},
			toTab() {
				this.$router.push({
					name: 'integralTab',
					params: {
						id: this.goods_id
					}
				});
			},
			myLove() {
				this.axios
					.post(this.$httpConfig.guessLove, qs.stringify({ page: this.page, token: sessionStorage.getItem("data_token") }))
					.then(res => {
					this.$store.state.dataLeave = res.data.data;
				})
				.catch(err => {
					console.log(err);
				});
			},
			//属性
			spec() {},
			matchGood(id) {},
			shopInfo() {
				this.axios({
					url: this.$httpConfig.shopInfo,
					method: 'get',
					params: {
						id: this.$store.state.commodity_data.goods.store_id,
						token: sessionStorage.getItem("data_token")
					}
				}).then((res) => {
					this.shopData = res.data.data;
				}).catch((err) => {
					console.log(err);
				});
			},
			//商品详情
			ax() {},
			reduce() {
				if(this.number <= 1) return;
				this.number--;
			},
			plus() {
				if(this.number >= this.data.minStock)
					return;
				this.number++;
			},
			off() {
				this.popupVisible = false
			},
			countDownE_cb() {

			},
			countDownS_cb() {

			},

			//带天数的倒计时
			cutDown(times) {
				if(times<=0){
					return '开放购买中'
				}
				
				var day = 0,
					hour = 0,
					minute = 0,
					second = 0;//时间默认值
				if (times > 0) {
					day = parseInt(times / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
					hour = parseInt(times / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
					minute = parseInt(times / 1000 / 60 % 60, 10);//计算剩余的分钟
					second = parseInt(times / 1000 % 60, 10);//计算剩余的秒数
				} else {
					return  "00天: 00小时： 00分钟：00秒";
				}
				if (day <= 9) day = '0' + day;
				if (hour <= 9) hour = '0' + hour;
				if (minute <= 9) minute = '0' + minute;
				if (second <= 9) second = '0' + second;
				return day + "天:" + hour + "小时：" + minute + "分钟：" + second + "秒，以后购买";
		},
		imgSlideChange(index){
			this.currentImgSlideIndex = index;
		},
		showvideo(video){
          window.location.href= video
      },
	  showCoupon() {
        this.sta = !this.sta;
	
    },
	couponReceive(id) {
       
        let selectedId = this.couponList[id];
        if(selectedId.status==1){
          Toast({
              message: '领卷以领取',
              position: "middle",
              duration: 1000
            });
            return ;
        }
        this.axios({
          url: this.$httpConfig.couponReceiveBehavior,
          method: "get",
          params: {
            id: selectedId.id,
			token: sessionStorage.getItem("data_token")
          }
        })
                .then(res => {
                  if(res.data.status==1){
                    //领取领卷成功
                    selectedId.status = 1;
                    this.$set(this.couponList, id, selectedId);
                   
                  }
                  Toast({
                    message: res.data.message,
                    position: "middle",
                    duration: 1000
                  });
                })
                .catch(err => {
                  console.log(err);
                });
      },
	  checkToFixedBody(value){
		  if(value){
				document.body.style.position = "fixed";
			}else{
				document.body.style.position = "relative";
			}
	  }
	},
	mounted() {
		
		this.axios.post(this.$httpConfig.integralGoodInfo, qs.stringify({
			id: this.$route.params.id,
			token: sessionStorage.getItem("data_token")
		})).then((res) => {
			if(res.data.status == 10001) {
				this.$router.push('/LogIn');
			} else {
			
				let goods = res.data.data.goods;
				this.goodsInfo = goods;
				this.$store.state.commodity_data = res.data.data;
				this.goods_id = goods.goods_id;
				this.images = res.data.data.images;
				this.video = res.data.data.video;
				
				this.load_wrap = false;

				this.nowday = new Date().getTime();
				
				let date =  (goods.delayed) * 1000 ;
				
				let createTime = (goods.create_time) * 1000;

				this.start_time = date + createTime - this.nowday;
			
				this.cut_time = this.cutDown(this.start_time);
				let obj = this;
				this.countDownInterval = setInterval(function() {
					obj.start_time -= 1000;
					if (obj.start_time == 0) {
					
						clearInterval(obj.countDownInterval);
						obj.countDownInterval = null;
					}
					obj.cut_time = obj.cutDown(obj.start_time);
					
					
				
					
				}, 1000);

					
				

				// if (this.start_time > 0) {
				// 	this.end = '活动尚未开始';
				// }

			}
			this.shopInfo();
			this.defaultSpec();
			this.productAjax();
			this.comContent();
		}).catch((err) => {
			console.log(err);
		});

		$('html,body').animate({
			scrollTop: '0px'
		}, 500);
      var that = this;
      $(window).scroll(function () {
        if (!that.currentTab) {
          that.headBackgroundColor.backgroundColor =
            "rgba(255,255,255," + $(window).scrollTop() / 200 + ")";
          that.tabOpacity.opacity = $(window).scrollTop() / 400;
          if (that.btnOpacity.opacity < 0) {
            that.btnOpacity.display = "none";
            that.btnOpacity1.display = "";
            that.btnOpacity1.opacity = $(window).scrollTop() / 200;
            that.btnOpacity.opacity = 1 - $(window).scrollTop() / 100;
          } else {
            that.btnOpacity1.display = "none";
            that.btnOpacity.display = "";
            that.btnOpacity.opacity = 1 - $(window).scrollTop() / 100;
          }
          if ($(window).scrollTop() <= 0) {
            that.btnOpacity1.display = "none";
            that.btnOpacity.display = "";
          }
        }
      });
	   this.myLove();
	},
	watch:{
		sta(n,old){
			this.checkToFixedBody(n);
		},
		isGuigeOptionOpen(n,old){
			this.checkToFixedBody(n);
		},
	},
	destroyed() {
		this.scrollWatch = false;
	},
	computed:{
		isGuigeOptionOpen(){
			return this.$store.state.const_join; 
		}
	},
	components: {
		PrHeader,
		Shopsn,
		prList,
		FootBtn,
		shopInfor,
		PageOption,
		detailOption,
		detailspage,
		attributespage,
		DropDownRefresh,
		DropDownRefresh1,
		PullUpReload,
	}
}
</script>
<style lang="less" scoped>
	.product{
		scroll-behavior: smooth;
	}
	.mint-popup-4 {
		width: 100%;
		box-sizing: border-box;
		bottom: 0;
		position: fixed;
		top: 35%;
		overflow: scroll;
	}
  .header {
      position: fixed;
      width: 96%;
      top: 0;
      left: 0;
      height: 0.9rem;
      height: 0.65rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2%;
      z-index: 1;

      .return,
      .return1 {
          // background: url("../../assets/arrow1@2x.png");
          background-size: cover;
          width: 0.5rem;
          height: 0.5rem;
          position: absolute;
          left: .3rem;
          top: .2rem;
      }

      .return1 {
          // background: url("../../assets/fanhui.png");
          background: url("../../assets/arrow1@2x.png");
          background-size: cover;
          width: 0.5rem;
          height: 0.5rem;
      }

      .share,
      .share1 {
          background: url("../../assets/share1@2x.png");
          background-size: cover;
          width: 0.5rem;
          height: 0.5rem;
      }

      .share1 {
          background: url("../../assets/share3@2x.png");
          background-size: cover;
          width: 0.4rem;
          height: 0.4rem;
      }
	  .newTab{
		  font-size: .36rem;
	  }

      .tab {
          height: 0.5rem;
          display: flex;
          width: 3rem;
          border-radius: 0.1rem;
          opacity: 0;

          > div {
              width: 1rem;
              text-align: center;
              line-height: 0.5rem;
              box-sizing: border-box;
              background: #fff;
              border: 1px solid #b0b0b0;
          }
		   a {
                  line-height: 0.5rem;
				  font-size:0.2rem;
              }

          .active {
              background: #787878;
              color: #fff;
              border: none;
          }
		  #menu-center {
                  width: 980px;
                  height: 75px;
                  margin: 0 auto;
              }
              #menu-center div {
                  margin: 0 0 0 0;
              }
              #menu-center div a{
                  padding: 32px 40px;
              }
              #menu-center div {
                  list-style: none;
                  margin: 0 0 0 -4px;
                  display: inline;
              }

          > div:nth-child(1) {
              border-radius: 0.1rem 0 0 0.1rem;
          }

          > div:nth-child(2) {
              border-radius: 0 0 0 0;
              border-left: none;
          }
			> div:nth-child(3) {
              border-radius: 0 0 0 0;
              border-left: none;
          }
          > div:nth-child(4) {
              border-radius: 0 0.1rem 0.1rem 0;
              // border-left: none;
          }
      }
  }
	.sharebtn-ng {
		position: absolute;
		right: 12%;
		width: .53rem;
		height: .53rem;
	}
  .btn-ng {
      position: absolute;
      right: .2rem;
      width: .53rem;
      height: .53rem;
        span {
          display: block;
          border: .03rem solid #fff;
          border-radius: 50%;
          box-sizing: border-box;
          margin-left: .08rem;
          margin-top: .22rem;
        }
      }
    .headerimg{
      width: .5rem;
      position: absolute;
      height: .53rem;
      left: .2rem;
    }
      .fade-enter-active,
    .fade-leave-active {
      transition: opacity .5s;
    }
    
    .fade-enter,
    .fade-leave-to {
      opacity: 0
    }
    .box-wrap{
              position:fixed;
              width: 100%;
              height: 100%;
              left:0;
              top:0;
              z-index:99;
              .box-bg{
                  position:absolute;
                  left:0;
                  top:0;
                  width: 100%;
                  height: 100%;
                  z-index:1;
              }
              .bomb-box{
                  background:#535353;
                  padding:.11rem;
                  box-sizing: border-box;
                  position: absolute;
                  right:.15rem;
                  top:.8rem;
                  border-radius:5px;
                  z-index:99999;
                  color:#ffffff;
                  .polygon{
                      width: .4rem;
                      height: .4rem;
                      position:absolute;
                      top:0;
                      left:.8rem;
                      transform: rotate(45deg);
                      background:#535353;
                  }
                  .btn:nth-child(2){
                      border-bottom:1px solid #666;
                      .icon{
                          i{
                              width: .24rem;
                              height: .24rem;
                              background:url(../../assets/home.png) no-repeat;
                              background-size:100% 100%;
                          }
                      }
                  }
                  .btn:nth-child(3){
                      border-top:1px solid #444;
                      .icon{
                          i{
                              width: .24rem;
                              height: .24rem;
                              background:url(../../assets/news1.png) no-repeat;
                              background-size:100% 100%;
                          }
                      }
                  }
                  .btn:nth-child(4) {
                    border-top: 1px solid #444;
                    .icon {
                      i {
                        width: .24rem;
                        height: .24rem;
                        background: url(../../assets/sharebtn.png) no-repeat;
                        background-size: 100% 100%;
                      }
                    }
                  }
                  .btn:nth-child(5) {
                    border-top: 1px solid #444;
                    .icon {
                      i {
                        width: .24rem;
                        height: .24rem;
                        background: url(../../assets/cartHead.png) no-repeat;
                        background-size: 100% 100%;
                      }
                    }
                  }
                  .btn{
                      width: 1.1rem;
                      height: .56rem;
                      box-sizing: border-box;
                      text-align:center;
                      line-height: .56rem;
                      position:relative;
                      padding-left:.5rem;
                      font-size:.24rem;
                      .icon{
                          position:absolute;
                          left:0;
                          top:0;
                          width: .56rem;
                          height: 100%;
                          margin:0;
                          border:none;
                          background:none;
                          i{
                              position:absolute;
                              left:0%;
                              top:0%;
                              bottom:0;
                              right:0;
                              margin:auto;
                          }
                      }
                  }
              }
          }
    .delivery_method {
      padding: 0 0.5rem 0 0.2rem;
      min-height: 0.8rem;
      line-height: 0.8rem;
      font-size: 0.3rem;
      color: #777;
      position: relative;
      background: #fff;
      border-top: 1px solid #f1f1f1;
      .transport-delivery{
        font-size: 0.26rem;
        color: #777;
      }
      .transport-pass{
        font-size: 0.26rem;
        color: #333;
      }
      .transport-name{
        font-size: 0.26rem;
        cursor : pointer;
        color: #d02629;
      }
      .delivery_title {
        width: 2rem;
        font-size: .26rem;
        color: #777;
      }
      .delivery_busi {
        font-size: 0.28rem;
        color: #333;
        // float: right;
        // margin-right: .2rem;
        margin-left: .8rem;
        margin-top: -.82rem;
      }
	.delivery_pay{
		width: 2rem;
		font-size: .26rem;
	}
	.deliverydate {
		font-size: 0.26rem;
		color: #333;
		margin-left: 1.3rem;
		margin-top: -.82rem;
			.spanDate {
			font-size: .26rem;
			color: #d02629;
			}
		.presale{
			font-size: 0.26rem;
			color: #d02629;
			border: .01rem solid #d02629;
			padding: 0 .1rem;
			margin: .13rem 0 0 0;
			float: right;
			height: .5rem;
			line-height: .5rem;
		}
	}
      .delivery_right {
        position: absolute;
        right: 0.3rem;
        top: 20%;
        margin-top: -0.15rem;
        width: 0.16rem;
        height: 0.3rem;
        background: url(../../assets/btn-right.png) no-repeat;
        background-size: 100% 100%;
      }
      .delivery_input {
        background: #fff;
        font-size: 0.28rem;
        color: #333;
        margin-left: .8rem;
        border: none;
        margin-top: -.66rem;
		width:100%;
      }
    }
	.comment-display{
          .for_comment {
              padding: 0 0.5rem 0 0.2rem;
              min-height: 0.8rem;
              line-height: 0.8rem;
              font-size: 0.3rem;
              color: #777;
              position: relative;
              background: #fff;
              border-top: 1px solid #f1f1f1;
              .coupon_title {
                font-size: .26rem;
                color: #777;
              }
              .coupon_number {
                float:right;
                padding-right: .2rem; 
                font-size: .26rem;
              }
              .btn-right {
                position: absolute;
                right: 0.3rem;
                top: 50%;
                margin-top: -0.15rem;
                width: 0.16rem;
                height: 0.3rem;
                background: url(../../assets/btn-right.png) no-repeat;
                background-size: 100% 100%;
              }
          }
          .center{
              text-align: center;
              // height: 3rem;
              // line-height: 10rem;
              font-size: .26rem;
          }
          .list-com{
              height:1rem;
              font-size:.24rem;
              color:#333;
              display: -webkit-box;
              overflow: hidden;
              white-space: normal!important;
              text-overflow: ellipsis;
              word-wrap: break-word;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
          }
          .list-wrap{
            width:7.1rem;
            padding:0 .2rem;

            background:#fff;
            margin-bottom:.1rem;
            .list-hd{
                padding:.2rem 0;
                line-height:.32rem;
                height:.3rem;
                display: flex;
                .pull-left{
                    padding-left:.46rem;
                    font-size:.2rem;
                    color:#b0b0b0;
                    position:relative;
                    img{
                        width:.32rem;
                        height:.32rem;
                        position:absolute;
                        left:0;
                        top:0;
                    }
                }
                .pull-right{
                    color:#999;
                    font-size:.26rem;
                    padding: 0 0 0 .2rem;
                    img{
                        width: 30/100rem
                    }
                }
            }
            .list-purTimer{
                font-size:.21rem;
                color:#999;
                margin: -.5rem 0 .3rem 4.9rem;
            }
            .list-img-main{
                height:1rem;
                width: 18%;
                float: left;
                img{
                    width:1rem;
                    height:1rem;
                    margin-right:.2rem;
                    transform: scale(1);            /*图片原始大小1倍*/
                    transition: all ease 0.5s;      /*图片放大所用时间*/
                }
                img.active {
                    transform: scale(5);          /*图片需要放大3倍*/
                    position: absolute;           /*是相对于前面的容器定位的，此处要放大的图片，不能使用position：relative；以及float，否则会导致z-index无效*/
                    z-index: 100;
                    margin-left: 3rem;
                }
            }
          }
      }

	.mint-popup-bottom{
          width: 100%;
          // padding:.2rem;
          box-sizing: border-box;
          .select{
              padding:.2rem 0;
              select{
                  padding-left:10/100rem;
                  border: 1/100rem solid #d9d9d9;
                  width: 24%;
                  height: .5rem;
                  background:#fff;
                  outline: none;
                  option{
                      color:#333;
                      text-align: center;
                  }
              }
          }
      }
      .address-area-tit {
          padding: 0;
          box-shadow: none;
          border-bottom: 0;
          height:41px;
      }
      .address-area-tit li {
          cursor: pointer;
          position: relative;
          left: 0;
          top: 1px;
          padding: 0 .2rem;
          height:40px;
          width: 24%;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          text-align: center;
          font-size: 12px;
          display: inline-block;
          border-bottom: 1px solid #ccc;
      }
      .address-area-tit li.active {
          border-bottom: 1px solid #ff8000;
          color: #ff8000;
      }
      .address-city {
        margin-top: 10px;
          // height:4.5rem;
          // height:17.6rem;
          height:20rem;
          overflow: hidden;
          overflow-y: scroll;
          width: calc(100% + 30px);

      }
      .address-city li{
          padding: 0 35px;
          line-height: 30px;
          font-size: 12px;
          cursor: pointer;
      }
      .address-city li.selected-li {
          color: #ff8000;
      }
	.Promotions {
		display: flex;
		padding: 15/100rem 20/100rem;
		h4 {
			color: #A2A2A2;
			font-size: 32/100rem;
			margin-right: 20/100rem;
		}
		.promotionsDiv {
			display: flex;
			padding: 10/100rem;
			align-items: center;
			span {
				padding: 8/100rem;
				color: #E2252B;
				border: 1/100rem solid #E2252B;
				font-size: 24/100rem;
				// width: 100/100rem ;
				height: 25/100rem;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			p {
				margin-left: 20/100rem;
				font-size: 24/100rem;
				color: #656565;
			}
		}
	}
	.gray {
		color: #e02828;
	}
	.fenge {
		height: 20/100rem;
		background-color: #F1F1F1;
	}
	.fengee {
		height: .02rem;
		background-color: #F1F1F1;
	}
	
	.product {
		background: #fff;
	}
	.see-video{
      width: 100%;
      margin: -2rem 0 0 0;
      position: absolute;
      z-index: 20;
      text-align: center;
      padding: .2rem 0 .2rem 0;
      .playimg{
        width: 1rem;
        height: 1rem;
      }
    }
	
	.describe {
		padding: 0 .2rem .35rem .2rem;
		position: relative;
		// background-color: #F1F1F1;
		.fn {
			font-size: .28rem;
			color: #333;
			padding-top: .3rem;
			line-height: .5rem;
			// 下面样式为限制显示2行
			display: -webkit-box;
			overflow: hidden;
			white-space: normal!important;
			text-overflow: ellipsis;
			word-wrap: break-word;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.description-fn{
			color: #9b9b9b;
			padding-top:10px;
			font-size:.28rem;
		}
		.timer {
			font-size: .25rem;
			color: #e02828;
			padding: .3rem 0;
			.newPos {
				color: #F1302B;
			}
		}
		.price.active {
			.orc {
				line-height: .4rem;
				.icon {
					width: .4rem;
					height: .4rem;
					background: url(../../assets/integral.png) no-repeat;
					background-size: 100% 100%;
					margin-right: .2rem;
				}
			}
		}
		.price {
			padding-top: .2rem;
			.orc {
				color: #e02828;
				font-size: .32rem;
				em {
					font-style: normal;
					font-size: .48rem;
				}
			}
			.new {
				color: #757575;
				font-size: .25rem;
				padding-top: .2rem;
				s {
					font-size: .24rem;
				}
			}
		}
		.share {
			position: absolute;
			right: .2rem;
			top: .3rem;
			text-align: center;
			.icon {
				display: block;
				width: .39rem;
				height: .42rem;
				background: url(../../assets/share.png) no-repeat;
				background-size: 100% 100%;
			}
			p {
				font-size: .24rem;
				color: #555;
				line-height: .5rem;
			}
			ul {
				position: absolute;
				top: 45px;
				left: -225%;
				li {
					width: 0.4rem;
					height: 0.4rem;
					float: left;
					margin: 3px;
				}
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.speSelected {
      padding: 0 0.5rem 0 0.2rem;
      min-height: 0.8rem;
      line-height: 0.8rem;
      font-size: 0.3rem;
      color: #777;
      position: relative;
      background: #fff;
      border-top: 1px solid #f1f1f1;
      .title {
        font-size: .26rem;
        color: #777;
      }
      .select-spec {
          float:right; 
          padding-right: .2rem; 
          font-size: .26rem; 
          margin-top: -.8rem;
      }
      .number {
        font-size: 0.28rem;
        color: #333;
        padding-left: 0.55rem;
      }
      .btn-right {
        position: absolute;
        right: 0.3rem;
        top: 50%;
        margin-top: -0.15rem;
        width: 0.16rem;
        height: 0.3rem;
        background: url(../../assets/btn-right.png) no-repeat;
        background-size: 100% 100%;
      }
    }
	
	.selected {
		padding: 0 .5rem 0 .2rem;
		min-height: .8rem;
		line-height: .8rem;
		font-size: .3rem;
		color: #777;
		position: relative;
		background: #fff;
		border-top: 1px solid #f1f1f1;
		.number {
			font-size: .28rem;
			color: #333;
			padding-left: .55rem;
		}
		.btn-right {
			position: absolute;
			right: .3rem;
			top: 50%;
			margin-top: -.12rem;
			width: .14rem;
			height: .24rem;
			background: url(../../assets/btn-right.png) no-repeat;
			background-size: 100% 100%;
		}
	}
	
	.ji_detail{
        margin-top:0rem;
        .content {
            width: 100%;
            background: white;
            padding-bottom: 0.6rem;
            .contop {
                padding-top: 0.4rem;
                width: 95%;
                margin: auto;
                display: flex;
                flex-direction: row;
                line-height: 0.8rem;
                h3 {
                    color: rgb(255, 149, 54);
                    font-size: 0.55rem;
                    span {
                        color: rgb(255, 149, 54);
                        font-size: 0.55rem;
                    }
                }
                p {
                    padding-left: 0.5rem;
                    padding-top: 0.28rem;
                    text-decoration: line-through;
                    font-size: 0.33rem;
                    color: darkgray;
                }
			}
			.titlegood {
				margin-top: 0.1rem;
				// text-indent: 0.2rem;
				// width: 100%;
				font-size: 0.33rem;
				color: #3e3e3e;
				padding: 0 .2rem;
			}
		}
		.delivery {
			width: 100%;
			padding-bottom: 0.3rem;
			border-bottom: 0.01rem solid rgb(245, 245, 245);
			.deliverytop {
				display: flex;
				flex-direction: row;
				padding-top: 0.4rem;
				width: 95%;
				margin: auto;

				.divtext {
					width: 93%;
					display: flex;
					flex-direction: row;
					.text {
						font-size: 0.3rem;
						color: rgb(255, 149, 54);
					}
					p {
						margin-left: 0.2rem;
						font-size: 0.3rem;
						color: #2d2d2d;
					}
				}

				.ioc {
					justify-content: flex-end;
					width: 0.2rem;
					height: 0.35rem;
					background: url("../../assets/images/fanhuir.png") no-repeat;
					background-size: 100% 100%;
				}
			}
			.stime {
				margin-top: 0.1rem;
				width: 100%;
				font-size: 0.28rem;
				color: darkgrey;
				text-indent: 1.05rem;
			}
		}
	}
	.ans_display{
        .for_ans {
          padding: 0 0.5rem 0 0.2rem;
          min-height: 0.8rem;
          line-height: 0.8rem;
          font-size: 0.3rem;
          color: #777;
          position: relative;
          background: #fff;
          border-top: 1px solid #f1f1f1;
          .ans_title {
            font-size: .26rem;
            color: #777;
          }
          .ans_number {
            float:right;
            padding-right: .2rem; 
            font-size: .26rem;
          }
          .btn-right {
            position: absolute;
            right: 0.3rem;
            top: 50%;
            margin-top: -0.15rem;
            width: 0.16rem;
            height: 0.3rem;
          background: url(../../assets/btn-right.png) no-repeat;
            background-size: 100% 100%;
          }
        }
        .product_li{
            background-color: #fff;
            padding:10/100rem 20/100rem;
            margin-bottom: .2rem;
            margin-top: -0.8rem;
            .use_area_head{
                margin-bottom: .18rem;
                height: .7rem;
                line-height: .7rem;
                color: #666;
                font-size: .24rem;
                em{
                    font-style: normal;
                }
                .g_ask_time{
                    color:#666;
                    font-size:.24rem;
                }
            }
            .pro{
                font-weight: 700;
                margin-bottom:.05rem;
                span{
                    background-color: #CA9B27;
                    
                }
            }
            .color_grey{
                color: #999;
            }
            p{
                color: #333;
                font-size: .32rem;
                margin-bottom:.1rem;
                font-size: 32/100rem;
                line-height: 65/100rem;
            }
            .g_icon{
                font-size: 28/100rem;
                padding: 6/100rem;
                border-radius: 5/100rem;
                color:#fff;
                background-color: #97CD93;
            }
            .yigong{
                width: 2rem;
                float: right;
                margin-top: -0.55rem;
                margin-right: -0.7rem;
            }
            .g_look_more{
                font-size:.24rem;
                color:#3985ff;
                text-align:right;
            }
            .g_look_more::after {
                content: "";
                display: block;
                width: 8px;
                height: 8px;
                border-top: 1px solid #3985ff;
                border-left: 1px solid #3985ff;
                -webkit-transform-origin: 50%;
                transform-origin: 50%;
                -webkit-transform: rotate(135deg);
                transform: rotate(135deg);
                margin: -2px 0 0 5px;
                display: inline-block;
                vertical-align: middle;
            }
        }
      }
	
	.mint-swipe {
		height: 6.22rem;
		padding-top: .95rem;
		.mint-swipe-items-wrap {
			div {
				width: 100%;
				height: 6.22rem;
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	
	.prompt {
		width: 100%;
		height: .9rem;
		background: #f1f1f1;
		line-height: .9rem;
		text-align: center;
		font-size: .26rem;
		color: #999;
	}
	
	#popup {
		width: 7rem;
		padding: 0.5rem 0.5rem 0.2rem;
		background: rgba(0, 0, 0, 0.5);
		ul {
			overflow: hidden;
			border-bottom: 1px solid #dfe3e4;
			background: #fff;
			border-radius: 0.6rem;
			padding: 0.2rem;
			li {
				float: left;
				margin: 0.1rem;
				width: 0.8rem;
				text-align: center;
			}
			img {
				width: 0.8rem;
				height: 0.8rem;
			}
		}
		button {
			display: block;
			width: 100%;
			text-align: center;
			margin-top: 0.2rem;
			background: #fff;
			line-height: 0.8rem;
			border-radius: 0.6rem;
			border: none;
		}
	}
	.slide-count-indicator{
        position:absolute;
        z-index: 10;
        bottom:25px;
        background:rgba(0, 0, 0, 0.2);
        color:white;
        right:0;
        padding:5px 10px;
        border-radius: 50px 0px 0px 50px;
      }
	  .for-discount {
        margin: .15rem .2rem;
        // height: .42rem;
        padding-top: .06rem;
        /*margin: .2rem;*/
        /*border-bottom: .01rem solid #F1F1F1;*/
        padding-bottom: 0.13rem;
        .man {
          width: 46px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          background: #d02629;
          color: #fff;
          display: inline-block;
          margin-left: 10px;
        }
        .discount_text {
          font-size: .26rem;
          color: #777;
          /*padding-top: .1rem;*/
          /*vertical-align: middle;*/
        }
        .coupon_img {
          background: url(../../assets/coupon.png) no-repeat;
          background-size: 100% 100%;
          // width: 2.2rem;
          // height: .44rem;
          font-size: .21rem;
          color: #ffffff;
          text-align: center;
          padding: .08rem .3rem;
          line-height: 1.91;
          margin-left: .2rem;
        }
        .btn-right {
          position: absolute;
          right: 0.3rem;
          /*top: 79%;*/
          margin-top: 0.07rem;
          width: 0.16rem;
          height: 0.3rem;
          background: url(../../assets/btn-right.png) no-repeat;
          background-size: 100% 100%;
        }
        img {
          width: 2rem;
          height:0.5rem;
          padding-left: .2rem;
        }
        .for-security {
          margin: .2rem;
          button {
            background: #FAE9E6;
            color: #DC4703;
            border: none;
            width: 1.3rem;
            height: 0.4rem;
            font-size: .26rem;
            margin: 0.07rem 0 0 .6rem;
            border-radius: .05rem;
          }
          img {
            width: 2.7rem;
            // height: 1rem;
            height:0.6rem;
            margin: 0 0 0 .7rem;
          }
          span{
            font-size: .3rem;
            margin: 0 0 0 2.3rem;
          }
          .btn-right {
            width: 0.22rem;
            height: 0.32rem;
            margin: .15rem 0 0 0;
            background: url(../../assets/btn-right.png) no-repeat;
            background-size: 100% 100%;
          }
        }
        .promotion-all{
          // padding-top: .1rem;
          .promotion-card{
            display: flex;
            .promotion-title{
              font-size: .2rem;
              color: #e4393c;
              border: .01rem solid #e4393c;
              padding: .03rem .04rem .04rem .04rem;
              margin: .2rem .2rem .1rem .8rem;
            }
            .promotion-img{
              width: .5rem;
              height: .5rem;
              margin: .1rem 0 0 0;
              padding: 0;
            }
            .promotion-num{
              color: #d02629;
              margin: .25rem 0 0 .1rem;
            }
            .promotion-detail{
              font-size: .24rem;
              margin: .2rem 0 0 .1rem;
              color: #444;
              
            }
          }
        }
      }
	  .coupon_box {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh; 
        background: rgba(0, 0, 0, 0.5);
		overflow: auto;
        z-index: 1000000;
        .box_main {
			  overflow: scroll;
          position: absolute;
          top:3rem;
          left: 0;
          bottom: 0;
          width: 100%;
          background: #fff;
          border-top-left-radius: .3rem;
          border-top-right-radius: .3rem;
          .box_header {
            padding: .4rem .3rem;
            text-align: center;
            border-bottom: 1px solid #f1f1f1;
            .box_text  {
              font-size: .34rem;
              color: #333;
            }
            .box_cross {
              position: absolute;
              right: 3%;
              top: 0.38rem;
              width: 0.4rem;
              line-height: 0.34rem;
              height: 0.4rem;
              border: 1px solid #bfbfbf;
              text-align: center;
              font-size: 0.4rem;
              color: #bfbfbf;
              border-radius: 100%;
            }
          }
          .promotion-all{
            // padding-top: .1rem;
            .pro_title{
              color: #262626;
              font-weight: 700;
              font-size: .23rem;
              margin: .2rem 0 0 .3rem;
            }
            .promotion-card{
              display: flex;
              .promotion-title{
                font-size: .2rem;
                color: #e4393c;
                border: .01rem solid #e4393c;
                padding: .03rem .04rem;
                margin: .3rem .2rem .1rem .3rem;
                height: .32rem;
              }
              .promotion-detail{
                font-size: .24rem;
                margin-top: .3rem;
                color: #444;
              }
            }
            .showpormotion{
                margin: 0 .2rem 0 .3rem;
                display: flex;
              .showpormotion-img{
                width: 1rem;
                height: 1rem;
                margin: .2rem 0 0 0;
              }
              .showpormotion-all{
                padding: .2rem 0 .2rem .2rem;
                .showpormotion-title{
                  font-size: .21rem;
                  line-height: .3rem;
                }
                .showpormotion-num{
                  // color: #d02629;
                  // font-size: .21rem;
                  // margin: .1rem 0 0 0;
                  display: inline-flex;
                }
              }
            }
          }
          .box_box {
            padding: 0 0 .3rem 0;
            height: 8.85rem;
            overflow-y: scroll;
            position: relative;
            .cou_title{
              color: #262626;
              font-weight: 700;
              font-size: .23rem;
              margin: .2rem 0 0 .3rem;
            }
            .box_body {
              padding: .3rem;
              margin-bottom: 1.5rem;
              color: #dc7676;
              .body_left {
                background: url(../../assets/background1.png) no-repeat;
                background-size: 100% 100%;
                width: 4.57rem;
                height: 1.8rem;
                left: 3%;
                position: absolute;
                border-right: 2px dotted #dc7676;
              }
              .left_money {
                font-size: .42rem;
                margin: .2rem;
                line-height: 1.1rem;
              }
              .left_name {
                font-size: .3rem;
              }
              .condition{
                padding-left: .3rem;
                line-height: 0.55rem;
                margin-top: -0.3rem;
              }
              .left_time {
                font-size: .26rem;
                margin-left: .26rem;
              }
              .body_circle {
                background: url(../../assets/circle.png) no-repeat;
                background-size: 100% 100%;
                position: absolute;
                width: .3rem;
                height: .3rem;
                top: -7%;
                left: 96.2%;
                z-index: 1;
              }
              .body_circle1 {
                background: url(../../assets/circle.png) no-repeat;
                background-size: 100% 100%;
                position: absolute;
                width: .3rem;
                height: .3rem;
                top: 91%;
                right: -2.7%;
                z-index: 1;
              }
              .body_right {
                background: url(../../assets/background2.png) no-repeat;
                background-size: 100% 100%;
                width: 2.5rem;
                height: 1.8rem;
                right: 3%;
                position: absolute;
                font-size: .3rem;
                color: #dc7676;
                text-align: center;
                line-height: 1.8rem;
              }
            }
          }
        }
      }

</style>