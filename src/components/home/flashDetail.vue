<template>
    <div class="newProduct1" ref="newProduct1">
        <header class="productList-header">
            <span @click="btnGo" class="btnGo"></span>
            <div class="header-text">闪购清单</div>
        </header>
        <div class="time-divv" id="sticky" v-if="dateTime">
            <div class="time" v-for="(item, index)  in dateTime" :key="index">
                <div class="start-time">{{item.startTime}}</div>
                <div class="name">{{item.name}}</div>
            </div>
        </div>
        <div class="countDown">
            <div class="title">
            <div class="name">现时现量 先到先得</div>
            <div class="more" v-if="countDownTime == '' || countDownTime == null || countDownTime == []">
                秒杀还未开始&nbsp;&nbsp;
                <div class="block hour">00</div>
                <div class="aa">:</div>
                <div class="block minute">00</div>
                <div class="aa">:</div>
                <div class="block second">00</div>
            </div>
            <div class="more" v-else>
                距离本场结束&nbsp;&nbsp;
                <div class="block hour">{{showTimeH}}</div>
                <div class="aa">:</div>
                <div class="block minute">{{showTimeM}}</div>
                <div class="aa">:</div>
                <div class="block second">{{showTimes}}</div>
            </div>
            </div>
        </div>
        <ul class="list-wrap" v-if="countDownTime == '' || countDownTime == null || countDownTime == []">
			<li class="clearfix" v-for="item in flashsale" :key="item.id">
				<div class="product-list">
					<img :src="URL + item.pic_url" class="fl">
					<div class="list-text fl">
						<p class="text">{{item.title}}</p>
                        <div class="sale-bar">
                            <div class="inner-bar" :style="'width:' + ((item.buy_num/item.activity_num)*100) + '%'"></div>
                        </div>
                        <div class="remain">
                            <div class="buy">已抢购{{item.buy_num}}件</div>
                            <div class="stock">仅剩{{item.activity_num - item.buy_num}}件</div>
                        </div>
                        <div class="bottom">
                            <div class="price">
                            ￥{{item.activity_price}}
                            </div>
                            <div class="btn">
                            活动已结束
                            </div>
                        </div>
					</div>
				</div>
			</li>
		</ul>
        <ul class="list-wrap" v-else>
			<li class="clearfix" v-for="item in flashsale" :key="item.id">
				<div class="product-list">
					<img :src="URL + item.pic_url" class="fl">
					<div class="list-text fl" @click="enterDetail(item)">
						<p class="text">{{item.title}}</p>
                        <div class="sale-bar">
                            <div class="inner-bar" :style="'width:' + ((item.buy_num/item.activity_num)*100) + '%'"></div>
                        </div>
                        <div class="remain">
                            <div class="buy">已抢购{{item.buy_num}}件</div>
                            <div class="stock">仅剩{{item.activity_num - item.buy_num}}件</div>
                        </div>
                        <div class="bottom">
                            <div class="price">
                            ￥{{item.activity_price}}
                            </div>
                            <div class="btn" @click="enterDetail(item)">
                            抢购
                            </div>
                        </div>
					</div>
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
                flashsale: [],
                currentPage: 1,
                isEnd:false,
                floorLoading: false,
                headParams: {
                    title: sessionStorage.getItem('titleKey'),
                    description: sessionStorage.getItem('updateDescription'),
                    keywords: sessionStorage.getItem('contentKey'),        
                },
                timeData:[],
                flashid:'',
                countDownTime:0,
                showTimeData: '',
                timeDataFilter: [],
                dateTime: [],
                showTimeH:'00',
                showTimeM:'00',
                showTimes:'00',
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
            let sticky = $('#sticky'),
            stickyTop = sticky.offset().top,
            scrolled = false,
            $window = $(window);

            /* Bind the scroll Event */
            $window.on('scroll', function(e) {
                scrolled = true;
            });

            let timeout = setInterval(function() {
                /* If the page was scrolled, handle the scroll */
                if (scrolled) {
                    scrolled = false;
                    if ($window.scrollTop() >= stickyTop) {
                        sticky.addClass('fixed');
                        console.log("sticky");
                    }
                    else {
                    sticky.removeClass('fixed');
                    }
                }
            }, 200);
        },
        created() {
            let title = 'Detail' + '-' + sessionStorage.getItem('titleKey') + '-' + sessionStorage.getItem('updateDescription');
            this.showScroll.scrollTitle(title);
            this.gettimeList();
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
            countDownTimer() {
                if(this.countDownTime > 0) {
                    setTimeout(() => {
                        this.countDownTime -= 1;
                        var h = Math.floor(this.countDownTime / 3600);
                        var m = Math.floor(this.countDownTime % 3600 / 60);
                        var s = Math.floor(this.countDownTime % 3600 % 60);
                        var hDisplay = h < 10 ?  "0" + h : h;
                        var mDisplay = m < 10 ?  "0" + m : m;
                        var sDisplay = s < 10 ?  "0" + s : s;
                        this.showTimeH = hDisplay;
                        this.showTimeM = mDisplay;
                        this.showTimes = sDisplay;
                        this.countDownTimer()
                    }, 1000)
                }
            },
            gettimeList() {
				this.axios.post(this.$httpConfig.timeList, qs.stringify({
					token: sessionStorage.getItem("data_token")
				}))
					.then((res) => {
                    this.timeData = res.data.data;
                    var now = Math.round(new Date().getTime() / 1000);
                    this.showTimeData = now;

                    this.timeData.forEach((time, index) => {
                        if(time.countdown) {
                            this.countDownTime = time.countdown;
                            this.flashid = time.id;
                        } 
                    })

                    var data = this.timeData.filter(time=> {
                        return !(time.end_time<this.showTimeData)
                    }).filter(time => {
                        return !(this.showTimeData>time.start_time&&this.showTimeData<time.end_time)
                    }).slice(0,4)
                    this.timeDataFilter = data;

                    var m = new Date();
                    var dateString =
                        m.getUTCFullYear() + "-" +
                        ("0" + (m.getUTCMonth()+1)).slice(-2) + "-" +
                        ("0" + m.getUTCDate()).slice(-2);

                    var date = this.timeDataFilter.map(item => {
                        var starDate = item.start.split(" ")[0];
                        var startTime = item.start.split(" ")[1];
                        
                        var day1 = new Date(starDate); 
                        var day2 = new Date(dateString);
                        var difference= Math.abs(day2-day1);
                        var diffDays = Math.ceil(difference / (1000 * 60 * 60 *24));

                        if(diffDays == 0) {
                            item.startTime = startTime
                            item.name = '今天'
                            return item;
                        }
                        if(diffDays == 1) {
                            item.startTime = startTime
                            item.name = '明天'
                            return item;
                        }
                        if(diffDays == 2) {
                            item.startTime = startTime
                            item.name = '后天'
                            return item;
                        }
                        if(diffDays > 2) {
                            item.startTime = startTime
                            item.name = starDate
                            return item;
                        }
                    })
                    this.dateTime = date;

                    this.countDownTimer();
                    this.getflashDetail(this.flashid);
					}).catch((err) => {
						console.log(err)
					});
			},
            getflashDetail(id) {
                this.axios.post(this.$httpConfig.getSeckillList, qs.stringify({
                    token: sessionStorage.getItem("data_token"),
                    id:id
                    })).then((res) => {
                    this.flashsale = res.data.data.data;
                })
            .catch(error => {
                this.flashsale = error.data.data.data;
            });
            },
            enterDetail(item) {
                this.$router.push({
                    name: "flashproduct",
                    params: {
                    id: item.goods_id,
                    status: 1
                    }
                });
            },
            // getflash() {
            //     if (this.currentPage > 1) {
            //     this.floorLoading = true;
            //     }
            //     this.axios.post(this.$httpConfig.seckillList, qs.stringify({
            //         token: sessionStorage.getItem("data_token")
            //             // page: this.currentPage,
            //         })).then((res) => {
            //     if (res.data.status == 1) {
            //         if (this.currentPage == 1) {
            //             this.flashsale = res.data.data;
            //         } else {
            //             this.flashsale = [
            //                 ...this.flashsale,
            //                 ...res.data.data
            //             ]
            //         }
            //     }else {
            //         this.isEnd = true;

            //     }
            //     })
            // },
            // tolink(id) {
            //     this.$router.push({
            //         name: 'product',
            //         params: {
            //             id: id,
            //             status: 1
            //         }
            //     });
            // },
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
    .fixed {
        position:fixed; 
        top:0px;
    }
  .countDown{
	background:white;
    margin-bottom: .2rem;	
    margin-top: .2rem !important;	
    .title{
        display: flex;
        color: #606266;
        align-items: center;
        border-left: 3px solid #d02629;
        padding: .3rem .2rem;
        justify-content: space-between;
        .name{
            font-size: .26rem;
            color: #111;
            float: left;
        }
        .more{
            display: flex;
            color:#909399;
            align-items: center;
            font-size: .24rem;
            .block{
                width:.4rem;
                height:.4rem;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: .1rem;
                color:white;
                background-color: #d02629;
                // margin-left: 5px;
            }
            .aa{
            color: #d02629;
            padding: 0 .05rem;
            }
        }
	}
  }
    .time-divv{
            display: flex;
            flex-direction: row;
            overflow-x: auto;
            background: #fff;
            width: 100%;
        .time{
            padding: .2rem;
            background: #fff;
            .start-time{
                font-size: .26rem;
                padding: 0 0 .1rem 0;
                text-align: center;
            }
            .name{
                font-size: .26rem;
                border: 1px solid #999;
                text-align: center;
                padding: .05rem .15rem;
                border-radius: .5rem;
            }
        }
        .avtive {
            color: #d02629;
            // border-bottom: 4/100rem solid #C19D07;
        }
    }
    .isEnd {
        display: flex;
        width: 100%;
        justify-content: center;
        height: 1rem;
        align-items: center;
        color: #999;
    }
  	.head {
		background: #fff;
		width: 100%;
		overflow-x: auto;
		height: 90/100rem;
		border-bottom: .01rem solid #CBCBCB;
	}
	
	.headers {
		// background-color: #fff;
		height: 100%;
		li {
			font-size: .26rem;
			width: 1.5rem;
			// height: .9rem;
			text-align: center;
			line-height: .9rem;
			box-sizing: border-box;
			padding:0 .2rem;
			display:inline;
		}
		.avtive {
			color: #d02629;
			// border-bottom: 4/100rem solid #C19D07;
		}
	}
    .list-wrap {
		li {
            background: #fff;
            padding: .3rem;
            margin: .2rem .2rem 0 .2rem;
            border-radius: .2rem;
			.product-list{
				display: flex;
				img {
					width: 2.2rem;
					height: 2.2rem;
				}
				.list-text {
					width: 4.3rem;
					padding-left: .25rem;
					.text {
						font-size: .32rem;
						color: #333;
						line-height: .45rem;
						padding-top: .1rem;
						height: .9rem;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}
                    .sale-bar{
                        width:100%;
                        background-color: #f1f1f1;
                        height:.08rem;
                        border-radius: 1rem;
                        margin-top:.06rem;
                        position: relative;
                        .inner-bar{
                            // width:50%;
                            height: .08rem;
                            position: absolute;
                            left: 0;
                            background-color: #d02629;
                            border-radius: 1rem;
                        }
                    }
                    .remain{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        color: #909399;
                        font-size: .2rem;
                        padding-top:.1rem;
                        padding-left:.06rem;
                        padding-right: .06rem;
                        .stock{
                            color:#d02629;
                        }
                    }
                    .bottom{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding-top: .1rem;
                        .price{
                            color:#da3632;
                            font-size: .28rem;
                        }
                        .btn{
                            border: .04rem solid #d02629;
                            color:#d02629;
                            padding:.06rem .2rem;
                            font-size: .2rem;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 1rem;
                        }
                    }
					.new-price {
						font-size: .32rem;
						color: #f23030;
						padding-top: .3rem;
						span {
							font-size: .4rem;
							font-weight: bold;
						}
					}
					.status {
						color: #ddd;
						padding: .1rem 0 0 0;
						display: flex;
						justify-content: space-between;
						span {
							font-size: .24rem;
						}
					}
				}
			}
			.show-shop{
				display: flex;
				margin: 0 0 .2rem 2.5rem;
				.show-name{
					font-size: .24rem;
					padding: .07rem .1rem 0 0;
					color: #999999;
				}
				.btn-shop{
					width: .18rem;
					height: .2rem;
					margin: .13rem .2rem 0 0;
				}
				.shop-gradename{
					font-size: .25rem;
					background: #de2d35;
					color: white;
					border-radius: .05rem;
					padding: .05rem .1rem;
					text-align: center;
				}
			}
		}
        li:last-child {
           margin-bottom: .2rem;
        }
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
                padding: 0 2.4rem 0 2.3rem;
            }
        }
    }
</style>
