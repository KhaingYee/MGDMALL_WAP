<template>
    <div class="account">
        <div class="header">
            <i class="fa-solid fa-circle-chevron-left" id="backbtn" @click="back"></i>
            <div class="title">Account</div>
        </div>
        <div class="login-header">
            <div class="icon-wrap">
                <img src="../../assets/profile.png"/>
            </div>
            <div class="iconContent">
                <div class="hello">Hello, Welcome to MGD MALL!</div>
                <!-- <div class="approval-div">
                    <span class="usernamestyle">0995465673</span>
                </div> -->
                <div class="signbut">Login / Sign Up</div>
            </div>
        </div>
        <div class="navserver1">
            <div class="order-title">My Order</div>
            <ul class="nav-link">
                <li>
                    <div class="icon-wrap">
                        <lottie-animation
                            ref="anim"
                            :animationData="require('@/mobile/assets/lotorder.json')"
                            :loop="true"
                            class="lot"
                        />
                        </div>
                    <p>Order List</p>
                </li>
                <li>
                    <div class="icon-wrap">
                        <lottie-animation
                            ref="anim"
                            :animationData="require('@/mobile/assets/lotcan.json')"
                            :loop="true"
                            class="lot"
                        />
                        </div>
                    <p>Order Cancel</p>
                </li>
                <li>
                    <div class="icon-wrap">
                        <!-- <i class="fa-solid fa-truck" id="img"></i> -->
                    <lottie-animation
                        ref="anim"
                        :animationData="require('@/mobile/assets/drive.json')"
                        :loop="true"
                        class="lot"
                    />
                    </div>
                    <p>To Ship</p>
                </li>
                <li>
                    <div class="icon-wrap">
                        <lottie-animation
                            ref="anim"
                            :animationData="require('@/mobile/assets/lotRec.json')"
                            :loop="true"
                            class="lot"
                        />
                        </div>
                    <p>Receive</p>
                </li>
                <li>
                    <div class="icon-wrap">
                        <lottie-animation
                            ref="anim"
                            :animationData="require('@/mobile/assets/lotreturn.json')"
                            :loop="true"
                            class="lot"
                        />
                        </div>
                    <p>Return</p>
                </li>
                <li>
                    <div class="icon-wrap">
                        <lottie-animation
                            ref="anim"
                            :animationData="require('@/mobile/assets/lotreview.json')"
                            :loop="true"
                            class="lot"
                        />
                        </div>
                    <p>Review</p>
                </li>
            </ul>
        </div>
        <div class="navserver2">
            <div class="order-title">Favorite</div>
            <ul class="nav-link">
                <li>
                    <div class="icon-wrap">
                        <lottie-animation
                            ref="anim"
                            :animationData="require('@/mobile/assets/lotwishlist.json')"
                            :loop="true"
                            class="lot"
                        />
                     </div>
                    <p>My Wishlist</p>
                </li>
                <li>
                    <div class="icon-wrap">
                        <lottie-animation
                            ref="anim"
                            :animationData="require('@/mobile/assets/lotfollow.json')"
                            :loop="true"
                            class="lot"
                        />
                     </div>
                    <p>Followed Stores</p>
                </li>
            </ul>
        </div>
        <div class="navserver3">
            <div class="order-title">Content</div>
            <ul class="nav-link">
                <li>
                    <div class="icon-wrap">
                        <lottie-animation
                        ref="anim"
                        :animationData="require('@/mobile/assets/lotmess.json')"
                        :loop="true"
                        class="lot"
                    />
                    </div>
                    <p>Message</p>
                </li>
                <li>
                    <div class="icon-wrap">
                    <lottie-animation
                        ref="anim"
                        :animationData="require('@/mobile/assets/phonecall.json')"
                        :loop="true"
                        class="lot"
                    />
                    </div>
                    <p>Phone</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import LottieAnimation from 'lottie-web-vue'
