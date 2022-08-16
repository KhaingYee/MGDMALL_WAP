<template>
    <div class="pr-tab-wrap">
        <div v-title data-title="商品评论">商品评论</div>
        <pr-header v-if="!productData" :text="title" :number="number"></pr-header>
            <div>
                <div class="comment-wrap">
                    <ul>
                        <li :class="comIndex == 0? 'conActive': ''" @click="comContent(0)">
                            <span>全部评价</span>
                            <p>{{ allCount || 0 }}</p>
                        </li>
                        <li :class="comIndex == 1? 'conActive': ''" @click="comContent(1)">
                            <span>好评</span>
                            <p>{{ allNice || 0 }}</p>
                        </li>
                        <li :class="comIndex == 2? 'conActive': ''" @click="comContent(2)">
                            <span>中评</span>
                            <p>{{ allHeight || 0 }}</p>
                        </li>
                        <li :class="comIndex == 3 ? 'conActive': ''" @click="comContent(3)">
                            <span>差评</span>
                            <p>{{ allBad || 0 }}</p>
                        </li>
                        <li :class="comIndex == 4? 'conActive': ''" @click="comContent(4)">
                            <span>有图</span>
                            <p>{{ allImg || 0 }}</p>
                        </li>

                    </ul>
                    <div v-if="dataItem == null" class="center">暂无评论</div>
                    <div v-else class="list-wrap" v-for="item in dataItem" :key="item.id + 'i'">
                        <div class="list-hd clearfix">
                            <div class="pull-left fl">
                                <!-- <img src="../../../assets/user-d.jpg"> -->
                                 <img :src="URL + item.user_header">
                                <span >{{item.nick_name}}</span>
                            </div>
                            <div class="pull-right fr">
                                <img v-for = 'n in parseInt(item.score)' :key = 'n' :src="imgYes">
                                <img v-for = 'n in 5-parseInt(item.score)' :key ="n + 'i'" :src="imgNo">
                            </div>
                        </div>
                        <div class="list-purTimer">{{item.create_time | formatDate}}</div>
                        <div class="list-com">{{item.content}}</div>
                            <div class="list-img-main clearfix" v-for="items in item.path" :key="items.id">
                            <img :class="{ 'active': tempImgValue == items && isChoose  }"  @click="imgScc(items)" :src="URL + items.path" class="fl" >
                        </div>
                    </div>
                </div>
            </div>
        <div class="load" v-show="load" @touchmove.prevent><mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner></div>

        <div class="load-wrap" v-show="load_wrap" @touchmove.prevent><mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner></div>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    import QS from 'qs';
    import PrHeader from './header.vue';
    export default {
        name : 'commentPage',
        data(){
            return {
                imgNo:require('@/assets/images/xinxin.png'),
                imgYes:require('@/assets/images/xu_xinxin.png'),
                title:'商品评论',
                number:'0',
                data:'',
                commenData:'',
                dataItem:'',
                scrollWatch:true,
                page:1,
                comIndex :0,
                comId:1,
                product:'',
                load:false,
                load_wrap:true,
                text:'',
                isChoose:false,
                commentName: [],
                allCount: 0,
                allNice: 0,
                allHeight: 0,
                allBad: 0,
                allImg: 0,
                tempImgValue: ''
            }
        },
        props: {
            productData: false
        }, 
        methods:{
            imgScc(value){
                this.tempImgValue = value
                this.isChoose = !this.isChoose
            },
            // tab切换
            conActiveClick(index){
                if(index == this.comIndex)return
                this.comIndex = index
                switch(this.comIndex){
                     case 0:
                        this.comId = 4;
                        this.load = true;
                        break;
                    case 1:
                        this.comId = 3;
                        this.load = true;
                        break;
                    case 2:
                        this.comId = 2;
                        break;
                    case 3:
                        this.comId = 1;
                        break;
                    case 4:
                        this.comId = 5;
                        break;
                    }
                    this.comContent(0)
            },
            //评论
            comContent(type){
                this.comIndex = type;
                this.load = true;
                 this.axios({
                    url:this.$httpConfig.getAllCommentContent,
                    method:'post',
                    params:{
                        goods_id:this.$route.params.id,
                        type: type,
                        status:4,
                        page:this.page,
                        token: sessionStorage.getItem("data_token")
                    }
                }).then((res) => {
                    this.load = false
                    if(res.data.status==1){
                    	 this.dataItem= res.data.data.list;
                        // this.commentName=res.data.data.data;
                        this.allCount = res.data.data.allCount;
                        this.allNice = res.data.data.allNice;
                        this.allHeight = res.data.data.allHeight;
                        this.allBad = res.data.data.allBad;
                        this.allImg = res.data.data.allImg;
                        
                    }
                   
                }).catch((err) => {
                    console.log(err);
                });
            },
            // 评价数量
            commentAjax(){
                this.axios({
                    url:this.$httpConfig.getAllCommentsCount,
                    method:'post',
                    params:{
                        goods_id:this.$route.params.id,
                        page:1,
                        token: sessionStorage.getItem("data_token")
                    }
                }).then((res) => {
                    this.load = false
                    this.commenData = res.data.data;

                }).catch((err) => {
                    console.log(err);
                });
            },
        },
        mounted() {
            this.load_wrap =false;
            
            document.body.scrollTop = 0;

            this.comContent(0);
            this.commentAjax();

        },
        destroyed(){
            this.scrollWatch = false;
        },
        components:{
            PrHeader
        }
    }
