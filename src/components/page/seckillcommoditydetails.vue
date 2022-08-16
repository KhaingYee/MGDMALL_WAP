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
                        <div class="swiper-slide" v-for="(item,index) in images" :key="index">
                            <!--<img class="home-banner-img"
                                 :src="URL + item.pic_url"/>-->
                            <img class="home-banner-img"
                                 src="../../assets/cp.png" />
                        </div>

                    </div>
                    <div class="swiper-pagination"></div>
                </div>
                <div class="divposition">
                    <div class="dleft">整点秒杀</div>
                    <div class="dright">
                        <p class="ptext">距结束仅剩</p>
                        <p class="pnum">{{day}}天{{hour}}时{{Minute}}分{{second}}秒</p>
                    </div>
                </div>
                <div class="describe" v-if="$store.state.commodity_data">
                    <p class="fn">{{$store.state.commodity_data.title}}</p>
                    <div class="price">
                        <div class="price1">
                            <span class="orc">￥{{$store.state.commodity_data.activity_price}}</span>
                            <span class="lin-tho">￥{{$store.state.commodity_data.price_member}}</span>
                        </div>
                        <span class="integral">购买可获得9积分</span>
                    </div>
                    <!--<div v-else style="color: #ff0000;font-size: 0.34rem;font-weight: bold;">价格登录可见</div>-->
                </div>
                <!--地址-->
                <div class="delivery" @click="selectAddress">
                    <div class="message">
                        <span>配送</span>
                        <div>{{shopAddressL}}</div>
                    </div>
                </div>
                <div class="fenge"></div>
                <!--加价购-->
                <markup-buy v-if="markupBugList.length != 0" :markupBug="markupBugList" ></markup-buy>
                <!-- 搭配套餐推荐 -->
                <div> </div>
                <pr-list ref="borther" v-show="$store.state.matchGood" :conItem="conItemRe" :storeId="shopData.id" :val="1"
                         :data="$store.state.matchGood"></pr-list>


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
        <foot-btn :state="sonState" :Number="$store.state.commodity_val" :data="$store.state.commodity_data" 
                  @reduce="reduce" @plus="plus" :money='this.$route.params.money' :k_staus="k_staus"></foot-btn>
        <share @change="fenxiang" :state="shareFlag"></share>
        <!--领取优惠券弹窗-->
        <getCoupon @change="changeCouponState" :isfreight="freight" @receiveSuccess="receiveSuccess"
                   :couponList="couponList" :state="couponFlag"></getCoupon>
    </div>
