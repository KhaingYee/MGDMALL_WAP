<template>
    <div class="pr-tab-wrap">
        <!-- <div v-title data-title="商品属性">商品属性</div> -->
                <ul class="list-wrap">
                    <li class="clearfix">
                      	<p class="pTitle">商品名称：</p>
                      	<span>{{attrData.title}}</span>
                    </li>
                    <li class="clearfix" v-for="item in attrData.attr" :key="item.id">
                      	<p class="pTitle">{{item.attribute_id}}：</p>
                      	<span>{{item.attr_value}}</span>
                    </li>
                    <li class="clearfix" v-for="(item,index) in fileDownload" :key="index" v-if="item.href">
                      	<p class="pTitle">{{item.href}}：</p>
                      	<span>请在电脑端进行下载</span>
                    </li>
                </ul>
        <Shopsn></Shopsn>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    import QS from 'qs';
    import PrHeader from './header.vue';
    import Shopsn from '@/components/page/Shopsn.vue';
    export default {
        name : 'attributespage',
        data(){
            return {
                imgNo:require('@/assets/images/xinxin.png'),
                imgYes:require('@/assets/images/xu_xinxin.png'),
                selected:"1",
                title:'商品属性',
                number:'0',
                data:'',
                commenData:'',
                dataItem:'',
                scrollWatch:true,
                page:1,
                comId:1,
                product:'',
                problem:'',
                load:false,
                attrData:'',
                text:'',
                fileDownload:'',
                sonState:false,
                specData:'',
                isChoose:false,
                tempImgValue: '',
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
        props: {
            productData: false
        }, 
        mounted() {
            this.GoodsAttr();
            this.getDownloadZip();
        },
        created() {
            let title = "商品属性" + '-' + sessionStorage.getItem('titleKey') + '-' + sessionStorage.getItem('updateDescription');
            this.showScroll.scrollTitle(title);
        },
        methods:{
            // 规格参数getGoodsAttr
            GoodsAttr(){
//              this.load = true;
                this.axios.post(this.$httpConfig.getGoodInfo,
                	QS.stringify({
                		 id:this.$route.params.goods_id,
                         token: sessionStorage.getItem("data_token")
                	})
                ).then((res) => {
                    this.load = false;
                    if(res.data.status == 1){
                        this.attrData = res.data.data;
//                      this.specData = res.data.data.spec;
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            getDownloadZip(){
                this.axios.post(this.$httpConfig.getDownloadZip,
                	QS.stringify({
                		 goods_id:this.$route.params.goods_id,
                         token: sessionStorage.getItem("data_token")
                	})
                ).then((res) => {
                    this.fileDownload = res.data.data;
                }).catch((err) => {
                    console.log(err);
                });
            },
        },
      
        destroyed(){
            this.scrollWatch = false;
        },
        components:{
            PrHeader,
            Shopsn
        }
    }
</script>
<style lang="less">
    .pr-tab-wrap{
        background:#f1f1f1;
        height: auto;
        .list-main{
            padding-top:.1rem;
        }
        #pic_article  img {
            width:100% !important;
            height: auto !important;
            /*padding-bottom: .3rem !important;*/
        }
        #pic_article p{
            font-size: .28rem !important;
            line-height: 0.4rem !important;
            text-align: justify !important;
            padding: 0 .2rem 0rem .2rem !important;
        }
        .mint-tab-item{
            .mint-tab-item-label{
                color:#333;
                font-size:.3rem;
                line-height:.75rem;
            }
        }
        .mint-tab-item.is-selected{
            .mint-tab-item-label{
                color:#333;
            }
        }
        .mint-navbar{
            height:.75rem;
            background:#fff;
            line-height:.75rem;
            margin: 0 0 .2rem 0;
            .mint-tab-item{
                height:100%;
                padding:0;
                border-color:#d02629;
                line-height:.75rem;
            }
        }
        .center{
            text-align: center;
            height: 3rem;
            line-height: 10rem;
            font-size: .4rem;
        }
        .list-wrap{
            padding-top:.2rem;
            li{
                padding:.25rem .2rem;
                border-bottom:1px solid #e7e7e7;
                background:#fff;
                .title{
                    width:2.28rem;
                    font-size:.28rem;
                    color:#696969;
                }
                .con{
                    width:4.8rem;
                    font-size:.26rem;
                    color:#333;
                    line-height:.36rem;
                    text-align: right;
                }
                .pTitle{
                	width: 3.3rem;
                	/*height: 1rem;*/
                	float: left;
                	font-size: .25rem;
                	color: rgb(123,123,123);
                }
                span{
                	display: block;
                	width: 3.8rem;
                	float: left;
                	line-height: 150%;
                	font-size: .25rem;
                	color: #333333;
                }
            }
            .list-com{
                height:1rem;
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
        }
        .mint-tab-container {
            overflow: visible;
            position: relative;
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
                padding:0 .2rem;
                height:3.5rem;
                background:#fff;
                margin-bottom:.1rem;
                .list-hd{
                    padding:.2rem 0;
                    line-height:.32rem;
                    height:.3rem;
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
                        img{
                            width: 30/100rem
                        }
                    }
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
                .list-purTimer{
                    padding-top:.2rem;
                    font-size:.2rem;
                    color:#999;
                }
            }
        }
        .list-img-wrap{
            background:#fff;
            margin-top:.2rem;
            img{
                width:100%;
            }
        }
    }
</style>
 <style lang="less" scoped>
     .product{
        margin-top:20/100rem;
        margin-bottom: 1.2rem;
        .product_li{
            background-color: #fff;
            padding:10/100rem 20/100rem;
            margin-bottom: .2rem;
            .use_area_head{
                margin-bottom: .18rem;
                height: .7rem;
                line-height: .7rem;
                color: #666;
                font-size: .24rem;
                em{
                    font-style: normal;
                }
                .g_ask_time{
                    color:#666;
                    font-size:.24rem;
                }
            }
            .pro{
                font-weight: 700;
                margin-bottom:.05rem;
                span{
                    background-color: #CA9B27;
                    
                }
            }
            .color_grey{
                color: #999;
            }
            p{
                color: #333;
                font-size: .32rem;
                margin-bottom:.1rem;
                font-size: 32/100rem;
                line-height: 65/100rem;
            }
            .g_icon{
                font-size: 28/100rem;
                padding: 6/100rem;
                border-radius: 5/100rem;
                color:#fff;
                background-color: #97CD93;
            }
            .g_look_more{
                font-size:.24rem;
                color:#3985ff;
                text-align:right;
            }
            .g_look_more::after {
                content: "";
                display: block;
                width: 8px;
                height: 8px;
                border-top: 1px solid #3985ff;
                border-left: 1px solid #3985ff;
                -webkit-transform-origin: 50%;
                transform-origin: 50%;
                -webkit-transform: rotate(135deg);
                transform: rotate(135deg);
                margin: -2px 0 0 5px;
                display: inline-block;
                vertical-align: middle;
            }
        }
        
    }
    .btm{
        width:100%;
        height:100/100rem;
        background-color: #fff;
        display: flex;
        padding:15/100rem;
        box-sizing: border-box;
        position: fixed;
        bottom:0;
        input{
            border-radius: 15/100rem;
            width: 615/100rem;
            height: 70/100rem;
            background-color:#F1F1F1;
            order: 0;
            outline: none; 
            margin-right:20/100rem;
            padding:20/100rem;
            font-size: 24/100rem;
        }
        h6{
            font-size: 36/100rem;
            line-height: 60/100rem;
            color: #D77649;
        }
    }
</style>
