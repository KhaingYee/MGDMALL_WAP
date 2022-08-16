<template>
    <div class="auction-list">
        <!-- <header-co :text="title"></header-co> -->
        <div class="header" :v-if="tabOpacity == 0 && tabOpacity != 1">
			<div :style="tabOpacity == 0 && tabOpacity != 1" class="newTab">商品详情</div>
		</div>
		<div class="header" :style="headBackgroundColor">
		<div :style="tabOpacity" class="tab">
			<div @click="handTab(0)" :class="{active:currentTab == 0}">商品</div>
			<div @click="handTab(1)" :class="{active:currentTab == 1}">详情</div>
			<div @click="handTab(2)" :class="{active:currentTab == 2}">属性</div>
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
        :parent-pull-up-state="pullUpState"> -->
            <mt-swipe :auto="4000" @change="imgSlideChange">
                <span class="slide-count-indicator">{{(datas.length>0?currentImgSlideIndex+1:0)+' / '+datas.length}}</span>  
                <mt-swipe-item v-for="(item, index) in datas" :key="item.id">
                    <img :src="URL + item" />
                </mt-swipe-item>
            </mt-swipe>
            <div class="see-video" v-if="video">
                <img src="../../assets/videoplay.png" class="playimg" @click="showvideo(video)" v-if="video"/>
            </div>
            <div class="introduce">
                <p class="l big" v-if="detail">{{$store.state.commodity_data.goods.title}}</p>
                <p class="l big" v-else>{{productData.title}}</p>
                <!--<p class="l share">
                    <span class="pic"><img src="../../assets/images/Share.png"/></span>
                    <span class="font">分享</span>
                </p>-->
                <p class="chase l"> 抢购剩余时间：
                    <span>{{day}}</span>天<span>{{hour}}</span>小时<span>{{Minute}}</span>分钟<span>{{second}}</span>秒
                </p>
                <p class="money l" v-if="detail"><span>￥</span>{{$store.state.commodity_data.goods.panic_price}}</p>
                <p class="money l" v-else><span>￥</span>{{productData.panic_price}}</p>
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

            <div class="fenge"></div>
            <div class="for-discount" @click="showCoupon" >
                <span class="discount_text">优惠</span>
                <span
                    class="coupon_img"
                    v-for="(item,index) in couponList.slice(0,2)"
                        :key="index.id">
                        满{{parseInt(item.condition)}}减{{parseInt(item.money)}}元
                </span>
                <span class="btn-right"></span>
            
                <div class="promotion-all">
                    <div class="promotion-card" v-if="gift && Array.isArray(gift) == false"
                        v-for="(giftItem, ind) in gift.goods" :key="ind"
                    >
                        <div class="promotion-title" v-if="gift.name">{{gift.name}}</div>
                        <img :src="URL + giftItem.pic_url" class="promotion-img">
                        <div class="promotion-num" v-if="giftItem.give_num != 0 && giftItem.give_num != null">x{{giftItem.give_num}}</div>
                        <div class="promotion-detail">购满￥{{ giftItem.full }}送赠品，数量{{giftItem.give_count}}赠完即止</div>
                    </div>
                    <div class="promotion-card"  v-if="reduction">
                        <div class="promotion-title" v-if="reduction.promotion_name">{{reduction.promotion_name}}</div>
                        <div class="promotion-detail">单笔订单满￥{{ reduction.expense }}，立减￥{{reduction.cut}}</div>
                    </div>
                </div>
            </div>

            <div class="delivery_method">
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
            <div class="fenge"></div>

            <div class="comment-display">
                <div class="for_comment" @click="goToComment">
                    <span class="coupon_title">商品评论&nbsp;({{allCount}})</span>
                    <span class="coupon_number"> 查看更多</span>
                    <span class="btn-right"></span>
                </div>
                <div v-if="dataItem == null" class="center"></div>
                <div v-else class="list-wrap" v-for="item in dataItem.slice(0,2)" :key="item.id + 'i'">
                    <div class="list-hd clearfix">
                        <div class="pull-left fl">
                            <img :src="URL + item.user_header">
                            <span >{{item.nick_name}}</span>
                        </div>
                        <div class="pull-right fr">
                            <img v-for = 'n in parseInt(item.score)' :key = 'n' :src="imgYes">
                            <img v-for = 'n in 5-parseInt(item.score)' :key ="n + 'i'" :src="imgNo">
                        </div>
                    </div>
                    <div class="list-purTimer">{{Number(item.create_time)|formatDate}}</div>
                    <div class="list-com">{{item.content}}</div>
                    <div class="list-img-main clearfix" v-for="items in item.path" :key="items.id">
                        <img :class="{ 'active': tempImgValue == items && isChoose  }"  @click="imgScc(items)" :src="URL + items.path" class="fl" >
                    </div>
                </div>
            </div>
            <div class="fenge"></div>
            <div class="ans_display">
                <div class="for_ans" @click="goToQue">
                <span class="ans_title">商口咨询({{countTotal}})</span>
                <span class="ans_number"> 查看更多 </span>
                <span class="btn-right"></span>
                </div>
                <li v-for ="item in product.slice(0,2)" :key="item.id" class="product_li">
                <div class="use_area_head">
                </div>
                <p class="pro text1-hidden"><span class="g_icon">问</span> {{item.content}}</p>
                <p class="text1-hidden" v-if="item.answer"><span class="g_icon">答</span>{{item.answer}}</p>
                <div class="yigong" v-if="item.answer === null">暂无回复</div>
                <div class="yigong" v-else>已回复</div>
                <p class="text1-hidden color_grey" v-else><span class="g_icon">答</span> 暂无回答</p>
                </li>
            </div>
            <div class="fenge"></div>

            <transition  name="fade">
                <div class="coupon_box" v-if="sta">
                    <div class="box_main">
                        <div class="box_header">
                            <p class="box_text">领券</p>
                            <span class="box_cross" @click="showCoupon">×</span>
                        </div>
                        <div class="promotion-all">
                            <div class="pro_title" v-if="gift && Array.isArray(gift) == false">促销</div>
                            <div v-for="(item,index) in gift.goods" :key="index" v-if="gift.length != 0">
                                <div class="promotion-card">
                                    <div class="promotion-title" >{{gift.name}}</div>
                                    <div class="promotion-detail">
                                        <img :src="URL + item.pic_url" style= "width: 0.42rem" v-if="item.pic_url !=null" @click="entryGoods(item.id)"> 
                                        <div class="promotion-num" style="display:inline-flex" v-if="item.give_num != 0 && item.give_num != null">x{{item.give_num}}</div>
                                        购满￥{{ item.full }}送赠品，数量{{item.give_count}}赠完即止
                                    </div>
                                </div>
                                <div style="margin: 0rem .2rem .1rem .3rem;">
                                    <span v-if="item.goods_name">{{item.goods_name}}</span>
                                </div>
                            </div>
                            <div class="promotion-card" v-if="reduction">
                                <div class="promotion-title">{{reduction.promotion_name}}</div>
                                <div class="promotion-detail">单笔订单满￥{{ reduction.expense }}，立减￥{{reduction.cut}}</div>
                            </div>
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
                
            <!-- 店铺 -->
            <shop-infor :shopData="shopData"></shop-infor>
            <!--<div class="choose">-->
            <!--<div class="promote">-->
            <!--<p class="top">-->
            <!--<span class="l text">促销</span>-->
            <!--<span class="l"><img src="../../assets/manzeng.png"/></span>-->
            <!--<span class="l">购买￥200.00，赠精美包装礼盒</span>-->
            <!--</p>-->
            <!--<p class="bottom">-->
            <!--<span class="l"><img src="../../assets/manjain.png"/></span>-->
            <!--<span class="l">单笔订单满￥88.00.立减￥20.00</span>-->
            <!--</p>-->
            <!--</div>-->
            <!--&lt;!&ndash;<div class="already">&ndash;&gt;-->
            <!--&lt;!&ndash;<p><span class="one">已选</span><span class="two">颜色：白玉，数量1</span><span&ndash;&gt;-->
            <!--&lt;!&ndash;class="r el-icon-arrow-right three"></span></p>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--</div>-->
            <pr-list
                    v-if="$store.state.dataLeave.length != 0 || $store.state.dataLeave.length"
                    :conItem="conItem"
                    :val="2"
                    :data="$store.state.dataLeave"
            ></pr-list>

        <!-- </PullUpReload>	 -->
		<!-- <DropDownRefresh v-show="tabFlg1" :on-refresh="onRefresh">
		
		</DropDownRefresh> -->
        <detailspage></detailspage>
		
		<attributespage></attributespage>

        <!--<div class="navs">-->
            <!--<ul>-->
                <!--<li v-for="(one,index) in data" class="l" :class="{active:isactive==index}" @click="pull(index)"-->
                    <!--:key="index">{{one}}-->
                <!--</li>-->
            <!--</ul>-->
        <!--</div>-->
        <!--<div class="contain" v-show="name">-->

        <!--</div>-->
        <div @focus="handleFocus1" tabindex="0">
          <detail-option
              v-if="guige"
              :data="$store.state.commodity_data"
              :productData="productData"
              @sendValue="sendValue"
          ></detail-option> 
      	</div>

        <mt-tabbar class="boxing" fixed>
            <!--<div class="collect" @click="collect">-->
                <!--<img :src="imgsNo" alt v-if="type==2" />-->
                <!--<img v-else :src="imgsYes" alt />-->
            <!--</div>-->
            <div class="collect">
                <img :src="service" alt />
            </div>
            <div class="collect">
                <img :src="Buycar" alt />
            </div>
            <div class="collect" @click="collect">
                <img v-if="type==2" :src="imgsYes" alt />
                <img :src="imgsNo" alt v-else />
            </div>
            <p @click="panic" class="buy button">立即抢购</p>
            <p @click="buyCart" class="cart button">加入购物车</p>
        </mt-tabbar>
    </div>
