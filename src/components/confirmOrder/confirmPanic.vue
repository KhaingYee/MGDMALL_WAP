<template>
    <div class="order-wrap">
        <!-- 从商品详情直接进入订单 -->
        <!-- <div v-title data-title="确认订单">确认订单</div> -->
        <order-header :text="title" :btn="btn"></order-header>
        <div class="inf-header" @click="tolink('address')">
            <div v-if="rec_address">
                <div class="inf-name clearfix">
                    <div class="name fl"><span></span>{{rec_address.realname}}</div>
                    <div class="phone fr"><span></span>{{rec_address.mobile}}</div>
                </div>
                <div class="address" v-if="show_addres">
                    {{rec_address.prov+"-"+rec_address.city+"-"+rec_address.dist+"-"+rec_address.address}}
                </div>
                <div class="address" v-else>
                    {{rec_address.prov_name+"-"+rec_address.city_name+"-"+rec_address.dist_name+"-"+rec_address.address}}
                </div>
            </div>
            <div class="status text-center" v-if="!rec_address">您还没有填写收货地址，请填写！</div>
            <span class="btn-right"></span>
        </div>
        <div class="bottom-bg"><img src="../../assets/bottom-bj.jpg"></div>
        <!-- 单个商品 -->
        <ul class="mark-wrap">
            <li class="header"><img :src="URL + store.store_logo" alt="" /><span>{{store.shop_name}}</span></li>
            <li class="clearfix" id="store">
                <img :src="URL + goods_data.pic_url " class="fl">
                <div class="pull-right fl">
                    <p class="text">{{goods_data.title}}</p>
                    <p class="price-wrap clearfix">
                        <span class="fl price">￥<span>{{goods_data.price_member}}</span></span>
                        <span class="number fr">X{{goods_data.goods_num}}</span>
                    </p>
                </div>
            </li>
            <li class="promotion-all" v-if="progive || reduce">
				<div class="promotion-card" v-for="(item,index) in progive" :key="index" v-if="progive.length != 0">
					<div class="promotion-title" v-if="item.name">{{item.name}}</div>
					<img :src="URL + item.pic_url" class="promotion-img">
					<div class="promotion-num" v-if="item.give_num != 0 && item.give_num != null">x{{item.give_num}}</div>
					<div class="promotion-detail">购满￥{{ item.full }}送赠品，数量{{item.give_count}}赠完即止</div>
				</div>
				<div class="promotion-card"  v-if="reduce.length != 0">
					<div class="promotion-title" v-if="reduce.promotion_name">{{reduce.promotion_name}}</div>
					<div class="promotion-detail">单笔订单满￥{{ reduce.expense }}，立减￥{{reduce.cut}}</div>
				</div>
			</li>
            <li>
                <div class="dist-wrap">
                    <!-- <div class="hd active clearfix" >
                        <div class="title fl">配送方式</div>
                        <div class="busi fr">顺丰包邮</div>
                    </div> -->

                    <!--<div class="hd clearfix" @click="selectCoupon(goods_data.store_id, 0)" v-if="$route.params.id != 3">-->
                        <!--<div class="title fl">选择优惠券</div>-->
                        <!--<div class="busi fr">{{$store.state.select_coupon.name}}</div>-->
                    <!--</div>-->
                    <div class="hd clearfix" @click="tolink('/invoice',goods_data.store_id)" >
                        <div class="title fl">开具发票</div>
                        <div class="busi fr" v-if="show[0] == 1">已开发票</div>
                        <div class="busi fr" v-else>无需发票</div>
                    </div>
                    <div class="dd">
                        <div class="title">给商家留言：</div>
                        <textarea placeholder="选填：备注限字在45个字以内" oninput="if(value.length>45)value = value.slice(0,45)" v-model="message"></textarea>
                        <p class="ind">共 <span>{{goods_data.goods_num}}</span> 件商品</p>
                    </div>
                </div>
            </li>
        </ul>
        <div class="price-set-wrap">
            <div class="total price clearfix">
                <span class="fl">税前商品总额</span>
                <span class="fr">￥{{goods_data.price_member * goods_data.goods_num}}</span>
            </div>
            <!--<div class="freight price clearfix">-->
                <!--<span class="fl">优惠券</span>-->
                <!--<span class="fr">-&nbsp;&nbsp;￥{{$store.state.const_coupon_price}}</span>-->
            <!--</div>-->
            <div class="tax price clearfix">
				<span class="fl">{{cartDis.memberLevel}}:</span>
				<span class="fr">&nbsp;&nbsp;{{Number(cartDis.discount)/10}} 折优惠</span>
			</div>
            <div class="tax price clearfix">
                <span class="fl">税金</span>
                <span class="fr">￥0</span>
            </div>
            <div class="tax price clearfix" v-if="money == -1">
                <span class="fl">配送共计</span>
                <span class="fr">免配送费</span>
            </div>
            <div class="tax price clearfix" v-else-if="money">
                <span class="fl">{{transport}}</span>
                <span class="fr">￥{{money}}</span>
            </div>
            <div class="tax price clearfix" v-else>
                <span class="fl">运费</span>
                <span class="fr" v-if="freight == 0">卖家包邮</span>
                <span class="fr" v-else>￥{{freight}}</span>
            </div>
            <div class="freight price clearfix">
				<span class="fl">满立减</span>
				<span class="fr" v-if="(goods_data.price_member * goods_data.goods_num) >= expense">-&nbsp;&nbsp;￥{{cut}}</span>
				<span class="fr" v-else>-&nbsp;&nbsp;￥0</span>
			</div>
        </div>
        <div class="footer-wrap">
            <div class="foot-seat"></div>
            <div class="footer clearfix" >
                <button class="fr btn" @click="toCashierAll">提交订单</button>
                <div class="fr money">
                    实付款&nbsp;:&nbsp;<span class="price">￥
                    <span v-if="money == -1">{{parseFloat(((Number(goods_data.price_member) * Number(goods_data.goods_num) * (Number(cartDis.discount)/100) - Number($store.state.const_coupon_price) - Number(cut))) ).toFixed(2)}}</span>
					<span v-else-if="money">{{parseFloat(((Number(goods_data.price_member) * Number(goods_data.goods_num) * (Number(cartDis.discount)/100) + Number(money) - Number($store.state.const_coupon_price)- Number(cut)))).toFixed(2)}}</span>
					<span v-else>{{parseFloat(((Number(goods_data.price_member) * Number(goods_data.goods_num) * (Number(cartDis.discount)/100) + Number(freight) - Number($store.state.const_coupon_price)- Number(cut)))).toFixed(2)}}</span>
					</span>
                </div>
            </div>
        </div>
        <detail-coupon ref="coupon"></detail-coupon>
        <Shopsn></Shopsn>
        <div class="load-wrap" v-show="load_wrap" @touchmove.prevent>
            <mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner>
        </div>
    </div>
