<template>
  <div class="home" ref="home">
    <div v-title data-title="主页">主页</div>
    <!-- <home-header :userName="getData"></home-header> -->
    <div class="header" :style="'background-color:' + apicolor">
        <router-link to="/home">
          <img src="../../assets/images/logopng.png" class="header_logo"/>
        </router-link>
        <div class="header_seek" @click="searchIn">
            <img class="header_seek_img" :src="seekImg" alt="搜素img">
            <form action="javascript:void(0);">
                <input type="search" placeholder="Search..." @keyup.enter.stop="submit(value)">
            </form>
        </div>
        <!-- <div class="header_news">
            <router-link to = '/myNews' class="trouble">
                <img class="header_news_advices" :src="advices" alt="消息img">
            </router-link>
        </div> -->
    </div>
        <mt-swipe :auto="3000">
          <mt-swipe-item v-for="item in homeBanner.slice(0,8)" :key="item.id">
            <img class="home-banner-img" :src="URL + item.pic_url" @click="goAd(item.ad_link)" />
          </mt-swipe-item>
        </mt-swipe>

    <!-- 快捷链接加快讯 -->
    <news-flash
      :nav="$store.state.home_data.nav"
      :data="$store.state.home_data.announcement"
      @hit="hit"
    ></news-flash>

    <Shopsn></Shopsn>
    <div class="load-wrap" v-show="$store.state.load_wrap" @touchmove.prevent>
      <mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner>
    </div>
    <to-Top></to-Top>
  </div>
