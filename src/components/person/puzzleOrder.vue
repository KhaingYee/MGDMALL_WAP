<template>
    <div class="puzzle_order">
        <div class="header">
            <img src="../../assets/activity/re.png" @click="goBack" />
            <span class="title">拼团订单</span>
            <img src="../../assets/activity/search_r.png" alt />
        </div>
        <div class="topnav">
            <ul>
                <li
                    :class="{'liactive':indexColor==index}"
                    v-for="(item,index) in navlist"
                    :key="index"
                    @click="nav(index)"
                >{{item}}</li>
            </ul>
        </div>
        <div v-if="errorState == 0" class="errorcss">
            <!-- {{errorMsg}} -->
            暂无数据
        </div>
        <div v-if="errorState == 1" v-for="(item, index) in orderList" @click="goDetail(item)" :key="index">
            <div class="top">
                <div class="title">{{item.shop_name}}</div>

                <div class="status" v-if="item.status==0">待付款</div>
                <div class="status" v-else-if="item.status==1">待分享</div>
                <div class="status" v-else-if="item.status==3">待收货</div>
                <div class="status" v-else-if="item.status==4">已完成</div>
                <div class="status" v-else-if="item.status==2">拼团成功</div>
                <div class="status" v-else-if="item.comment-status==1">已评价</div>
                <div class="status" v-else>拼团未成功</div>
            </div>
            <div class="cell">
                <div class="l">
                    <img :src="URL + item.pic_url" alt />
                </div>
                <div class="r">
                    <div class="r_1">
                        <div class="title">{{item.title}}}</div>
                        <!-- <div class="num">×1</div> -->
                        <div class="num">×{{item.goods_num}}</div>
                    </div>
                   <!-- <div class="r_2">花色：银丝白橡</div>-->
                    <div class="r_3">
                        <div class="target">
                            目标人数
                            <span>{{item.sheets_num}}</span>人
                        </div>
                        <div class="peo">
                            已拼单人数
                            <span>{{item.surplus}}</span>人
                        </div>
                    </div>
                    <div class="r_4">
                        剩余时间：
                        <span>{{timerHour}}</span>天
                        <span>{{timerMinute}}</span>时
                        <span>{{timerSecond}}</span>分
                    </div>
                    <div class="r_5">￥{{item.goods_price}}</div>
                </div>
            </div>
            <div class="footer">
                <div class="f_l">
                    共
                    <span>{{number}}</span>件商品
                </div>
                <div class="f_r">
                    合计：￥
                    <span>{{parseInt((item.goods_price)*number)}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import qs from "qs";
export default {
    data() {
        return {
            indexColor: 0,
            navlist: ["全部", "待付款", "待分享", "待收货", "已完成", "已评价", "已取消"],
            orderList: [],
            type: "", //记录点击状态 发送给给后台返回相应的数据
            status: 0, //0:待分享  1:待付款  3:
            number: 1,
            timerHour: 0,
            timerMinute: 0,
            timerSecond: 0,
            headParams: {
                title: sessionStorage.getItem('titleKey'),
                description: sessionStorage.getItem('updateDescription'),
                keywords: sessionStorage.getItem('contentKey'),        
            }, 
            // errorMsg: '',
            errorState: ''
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
        nav(index) {
            this.indexColor = index;
            switch (index) {
                case 0:
                    this.type = ""; //全部
                    this.getmessage(this.type)
                    break;
                case 1:
                    this.type = "1"; //待付款
                    this.getmessage(this.type)
                    break;
                case 2:
                    this.type = "0"; //待分享
                    this.getmessage(this.type)
                    break;
                case 3:
                    this.type = "4"; //待收货
                    this.getmessage(this.type)
                    break;
                case 4:
                    this.type = "3"; //已完成
                    this.getmessage(this.type)
                    break;
                case 5:
                    this.type = "5"; //已平价
                    this.getmessage(this.type)
                    break;
                case 6:
                    this.type = "6"; //已取消
                    this.getmessage(this.type)
                    break;
            }
           /* this.getmessage();
            // this.getmessage(index)*/
        },
        goBack() {
            window.history.back();
        },
        goDetail(item) {
            this.$router.push({
                name: "puzzleOrderDetail",
                params: {
                    id: item.id,
                }
            });
        },

        getmessage(type) {
            // console.log(type)
            this.axios
                .post(
                    this.$httpConfig.getOrderGroup, qs.stringify({type:type, token: sessionStorage.getItem("data_token")})
                )
                .then(res => {
                    this.errorState = res.data.status;
                    if(res.data.data && res.data.data.data.length > 0) {
                        this.orderList = res.data.data.data;

                        var timestamp = res.data.data.data[0].end_time;
                        this.computationTime(timestamp);

                        // for (var i = 0; i < res.data.data.data.length; i++) {
                        //     var timestamp = res.data.data.data[i].end_time;
                        //     // this.computationTime(timestamp);


                                                
                        //                         function component(x, v) {
                        //                             return Math.floor(x / v);
                        //                         }
                        //                         var days    = component(timestamp, 24 * 60 * 60),
                        //                         hour = component(timestamp,      60 * 60) % 24,
                        //                         min = component(timestamp,           60) % 60,
                        //                         sec = component(timestamp,            1) % 60;
                                                
                        //                         hour = hour < 10 ? "0" + hour : hour;
                        //                         min = min < 10 ? "0" + min : min;
                        //                         sec = sec < 10 ? "0" + sec : sec;
                        //                         this.timerHour[i] = hour;
                        //                         this.timerMinute[i] = min;
                        //                         this.timerSecond[i] = sec;
                                                
                        //                         let that = this;
                        //                         this.timer = setInterval(function() {
                        //                             timestamp--;
                        //                             var hour11   = component(timestamp,      60 * 60) % 24,
                        //                             min11 = component(timestamp,           60) % 60,
                        //                             sec11 = component(timestamp,            1) % 60;
                                                    
                        //                             hour11 = hour11 < 10 ? "0" + hour11 : hour11;
                        //                             min11 = min11 < 10 ? "0" + min11 : min11;
                        //                             sec11 = sec11 < 10 ? "0" + sec11 : sec11;
                        //                             that.timerHour[i] = `${hour11}`;
                        //                             that.timerMinute[i] = `${min11}`;
                        //                             that.timerSecond[i] = `${sec11}`;
                        //                         }, 1000);
                        // }
                    }
                    // else {
                    //     this.errorMsg = res.data.message;
                    // }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //秒杀剩余剩余时间
        computationTime(timestamp) {
            let that = this;

            // var timestamp1 = (timestamp + 1000 * 60 * 60 * 24 * 3) - timestamp;
            // timestamp1 /= 1000;
            function component(x, v) {
                return Math.floor(x / v);
            }
            
            this.timer = setInterval(function() {
                // let t = null;
                // var now = new Date();
                // var now_Time = now.getTime();
                // t = timestamp * 1000 - now_Time;
                // let hour = Math.floor(t / 3600000) % 24;
                // let min = Math.floor((t / 60000) % 60);
                // let sec = Math.floor((t / 1000) % 60);
                // hour = hour < 10 ? "0" + hour : hour;
                // min = min < 10 ? "0" + min : min;
                // sec = sec < 10 ? "0" + sec : sec;
                // that.hour = `${hour}`;
                // that.Minute = `${min}`;
                // that.second = `${sec}`;
                
                timestamp--;
                var days    = component(timestamp, 24 * 60 * 60),
                hour   = component(timestamp,      60 * 60) % 24,
                min = component(timestamp,           60) % 60,
                sec = component(timestamp,            1) % 60;
                
                hour = hour < 10 ? "0" + hour : hour;
                min = min < 10 ? "0" + min : min;
                sec = sec < 10 ? "0" + sec : sec;
                that.timerHour = `${hour}`;
                that.timerMinute = `${min}`;
                that.timerSecond = `${sec}`;
            }, 1000);
        }
    },
    mounted() {
        this.getmessage();
    },
    created() {
    let title = "拼团订单" + '-' + sessionStorage.getItem('titleKey') + '-' + sessionStorage.getItem('updateDescription');
    this.showScroll.scrollTitle(title);
    }
};
</script>
<style lang="less" scope>
.puzzle_order {
    .header {
        display: flex;
        align-items: center;
        padding: 0.2rem 0;
        background: #fff;
        img {
            height: 0.5rem;
            width: 0.5rem;
            padding-left: 0.2rem;
        }
        .title {
            font-size: 0.35rem;
            margin: 0 30%;
        }
    }
    .errorcss {
        text-align: center;
        margin-top: 50%;
        font-size: 0.5rem;
    }
    .topnav {
        border-top: 0.01rem solid #dfe3e4;
        width: 100%;
        background: white;
        ul {
            width: 95%;
            margin: auto;
            display: flex;
            height: 1rem;
            flex-direction: row;
            justify-content: space-between;
            li {
                height: 1rem;
                line-height: 1rem;
                font-size: 0.26rem;
                color: #3c3c3c;
            }
            .liactive {
                font-size: 0.28rem;
                color: #66b1ff;
            }
        }
    }
    .top {
        background: #fff;
        height: 1rem;
        margin-top: 0.1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.2rem;
        position: relative;
        .title {
            font-size: 0.3rem;
        }
        .status {
            font-size: 0.3rem;
            color: #ff9536;
        }
    }
    .cell {
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
    .footer {
        display: flex;
        justify-content: flex-end;
        padding: 0.2rem;
        background: #fff;
        .f_l {
            font-size: 0.3rem;
            span {
                font-size: 0.3rem;
            }
        }
        .f_r {
            font-size: 0.3rem;
            span {
                font-size: 0.3rem;
            }
        }
    }
}
</style>
