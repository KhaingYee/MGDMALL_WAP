<template>
    <div class="LimitedtimeBuy" ref="LimitedtimeBuy">
        <order-header :text="$store.state.order_title" :search="search"></order-header>
        <div style="width: 100%;height: 1.5rem;" v-show="navBarFixed"></div>
        <div class="img"><img src="../../assets/activity/active3.png" alt=""></div>

        <div class="nav" ref="nav" :class="navBarFixed == true ? 'navBarWrap' :''">
            <ul @touchmove.stop id="navul">
                <li v-for="(item,index) in currentTimeArray" :key="index" :id="index"
                    :class="{active:tabIndex==index}" @click="addClass(index,item.condition)">
                    <div class="content">
                        <span>{{item.name}}</span>
                        <span>{{item.condition}}</span>
                        <div v-if="tabIndex==index" class="arrow"></div>
                    </div>
                </li>
            </ul>
            <div :style="{background: '#fff',height: '.2rem',width:currentTimeArray.length*1.5 + 'rem'}">

            </div>
        </div>

        <!--倒计时-->
        <div class="count-down">
            <div class="line"></div>
            <div class="time" v-if="seckillCommodityList.length != 0 &  condition !='已开抢'">
                {{condition == '秒杀中' ? '本场还剩' : '开始还剩'}}<span>{{hour}}:{{Minute}}:{{second}}</span>
            </div>
            <div class="time" v-else>
                本场活动已结束
            </div>

            <div class="line"></div>
        </div>
        <!--特价商品-->
        <div class="shop-list" v-if="activityFlag" >
            <div  class="shop" v-for="(item,index) in seckillCommodityList" :key="index" v-if="condition !='已开抢'">
                <div class="shopimg" @click="imgbut(item.id)"><img :src="URL + item.pic_url" alt=""></div>
                <div class="message">
                    <div class="shop-title">{{item.title}}</div>
                    <div class="desc">{{item.description}}</div>
                    <div class="price">
                        <span>￥{{item.activity_price}}</span>
                        <span>￥{{item.price_member}}</span>
                    </div>
                    <!--<div v-else class="price">-->
                        <!--<span>价格登录可见</span>-->
                    <!--</div>-->
                    <div class="bottom">
                        <div class="procss">
                            <div :style="{width: (item.buy_num/item.panic_buy)*100 +'%'}"
                                 class="displaybar"></div>
                            仅剩{{item.panic_buy-item.buy_num}}件
                        </div>
                        <!--<div class="btn" v-if="sameDayTime < currentTime">未开抢</div>-->
                        <div  @click="toDetail(item.id)" class="btn" v-if="condition =='秒杀中' ">马上抢</div>
                        <div  @click="toDetailDown" class="btn" v-else>即将开抢</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!activityFlag" class="no-data">
            暂无活动
        </div>


    </div>
</template>

