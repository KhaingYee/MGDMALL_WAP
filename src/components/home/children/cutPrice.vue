<template>
    <div class="cutprice_wrapper">
        <div>
            <div class="header">
                <div @click="goLastPage" class="return"></div>
                <div class="tab"></div>
                <div class="share" @click="fenxiang"></div>
            </div>
            <div class="banner">
                <img src="../../../assets/activity/goods.png" alt />
                <div class="blo">
                    <div class="left">砍价</div>
                    <div class="right">
                        <div>距结束仅剩</div>
                        <div>{{day}}天{{hour}}时{{Minute}}分 {{second}}秒</div>
                    </div>
                </div>
            </div>
            <div class="desc">
                <div class="title">{{goods.title}}</div>
            </div>
            <div class="price">
                <div class="top">
                    <div class="original">
                        ￥
                        <span>{{cutpriceGoods.activity_price}}</span>
                    </div>
                    <div class="cut">砍后价</div>
                    <div class="final">￥{{cutpriceGoods.price_member}}</div>
                </div>
                <div class="down">
                    <div>已砍{{cutPriceInfo.already_bargain}}元，还差{{cutPriceInfo.bargain_price - cutPriceInfo.already_bargain}}元</div>
                </div>
            </div>
            <div class="result">
                <img :src="cutPriceUser.user_header" alt />
                <div class="desc1">
                    <div class="cut_up">
                        <div class="num">
                            已有
                            <span>{{cutPriceInfo.count}}</span>好友帮助 {{cutPriceUser.user_name}} 砍价
                        </div>
                        <div class="add">
                            累计砍价
                            <span>{{cutPriceInfo.already_bargain}}</span>元
                        </div>
                    </div>
                    <div class="cut_down">
                        <div class="rea">砍价幅度</div>
                        <div class="pic">
                            <div class="inner">
                                <div class="per" :style="{width:cutPriceInfo.range}">{{cutPriceInfo.range}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="cube"></div>
                <div class="avatar" v-for="(item,index) in cutPriceInfo.bargain">
                    <img :src="item.user_header" alt />
                    <div class="ava_r">
                        {{item.user_name}}
                        <span>{{item.already_bargain}}</span>
                        元
                    </div>
                </div>
            </div>
            <div class="line"></div>

            <div class="footer">
                <div class="foot_l">
                    <div class="f_l" @click="xianjia">￥{{goods.price_member}} 现价购买</div>
                </div>
                <div class="foot_r" @click="goInvited($event)">
                    <div class="f_r">邀请好友砍价</div>
                </div>
            </div>
            <share @change="fenxiang" :state="fxshare"></share>
            <wx-share v-if="shareFlag" @closeShare="closeShare" :status="status"></wx-share>
        </div>
    </div>
</template>
<script>
import wxapi from '@/com/wxapi.js';
import Clipboard from 'clipboard';
import {Toast} from 'mint-ui';
import share from "@/components/page/children/share";
import wxShare from '@/components/home/children/children/wxshare';
import qs from "qs";

export default {
    data() {
        return {
            fxshare: false, //分享弹窗
            cutPriceInfo: {},
            day: 0,
            hour: 0,
            Minute: 0,
            second: 0,
            goods: {},
            goodid:'',
            cutPriceUser:'',
            shareFlag:false,
            FangsonCountdown:'',
            status:0,
            para:{  //分享配置
                appId: '',
                signature: '',
                timestamp: '',
                nonceStr: ''
            },
            cutpriceGoods:'',
            userMessage:{},
        };
    },
    methods: {

        //计算倒计时或已开抢时间
        computationTime(FangsonCountdown) {
            let self = this;
            this.timer = setInterval(function() {
                let t = null;
                var now = new Date();
                var now_Time = now.getTime();
                t = FangsonCountdown * 1000 - now_Time;
                let day = Math.floor(t / 86400000);
                let hour = Math.floor(t / 3600000) % 24;
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
        fenxiang() {
            this.fxshare = !this.fxshare;
        },
        goLastPage() {
            this.$router.go(-1);
        },
        xianjia(){
            this.$router.push({
                name: "order",
                params:{
                    good_id:this.goodid,
                    num:1
                }
            });
        },
        closeShare(){
           this.shareFlag = false
        },
        goInvited(e) {  //邀请好友砍价
            var that = this;
            var url='https://m.adminit.cn/#/invited/'+this.goodid + '?user_id=' + this.userMessage.user_id;
           // var url='http://localhost:8087/#/invited/'+this.goodid + '?user_id=' + this.userMessage.user_id;
            console.log(url)
            this.$copyText(url).then(function (e) {
                that.shareFlag = true
            }, function (e) {
                Toast('复制错误,请手动复制')
            })

          // console.log(location.href.split('#')[0]);
          //
          //   const wx = require('weixin-js-sdk');
          //               // 获取详情数据<span class="space" style="white-space:pre;display:inline-block;text-indent:2em;line-height:inherit;">let url = window.location.href.split("#")[0]</span>
          //               this.axios
          //                   .post(
          //                       this.$httpConfig.weiXinShare,
          //                   )
          //                   .then(res => {
          //                       if(res.data.status==1){
          //                           let data=res.data.data
          //                           this.para.appId=data.appId;
          //                           this.para.signature=data.signature;
          //                           this.para.timestamp=data.timestamp;
          //                           this.para.nonceStr=data.nonceStr;
          //           }
          //           const url='';
          //           url: location.href.split("#")[0]
          //           this.shard(url)
          //       })
          //       .catch(err => {
          //           console.error(err);
          //       });

        },
        shard(url){  //分享微信\

           wx.config({
               debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
               appId: this.para.appId, // 必填，公众号的唯一标识
               timestamp: this.para.timestamp, // 必填，生成签名的时间戳
               nonceStr: this.para.nonceStr, // 必填，生成签名的随机串
               signature: this.para.signature, // 必填，签名，见附录1
               jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
           })
           /* wx.onMenuShareTimeline({
                    title: '砍侃侃 疯狂最低价', // 分享标题
                    link: 'http://m.adminit.cn/#/cutPrice/188', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: '@/assets/image/fl.png', // 分享图标
                    success () {
                        alert('分享朋友圈成功')
                        // 用户确认分享后执行的回调函数
                    },
                cancel () {
                    // 用户取消分享后执行的回调函数
                }
            })*/
            wx.onMenuShareAppMessage({
                title: "砍侃侃 疯狂最低价", // 分享标题
                desc: "砍价商品名称", // 分享描述
                link: 'http://m.adminit.cn/#/invited/'+this.goodid, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: "@/assets/image/fl.png", // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    alert('分享给朋友成功')
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            })
        },
        getCutPriceInfo() {
            this.axios
                .post(
                    this.$httpConfig.bargainInfo,
                    qs.stringify({ id: this.$route.params.id, token: sessionStorage.getItem("data_token") })
                )
                .then(res => {
                    if (res.data.status == 10001) {
                        this.$router.push("/LogIn");
                    }
                    if (res.data.status == 1) {

                        this.cutPriceInfo = res.data.data;
                        this.cutpriceGoods=res.data.data.goods;
                        this.FangsonCountdown=res.data.data.end_time;
                        this.cutPriceUser=res.data.data.user;
                        this.userMessage = res.data.data.user;

                        if(res.data.data.goods !=null){
                            this.goods = res.data.data.goods;
                        }

                        this.goodid=res.data.data.id
                        this.computationTime( this.FangsonCountdown);
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        },

    },
    components:{
        wxShare,
        share
    },
    mounted() {
        this.getCutPriceInfo();
       // wxapi.wxRegister(this.wxRegCallback)
    }
};
</script>
<style lang="less" scope>
.cutprice_wrapper {
    .line {
        width: 100%;
        height: 0.2rem;
        background: #f5f5f5;
    }

    .header {
        position: fixed;
        width: 96%;
        top: 0;
        left: 0;
        height: 0.9rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2%;
        z-index: 1;

        .return,
        .return1 {
            background: url("../../../assets/arrow1@2x.png");
            background-size: cover;
            width: 0.5rem;
            height: 0.5rem;
        }

        .return1 {
            background: url("../../../assets/fanhui.png");
            background-size: cover;
            width: 0.3rem;
            height: 0.5rem;
        }

        .share,
        .share1 {
            background: url("../../../assets/share1@2x.png");
            background-size: cover;
            width: 0.5rem;
            height: 0.5rem;
        }

        .share1 {
            background: url("../../../assets/share3@2x.png");
            background-size: cover;
            width: 0.4rem;
            height: 0.4rem;
        }

        .tab {
            height: 0.5rem;
            display: flex;
            width: 2rem;
            border-radius: 0.1rem;
            opacity: 0;

            > div {
                width: 1rem;
                text-align: center;
                line-height: 0.5rem;
                box-sizing: border-box;
                background: #fff;
                border: 1px solid #b0b0b0;
            }

            .active {
                background: #787878;
                color: #fff;
                border: none;
            }

            > div:nth-child(1) {
                border-radius: 0.1rem 0 0 0.1rem;
            }

            > div:nth-child(2) {
                border-radius: 0 0.1rem 0.1rem 0;
                border-left: none;
            }
        }
    }

    .banner {
        position: relative;

        img {
            height: 7.5rem;
            width: 7.5rem;
        }

        .blo {
            background: rgba(255, 153, 51, 0.7);
            height: 1rem;
            width: 7.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            bottom: 0;
            left: 0;
            position: absolute;

            .left {
                color: #fff;
                margin-left: 0.2rem;
                font-size: 0.4rem;
            }

            .right {
                margin-right: 0.5rem;

                > div {
                    color: #ffffff;
                }

                > div:nth-child(1) {
                    font-size: 0.28rem;
                }

                > div:nth-child(2) {
                    font-size: 0.24rem;
                }
            }
        }
    }

    .desc {
        background: #ffffff;
        padding: 0.3rem 0.3rem 0.15rem 0.3rem;

        .title {
            font-size: 0.3rem;
            font-weight: bold;
        }
    }

    .price {
        background: #ffffff;
        padding-left: 0.2rem;

        .top {
            display: flex;
            align-items: flex-end;

            .original {
                color: #ff9536;
                font-size: 0.22rem;

                span {
                    font-size: 0.5rem;
                    font-weight: bold;
                }
            }

            .cut {
                color: #ff9536;
                margin-left: 0.2rem;
                border: 0.02rem solid #ff9536;
                padding: 0 0.1rem;
                margin-bottom: 0.15rem;
                border-radius: 0.06rem;
            }

            .final {
                color: #878787;
                margin-left: 0.2rem;
                font-size: 0.3rem;
                margin-bottom: 0.1rem;
                text-decoration: line-through;
            }
        }

        .down {
            color: #ff9536;
            margin-left: 0.1rem;
            padding-bottom: 0.3rem;

            > div {
                font-size: 0.26rem;
            }
        }
    }

    .result {
        align-items: center;
        display: flex;
        background: #fff;
        margin-top: 0.2rem;
        padding-bottom: 0.4rem;

        img {
            width: 1.2rem;
            height: 1.2rem;
            margin-left: 0.2rem;
            border-radius: 50%;
        }

        .desc1 {
            margin-left: 0.2rem;
            padding: 0.3rem 0 0.05rem 0;

            .cut_up {
                .num {
                    font-size: 0.28rem;
                    color: #535353;
                }

                span {
                    font-size: 0.28rem;
                    display: inline-block;
                    margin-right: 0.16rem;
                    color: #ff7e7e;
                }

                .add {
                    font-size: 0.28rem;
                    color: #535353;
                }
            }

            .cut_down {
                display: flex;
                align-items: center;
                margin-top: 0.1rem;

                .rea {
                    font-size: 0.28rem;
                    color: #535353;
                }

                .pic {
                    background: #fff;
                    border: 0.01rem solid red;
                    border-radius: 0.3rem;
                    width: 3.5rem;
                    height: 0.42rem;
                    display: flex;
                    align-items: center;
                    margin-left: 0.1rem;

                    .inner {
                        background: #ffd1d1;
                        border-radius: 0.3rem;
                        width: 45%;
                        height: 0.4rem;
                        position: relative;

                        .per {
                            position: absolute;
                            top: 0.04rem;
                            right: -0.7rem;
                            color: #ff6060;
                        }
                    }
                }
            }
        }
    }

    .container {
        background: #fffafa;
        position: relative;
        border-top: 1px solid #ffe2e2;

        .cube {
            background: #fffafa;
            transform: rotate(45deg);
            height: 0.3rem;
            width: 0.3rem;
            position: absolute;
            left: 50%;
            top: -0.15rem;
            border-top: 1px solid #ffe2e2;
            border-left: 1px solid #ffe2e2;
        }

        .avatar {
            display: flex;
            align-items: center;
            padding: 0.2rem 0;

            img {
                width: 0.6rem;
                height: 0.6rem;
                margin-left: 0.2rem;
                border-radius: 50%;
            }

            .ava_r {
                font-size: 0.28rem;
                margin-left: 0.2rem;
                color: #3b3b3b;

                span {
                    color: red;
                    font-size: 0.3rem;
                }
            }
        }
    }

    .footer {
        position: fixed;
        left: 0;
        width: 100%;
        bottom: 0;
        height: 1rem;
        display: flex;
        background: #ffffff;

        .foot_l {
            width: 40%;
            text-align: center;
            background: #fafafa;
            border-top: 1px solid #dfdfdd;
            box-sizing: border-box;

            .f_l {
                position: relative;
                top: 30%;
                font-size: 0.3rem;
            }
        }

        .foot_r {
            background: #ff9536;
            width: 60%;
            text-align: center;

            .f_r {
                position: relative;
                top: 30%;
                color: #fff;
                font-size: 0.3rem;
            }
        }
    }
}
</style>
