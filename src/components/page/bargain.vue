<template>
    <div class="bargain">
        <bargain-header :text="$store.state.order_title"></bargain-header>
        <div class="banner">
            <img src="../../assets/activity/active2.png" alt />
        </div>
        <!--倒计时-->
        <!--<div class="count-down">-->
            <!--<div class="line"></div>-->
            <!--<div class="time">-->
                <!--本场还剩-->
                <!--<span>00 ：28 ：24</span>-->
            <!--</div>-->
            <!--<div class="line"></div>-->
        <!--</div>-->
        <!-- 正在砍价 -->
        <div class="cutprice" v-if="bargainOrderList.length != 0" v-for="(item,index) in bargainOrderList" :key="index">
            <div class="up">
                <img src="../../assets/activity/bantop.png" alt />
                <div class="down">
                    <img :src="URL + item.pic_url" alt />
                    <div class="r">
                        <div class="title">
                            已砍
                            <span class="t_1">{{item.already_bargain}}</span>元，还差
                            <span class="t_2">{{item.bargain_price}}</span>元
                        </div>
                        <div class="pro">
                            <div class="p_1" :style="{'width': ( ( Number(item.already_bargain)) / (Number(item.already_bargain) + Number(item.bargain_price)) ) * 100+'%'}">
                                {{( ( Number(item.already_bargain)) / (Number(item.already_bargain) + Number(item.bargain_price)) ).toFixed(2) * 100 }}%
                            </div>
                        </div>
                        <div class="time">
                            <span>{{item.day}}</span>天
                            <span>{{item.hour}}</span>:
                            <span>{{item.Minute}}</span>:
                            <span>{{item.second}}</span>点结束
                        </div>
                        <div class="btn" @click="purchase(item)">立即购买</div>
                    </div>
                </div>
            </div>
        </div>
        <!--砍价活动列表-->
        <div class="bargain-activity-list">
            <div v-for="(item,index) in bargainList" :key="index" class="bargain-activity">
                <img class="bargain-activity-img" :src="URL + item.images" />
                <div class="message">
                    <div class="title">{{item.title}}</div>
                    <div class="price">
                        <div class="price-activity">
                            <span>砍价后</span>
                            <span>￥{{item.price_member - item.bargain_price}}</span>
                        </div>
                        <div class="original-price">￥{{item.price_member}}</div>
                    </div>
                    <div class="count-down">
                        {{item.day}}天{{item.hour}}时{{item.Minute}}分{{item.second}}秒后结束
                    </div>
                    <div class="bottom">
                        <div>最高可砍￥{{item.bargain_price}}</div>
                        <div class="btn" @click="gocutprice(item.id)">我要砍价</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import bargainHeader from "@/components/page/children/header.vue";