</template>

<script>
    import headerCo from '@/components/page/children/shop_header.vue'; //头部内容
    import prList from "@/components/page/children/list.vue"; //猜你喜欢和搭配套餐
    import shopInfor from "@/components/page/children/shopInfor.vue"; // 店铺信息
    import detailOption from '@/components/auction/child/detailOptions.vue';
    import DropDownRefresh from "@/components/auction/child/DropDownRefresn"; // 上拉刷新组件
	import DropDownRefresh1 from "@/components/auction/child/DropDownRefresn1";
	import PullUpReload from "@/components/auction/child/PullUpReload"; //下拉组件
	import detailspage from "@/components/auction/child/detailspage";
	import attributespage from "@/components/auction/child/attributespage";
    import {Indicator, Toast} from 'mint-ui';
    import qs from 'qs';
    import QS from 'qs';
    import imgage from "@/assets/bgyj.jpg"
    import brand from "@/assets/loop.png"

    export default {
        data() {

            return {
                service: require("@/assets/images/service_er.png"),
                Buycar: require("@/assets/images/storeHomefb.png"),
                imgsNo: require("@/assets/images/sc.png"),
                imgsYes: require("@/assets/images/star_angle.png"),
                title: '商品详情',
                datas: [],
                gift: [],
                reduction: [],
                hello: [
                    {img: brand, text: "和玉缘 和田玉白玉路路通转运珠吊坠...", price: "￥188.00"},
                    {img: brand, text: "和玉缘 和田玉白玉路路通转运珠吊坠...", price: "￥10.99"},
                    {img: brand, text: "和玉缘 和田玉白玉路路通转运珠吊坠...", price: "￥10.99"},
                ],
                data: ["图文详情", "规格参数", "商品评论", "商品咨询"],
                name: true,
                isactive: "",
                // imgsNo: require("@/assets/images/footer_star.png"),
                // imgsYes: require("@/assets/images/star_angle.png"),
                sort: "收藏",
                day: '',
                hour: '',
                Minute: '',
                second: '',
                conItem: {
                    title: "猜你喜欢"
                },
                shopData: "",
                page: 1,
                dataLeave: '',
                type:'',
                currentTimeStamp:'',
                deliveryCal: '',
				freightCal: '',
				merchantDelivery:'',
      			expressDelivery:'',
                defStatus_address:'',
                DFID:'',
                callFreStatus:'',
                callFreMess:'',
				// callStatus: '',
                nospec: '',
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
                guige: false,
                 headParams: {
                    title: sessionStorage.getItem('titleKey'),
                    description: sessionStorage.getItem('updateDescription'),
                    keywords: sessionStorage.getItem('contentKey'),        
                },
                storeId: '',
                popupV:false,
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
                video: '',
                currentImgSlideIndex: 0,
                couponList: [],
                sta:false,
                allCount: 0,
                dataItem:'',
                imgNo:require('@/assets/images/xinxin.png'),
                imgYes:require('@/assets/images/xu_xinxin.png'),
                tempImgValue: '',
                isChoose:false,
                countTotal:0,
                product: '',
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
        mounted() {
            var now = new Date();
            this.currentTimeStamp = now.getTime();
            this.getDetail();
            this.myLove();
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
            this.productAjax();
        },
        created() {
            let title = "商品详情" + '-' + sessionStorage.getItem('titleKey') + '-' + sessionStorage.getItem('updateDescription');
            this.showScroll.scrollTitle(title);
            this.AArrName();
            this.getAddress();
            this.defaultSpec();
			this.$store.state.const_join = false;
			this.$store.state.matchGood = "";
            this.$store.state.id = "";
        },
        props:{
			btn:null,
			set:null,
		},
        methods: {
            productAjax(){
                this.axios({
                    url:this.$httpConfig.goodsProblems,
                    method:'get',
                    params:{
                        goods_id:this.$route.params.goods_id,
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
            goToQue(){
                this.$router.push({
                    name: "quesanswer",
                    params: {
                        id: this.$route.params.goods_id,
                        p_id: 0
                    }
                });;
            },
            imgScc(value){
                this.tempImgValue = value
                this.isChoose = !this.isChoose
            },
            comContent(){
                    this.axios({
                    url:this.$httpConfig.getAllCommentContent,
                    method:'get',
                    params:{
                        goods_id:this.$route.params.goods_id,
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
                // alert(this.$route.params.goods_id)
                // alert(this.$store.state.commodity_data.goods.p_id)
                this.$router.push({
                    name: "commentPage",
                    params: {
                        id: this.$route.params.goods_id,
                        p_id: 0
                    }
                });
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
            showCoupon() {
                this.sta = !this.sta;
            },
            CouponSendList() {
                this.axios({
                    url: this.$httpConfig.CouponSendList,
                    method: "get",
                    params: {
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
            imgSlideChange(index){
                this.currentImgSlideIndex = index;
            },
            showvideo(video){
                window.location.href= video
            },
        defaultSpec() {
			this.axios.post(
				this.$httpConfig.goodSpecsByGoodsChildren,
				qs.stringify({
					id: this.$route.params.goods_id,
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
							this.axios.post(this.$httpConfig.panicGoodsDetail, qs.stringify({
                                goods_id: this.$route.params.goods_id,
                                token: sessionStorage.getItem("data_token")
                                })).then((res) => {
                                    if (res.data.status == 1) {
                                        this.video = res.data.data.video;
                                        this.$store.state.id = res.data.data.goods.id;
                                        this.gift = res.data.data.promotion.gift;
                                        this.reduction = res.data.data.promotion.reduction;
                                        this.productData = res.data.data.goods;
                                        // this.promotion = res.data.data.promotion;
                                        this.$store.state.commodity_data = res.data.data;
                                        this.datas = res.data.data.images;
                                        this.computationTime(res.data.data.goods.end_time);
                                        this.shopInfo(res.data.data.goods.store_id)
                                        this.storeId = res.data.data.goods.store_id;
                                        this.CouponSendList();
                                    }
                                })
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
        getPackageSub(){
        this.axios.post(
                this.$httpConfig.matchGood,
                qs.stringify({
                    goods_id: this.$store.state.commodity_data.goods.goods_id,
                    token: sessionStorage.getItem("data_token")
                })
            )
            .then(res => {
                this.$store.state.matchGood = res.data.data;
            })
            .catch(err => {
                console.log(err);
            });
        },
		theSon() {
			this.guige = true;
			this.$store.state.const_join = true;
			this.opt = !this.opt;

            this.axios.post(this.$httpConfig.panicGoodsDetail, qs.stringify({
                goods_id: this.$route.params.goods_id,
                token: sessionStorage.getItem("data_token")
                })).then((res) => {
                    if (res.data.status == 1) {
                        this.video = res.data.data.video;
                        this.$store.state.id = res.data.data.goods.id;
                        this.gift = res.data.data.promotion.gift;
                        this.reduction = res.data.data.promotion.reduction;
                        this.productData = res.data.data.goods;
                        // this.promotion = res.data.data.promotion;
                        this.$store.state.commodity_data = res.data.data;
                        this.datas = res.data.data.images;
                        this.computationTime(res.data.data.goods.end_time);
                        this.shopInfo(res.data.data.goods.store_id)
                        this.storeId = res.data.data.goods.store_id;
                    }
                })
			},
            handleFocus1() {
      		},
            sendValue(detail, id, subid, optArr){
                this.getPackageSub();
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
            optionSpec2() {

				this.axios
						.post(
								this.$httpConfig.goodSpecsByGoodsChildren,
								qs.stringify({
								id: this.$route.params.goods_id,
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
								
                                this.axios.post(this.$httpConfig.panicGoodsDetail, qs.stringify({
                                    goods_id: this.$route.params.goods_id,
                                    token: sessionStorage.getItem("data_token")
                                })).then((res) => {
                                    if (res.data.status == 1) {
                                        this.video = res.data.data.video;
                                         this.$store.state.id = res.data.data.goods.id;
                                        this.gift = res.data.data.promotion.gift;
                                        this.reduction = res.data.data.promotion.reduction;
                                        this.productData = res.data.data.goods;
                                        // this.promotion = res.data.data.promotion;
                                        this.$store.state.commodity_data = res.data.data;
                                        this.datas = res.data.data.images;
                                        this.computationTime(res.data.data.goods.end_time);
                                        this.shopInfo(res.data.data.goods.store_id)
                                        this.storeId = res.data.data.goods.store_id;
                                    }
                                })
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
						});
			},
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
						this.btnOpacity1.display = "";
						this.btnOpacity.display = "none";
						this.btnOpacity1.opacity = 1;
						this.headBackgroundColor.backgroundColor =
							"rgb(255,255,255)";
						this.tabOpacity.opacity = 1;
						this.slide(2);
					}
					else {
						this.tabFlg = true;
						this.tabFlg1 = false;
						this.tabFlg2 = false;
						this.slide(0);
					}
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
            buyCart() {
				this.axios.post(this.$httpConfig.panicAddCart,qs.stringify({
					goods_id: this.$store.state.commodity_data.goods.goods_id,
                    panic_id: this.$store.state.commodity_data.goods.panic_id,
					goods_num: this.$store.state.commodity_val,
                    price_new: this.$store.state.commodity_data.goods.panic_price,
                    store_id: this.storeId,
                    token: sessionStorage.getItem("data_token")
                }),'post')
                .then((res) => {
                if (res.data.status == 1) {
                  Toast({
                    message: res.data.message,
                    duration: 3000
                  });
                }
                else {
                  Toast({
                    message: res.data.message,
                    duration: 3000
                  });
                }
                }).catch((err) => {
                    console.log(err);
                })
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
					this.areaArrName = res.data.data[0].name;
					this.addressAllData = this.addressPlaceName +'-'+ this.cityArrName +'-'+ this.areaArrName;
				});
      		},
            getAddress() {
                this.axios.post(this.$httpConfig.getDefault, qs.stringify({
                    token: sessionStorage.getItem("data_token")
                })).then((res) => {
                        this.DFID = res.data.data;
                        this.defStatus_address = res.data.status;
                        if(this.defStatus_address == 1){
                            this.axios.post(this.$httpConfig.deliveryCalcus,qs.stringify({
                                store_id: 2,
                                // goods_id: 31
                                goods_id: this.$route.params.goods_id,
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
                                    goods_id: this.$route.params.goods_id,
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
                                goods_id: this.$route.params.goods_id,
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
                                    goods_id: this.$route.params.goods_id,
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
            getExpressInfo(){
				this.axios.post(this.$httpConfig.getExpressInfo,qs.stringify({
					goods_id: this.$route.params.goods_id,
                    token: sessionStorage.getItem("data_token")
					}),'post')
					.then((res) => {
					this.expressDelivery = res.data.data;
				}).catch((err) => {
					this.expressDelivery = err.data.data;
					console.log(err);
				})
			},
            getDetail() {
                this.axios.post(this.$httpConfig.panicGoodsDetail, qs.stringify({
                    goods_id: this.$route.params.goods_id,
                    token: sessionStorage.getItem("data_token")
                })).then((res) => {
                    if (res.data.status == 1) {
                        this.video = res.data.data.video;
                         this.$store.state.id = res.data.data.goods.id;
                        this.gift = res.data.data.promotion.gift;
                        this.reduction = res.data.data.promotion.reduction;
                        this.productData = res.data.data.goods;
                        // this.promotion = res.data.data.promotion;
                        this.$store.state.commodity_data = res.data.data;
                        this.datas = res.data.data.images;
                        this.computationTime(res.data.data.goods.end_time);
                        this.shopInfo(res.data.data.goods.store_id)
                        this.storeId = res.data.data.goods.store_id;
                    }
                })
            },
            toTab() {
                this.$router.push({
                    name: "tab",
                    params: {
                        id: this.$route.params.goods_id,
                        p_id: this.$store.state.commodity_data.goods.p_id
                    }
                });
            },
            shopInfo(store_id) {
                this.axios({
                    url: this.$httpConfig.shopInfo,
                    method: "get",
                    params: {
                        id: store_id,
                        token: sessionStorage.getItem("data_token")
                    }
                })
                    .then(res => {
                        this.shopData = res.data.data;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            //计算倒计时或已开抢时间
            computationTime(timestamp) {
                let self = this;
                this.timer = setInterval(function() {
                    let t = null;
                    var now = new Date();
                    var now_Time = now.getTime();
                    t = timestamp*1000 - now_Time;
                    let day = Math.floor(t / 86400000);
                    let hour = Math.floor(t / 3600000)%24;
                    let min = Math.floor((t / 60000) % 60);
                    let sec = Math.floor((t / 1000) % 60);
                    day = day < 10 ? "0" + day : day;
                    hour = hour < 10 ? "0" + hour : hour;
                    min = min < 10 ? "0" + min : min;
                    sec = sec < 10 ? "0" + sec : sec;
                    self.day = `${day}`;
                    self.hour = `${hour}`;
                    self.Minute = `${min}`;
                    self.second = `${sec}`;
                }, 1000);
            },
            myLove() {
                this.axios
                    .post(this.$httpConfig.guessLove, qs.stringify({page: this.page, token: sessionStorage.getItem("data_token")}))
                    .then(res => {
                        this.$store.state.dataLeave = res.data.data;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            pull(index) {
                this.isactive = index
            },
            panic(){
             let goods_id = "";
                if (this.$store.state.id) {
                    goods_id = this.$store.state.id;
                } else if(this.productData.id) {
                    goods_id = this.productData.id;
                }
                if(goods_id) {
                    this.$router.push({
                        name: "confirmPanic",
                        params: {
                            good_id: goods_id,
                            num: this.$store.state.commodity_val,
                            sub_id: "commonGood",
                            id: 2,
                            auction: "auctionList"
                        }
                    });
                }
            },
            collect() {
                //收藏
                if (this.type == 2) {
                    this.imgs = this.imgsYes;
                    this.type = 1;
                } else {
                    this.imgs = this.imgsNo;
                    this.type = 2;
                }
                this.axios
                    .post(
                        this.$httpConfig.addCollection,
                        qs.stringify({
                            goods_id: this.$route.params.goods_id,
                            type: this.type,
                            token: sessionStorage.getItem("data_token")
                        })
                    )
                    .then(res => {
                        if (res.data.status == 10001) {
                            this.$router.push("/LogIn");
                        } else {
                            Toast({
                                message: res.data.message,
                                position: "bottom",
                                duration: 800
                            });
                        }
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
        watch:{
            sta(n,old){
                this.checkToFixedBody(n);
            },
            isGuigeOptionOpen(n,old){
                this.checkToFixedBody(n);
            },
        },
        computed:{
            isGuigeOptionOpen(){
                return this.$store.state.const_join; 
            }
        },
        components: {
            headerCo,
            prList,
            shopInfor,
            detailOption,
            DropDownRefresh,
            DropDownRefresh1,
            PullUpReload,
            detailspage,
            attributespage
        }
    }
</script>

<style lang="less" scoped>
    .coupon_box {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10000;
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
	  .newTab{
		  font-size: .36rem;
	  }
      .tab {
          height: 0.5rem;
          display: flex;
          width: 2rem;
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

          .active {
              background: #787878;
              color: #fff;
              border: none;
          }

          > div:nth-child(1) {
              border-radius: 0.1rem 0 0 0.1rem;
          }

          > div:nth-child(2) {
              border-radius: 0 0 0 0;
              border-left: none;
          }

          > div:nth-child(3) {
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
    .collect {
        width: 33.3%;
        background: #fafafa;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #e6e6e6;
        box-sizing: border-box;
        img {
          width: 50/100rem;
          height: 50/100rem;
          margin-bottom: 5/100rem;
        }
        span {
          display: block;
        }
        em {
          width: 0.5rem;
          height: 0.5rem;
          position: absolute;
          top: 0.1rem;
          left: 50%;
          margin-left: -0.25rem;
          font-style: normal;
          color: #d21923;
          font-size: 0.5rem;
        }
    }
	.fenge {
		height: 20/100rem;
		background-color: #F1F1F1;
	}
    .for-discount {
        margin: .15rem .2rem;
        padding-top: .06rem;
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
        }
        .coupon_img {
          background: url(../../assets/coupon.png) no-repeat;
          background-size: 100% 100%;
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
            height:3.5rem;
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
      .delivery_right {
        position: absolute;
        right: 0.3rem;
        top: 24%;
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
        margin-top: -.62rem;
      }
    }
    .auction-list{
        background: #ffffff;
        padding-bottom: 1rem;
    }

    .l {
        float: left;
    }

    .r {
        float: right;
    }

    .mint-swipe {
        width: 100%;
        height: 6.22rem;
        padding-top: .95rem;
        img {
            width: 100%;
            height: 100%;
        }

        .mint-swipe-indicators {
            .mint-swipe-indicator {
                width: 20px;
                height: 20px;
            }
        }
    }

    .introduce {
        width: 100%;
        height: 2.5rem;
        background: #f1f1f1;

        .big {
            width: 6.4rem;
            height: 1rem;
            font-size: 0.3rem;
            font-family: "微软雅黑";
            margin-top: .2rem;
            margin-left: .2rem;
            color: #323232;
            margin-right: 0.2rem;
            line-height: 155%;

            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
        }

        .share {
            width: 0.6rem;
            margin-top: .2rem;
            margin-left: .1rem;
            height: 1rem;
            line-height: 200%;

            .pic {
                display: block;

                img {
                    width: 0.4rem;
                    height: 0.4rem;
                }
            }

            .font {
                color: #565656;
            }

        }

        .chase {
            width: 6rem;
            height: .4rem;
            line-height: .4rem;
            margin-left: .2rem;
            font-size: 0.2rem;
            color: #d29d29;
        }

        .money {
            width: 80%;
            height: 0.5rem;
            color: #df282a;
            font-size: .3rem;
            margin-left: .2rem;
            margin-top: .1rem;
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
    .choose {
        width: 100%;
        height: 3rem;
        background: #FFFFFF;

        .promote {
            width: 100%;
            height: 1.3rem;
            padding-top: .2rem;
            border-bottom: 1px solid #f1f1f1;

            .top {
                width: 100%;
                height: 0.75rem;
                line-height: 300%;

                .text {
                    margin-left: 0.2rem;
                    margin-right: .2rem;
                    font-size: .25rem;
                    color: #767676;
                }

                span {
                    display: inline-block;
                    font-size: .25rem;
                    color: #767676;
                }

                img {
                    margin-top: .16rem;
                    width: .75rem;
                    margin-right: .2rem;
                }
            }

            .bottom {
                width: 100%;
                height: 0.75rem;
                line-height: 200%;

                span {
                    display: inline-block;
                    font-size: .25rem;
                    color: #767676;
                }

                img {
                    margin-top: .05rem;
                    width: .75rem;
                    margin-right: .2rem;
                    margin-left: .9rem;
                }
            }

        }

        .already {
            width: 95%;
            height: 1.3rem;

            p {
                height: 1.3rem;
                line-height: 1.3rem;

                .one {
                    width: 15%;
                    display: inline-block;
                    margin-left: .2rem;
                    font-size: .25rem;
                    color: #777777;
                }

                .two {
                    display: inline-block;
                    margin-left: .2rem;
                    font-size: .3rem;
                    color: #333333;
                }

                .three {
                    display: inline-block;
                    line-height: 1.3rem;
                    font-size: .3rem;
                    color: #777777;
                }
            }
        }
    }


        .boxing {
            width: 100%;
            height: 1rem;
            display: flex;
            justify-content: space-between;

            .collect {
                width: 50%;
                height: 1rem;
                display: flex;
                align-items: center;
                justify-content: center;

                img {
                    width: 50/100rem;
                    height: 50/100rem;
                }
            }

            .join {
                width: 50%;
                height: 1rem;
                line-height: 1rem;
                text-align: center;
                background: #e9c440;
                color: #FFFFFF;
                font-size: 0.3rem;
            }

            .buy {
                width: 100%;
                height: 1rem;
                line-height: 1rem;
                text-align: center;
                background: #FFE4D0;
                color: #E5511D;
                font-size: 0.3rem;
            }
            .cart {
                width: 100%;
                height: 1rem;
                line-height: 1rem;
                text-align: center;
                background: #d02629;
                color: #FFFFFF;
                font-size: 0.3rem;
            }
        }

        .shop {
            width: 100%;
            height: 7rem;
            background: #FFFFFF;
            border-top: 1px solid #dfdfdf;
            margin-top: .2rem;

            .tops {
                width: 90%;
                margin-top: .4rem;
                margin-left: .3rem;
                height: 1.6rem;

                .boxs {
                    width: 1.5rem;
                    height: 1.5rem;
                    line-height: 1.5rem;
                    text-align: center;
                    vertical-align: middle;
                    border: 1px solid #dfdfdf;
                }

                .title {
                    display: block;
                    width: 3rem;
                    height: .9rem;
                    line-height: .9rem;
                    font-size: .4rem;
                    margin-left: .3rem;
                    color: #333333;
                }

                .people {
                    display: block;
                    width: 3rem;
                    font-size: .2rem;
                    margin-left: .3rem;
                    color: #999999;
                }
            }

            .middle {
                width: 100%;
                height: 2.8rem;

                ul {
                    width: 100%;
                    margin-top: .5rem;
                    height: 2.8rem;

                    li {
                        width: 30%;
                        height: 2rem;
                        line-height: 300%;
                        margin-top: .3rem;
                        border-right: 1px solid #dddddd;
                        text-align: center;

                        .number {
                            display: block;
                            margin-top: .3rem;
                            font-size: .3rem;
                        }

                        .numbers {
                            display: block;
                            font-size: .25rem;
                            color: #999999;
                        }

                        .cate {
                            height: .6rem;
                            line-height: .6rem;

                            .desc {
                                font-size: .24rem;
                                color: #999999;
                            }

                            .color {
                                font-size: .24rem;
                                color: #d2ae34;
                                margin-left: .1rem;
                            }
                        }
                    }
                }
            }

            .bottom {
                width: 100%;
                height: 1rem;

                .chat {
                    width: 1.5rem;
                    height: .6rem;
                    line-height: .6rem;
                    text-align: center;
                    border-radius: 10px;
                    border: 1px solid #d2ae34;
                    font-size: .25rem;
                    color: #d2ae34;
                    margin-left: 1.6rem;
                }

                .enter {
                    width: 1.5rem;
                    height: .6rem;
                    line-height: .6rem;
                    text-align: center;
                    border-radius: 10px;
                    border: 1px solid #d2ae34;
                    font-size: .25rem;
                    color: #d2ae34;
                    margin-left: .8rem;
                }
            }
        }

        .lunch {
            width: 100%;
            height: 6rem;
            margin-top: .2rem;
            background: #FFFFFF;

            .bott {
                width: 100%;
                height: 1rem;

                .lefts {
                    width: 3rem;
                    height: 1rem;
                    line-height: 1rem;
                    font-size: .3rem;
                    color: #333333;
                    margin-left: .2rem;
                }

                .rights {
                    width: .5rem;
                    height: 1rem;
                    line-height: 1rem;
                    font-size: .5rem;
                    color: #CCCCCC;
                }
            }

            .box {
                width: 100%;
                height: 4rem;

                dl {
                    width: 32%;
                    height: 4rem;

                    dt {
                        width: 2rem;
                        border: 1px solid #CCCCCC;
                        margin-left: .2rem;
                        height: 2.5rem;

                        img {
                            width: 2rem;
                            height: 2rem;
                            margin-top: .5rem;
                        }
                    }

                    dd {
                        width: 2rem;
                        height: 1rem;
                        margin-top: .2rem;
                        margin-left: .2rem;

                        .hello {
                            display: block;
                            color: #727274;
                            font-size: .18rem;
                        }

                        .price {
                            display: block;
                            color: #e02828;
                            font-size: .25rem;
                        }
                    }
                }
            }
        }

        .lunchs {
            width: 100%;
            height: 6rem;
            margin-top: .2rem;
            background: #FFFFFF;

            .bott {
                width: 100%;
                height: 1rem;

                .lefts {
                    width: 3rem;
                    height: 1rem;
                    line-height: 1rem;
                    font-size: .3rem;
                    color: #e12929;
                    margin-left: .2rem;
                }

                .rights {
                    width: 1rem;
                    height: 1rem;
                    line-height: 1rem;
                    font-size: .2rem;
                    color: #CCCCCC;
                }
            }

            .box {
                width: 100%;
                height: 4rem;

                dl {
                    width: 33%;
                    height: 4rem;

                    dt {
                        width: 2rem;
                        margin-left: .2rem;
                        height: 2.5rem;

                        img {
                            width: 2rem;
                            height: 2rem;
                            margin-top: .5rem;
                        }
                    }

                    dd {
                        width: 2rem;
                        height: 1rem;
                        margin-top: .2rem;
                        margin-left: .2rem;

                        .hello {
                            display: block;
                            color: #727274;
                            font-size: .18rem;
                        }

                        .price {
                            display: block;
                            color: #e02828;
                            font-size: .25rem;
                        }
                    }
                }
            }
        }


        .contine {
            width: 100%;
            height: 1rem;
            background: #f1f1f1;
            text-align: center;
            line-height: 1rem;

            p {
                height: 1rem;
                text-align: center;
                line-height: 1rem;
                color: #999999;
            }
        }

        .navs {
            width: 100%;
            height: 1rem;
            background: #FFFFFF;

            ul {
                width: 100%;
                height: 1rem;

                li {
                    width: 25%;
                    height: 1rem;
                    line-height: 1rem;
                    text-align: center;
                    font-size: .3rem;
                    color: #333333;

                }

                .active {
                    border-bottom: .03rem solid #d19e29;
                }
            }

            .navs {
                width: 100%;
                height: 1rem;
                background: #FFFFFF;

                ul {
                    width: 100%;
                    height: 1rem;

                    li {
                        width: 25%;
                        height: 1rem;
                        line-height: 1rem;
                        text-align: center;
                        font-size: .3rem;
                        color: #333333;

                    }

                    .active {
                        border-bottom: .03rem solid #d02629;
                    }
                }
            }

            .contain {
                width: 100%;
                height: 3rem;
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
</style>
