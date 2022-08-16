<template>
    <div class="newProduct1" ref="newProduct1">
        <header class="productList-header">
            <span @click="btnGo" class="btnGo"></span>
            <div class="header-text">推荐店铺</div>
        </header>
        <ul class="list-wrap">
            <li class="cardd" v-for="(good,index) in shoplist" :key="index" @click="shopHome(good.id)">
              <div class="card-image">
                <img :src="URL+good.store_logo" class="img"/>
              </div>
              <div class="bd-card">
                <div class="sec-card">
                  <img :src="URL+good.store_logo" />
                </div>
                <div class="title-main">{{good.shop_name}}</div>
                <div class="title-main1">{{good.shop_name}}</div>
              </div>
            </li>
        </ul>
        <!-- <span class="isEnd" v-if="isEnd">暂无数据</span>
        <span
        v-else
        v-loading="floorLoading"
        element-loading-text="拼命加载中..."
        element-loading-spinner="el-icon-loading"
        class="isEnd"
        ></span>
        <div class="load-wrap" v-show="$store.state.load_wrap" @touchmove.prevent>
        <mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner>
        </div> -->
    </div>
</template>

<script>
    import {Toast} from "mint-ui";
    import $ from 'jquery';
    import qs from 'qs';
    export default {
        name: "productList",
        data() {
            return {
                shoplist: [],
                page: 1,
                isEnd:false,
                floorLoading: false,
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
        mounted() {
            var that = this;
            $(window).scroll(function () {
                if (!that.$refs.newProduct1) return;
                var scrollTOp = $(window).scrollTop(); // 滑动的高度
                var windowHeight = document.body.clientHeight ; //浏览器视口高度
                var fileHeight = document.body.scrollHeight;
                if (scrollTOp + windowHeight == fileHeight) {
                    if(!that.isEnd){
                        that.page++;
                        that.sort();
                    }
                }
            });
        },
        created() {
            let title = '推荐店铺' + '-' + sessionStorage.getItem('titleKey') + '-' + sessionStorage.getItem('updateDescription');
            this.showScroll.scrollTitle(title);
            this.sort();
        },
        updated() {
            var that = this;
            setTimeout(function() {
            that.$store.state.load_wrap = false;
            }, 1000);
        },
        methods: {
            btnGo(){
                this.$router.go(-1);
            },
            sort() {
                this.axios.post(this.$httpConfig.getStoreList, qs.stringify({
                            token: sessionStorage.getItem("data_token"),
                            })).then((res) => {
                    if (res.data.status == 1) {
                            this.shoplist = res.data.data.records;
                    }else {
                        this.isEnd = true;

                    }
                })
            },
            shopHome(id){
                this.$router.push({
                    name:"shopHome",
                    params:{
                    id:id,
                    index:0
                    }
                })
            },
        },
    }
</script>
<style>
.el-loading-spinner i {
  color: #999 !important;
}
.el-loading-spinner .el-loading-text {
  color: #999 !important;
}
.el-loading-mask {
  background: none;
  color: #999 !important;
}
</style>
<style lang="less" scoped>
  .isEnd {
    display: flex;
    width: 100%;
    justify-content: center;
    height: 50px;
    align-items: center;
    color: #999;
  }
    .newProduct1 {
        .productList-header {
            background: #ffffff;
            height: 1rem;
            line-height: 1rem;
            display: flex;
            border-bottom: 1px solid #cbcbcb;
            .btnGo {
                margin: .3rem .2rem 0 .2rem;
                width: .4rem;
                height: .4rem;
                background: url(../../assets/fanhui.png);
                background-size: 100% 100%;
            }
            .header-text {
                font-size: .32rem;
                padding: 0 2.4rem 0 2.4rem;
            }
        }
	    .sort-wrap {
            height: .9rem;
            background: #fff;
            box-sizing: border-box;
            padding: .2rem 0;
            border-bottom: 1px solid #cbcbcb;
            line-height: .5rem;
            li {
                border-right: 1px solid #cbcbcb;
                box-sizing: border-box;
                width: 33.31%;
                font-size: .26rem;
                color: #666;
                position: relative;
                .icon {
                    position: absolute;
                    left: 1.8rem;
                    top: 0;
                    height: 100%;
                    .top {
                        position: absolute;
                        left: 0;
                        top: .17rem;
                        width: .12rem;
                        height: .06rem;
                        background: url(../../assets/sort-top.png);
                        background-size: 100% 100%;
                    }
                    .top.active {
                        background: url(../../assets/sort-top-active.png);
                        background-size: 100% 100%;
                    }
                    .bottom {
                        position: absolute;
                        left: 0;
                        bottom: .17rem;
                        width: .12rem;
                        height: .06rem;
                        background: url(../../assets/sort-bottom.png);
                        background-size: 100% 100%;
                    }
                    .bottom.active {
                        background: url(../../assets/sort-bottom-active.png);
                        background-size: 100% 100%;
                    }
                }
            }
            li:nth-child(4) {
                border-right: 0;
            }
            li.active {
                color: #d02629;
            }
	    }
        .list-wrap {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .cardd{
                width: 49%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                margin-top: 2%;
                background: #fff; 
                .card-image{
                    width:3.68rem;
                    height:3.68rem;
                    opacity:1 !important;
                    .img{
                        width:100%;
                        height:100%;
                        
                    }
                    background-color: #f0f0f0;
                }
            .bd-card{
            // background: #f1f1f1;
            }
            .sec-card{
            width: .88rem;
            height: .88rem;  
            padding: .05rem;
            position: relative;
            margin: -.5rem auto 0;
            overflow: hidden;
            z-index: 99;
            background-color: #f0f0f0;
            img{
                width:100%;
                height:100%;
                text-align: center;
                }
            }
            .title-main{
            color: #303133;
            padding: .06rem .2rem;
            font-size: .24rem;
            display: -webkit-box;
            overflow: hidden;
            white-space: normal !important;
            text-overflow: ellipsis;
            word-wrap: break-word;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            height: 20px;
            line-height: 23px;
            text-align: center;
            }
            .title-main1{
            color: #9e9e9e;
            padding: 0 .2rem .2rem .2rem;
            font-size: .24rem;
            display: -webkit-box;
            overflow: hidden;
            white-space: normal !important;
            text-overflow: ellipsis;
            word-wrap: break-word;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            height: 20px;
            line-height: 23px;
            text-align: center;
                    }
                }
            }
    }
</style>