import {getScrollHeight, getScrollTop, getWindowHeight} from "../../config/screen";
import qs from 'qs';
export default {
    name: "bargain",
    data() {
        return {
            bargainList:[],
            bargainOrderList:[],
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
    methods: {
        getBargainList(){
            this.axios.post(this.$httpConfig.bargainOrder,  qs.stringify({
                token: sessionStorage.getItem("data_token")
            })).then((res)=>{
                if(res.data.status == 10001){
                    this.$router.push("/LogIn");
                    return
                }
                if(res.data.status == 1){
                    this.bargainOrderList = res.data.data;
                }
                for(var i = 0; i<this.bargainOrderList.length;i++){
                    this.computationTime(this.bargainOrderList[i].end_time,i,1)
                }
            }).catch((err)=>{
                console.log(err);
            })
        },
        purchase(item){
            this.$router.push({
                name:'activityOrder',
                params:{
                    id:item.id,
                    promId: 0,
                    num:1,
                    stat:4
                }
            })
        },
        gocutprice(id) {
            this.$router.push({
                name: "cutPrice",
                params:{
                    id:id
                }
            });
        },
        watchScroll() {
            if (getScrollTop() + getWindowHeight() >= getScrollHeight()) {
                if (this.dropFlag) {
                    this.currentPage++;
                    this.getBargainList1();
                }
            }
        },
        getBargainList1(){
            this.axios.post(this.$httpConfig.cutprice,qs.stringify({page:this.currentPage, token: sessionStorage.getItem("data_token")})).then((res)=>{
                if(res.data.status == 1){

                    if(res.data.data.list.length == 10){
                        this.dropFlag = true
                    }else {
                        this.dropFlag = false
                    }
                    if(this.currentPage == 1){
                        this.bargainList = res.data.data.list;
                    }else {
                        this.bargainList = [
                            ...this.brandList,
                            ...res.data.data.list
                        ]
                    }
                    this.bargainList.forEach((item,index)=>{
                        this.computationTime(item.end_time,index,2)
                    })
                }else {
                    this.dropFlag = false;
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        computationTime(timestamp,index,type) {
            let self = this;
            setInterval(function() {
                let t = null;
                var now = new Date();
                var now_Time = now.getTime();
                t = timestamp*1000 - now_Time;
                let day = Math.floor(t / 86400000);
                let hour = Math.floor(t / 3600000)%24;
                let min = Math.floor((t / 60000) % 60);
                let sec = Math.floor((t / 1000) % 60);
                hour = hour < 10 ? "0" + hour : hour;
                min = min < 10 ? "0" + min : min;
                sec = sec < 10 ? "0" + sec : sec;
                if(type == 1){
                    self.$set(self.bargainOrderList[index],'day',day);
                    self.$set(self.bargainOrderList[index],'hour',hour);
                    self.$set(self.bargainOrderList[index],'Minute',min);
                    self.$set(self.bargainOrderList[index],'second',sec);
                }
                if(type == 2){
                    self.$set(self.bargainList[index],'day',day);
                    self.$set(self.bargainList[index],'hour',hour);
                    self.$set(self.bargainList[index],'Minute',min);
                    self.$set(self.bargainList[index],'second',sec);
                }
            }, 1000);
        },
    },
    mounted() {
        this.$store.state.order_title = "砍价";
        let title = this.$store.state.order_title + '-' + sessionStorage.getItem('titleKey') + '-' + sessionStorage.getItem('updateDescription');
        this.showScroll.scrollTitle(title);
        this.getBargainList();
        $("html,body").animate({ scrollTop: "0px" }, 0);


        this.getBargainList1();

        window.addEventListener("scroll", this.watchScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.watchScroll);
    },
    components: {
        bargainHeader
    }
};
</script>

<style lang="less" scoped>
.bargain {
    .banner {
        img {
            width: 100%;
        }
    }

    /*.count-down {*/
        /*background: #ffffff;*/
        /*height: 1rem;*/
        /*padding: 0 0.2rem;*/
        /*display: flex;*/
        /*justify-content: space-between;*/
        /*align-items: center;*/
        /*.line {*/
            /*width: 1.7rem;*/
            /*height: 1px;*/
            /*background: #dfdfdd;*/
        /*}*/

        /*.time {*/
            /*font-size: 0.3rem;*/
            /*span {*/
                /*font-size: 0.3rem;*/
                /*color: #ff7900;*/
                /*font-weight: bold;*/
            /*}*/
        /*}*/
    /*}*/
    .cutprice {
        .up {
            display: flex;
            justify-content: center;
            position: relative;
            margin-top: .2rem;
        }
        .down {
            position: absolute;
            top: 0.8rem;
			left: 0.2rem;
			display: flex;
            img {
                width: 2.5rem;
                height: 2.5rem;
                margin: 0.1rem;
            }
            .r {
                display: flex;
                flex-direction: column;
                .title {
                    font-size: 0.25rem;
                    margin-top: 0.1rem;
                    .t_1 {
                        font-size: 0.25rem;
                        color: #ff7900;
                    }
                    .t_2 {
                        font-size: 0.25rem;
                        color: #ff7900;
                    }
                }
                .pro {
                    display: flex;
                    margin-top: 0.1rem;
                    width: 4rem;
                    background: #ffd0a6;
                    border-radius: .2rem;
                    .p_1 {
                        background: #ff7900;
                        width: 79%;
                        border-radius: 0.2rem;
                        display: flex;
						justify-content: center;
						z-index: 1;
						color: #fff;
                    }
                }
                .time {
                    display: flex;
                    align-items: center;
                    margin-top: 0.55rem;
                    justify-content: space-around;
                    span {
                        background: #595959;
                        border-radius: 0.06rem;
                        width: 0.45rem;
                        height: 0.45rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: #fff;
                    }
                }
                .btn {
                    background: #ff7900;
                    height: 0.6rem;
                    width: 4rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #fff;
                    border-radius: 0.1rem;
                    margin-top: 0.1rem;
                }
            }
        }
    }
    .bargain-activity-list {
        margin-top: 0.3rem;
        .bargain-activity {
            height: 3rem;
            background: #ffffff;
            margin-bottom: 0.2rem;
            display: flex;
            align-items: center;

            .bargain-activity-img {
                width: 2.5rem;
                height: 2.5rem;
                margin: 0.1rem;
            }

            .message {
                height: 2.5rem;
                flex: 1;
                .title {
                    width: 4.5rem;
                    font-size: 0.3rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin: 0.1rem 0 0 0;
                }
                .subtitle {
                    color: #888888;
                    font-size: 0.24rem;
                    margin-bottom: 0.1rem;
                }

                .price {
                    display: flex;
                    align-items: center;
                    .price-activity {
                        display: flex;
                        align-items: center;
                        span:nth-child(1) {
                            font-weight: bold;
                            color: #000000;
                            font-size: 0.26rem;
                        }
                        span:nth-child(2) {
                            font-size: 0.34rem;
                            color: #ff7900;
                        }
                    }
                    .original-price {
                        text-decoration: line-through;
                        color: #8f8f8f;
                        margin-left: 0.15rem;
                    }
                }
                .count-down{
                    margin-top: .1rem;
                }

                .bottom {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-right: 0.3rem;
                    margin-top: 0.1rem;
                    > div:nth-child(1) {
                        font-size: 0.24rem;
                        color: #e59237;
                    }

                    .btn {
                        width: 1.3rem;
                        height: 0.5rem;
                        background: #ff7900;
                        color: #ffffff;
                        text-align: center;
                        line-height: 0.5rem;
                        border-radius: 0.07rem;
                    }
                }
            }
        }
    }
}
</style>
