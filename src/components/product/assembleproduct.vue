<template>
    <div id="product" class="product">
        <!-- <div v-title data-title="商品详情">商品详情</div> -->
        <!--<pr-header :text="title"></pr-header>-->
        <div class="header" :style="headBackgroundColor">
            <div :style="btnOpacity" @click="goLastPage" class="return"></div>
            <div :style="btnOpacity1" @click="goLastPage" class="return1"></div>
            <div :style="tabOpacity" class="tab">
                <div @click="handTab(0)" :class="{active:currentTab == 0}">商品</div>
                <div @click="handTab(1)" :class="{active:currentTab == 1}">详情</div>
            </div>
            <div :style="btnOpacity" class="share" @click="fenxiang"></div>
            <div :style="btnOpacity1" class="share1" @click="fenxiang"></div>
        </div>
        <PullUpReload v-show="tabFlg" :on-infinite-load="onInfiniteLoad" :parent-pull-up-state="pullUpState">
            <div>
                <!--<mt-swipe v-if="images.length != 0" :auto="4000">-->
                <!--<mt-swipe-item v-for="item in images" :key="item.id">-->
                <!--<img :src="URL + item.pic_url">-->
                <!--&lt;!&ndash;<img src="../../assets/newproduct.png" alt="">&ndash;&gt;-->
                <!--</mt-swipe-item>-->
                <!--</mt-swipe>-->

                <!--<div v-if="images.length != 0" class="swiper-container productswiper">-->
                <div  class="swiper-container productswiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-if="images.length" v-for="(item,index) in images" :key="index">
                            <img class="home-banner-img"
                                 :src="URL + item.pic_url"/>
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>

                <!-- <div class="describe" v-if="$store.state.commodity_data">
                    <p class="fn">{{$store.state.commodity_data.title}}</p>
                    <div class="price">
                        <div class="price1">
                            <span class="orc">￥{{$store.state.commodity_data.activity_price}}</span>
                            <span class="lin-tho">￥{{$store.state.commodity_data.price_member}}</span>
                        </div>
                    </div>
                    <div style="color: #ff0000;font-size: 0.34rem;font-weight: bold;">价格登录可见</div>
                </div> -->
                <div class="describe1" v-if="$store.state.commodity_data">
                    <div>
                        <p class="fn" v-if="detail">{{$store.state.commodity_data.goods.title}}</p>
                        <p class="fn" v-else>{{productData.title}}</p>
                        <p class="description-fn" v-if="detail">{{$store.state.commodity_data.goods.description}}</p>
                        <p class="description-fn" v-else>{{productData.description}}</p>
                    </div>
                    <p class="price" v-if="$store.state.commodity_data.goods.p_id==0">
                        <span style="color:red;font-size:.36rem">
                            ￥
                            {{productData.price_member}}
                        </span>
                        <span class="new">
                            原价 ：￥
                            <s>{{productData.price_market}}</s>
                        </span>
                        <span class="report" @click="handleNotice">举报</span>
                    </p>
                    <p class="price" v-else>
                        <span style="color:red;font-size:.36rem">
                            ￥{{activityPrice}}
                            <!-- {{$store.state.commodity_data.goods.price_member}} -->
                        </span>
                        <!-- <span class="new">
                            原价 ：￥
                            <s>{{$store.state.commodity_data.goods.price_market}}</s>
                        </span> -->
                        <span class="report" @click="handleNotice">举报</span>
                    </p>
                </div>

                <!--配送地址-->
                <!-- <div class="delivery" @click="selectAddress">
                    <div class="message">
                        <span>配送</span>
                        <div class="address">
                            <div v-if="rec_address">{{show_addres ?rec_address.prov+rec_address.city+rec_address.dist+rec_address.address : rec_address.prov_name+rec_address.city_name+rec_address.dist_name+rec_address.address}}
                                <div>拼团成功后 24或者48小时内发货</div>
                            </div>
                            <span v-else>您还没有填写收货地址，请填写！</span>
                        </div>
                    </div>
                </div> -->
                <div class="fenge"></div>

                <div class="groupBuy">
                    <div class="groupBuy1">
                        <!-- <div class=""><i class='fas fa-user-friends' style="color: #ff911b;"></i>{{sheetNum}}人拼，可直接参与</div>
                        <div class="">{{buyNum}}人已拼</div> -->

                        <div class="title" v-if="cativityNum != 0">
                           <i class='fas fa-user-friends' style="color: #ff911b;"></i> {{cativityNum}}人在开团，可直接参与
                        </div>
                        <div class="notHas" v-if="cativityNum == 0">亲！ 还未有商品开团哦！</div>
                        <div class="has" v-else>{{AssembleCount}}人已拼</div>
                        
                    </div> 
                    <div class="groupBuy2">
                        <ul>
                            <li class="licss" v-for="(item, ind) in AssembleList" :key="ind">
                                <div class="divimg">
                                    <img class="imgcss" :src="URL + item.user_header">
                                </div> 
                                <div class="rightDiv">
                                    <p class="p1"><span></span>{{item.user_name}}的团</p> 
                                    <p class="p2">
                                        <span v-if="item.surplus !=0 ">还差<em class="emcss">{{item.surplus}}</em>人成团</span>
                                        <span class="success" v-else>已成团</span>
                                        <small class="remain_time">剩余 
                                            <span>{{hour}}</span>天
                                            <span>{{Minute}}</span>时
                                            <span>{{second}}</span>分
                                            <!-- {{showTime2}} -->
                                        </small>
                                    </p>
                                </div> 
                                <div class="btn btncss" @click="gobtn(item.id,item.order_id, item.order_sn_id)">去参团</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- <div class="groupBuyCon2"> -->
                    <!-- <div class="leftDiv">
                        <div class="imgGroup">
                            <div class="divimg">
                                <img class="imgcss" src="https://wq.360buyimg.com/img/pingou-head/150.jpg">
                            </div>
                            <div class="divimg1">
                                <img class="imgcss" src="https://wq.360buyimg.com/img/pingou-head/150.jpg">
                            </div>
                            <div class="divimg2">
                                <img class="imgcss" src="https://wq.360buyimg.com/img/pingou-head/150.jpg">
                            </div>
                            <div class="divimg3">
                                <img class="imgcss" src="https://wq.360buyimg.com/img/pingou-head/150.jpg">
                            </div>
                            <div class="divimg4">
                                <img class="imgcss" src="https://wq.360buyimg.com/img/pingou-head/150.jpg">
                            </div>
                        </div>
                        <div class="btn btncss1">去参团</div>
                    </div> -->
                    <!-- <div class="leftDiv">
                        <div class="imgGroup">
                            <div class="divimg" v-for="i in 5" :key="i">
                                <img class="imgcss" src="https://wq.360buyimg.com/img/pingou-head/150.jpg">
                            </div>
                        </div>
                        <div class="btn btncss1">去参团</div>
                    </div>
                    <div>
                        <div class="textcss">2839-Hello</div>
                    </div>     -->
                <!-- </div> -->

                <!-- <div class="fenge"></div>
                <div class="assemble-list">
                    <div class="assemble">
                        <div class="left">
                            hello1
                        </div>
                        <div class="right">
                            <div class="time-num">
                               
                            </div>
                            <div  class="btnedit">{{showTime2}}</div>
                        </div>
                    </div>
                </div> -->

                <!--拼团列表-->
                <!-- <div class="assemble-list">
                    <div class="title" v-if="cativityNum != 0">
                        {{cativityNum}}人在开团，可直接参与
                    </div>
                    <div class="assemble" v-for="(item,index) in AssembleList" :key="index">
                        <div class="left">
                            <img :src="apiLink + '/' + item.user_header" alt="">
                            {{item.user_name}}
                        </div>
                        <div class="right">
                            <div class="time-num">

                                <div v-if="item.lacking==1">还差<span>一人</span>拼成</div>
                                <div v-else-if="item.lacking==2">还差<span>二人</span>拼成</div>
                                <div v-else-if="item.lacking==3">还差<span>三人</span>拼成</div>
                                <div v-else-if="item.lacking==4">还差<span>四人</span>拼成</div>
                                <div>剩余{{hour}}:{{Minute}}:{{second}}</div>

                            </div>
                         
                            <div  class="btn"  @click="gobtn(item.id,item.order_id, item.order_sn_id)">去参团</div>
                        </div>
                    </div>
                </div> -->
                <div class="fenge"></div>
                <!--用户评价-->
                <div  class="user-evaluation">
                    <div class="title">
                        <div>用户评价({{countTotal}})</div>
                        <div @click="goGoodsEvaluate">
                            查看更多
                        </div>
                    </div>
                    <div class="evaluate" v-for="(item,index) in PraiseList" :key="index">
                        <div class="name">
                            <div class="left">
                                <img :src="URL+item.user_header" alt="">
                                {{item.user_name}}
                            </div>
                            <div class="right"  >
                                <img v-if="item.score !=0" v-for="a in Number(item.score)" src="../../assets/activity/sh@2x.png" alt/>
                                <img v-if="item.score != 5" v-for="a in (5-item.score)" src="../../assets/activity/kx@2x.png" alt/>

                            </div>
                        </div>
                        <div class="specs">
                            <div>{{ item.create_time*1000| formatDate}}</div>
                            <div class="spec">
                                {{item.labels}}
                            </div>
                        </div>
                        <div class="evaluate-img" v-for="(itemimg,indexk) in item.img" :key="indexk">
                            <img :src="URL+itemimg.path" alt="">

                        </div>
                        <div class="content">
                            {{item.content}}
                        </div>
                    </div>
                </div>
                <div class="fenge"></div>

                <div class="selected" @click="theSon">
                    <span class="title">规格</span>
                    <div>
                        <span class="select-spec" v-if="detail !== ''">{{detail}}, {{$store.state.commodity_val}}个</span>
                        <span class="select-spec" v-else-if="option !== ''">{{option}}, {{$store.state.commodity_val}}个</span>
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

                <div class="for-discount" @click="showCoupon">
                    <span class="discount_text">优惠</span>
                    <span
                        class="coupon_img"
                        v-for="(item,index) in couponList.slice(0,2)"
                        :key="index.id">
                            满{{parseInt(item.condition)}}减{{parseInt(item.money)}}元
                    </span>
                    <span class="btn-right"></span>
                    <div class="promotion-all">
                    <div class="promotion-card" v-if="gift.length != 0">
                        <div class="promotion-title" v-if="gift.name">{{gift.name}}</div>
                            <img :src="URL + gift.pic_url" class="promotion-img">
                            <div class="promotion-num" v-if="gift.give_num != 0 && gift.give_num != null">x{{gift.give_num}}</div>
                            <div class="promotion-detail">满{{ gift.full }}元送赠品，数量{{gift.give_count}}赠完即止</div>
                        </div>
                        <div class="promotion-card"  v-if="reduction.length != 0">
                            <div class="promotion-title" v-if="reduction.promation_name">{{reduction.promation_name}}</div>
                            <div class="promotion-detail">满{{ reduction.full }}减{{reduction.expression}}</div>
                        </div>
                    </div>
                </div>

                <div class="delivery_method">
                    <div @click="callingArea">
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
                    <div v-if="callStatus == 1">
                        <div class="delivery_title">配送</div>
                        <div v-if="deliveryCal == 0" class="delivery_busi">0 元</div>
                        <div v-else-if="deliveryCal == -1" class="delivery_busi">免配送费</div>
                        <div v-else class="delivery_busi">{{deliveryCal}} 元</div>
                    </div>
                    <div v-else>
                        <div class="delivery_title">运费</div>
                        <div v-if="freightCal == 0" class="delivery_busi">卖家包邮</div>
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
                    </li>
                </div>
                <div class="fenge"></div>

                <!-- 店铺 -->
                <shop-infor :shopData="shopData" :data="$store.state.commodity_data"></shop-infor>
                <div class="fenge"></div>
            </div>
        </PullUpReload>

        <!--图文详情-->
        <DropDownRefresh v-show="tabFlg1" :on-refresh="onRefresh">
            <div ref="img" class="img detailimg">
                <div v-html="imgText" id="pic_article"></div>
            </div>
        </DropDownRefresh>
        <div @focus="handleFocus1" tabindex="0">
            <detail-option
                @recommend="matchGood($store.state.commodity_data.goods.id)"
                v-if="guige"
                :data="$store.state.commodity_data"
                :productData="productData"
                @sendValue="sendValue"
                :assemPro="asempro"
                :Number="$store.state.commodity_val"
                :promId="$route.params.id"
            ></detail-option>
        </div>
        <div style="z-index: 0; position: absolute; ">
            <mt-popup v-model="popupVisible1" position="bottom" class="mint-popup-4">
                <div class="picker-toolbar">
                    <span class="mint-datetime-action mint-datetime-cancel" style="color:#ff8000;" @click="cancleaddress">取消</span>  
                    <span class="mint-datetime-action mint-datetime-confirm" style="color:#ff8000;" @click="SAClick">确定</span>  
                </div>
                <div class="select">
                    <ul class="address-area-tit">
                        <li
                            v-model="prov111"
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
        </div>

        <transition  name="fade">
			<div class="coupon_box" v-if="sta">
                <div class="box_main">
                    <div class="box_header">
                        <p class="box_text">领券</p>
                        <span class="box_cross" @click="showCoupon">×</span>
                    </div>
                    <div class="promotion-all">
                        <div class="pro_title" v-if="gift.length != 0">促销</div>
                        <div class="promotion-card" v-if="gift.length != 0">
                            <div class="promotion-title">{{gift.name}}</div>
                            <div class="promotion-detail">满{{ gift.full }}元送赠品，数量{{gift.give_count}}赠完即止</div>
                        </div>
                        <div class="showpormotion" v-if="gift.length != 0">
                            <img :src="URL + gift.pic_url" class="showpormotion-img" v-if="gift.pic_url !=null">
                            <div class="showpormotion-all">
                                <div class="showpormotion-title">{{gift.title}}</div>
                                <div class="showpormotion-num" v-if="gift.give_num != 0 && gift.give_num != null">x{{gift.give_num}}</div>
                            </div>
                        </div>
                        <div class="promotion-card" v-if="reduction.length != 0">
                            <div class="promotion-title">{{reduction.promation_name}}</div>
                            <div class="promotion-detail">满{{ reduction.full }}减{{reduction.expression}}</div>
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
                            <div class="body_right">立即领取</div>
                        </div>
                    </div>
                </div>
			</div>
		</transition>

        <foot-btn :state="sonState" :Number="$store.state.commodity_val" :data="$store.state.commodity_data" :goodId='this.$route.params.goodId'  :id='this.$store.state.id'
                  @reduce="reduce" @plus="plus" :money='this.$route.params.money' :assemPro="assemProData" :productData="productData" :selspec="selspec" :promId="$route.params.id"></foot-btn>
        <!--领取优惠券弹窗-->
        <getCoupon @change="changeCouponState" :isfreight="freight" @receiveSuccess="receiveSuccess"
                   :couponList="couponList" :state="couponFlag"></getCoupon>
    </div>
