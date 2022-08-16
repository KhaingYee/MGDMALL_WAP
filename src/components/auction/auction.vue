<template>
    <div>
        <!-- <div v-title data-title="抢购">抢购</div> -->
        <home-header :userName="title"></home-header>
        <!-- <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in imgs" :key="item.id">
                <img v-lazy="item">
            </mt-swipe-item>
        </mt-swipe> -->
        <ul class="content">
            <li v-for="(item,index) in panicList" :key="index">
                <img :src="URL + item.pic_url" alt="">
                <div class="listChild">
                    <p class="title">{{item.title}}</p>
                    <div class="updis"> 
                        <div>
                            <h4 v-if="(item.start_time*1000) <= currentTimeStamp">抢购中</h4>
                            <h4 v-else class="redTxt">{{formatTime(item.start_time)}}开始抢购</h4>
                            <h5>￥{{item.panic_price}}</h5>
                            <h6>￥{{item.price_member}}</h6>
                        </div>
                        <div>
                            <button v-if="(item.start_time*1000) <= currentTimeStamp"  @click="chase(item.goods_id)">马上抢购</button>
                            <p><span>{{item.already_num}}</span> 人已购买</p>
                        </div>
                    </div>
                    <div class="show-shop">
                        <div class="show-name" @click="goToShop(item.store_id)">{{item.shop_name}}</div>
                        <img @click="goToShop(item.store_id)" src="../../assets/btn-right.png" class="btn-shop" v-if="item.shop_name"/>
                        <el-dropdown v-if="item.store_grade_name">
                            <span class="shop-gradename">{{item.store_grade_name}}</span>
                            <el-dropdown-menu slot="dropdown" v-if="item.classification">
                                <el-dropdown-item>{{item.classification}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </li>
        </ul>
        <div class="comm-null" v-if="!panicList">
            <div class="con-wrap text-center">
                <img src="../../assets/null_com.png">
                <p>暂时没有订单</p>
            </div>
        </div>
    </div>
</template>
<script>
    import HomeHeader from '@/components/home/children/header.vue'; //头部内容
    import qs from 'qs';

    export default {
        data() {
            return {
                notice: "提醒我",
                title: '',
                shopImg: require("@/assets/con23.jpg"),
                panicList: [],
                currentTimeStamp:'',
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
            let title = "抢购" + '-' + sessionStorage.getItem('titleKey') + '-' + sessionStorage.getItem('updateDescription');
            this.showScroll.scrollTitle(title);
            this.getData();
        },
        mounted(){
            var now = new Date();
             this.currentTimeStamp = now.getTime();
        },
        methods: {
            goToShop(id){
				this.$router.push({
					name:"shopHome",
					params:{
					id:id,
					index:0
					}
				})
			},
            getData() {
                this.axios.post(this.$httpConfig.getPanicGoods, qs.stringify({
                    token: sessionStorage.getItem("data_token")
                })).then((res) => {
                    if (res.data.status == 1) {
                        this.panicList = res.data.data.data;
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            // 格式化日期，如月、日、时、分、秒保证为2位数
            formatNumber(n) {
                n = n.toString()
                return n[1] ? n : '0' + n;
            },
            // 参数number为毫秒时间戳，format为需要转换成的日期格式
            formatTime(number) {
                let time = new Date(number*1000)
                var month = this.formatNumber(time.getMonth() + 1);
                var date = this.formatNumber(time.getDate());
                var h = this.formatNumber(time.getHours());
                var m = this.formatNumber(time.getMinutes());
                var format = month + "." + date  + ' ' + h + ":" + m
                return format;
            },
            chase(id) {
                this.$router.push({
                    name:'auctionList',
                    params:{
                        goods_id:id
                    }
                })
            },
            notices() {
                this.notice = "已提醒"
            }
        },
        components: {
            HomeHeader
        }
    }
</script>
<style>
.el-popper[x-placement^=bottom] .popper__arrow {
  border-bottom-color: red !important;
  top: -6px !important;
}
.el-popper .popper__arrow {
  border-width: 6px;
  filter: drop-shadow(0 0.04rem .24rem rgba(0,0,0,.03));   
}
</style>
<style lang="less" scoped>
.el-dropdown{
   
}
.el-dropdown-menu {
    /* width: 230px !important; */
    position: absolute !important;
    margin: .1rem 0 0 0 !important;
    background-color: #FFF;
    border: .02rem solid #de2d35;
    border-radius: .08rem;
    -webkit-box-shadow: 0 0.04rem .24rem 0 rgba(0,0,0,.1);
    box-shadow: 0 0.04rem .24rem 0 rgba(0,0,0,.1);
}
.el-dropdown-menu:hover .row{
    color: #444 !important;
}
.el-dropdown-menu__item {
  line-height: .2rem !important;
  font-size: .24rem !important;
  color:rgb(101, 101, 101) !important;
}
  .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
    color:rgb(101, 101, 101) !important;
    background-color: #ffffff !important;
  }

.el-popper .popper__arrow {
  border-width: 6px;
  filter: drop-shadow(0 0.04rem .24rem rgba(0,0,0,.03));   
}

.el-popper[x-placement^=bottom] .popper__arrow {
  border-bottom-color: red !important;
  top: -6px !important;
}
.el-popper .popper__arrow, .el-popper .popper__arrow:after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;  
}
</style>
<style lang="less" scoped>
    .mint-swipe {
        width: 100%;
        height: 4.28rem;

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
    .comm-null {
        padding-top: 3rem;

        p {
            font-size: .28rem;
            color: #666;
            padding-top: .2rem;
        }
    }
    .content {
        width: 100%;

        li {
            padding: .1rem .3rem;
            height: 3rem;
            background-color: #fff;
            display: flex;
            border-bottom: .01rem solid #B2B2B2;
            align-items: center;

            img {
                width: 2.2rem;
                height: 2.2rem;
            }

            .listChild {
                flex: 1;
                padding-left: .3rem;

                .title {
                    font-size: .28rem;
                    line-height: .4rem;
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                }

                .updis {
                    display: flex;
                    justify-content: space-between;
                    padding: 0 0 .1rem 0;
                    div {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;

                        h4 {
                            width: 100%;
                            font-size: .28rem;
                            color: #d02629;
                        }

                        h5 {
                            width: 100%;
                            font-size: .32rem;
                            color: #F9282B;
                        }

                        h6 {
                            width: 100%;
                            font-size: .24rem;
                            color: #969696;
                            text-decoration: line-through;
                        }

                        button {
                            width: 1.7rem;
                            height: .65rem;
                            border: 0;
                            margin-bottom: .1rem;
                            background-color: #d02629;
                            color: #fff;
                            border-radius: .04rem;
                        }

                        p {
                            width: 100%;
                            text-align: right;
                            font-size: .24rem;
                        }

                        span {
                            color: #EE2329;
                        }

                        .redTxt {
                            color: #F1302B;
                        }

                        .greenBg {
                            font-size: 0.3rem;
                            background-color: #72BE52;
                        }
                    }
                }
                .show-shop{
                    display: flex;
                    .show-name{
                        font-size: .24rem;
                        padding: .03rem .1rem 0 0;
                        color: #999999;
                        width: 2.5rem;
                    }
                    .btn-shop{
                        width: .18rem;
                        height: .2rem;
                        margin: .10rem .2rem 0 0;
                    }
                    .shop-gradename{
                        font-size: .22rem;
                        background: #de2d35;
                        color: white;
                        border-radius: .05rem;
                        padding: .05rem .1rem;
                        text-align: center;
                    }
                }
            }
        }
    }
</style>