</template>
<script>
    // import PrHeader from '@/components/page/children/shop_header.vue'; // 头部
    import $ from 'jquery';
    import prList from './children/list.vue'; //猜你喜欢和搭配套餐
    import FootBtn from './children/footBtn.vue'; // 底部按钮
    import PageOption from './children/pageOption.vue';
    import getCoupon from '@/components/product/children/getCoupon';
    import markupBuy from './children/markupBuy.vue'; //加价购
    import shopInfor from './children/shopInfor.vue'; // 店铺信息
    import detailOption from './children/detailOptions.vue'; // 立即购买 || 加入购物车 弹框
    import Shopsn from './Shopsn.vue';
    import share from './children/share';
    import DropDownRefresh from '@/components/product/children/DropDownRefresn'; // 上拉刷新组件
    import PullUpReload from '@/components/product/children/PullUpReload'; //下拉组件
    import qs from 'qs';
    import Swiper from 'swiper';
    import 'swiper/dist/css/swiper.min.css';
    import {Popup} from 'mint-ui';
    import CountDown from 'vue2-countdown'

    export default {
        name: 'product',
        data() {
            return {
                //是否显示状态条
                showIndicators: true,
                //初始轮播切换索引
                defaultIndex: 0,
                //轮播是否循环播放
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
                    title: '套餐购'
                },
                k_staus:5,
                shopAddressL:'',
                pullUpState: true,
                scrollWatch: true,
                topStatus: '',
                loadTop1: {},
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
                packagecommodity:[],
                indexk:3,
                packageindex:'',
                day:0,
                hour:0,
                Minute:0,
                second:0,
                headParams: {
                    title: sessionStorage.getItem('titleKey'),
                    description: sessionStorage.getItem('updateDescription'),
                    keywords: sessionStorage.getItem('contentKey'),        
                }
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
            this.$store.state.const_join = false;
            this.$store.state.catr_number = 0;
            this.$store.state.goods_id = '';
            this.$store.state.matchGood = '';

        },
        methods: {
            //套餐够 中  更多按钮
            More(){
                if(this.indexk==3){
                    this.indexk=this.packagecommodity.length;
                }else{
                    this.indexk=3;
                }
            },
            //秒杀剩余剩余时间
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
            //去参团
            gobtn(index){ //
                this.$router.push("/puzzleSuccess");
            },
            recommend() {

            },
            goGoodsEvaluate(){
                this.$router.push({
                    name:'goodsevaluate'
                })
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
                sessionStorage.removeItem(('product_detail'));
                sessionStorage.removeItem(('ordinary_detail'));
                sessionStorage.removeItem(('order_detail'));
                sessionStorage.setItem('assemble_address', JSON.stringify({
                    id: this.$route.params.id,
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
            //套餐购  packageList
            matchGood(goodsid,storeid){
                this.axios.post(this.$httpConfig.packageList,qs.stringify({
                    goods_id:goodsid,
                    store_id:storeid,
                    token: sessionStorage.getItem("data_token")
                })).then((res) => {

                    if(res.data.status !=0){
                        this.$store.state.matchGood = res.data.data;
                        this.packagecommodity=res.data.data.goods;

                        this.packageindex=res.data.data.goods,length;
                    }

                    /*  if(this.packagecommodity3.length>3){
                          this.packagecommodity = this.packagecommodity.slice(0,3)
                      }*/
                })
            },
           /* matchGood(id) {
                this.$HTTP(this.$httpConfig.matchGood, {goods_id: id}, 'post').then((res) => {
                    this.$store.state.matchGood = res.data.data;
                })
            },*/
            shopInfo() {
                this.$HTTP(this.$httpConfig.shopInfo, {id: this.$store.state.commodity_data.store_id}, 'get').then((res) => {
                    this.shopData = res.data.data;
                    this.shopAddressL=res.data.data.address
                    this.getAddress();
                })
            },
            //商品详情
            getsckillmessage() {
                this.axios.post(this.$httpConfig.promotionGoodsDetail, qs.stringify({id: this.$route.params.id, token: sessionStorage.getItem("data_token")})).then((res) => {
                    if (res.data.data.cart_count) {
                        this.$store.state.catr_number = parseInt(res.data.data.cart_count);
                    }
                    this.brand = res.data.data.brand_id;
                    this.images = res.data.data.images;
                    this.$nextTick(() => {
                        new Swiper(".productswiper", {
                            touchRatio: 0.5,
                            autoplay: 3000,
                            pagination: '.swiper-pagination',
                            autoplayDisableOnInteraction: false
                        });
                    })
                    this.brand = res.data.data.brand_id;
                    this.sckillcommodity= res.data.data
                    this.computationTime(res.data.data.end_time)  //参数  结束时间
                    var goodsid=res.data.data.goods_id
                    var storeid=res.data.data.store_id
                    this.matchGood(goodsid,storeid)
                    this.$store.state.commodity_data = res.data.data;
                    this.$store.state.commodity_val = 1;
                    this.$store.state.goodsId=res.data.data.goodsId
                    this.$store.state.prom_id=res.data.data.prom_id
                    //this.matchGood(this.$store.state.commodity_data.id);

                    this.p_id = res.data.data.id;
                    this.shopInfo();
                    this.guige = true;
                    this.load_wrap = false;



                    this.imgTextAjax();
                })
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
                this.$HTTP(this.$httpConfig.couponList, {goods_id: this.$route.params.id}, 'post').then((res) => {
                    if (res.data.status == 1) {
                        this.couponList = res.data.data
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
            stus(){
                this.$route.params.status=6
            }
        },
        mounted() {
            this.stus();
            this.$store.state.selectionSpec = [];  //规格数据
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


            this.getsckillmessage();
            this.myLove();
            this.spec();
            this.getAddress();
            //this.getCouponList();
            //this.getMarkupBugList();
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

    .product {

    }

    .refreshMoudle {
        background: #fff;
    }

    .swiper-container {
        width: 100%;
        height: 6.22rem;
        .swiper-wrapper{

        }
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
    .divposition{
        margin-top: -1rem;
        background: rgba(255,149,54,0.6);
        width: 100%;
        height: 1rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .dleft{
            margin-left: 0.2rem;
            font-size: 0.5rem;
            color: white;
            height: 1rem;
            line-height: 1rem;
        }
        .dright{
            margin-right: 0.6rem;
            display: flex;
            color: white;
            flex-direction: column;
            .ptext{
                margin-top: 0.15rem;
                font-size: 0.28rem;
            }
            .pnum{
                margin-top: 0.1rem;
                font-size: 0.28rem;
            }
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
                background: #ff9536;
                color: #fff;
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
            font-size: .36rem;
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
                font-size: .22rem;
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
            flex-direction: row;

            .coupon {
                display: flex;
                flex-direction: row;
                color: #a6a6a6;
                text-align: center;
                line-height: .5rem;
                font-size: .3rem;
                margin-left: .4rem;
                span{
                    height: 0.8rem;
                    line-height: .8rem;
                    display: inline-block;
                    color: #ff9536;

                }

                .mj{
                    height: 0.8rem;
                    line-height: .8rem;
                    display: inline-block;
                    margin-left: 0.2rem;
                }
                .yhjp{
                    margin-right: 0.2rem;
                    margin-top: 0.2rem;
                    width: 2.2rem;
                    height: 0.4rem;
                    line-height: 0.4rem;
                    text-align: center;
                    font-size: 0.2rem;
                    background: url("../../assets/activity/msyh2.png") no-repeat;
                    background-size: 100% 100%;
                    color: #fee7d8;
                }
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
</style>
