<template>
    <div class="per-center">
        <div v-title data-title="个人中心">个人中心</div>
        <div class="header-wrap" :style="'background-color:'+ApiColor">
            <div class="header-dd-center">
                <!-- <div v-if="data.user_header" class="icon-wrap">
                    <img v-if="data.user_header.indexOf('http')==-1" :src="URL+data.user_header"/>
                    <img v-else :src="data.user_header"/>
                </div>
                <div v-else class="icon-wrap">
                    <img src="../../assets/my_user_pic.png"/>
                </div> -->
                <div v-if="data.user_header" class="icon-wrap">
                    <img v-if="data.user_header.split(':').length == 1" :src="URL+data.user_header" @click="gotoSetting()" onerror="this.src='https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortRound&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=BlazerShirt&eyeType=WinkWacky&eyebrowType=Default&mouthType=Default&skinColor=Light'"/>
                    <img v-else-if="data.user_header.split(':').length == 2" :src="data.user_header" @click="gotoSetting()" onerror="this.src='https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortRound&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=BlazerShirt&eyeType=WinkWacky&eyebrowType=Default&mouthType=Default&skinColor=Light'"/>
                </div>
                <div v-else class="icon-wrap">
                    <img src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortRound&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=BlazerShirt&eyeType=WinkWacky&eyebrowType=Default&mouthType=Default&skinColor=Light" @click="gotoSetting()" onerror="this.src='https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortRound&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=BlazerShirt&eyeType=WinkWacky&eyebrowType=Default&mouthType=Default&skinColor=Light'"/>
                </div>
                <div class="iconContent">
                    <div class="approval-div">
                        <p class="usernamestyle">{{data.user_name}}</p>
                        <el-dropdown v-if="data.authentication==2">
                            <img src="../../assets/approve.png" v-if="data.authentication==2" class="approval-img"/>   
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>已实名认证</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <p class="signbut" @click="sign">签到福利</p>
                </div>
                <div class="iconright">
                    <div class="right-warp">
                        <p class="imgbg">
                            <img src="../../assets/images/skqx.png"/>
                        </p>
                        <div class="boxtext" @click="checkmember">
                            <span class="member">超级会员</span>
                            <span class="limits">产看权限</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hederbottom">
                <ul class="navlist">
                    <li v-for="(item,index) in topattention" @click="topnav(index)">
                        <p class="pnumber">{{item.text}}</p>
                        <p class="ptext">{{item.txt}}</p>
                    </li>
                </ul>
            </div>
        </div>

        <div class="myOrder clearfix">
            <div class="title fl" style="width: 80%;">
                <span class="icon"></span>
                我的订单
            </div>
            <div class="see fr" @click="myOrderList">
                <span class="icon-right"></span>查看订单
            </div>
        </div>
        <div class="navlinkbox">
            <div class="boxul">
                <ul class="nav-link clearfix">
                    <li
                        class="fl"
                        v-for="(item,index) in navCon"
                        :key="item.id"
                        @click="myOrder2(index)"
                    >
                        <div class="icon-wrap">
                            <p v-if="item.num>0" class="orderNum">{{item.num}}</p>
                            <img :src="item.imgData" alt/>
                        </div>
                        <p>{{item.text}}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="navlinkbox2">
            <ul class="nav-link">
                <li
                        v-for="(item,index) in navCon2"
                        :key="item.id"
                        @click="myOrder3(index)"
                >
                    <div class="xian">
                        <img :src="item.imgData" alt/>
                        <p>{{item.text}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="navlinkbox3">
            <ul class="navlist">
                <li v-for="(item,index) in navCon3" :key="index" @click="myOrder4(index)">
                    <span v-if="item.text" class="pnumber" :class="{'pnum':item.imgData ==''}">{{item.text}}</span>
                    <p v-if="item.imgData" class="pimg" style="text-align: center;">
                        <img :src="item.imgData" style="width: 23px;" alt/>
                    </p>
                    <p class="ptext" :class="{'pcss':item.imgData !=''}">{{item.txt}}</p>
                </li>
            </ul>
        </div>
        <div class="myOrder clearfixserver">
            <div class="title fl">我的服务</div>
            <!-- <div class="see fr" @click="myserver1">
                <span class="icon-right"></span>
            </div> -->
        </div>
        <div class="navserver1">
            <ul class="nav-link clearfix">
                <li
                        class="fl"
                        v-for="(item,index) in navserver1"
                        :key="item.id"
                        @click="myserver2(index)"
                >
                    <div class="icon-wrap">
                        <img :src="item.imgData" alt/>
                    </div>
                    <p>{{item.text}}</p>
                </li>
            </ul>
        </div>
        <div class="navserver1">
            <ul class="nav-link clearfix">
                <li
                        class="fl"
                        v-for="(item,index) in navserver2"
                        :key="item.id"
                        @click="myserver3(index)"
                >
                    <div class="icon-wrap">
                        <img :src="item.imgData" alt/>
                    </div>
                    <p>{{item.text}}</p>
                </li>
            </ul>
        </div>
        
        <div class="navserver1">
            <ul class="nav-link clearfix">
                <li class="fl" v-for="(item,index) in addIcon" :key="index" @click="toLink(index)">
                    <div class="icon-wrap">
                        <img :src="item.imgData" alt/>
                    </div>
                    <p>{{item.text}}</p>
                </li>
            </ul>
        </div>  
        <!-- <Shopsn></Shopsn>
        <signIn class="sigbga" v-if="datanumStart" @signBut="signBut" @openGift="openGift"></signIn> -->
        <!-- 签到 签到signBut    抽奖openGift-->
        <!-- <luckDraw class="sigbgb" v-if="luckDrawFlag" @closeLuckraw="closeLuckraw"></luckDraw> -->
        <!-- 抽奖 -->
    </div>
</template>
<script>
    import qs from "qs";
    // import luckDraw from "./children/luckDraw.vue"; //签到抽奖
    // import signIn from "./children/signIn.vue"; //签到
    // import Shopsn from "@/components/page/Shopsn.vue";
    import "../../config/getUrlParm.js";
    import {request} from "https";

    export default {
        name: "MyAiguxuan",
        data() {
            return {
                ims: false,
                other: {},
                datanumStart: false, //显示签到
                luckDrawFlag: false, //显示抽奖
                scrollWatch: false,
                ApiColor:'',
                Imag: "",
                topattention: [
                    {text: "0", txt: "收藏宝贝"},
                    {text: "0", txt: "关注店铺"},
                    {text: "0", txt: "关注门店"},
                    {text: "0", txt: "足迹"}
                ],
                //我的服务
                navserver1: [
                    {
                        text: "我的发票",
                        imgData: require("@/assets/images/invoice.png")
                    },
                    {
                        text: "我的积分",
                        imgData: require("@/assets/images/youhuiquan.png")
                    },
                    {
                        text: "积分商城",
                        imgData: require("@/assets/images/loadingjifenguize.png")
                    },
                    {
                        text: "评价管理",
                        imgData: require("@/assets/images/pjgl.png")
                    }
                ],
                navserver2: [
                    // {
                    //     text: "邀请返利",
                    //     imgData: require("@/assets/images/fl.png")
                    // },
                    // {text: "推客", imgData: require("@/assets/images/tk.png")},
                    {
                        text: "账户设置",
                        imgData: require("@/assets/images/shezhi.png")
                    },
                    {
                        text: "客服服务",
                        imgData: require("@/assets/images/kefu.png")
                    },
                    // {
                    //     text: "分销中心",
                    //     imgData: require("@/assets/images/fenxiaozhongxin.png")
                    // }
                    {
                        text: "举报",
                        imgData: require("@/assets/images/report1.png")
                    },
                    {
                        text: "意见反馈",
                        imgData: require("@/assets/images/opinion.png")
                    },
                ],
                addIcon: [
                    {
                        text: "我的收藏",
                        imgData: require("@/assets/images/collection.png")
                    },
                    // {   
                    //     text: "我的拍卖", 
                    //     imgData: require("@/assets/images/auction.png")
                    // },
                    // {
                    //     text: "我的钱包",
                    //     imgData: require("@/assets/images/wallet.png")
                    // },
                    {
                        text: "我要开店",
                        imgData: require("@/assets/images/shop.png")
                    },
                    {
                        text: "收货地址",
                        imgData: require("@/assets/images/myAdvice.png")
                    },
                    // {
                    //     text: "客服中心",
                    //     imgData: require("@/assets/images/service.png")
                    // },
                    {
                        text: "积分订单",
                        imgData: require("@/assets/images/intmall_order.png")
                    }
                    
                ],
                //我的订单
                navCon1: [
                    {
                        num: '0',
                        text: "待付款",
                        imgData: require("@/assets/images/daifukuan.png")
                    },
                    {num: '0', text: "待处理", imgData: require("@/assets/images/dfh.png")},
                    {
                        num: '0',
                        text: "待收货",
                        imgData: require("@/assets/images/daishouhuo.png")
                    },
                    {num: '0', text: "待评价", imgData: require("@/assets/images/dpj.png")},
                    {
                        num: '0',
                        text: "退换售后",
                        imgData: require("@/assets/images/tksh.png")
                    }
                ],
                navCon2: [
                    // {
                    //     text: "门店订单",
                    //     imgData: require("@/assets/images/mddd.png")
                    // },
                    /* {
                         text: "积分商城订单",
                         imgData: require("@/assets/images/jfw.png")
                     },*/
                    {
                        text: "拼团订单",
                        imgData: require("@/assets/images/tg.png")
                    },
                    {
                        text: "套餐订单",
                        imgData: require("@/assets/images/dingdan.png")
                    },
                    {
                        text: "其他订单",
                        imgData: require("@/assets/images/qtdd.png")
                    }
                ],
                navCon3: [
                    {text: "0", txt: "可用积分"},
                    {text: "0", txt: "优惠卷"},
                    // {text: "0", txt: "红包"},
                    {text: "0.00", txt: "余额"},
                    // {
                    //     imgData: require("@/assets/images/wdzc.png"),
                    //     txt: "我的资产"
                    // }
                ],
                data: "",
                userImage: '',//用户图像
                user_header: true,
                signInDisplay: false,
                navCon: [
                    { num: '0', text: "待付款", imgData: require("@/assets/Orders_01.png") },
                    { num: '0', text: "待发货", imgData: require("@/assets/Orders_02.png") },
                    { num: '0', text: "待收货", imgData: require("@/assets/Orders_03.png") },
                    { num: '0', text: "已完成", imgData: require("@/assets/Orders_04.png") },
                    { num: '0', text: "返修/退货", imgData: require("@/assets/Orders_05.png") }
                ],
            };
        },
        destroyed() {
            this.scrollWatch = false;
        },
        components: {
            // Shopsn,
            // signIn,
            // luckDraw
        },
        methods: {
            StyColor() {
            this.axios
                .post(this.$httpConfig.StyColor, qs.stringify({
                    token: sessionStorage.getItem("data_token")
                }))
                .then(res => {
                    this.ApiColor = res.data.data.theme_color;
                })
                .catch(error => {
                    console.log(error);
                });
            },
            //签到福利按钮
            sign() {
                // signInLuckDraw
                // this.$router.push({
                //     name: 'comingSoon'
                // })
            },

            signBut() {
                this.datanumStart = false;
            },
            openGift() {
                this.luckDrawFlag = true;
            },
            closeLuckraw() {
                this.luckDrawFlag = false;
                this.datanumStart = true;
            },
            //超级会员
            checkmember() {
                // memberRule
                // this.$router.push({
                //     name: "comingSoon"
                // });
            },
            //头部导航
            topnav(index) {
                switch (index) {
                    case 0:
                        this.$router.push({
                            name: "myCollection",
                            params: {
                                index:0,
                                type: 0
                            }
                        });

                        break;
                    case 1:
                        this.$router.push({
                            name: "myCollection",
                            params: {
                                index:1,
                                type: 1                               
                            }
                        });
                        break;
                    case 2:
                        this.$router.push({
                            name: "myCollection",
                            params: {
                                index:0,
                                type: 2
                            }
                        });
                        break;
                    case 3:
                        this.$router.push("/footprint");
                        break;
                }
            },
            //我的订单
            myOrderList() {
                this.$router.push({
                    name: "orderList",
                    params: {id: 0}
                });
            },
            myOrder2(sat) {
                if (sat == 0) {
                    this.$router.push({
                        name: "orderList",
                        params: {id: 1}
                    });
                } else if (sat == 1) {
                    this.$router.push({
                        name: "orderList",
                        params: {id: 2}
                    });
                } else if (sat == 2) {
                    this.$router.push({
                        name: "orderList",
                        params: {id: 3}
                    });
                } else if (sat == 3) {
                    this.$router.push({
                        name: "orderList",
                        params: {id: 4}
                    });
                } else if (sat == 4) {
                    this.$router.push("/repair");
                    return;
                }
            },
            myOrder3(index) {
                switch (index) {
                    // case 0:
                    //     // shopOrder
                    //     this.$router.push("/comingSoon"); //documents.vue
                    //     break;
                    case 0:
                        this.$router.push("/puzzleOrder");
                        break;
                    case 1:
                    this.$router.push({
                        name:"packageList",
                        params:{
                            id:0
                        }
                    });
                    break;
                    case 2:
                        this.$router.push({
                            name:"orderList", //bargainOrderList
                            params:{
                                id:0
                            }
                        })
                        break;
                }
            },
            myOrder4(index) {
                switch (index) {
                    case 0:
                        this.$router.push("/Integral"); //documents.vue

                        break;
                    case 1:
                        this.$router.push("/coupon");
                        break;
                    // case 2:
                    //     this.$router.push("/comingSoon"); //platformRedPacked
                    //     break;
                    case 2:
                        this.$router.push("/myWallet");
                        break;
                    case 3:
                        this.$router.push("/myWallet");
                        break;
                }
            },
            //我的服务
            myserver1() {
            },
            gotoSetting(){
                this.$router.push("/seetin");
            },
            myserver2(index) {
                switch (index) {
                    case 0:
                        this.$router.push("/documents"); //documents.vue

                        break;
                    case 1:
                        this.$router.push("/Integral"); //integralDraw
                        break;
                    case 2:
                        this.$router.push("/IntegralMall");
                        break;
                    case 3:
                        this.$router.push("/myComment");
                        break;
                }
            },
            myserver3(index) {
                switch (index) {
                    // case 0:
                    //     this.$router.push("/comingSoon"); //invitedShare
                    //     break;
                    // case 1:
                    //     this.$router.push({
                    //         name: "comingSoon"  //RecommendIntro
                    //     });
                    //     break;
                    case 0:
                        this.$router.push("/seetin");
                        break;
                    case 1:
                        this.$router.push("/customer");
                        break;
                    // case 2:
                    //     this.$router.push("/distribution");
                    //     break;
                    case 2:
                        this.$router.push("/informOutline");
                        break;
                    case 3:
                        this.$router.push("/Feedback");
                        break;///////////////////////
                }
            },
            toLink(link) {
                function isString(str) {
                    return typeof str == "string" && str.constructor == String;
                }
                if (isString(link)) {
                    this.$router.push({
                        path: link
                    });
                } else {
                    switch (link) {
                        case 0:
                            this.$router.push("/Collection");
                            break;
                        // case 1:
                        //     this.$router.push("/comingSoon");
                        //     break;
                        case 1:
                            this.$router.push("/shopOpen");
                            break;
                        case 2:
                            this.$router.push({
                                name: "address",
                                params: {
                                    status: 2
                                }
                            });
                            break;
                        // case 3:
                        //     this.$router.push("/Feedback");
                        //     break;
                        case 3:
                            this.$router.push("/intOrder");
                            break;
                        case 4:
                            this.$router.push("/informOutline");
                            break;
                        case 5:
                            this.$router.push("/Feedback");
                            break;///////////////////////
                        case 6:
                            this.$router.push("/myComment");
                            break;
                        case 7:
                            this.$router.push({
                                name: "address",
                                params: {
                                    status: 2
                                }
                            });
                            break;
                        case 8:
                            this.$router.push("/customer");
                            break;
                        case 9:
                            this.$router.push("/Feedback");
                            break;
                        case 10:
                            this.$router.push({
                                name: "packageList",
                                params: {
                                    id: 0
                                }
                            });
                            break;
                        case 11:
                            this.$router.push("/intOrder");
                            break;
                        case 12:
                            this.$router.push("/distribution");
                            break;
                    }
                }
            }
        },
        created() {
            let title = "个人中心" + '-' + sessionStorage.getItem('titleKey') + '-' + sessionStorage.getItem('updateDescription');
            this.showScroll.scrollTitle(title);
            this.StyColor();
        },
        mounted() {
            document.body.scrollTop = 0;
            this.axios
                .post(this.$httpConfig.userinfo, qs.stringify({
                    token: sessionStorage.getItem("data_token")
                }))
                .then(res => {
                    if (res.data.status == 1) {
                        this.data = res.data.data;
                        this.userImage = res.data.data.user_header;
                        this.navCon[0].num = res.data.data.order.pendingPayment;//代付款
                        this.navCon[1].num = res.data.data.order.pendingDelivery;//代处理
                        this.navCon[2].num = res.data.data.order.receivingGoods;//待交货  receivingGoods
                        this.navCon[3].num = res.data.data.order.toBeEvaluated;//待评价
                        this.navCon[4].num = res.data.data.order.refunds;//退款

                        //userImage= res.data.data.user_header;
                        this.other = res.data.data.other;
                        this.topattention[0].text = this.other.collection;
                        this.topattention[1].text = this.other.store;
                        this.topattention[2].text = this.other.shop;
                        this.topattention[3].text = this.other.foot;


                        if (this.other.integral == '') {
                            this.navCon3[0].text = "0";
                        } else {
                            let t0 = this.other.integral
                            this.navCon3[0].text = t0.toString();
                        }
                        let t1 = this.other.coupon
                        this.navCon3[1].text = t1.toString();
                        // let t2 = this.other.red_price
                        // this.navCon3[2].text = t2.toString();
                        let t3 = this.other.balance
                        this.navCon3[2].text = t3.toString()
                            ? t3.toString()
                            : "0";

                        let ua = window.navigator.userAgent.toLowerCase();
                        if (ua.match(/MicroMessenger/i) == "micromessenger") {
                            this.$store.state.user_Imag = res.data.data.weixheader;
                        } else {
                            this.$store.state.user_Imag = res.data.data.user_header;
                        }
                    }
                    else {
                        this.$router.push("/LogIn");
                    } 
                })
                .catch(err => {
                    // if(err){
                    //    this.$router.push("/LogIn"); 
                    // }
                    console.log(err);
                });
        },
        wacth: {}
    };
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
margin: 0;
// height: .1rem;
}
.el-dropdown-menu {
    /* width: 230px !important; */
    position: absolute !important;
    margin: .1rem -1rem 0 0 !important;
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
    body {
        background: #ffffff;
    }

    .sigbga {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 40;
    }

    .sigbgb {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 41;
    }

    .per-center {
        /* background:#f1f1f1;*/
    }

    .header-wrap {
        padding-top: 1rem;
        width: 100%;
        background-color: #f1f1f1;

        .header-dd-center {
            width: 100%;
            height: 1.5rem;
            position: relative;

            .setUp {
                width: 0.62rem;
                height: 0.61rem;
                position: absolute;
                left: 0rem;
                top: 50%;
                margin-top: -0.305rem;
                background: url(../../assets/setUp.png) no-repeat;
                background-size: 100% 100%;
            }

            .icon-wrap {
                margin-top: 0.05rem;
                width: 1.35rem;
                height: 1.35rem;
                float: left;
                border-radius: 100%;
                margin-left: 0.2rem;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 100%;
                }
            }

            .iconContent {
                float: left;
                margin-left: 0.2rem;
                width: 40%;
                height: 1.5rem;
                .approval-div{
                    display: flex;
                    .usernamestyle {
                        margin-top: 0.25rem;
                        font-size: 0.35rem;
                        color: #ffe7cf;
                    }
                    .approval-img{
                        margin: .2rem 0 0 .15rem;
                        width: .5rem;
                    }
                }
                .signbut {
                    margin-top: 0.2rem;
                    width: 45%;
                    height: 0.5rem;
                    text-align: center;
                    border-radius: 0.2rem;
                    line-height: 0.5rem;
                    font-size: .24rem;
                    background: #ff9537;
                    color: #eeffff;
                }
            }

            .iconright {
                float: right;
                width: 33%;
                height: 1.5rem;

                .right-warp {
                    float: right;

                    .imgbg {
                        margin-top: 0.3rem;
                        float: right;
                        width: 2.6rem;
                        height: 0.95rem;

                        /*  border-radius: 50%;
                                 background: black;*/

                        img {
                            float: right;
                            width: 100%;
                            height: 100%;
                        }
                    }

                    .boxtext {
                        position: absolute;
                        top: 0.45rem;
                        right: 0.3rem;
                        display: flex;
                        flex-direction: column;
                        margin-right: .15rem;
                        /*left:78%;*/

                        .member {
                            font-size: 0.26rem;
                            color: #d6bf93;
                        }

                        .limits {
                            font-size: .23rem;
                            color: #8e8e8e;
                        }
                    }
                }
            }

            .admin {
                height: 0.61rem;
                width: 1.68rem;
                line-height: 0.61rem;
                background: #fff;
                position: absolute;
                right: 0;
                top: 50%;
                margin-top: -0.305rem;
                border-radius: 20px 0 0 20px;
                box-sizing: border-box;
                text-indent: 0.53rem;
                font-size: 0.24rem;
                color: #797979;

                span {
                    position: absolute;
                    top: 50%;
                    left: 0.15rem;
                    margin-top: -0.135rem;
                    width: 0.27rem;
                    height: 0.27rem;
                    background: url(../../assets/images/setUp.png) no-repeat;
                    background-size: 100% 100%;
                }
            }
        }

        .hederbottom {
            margin-top: 0.1rem;
            width: 100%;
            height: 1rem;
            padding-bottom: .2rem;

            .navlist {
                width: 100%;
                height: 1rem;
                margin: auto;
                list-style: none;
                display: flex;
                flex-direction: row;

                li {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    p {
                        width: 100%;
                        height: 0.3rem;
                        text-align: center;
                        font-size: .3rem;
                    }

                    .pnumber {
                        font-size: 0.3rem;
                        color: #faebd4;
                        font-weight: 500;
                        height: 0.36rem;
                    }

                    //
                    .ptext {
                        color: #ebd3bb;
                    }
                }
            }
        }

        .status {
            padding: 0.2rem 0;
            text-align: center;
            line-height: 0.31rem;

            span {
                display: inline-block;
                height: 0.31rem;
            }

            .name {
                font-size: 0.28rem;
                color: #fff;
            }

            .member {
                padding-left: 0.37rem;
                padding-right: 0.1rem;
                width: 1.08rem;
                font-size: 0.24rem;
                color: #fff600;
                background: url(../../assets/mberIcon.png) no-repeat;
                background-size: 100% 100%;
            }
        }
    }

    .myOrder {
        width: 100%;
        height: 0.94rem;
        line-height: 0.94rem;
        background: #fff;
        display: flex;
        flex-direction: row;

        .title {
            width: 90%;
            font-size: 0.28rem;
            color: #333;
            text-indent: 0.3rem;
        }
        
        .icon-right {
            width: 0.39rem;
            height: 0.39rem;
            margin-top: -0.195rem;
            background: url("../../assets/btn-right.png") no-repeat;
            background-size: 100% 100%;
        }

        .icon-wallet {
            position: absolute;
            left: 0;
            top: 50%;
            width: 0.39rem;
            height: 0.39rem;
            margin-top: -0.195rem;
            background: url(../../assets/wallet_ico.png) no-repeat;
            background-size: 100% 100%;
        }

        .see {
            font-size: 0.24rem;
            color: #999;
            position: relative;
            padding-right: 0.4rem;

            .icon-right {
                position: absolute;
                right: 0;
                top: 50%;
                width: 0.18rem;
                height: 0.3rem;
                margin-top: -0.15rem;
                background: url("../../assets/btn-right.png") no-repeat;
                background-size: 100% 100%;
            }
        }
    }
    .myOrder {
        width: 7.1rem;
        height: 0.94rem;
        padding: 0 0.2rem;
        line-height: 0.94rem;
        background: #fff;
        .title {
            font-size: 0.28rem;
            color: #333;
            text-indent: 0.6rem;
            position: relative;
        }
        .icon {
            position: absolute;
            left: 0;
            top: 50%;
            width: 0.39rem;
            height: 0.39rem;
            margin-top: -0.195rem;
            background: url(../../assets/images/qddd.png) no-repeat;
            background-size: 100% 100%;
        }
    }
    .navlinkbox {
        width: 100%;
        background: white;
        padding-bottom: 0rem;

        .boxul {
            width: 100%;

            .nav-link {
                width: 95%;
                margin: auto;
                border-top: 0.01rem solid #e7e7e7;
                margin-bottom: 0.14rem;

                li {
                    width: 20%;
                    height: 1.26rem;
                    text-align: center;
                    padding-top: 0.1rem;

                    .icon-wrap {

                        width: 100%;
                        height: 0.8rem;
                        position: relative;
                        /* border: 1px solid red;*/

                        .orderNum {
                            position: relative;
                            top: 0;
                            left: 65%;
                            width: 0.45rem;
                            height: 0.45rem;
                            line-height: 0.35rem;
                            text-align: center;
                            border-radius: 50%;
                            color: #ff9d4b;
                            border: 0.01rem solid #ff9d4b;
                        }

                        img {
                            position: absolute;
                            left: 0;
                            top: 0;
                            bottom: 0;
                            right: 0;
                            margin: auto;
                        }
                    }

                    p {
                        font-size: 0.24rem;
                        color: #797979;
                    }
                }

                li:nth-child(1) {
                    .icon-wrap {
                        img {
                            width: 0.39rem;
                            height: 0.38rem;
                        }
                    }
                }

                li:nth-child(2) {
                    .icon-wrap {
                        img {
                            width: 0.41rem;
                            height: 0.4rem;
                        }
                    }
                }

                li:nth-child(3) {
                    .icon-wrap {
                        img {
                            width: 0.39rem;
                            height: 0.37rem;
                        }
                    }
                }

                li:nth-child(4) {
                    .icon-wrap {
                        img {
                            width: 0.4rem;
                            height: 0.34rem;
                        }
                    }
                }

                li:nth-child(5) {
                    .icon-wrap {
                        img {
                            width: 0.43rem;
                            height: 0.37rem;
                        }
                    }
                }
            }
        }
    }

    .navlinkbox2 {
        margin-top: 0rem;
        width: 100%;
        background: white;

        .nav-link {
            display: flex;

            li {
                width: 20%;
                height: 1rem;
                text-align: center;
                padding: 0.15rem 0;

                .xian {

                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    // width: 100%;

                    img {
                        width: .4rem;
                        height: .4rem;
                        margin-bottom: .15rem;
                    }

                    p {
                        font-size: 0.24rem;
                        color: #797979;
                    }
                }
            }

            li:nth-child(1) {
                flex: 1;

                .xian {
                    .icon-wrap {
                        margin: auto;

                        img {
                            width: 0.39rem;
                            height: 0.38rem;
                        }
                    }
                }
            }

            li:nth-child(2) {

                flex: 1;

                .xian {
                    .icon-wrap {
                        width: 100%;

                        img {
                            width: 0.41rem;
                            height: 0.4rem;
                        }
                    }

                }
            }

            li:nth-child(3) {
             
                flex:1;

                .xian {
                 

                    .icon-wrap {
                        margin-top: 0.1rem;
                        width: 100%;
                        height: 0.75rem;

                        img {

                            margin: auto;
                            width: 0.39rem;
                            height: 0.37rem;
                        }
                    }

                    p {
                        width: 70%;

                    }
                }
            }

            li:nth-child(4) {
                .xian {
                    .icon-wrap {
                        img {
                            width: 0.4rem;
                            height: 0.34rem;
                        }
                    }
                }
            }

            li:nth-child(5) {
                .xian {
                    .icon-wrap {
                        img {
                            width: 0.43rem;
                            height: 0.37rem;
                        }
                    }
                }
            }
        }
    }

    .navlinkbox3 {
        margin-top: 0.1rem;
        width: 100%;
        background: white;
        padding: .15rem 0;

        .navlist {
            display: flex;
            flex-direction: row;
            list-style: none;

            li {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 1rem;
                flex: 1;

                p {
                    width: 100%;
                }

                .pnumber {

                    text-align: center;
                    font-size: 0.3rem;
                    color: #565656;
                    font-weight: 500;
                    height: 0.36rem;
                }

                //
                .pnum {
                    margin-top: 0.2rem;
                }

                .ptext {
                    text-align: center;
                    margin-top: 0.15rem;
                    font-size: 0.24rem;
                    color: #505050;
                }

                .pcss {
                    margin-top: 0.1rem;
                }
            }

            li:nth-child(5) {
                flex: none;
                width: 2rem;
                border-left: 1px solid #e5e5e5;
                .pimg {
                    width: 0.45rem;
                    height: 0.45rem;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .ptext {
                    width: 90%;
                    margin-top: 0.15rem;
                    text-align: center;
                }

            }
        }
    }

    .clearfixserver {
        margin-top: 0.1rem;
    }

    .navserver1 {
        width: 100%;
        background: white;

        .nav-link {
            width: 95%;
            margin: auto;
            border-top: 0.01rem solid #e7e7e7;
            display: flex;
            flex-direction: row;

            li {
                flex: 1;
                width: 20%;
                height: 1.26rem;
                text-align: center;
                padding-top: 0.1rem;

                .icon-wrap {
                    width: 100%;
                    height: 0.8rem;
                    position: relative;

                    img {
                        position: absolute;
                        left: 0;
                        top: 0;
                        bottom: 0;
                        right: 0;
                        margin: auto;
                    }
                }

                p {
                    font-size: 0.24rem;
                    color: #797979;
                }
            }
            li:nth-child(1) {
                .icon-wrap {
                    img {
                        width: 0.39rem;
                        height: 0.38rem;
                    }
                }
            }

            li:nth-child(2) {
                .icon-wrap {
                    img {
                        width: 0.41rem;
                        height: 0.4rem;
                    }
                }
            }

            li:nth-child(3) {
                .icon-wrap {
                    img {
                        width: 0.39rem;
                        height: 0.37rem;
                    }
                }
            }

            li:nth-child(4) {
                .icon-wrap {
                    img {
                        width: 0.4rem;
                        height: 0.34rem;
                    }
                }
            }

            li:nth-child(5) {
                .icon-wrap {
                    img {
                        width: 0.43rem;
                        height: 0.37rem;
                    }
                }
            }
        }
    }

    .navserver2 {
        .nav-link {
            width: 90%;
        }
    }
    .navserver3 {
        width: 100%;
        background: white;
        .nav-link {
            width: 90%;
            margin: auto;
            border-top: 0.01rem solid #e7e7e7;
            display: flex; 
            flex-wrap: wrap;

            li {
                width: 20%;
                height: 1.26rem;
                text-align: center;
                padding-top: 0.1rem;
                border-bottom: 0.01rem solid #e7e7e7;
                .icon-wrap {
                    width: 100%;
                    height: 0.8rem;
                    position: relative;

                    img {
                        position: absolute;
                        left: 0;
                        top: 0;
                        bottom: 0;
                        right: 0;
                        margin: auto;
                    }
                }

                p {
                    font-size: 0.24rem;
                    color: #797979;
                }
            }

            li:nth-child(1) {
                .icon-wrap {
                    img {
                        width: 0.39rem;
                        height: 0.38rem;
                    }
                }
            }

            li:nth-child(2) {
                .icon-wrap {
                    img {
                        width: 0.41rem;
                        height: 0.4rem;
                    }
                }
            }

            li:nth-child(3) {
                .icon-wrap {
                    img {
                        width: 0.39rem;
                        height: 0.37rem;
                    }
                }
            }

            li:nth-child(4) {
                .icon-wrap {
                    img {
                        width: 0.4rem;
                        height: 0.34rem;
                    }
                }
            }

            li:nth-child(5) {
                .icon-wrap {
                    img {
                        width: 0.39rem;
                        height: 0.38rem;
                    }
                }
            }

            li:nth-child(6) {
                .icon-wrap {
                    img {
                        width: 0.39rem;
                        height: 0.38rem;
                    }
                }
            }

            li:nth-child(7) {
                .icon-wrap {
                    img {
                        width: 0.39rem;
                        height: 0.38rem;
                    }
                }
            }

            li:nth-child(8) {
                .icon-wrap {
                    img {
                        width: 0.39rem;
                        height: 0.38rem;
                    }
                }
            }
        }
    }

    .account {
        padding: 0.2rem 0;
        height: 0.95rem;
        width: 100%;
        background: #fff;
        margin-bottom: 0.14rem;

        li {
            width: 50%;
            height: 100%;
            border-right: 1px solid #e7e7e7;
            box-sizing: border-box;
            text-align: center;

            .number {
                font-size: 0.42rem;
                color: #333;

                .money {
                    font-size: 0.32rem;
                    color: #999;
                }

                .min {
                    font-size: 0.32rem;
                }
            }

            .balance {
                font-size: 0.24rem;
                color: #999;
                padding-top: 0.15rem;
            }
        }

        li:last-child {
            border: none;
        }
    }
</style>
