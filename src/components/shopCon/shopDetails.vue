<template>
    <div>
        <div v-title data-title="商品列表">商品列表</div>
        <shop-header :text="text"></shop-header>
        <!-- 店铺信息 -->
        <div class="shopTitle">
            <div>
                <img v-show="data.store_logo" :src="URL+data.store_logo" alt="">
                <p class="shop-display">{{data.shop_name}}</p>
                <el-dropdown v-if="data.store_grade_name">
                    <span class="shop-gradename">{{data.store_grade_name}}</span>
                    <el-dropdown-menu slot="dropdown" v-if="data.classification">
                    <el-dropdown-item>{{data.classification}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div>
                <p>{{data.storeFans}}<br><span>粉丝数</span></p>
                <div @click="attenAjax(0)" class="btn" v-show="atten == 1">已关注</div>
                <div @click="attenAjax(1)" class="btn" v-show="atten == 0">关注</div>
            </div>
        </div>
        <!-- tab切换 -->
        <title-tab :sortData="sortData" v-on:sortCon="sortindex" :tabdata="-1"></title-tab>
        <!-- 描述 -->
        <div class="description">
            <!-- <p><span>店铺简介</span> <span>{{data.description}}</span><span></span></p> -->
             <!-- <p><span>店铺简介</span> <span>{{data.desccredit}}分</span><span>{{data.desccredit_discraption}}</span></p> -->
             <p><span>商品描述</span> <span>{{data.desccredit}}分</span><span>{{data.desccredit_discraption}}</span></p>
            <p><span>服务态度</span> <span>{{data.servicecredit}}分</span><span>{{data.servicecredit_discraption}}</span></p>
            <p><span>发货速度</span> <span>{{data.deliverycredit}}分</span><span>{{data.deliverycredit_discraption}}</span></p>
        </div>
        <ul class="aboutShop">
            <li>
                <p>联系卖家</p>
                <img :src="aboutShopImg" alt="">
            </li>
            <li @click="phoneMsg">
                <p>商家电话<span>{{data.mobile}}</span></p>
                <img :src="phoneimg" alt="">
            </li>
            <li @click="codeMsg">
                <p>店铺二维码</p>
                <img :src="codeImg" alt="">
            </li>
            <li @click="paperwork">
                <p>证照信息</p>
                <img :src="paperworkImg" alt="">
            </li>
        </ul>
        <ul class="aboutShop">
            <li>

                <p>店铺简介<span>{{data.shop_long}}</span></p>

           </li>

            <li>
                <p>所在地区<span>{{data.address}}</span></p>
            </li>
    
            <li>
                <p>开店时间<span>{{data.update_time}}</span></p>
            </li>
        </ul>
    </div>
</template>

<script>
    import qs from 'qs'
    import shopHeader from '@/components/page/children/header.vue';
    import titleTab from './child/tabHeader.vue' //切换
    import {
        MessageBox
    } from 'mint-ui'
    export default {
        data() {
            return {
                aboutShopImg: require("@/assets/images/lxmj.png"),
                codeImg: require("@/assets/images/code_icon.png"),
                phoneimg: require("@/assets/images/phone_icon.png"),
                paperworkImg: require("@/assets/images/paperwork_icon.png"),
                text: '店铺详情',
                sortData: ['店铺首页', '全部宝贝', '店铺动态'],
                atten: 0,
                data: [],
            }
        },
        components: {
            shopHeader,
            titleTab
        },
        created() {
            this.axios({
                method: 'post',
                url: this.$httpConfig.shopDetails,
                data: qs.stringify({
                    id: parseFloat(this.$route.params.id),
                    token: sessionStorage.getItem("data_token")
                })
            }).then(res => {
                this.data = res.data.data;
            })
        },
        beforeRouteLeave(to, from, next) {
            MessageBox.close(false);
            next();
        },
    
        methods: {
            sortindex(index) {
                this.$router.push({
                    name: "shopHome",
                    params: {
                        id: this.$route.params.id,
                        index: index
                    }
                })
            },
            // 拨打电话
            phoneMsg() {
                MessageBox({
                    title: '',
                    message: this.data.mobile,
                    confirmButtonText: '呼叫',
                    showCancelButton: true
                }).then(action => {
                    if (action == "confirm") window.location.href = "tel:111111111"
                })
            },
            //   店铺二维码
            codeMsg() {
                MessageBox({
                    title: '和田余元分店',
                    showConfirmButton: false,
                    cancelButtonClass: false,
                    message: `<p><img style="width:5.6rem; height:5.6rem; margin-bottom:.3rem;"  src="http://a.hiphotos.baidu.com/image/pic/item/500fd9f9d72a6059f550a1832334349b023bbae3.jpg"></img></p><p>邀请好友来扫一扫分享店铺给TA</p>`,
                })
            },
            //   证照信息
            paperwork() {
                this.$router.push({
                    name: "paperwork",
                    params: {
                        id: this.$route.params.id
                    }
                })
            },
            //关注店铺
            attenAjax(index) {
                this.atten = index;
                let urls = ""
                if (index == 1) {
                    urls = this.$httpConfig.attenStore;
                } else {
                    urls = this.$httpConfig.cancelAttenStore;
                }
                this.axios({
                    method: 'post',
                    url: urls,
                    data: qs.stringify({
                        store_id: parseFloat(this.$route.params.id),
                        token: sessionStorage.getItem("data_token")
                    })
                }).then(res => {
                })
            },
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
    /*// 标题*/
    
    .shopTitle {
        //   color: #fff;
        overflow: hidden;
        padding: 20/100rem;
        height: 125/100rem;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        div {
            display: flex;
            align-items: center;
        }
        img {
            width: 80/100rem;
            height: 80/100rem;
            margin-right: 20/100rem;
        }
        .shop-display{
            font-size: 28/100rem;
            padding: 0 .15rem 0 0;
        }
        .shop-gradename{
            font-size: .25rem;
            background: #de2d35;
            color: white;
            border-radius: .05rem;
            padding: .05rem .1rem;
            text-align: center;
        }
        p {
            font-size: 28/100rem;
        }
        span {
            font-size: 20/100rem
        }
        .btn {
            margin-left: 15/100rem;
            width: 120/100rem;
            height: 50/100rem;
            border-radius: 50/100rem;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            background-color: #d02629;
        }
    }
    
    .description {
        background-color: #fff;
        padding: .1rem .2rem;
        p {
            line-height: .55rem;
            span {
                font-size: 28/100rem;
                &:nth-child(1) {
                    margin-right: .7rem;
                }
                &:nth-child(2) {
                    color: #CF7171;
                    margin-right: .35rem
                }
                &:nth-child(3) {
                    color: #CF7171;
                }
            }
        }
    }
    
    .aboutShop {
        border-top: .01rem solid #D1D1D1;
        margin-top: .2rem;
        background-color: #fff;
        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 .2rem;
            border-bottom: .01rem solid #D1D1D1;
            height: 1.1rem;
            p {
                float: left;
                font-size: .28rem;
            }
            img {
                float: right;
                width: .45rem;
                height: .45rem;
            }
            span {
                font-size: .28rem;
                margin-left: .25rem;
                color: #686868;
            }
        }
    }
</style>
