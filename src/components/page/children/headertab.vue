<template>
    <div class="teacher-main">
        <header class="header">
            <span @click="btnGo" class="btnGo"></span>
            <div class="tabhead">
                <p @click = "activeCli(0)" :class="{active:activeIndex ==0}">我的收藏</p>
                <p @click = "activeCli(1)" :class="{activelastr:activeIndex ==1}">关注店铺</p>
            </div>
            <div class="btn-ng clearfix" v-if="!btn" v-show="!set" @click="addClass">
                <span class="fl"></span>
                <span class="fl"></span>
                <span class="fl"></span>
            </div>
            <transition  name="fade">
                <div class="box-wrap" v-if="sta">
                    <div class="box-bg" @click="addClass"></div>
                    <div class="bomb-box">
                        <div class="polygon"></div>
                        <div class="btn" @click="toLink('/home')">
                            <span class="icon"><i></i></span>首页
                        </div>
                        <div class="btn">
                            <span class="icon" @click="toLink('/myNews')"><i></i></span>消息
                        </div>
                        <div class="btn">
							<span class="icon" @click="popupVisible=true"><i></i></span>分享
						</div>
                    </div>
                </div>
            </transition>

            <mt-popup v-model="popupVisible" position="bottom" class="pop">
                <div class="share_box">

                        <div class="box_header">
                            <p class="box_text">分享</p>
                            <!--<span class="box_cross" @click="goshare">×</span>-->
                        </div>
                        <div class="share_logo">
                            <div class="up">
                                <img @click="copyLink" src="../../../assets/copy.png">
                                <p class="up_text">夏制链接</p>
                                <img @click="qrLink" src="../../../assets/QR-code.png">
                                <p class="up_text" style="padding-left:0.19rem">二维码</p>
                            </div>
                            <div class="dn">
                                <div class="account" @click="wxpage">
                                <img src="../../../assets/share_wx_@1.png">
                                <div class="txt">微信好友</div>
                                </div>
                                <div class="account" @click="initUrl">
                                <img src="../../../assets/share_pyq_@1.png">
                                <div class="txt">朋友圈</div>
                                </div>
                                <div class="account" @click="qqpage">
                                <img src="../../../assets/share_qq_@1.png">
                                <div class="txt">QQ好友</div>
                                </div>
                                <div class="account" @click="wbpage">
                                <img src="../../../assets/share_wb_@1.png">
                                <div class="txt">新浪微博</div>
                                </div>
                            </div>
                    </div>
                </div>
                
            </mt-popup>

            <mt-popup v-model="popup" position="bottom" class="pop">
                <div class="copy">
                    <div class="copy_header">
                        <p class="copy_text">复制</p>
                    </div>
                    <div class="link">
                        <input class="copy_link" type="text" :value="location" id="myInput">
                        <button class="copy_button" @click="myFunction">Copy</button>
                    </div>
                </div>
            </mt-popup>

            <mt-popup v-model="popupV" position="center" class="qrDiv">
                <div class="qr">
                    <div class="qr_header">
                        <p class="qr_text">QR扫描</p>
                    </div>
                    <div class="qr_code">
                        <qr-code text="Text to encode" :value="code"></qr-code>
                    </div>
                </div>
            </mt-popup>
        </header>
        <div class="hd-active"></div>
    </div>
</template>
<script>
    import qs from 'qs';
    import { MessageBox,Toast } from 'mint-ui';
    export default {
        name : 'collction-header',
        data(){
            return {
                sta:false,
                ruleCon:null,
                activeIndex:0,
                popupVisible:false,
                popup:false,
                popupV:false,
                location:'',
                code:'',
            }
        },
        props:{
            text:null,
            // number:null,
            btn:null,
            search:null,
            rule:null,
            btnDel:null,
            sea:null,
            set:null,
            title:'',
            id:'',
            delData:null,
            fooptStatus:null,
            checklist:''
        },
        computed:{
            // popupVisible(){
            //     return this.popupVisible;
            // }
        },
        methods:{
            // 我的收藏和关注店铺切换
            activeCli(index){
                this.activeIndex = index
                this.$emit('activeCli',index);
            },
            initUrl(){
                this.shareParams = location.href
                this.$shareWeChat("shareParams");
            },
            copyLink(){
                this.popup = true;
                this.location = location.href
            },
            qrLink(){
                this.popupV = true;
                this.code = location.href

            },
            myFunction() {
            var copyText = document.getElementById("myInput");
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            document.execCommand("copy");
            },
            wbpage(){
               window.location.href='https://m.weibo.cn/quicklogin?r=https%3A%2F%2Fm.weibo.cn%2F%3Fjumpfrom%3Dweibocom'
            },
            qqpage(){
               window.location.href='https://xui.ptlogin2.qq.com/cgi-bin/xlogin?appid=716027609&pt_3rd_aid=101019034&daid=383&pt_skey_valid=0&style=35&s_url=http%3A%2F%2Fconnect.qq.com&refer_cgi=authorize&which=&client_id=101019034&response_type=code&scope=get_info%2Cget_user_info&redirect_uri=https%3A%2F%2Fpassport.weibo.com%2Fothersitebind%2Fbind%3Fsite%3Dqq%26state%3DCODE-gz-1J7gz1-1Tj8eo-pCNJsg5lGBqf1WK0038e2%26bentry%3D3rdh5%26wl%3D%26callback%3Dhttp%253A%252F%252Flocalhost%253A8087%252Fproduct%252F161%252F1&display='
            },
            wxpage(){
              window.location.href='https://mp.weixin.qq.com/'
            },
            // 返回上个页面
            btnGo(){
                  this.$router.go(-1);
            },
            // 首页和消息页面跳转
            toLink(link){
                this.$router.push({
                    path:link
                });
            },

            addClass(){
                if(this.sta == false){
                    this.sta = true;
                }else{
                    this.sta = false;
                }
            },
            screen(){
                this.popupVisible = true;
                this.$emit('screen');
            }
        },
        mounted() {
            this.initUrl();
        }
    }
