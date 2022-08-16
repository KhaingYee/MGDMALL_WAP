<template>
    <div class="assemble" ref="assemble">
        <assembleHeader :text="$store.state.order_title"></assembleHeader>
        <img class="assemble-banner" src="../../assets/activity/active1.png" alt="">
        <div class="nav" :class="navBarFixed == true ? 'navBarWrap' :''">
            <ul>
                <li :class="{'active':tabIndex == -1}" @click="shopmessage(-1)" >全部</li>
                <li v-for="(item,index) in vavArrList" :class="{'active':tabIndex == index}" :key="index" @click="shopmessage(index,item.id)">{{item.class_name}} </li>
            </ul>
        </div>

        <!--拼团活动列表-->
        <div class="bargain-activity-list">

            <div v-for="(item,index) in plazzgoodList" class="bargain-activity" :key="index" >
                <img class="bargain-activity-img" :src="URL +  item.pic_url" alt="" @click="selectMessage(item.id,item.goods_id)">
                <div class="message">
                    <div class="title">{{item.title}}</div>
                    <!--<div class="subtitle">{{item.description}}</div>-->
                    <div class="price" >
                        <div class="price-activity">
                            <span>拼团价</span><span>￥{{item.activity_price}}</span>
                        </div>
                        <div class="original-price">
                            ￥{{item.price_member}}
                        </div>
                    </div>
                    <div class="bottom">
                        <div>已拼{{item.buy_num}}件</div>
                        <div class="btn"  @click="goodsorder(item.id,item.goods_id)" v-if="item.status==0">去开团</div>
                        <!-- <div class="btn"  @click="GoOrder(item.order_id)" v-else>拼团中</div> -->
                        <div class="btn"  @click="GoOrder" v-else>拼团中</div>
                    </div>
                </div>
            </div>
            
            <div  v-if="plazzgoodList.length==0" class="no-data">
                暂无数据
                <i class="far fa-frown"></i>
            </div>

        </div>
    </div>
</template>

