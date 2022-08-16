<template>
    <!-- 拼团订单 -->
    <div class="shareAssemble">
        <coup-header :set="true" :text="'加入拼团'"></coup-header>
        <div class="cell">
            <div class="l">
                <img :src="URL + orderData.pic_url" alt />
            </div>
            <div class="r">
                <div class="r_1">
                    <div class="title">{{orderData.title}}}</div>
                    <div class="num">×{{orderData.goods_num}}</div>
                </div>
                <div class="r_3">
                    <div class="target">
                        目标人数
                        <span>{{orderData.sheets_num}}</span>人
                    </div>
                    <div class="peo">
                        已拼单人数
                        <span>{{orderData.buy_num}}</span>人
                    </div>
                </div>
                <div class="r_4">
                    剩余时间：
                    <span>{{hour}}</span>天
                    <span>{{Minute}}</span>时
                    <span>{{second}}</span>分
                </div>
                <div class="r_5">￥{{orderData.goods_price}}</div>
            </div>
        </div>
        <div class="btn">
            <div @click="goToActivity" class="sub">加入拼团</div>
        </div>
    </div>
</template>

<script>
 import { Toast } from 'mint-ui';
import coupHeader from "@/components/page/children/header.vue";
import qs from "qs";
export default {
    name: "shareAssemble",
    components: {
        coupHeader
    },
    data() {
        return {
            orderData:'',
            status: '',
            hour: 0,
            Minute: 1,
            second: 0,
            headParams: {
                title: sessionStorage.getItem('titleKey'),
                description: sessionStorage.getItem('updateDescription'),
                keywords: sessionStorage.getItem('contentKey'),        
            }, 
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
        let title = "拼团订单" + '-' + sessionStorage.getItem('titleKey') + '-' + sessionStorage.getItem('updateDescription');
        this.showScroll.scrollTitle(title);
    },
    methods: {
        getorderGroupDetail(){
            this.axios.post(this.$httpConfig.orderGroupDetail,qs.stringify({
                id:this.$route.params.id,
                token: sessionStorage.getItem("data_token")
            })).then((res)=>{
                this.orderData=res.data.data;
                this.status = res.data.status;
                var timestamp = res.data.data.end_time;
                this.computationTime(timestamp);
            }).catch((err)=>{
                console.log(err)
            })
        },
        computationTime(timestamp) {
            let that = this;
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
        goToActivity() {
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
                        id: this.orderData.group_id,
                        goods_num: this.orderData.goods_num,
                        goods_id: this.orderData.goods_id
                    },
                    query: {
                        order_id: this.orderData.id
                    }
                })
            }
        }
    },
    mounted() {
        this.getorderGroupDetail();
    }
};
</script>

<style scoped lang="less">
.shareAssemble {
    .cell {
        background: #fff;
        display: flex;
        padding: 0.2rem;
        .l {
            img {
                height: 2rem;
                width: 2rem;
            }
        }

        .r {
            padding: 0 0.2rem;
            .r_1 {
                display: flex;

                .title {
                    font-size: 0.25rem;
                }
                .num {
                    font-size: 0.25rem;
                    position: absolute;
                    right: 0.2rem;
                }
            }
            .r_2 {
                color: #a9a6a6;
            }
            .r_3 {
                .target {
                    color: #a9a6a6;
                    span {
                        color: #ff9536;
                    }
                }
                .peo {
                    color: #a9a6a6;
                    span {
                        color: #ff9536;
                    }
                }
            }
            .r_4 {
                color: #a9a6a6;
                span {
                    color: #ff9536;
                }
            }
            .r_5 {
                font-size: 0.2rem;
            }
        }
    }
    .btn {
        height: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f1f1f1;
        .sub {
            background: #ff9536;
            font-size: 0.35rem;
            width: 90%;
            color: #fff;
            border-radius: 0.15rem;
            height: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 100;
        }
    }
}
</style>