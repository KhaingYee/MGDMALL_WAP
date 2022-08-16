<template>
    <div class="active">
        <!-- <div v-title data-title="活动">活动</div> -->
        <div class="active-header">
            <span></span>
            <span>活动</span>
            <img class="fr" :src="activityImg" alt />
        </div>

        <!--banner广告-->
        <!-- <div class="banner">
            <img :src="bannerImg" alt />
        </div> -->

        <!--整点秒杀-->
        <!-- <div class="ontime-seckill" @click="more(1)">
            <div class="title">
                <div>
                    <span>整点秒杀</span>
                </div>
                <div>
                    更多
                    <img :src="moreImg" alt />
                </div>
            </div>
            <img class="ontime-seckill-banner" :src="seckillImg" alt />
        </div> -->

        <!--全名砍价-->
        <!-- <div class="all-people-bargaining"  @click="more(2)">
            <div class="title">
                <div>
                    <span>全民砍价</span>
                </div>
                <div>
                    更多
                    <img :src="moreImg" alt />
                </div>
            </div>
            <img class="ontime-seckill-banner" :src="cutPriceImg" alt />
        </div> -->
        <div class="all-people-bargaining"  @click="more(2)">
            <img class="wallpapercss" src="../../assets/images/background.png"/>
        </div>

        <!--一起来拼团-->
        <div class="assemble-activity">
            <div class="title">
                <div>
                    <span>一起来拼团</span>
                </div>
                <div @click="more(3)">
                    更多
                    <img :src="moreImg" alt />
                </div>
            </div>
            <div class="assemble-list">
                <div
                    class="assemble"
                    v-for="(item,index) in plazzGoodList"
                    :key="index"
                    @click="godetails(item.id,item.goods_id,item.status,item.order_id)"
                >
                    <div class="assemble-img">
                        <img :src="URL + item.pic_url" alt />
                    </div>
                    <div class="message">
                        <div class="assemble-title">{{item.title}}</div>
                        <div class="assemble-price">￥{{item.activity_price}}</div>
                        <div class="progress">
                            <div class="progress-bar">
                                <span :style="{width:(item.buy_num/item.activity_num)*100+'%'}"></span>
                                <!-- <span :style="({width:(item.buy_num/item.panic_buy || 0)*100+'%'})"></span> -->
                            </div>
                            <!-- <div>{{((item.buy_num/item.panic_buy)*100).toFixed(0)}}%</div> -->
                            <div>{{item.percentage}}%</div>
                        </div>
                        <div class="bottom">
                        <div class="num">{{item.buy_num}}人已拼单</div>
                        <div class="status" v-if="item.status == 1 ">拼团中</div>
                        <div class="status" v-if="item.status == 0 ">去开团</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--优惠购-->
        <!--<div class="preferential-purchase" v-for="a in 3">-->
        <!--<img src="../../assets/active1.png" alt="">-->
        <!--<div class="title">电影《实习生》的客厅小摆件</div>-->
        <!--<div class="subtitle">房间小物品低价优惠购</div>-->
        <!--</div>-->
    </div>
</template>

