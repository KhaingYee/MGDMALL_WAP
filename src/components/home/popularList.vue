<template>
    <div class="newProduct1" ref="newProduct1">
        <header class="productList-header">
            <span @click="btnGo" class="btnGo"></span>
            <div class="header-text">商品列表</div>
        </header>
        <ul class="list-wrap">
            <li class="clearfix" v-for="(item,index) in newGoodsList" :key="index" @click="tolink(item.id)">
                <img :src="URL + item.pic_url">
                <div class="list-text">
                    <p class="text">{{item.title}}</p>
                    <p class="new-price">
                        <span class="pri">￥{{item.price_member}}</span>
                        <span>已售 {{item.sales_sum}}</span>
                    </p>
                </div>
            </li>
        </ul>
        <span class="isEnd" v-if="isEnd">暂无数据</span>
        <span
        v-else
        v-loading="floorLoading"
        element-loading-text="拼命加载中..."
        element-loading-spinner="el-icon-loading"
        class="isEnd"
        ></span>
        <div class="load-wrap" v-show="$store.state.load_wrap" @touchmove.prevent>
        <mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner>
        </div>
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
                newGoodsList: [],
                page: 1,
                isEnd:false,
                floorLoading: false,
                slide_switch: false,
                roll_switch: true,
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
            let _this = this;
            window.addEventListener('scroll', function () {
                if (!_this.$refs.newProduct1) return;
                if (document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {
                    //如果第一次请求没数据或数据没达到每页个数就不会再请求数据
                    if (_this.roll_switch == false) {
                        return;
                    }
                    if (_this.slide_switch == true) {
                        _this.slide_switch = false;
                        _this.page++;
                        _this.sort();
                    }
                }
            })
        },
        created() {
            let title = '商品列表' + '-' + sessionStorage.getItem('titleKey') + '-' + sessionStorage.getItem('updateDescription');
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
                if (this.page > 1) {
                this.floorLoading = true;
                }
                this.roll_switch = true;
                this.axios.post(this.$httpConfig.hotSellingGoods, qs.stringify({
                            page: this.page,
                            token: sessionStorage.getItem("data_token"),
                            })).then((res) => {
                    if (res.data.status == 1) {
                        if (this.page == 1) {
                            this.newGoodsList = res.data.data.data;
                        } else {
                            this.newGoodsList = [
                                ...this.newGoodsList,
                                ...res.data.data.data
                            ]
                        }
                        if(res.data.data.data.length<10){
                            this.roll_switch = false;
                            this.isEnd = true;

                        }
                         this.slide_switch = true;
                    }else {
                        this.roll_switch = false;
                        this.isEnd = true;

                    }
                })
            },
            tolink(id) {
                this.$router.push({
                    name: 'product',
                    params: {
                        id: id,
                        status: 1
                    }
                });
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
            li {
                width: 49%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                padding:.3rem 0;
                margin-top: 2%;
                background: #fff;
                img {
                    width: 3.2rem;
                    height: 3.2rem;
                }

                .list-text {
                    width: 3.2rem;

                    .text {
                        font-size: .28rem;
                        color: #333;
                        line-height: .41rem;
                        padding-top: .1rem;
                        width: 3.2rem;
                        height: .8rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                    }

                    .new-price {
                        font-size: .32rem;
                        padding-top: .1rem;
                        display: flex;
                        justify-content: space-between;
                        color:#909399;
                        align-items: center;
                        .pri {
                            font-size: .32rem;
                            color: #f23030;
                        }
                    }

                    .status {
                        color: #ddd;
                        padding-top: .1rem;

                        span {
                            font-size: .24rem;
                        }

                        span:nth-child(2) {
                            padding-left: .3rem;
                        }
                    }
                }
            }
        }
    }
</style>