import { MessageBox, Toast } from "mint-ui";
import qs from "qs";
    export default {
    name: "personal",
    data() {
        return {

        };
    },
    components: {
        LottieAnimation
    },
    mounted(){

    },
    methods:{
        back() {
            this.$router.go(-1);
        },

    }
    };
</script>
<style lang="less">
.account{
    .header{
        display: flex;
        padding: 0.3rem 0.2rem;
        background: #fff;
        border-bottom: .01rem solid #f1f1f1;
        background: linear-gradient(to right,#442e93 0,#25a5d8 100%);
        #backbtn{
            font-size: .4rem;
            color: #fff;
        }
        .title{
            font-size: .3rem;
            margin-left: 2.6rem;
            color: #fff;
        }
    }
    .navserver1 {
        width: 100%;
        background: white;
        padding-bottom: .1rem;
        .order-title{
            font-size: .28rem;
            padding: .2rem;
            color: #014E40;
            font-weight:bold;
        }
        .nav-link {
            display: flex;
            width: 100%;
            justify-content: flex-start;
            flex-direction: row;
            flex-wrap: wrap;
            li {
                width: 25%;
                text-align: center;
                padding: .2rem 0;
                .icon-wrap {
                    height: 0.6rem;
                    .lot{
                        font-size: .4rem;
                    }
                    #img {
                        font-size: .4rem;
                    }
                }
                p {
                    font-size: 0.24rem;
                    color: #343434;
                }
            }
        }
    }
    .navserver2{
        width: 100%;
        background: white;
        margin-top: 0.1rem;
        padding-bottom: .1rem;
        .order-title{
            font-size: .28rem;
            padding: .2rem;
            color: #014E40;
            font-weight:bold;
        }
        .nav-link {
            display: flex;
            width: 100%;
            justify-content: flex-start;
            flex-direction: row;
            flex-wrap: wrap;
            li {
                width: 25%;
                text-align: center;
                padding: 0 0 .2rem 0;
                .icon-wrap {
                    height: 0.6rem;
                    .lot{
                        font-size: .4rem;
                    }
                    #img {
                        font-size: .4rem;
                    }
                }
                p {
                    font-size: 0.24rem;
                    color: #343434;
                }
            }
        }
    }
    .navserver3{
        width: 100%;
        background: white;
        margin-top: 0.1rem;
        padding-bottom: .1rem;
        .order-title{
            font-size: .28rem;
            padding: .2rem .2rem 0 .2rem;
            color: #014E40;
            font-weight:bold;
        }
        .nav-link {
            display: flex;
            width: 100%;
            justify-content: flex-start;
            flex-direction: row;
            flex-wrap: wrap;
            li {
                width: 25%;
                text-align: center;
                padding: 0 0 .2rem 0;
                .icon-wrap {
                    height: 1rem;
                    .lot{
                        font-size: .4rem;
                    }
                    #img {
                        font-size: .4rem;
                    }
                }
                p {
                    font-size: 0.24rem;
                    color: #343434;
                }
            }
        }
    }
    .login-header {
        width: 100%;
        height: 1.5rem;
        padding: 0.3rem;
        .icon-wrap {
            width: 1.35rem;
            height: 1.35rem;
            float: left;
            border-radius: 100%;
            img {
                width: 100%;
                height: 100%;
                border-radius: 100%;
            }
        }

        .iconContent {
            float: left;
            margin-left: 0.2rem;
            .hello{
                font-size: 0.3rem;
                color: #014E40;
                font-weight: bold; 
                margin-top: 0.1rem; 
            }
            .approval-div{
                margin-top: 0.2rem;
                .usernamestyle {
                    font-size: 0.3rem;
                    color: #014E40;
                    font-weight: bold;
                }
            }
            .signbut {
                margin-top: 0.18rem;
                text-align: center;
                border-radius: 0.2rem;
                font-size: .24rem;
                background: #FE7021;
                color: #fff;
                width: 2.5rem;
                height: 0.5rem;
                line-height: .48rem;
                margin-left: 0.8rem;
            }
        }
    }
}
</style>