</script>
<style lang="less">
    .pr-tab-wrap{
        background:#f1f1f1;
        .center{
            text-align: center;
            height: 3rem;
            line-height: 10rem;
            font-size: .4rem;
        }
        .list-com{
            height:.6rem;
            font-size:.24rem;
            color:#333;
            display: -webkit-box;
            overflow: hidden;
            white-space: normal!important;
            text-overflow: ellipsis;
            word-wrap: break-word;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
        .comment-wrap{
            ul{
                height: 105/100rem;
                display: flex;
                li{
                    width: 20%;
                    height: 100/100rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    span{
                        color:#B9B9B9;
                        font-size: 32/100rem;
                        margin-bottom:10/100rem;
                    }
                    p{
                        font-size: 28/100rem;
                    }
                }
                .conActive{
                    border-bottom: 5/100rem solid #d02629;
                }
            }
            h2{
                padding:0 .2rem;
                height:.88rem;
                font-size:.32rem;
                line-height:.88rem;
                background:none;
                color:#333;
                span{
                    font-size:.32rem;
                    color:#f9781e;
                }
            }
            .list-wrap{
                width:7.1rem;
                padding:0 .2rem .2rem .2rem;
                height:auto !important;
                background:#fff;
                margin-bottom:.1rem;
                .list-hd{
                    padding:.2rem 0;
                    line-height:.32rem;
                    height:.3rem;
                    display: flex;
                    .pull-left{
                        padding-left:.46rem;
                        font-size:.2rem;
                        color:#b0b0b0;
                        position:relative;
                        img{
                            width:.32rem;
                            height:.32rem;
                            position:absolute;
                            left:0;
                            top:0;
                        }
                    }
                    .pull-right{
                        color:#999;
                        font-size:.26rem;
                        padding: 0 0 0 .2rem;
                        img{
                            width: 30/100rem
                        }
                    }
                }
                .list-purTimer{
                    font-size:.21rem;
                    color:#999;
                    margin: -.5rem 0 .3rem 4.9rem;
                }
                .list-img-main{
                    height:1rem;
                    width: 18%;
                    float: left;
                    img{
                        width:1rem;
                        height:1rem;
                        margin-right:.2rem;
                        transform: scale(1);            /*图片原始大小1倍*/
                        transition: all ease 0.5s;      /*图片放大所用时间*/
                    }
                    img.active {
                        transform: scale(5);          /*图片需要放大3倍*/
                        position: absolute;           /*是相对于前面的容器定位的，此处要放大的图片，不能使用position：relative；以及float，否则会导致z-index无效*/
                        z-index: 100;
                        margin-left: 3rem;
                    }
                }
            }
        }
    }
</style>