<script>
import qs from 'qs';
export default {
    name: "active",
    data() {
        return {
            plazzGoodList: [], //拼团数据
            full: [],
            sheetsNum: [],
            groupStatus : '',
            activityImg: require("../../assets/activity/xiaoxi.png"),
            bannerImg: require("../../assets/activity/active1.png"),
            moreImg: require("../../assets/activity/btn-right.png"),
            seckillImg: require("../../assets/activity/active3.png"),
            cutPriceImg: require("../../assets/activity/active2.png"),
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
    created(){
        let title = "活动" + '-' + sessionStorage.getItem('titleKey') + '-' + sessionStorage.getItem('updateDescription');
        this.showScroll.scrollTitle(title);
    },
    mounted() {
        this.shopmessage();
    },
    methods: {
        godetails(id, goodid, status, order_id) {
              this.$router.push({
                name: "assembleproduct",
                params: {
                    id: id,
                    goodId: goodid
                }
            });
            // if(status == 0){
            //      this.$router.push({
            //     name: "assembleproduct",
            //     params: {
            //         id: id,
            //         goodId: goodid
            //     }
            // });
            // }else if(status == 1){
            //       this.$router.push({
            //         name: "puzzleOrderDetail",
            //         params:{
            //             id:order_id,
            //         }
            //     });
            // }
           
        },
        shopmessage() {
            //pluzzgood  获取拼团所有数据
            this.axios.post(this.$httpConfig.pluzzgood, qs.stringify({
                token: sessionStorage.getItem("data_token")
            })).then(res => {
                this.plazzGoodList = res.data.data.data;
                for (var i = 0; i < res.data.data.data.length; i++) {
                    if (i == 4) {
                        this.plazzGoodList.push(res.data.data.data[i]);
                        break;
                    }
                }
            });
        },
        more(index) {
            switch (index) {
                case 1:
                    this.$router.push({
                        //整点秒杀
                        name: "seckill"
                    });
                    break;
                case 2:
                    this.$router.push({
                        //全民砍价
                        name: "bargain"
                    });
                    break;
                case 3:
                    this.$router.push({
                        //一起来拼团
                        name: "assemble"
                    });
                    break;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.active {
    .active-header {
        padding: 0 0.2rem;
        height: 1rem;
        line-height: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #ffffff;
        span {
            font-size: 0.36rem;
        }
        img {
            width: 0.4rem;
        }
    }

    .banner {
        img {
            width: 100%;
        }
    }

    .ontime-seckill,
    .all-people-bargaining {
        background: #ffffff;
        padding: 4% 2%;
        .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            > div {
                span {
                    font-size: 0.28rem;
                    font-weight: bold;
                }
            }

            > div:nth-child(2) {
                display: flex;
                align-items: center;
                font-size: 0.26rem;
                color: #777777;
                img {
                    width: 0.15rem;
                    margin-left: 0.05rem;
                }
            }
        }
        .ontime-seckill-banner {
            width: 100%;
            margin-top: 0.2rem;
        }
        .wallpapercss {
            width: 100%;
            border-radius: 4px;
            height: 180px;
        }
    }

    .all-people-bargaining {
        margin-top: 0.2rem;
        .title {
            > div:nth-child(1) {
                display: flex;
                align-items: flex-end;
                > div {
                    margin-left: 0.1rem;
                    .num {
                        color: #d6d6d6;
                        display: inline-block;
                        width: 0.3rem;
                        height: 0.3rem;
                        text-align: center;
                        line-height: 0.3rem;
                        background: #333333;
                        font-size: 0.24rem;
                    }

                    .colon {
                        font-size: 0.3rem;
                        margin: 0 0.05rem;
                    }
                }
            }
        }
    }

    .assemble-activity {
        background: #ffffff;
        margin-top: 0.2rem;
        padding-top: 4%;
        .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 2%;
            > div {
                span {
                    font-size: 0.28rem;
                    font-weight: bold;
                }
            }

            > div:nth-child(2) {
                display: flex;
                align-items: center;
                font-size: 0.26rem;
                color: #777777;
                img {
                    width: 0.15rem;
                    margin-left: 0.05rem;
                }
            }
        }
        .assemble-list {
            .assemble {
                display: flex;
                padding: 0.2rem 0;
                border-bottom: 1px solid #dfdfdd;
                .assemble-img {
                    margin-left: 4%;
                    img {
                        width: 2rem;
                    }
                }
                .message {
                    margin-left: 0.2rem;
                    flex: 1;
                    .assemble-title {
                        font-size: 0.28rem;
                        width: 4.5rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        color: #333333;
                    }
                    .assemble-price {
                        color: #ff7900;
                        font-size: 0.28rem;
                        margin-top: 0.1rem;
                    }

                    .progress {
                        display: flex;
                        align-items: center;
                        .progress-bar {
                            width: 4rem;
                            height: 0.12rem;
                            background: #e9e9e9;
                            border-radius: 0.12rem;
                            > span {
                                display: inline-block;
                                width: 0%;
                                background: #ff7900;
                                border-radius: 0.12rem;
                                height: 0.12rem;
                            }
                        }
                        > div:nth-child(2) {
                            color: #6a6a6a;
                            font-size: 0.26rem;
                            margin-left: 0.1rem;
                        }
                    }
                   
                }
            }
        }
    }
     .bottom{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding-right: .3rem;
                        margin-top: .1rem;
                        >div:nth-child(1){
                            color: #6a6a6a;
                            font-size: .24rem;
                        }

                        .num {
                        font-size: 0.28rem;
                    }
                    .status {
                        display : flex;
                         color: #6a6a6a;
                        font-size: 0.28rem;
                        padding-right : 0.1rem;
                    }

                        }

                    

    .preferential-purchase {
        padding: 2%;
        margin-top: 0.2rem;
        background: #ffffff;
        img {
            width: 100%;
        }
        .title {
            font-size: 0.3rem;
            font-weight: bold;
            margin: 0.2rem 0 0.1rem 0;
        }

        .subtitle {
            font-size: 0.26rem;
            color: #777777;
            margin-bottom: 0.3rem;
        }
    }
}
</style>
