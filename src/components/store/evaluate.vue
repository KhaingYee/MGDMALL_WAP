<template>
    <div class="evaluate-all">
        <evaluateHeader :text="$store.state.order_title"></evaluateHeader>
        <!--tab-->
        <div class="tab">
            <div v-for="(item,index) in tabData" :key="index" @click="handTab(index)" :class="{active:tabIndex == index}">
                <span>{{item.name}}</span>
                <span>{{item.num}}</span>
            </div>
        </div>

        <!--评价列表-->
        <div class="evaluate-list">
            <div class="evaluate" v-for="(item,index) in evaluateList" :key="index">
                <div class="name">
                    <div class="left">
                        <img src="../../assets/activity/evaluate.png" alt="">
                        {{item.user_name}}
                    </div>
                    <div class="right" v-if="item.score !=0">
                        <img v-for="(a, inde) in item.score" :key="inde" src="../../assets/activity/sh@2x.png" alt />
                    </div>
                    <div class="right" v-if="item.score != 5">
                        <img v-for="(a, ind) in (5-item.score)" :key="ind" src="../../assets/activity/kx@2x.png" alt />
                    </div>
                </div>
                <div class="content">
                    {{item.content}}
                </div>
                <div class="evaluate-img" v-if="item.img.length">
                    <img v-for="(items,index1) in item.img" :key="index1" :src="URL + items " alt="">
                </div>

                <div class="specs">
                    <!--<div class="spec">-->
                        <!--颜色:翠绿-->
                    <!--</div>-->
                    <div>{{item.create_time}}</div>
                </div>
            </div>
        </div>
        <div class="no-data" v-if="evaluateList.length == 0" >暂无数据</div>
    </div>
</template>

<script>
    import evaluateHeader from '@/components/page/children/header.vue';
    import qs from 'qs';
    export default {
        name: "evaluate",
        data(){
            return{
                tabIndex:0,
                tabData:[{name:'全部评价',num:4233},{name:'差评',num:1},{name:'中评',num:1},{name:'好评',num:33},{name:'有图',num:10}],
                evaluateList:[]
            }
        },
        mounted() {
            this.$store.state.order_title = '精选评价';
            this.getShopCommentCount();
            this.getEvaluateList(0);
        },
        methods:{
            handTab(index){
                this.tabIndex = index;
                this.evaluateList = [];
                this.getEvaluateList(index);
            },
            getEvaluateList(level){
              this.axios.post(this.$httpConfig.getShopComment,qs.stringify({
                  id:this.$route.params.storeid,
                  level:level,
                  token: sessionStorage.getItem("data_token")
              })).then(res=>{
                  console.log(res);
                  if(res.data.status == 1){
                      this.evaluateList = res.data.data.list;
                  }
              })
            },
            getShopCommentCount(){
                this.axios.post(this.$httpConfig.getShopCommentCount,qs.stringify({
                    id:this.$route.params.storeid,
                    token: sessionStorage.getItem("data_token")
                })).then(res=>{
                    if(res.data.status == 1){
                        this.tabData[0].num = res.data.data.countAll;
                        this.tabData[1].num = res.data.data.bad;
                        this.tabData[2].num = res.data.data.middle;
                        this.tabData[3].num = res.data.data.praise;
                        this.tabData[4].num = res.data.data.img;
                    }
                })
            }
        },
        components:{
            evaluateHeader
        }
    }
</script>

<style lang="less" scoped>
    .evaluate-all{
        .tab{
            display: flex;
            justify-content: space-around;
            background: #ffffff;
            height: 1.1rem;
            border-bottom: 1px solid #efefef;
            border-top: 1px solid #efefef;
            box-sizing: border-box;
            >div{
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                font-size: .28rem;
                span:nth-child(1){
                    color: #757575;
                }
            }
            .active{
                border-bottom: .03rem solid #ff9536;
            }
        }
        .evaluate-list{
            background: #ffffff;
            .evaluate{
                padding: .2rem;
                border-bottom: 1px solid #dfdfdf;
                .name{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .left{
                        display: flex;
                        font-size: .26rem;
                        color: #b0b0b0;
                        img{
                            width: .35rem;
                            margin-right: .1rem;
                        }
                    }
                    .right{
                        img{
                            width: .3rem;
                        }
                    }
                }
                .content{
                    font-size: .24rem;
                    color: #333333;
                    margin-top: .15rem;
                }
                .evaluate-img{
                    display: flex;
                    flex-wrap: wrap;
                    margin-top: .2rem;
                    img{
                        width: 1rem;
                        height: 1rem;
                        margin-right: .2rem;
                        margin-bottom: .2rem;
                    }
                }
                .specs{
                    display: flex;
                    align-items: center;
                    font-size: .24rem;
                    color: #999999;
                    flex-wrap: wrap;
                    >div{
                        margin-right: .25rem;
                    }
                }
            }
        }
    }
</style>