</template>
<script>
    import orderHeader from '@/components/page/children/header.vue';
    import { Toast } from 'mint-ui';
    import Shopsn from '@/components/page/Shopsn.vue';
    import detailCoupon from '@/components/page/children/detailCouponPackage.vue'; // 优惠券 弹框
    import qs from 'qs';
    export default {
        name: 'order',
        data() {
            return {
                show_addres:true,
                rec_address:'',
                title: '抢购订单',
                btn: '', //头部客服按钮开关
                goods_data: {},
                newdata: '',
                scrollWatch: true,
                coupon: '请选择优惠券',
                coupon_id:'',
                realname: '',
                load_wrap: true,
                message: '', //留言
                invoice_status: 0,
                shoImg: '',
                goods: [],
                store: {},
                image: {},
                price: '',
                goods_item: [],
                total_price: '',
                product: '',
                data: [],
                address: '',
                freight: 0, //运费
                // isSubmit: 0, //是否能提交（如果不在指定区域则不能提交）
                id: [],
                totalPrice: '',
                total_prices: '',
                totalSingal: '',
                total: '',
                goodSingle: '',
                expense:0,
                cut:0,
                car: '',
                goodshop: '',
                totalShop: '',
                totalShops: '',
                quanlity:0,
                itegral:'',
                imgIn:'',
                prompt:'',
                invoiceGroup:{},
                show:[],
                status:'',
                delivery:'',
                money:'',
                cartDis: {},
                transport:'',
                headParams: {
                    title: sessionStorage.getItem('titleKey'),
                    description: sessionStorage.getItem('updateDescription'),
                    keywords: sessionStorage.getItem('contentKey'),        
                },
                progive: [],
                reduce:'',
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
            let title = "抢购订单" + '-' + sessionStorage.getItem('titleKey') + '-' + sessionStorage.getItem('updateDescription');
            this.showScroll.scrollTitle(title);
            this.getData();
            this.$store.state.const_coupon = false;
            this.$store.state.const_coupon_num = 0;
            this.$store.state.select_coupon.name = '请选择优惠券';
            this.$store.state.const_coupon_price = 0;
        },
        mounted(){
            this.itegral=JSON.parse(sessionStorage.getItem('integral_shop'))
            $("html,body").animate({scrollTop:'0px'},100);
        },
        methods: {
            //获取   店铺id 和 收货地址id
            getconfirmOrder(){
                this.axios.post(this.$httpConfig.requeryConfirmOrderId,qs.stringify({
                    store_id:this.goods_data.store_id,
                    token: sessionStorage.getItem("data_token"),
                    address_id:this.rec_address.id}),'psot').then((res) => {
                    this.delivery=res.data.data.delivery;
                    this.money=res.data.data.money;
                    this.transport=res.data.data.transport;
                    this.mechantdata=res.data.data;
                    this.status=res.data.status;
                }).catch((err) => {
                    console.log(err);
                })
            },
            selectCoupon(item,index){
                this.$refs.coupon.getCouponFun();
                this.$store.state.const_coupon_price_package_index = index;
                this.$store.state.const_coupon = true;
                this.$store.state.const_coupon_num = item;
            },
            enterIntoInteragl(){
                this.$router.push({
                    name: 'integralDetail',
                    params: {
                        id: this.itegral.id,
                        status:2
                    }
                })
            },
            //获取运费
            getFreight() {
                let data  = {
                    token: sessionStorage.getItem("data_token"),
                    prov_id : !this.rec_address.dist_id ? this.rec_address.prov : this.rec_address.prov_id,
                    city_id : !this.rec_address.dist_id ? this.rec_address.city : this.rec_address.city_id,
                    dist_id : !this.rec_address.dist_id ? this.rec_address.dist : this.rec_address.dist_id
                }
                this.axios.post(this.$httpConfig.getFreight, qs.stringify(data)).then((res) => {
                    if(res.data.status == 1){
                        this.freight = res.data.data;
                    }else{
                        Toast({
                            message: res.data.message,
                            duration: 1000
                        });
                        this.prompt = res.data.message;
                    }
                }).catch((err)=>{
                    Toast(err);
                })
            },
            //获取默认地址
            getAddress(){
                this.axios.post(this.$httpConfig.getDefault, qs.stringify({
                    token: sessionStorage.getItem("data_token")
                })).then((res) => {
                    if(res.data.status == 10001){
                        this.$router.push('/login');
                        return;
                    }
                    this.load_wrap = false;
                    if(res.data.data){
                        this.rec_address = res.data.data;
                        this.getconfirmOrder();
                    }else{
                        this.selectAddress()
                    }
                    if (res.data.data && sessionStorage.getItem('set_address')) {
                        this.selectAddress()
                    }
                    this.getFreight();
                }).catch((err) => {
                    console.log(err);
                })
            },
            //选取地址
            selectAddress(){
                this.rec_address = JSON.parse(sessionStorage.getItem('set_address'));
                this.show_addres = false;
            },
            //获取数据
            getData(){
                this.axios.post(this.$httpConfig.panicBuy, qs.stringify({
                    id : this.$route.params.good_id,
                    goods_num:this.$route.params.num,
                    token: sessionStorage.getItem("data_token")
                })).then((res) => {
                    if(res.data.status == 10001){
                        this.$router.push('/login');
                        return;
                    }
                    if(res.data.status == 1){
                        this.goods_data = res.data.data.goods;
                        this.store = res.data.data.store;
                        this.image = res.data.data.image;
                        this.cartDis = res.data.data.discount;
                        this.progive= res.data.data.promotion.gift.goods;
                        if(res.data.data.promotion.reduction) {
                            this.expense = res.data.data.promotion.reduction.expense;
                            this.cut = res.data.data.promotion.reduction.cut;
                            this.reduce = res.data.data.promotion.reduction;
                        }
                        this.getAddress();
                        if(sessionStorage.getItem('invoiceGroup')){
                            this.invoiceGroup = JSON.parse(sessionStorage.getItem('invoiceGroup'));
                            let listKey = Object.keys(this.invoiceGroup);
                            for (const i in listKey) {
                                if (this.invoiceGroup[listKey[i]]) {
                                    this.show[i]= this.invoiceGroup[listKey[i]].translate;
                                }
                            }
                        }else{
                            let invoiceData = {};
                            invoiceData[this.goods_data.store_id] = {translate:0};
                            this.invoiceGroup = invoiceData;
                        }
                    }
                }).catch((err) => {
                    console.log(err);
                })
            },
            clearData(){
                this.$store.state.type = null;
                this.$store.state.rise = null;
                this.$store.state.content = null;
                this.$store.state.type_id = '';
                this.$store.state.rise_id = '';
                this.$store.state.content_id = '';
                this.$store.state.invoice = false;
            },
            // 提交订单 单个商品购买
            toCashierAll() {
                if(this.prompt){
                    Toast({
                        message: this.prompt,
                        duration: 1000
                    });
                    return false;
                }
                if(this.money == -1){
                    var total = parseFloat(this.goods_data.price_member * this.goods_data.goods_num * Number(this.cartDis.discount)/100) - parseFloat(this.$store.state.const_coupon_price);
                }
                else if(this.money){
                    var total = parseFloat(this.goods_data.price_member * this.goods_data.goods_num * Number(this.cartDis.discount)/100) + parseFloat(this.money) - parseFloat(this.$store.state.const_coupon_price);
                }
                else{
                    var total = parseFloat(this.goods_data.price_member * this.goods_data.goods_num * Number(this.cartDis.discount)/100) + parseFloat(this.freight) - parseFloat(this.$store.state.const_coupon_price);
                }
                var b = parseFloat(total).toFixed(3);
                var _price = b.substring(0,b.toString().length - 1);  //这里先将a转换为float类型再保留三位小数，最后截取字符串前b.length - 1位
                if(!this.rec_address){Toast("请填写收货地址");return false;}
                this.axios.post(this.$httpConfig.orderBeginFromPanicGood, qs.stringify({
                    panic_id:this.$route.params.good_id,
                    goods_num:this.goods_data.goods_num,
                    price_sum:parseFloat(_price), //订单总价
                    address_id:this.rec_address.id, //收货地址ID
                    invoice_id:this.invoiceGroup, //发票id
                    remarks:this.message, //订单备注
                    platform:2, //平台 0 代表pc 1代表app 2 代表wap
                    distribution_fee:this.money ,//配送费
                    delivery:this.delivery,//配送方式
                    token: sessionStorage.getItem("data_token")
                    // translate:needs, //1需要发票，0不需要
                    // shipping_monery:this.freight, //运费
                    // invoice: [],//发票内容（json格式的二维数组）
                    // buyType:this.$route.params.id, //1：为购物车购买 2:为立即购买型
                    // coupon_id: this.coupon_id, //优惠券Id，没有优惠券传空
                })).then((res) => {
                    this.clearData();
                    sessionStorage.removeItem('invoiceGroup');
                    sessionStorage.removeItem('invoiceInit');
                    if(res.data.status == 1){
                        if(isNaN(this.money)==true){
                            this.money=0;
                        }
                        sessionStorage.setItem('pay_sourse','goods');
                        if(this.$route.params.auction) {
                            this.$router.push({
                                name: 'cashier',
                                params: {
                                    id: 1 ,//1为商品 3为积分兑换
                                    number: parseFloat(_price),
                                    auction: this.$route.params.auction
                                }
                            });
                        } else {
                            this.$router.push({
                                name: 'cashier',
                                params: {
                                    id: 1 ,//1为商品 3为积分兑换
                                    number : parseFloat(_price)
                                }
                            });
                        }
                    }else{
                        Toast({
                            message: res.data.message,
                            duration: 1000
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                })
            },
            tolink(to,id) {
                sessionStorage.removeItem('collocation_cart_id');
                sessionStorage.removeItem('collocation_info');
                sessionStorage.removeItem('integral_data');
                sessionStorage.removeItem('cart_id');
                sessionStorage.removeItem('set_meal_id');
                sessionStorage.removeItem('goods_data');
                sessionStorage.setItem('panic_data',JSON.stringify({id:this.$route.params.good_id,num:this.$route.params.num}));
                if(to == 'address') {
                    this.$router.push({
                        name: to,
                        params:{
                            status:1
                        }
                    });
                } else if(to = '/invoice') {
                    sessionStorage.removeItem('invoiceSign');
                    this.clearData();
                    this.$router.push({
                        name: 'invoice',
                        params:{
                            status:6, //1是商品 2是购物车
                            id:id //店铺id
                        }
                    });
                }else{
                    this.$router.push(to);
                }
            },
        },
        destroyed() {
            this.scrollWatch = false;
        },
        components: {
            orderHeader,
            Shopsn,
            detailCoupon
        }
    }
</script>
<style lang="less" scoped>
    .order-wrap {
        background: #f1f1f1;
        .inf-header {
            width: 7.1rem;
            height: 1.64rem;
            padding: 0 .2rem;
            background: #fff;
            position: relative;
            .status {
                font-size: .32rem;
                color: #666;
                line-height: 1.64rem;
            }
            .inf-name {
                padding: .3rem 0;
                color: #282828;
                .name {
                    font-size: .36rem;
                    padding-left: .44rem;
                    position: relative;
                    span {
                        position: absolute;
                        top: 50%;
                        left: 0;
                        width: .28rem;
                        height: .41rem;
                        background: url(../../assets/userIcon.png) no-repeat;
                        background-size: 100% 100%;
                        margin-top: -.205rem;
                    }
                }
                .phone {
                    font-size: .36rem;
                    padding-left: .38rem;
                    position: relative;
                    span {
                        position: absolute;
                        left: 0;
                        top: 50%;
                        margin-top: -.17rem;
                        width: .24rem;
                        height: .34rem;
                        background: url(../../assets/phone.png) no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
            .address {
                width: 6.4rem;
                height: .3rem;
                display: block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: .28rem;
                color: #999;
                line-height: .32rem;
                position: relative;
            }
            .btn-right {
                width: .18rem;
                height: .3rem;
                position: absolute;
                top: .9rem;
                right: .2rem;
                background: url(../../assets/btn-right.png) no-repeat;
                background-size: 100% 100%;
            }
        }
        .bottom-bg {
            width: 100%;
            margin-bottom: .2rem;
            img {
                width: 100%;
            }
        }
        .mark-wrap {
            margin: .2rem 0;
            background: #fff;
            .header {
                padding: 0.2rem;
                border-bottom: 1px solid #dfdfdd;
                line-height: 0.8rem;
                span {
                    font-size: 0.32rem;
                    color: #f9781e;
                }
                img {
                    width: 0.8rem;
                    height: 0.8rem;
                    padding-right: 0.3rem;
                }
            }
            li.clearfix {
                padding: .25rem .2rem;
                border-bottom: 1px solid #dfdfdd;
                height: 1.55rem;
                position: relative;
                img {
                    width: 1.55rem;
                    height: 1.55rem;
                }
                .delete {
                    width: 1.2rem;
                    height: 100%;
                    background: #f9781e;
                    position: absolute;
                    right: 0;
                    top: 0;
                    color: #fff;
                    text-align: center;
                    .icon {
                        width: .51rem;
                        height: .51rem;
                        background: url(../../assets/delete.png) no-repeat;
                        background-size: 100% 100%;
                        margin: .55rem auto .2rem;
                    }
                    .text {
                        font-size: .24rem;
                    }
                }
                .pull-right {
                    padding-left: .2rem;
                    .text {
                        width: 4.7rem;
                        font-size: .24rem;
                        color: #333;
                        line-height: .32rem;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                    }
                    .price-wrap {
                        padding-top: .4rem;
                        width: 5rem;
                        .price {
                            font-size: .26rem;
                            color: #e02828;
                            span {
                                font-size: .38rem;
                            }
                        }
                        .number {
                            font-size: .32rem;
                            color: #333;
                        }
                    }
                }
            }

        }
        .promotion-all{
            padding: .4rem 0rem .2rem .1rem;
            border-bottom: 1px solid #dfdfdd;
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
        .dist-wrap {
            width: 7.1rem;
            padding: 0 .2rem;
            background: #fff;
            .hd {
                height: 1.1rem;
                line-height: 1.1rem;
                border-bottom: 1px solid #d1d1d1;
                background: url(../../assets/btn-right.png) no-repeat 6.9rem center;
                background-size: .14rem .24rem;
                padding-right: .3rem;
                box-sizing: border-box;
                .title {
                    font-size: .25rem;
                    color: #777;
                }
                .busi {
                    font-size: .25rem;
                    color: #999;
                    width: 50%;
                    height: 55px;
                    text-align: right;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
            }
            .hd.active {
                background: #fff;
            }
            .dd {
                margin-bottom: .2rem;
                .title {
                    padding: .3rem 0;
                    font-size: .25rem;
                    color: #777;
                }
                textarea {
                    border: none;
                    resize: none;
                    width: 7.1rem;
                    height: .94rem;
                    background: #f1f1f1;
                    text-indent: .2rem;
                    padding-top: .2rem;
                    outline: none;
                    font-size: .24rem;
                    color: #333;
                }
                .ind {
                    text-align: right;
                    padding: .48rem .2rem .32rem;
                    font-size: .26rem;
                    color: #333;
                    span {
                        font-size: .26rem;
                        color: #f23030;
                    }
                }
            }
        }
        .footer-wrap {
            height: 1rem;
            width: 100%;
            .footer {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 1rem;
                background: #fff;
                box-sizing: border-box;
                border-top: 1px solid #ccc;
                .btn {
                    width: 2.5rem;
                    height: 1rem;
                    color: #fff;
                    border: none;
                    background: #d02629;
                    font-size: .36rem;
                }
                .btn-gray {
                    background: #ccc;
                }
                .money {
                    line-height: 1rem;
                    font-size: .3rem;
                    color: #757575;
                    padding-right: .3rem;
                    .price {
                        font-size: .3rem;
                        span {
                            font-size: .36rem;
                            font-weight: bold;
                        }
                    }
                }
            }
        }
        .price-set-wrap {
            padding: .2rem;
            background: #fff;
            .price {
                height: .6rem;
                line-height: .6rem;
                span.fl {
                    font-size: .25rem;
                    color: #777;
                }
                span.fr {
                    font-size: .28rem;
                    color: #d0111b;
                    overflow: hidden;
                    height: 100%;
                    i {
                        font-style: normal;
                        color: #666;
                    }
                }
            }
            .dd {
                margin-bottom: .2rem;
                .title {
                    padding: .3rem 0;
                    font-size: .25rem;
                    color: #777;
                }
                textarea {
                    border: none;
                    resize: none;
                    width: 7.1rem;
                    height: .94rem;
                    background: #f1f1f1;
                    text-indent: .2rem;
                    padding-top: .2rem;
                    outline: none;
                    font-size: .24rem;
                    color: #333;
                }
                .ind {
                    text-align: right;
                    padding: .48rem .2rem .32rem;
                    font-size: .26rem;
                    color: #333;
                    span {
                        font-size: .26rem;
                        color: #f23030;
                    }
                }
            }
            .price.curInt {
                span.fr {
                    color: #ff7200;
                }
            }
        }
    }
</style>