<script>
    import QS from 'qs';
    import assembleHeader from '@/components/page/children/header.vue';
    import {getScrollHeight, getScrollTop, getWindowHeight} from "../../config/screen";
    export default {
        name: "assemble",
        data(){
            return{
                tabIndex:-1,
                vavArrList:[],   //导航数据
                plazzgoodList:[],  //商品数据
                navBarFixed:false,
                currentPage: 1,
                dropFlag: false,
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
        mounted(){
            this. getplazzList()
            this.getplazzGoodsList();
            this.$store.state.order_title = '拼团';
            let title = this.$store.state.order_title + '-' + sessionStorage.getItem('titleKey') + '-' + sessionStorage.getItem('updateDescription');
            this.showScroll.scrollTitle(title);
            $('html,body').animate({scrollTop: '0px'}, 0);
            window.addEventListener("scroll", this.watchScroll);
        },
        destroyed() {
            window.removeEventListener('scroll', this.watchScroll);
        },
        methods:{
            //去拼团
            goodsorder(id,goodid){
                this.$router.push({
                    name: "assembleproduct",
                    params:{
                        id:id,
                        goodId:goodid
                    }
                });
            },
            watchScroll() {
                if (!this.$refs.assemble) return;
                if (getScrollTop() + getWindowHeight() >= getScrollHeight()) {
                    if (this.dropFlag) {
                        this.currentPage++;
                        this.getplazzGoodsList();
                    }
                }
                if (getScrollTop() >= 175) {
                    this.navBarFixed = true;
                } else {
                    this.navBarFixed = false;
                }
            },
            // GoOrder(order_id){//拼团中   puzzleOrderDetail/13
            //     this.$router.push({
            //         name: "puzzleOrderDetail",
            //         params:{
            //             id:order_id,
            //         }
            //     });
            // },
            GoOrder(){
                this.$router.push({
                    name: "puzzleOrder",
                });
            },
            //点击图片
            selectMessage(id,goodid){
                this.$router.push({
                    name: 'assembleproduct',
                    params:{
                        id:id,
                        goodId:goodid
                    }
                });
            },

            //根据选中导航栏的数据id  返回系列商品
            shopmessage(index,id){   //pluzzgood
                this.tabIndex = index;
                this.plazzgoodList = [];
                this.getplazzGoodsList(id);
            },
            getplazzGoodsList(id){
                this.axios.post(this.$httpConfig.pluzzgood , QS.stringify({class_id:id,page: this.currentPage, token: sessionStorage.getItem("data_token") })).then((res) => {
                    if(res.data.status == 1){
                        if(res.data.data.length == 10){
                            this.dropFlag = true;
                        }else {
                            this.dropFlag = false;
                        }

                        if(this.currentPage == 1){
                            this.plazzgoodList=res.data.data.data;
                        }else {
                            this.plazzgoodList = [
                                ...this.plazzgoodList,
                                ...res.data.data
                            ]
                        }
                    }else {
                        this.dropFlag = false;
                    }
                })
            },
            //获取导航栏数据
            getplazzList(){
                this.axios.post(this.$httpConfig.getFirstId, QS.stringify({
                    token: sessionStorage.getItem("data_token")
                }) ).then((res) => {
                    this.vavArrList=res.data.data

                })
            },

        },
        components:{
            assembleHeader
        }
    }
</script>

<style lang="less" scoped>
    .assemble{
        .assemble-banner{
            width: 100%;
        }

        .navBarWrap {
            position: fixed;
            top: 0.94rem;
            z-index: 999;
            left: 0;
        }
        .nav{
            background: #ffffff;
            width: 100%;
            overflow-x: auto;
            ul{
                width: 100%;
                display: flex;
                white-space: nowrap;
                li{
                    box-sizing: border-box;
                    flex-shrink: 1;
                    height: .8rem;
                    line-height: .8rem;
                    text-align: center;
                    font-size: .3rem;
                    margin:0 2%;

                }
                li.active{
                    color: #d0111b;
                    border-bottom: .05rem solid #d0111b;
                    font-weight: bold;
                }
            }
        }

        .bargain-activity-list{

            margin-top: .3rem;
            .bargain-activity{
                height: 3rem;
                background: #ffffff;
                margin-bottom: .2rem;
                display: flex;
                align-items: center;

                .bargain-activity-img{
                    width: 2.5rem;
                    height: 2.5rem;
                    margin: .1rem;
                }

                .message {
                    height: 2.5rem;
                    flex: 1;
                    .title{
                        width: 4.5rem;
                        font-size: .3rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        margin: .1rem 0 0 0 ;
                    }
                    .subtitle{
                        color: #888888;
                        font-size: .24rem;
                        margin-bottom: .1rem;
                    }

                    .price{
                        display: flex;
                        align-items: center;
                        margin-top: .15rem;
                        .price-activity{
                            display: flex;
                            align-items: center;
                            span:nth-child(1){
                                font-weight: bold;
                                color: #000000;
                                font-size: .26rem;
                            }
                            span:nth-child(2){
                                font-size: .34rem;
                                color: #ff7900;
                            }
                        }
                        .original-price{
                            text-decoration: line-through;
                            color: #8f8f8f;
                            margin-left: .15rem;
                        }
                    }

                    .bottom{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding-right: .3rem;
                        margin-top: .1rem;
                        >div:nth-child(1){
                            font-size: .24rem;
                            color: #ff7900;
                        }

                        .btn{
                            width: 1.3rem;
                            height: .5rem;
                            background: #ff7900;
                            color: #ffffff;
                            text-align: center;
                            line-height: .5rem;
                            border-radius: .07rem;

                        }

                    }
                }

            }
            .no-data {
                text-align: center;
                padding-top: 50%;
                font-size: 0.3rem;
                height: 50%;
                background: #fff;
                margin-top: -.3rem;
            }
        }
    }
</style>
