<template>
    <div class="getCoupon" v-show="state">
        <div class="content">
            <div class="title">
                领劵
                <div class="close" @click="close"></div>
            </div>
            <div class="coupon-list">
                <div v-for="(item,index) in couponList" :key="index" class="coupon">
                    <div class="left">
                        <div class="title1">
                            ￥
                            <span>{{item.money}}</span>
                            {{item.name}}
                        </div>
                        <div style="height:0.1rem"></div>
                        <div>有效期{{tam2time(item.use_start_time)}}-{{tam2time(item.use_end_time)}}</div>
                    </div>
                    <div class="center">
                        <img src="../../../assets/activity/line.png" alt/>
                    </div>
                    <div class="right" @click="receive(item.id,index)">
                        <span>立即领取</span>
                    </div>
                    <img src="../../../assets/activity/receive@2x.png" class="couponim1" v-if="item.status==1"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from "mint-ui";

    export default {
        name: "getCoupon",
        props: {
            state: {
                type: Boolean
            },
            couponList: {
                type: Array
            },
            isfreight: ""
        },
        mounted() {
        },
        methods: {
            close() {
                this.$emit("change");
            },
            receive(id, index) {
                let http = "";
                if (this.isfreight == 0) {
                    http = this.$httpConfig.receiveCoupon;
                } else if (this.isfreight == 1) {
                    http = this.$httpConfig.receiveVipFreight;
                } else {
                    return;
                }
                this.$HTTP(http, {id: id}, "post")
                    .then(res => {
                        if (res.data.status == 1) {
                            this.couponList[index].status = 1;
                            this.$emit("receiveSuccess",index);
                            Toast("领取成功");
                        } else {
                            Toast(res.data.message);
                        }
                    })
                    .catch(err => {
                        Toast(err.data.message);
                    });
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
                    m = "0" + m;
                }
                if (d < 10) {
                    d = "0" + d;
                }
                return Y + "." + m + "." + d;
            }
        }
    };
</script>

<style lang="less" scoped>
    .getCoupon {
        background: rgba(89, 90, 76, 0.5);
        z-index: 123;
        position: fixed;
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;

        .content {
            position: absolute;
            width: 100%;
            height: 50%;
            bottom: 0;
            left: 0;
            background: #fff;

            .coupon-list {
                height: 86%;
                overflow: auto;
            }

            .coupon {
                display: flex;
                background: #fde9e9;
                align-items: center;
                width: 90%;
                padding: 0.2rem;
                height: 1.5rem;
                margin: 0 auto;
                margin-top: 0.2rem;
                color: #dc7676;

                position: relative;

                .couponim1 {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 1rem;
                }

                .left {
                    font-size: 0.26rem;
                    width: 75%;

                    .title1 {
                        font-size: 0.28rem;

                        span {
                            font-size: 0.45rem;
                            display: inline-block;
                            margin: 0 0.05rem;
                        }
                    }
                }

                .center {
                    position: relative;
                    width: 0.1rem;

                    img {
                        height: 1.6rem;
                        width: 0.03rem;
                        display: inline-block;
                        vertical-align: middle;
                    }
                }

                .center:after {
                    content: "";
                    width: 0.3rem;
                    height: 0.3rem;
                    position: absolute;
                    top: -0.3rem;
                    left: -0.14rem;
                    border-radius: 50%;
                    background: #fff;
                }

                .center:before {
                    content: "";
                    width: 0.3rem;
                    height: 0.3rem;
                    position: absolute;
                    bottom: -0.3rem;
                    left: -0.14rem;
                    border-radius: 50%;
                    background: #fff;
                }

                .right {
                    text-align: center;
                    position: relative;
                    flex: 1;
                    height: 1.5rem;
                    line-height: 1.5rem;

                    span {
                        color: #a22d2b;
                        font-size: 0.3rem;
                    }

                    img {
                        position: absolute;
                        bottom: -0.2rem;
                        right: -0.2rem;
                        width: 0.9rem;
                    }
                }
            }

            .title {
                font-size: 0.3rem;
                height: 14%;
                border-bottom: 1px solid #dfdfdd;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }

            .close {
                background: url("../../../assets/close.png");
                background-size: cover;
                position: absolute;
                width: 0.3rem;
                height: 0.3rem;
                right: 0.2rem;
                top: 50%;
                margin-top: -0.15rem;
            }
        }
    }
</style>