<script>
    import orderHeader from '@/components/page/children/header.vue';
    import QS from 'qs';
    import { Toast } from 'mint-ui';
    import {getScrollHeight, getScrollTop, getWindowHeight} from "../../config/screen";
    export default {
        name: "LimitedtimeBuy",
        data() {
            return {
                conditionColor:'秒杀中',
                search: true,
                statusNav: 4,
                navBarFixed: false,
                banner: "",
                contentHeight: {
                    height: '.2rem',
                    background: '#fff',
                    width: '12rem'
                },
                list: [],
                currentTimeArray:[],
                tabIndex:'',
                currentTime:'',
                sameDayTime:'',
                seckillCommodityList:[],//秒杀商品信息
                condition:'秒杀中',
                timeId:"",
                itemTime:'' , //活动时间
                activityStart:false, //false 活动未结束  true  结束
                hour:0,
                Minute:0,
                second:0,
                activityFlag:true,
                currentPage:1,
                dropFlag: false,
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
        components: {
            orderHeader
        },
        created() {
            $('html,body').animate({scrollTop: '0px'}, 0);

           /* var timestamp=new Date().getTime()*/
          //  this.getList();
            this.$nextTick(() => {
                //左右两边滚动
                //this.move(this.statusNav)
            })
        },
        methods: {
            toDetailDown(){
                Toast({
                    message: "活动暂未开始",
                    duration: 1000
                });
            },
            addClass(index,condition) {
                this.condition=condition
                this.tabIndex=index;
                this.seckillCommodityList = [];
                this.currentPage = 1;
                this.timeId = this.currentTimeArray[index].num;
                this.hour = 0;
                this.Minute = 0;
                this.second = 0;
                if(condition == '秒杀中'){
                    this.computationTime(this.currentTimeArray[index].end_time);
                }
                if(condition == '即将开场'){
                    this.computationTime(this.currentTimeArray[index].start_time);
                }
                this.getcommodityList();
                this.move(index);
               /* this.getList(this.currentTimeArray[index].start_time);
                this.currentTime  = this.currentTimeArray[index].start_time;*/
            },
            //倒计时
            //计算倒计时或已开抢时间
            computationTime(timestamp) {
                let self = this;
                clearInterval(self.timer);
                this.timer = setInterval(function() {
                    let t = null;
                    var now = new Date();
                    var now_Time = now.getTime();

                    self.nowTime=now_Time;
                    t = timestamp*1000 - now_Time;
                    if(t<= 0){
                       clearInterval(self.timer);
                       return
                    }
                    let hour = Math.floor(t / 3600000);
                    let min = Math.floor((t / 60000) % 60);
                    let sec = Math.floor((t / 1000) % 60);
                    hour = hour < 10 ? "0" + hour : hour;
                    min = min < 10 ? "0" + min : min;
                    sec = sec < 10 ? "0" + sec : sec;
                    self.hour = `${hour}`;
                    self.Minute = `${min}`;
                    self.second = `${sec}`;
                }, 1000);

            },


            getList(time) {
                if (time) {
                    var time1 = time;
                    this.$store.state.currentTime = time;
                    sessionStorage.setItem('currentTime',time);
                } else {
                    var time1 = sessionStorage.getItem('currentTime');
                }

                this.axios.post(this.$httpConfig.activityList, QS.stringify({
                    time: time1,
                    page: 1,
                    type: 4,
                    token: sessionStorage.getItem("data_token")
                })).then((res) => {
                    if (res.data.status == 1) {
                        this.list = res.data.data.goods;
                        this.banner = res.data.data.banner;
                    } else {
                        this.list = [];
                    }
                })
            },
            toDetail(id) {

                this.$router.push({
                    name: 'seckillcommoditydetails',
                    params: {
                            id:id
                    }
                })
            },
            imgbut(id) {
                this.$router.push({
                    name: 'seckillcommoditydetails',
                    params: {
                        id:id
                    }
                })
            },
            move(index) {
                this._id = document.getElementById(index);
                this.distance = this._id.offsetLeft - 140;
                this.statusNav = index
                this.$refs.nav.scrollLeft = this.distance;
                var self = this;
                self.statusNav = index
            },
            tam2time(value) {
                var time = new Date(Number(value) * 1000);
                var Y = time.getFullYear();
                var m = time.getMonth() + 1;
                var d = time.getDate();
                var H = time.getHours();
                var mi = time.getMinutes();
                var s = time.getSeconds();
                if (m < 10) {
                    m = '0' + m;
                }
                if (d < 10) {
                    d = '0' + d;
                }
                return (m + "月" + d + "日");
            },
            watchScroll() {
                if (!this.$refs.LimitedtimeBuy) return;
                if (getScrollTop() + getWindowHeight() >= getScrollHeight()) {
                    if (this.dropFlag) {
                        this.currentPage++;
                        this.getcommodityList();
                    }
                }
                if (getScrollTop() >= 175) {
                    this.navBarFixed = true;
                } else {
                    this.navBarFixed = false;
                }
            },
            //获取秒杀时间和秒杀时间状态
            getSeckillList(){
                this.axios.post(this.$httpConfig.getSeckillTimeList, qs.stringify({
                    token: sessionStorage.getItem("data_token")
                }) ).then((res) => {
                    this.currentTimeArray=res.data.data;
                    for(var i=0;i<this.currentTimeArray.length;i++){
                        if(this.currentTimeArray[i].condition=='秒杀中'){
                            this.tabIndex=i;
                            this.computationTime(this.currentTimeArray[this.tabIndex].end_time);
                            this.condition='秒杀中'
                        }

                    }
                })
            },
            //秒杀商品信息
            getcommodityList(){
                this.axios.post(this.$httpConfig.getSeckillcommodity , QS.stringify({
                    time_id: this.timeId,
                    page:this.currentPage,
                    token: sessionStorage.getItem("data_token")
                }) ).then((res) => {
                    if(res.data.status == 1){

                        if(res.data.data.list.length == 10){
                            this.dropFlag = true;
                        }else{
                            this.dropFlag = false;
                        }

                        if(this.currentPage == 1){
                            this.seckillCommodityList=res.data.data.list;
                        }else {
                            this.seckillCommodityList = [
                                ...this.seckillCommodityList,
                                ...res.data.data.list
                            ]
                        }
                    }else {
                        this.dropFlag = false;
                    }
                })
            }
        },
        mounted() {
            this.$store.state.order_title = '整点秒杀';
            let title = this.$store.state.order_title + '-' + sessionStorage.getItem('titleKey') + '-' + sessionStorage.getItem('updateDescription');
            this.showScroll.scrollTitle(title);
            this.getSeckillList();//秒杀时间及状态
            this.getcommodityList();
            // this.currentTimeArray = JSON.parse(sessionStorage.getItem('currentTimeArray'));
            // this.currentTime = sessionStorage.getItem('currentTime');
            // this.sameDayTime = sessionStorage.getItem('sameDayTime');
            window.addEventListener("scroll", this.watchScroll);
        },
        destroyed() {
            window.removeEventListener('scroll', this.watchScroll);
        }
    }
</script>

<style lang="less" scoped>
    .LimitedtimeBuy {
        .navBarWrap {
            position: fixed;
            top: 0.94rem;
            z-index: 999;
            left: 0;
        }

        .count-down{
            background: #ffffff;
            height: 1rem;
            padding: 0 .2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .line{
                width: 1.7rem;
                height: 1px;
                background: #dfdfdd;
            }

            .time{
                font-size: .3rem;
                span{
                    font-size: .3rem;
                    color: #ff7900;
                    font-weight: bold;
                }
            }
        }

        .img {
            img {
                width: 100%;
                height: 175px;
            }
        }

        .nav {
            width: 100%;
            overflow-x: auto;
            background: #fff;

            #navul {
                background: #f3dfc5;
            }

            ul {
                display: flex;
                white-space: nowrap;

                li {
                    padding: .1rem 0;
                    background: #f3dfc5;
                    color: #676767;
                    position: relative;

                    .content {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        padding: .1rem 0;
                        width: 1.5rem;
                        text-align: center;
                        border-right: 1px solid #d8c1a3;
                        box-sizing: border-box;

                        span {
                            font-size: .26rem;
                        }
                    }

                    .arrow {
                        width: .2rem;
                        height: .2rem;
                        position: absolute;
                        left: 50%;
                        margin-left: -.1rem;
                        bottom: -.1rem;
                        z-index: 1;
                        background: #e6943b;
                        transform: rotate(45deg);
                    }
                }

                li:last-child {
                    .content {
                        border-right: none;
                    }
                }

                li.active {
                    color: #fff;
                    background: #e6943b;
                }
            }
        }

        .title {
            background: #fff;
            height: 1rem;
            line-height: 1rem;
            font-size: 0.26rem;
            color: #000000;
            text-indent: 0.16rem;
            position: relative;
            text-align: center;

            .content {
                display: flex;
                align-items: center;
                justify-content: center;

                &::before {
                    content: '';
                    width: .35rem;
                    height: .4rem;
                    background: url("../../assets/activity/1@2x.png");
                    background-size: cover;
                }
            }

            .circle {
                width: .11rem;
                height: .13rem;
                background: #dfdfdd;
                border-radius: 50%;
                position: absolute;
                top: -.065rem;
            }

            .line-left, .line-right {
                position: absolute;
                width: 1.5rem;
                height: 1px;
                top: 50%;
                background-color: #e0e0e0;
            }

            .line-left {
                left: 19%;
                line-height: 1px;

                .circle {
                    right: 0;
                }
            }

            .line-right {
                right: 20%;
            }
        }

        .shop-list {
            .shop {
                margin-top: .2rem;
                padding: .2rem;
                display: flex;
                background: #fff;

                .shopimg {
                    img {
                        display: inline-block;
                        width: 2.5rem;
                        height: 2.5rem;
                    }
                }

                .message {
                    color: #888;
                    margin-left: .3rem;

                    .shop-title {
                        color: #333;
                        font-size: .32rem;
                        margin: .1rem 0;
                        width: 4rem;
                        margin-top: .2rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    .desc {
                        font-size: .27rem;
                    }

                    .price {
                        margin: .15rem 0;

                        span:nth-child(1) {
                            font-size: .32rem;
                            color: #a22d2b;
                        }

                        span:nth-child(2) {
                            text-decoration: line-through;
                        }
                    }

                    .bottom {
                        margin-top: .1rem;
                        .procss {

                            position: relative;
                            width: 1.5rem;
                            border: 1px solid #ebad63;
                            height: .3rem;
                            color: #ebad63;
                            text-align: center;

                            line-height: .3rem;
                            border-radius: .3rem;
                            margin-right: .4rem;
                            z-index: 1;

                            .displaybar {
                                position: absolute;
                                left: 0;
                                top: 0;
                                z-index: -1;
                                height: .3rem;
                                font-size: 0.15em;
                                background: rgba(251, 238, 222, 1);
                                border-radius: .3rem 0 0 .3rem;
                            }
                        }

                        display: flex;
                        align-items: center;
                    }

                    .btn {
                        width: 1.8rem;
                        height: .6rem;
                        text-align: center;
                        line-height: .6rem;
                        border-radius: .09rem;
                        background: #e6943b;
                        color: #fff;
                        font-size: .26rem;
                    }
                }
            }
        }
    }
</style>