</script>
<style lang="less" scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s ;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0
    }
    
    .hd-active{
        width: 100%;
        height: .62rem;
        padding: .16rem 0;
    }
    .tabhead{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3.5rem;
        height: .65rem;
        margin:0 auto;
        border: .03rem solid #fff;
        border-radius: .2rem;
        p{
            width: 1.75rem;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .32rem;
            &:first-child{
                border-right: .03rem solid #fff;
            }
        }
        .active{
            color: #d02629;
            background-color: #fff;
            border-radius: .2rem 0 0 .2rem;
        }
        .activelastr{
            color: #d02629;
            background-color: #fff;
            border-radius: 0 .2rem .2rem 0;
        }
    }
    .header {
        width: 100%;
        height: .62rem;
        background: #d02629;
        padding: .16rem 0;
        text-align:center;
        position:relative;
        color:#fff;
        font-size:.36rem;
        font-weight:bold;
        line-height:.62rem;
        position:fixed;
        top:0;
        left:0;
        z-index:1;
        .integral-title{
            font-size: .32rem;
            color:#fff;
            .icon{
                display:inline-block;
                width: .27rem;
                height: .16rem;
                background:url(../../../assets/bottom-btn-icon.png) no-repeat;
                background-size:100% 100%;
                margin-left:.1rem;
            }
        }
        .input-main {
            width: 5.4rem;
            height: 100%;
            border-radius: 100px;
            background: rgba(255, 255, 255, .3) url(../../../assets/search1.png) no-repeat .24rem center;
            background-size: .26rem .27rem;
            line-height:100%;
            margin-left:1rem;
            input {
                height: 100%;
                width: 100%;
                border: none;
                background: none;
                text-indent: .7rem;
                font-size: .26rem;
                color: #fff;
                outline: none;
            }
            input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { 
                color: #fff; 
            } 
            input:-moz-placeholder, textarea:-moz-placeholder { 
                color: #fff; 
            } 
            input::-moz-placeholder, textarea::-moz-placeholder { 
                color: #fff; 
            } 
            input:-ms-input-placeholder, textarea:-ms-input-placeholder { 
                color: #fff; 
            } 
        }
        .rule{
            position:absolute;
            right:1rem;
            top:0;
            height: 100%;
            line-height:1rem;
            font-size:.28rem;
        }
        .rule:active{
            text-shadow: 0 0 5px #ccc;
        }
        .box-wrap{
            position:fixed;
            width: 100%;
            height: 100%;
            left:0;
            top:0;
            z-index:99;
            .box-bg{
                position:absolute;
                left:0;
                top:0;
                width: 100%;
                height: 100%;
                z-index:1;
            }
            .bomb-box{
                background:#535353;
                padding:.11rem;
                box-sizing: border-box;
                position: absolute;
                right:.15rem;
                top:.8rem;
                border-radius:5px;
                z-index:99999;
                .polygon{
                    width: .4rem;
                    height: .4rem;
                    position:absolute;
                    top:0;
                    left:.8rem;
                    transform: rotate(45deg);
                    background:#535353;
                }
                .btn:nth-child(2){
                    border-bottom:1px solid #666;
                    .icon{
                        i{
                            width: .24rem;
                            height: .24rem;
                            background:url(../../../assets/home.png) no-repeat;
                            background-size:100% 100%;
                        }
                    }
                }
                .btn:nth-child(3){
                    border-top:1px solid #444;
                    .icon{
                        i{
                            width: .24rem;
                            height: .24rem;
                            background:url(../../../assets/news1.png) no-repeat;
                            background-size:100% 100%;
                        }
                    }
                }
                .btn:nth-child(4) {
					border-top: 1px solid #444;
					.icon {
						i {
							width: .24rem;
							height: .24rem;
							background: url(../../../assets/sharebtn.png) no-repeat;
							background-size: 100% 100%;
						}
					}
				}
                .btn{
                    width: 1.1rem;
                    height: .56rem;
                    box-sizing: border-box;
                    text-align:center;
                    line-height: .56rem;
                    position:relative;
                    padding-left:.5rem;
                    font-size:.24rem;
                    .icon{
                        position:absolute;
                        left:0;
                        top:0;
                        width: .56rem;
                        height: 100%;
                        margin:0;
                        border:none;
                        background:none;
                        i{
                            position:absolute;
                            left:0%;
                            top:0%;
                            bottom:0;
                            right:0;
                            margin:auto;
                        }
                    }
                }
            }
        }
        .pop{
            width: 100%;
        }
        .copy {
            width: 100%;
            height: 2.8rem;
            .copy_header {
                padding: .4rem .3rem;
                text-align: center;
                border-bottom: 1px solid #f1f1f1;
                .copy_text {
                    font-size: .34rem;
                    color: #333;
                }
            }
        }
        .link {
            padding: .4rem;
            .copy_link {
                width: 5.4rem;
                height: .7rem;
                border: 1px solid #999;
                font-size: .28rem;
                color: #333;
                padding-left: .2rem;
            }
            .copy_button {
                width: 1rem;
                height: .7rem;
                border: none;
                font-size: .28rem;
                color: #333;
                padding: 0 .1rem;
            }
        }
        .qrDiv {
            /*width: 70%;*/
        .qr {
            width: 100%;
            height: auto;
            .qr_header {
                padding: .4rem .3rem;
                text-align: center;
                border-bottom: 1px solid #f1f1f1;
                .qr_text {
                    font-size: .34rem;
                    color: #333;
                }
            }
            .qr_code {
                padding: .3rem;
                }
            }
        }
        .share_box {
            width: 100%;
                .box_header {
                    padding: .4rem .3rem;
                    text-align: center;
                    border-bottom: 1px solid #f1f1f1;
                    .box_text  {
                        font-size: .34rem;
                        color: #333;
                    }
                    .box_cross {
                        position: absolute;
                        right: 3%;
                        top: 0.38rem;
                        width: 0.4rem;
                        line-height: 0.34rem;
                        height: 0.4rem;
                        border: 1px solid #bfbfbf;
                        text-align: center;
                        font-size: 0.4rem;
                        color: #bfbfbf;
                        border-radius: 100%;
                    }
                }
                .share_logo{
                    color: #c5c5c5;
                    text-align: left;
                    padding:0.19rem;
                }
                    .up{    
                        padding-bottom: 0.65rem;
                        border-bottom: .01rem solid;
                        margin: 0 .1rem 0 .1rem;

                        img{
                            padding: .25rem;
                        }
                        .up_text{
                               position: absolute;
                               top: 3rem;
                               display: inline-flex;
                               font-size: 0.29rem;
                               margin-left: -1.5rem;
                        }
                    }
                    .dn{
                        display: flex;
                        margin-left: .2rem;
                        
                        .account{
                           width: 25%;
                           padding: 0.3rem 0 0 0.1rem;

                           .txt{
                               padding: 0 0rem 0 .13rem;
                           }
                        }
                    }
        }
        .btnGo{
            position:absolute;
            left:.2rem;
            top:50%;
            margin-top:-.23rem;
            width:.46rem;
            height:.46rem;
            background:url(../../../assets/btn-return.png) no-repeat;
            background-size:100% 100%;
        }
        .cartBtn{
            position:absolute;
            right:1.2rem;
            top:50%;
            margin-top:-.23rem;
            width:.6rem;
            height:.46rem;
            background:url(../../../assets/cart.btn.png) no-repeat;
            background-size:100% 100%;
            em{
                position:absolute;
                right:-.1rem;
                top:-.05rem;
                background:#ff883f;
                color:#fff;
                font-size:.21rem;
                font-style:normal;
                height:.33rem;
                line-height:.23rem;
                padding:.05rem;
                border-radius:100%;
                box-sizing:border-box;
                min-width:.33rem;
            }
        }
        .service{
            line-height:.62rem;
            position:absolute;
            top:50%;
            right:.2rem;
            margin-top:-.31rem;
            font-size:.2rem;
            color:#fff;
        }
        .btn-ng{
            position:absolute;
            top:0;
            right:.2rem;
            height: 100%;
            span{
                display:block;
                width:.12rem;
                height:.12rem;
                border:.06rem solid #fff;
                border-radius:50%;
                box-sizing:border-box;
                margin-left:.1rem;
                margin-top:.44rem;
            }
        }
        .btn-search{
            width:.44rem;
            height:.45rem;
            position:absolute;
            top:50%;
            right:1rem;
            background:url(../../../assets/search.png) no-repeat;
            background-size:100% 100%;
            margin-top:-.225rem;
        }
        .btn-delete{
            position:absolute;
            top:50%;
            right:.2rem;
            margin-top:-.205rem;
            width: .41rem;
            height: .41rem;
            background:url(../../../assets/delete.png) no-repeat;
            background-size:100% 100%;
        }
        .btn-del{
            position:absolute;
            top:50%;
            right:1rem;
            margin-top:-.205rem;
            width: .41rem;
            height: .41rem;
            background:url(../../../assets/delete.png) no-repeat;
            background-size:100% 100%;
        }
        .btn-del.active{
            background:none;
            width: .6rem;
            margin-top:-.3rem;
        }
    }
</style>