<template>
    <div class="newProduct1" ref="newProduct1">
        <header class="productList-header">
            <span @click="btnGo" class="btnGo"></span>
            <div class="header-text">{{$store.state.order_title}}</div>
        </header>
        <ul class="sort-wrap clearfix text-center">
			<li class="fl" :class="{active:sortField == 'sales_sum'}" @click="sort('xl')">销量
				<span class="icon">
						<em class="bottom" :class="{active:sort_id == 1}"></em><br>
						<em class="top" :class="{active:sort_id == 2}"></em>
					</span>
			</li>
			<li class="fl" :class="{active:sortField == 'price_member'}" @click="sort('jg')">价格
				<span class="icon">
						<em class="top" :class="{active:sort_id == 3}"></em><br>
						<em class="bottom" :class="{active:sort_id == 4}"></em>
					</span>
			</li>
			<li class="fl" @click="sort('rq')" :class="{active:sortField == 5}">人气</li>
		</ul>
        <ul class="list-wrap">
            <li class="clearfix" v-for="(item,index) in newGoodsList" :key="index" @click="tolink(item.id)">
                <img :src="URL + item.pic_url">
                <div class="list-text">
                    <p class="text">{{item.title}}</p>
                    <p class="new-price">
                        <span>￥{{item.price_member}}</span>
                    </p>
                </div>
            </li>
        </ul>
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
                search: true,
                newGoodsList: [],
                page: 1,
                isEnd:false,
                sortField: 'sales_sum',
                sort_status: 'desc',
                sort_id: 1,
            }
        },
        mounted() {
            this.$store.state.order_title = this.$route.params.name;
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
            this.sort();
        },
        methods: {
            btnGo(){
                this.$router.go(-1);
            },
            sort(index) {
				switch (index) {
					case 'xl':
						this.page = 1;
						this.search_data = [];
						this.sortField = 'sales_sum';
						if (this.sort_id != 1) {
							this.sort_id = 1;
							this.sort_status = "desc";
						} else {
							this.sort_id = 2;
							this.sort_status = 'asc';
						}
						this.load = true;
						break;
					case 'jg':
						this.page = 1;
						this.search_data = [];
						this.sortField = 'price_member';
						if (this.sort_id != 3) {
							this.sort_id = 3;
							this.sort_status = "asc";
						} else {
							this.sort_id = 4;
							this.sort_status = 'desc';
						}
						this.load = true;
						break;
					case 'rq':
						this.page = 1;
						this.search_data = [];
						// if(this.sortField == 5) return;
						this.sortField = 5;
						this.sort_status = '';
						this.load = true;
						break;
				}
                this.axios.post(this.$httpConfig.getAllGoods, qs.stringify({
                            page: this.page,
							attr_type: this.$route.params.id,
                            token: sessionStorage.getItem("data_token"),
							sort_type: this.sort_status,
							sort_field: this.sortField,})).then((res) => {
                            // this.newGoodsList = res.data.data.records;
                    if (res.data.status == 1) {
                        if (this.page == 1) {
                            this.newGoodsList = res.data.data.records;
                        } else {
                            this.newGoodsList = [
                                ...this.newGoodsList,
                                ...res.data.data.records
                            ]
                        }
                        // if(res.data.data.records.length<10){
                        //     this.isEnd = true;
                        // }
                    }else {
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

<style lang="less" scoped>
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
                font-size: .4rem;
                padding: 0 1rem 0 2rem;
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
            margin-top: .1rem;
            background: #fff;
            display: flex;
            flex-wrap: wrap;

            li {
                width: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                padding: .3rem 0;

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
                        color: #f23030;
                        padding-top: .1rem;

                        span {
                            font-size: .32rem;
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