</template>
<script>
    // import PrHeader from '@/components/page/children/shop_header.vue'; // 头部
    import $ from 'jquery';
    import prList from '@/components/page/children/list.vue'; //猜你喜欢和搭配套餐
    import FootBtn from '@/components/page/children/footBtnAP.vue'; // 底部按钮
    import PageOption from '@/components/page/children/pageOption.vue';
    import getCoupon from './children/getCoupon';
    import markupBuy from '@/components/page/children/markupBuy.vue'; //加价购
    import shopInfor from '@/components/page/children/shopInfor.vue'; // 店铺信息
    import detailOption from '@/components/page/children/detailOptions.vue'; // 立即购买 || 加入购物车 弹框
    import Shopsn from '@/components/page/Shopsn.vue';
    import share from '@/components/page/children/share';
    import DropDownRefresh from './children/DropDownRefresn'; // 上拉刷新组件
    import PullUpReload from './children/PullUpReload'; //下拉组件
    import qs from 'qs';
    import Swiper from 'swiper';
    import 'swiper/dist/css/swiper.min.css';
    import {Popup} from 'mint-ui';
    import CountDown from 'vue2-countdown'
    import { Toast } from 'mint-ui';

    export default {
        name: 'assembleproduct',
        data() {
            return {
                //是否显示状态条
                showIndicators: true,
                //初始轮播切换索引
                defaultIndex: 0,
                //轮播是否循环播放
                id:'',//商品id//
                continuous: true,
                show_addres: true,
                freight: 0,
                number: 1,
                commentNav:['产品攒(4)','产品攒(4)','产品攒(4)','产品攒(4)','产品攒(4)','产品攒(4)'],
                commentnavIndex:0,
                login: sessionStorage.getItem('login'),
                conItem: {
                    title: '猜你喜欢'
                },
                conItemRe: {
                    title: '搭配套餐推荐'
                },
                pullUpState: true,
                scrollWatch: true,
                topStatus: '',
                loadTop1: {},
                AssembleList:[],//未拼满的团购列表
                timeStampL:[],
                couponFlag: false, //打开领取优惠券弹窗
                shareFlag: false, //分享弹窗
                sonState: false,
                data: '',
                title: '商品详情',
                dataLeave: '',
                couponList: [], //可领取优惠劵列表
                load_wrap: true,
                link_id: this.$route.params.id,
                guige: false,
                shopData: '',
                popupVisible: false,
                nowday: '',
                markupBugList: [],
                endday: '',
                end: '',
                brand: '',
                currentTab: 0,
                tabFlg: true,
                tabFlg1: false,
                finish: false,
                images: [],
                page: 1,
                rec_address: '', //默认地址
                allLoaded: false,
                imgText: '',
                p_id: 0,
                tabOpacity: { //tab隐藏于显示
                    opacity: 0
                },
                headBackgroundColor: { //头部背景色
                    'backgroundColor': 'rgba(255,255,255,0)'
                },
                btnOpacity: { //分享按钮于返回按钮的btn
                    'opacity': 1,
                    'display': ''
                },
                btnOpacity1: {
                    'opacity': .1,
                    'display': 'none'
                },
                orderid:"",
                Number:1,
                cativityNum:0,
                hour:0,
                Minute:1,
                second:0,
                PraiseList:[],//评论
                countTotal:0,//评论数量
                counDtown:[{time:''}],
                detail: '',
                option: '',
                productData: '',
                gift:[],
                reduction: [],
                showTime2: '',
                intervalid: '',
                addressAll1:'',
                callStatus: '',
                freightCal: '',
                merchantDelivery:'',
                expressDelivery:'',
                addressAllData: '',
                deliveryCal: '',
                product:'',
                allCount: 0,
                dataItem:'',
                imgNo:require('@/assets/images/xinxin.png'),
                imgYes:require('@/assets/images/xu_xinxin.png'),
                tempImgValue: '',
                isChoose:false,
                addressPlaceName: '',
                cityArrName: '',
                areaArrName: '',
                assemProData: {},
                headParams: {
                    title: sessionStorage.getItem('titleKey'),
                    description: sessionStorage.getItem('updateDescription'),
                    keywords: sessionStorage.getItem('contentKey'),        
                },
                groupBuyStatus : [],
                AssembleCount : '',
                sta: false,
                asempro: 'assemPro',
                popupVisible1:false,
                prov111:'',
                showProvince: true, // 省选择的显示隐藏
                Bcity: '',
                choiceCity: '',
                showCity: false, // 市选择的显示隐藏
                district:'',
                districtArr:'',
                provinceIndex: -1, // 选中态索引
                cityArr:'',
                cityIndex: -1,
                showArea: false, // 区选择的显示隐藏
                areaIndex: -1,
                province: '请选择',    // 选中的省
                area: '请选择', // 选中的区
                choiceArea: false, // 区按钮的显示隐藏
                areaId: '', // 选中的区id
                addressPlace:'',
                buyNum: 0,
                groupbuystartlimit: 0,
                sheetNum: 0,
                specific_id: null,
                detailAllData: '',
                selectedSpec: '',
                specification: '',
                selspec: 'selspec',
                activityPrice: 0,
                nospec: '',
                apiLink: imgRequest
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
        filters: {
            formatDate: function (value) {
                let date = new Date(value);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                return y + '-' + MM + '-' + d ;
            }
        },
        created() {
            let title = "商品详情" + '-' + sessionStorage.getItem('titleKey') + '-' + sessionStorage.getItem('updateDescription');
            this.showScroll.scrollTitle(title);
            this.$store.state.const_join = false;
            this.$store.state.catr_number = 0;
            this.$store.state.goods_id = '';
            this.$store.state.matchGood = '';

            this.selectedSpec = this.$route.params.goodId
            this.axios.post(
                this.$httpConfig.goodSpecsByGoodsChildren,
                qs.stringify({
                    id: this.selectedSpec,
                    token: sessionStorage.getItem("data_token")
                })
            )
            .then(res => {
                if (res.data.status == 1) {
                    this.specification = res.data.data;
                    
                    let temp1 = res.data.data.goods 
                    for (let i in temp1) { 
                        if(temp1[i].id == this.selectedSpec) {
                            let temp2 = res.data.data.spec.spec_children
                            for(let j in temp2) {
                                if(temp1[i].key == temp2[j].id) {
                                    this.activeItem = temp2[j].item;
                                    this.option = temp2[j].item;
                                    this.IId = temp2[j].id;
                                }
                            }
                        }
                    }

                    let tempdata = this.specification.spec.spec_children
                    let tempequal = tempdata.every((val, i, arr) => val.spec_id == arr[0].spec_id)

                    for (let i in this.specification.goods) {
                        this.specId = res.data.data.goods[i].key.split("_"); 
                        if(this.IId == this.specId || tempequal == false) { 
                            this.specific_id = res.data.data.goods[i].goods_id;
                            // this.axios({
                            //     url: this.$httpConfig.goodInfo,
                            //     method: "get",
                            //     params: {
                            //         id: this.specific_id
                            //     }
                            // }).then(res => {
                            //     this.productData = res.data.data.goods;
                            //     this.video = res.data.data.video;
                            //     this.promotion = res.data.data.promotion;
                            //     this.images = res.data.data.imgs;
                            // })
                            // .catch(err => {
                            //     console.log(err);
                            // });
                            this.axios
                            .post(
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
                alert('Error ', err)
                console.log(err);
            })

            this.proAjax(0, 0);
            this.CArrName();
            this.AArrName();
            
            this.ax();
            this.comContent();
        },
        methods: {
            handleFocus1() {
            },
            handleNotice() {
                location.replace(window.location.origin +
                    "/" +"informOutline?x=" +
                    1 +
                    "&notice=1" +
                    "&store_id=" +
                    this.store__id +
                    "&goods_id=" +
                    this.route_id+'&main_id='+this.p_id)
            },
            getDeliveryCal(){
				this.axios.post(this.$httpConfig.deliveryCalcus,qs.stringify({
					store_id: this.$store.state.commodity_data.goods.store_id,
                    goods_id: this.$route.params.goodId,
                    prov_id: this.getProvinceID,
                    dist_id: this.cityId,
                    city_id: this.areaId,
                    token: sessionStorage.getItem("data_token")
                }),'post')
                .then((res) => {
                    this.callStatus = res.data.status;
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
                }).catch((err) => {
                    console.log(err);
                })
            },
            setCityEnd(id, name, index) { // 区点完以后
                this.area = name;
                this.areaId = id;
                this.getDeliveryCal();
                // this.getFreightCal();
            },
            getCity(id, name, index) { // 获取城市列表
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
            getProvince(id, name, index) {
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
            },
            cancleaddress(){
                this.popupVisible1 = false;
            },
            SAClick() {
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
            couponReceive(id) {
                let selectedId = this.couponList[id]
                this.axios({
                    url: this.$httpConfig.couponReceiveBehavior,
                    method: "get",
                    params: {
                        id: selectedId.id,
                        token: sessionStorage.getItem("data_token")
                    }
                }).then(res => {
                    Toast({
                        message: res.data.message,
                        position: "middle",
                        duration: 1000
                    });
                }).catch(err => {
                    console.log(err);
                });
            },
            proAjax(index, selId) {
                this.axios({
                    method: 'get',
                    url: this.$httpConfig.cityList,
                    params: {
                        parent_id: index,
                        token: sessionStorage.getItem("data_token")
                    }
                })
                .then((res) => {
                    let data = res.data.data;
                    if(selId == 0) {
                        this.addressPlace = data;
                        this.addressPlaceName = this.addressPlace[6].name;
                        this.addressAllData = this.addressPlaceName +'-'+ this.cityArrName +'-'+ this.areaArrName;
                    } else if(selId == 1) {
                        this.cityArr = data;
                    } else if(selId == 2) {
                        this.districtArr = data;
                    } else if(selId == 3) {
                        this.TownshipArr = data;
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            CArrName() {
                this.axios({
                    method: 'get',
                    url: this.$httpConfig.cityList,
                        params: {
                            parent_id: 31,
                            token: sessionStorage.getItem("data_token")
                        }
                    }).then(res => {
                        this.cityArrName = res.data.data[4].name;
                        this.addressAllData = this.addressPlaceName +'-'+ this.cityArrName +'-'+ this.areaArrName;
                });
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
                        goods_id:this.$route.params.id,
                        type: 0,
                        status:4,
                        page:1,
                        token: sessionStorage.getItem("data_token")
                    }
                }).then((res) => {
                    if(res.data.status==1){
                        if(res.data.data.data !== "") {
                            this.dataItem= res.data.data.list;
                            this.allCount = res.data.data.allCount;
                        }
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
                        this.countTotal = res.data.data.countTotal;
                    }
                }).catch((err) => {
                    console.log(err);
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
            toShop(id){
                this.$router.push({
                    name:"shopHome",
                    params:{
                        id:id,
                        index:0
                    }})
            },
            AArrName() {
                this.axios({
                    method: 'get',
                    url: this.$httpConfig.cityList,
                    params: {
                        parent_id: 488,   
                        token: sessionStorage.getItem("data_token")      
                    }
                }).then(res => {
                    this.areaArrName = res.data.data[0].name;
                    this.addressAllData = this.addressPlaceName +'-'+ this.cityArrName +'-'+ this.areaArrName;
                });
                this.axios.post(this.$httpConfig.deliveryCalcus,qs.stringify({
                    store_id: 2,
                    goods_id: this.$route.params.goodId,
                    prov_id: 31,
                    dist_id: 488,
                    city_id: 5020,
                    token: sessionStorage.getItem("data_token")
                }),'post').then((res) => {
                    this.callStatus = res.data.status;
                    // this.merchantDelivery = res.data.data.transport;
                    if(res.data.status == 1) {
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
                        }),'post').then((res) => {
                            this.freightCal=res.data.data;
                        }).catch((err) => {
                            console.log(err);
                        })
                        this.getExpressInfo();
                    }
                }).catch((err) => {
                    console.log(err);
                })
            },
            getExpressInfo(){
                this.axios.post(this.$httpConfig.getExpressInfo,qs.stringify({
                    goods_id: this.$route.params.id,
                    token: sessionStorage.getItem("data_token")
                }),'post').then((res) => {
                    this.expressDelivery = res.data.data;
                }).catch((err) => {
                    this.expressDelivery = err.data.data;
                    console.log(err);
                })
            },
            selectaddressFromProductPage() {
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
            callingArea(){
                this.popupVisible1 = true;
            },
            showCoupon() {
                this.sta = !this.sta;
            },
            sendValue(detail, id, subid){
                if(detail == null) {
                    this.option = ''
                    this.detail = ''
                    this.selspec = ''
                    if(subid !== null) {
                        this.nospec = subid
                    }
                } else {
                    // alert(detail + " " + id + " " + subid)
                    this.detail = detail.item
                    this.detailId = id
                    this.detialSubId = subid
                    this.detailAllData = detail
                    this.selspec = 'selspec'
                    this.optionSpec2();
                }
            },
            optionSpec2() {
                let temp1 = this.specification.goods 
                for (let i in temp1) { 
                    if(temp1[i].key == this.detailAllData.id) {
                        this.selectedSpec = temp1[i].id
                    }
                }
                this.axios.post(
                    this.$httpConfig.goodSpecsByGoodsChildren,
                    qs.stringify({
                        id: this.selectedSpec,
                        token: sessionStorage.getItem("data_token")
                    })
                )
                .then(res => {
                    if (res.data.status == 1) {
                        this.specification = res.data.data;
                        this.option = this.detailAllData.item
                        this.IId = this.detailAllData.id
                        for (let i in this.specification.goods) {
                            this.specId = res.data.data.goods[i].key.split("_");
                            if(this.IId == this.specId) {
                                this.specific_id = res.data.data.goods[i].goods_id;
                                
                                this.axios({
                                    url: this.$httpConfig.goodInfo,
                                    method: "get",
                                    params: {
                                        id: this.specific_id,
                                        token: sessionStorage.getItem("data_token")
                                    }
                                })
                                .then(res => {
                                    this.$store.state.commodity_data = res.data.data;
                                    this.images = res.data.data.imgs;
                                    this.productData = res.data.data.goods;
                                    this.promotion = res.data.data.promotion;
                                    this.video = res.data.data.video;
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
            
            //去参团
            gobtn(id,orderid, order_snId){
                if(this.status == 10001) {
                    this.$router.push({
                        path: '/LogIn',
                        query: {
                            redirect: window.location.href
                        }
                    });
                } else {
                    this.$router.push({
                        name:'activityOrder',
                        params:{
                            id: this.$store.state.id,
                            promId: 0,
                            goods_num:this.Number,
                            orderid:orderid,
                            stat:2,
                            ordersnId: order_snId,
                            goods_id: this.$route.params.goodId
                            },
                        query: {
                            order_id: orderid
                        }
                    })
                }
            },
            //用户评价  产看更多点击事件
            goGoodsEvaluate(){
                this.$router.push({
                    name:'goodsevaluate',
                    params:{goodId:this.$route.params.goodId}
                })
            },
            recommend() {

            },
            receiveSuccess() {
            },
            toRule() {
                this.$router.push("/hierarchyRule");
            },
            securities() {
                if (this.couponList.length != 0) {
                    this.couponFlag = true
                }
            },
            slide(type) {
                var that = this;
                if (type) {
                    var loadMoudle = document.getElementById('loadMoudle');
                    this.distance = loadMoudle.clientHeight || loadMoudle.offsetHeight; //获取商品信息总高度 也就是下拉获取图文详情需要滑动的距离
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
                    $('html,body').animate({scrollTop: this.distance}, 0, function () {
                        that.tabFlg = false; // 滑动结束后隐藏商品信息
                        document.body.scrollTop = 0;
                    })
                } else {
                    window.scrollTo(0, this.distance);
                    var that = this;

                    $('html,body').animate({scrollTop: 0}, 0, function () {
                        that.tabFlg1 = false; // 滑动结束后隐藏商品信息
                    })
                }
            },
            //获取默认地址
            getAddress() {
                this.axios.post(this.$httpConfig.getDefault, qs.stringify({
					token: sessionStorage.getItem("data_token")
				})).then((res) => {
                    if (res.data.status == 10001) {
                        // this.$router.push('/login');
                        return;
                    }
                    this.load_wrap = false;
                    if (res.data.data) {
                        this.rec_address = res.data.data;
                    } else {
                        this.selectAddress1()
                    }
                    if (res.data.data && sessionStorage.getItem('set_address')) {
                        this.selectAddress1()
                    }
                    //this.getFreight();
                }).catch((err) => {
                    console.log(err);
                })
            },
            toEvaluateList(){
                this.$router.push({
                    name:'evaluateAll'
                })
            },
            //选取地址
            selectAddress1() {
                this.rec_address = JSON.parse(sessionStorage.getItem('set_address'));
                this.show_addres = false;
            },
            onRefresh() { //上拉事件
                this.currentTab = 0;
                this.tabFlg = true;
                this.slide(0);
            },
            onInfiniteLoad(done) { //下拉事件
                this.currentTab = 1;
                this.tabFlg1 = true;
                this.btnOpacity1.display = '';
                this.btnOpacity.display = 'none';
                this.btnOpacity1.opacity = 1;
                this.headBackgroundColor.backgroundColor = 'rgb(255,255,255)';
                this.tabOpacity.opacity = 1;
                this.slide(1)

            },
            changeCouponState() {
                this.couponFlag = false
            },
            countDown() {
                this.finish = true
            },
            selectAddress() {
                sessionStorage.removeItem('collocation_cart_id');
                sessionStorage.removeItem('collocation_info');
                sessionStorage.removeItem('integral_data');
                sessionStorage.removeItem('cart_id');
                sessionStorage.removeItem('set_meal_id');
                sessionStorage.removeItem(('goods_data'));
                sessionStorage.removeItem(('active_data'));
                sessionStorage.removeItem(('active_detail'));
                sessionStorage.removeItem(('assemble_address'));
                sessionStorage.removeItem(('ordinary_detail'));
                sessionStorage.removeItem(('order_detail'));
                sessionStorage.setItem('product_detail', JSON.stringify({
                    id: this.$route.params.id,
                    goodId:this.$route.params.goodId,
                    status: this.$route.params.status
                }));
                this.$router.push({
                    name: 'address',
                    params: {
                        status: 1
                    }
                });
            },
            // 图文详情请求
            imgTextAjax() {
//              this.load = true;
                this.axios.post(this.$httpConfig.getGoodsDetail,
                    qs.stringify({
                        goods_id: this.p_id,
                        token: sessionStorage.getItem("data_token")
                    })
                ).then((res) => {
                    this.load = false;
                    if (res.data.status == 1) {
                        this.imgText = this.intoHtml(res.data.data)
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            intoHtml(str) {
                var arrEntities = {'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"'};
                return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
                    return arrEntities[t];
                });
            },
            handTab(index) {
                if (index != this.currentTab) {
                    this.currentTab = index;
                    if (index == 1) {
                        this.tabFlg1 = true;
                        this.btnOpacity1.display = '';
                        this.btnOpacity.display = 'none';
                        this.btnOpacity1.opacity = 1;
                        this.headBackgroundColor.backgroundColor = 'rgb(255,255,255)';
                        this.tabOpacity.opacity = 1;
                        this.slide(1)
                    } else {
                        this.tabFlg = true;
                        this.slide(0)
                    }
                }
            },
            goLastPage() {
                this.$router.go(-1);
            },
            toTab() {
                this.$router.push({
                    name: 'tab',
                    params: {
                        id: this.$route.params.id,
                        p_id: this.p_id
                    }
                });
            },
            theSon() {
                this.$store.state.const_join = true;
                // this.opt = !this.opt;
                this.guige = true;
                this.axios({
                    url: this.$httpConfig.goodInfo,
                    method: "get",
                    params: {
                        id: this.selectedSpec,
                        token: sessionStorage.getItem("data_token")
                    }
                })
                .then(res => {
                    this.productData = res.data.data.goods;
                    this.video = res.data.data.video;
                    sessionStorage.setItem("descriptionpro",res.data.data.goods.description);
                    sessionStorage.setItem("keypro",res.data.data.goods.title);
                })
                .catch(err => {
                    console.log(err);
                });
            },
            myLove() {
                this.axios.post(
                    this.$httpConfig.guessLove,
                    qs.stringify({page: this.page, token: sessionStorage.getItem("data_token")})
                ).then((res) => {
                    this.$store.state.dataLeave = res.data.data;
                }).catch((err) => {
                    console.log(err);
                });
            },
            //属性
            spec() {

            },
            matchGood(id) {
                this.$HTTP(this.$httpConfig.matchGood, {goods_id: id}, 'post').then((res) => {
                    this.$store.state.matchGood = res.data.data;
                })
            },
            shopInfo() {
                // id: this.$store.state.commodity_data.store_id
                this.$HTTP(this.$httpConfig.shopInfo, {id: this.$store.state.commodity_data.goods.store_id}, 'get').then((res) => {
                    this.shopData = res.data.data;
                    this.getAddress();
                })
            },
            ax() {
                this.axios({
                    url: this.$httpConfig.goodInfo,
                    method: "get",
                    params: {
                        id: this.$route.params.goodId,
                        token: sessionStorage.getItem("data_token")
                    }
                }).then(res => {
                    this.$store.state.commodity_data = res.data.data;
                    this.productData = res.data.data.goods;
                    this.video = res.data.data.video;
                    this.promotion = res.data.data.promotion;
                    this.images = res.data.data.imgs;
                    this.guige = true;

                    this.getCouponList();
                    this.shopInfo();
                })
                .catch(err => {
                    console.log(err);
                });
            },
           
                
            //商品详
            getGoodINfo() {
                this.axios.post(this.$httpConfig.promotionGoodsDetail,  qs.stringify({id: this.$route.params.id, goods_id: this.$route.params.goodId, token: sessionStorage.getItem("data_token")})).then((res) => {
                    if (res.data.data.cart_count) {
                        this.$store.state.catr_number = parseInt(res.data.data.cart_count);
                    }
                    var time= res.data.data.end_time
                    // this.computationTime(time)
                    this.brand = res.data.data.brand_id;
                    // this.images = res.data.data.images ? res.data.data.images : [];
                    this.$nextTick(() => {
                        new Swiper(".productswiper", {
                            touchRatio: 0.5,
                            autoplay: 3000,
                            pagination: '.swiper-pagination',
                            autoplayDisableOnInteraction: false
                        });
                    })
                    this.brand = res.data.data.brand_id;
                    // this.$store.state.commodity_data = res.data.data; 
                    this.$store.state.commodity_val = 1;
                    this.$store.state.goodsId=res.data.data.goods_id
                    this.$store.state.id=res.data.data.id
                    this.matchGood(this.$store.state.commodity_data.goods_id);
                    this.shopInfo();
                    this.guige = true;
                    this.load_wrap = false;
                //    this.p_id = res.data.data.goods.id;
                    this.p_id = res.data.data.goods_id;
                    this.imgTextAjax();
                    
                    if(res.data.data.price_member || res.data.data.activity_price) {
                        this.activityPrice = res.data.data.activity_price
                        this.assemProData = { name: 'AP', priceMember: res.data.data.price_member, activityPrice: this.activityPrice }
                    }
                   
                    this.groupbuystartlimit = res.data.data.groupbuystartlimit
                    this.sheetNum = res.data.data.sheets_num;

                })
            },
            //获取用户评价内容
            /* 全部status = 4
           有图status = 3
           好评status = 5   level=2 好评
           中评tatus  = 5    level=1 中评
           差评tatus  = 5    level=0 差评*/
            getUserCon(){
                this.axios.post( this.$httpConfig.getAllCommentContent,qs.stringify(
                    {goods_id:this.$route.params.goodId  ,status:5, level:2, token: sessionStorage.getItem("data_token")}

                    )).then((res) => {
                        this.PraiseList=res.data.data.records
                        if(res.data.data !== "") {
                            this.countTotal = res.data.data.countTotal
                        }
                }).catch((err) => {
                    console.log(err);
                });
            },
            //去参团  未拼满的团购列表
            goAssemble(){
                this.axios.post(this.$httpConfig.Assemble , qs.stringify({id: this.$route.params.id, token: sessionStorage.getItem("data_token")})).then((res) => {
                    if(res.data.data !== null) {
                        this.AssembleList =res.data.data.groupBuylist;
                        this.AssembleCount = res.data.data.totalPerson;
                        this.cativityNum=res.data.data.groupBuylist.length
                        // for(var i=0;i<this.AssembleList.length;i++){
                            this.computationTime(this.AssembleList[0].end_time)
                        // }
                    }
                })
            },

            //秒杀剩余剩余时间
            computationTime(timestamp) {
                let that = this;
                // this.timer = setInterval(function() {
                //     let t = null;
                //     var now = new Date();
                //     var now_Time = now.getTime();
                //     t = timestamp*1000 - now_Time;
                //     let hour = Math.floor(t / 3600000)%24;
                //     let min = Math.floor((t / 60000) % 60);
                //     let sec = Math.floor((t / 1000) % 60);

                //     hour = hour < 10 ? "0" + hour : hour;
                //     min = min < 10 ? "0" + min : min;
                //     sec = sec < 10 ? "0" + sec : sec;

                //     that.hour = `${hour}`;
                //     that.Minute = `${min}`;
                //     that.second = `${sec}`;
                //     that.counDtown.time=that.hour+":"+that.Minute+':'+ that.second
                // }, 1000);
                function component(x, v) {
                    return Math.floor(x / v);
                }
                
                this.timer = setInterval(function() {
                    timestamp--;
                    var days    = component(timestamp, 24 * 60 * 60),
                    hour   = component(timestamp,      60 * 60) % 24,
                    min = component(timestamp,           60) % 60,
                    sec = component(timestamp,            1) % 60;
                    
                    hour = hour < 10 ? "0" + hour : hour;
                    min = min < 10 ? "0" + min : min;
                    sec = sec < 10 ? "0" + sec : sec;
                    that.hour = `${hour}`;
                    that.Minute = `${min}`;
                    that.second = `${sec}`;
                }, 1000);
            },
            reduce() {
                if (this.number <= 1) return;
                this.number--;
            },
            plus() {
                if (this.number >= this.data.minStock)
                    return;
                this.number++;
            },
            getCouponList() {
                // couponList
                // goods_id: this.$route.params.id
                this.$HTTP(this.$httpConfig.CouponSendList, {store_id: this.$store.state.commodity_data.goods.store_id}, 'post').then((res) => {
                    if (res.data.status == 1) {
                        this.couponList = res.data.data.records
                    }
                })
            },
            getMarkupBugList() { //获取加价购商品列表
                this.$HTTP(this.$httpConfig.markupBuy, {goods_id: this.$route.params.id}, 'post').then((res) => {
                    if (res.data.status == 1) {
                        this.markupBugList = res.data.data;
                    }
                })
            },
            fenxiang() {
                this.shareFlag = !this.shareFlag
            },
            off() {
                this.popupVisible = false
            },
            getAAddress(){
                this.address=  session.getAttribute
            }
        },
        mounted() {

            this.$store.state.goodId=this.$route.params.goodId
            this.goAssemble();
            this.$store.state.selectionSpec = [];
            this.$route.params.status=5
            $('html,body').animate({
                scrollTop: '0px'
            }, 100);
            var that = this;
            $(window).scroll(function () {
                if (!that.currentTab) {
                    that.headBackgroundColor.backgroundColor = "rgba(255,255,255," + $(window).scrollTop() / 200 + ")";
                    that.tabOpacity.opacity = $(window).scrollTop() / 400;
                    if (that.btnOpacity.opacity < 0) {
                        that.btnOpacity.display = 'none'
                        that.btnOpacity1.display = ''
                        that.btnOpacity1.opacity = $(window).scrollTop() / 200
                        that.btnOpacity.opacity = 1 - $(window).scrollTop() / 100
                    } else {
                        that.btnOpacity1.display = 'none'
                        that.btnOpacity.display = ''
                        that.btnOpacity.opacity = 1 - $(window).scrollTop() / 100
                    }
                    if ($(window).scrollTop() <= 0) {
                        that.btnOpacity1.display = 'none'
                        that.btnOpacity.display = ''
                    }
                }
            });
            this.getUserCon();
            this.getGoodINfo();
            this.myLove();
            this.spec();
            this.getAddress();
            // this.getCouponList();
            //this.getMarkupBugList();

            this.productAjax();
            // this.comContent();
        },
        destroyed() {
            this.scrollWatch = false;
        },
        components: {
            //PrHeader,
            Shopsn,
            prList,
            FootBtn,
            shopInfor,
            PageOption,
            detailOption,
            CountDown,
            markupBuy,
            DropDownRefresh,
            PullUpReload,
            share,
            getCoupon
        }
    }
</script>
<style>
    body {
        background: #fff;
    }

    .detailimg {
        height: 100%;
    }

    .detailimg img {
        width: 100%;
    }

    .swiper-pagination-bullet-active {
        background: #a22d2b !important;
    }

    #pic_article {
        padding-bottom: 1rem;
    }
</style>
<style lang="less" scoped>

    .coupon_box {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1;
      .box_main {
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
                color: #d02629;
                font-size: .21rem;
                margin: .1rem 0 0 0;
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
    .product {

    }

    .refreshMoudle {
        background: #fff;
    }

    .swiper-container {
        width: 100%;
        height: 6.22rem;

        .home-banner-img {
            width: 100%;
            height: 100%;
        }

    }

    .img {
        img {
            width: 100%;
        }
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

    .fenge {
        height: 15/100rem;
        background-color: #F1F1F1;
    }

    .pull-up {
        background: #ffffff;
        text-align: center;
        color: #888888;

        p {
            font-size: .3rem;
        }

        img {
            width: .8rem;
        }

        .rotate {
            transform: rotate(180deg);
        }
    }

    .header {
        position: fixed;
        width: 96%;
        top: 0;
        left: 0;
        height: .9rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2%;
        z-index: 1;

        .return, .return1 {
            background: url("../../assets/arrow1@2x.png");
            background-size: cover;
            width: .5rem;
            height: .5rem;
        }

        .return1 {
            background: url("../../assets/fanhui.png");
            background-size: cover;
            width: .3rem;
            height: .5rem;
        }

        .share, .share1 {
            background: url("../../assets/share1@2x.png");
            background-size: cover;
            width: .5rem;
            height: .5rem;
        }

        .share1 {
            background: url("../../assets/share3@2x.png");
            background-size: cover;
            width: .4rem;
            height: .4rem;
        }

        .tab {
            height: .5rem;
            display: flex;
            width: 2rem;
            border-radius: .1rem;
            opacity: 0;

            > div {
                width: 1rem;
                text-align: center;
                line-height: .5rem;
                box-sizing: border-box;
                background: #fff;
                border: 1px solid #b0b0b0;
            }

            .active {
                background: rgb(295,149,54);
                color: white;
                border: none;
            }

            > div:nth-child(1) {
                border-radius: .1rem 0 0 .1rem;
            }

            > div:nth-child(2) {
                border-radius: 0 .1rem .1rem 0;
                border-left: none;
            }
        }
    }

    .store-activity {
        border-top: 1px solid #ececec;
        padding: .3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        > div:nth-child(1) {
            font-size: .3rem;
            font-weight: bold;
        }

        > div:nth-child(2) {
            width: 1.2rem;
            height: .5rem;
            text-align: center;
            line-height: .5rem;
            background: #ff9536;
            color: #ffffff;
            font-size: .26rem;
            border-radius: .4rem;
        }
    }

    .describe {
        padding: .2rem .2rem .15rem .2rem;
        position: relative;
        background-color: #ffffff;
        margin-bottom: .2rem;

        .fn {
            font-size: .31rem;
            color: #000;
            padding-top: .25rem;
            /*width: 60%;*/
            /*overflow: hidden;*/
            /*text-overflow: ellipsis;*/
            /*white-space: nowrap;*/
            display: -webkit-box;
            overflow: hidden;
            white-space: normal !important;
            text-overflow: ellipsis;
            line-height: .4rem;
            word-wrap: break-word;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }

        .equity {
            display: flex;
            height: .7rem;
            margin-top: .3rem;
            align-items: center;
            justify-content: space-between;
            background: #f8f5ef;
            color: #333333;
            padding: 0 .2rem;

            .left, .right {
                display: flex;
                align-items: center;
            }

            .left:before {
                content: '';
                background: url("../../assets/activity/crown@2x.png");
                background-size: cover;
                width: .45rem;
                height: .4rem;
                margin-right: .1rem;
            }

            .right:after {
                content: '';
                background: url("../../assets/btn-right.png");
                width: .14rem;
                height: .24rem;
                background-size: cover;
                margin-left: .1rem;
            }
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
                padding-bottom: .2rem;

                .icon {
                    width: .4rem;
                    height: .4rem;
                    background: url(../../assets/integral.png) no-repeat;
                    background-size: 100% 100%;
                    margin-right: .2rem;
                }
            }

            .new {
                padding: 0;
            }
        }

        .price {
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-top: .2rem;

            .price1 {
                display: flex;
                align-items: flex-end;
            }

            .orc {
                color: #ff9536;
                font-weight: bold;
                font-size: .32rem;
                margin-right: .15rem;

                em {
                    font-style: normal;
                    font-size: .4rem;
                }
            }

            .lin-tho {
                text-decoration: line-through;
                color: #999999;
                font-size: .26rem;
            }

            .new {
                color: #0f0f0f;
                font-size: .3rem;
                padding-left: .1rem;
            }

            .integral {
                color: #a0a0a0;
                font-size: .24rem;
                display: block;
            }

            img {
                display: inline-block;
                width: .9rem;
                vertical-align: middle;
                margin-bottom: .1rem;
                margin-left: .1rem;
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

    .describe1 {
      padding: 0 0.2rem 0.35rem 0.2rem;
      position: relative;
      background-color: #f1f1f1;
      .fn {
        font-size: 0.32rem;
        color: #333;
        padding-top: 0.3rem;
        line-height: 0.5rem;
        display: -webkit-box;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .description-fn{
        font-size: 0.28rem;
        color: red;
        padding-top: 0.1rem;
        line-height: 0.5rem;
        display: -webkit-box;
        overflow: hidden;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .timer {
        font-size: 0.25rem;
        color: #e02828;
        padding: 0.3rem 0;
        .newPos {
          color: #f1302b;
        }
      }
      .price.active {
        .orc {
          line-height: 0.4rem;
          padding-bottom: 0.2rem;
          .icon {
            width: 0.4rem;
            height: 0.4rem;
            background: url(../../assets/integral.png) no-repeat;
            background-size: 100% 100%;
            margin-right: 0.2rem;
          }
        }
        .new {
          padding: 0;
        }
      }
      .price {
        padding-top: 0.2rem;
        .orc {
          color: #e02828;
          font-size: 0.32rem;
          em {
            font-style: normal;
            font-size: 0.48rem;
          }
        }
        .new {
          color: #757575;
          font-size: 0.25rem;
          padding-left: 0.2rem;
          s {
            font-size: 0.24rem;
          }
        }
        .report {
          float: right;
          font-size: .28rem;
          color: red;
        }
      }
      .share {
        position: absolute;
        right: 0.2rem;
        top: 0.3rem;
        text-align: center;
        .icon {
          display: block;
          width: 0.39rem;
          height: 0.42rem;
          background: url(../../assets/share.png) no-repeat;
          background-size: 100% 100%;
        }
        p {
          font-size: 0.24rem;
          color: #555;
          line-height: 0.5rem;
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

    .delivery {
        padding: .3rem .5rem .3rem .2rem;
        background: #ffffff;
        border-top: 1px solid #f1f1f1;
        position: relative;

        .message {
            display: flex;
            margin-bottom: .1rem;

            span:nth-child(1) {
                font-size: .28rem;
                margin-right: .2rem;
                color: #a6a6a6;
            }

            .address {
                > div:nth-child(1) {
                    font-weight: bold;
                    font-size: .3rem;
                    color: #333;
                }

                > div:nth-child(2) {
                    font-size: .26rem;
                    color: #a6a6a6;
                }
            }

            span:nth-child(2) {
                font-size: .3rem;
                color: #000000;
            }
        }

        .tips {
            padding-left: .8rem;
            color: #888888;
        }

        /*.message:after {*/
        /*position: absolute;*/
        /*content: '';*/
        /*right: .3rem;*/
        /*top: .4rem;*/
        /*width: .14rem;*/
        /*height: .24rem;*/
        /*background: url(../../assets/btn-right.png) no-repeat;*/
        /*background-size: 100% 100%;*/
        /*}*/
    }

    .assemble-list{
        .title{
            padding: .2rem;
            font-size: .24rem;
            color: #959595;
        }

        .assemble{
            width: 96%;
            margin: 0 auto;
            border-top: 1px solid #f1f1f1;
            padding: .1rem 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .left{
                display: flex;
                align-items: center;
                font-size: .32rem;
                color: #333333;
                img{
                    width: .8rem;
                    height: .8rem;
                    border-radius: 50%;
                    margin-right: .15rem;
                }
            }

            .right{
                display: flex;
                align-items: center;
                .time-num{
                    >div:nth-child(1){
                        font-size: .28rem;
                        span{
                            font-size: .28rem;
                            color: #ff9536;
                        }
                        line-height: .25rem;
                        margin-top: .1rem;
                    }
                    >div:nth-child(2){
                        font-size: .26rem;
                        color: #8c8c8c;
                    }
                }
                .btn{
                    width: 1.4rem;
                    height: .6rem;
                    color: #ffffff;
                    background: #ff9536;
                    border-radius: .1rem;
                    font-size: .28rem;
                    text-align: center;
                    line-height: .6rem;
                    margin-left: .1rem;
                }
                .btnedit{
                    width: 2.4rem;
                    height: .6rem;
                    color: #ffffff;
                    background: #ff9536;
                    border-radius: .1rem;
                    font-size: .28rem;
                    text-align: center;
                    line-height: .6rem;
                    margin-left: .1rem;
                }
            }
        }


    }

    .user-evaluation{
        padding: 0 4%;
        .title{
            display: flex;
            justify-content: space-between;
            padding: .3rem 0;
            >div:nth-child(1){
                font-size: .26rem;
            }
            >div:nth-child(2){
                display: flex;
                align-items: center;
                font-size: .26rem;
                color: #a6a6a6;
            }
            >div:nth-child(2):after{
                content: '';
                background: url("../../assets/btn-right.png");
                background-size: cover;
                width: .14rem;
                height: .24rem;
                margin-left: .2rem;
            }
        }

        .evaluate{
            padding: .2rem;
            border-bottom: 1px solid #dfdfdf;
            .name{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left{
                    display: flex;
                    font-size: .26rem;
                    color: #b0b0b0;
                    img{
                        width: .35rem;
                        margin-right: .1rem;
                    }
                }
                .right{
                    img{
                        width: .3rem;
                    }
                }
            }
            .content{
                font-size: .24rem;
                color: #333333;
                margin-top: .15rem;
            }
            .evaluate-img{
                display: flex;
                flex-wrap: wrap;
                margin-top: .2rem;
                img{
                    width: 1rem;
                    height: 1rem;
                    margin-right: .2rem;
                    margin-bottom: .2rem;
                }
            }
            .specs{
                margin-top: 0.1rem;
                display: flex;
                align-items: center;
                font-size: .24rem;
                color: #999999;
                flex-wrap: wrap;
                >div{
                    margin-right: .25rem;
                }
            }
        }
    }

    .selected {
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

    .shop-message{
        padding: .2rem .3rem .2rem .2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left{
            display: flex;
            align-items: center;
            .shop-img{
                border:1px solid #dfdfdf ;
                margin-right: .1rem;
                img{
                    width: 1.2rem;
                    height: 1.2rem;
                }
            }

            .shop-name{
                font-size: .3rem;
                color: #333333;
            }

            .evaluate{
                display: flex;
                align-items: center;
                margin-top: .1rem;
                .star-num{
                    display: flex;
                    align-items: center;
                    img{
                        width: .27rem;
                        height: .27rem;
                        margin-right: .07rem;
                    }
                }

                >div:nth-child(2){
                    color: #ec6d2d;
                    font-size: .26rem;
                    font-weight: bold;
                }

                >div:nth-child(3){
                    color: #555555;
                    font-size: .28rem;
                    font-weight: bold;
                    margin-left: .3rem;
                }
            }


        }
    }
    .shop-message:after{
        content: '';
        width: .14rem;
        height: .24rem;
        background: url(../../assets/btn-right.png) no-repeat;
        background-size: 100% 100%;
    }

    .brilliant-comments{
        padding: 0 2%;
        .title{
            font-size: .3rem;
            font-weight: bold;
        }
        .shop-nav{
            display: flex;
            margin-top: .2rem;
            flex-wrap:wrap ;
            span{
                display: inline-block;
                padding: 0 .25rem;
                background: #ededed;
                font-size: .26rem;
                height: .6rem;
                line-height: .6rem;
                border-radius: .6rem;
                margin-right: .3rem;
                margin-bottom: .2rem;

            }
            .active{
                background: #ffefe0;
                color: #ff9536;
            }
        }
        .comment-list{
            margin-top: .2rem;
            .comment{
                display: flex;
                margin-bottom: .1rem;
                border-bottom: 1px solid #f1f1f1;
                .header-img{
                    width: .8rem;
                    height: .8rem;
                    border-radius: 50%;
                    margin: 0 0.2rem;
                }
                .message{
                    flex: 1;
                    .name{
                        color: #1e4c72;
                        font-size: .28rem;
                        font-weight: bold;
                    }

                    .time{
                        font-size: .24rem;
                        color: #999999;
                    }

                    .evaluate{
                        display: flex;
                        align-items: center;
                        margin-top: .1rem;
                        .star-num{
                            display: flex;
                            align-items: center;
                            img{
                                width: .25rem;
                                height: .25rem;
                                margin-right: .07rem;
                            }
                        }

                        >div:nth-child(2){
                            color: #ec6d2d;
                            font-size: .26rem;
                            font-weight: bold;
                        }

                        >div:nth-child(3){
                            color: #555555;
                            font-size: .26rem;
                            font-weight: bold;
                            margin-left: .3rem;
                        }
                    }

                    .content{
                        color: #333333;
                        font-size: .26rem;
                        width: 100%;
                        display: -webkit-box;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        -webkit-line-clamp:2;
                        -webkit-box-orient: vertical;
                        margin-top: .05rem;
                    }
                    .img-list{
                        display: flex;
                        flex-wrap: wrap;
                        margin-top: .1rem;
                        img{
                            width: 1.9rem;
                            height: 1.9rem;
                            margin-right: .1rem;
                            margin-bottom: .1rem;
                            border-radius: .15rem;
                        }
                    }
                }
            }
        }
        .comment-more{
            display: flex;
            height: 1rem;
            align-items: center;
            justify-content: space-between;
            font-size: .28rem;
            padding: 0 .4rem;
            img{
                width:.15rem;
            }
        }
    }

    .selected {
        padding: .1rem .5rem .1rem .2rem;
        min-height: .8rem;
        line-height: .8rem;
        font-size: .28rem;
        color: #a6a6a6;
        position: relative;
        background: #fff;
        border-top: 1px solid #f1f1f1;

        .title {
            font-size: .28rem;
            margin-right: .2rem;
        }

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

        .left {
            font-size: .28rem;
            display: flex;
            align-items: center;

            .coupon {
                width: 2.5rem;
                height: .5rem;
                background: url("../../assets/coupon.png");
                background-size: cover;
                color: #fff;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                line-height: .5rem;
                font-size: .3rem;
                margin-left: .2rem;

            }
        }

    }

    .mint-swipe {
        height: 6.22rem;

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
    .groupBuy {
        background:#fff8f0;
        .groupBuy1 {
            padding: 10px 10px 0;
            height: 20px;
            line-height: 1;
            color: #ff911b;
            font-size: 14px;
            position: relative;
            background-color: #fff8f0;
            text-align: center;
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            -webkit-box-pack: justify;
            justify-content: space-between;
        .notHas{
            padding : 0 0 0.2rem 0.1rem;
            font-size : 0.26rem;
        }
        }
        .groupBuy2 {
            .licss {
                position: relative;
                z-index: 1;
                display: flex;
                -webkit-box-align: center;
                align-items: center;
                padding: 10px;
                min-height: 59px;
                box-sizing: border-box;
                justify-content: space-between;
            }
            .divimg {
                margin-right: 10px;
                width: 40px;
                height: 40px;
                border-radius: 40px;
                overflow: hidden;
            }
            .imgcss {
                display: block;
                width: 100%;
                height: auto;
            }
            .btncss {
                margin-left: 10px;
                width: 86px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-size: 14px;
                color: #fff;
                background-image: linear-gradient(270deg,#ff4142,#ff4b2b);
                border-radius: 15px;
            }
            .p1 {
                padding-right: 30px;
            }
            .p2 {
                text-align: right; 
                display: flex; 
                flex-direction: column;
                .success{
                    font-size : 1em;
                    color: #ff911b;
                }
            }
            .rightDiv {
                display: flex; 
                align-items: center;
            }
            .emcss {
                color: #ff4142;
            }
            .remain_time {
                // font-family: Helvetica;
                font-family : "微软雅黑";
                display: block;
                font-size: 10px;
                color: #999;
                line-height: 1;
            }
        }
    }
    .groupBuyCon2 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 10px;
        border-radius: 15px;
        background: chocolate;
        // background-image: url("../../assets/images/jj@3x.png");
        .leftDiv {
            display: flex;
            align-items: center;
            .imgGroup {
                display: flex;
                position: relative;

                position: absolute; // for loop
                margin-left: 10px; // for loop
                .divimg {
                    width: 30px;
                    height: 30px;
                    border-radius: 30px;
                    overflow: hidden;

                    margin-left: -10px; // for loop
                }
                .imgcss {
                    display: block;
                    width: 100%;
                    height: auto;
                }

                .divimg1 {
                    width: 30px;
                    height: 30px;
                    border-radius: 30px;
                    overflow: hidden;

                    position: absolute;
                    left: 20px;
                }
                .divimg2 {
                    width: 30px;
                    height: 30px;
                    border-radius: 30px;
                    overflow: hidden;

                    position: absolute;
                    left: 40px;
                }
                .divimg3 {
                    width: 30px;
                    height: 30px;
                    border-radius: 30px;
                    overflow: hidden;

                    position: absolute;
                    left: 60px;
                }
                .divimg4 {
                    width: 30px;
                    height: 30px;
                    border-radius: 30px;
                    overflow: hidden;

                    position: absolute;
                    left: 80px;
                }
            }   
            .btncss1 {
                width: 130px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-size: 14px;
                color: #fff;
                background-image: linear-gradient(270deg,#ff4142,#ff4b2b);
                border-radius: 15px;
                margin-left: 50px;

                margin-left: 80px; // for loop
                position: static; // for loop
            } 
        }
        .textcss {
            color: #ff4b2b;
        }
    } 
    .mint-popup-bottom{
        width: 100%;
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
        height:7rem;
        overflow: hidden;
        overflow-y: scroll;
        width: calc(100% + 30px);
        margin-bottom: 50px;
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

    .mint-popup.mint-popup-4.mint-popup-bottom {
        z-index: 0;
    }
</style>

<!--
groupBuy reference
https://m.jingxi.com/item/view?sku=72173205358&_fd=jdm&_jxgy=1&cover=//img10.360buyimg.com/mobilecms/s345x345_jfs/t1/141914/15/4324/78076/5f263c63ebdc71701/9074a3af8f0abaff.jpg!q70.dpg.webp&ispg=1&pps=pinlike.FO4O305:FOFODO13OD:FOFO8O223O53O2FOEO2166FO016O10CDDBB76E3EF4B576B8DF9F41&ptag=138631.89.2&sceneval=2&jxsid=16068963977759480212
-->