</template>
<script>
import HomeHeader from "./children/header.vue"; //头部内容
import NewsFlash from "./children/newsFlash"; //快捷链接加快讯
import limitedHd from "./children/conHeader"; // 内容头
import hotGoods from "./children/hotGoods"; // 内容列表
import Shopsn from "@/components/page/Shopsn.vue"; //列表底部内容
import limitedActivity from "./children/limitedActivity";
import limitedDd from "@/components/Widget/moveCon";
import brandMus from "./children/BrandMus";
import lateMall from "./children/lateMall";
import mallCon from "@/components/Widget/mallCon";
import toTop from "@/components/page/toTop"; //回到顶部
import { Indicator, Toast, MessageBox, Popup } from "mint-ui";
import QS from "qs";
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: "home",
  data() {
    return {
      imgNo:require('@/assets/images/xinxin.png'),
      imgYes:require('@/assets/starrecom.png'),
      continuous: true,
      defaultIndex: 0,
      showIndicators: true,
      prevent: true,
      stopPropagation: true,
      data: "",
      getData: "",
      newsData: null,
      endtime: "",
      promotions: [],
      currentPage: 1,
      floorList: [],
      guesshot: [],
      guesLike:[],
      flashgood:[],
      isBottom: false,
      adList: [],
      isEnd: false,
      floorLoading: false,
      isRepeat: false,
      homeBanner:'',
      seekImg:require('@/assets/images/sousuo@2x.png'),
      RichScan:require('@/assets/images/RichScan.png'),
      advices:require('@/assets/images/meg.png'),
      sort_types:'store_sort',
      shoplist:[],
      couponData: [],
      apicolor: '',
      integralGood:'',
      intergral_lower:'',
      intergral_upper:'',
      showTimeH:'00',
      showTimeM:'00',
      showTimes:'00',
      countDownTime:0,
      slide_switch: false,
      roll_switch: true,
      storeProduct:null
    };
  },
  computed: {
    // ...mapState(['testing'])
    // ...mapGetters(['getEventById', 'catLength'])
  },
  created() {
    this.styColor();
    this.newFloor();
    this.seckillList();
    var userName = this.$route.params.userName;
    this.getData = userName;
    this.axios({
      url: this.$httpConfig.home,
      method: "post", 
      params: {
        token: sessionStorage.getItem("data_token")
      }
    })
      .then(res => {
        var json_wx = JSON.parse(res.request.response);
        Toast(res.data.message);
        if (json_wx.status == 999) {
          window.location.href = json_wx.msg;
          return;
        }
        this.$store.state.home_data = res.data.data;
        this.homeBanner = res.data.data.banner;
      })
      .catch(err => {
        console.log(err);
      });

      // this.getgoodInfo();
      this.getStoreListAjax();
      this.getStoreProductAjax();
  },
  mounted() {
    this.integralGoodsList();
    this.getFloor();
    var that = this;
     setTimeout(that.getFloor, 800);
    $(window).scroll(function() {
      if (!that.$refs.home) return;
      var bot = 700;
      if ($(".floor").length) {
        if (
          that.isBottom == false &&
          bot + $(window).scrollTop() >= 310 + $(".floor")[0].clientHeight
        ) {
          that.isBottom = true;
          if (!this.isEnd) {
            that.currentPage++;
            that.getFloor();
          }
        }
      }
    });
    $("html,body").animate({ scrollTop: "0px" }, 300);
  },
  methods: {
          countDownTimer() {
          if(this.countDownTime > 0) {
              setTimeout(() => {
                  this.countDownTime -= 1;
                  var h = Math.floor(this.countDownTime / 3600);
                  var m = Math.floor(this.countDownTime % 3600 / 60);
                  var s = Math.floor(this.countDownTime % 3600 % 60);
                  // var hDisplay = h > 0 ? h + (h == 1 ? "" : "") : '00' + "";
                  // var mDisplay = m > 0 ? m + (m == 1 ? "" : "") : '00' + "";
                  // var sDisplay = s > 0 ? s + (s == 1 ? "" : "") : '00' + "";
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
    seckillList() {
      this.axios
          .post(this.$httpConfig.seckillList)
          .then(res => {
            if(res.data.status == 1){
              this.countDownTime =res.data.data.time.countdown;
              this.flashgood = res.data.data.goods;
              this.countDownTimer();
            }
          })
          .catch(error => {
              this.countDownTime =error.data.data.time.countdown;
              this.flashgood = error.data.data.goods;
              console.log(error);
          });
    },
    styColor() {
        this.axios.post(this.$httpConfig.StyColor, QS.stringify({
          token: sessionStorage.getItem("data_token")
        }))
        .then(res => {
            this.apicolor = res.data.data.theme_color;
        })
        .catch(error => {
            console.log(error);
        });
    },
    storelink() {
      this.$router.push({
          name: "storeList",
      });
    },
    newlink() {
      this.$router.push({
          name: "newList",
      });
    },
    popularlink() {
      this.$router.push({
          name: "popularList",
      });
    },
    toProductList(item) {
      this.$router.push({
          name: "productList",
          params: {
              id: item.id,
              name: item.name
          }
      });
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
    goproduct(goods){
      this.$router.push({
          name:"product",
          params:{
              id:goods.id,
              status: 1
          }
      })
    },
    goLink(shopAdvertise){
      window.open(shopAdvertise);
    },
    goLogoLink(logoAdvertise){
      window.open(logoAdvertise);
    },
    searchIn() {
      this.$router.push({
          path:'/search'
      })
    },
    act(){
      Toast({
        message:'你好啊',
        position:'top'
      })
    },
    goAd(address) {
      window.open(address);
    },
    newFloor() {
        var params = { page: 1};
        this.$HTTP(this.$httpConfig.indexFloor, params, "post")
          .then(res => {
            this.guesLike = res.data.data.goods_news;
            this.guesshot = res.data.data.hotGoods;
          })
          .catch(err => {
          });
      },
    getFloor() {
      this.floorLoading = true;
      if (this.isRepeat && this.currentPage == 1) {
        return false;
      } else {
        if (this.currentPage == 1) {
          this.isRepeat = true;
        }
        var params = { page: this.currentPage };
        this.$HTTP(this.$httpConfig.guessLove, params, "post")
          .then(res => {
            if (res.data.status == 1) {
              if (this.currentPage == 1) {
                  this.floorList = res.data.data;
              } else {
                  this.floorList = [
                    ...this.floorList,
                    ...res.data.data
                  ]
              }
              this.isEnd = false;
            }
            this.isBottom = false;
            if (res.data.status == 0 || res.data.data == null || res.data.data == [] || res.data.data == '') {
              this.isEnd = true;
            }
          })
          .catch(err => {
            if (err.data.status == 0 || err.data.data == null || err.data.data == [] || err.data.data == '') {
              this.isEnd = true;
            }
          });
      }
    },
    integralGoodsList(){
        this.axios({
          method:'post',
          url:this.$httpConfig.integralGoodsList,
          params:{
              intergral_lower:this.intergral_lower,
              intergral_upper:this.intergral_upper,
              page:1,
                token: sessionStorage.getItem("data_token")
          }
      }).then((res) => {
          this.integralGood = res.data.data.records;
      }).catch((err) => {
          console.log(err);
      })
    },
    getStoreProductAjax() {
      this.axios.post(this.$httpConfig.getStoreList, QS.stringify({
        sort_types:this.sort_types,
        store_id:2,
        token: sessionStorage.getItem("data_token"),
      })).then((res) => {
          if(res.data.data){
            this.storeProduct = res.data.data.records.find((rec)=>rec.id==2);
          }
      }).catch((err) => {
        console.log(err)
      });
    },
    getStoreListAjax() {
      this.axios.post(this.$httpConfig.getStoreList, QS.stringify({
        // sort_types:this.sort_types,
        token: sessionStorage.getItem("data_token"),
      })).then((res) => {
        this.shoplist = res.data.data.records;
      }).catch((err) => {
        console.log(err)
      });
    },
    // getAd() {
    //   this.$HTTP(
    //     this.$httpConfig.getAd,
    //     { page: this.currentPage - 1 },
    //     "post"
    //   ).then(res => {
    //     this.adList.push(res.data.data);
    //     this.floorLoading = true;
    //   });
    // },
    Fdetail() {
      this.$router.push({
        name: "flashDetail",
      });
    },
    more(goods) {
      this.$router.push({
        name: "listHomeMore",
        params: {
          status: goods.class.id
        }
      });
    },
    hit(id) {
      this.$router.push({
        name: "noticeChild",
        params: {
          id: id
        }
      });
    },
    enterDetail(goods) {
      this.$router.push({
        name: "product",
        params: {
          id: goods.id,
          status: 1
        }
      });

    },
    enterflashDetail(item) {
      this.$router.push({
        name: "flashproduct",
        params: {
          id: item.goods_id,
          status: 1
        }
      });

    },
    enterIntegral(item){
        if(item.id){
            this.$router.push({
                name:'integralDetail',
                params:{
                    id:item.id,
                    status:2,//积分
                    money:item.money
                }
            });
        }else{
            this.$router.push({
                name:'product',
                params:{
                    id:item.id,
                    status:1//商品订单
                }
            });
        }
        
    },
    MallDetail() {
      this.$router.push({
        name: "IntegralMall",
      });

    },
    CouponSendList(nn) {
        this.axios({
            url: this.$httpConfig.CouponSendList,
            method: "post",
            params: {
                store_id: this.$store.state.commodity_data.goods.store_id,
                token: sessionStorage.getItem("data_token")
            }
        })
        .then(res => {
            let result = res.data.data.records
            result.sort(function(a, b){return b.condition-a.condition})
            this.couponData = result
        })
        .catch(err => {
            console.log(err);
        });
    },
  },
  destroyed() {},
  updated() {
    var that = this;
    setTimeout(function() {
      that.$store.state.load_wrap = false;
    }, 1000);
  },
  components: {
    HomeHeader,
    NewsFlash,
    limitedActivity,
    hotGoods,
    Shopsn,
    limitedDd,
    limitedHd,
    brandMus,
    lateMall,
    mallCon,
    toTop
  }
};
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
  margin: .05rem 0 0 0;
}
.el-dropdown-menu {
    /* width: 230px !important; */
    position: absolute !important;
    margin: .1rem -1rem 0 0 !important;
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
<style>
.home-banner-img {
  background-size: 100%;
}
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
    .header{
            // width: 100%;
            padding: .2rem;
            background-clip: #d02629;
        .header_logo{
            position: absolute;    
            width: 2.5rem;
            height: 0.6rem;
            display: block;
            // background-image: url("../../assets/images/logo.png");
            background-size: 100% 100%;
        }
        .header_seek{
            width: 4.4rem;
            height: 0.6rem;
            background-color: #d02629;
            margin: 0 0rem 0 2.6rem;
            border-radius: 0.25rem;
            position: relative;    
        }
         .header_seek input{
                width: 100%;
                height: 0.6rem;
                border-radius: 0.25rem ;
                border: 0.01rem solid #ffffff;
                outline: none;
                font-size: 0.26rem;
                text-indent: 0.75rem;
                background-color: #ffffff;
                color:#fff;
                margin: 0 !important;
            }
         .header_seek_img{
             position: absolute;
             top:0.18rem;
             left: 0.25rem;
             display: block;
             width: 0.26rem;
             height: 0.27rem;
         }   
         .header_seek input::-webkit-input-placeholder{
                color: #999;
         }
         .header_news{
             position: absolute;
             right: 0.32rem;
             top:0.2rem;
             width: auto;
             height: 0.6rem; 
           	
         }
         .header_news a{
             display: block;
            //  width: 1rem;
             height: 0.6rem;
            //  float: left; 
             text-decoration: none;
             text-align: center;
             color: #fff;
             font-size: 0.16rem
         }
         .header_news .trouble{
             display: block;
            //  width: 1rem;
             height: 0.6rem;
            //  float: left; 
             text-decoration: none;
             text-align: center;
             color: #fff;
             font-size: 0.16rem
         }
         .header_news_RichScan{
             width: 0.32rem;
             height: 0.32rem;
             display: block;
             margin: auto;
             margin-top: 0.07rem
         }
        .header_RichScan{
            width: 100%;
            line-height: 0.2rem;
            /*font-size: .1rem;*/
        }
        .header_news_advices{
             width: 0.5rem;
             height: 0.5rem;
             display: block;
             margin: auto;
             margin-top: 0.05rem
        }
    }
.home {
  .to-top {
    position: fixed;
    width: 0.75rem;
    height: 0.75rem;
    bottom: 1.6rem;
    right: 0.2rem;
  }
  .mint-swipe-indicators {
    width: 100%;
    text-align: center;
  }
  .various-lists {
    padding: 2%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .list {
        padding-top: 0.3rem;
        border-radius: 0.2rem;
        width: 49%;
        padding-bottom: 0.2rem;
        background: #ffffff;
        margin-bottom: 0.2rem;

        .title {
            padding-left: 0.2rem;
            height: 0.25rem;
            border-left: 0.05rem solid #b49d76;
            font-size: 0.3rem;
            line-height: 0.25rem;
            font-weight: bold;
        }

        .subtitle {
            font-size: 0.26rem;
            padding-left: 0.25rem;
            color: #999999;
            margin-top: 0.05rem;
        }

        .img-list {
            display: flex;
            align-items: center;

            img {
                width: 1.2rem;
                height: 1.2rem;
                margin-left: 0.3rem;
                margin-top: 0.1rem;
            }
        }
    }
  }
  .recomment-shop{
    margin-top: .2rem;
    padding: .3rem 0 .3rem 0;
    background-color: #ffffff;
    width: 100%;
    .recomment-titleimg{
      width: 3rem;
      margin: 0 0 0 2.2rem;
    }
    .recomment-title{
      font-size: .32rem;
      margin: -.33rem 0 0 0;
      text-align: center;
    }
    .recomment-logo{
      width: 95%;
      height: auto;
      margin: .3rem 0 0 .16rem;
    }
    .advertise-all{
      display: flex;
      .advertise-card{
        width: 2.47rem;
        border-right: .03rem solid #f1f1f1;
        .advertise-title{
          font-size: .26rem;
          text-align: center;
          margin: .15rem 0 0 0;
        }
        .advertise-detail{
          font-size: .26rem;
          text-align: center;
          margin: .15rem 0 0 0;
        }
        .advertise-img{
          width: 1.8rem;
          height: 2.5rem;
          margin: .15rem .35rem .2rem .35rem;
        }
      }
    }
  }
  .storenew{
    margin: .3rem 0;
		.title{
			display:flex;
			justify-content: space-between;
			// width:100%;
			padding:0 .3rem .3rem .3rem;
			display: flex;
			flex-wrap: wrap;
			color:#909399;
			.name{
        font-size: .26rem;
        color: #111;
      }	
      .more{
        font-size: .24rem;
      }		
		}
		.cardstore{
			display: flex;
			flex-direction: row;
			// width:100%;
			overflow-x: auto;
			padding:0 .3rem;
			flex-wrap: nowrap;
			.cardd{
				width:3rem;
				flex: 0 0 auto;
				height:4.5rem;
				background:white;
				margin-right:.2rem;
				overflow: hidden;
				// border-radius: 5px;
				.card-image{
					width:3rem;
					height:3rem;
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
          height: .4rem;
          line-height: .46rem;
          text-align: center;
				}
        .title-main1{
          color: #9e9e9e;
          padding: 0 .2rem;
          font-size: .24rem;
          display: -webkit-box;
          overflow: hidden;
          white-space: normal !important;
          text-overflow: ellipsis;
          word-wrap: break-word;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          height: .4rem;
          line-height: .46rem;
          text-align: center;
				}
			}
		}
	}
    .newgood{	
		.title{
			display:flex;
			justify-content: space-between;
			// width:100%;
			padding:0 .3rem .3rem .3rem;
			display: flex;
			flex-wrap: wrap;
			color:#909399;
			.name{
        font-size: .26rem;
        color: #111;
      }	
      .more{
        font-size: .24rem;
      }		
		}
    .title1{
			display:flex;
			justify-content: space-between;
			// width:100%;
			padding:.1rem .3rem .3rem .3rem;
			display: flex;
			flex-wrap: wrap;
			color:#909399;
			.name{
        font-size: .26rem;
        color: #111;
      }	
      .more{
        font-size: .24rem;
      }		
		}
		.cards{
			display: flex;
			flex-direction: row;
			// width:100%;
			overflow-x: auto;
			padding:0 .3rem;
			flex-wrap: nowrap;
			.card{
				width:3rem;
				flex: 0 0 auto;
				height:4.5rem;
				background:white;
				margin-right:.2rem;
				overflow: hidden;
				// border-radius: 5px;
				.card-image{
					width:3rem;
					height:3rem;
					opacity:1 !important;
					img{
						width:100%;
						height:100%;
						
					}
					background-color: #f0f0f0;
				}
				.title{
          color: #303133;
          padding: .1rem .2rem;
          font-size: .24rem;
          display: -webkit-box;
          overflow: hidden;
          white-space: normal !important;
          text-overflow: ellipsis;
          word-wrap: break-word;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          height: .7rem;
          line-height: .4rem;
          text-align: left;
          margin-top: .1rem;
				}
				.price-box{
					display: flex;
					padding:.05rem .2rem .2rem .2rem;
					color:#909399;
					font-size: .16rem;
					align-items: center;
					.price{
						color:#da3632;
						font-size:.26rem;	
					}
          .inte{
						color:#7c7c7d;
						font-size:.22rem;
						
					}
				}
			}
		}
	}
.store-container{
		// background:#fff;
		// padding:.1rem .1rem;
    margin-top: .25rem;
		.store{
			background: #fff;	
			overflow: hidden;
			display: flex;
			flex-direction: column;
			.tit{
        .name{
          font-size: .26rem;
          color: #111;
        }
				display: flex;
				align-items: center;
				// border-left: .06rem solid #d02629;
				padding:.2rem .2rem 0rem .2rem;
			}
			.products{
				display: flex;		
				align-items: center;
				justify-content:space-around;
				margin:.1rem;
				grid-column-gap:.04rem;			
				.product{
					background-color: white;	
					padding:.1rem;
					width:2.4rem;
					height:3.4rem;
					overflow: hidden;
					.image{
						width:2.2rem;
						height:2.2rem;
						overflow: hidden;				
						img{
							width:100%;
							height:100%;
							background:#fff;			
						}
					}
					.title{
						font-size: .24rem;
						padding:.03rem;
						padding-top:.1rem;
            color: #303133;
            display: -webkit-box;
            overflow: hidden;
            white-space: normal !important;
            text-overflow: ellipsis;
            word-wrap: break-word;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            height: .7rem;
            line-height: .4rem;
					}
					.price{
						color:#d02629;
						padding:.05rem .03rem .03rem .03rem;
						font-size:.28rem;
					}
				}
			}	
		}
	}
  .slide{
		padding: 0 0 .2rem 0;
	
		.title{
			display:flex;
			justify-content: space-between;
			// width:100%;
			padding:0 .3rem .3rem .3rem;
			display: flex;
			flex-wrap: wrap;
			color:#909399;
			.name{
        font-size: .26rem;
        color: #111;
      }	
      .more{
        font-size: .24rem;
      }		
		}
    .title1{
			display:flex;
			justify-content: space-between;
			// width:100%;
			padding:.1rem .3rem .3rem .3rem;
			display: flex;
			flex-wrap: wrap;
			color:#909399;
			.name{
        font-size: .26rem;
        color: #111;
      }	
      .more{
        font-size: .24rem;
      }		
		}
		.store-cards{
			display: flex;
			flex-direction: row;
			// width:100%;
			overflow-x: auto;
			padding:0 .3rem;
			flex-wrap: nowrap;
			.store-card{
				background:white;
				width:2.4rem;
				flex: 0 0 auto;
				height:2.8rem;
			
				margin-right:.2rem;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				align-items: center;
				
				position:relative;
				.main{
					width:2.4rem;
					height:1.5rem;
					border:.06rem solid white;
					img{
						width: 100%;
						height: 100%;
						background-color:#f0f0f0 ;
					}
				}
				.logo{
					width: 1rem;
					height:1rem;
					margin-top: -.5rem;
					border:.06rem solid white;
					img{
						width:100%;
						height:100%;
						background-color:#f0f0f0 ;
						
					}
				}
				.title{
					text-align: center;
					color:#303133;
					display: flex;
					align-items: center;
					width: auto !important;
				}
			}
		}
		.cards{
			display: flex;
			flex-direction: row;
			// width:100%;
			overflow-x: auto;
			padding:0 .3rem;
			flex-wrap: nowrap;
			.card{
				width:3rem;
				flex: 0 0 auto;
				height:4.5rem;
				background:white;
				margin-right:.2rem;
				overflow: hidden;
				// border-radius: 5px;
				.card-image{
					width:3rem;
					height:3rem;
					opacity:1 !important;
					img{
						width:100%;
						height:100%;
						
					}
					background-color: #f0f0f0;
				}
				.title{
          color: #303133;
          padding: .1rem .2rem;
          font-size: .24rem;
          display: -webkit-box;
          overflow: hidden;
          white-space: normal !important;
          text-overflow: ellipsis;
          word-wrap: break-word;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          height: .7rem;
          line-height: .4rem;
          text-align: left;
          margin-top: .1rem;
				}
				.price-box{
					display: flex;
					justify-content: space-between;
					padding:.05rem .2rem .2rem .2rem;
					color:#909399;
					font-size: .16rem;
					align-items: center;
					.price{
						color:#da3632;
						font-size:.24rem;
						
					}
				}
			}
		}
	}
  .flash-sale{
		background:white;
    margin-bottom: .3rem;	
    margin-top: .25rem !important;	
    padding-bottom: 0 !important;
		.title{
			display: flex;
			color: #606266;
			align-items: center;
			border-left: 3px solid #d02629;
      padding-top: .2rem;
			.more{
				display: flex;
				color:#909399;
				align-items: center;
				.block{
					width:.4rem;
					height:.4rem;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 5px;
					color:white;
					background-color: #d02629;
				}
        .aa{
          color: #d02629;
          padding: 0 .05rem;
        }
			}
		}
		.flash-item{
			display: flex;
			flex-direction: row;
			// width:100%;
			overflow-x: auto;
			padding:0rem .3rem;
			flex-wrap: nowrap;
			.flash-card{
				width:3rem;
				flex: 0 0 auto;
				height:5.07rem;
				background:white;
				margin-right:.2rem;
				overflow: hidden;
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
				.image{
					width:3rem;
					height:3rem;
					background-color: #f8f8f8;
					// border: .06rem solid white;
					img{
						width:100%;
						height:100%;
					}
				}
				.title{
					border: none;
					padding:0;
					padding-top:.06rem;
					padding-left:.06rem;
					padding-right: .06rem;
					font-size: .24rem;
          color: #303133;
          display: -webkit-box;
          overflow: hidden;
          white-space: normal !important;
          text-overflow: ellipsis;
          word-wrap: break-word;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          height: .66rem;
          line-height: .34rem;
          text-align: left;
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
				.more{
					color:#909399;
					border:.04rem solid #d02629;
					padding:.1rem .2rem;
					
				}
			}
		}
	}
  .floor {
    background-color: #f2f1f2;
    box-sizing: border-box;
    .floor-item {
      background-color: #f2f1f2;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .top {
        background-color: #f2f1f2;
        width: 100%;
        padding: .1rem 0.2rem 0.2rem 0.2rem;
        overflow: hidden;
        .title {
          text-align: center;
          font-size: 0.28rem;
          color: #111111;
        }
        .more {
          line-height: 0.4rem;
          color: #999;
          font-size: 0.28rem;
          position: relative;
          padding-right: 0.2rem;
          em {
            position: absolute;
            right: 0;
            top: 0.07rem;
            i {
              border-left: 6px solid #ccc;
              border-top: 6px solid transparent;
              border-bottom: 6px solid transparent;
              position: absolute;
              right: -0.04rem;
              top: 0;
            }
            b {
              border-left: 6px solid #f2f2f2;
              border-top: 6px solid transparent;
              border-bottom: 6px solid transparent;
              position: absolute;
              right: 0;
              top: 0;
            }
          }
        }
      }
      .image-ad {
        width: 7.45rem;
        height: 3.5rem;
        border: 1px solid #eee;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 100%;
          height: 3.5rem;
          border: none;
        }
      }
      .goods-box {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        .floor-goods {
          margin-top: 2%;
          background-color: #fff;
          width: 49%;
          float: left;
          // border: 3px solid #F2F1F2;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          img {
            width: 100%;
            height: 3.658rem;
            align-self: center;
            border-bottom: 0.5px solid #f2f1f2;
          }
          .title {
            display: -webkit-box;
            overflow: hidden;
            white-space: normal !important;
            text-overflow: ellipsis;
            word-wrap: break-word;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            color: #343434;
            height: .8rem;
            line-height: .4rem;
            text-align: left;
            padding: 0 0.2rem;
            font-size: .28rem;
            margin-top: .1rem;
              .shop-grade{
                font-size: .22rem;
                background: #de2d35;
                color: white;
                border-radius: .05rem;
                padding: .05rem .1rem;
                text-align: center;
              }
          }
          .showdiv{
            display: flex;
            padding: .01rem .2rem;
            .couponshow{
              background: url(../../assets/showcoupon.png) no-repeat;
              background-size: 100% 100%;
              font-size: .2rem;
              padding: .25em .1rem 0 .1rem;
              // height: .25rem;
              margin: .06rem .07rem 0 0;
              color: #fff;
            }
            .discountshow{
              color: #da3632;
              border: 1px solid #da3632;
              height: .21rem;
              padding: .04rem .02rem .02rem .02rem;
              font-size: .18rem;
              margin: .05rem .07rem 0 .02rem;
            }
        }
        .price {
          color: #da3632;
          font-size: .26rem;
          font-weight: bold;
          text-align: left;
          padding: 0 0.2rem;
          height: .65rem;
          line-height: .55rem;
      }
      }
    }
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
}
</style>
<style lang="less" scoped>
.home {
  .mint-swipe {
      width: 100%;
      text-align: center;
      position: absolute;
      height: 3.28rem;
      z-index: 10;
    img {
      width: 100%;
      height: 100%;
    }
    .mint-swipe-indicators {
      .mint-swipe-indicator {
        width: .4rem;
        height: .4rem;
      }
    }
  }
  .entranch-main {
    width: 100%;
    height: 2rem;
  }
  .home-banner {
    padding: 0.2rem;
    img {
      width: 100%;
    }
  }
  .banner {
    img {
      width: 100%;
    }
  }
  .banner-3 {
    img {
      width: 7.5rem;
      height: 3.75rem;
    }
  }
  .limit-banner {
    padding: 0.2rem;
    img {
      width: 7.1rem;
      height: 1.66rem;
      border-radius: .1rem;
    }
  }
}
</style>