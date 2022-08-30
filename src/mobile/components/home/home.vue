<template>
  <div class="home" ref="home">
    <div v-title data-title="home">home</div>
    <div class="header">
        <div>
          <img src="../../assets/images/MGD_Logo_Text.png" class="header_logo"/>
        </div>
        <div class="header_seek">
            <img class="header_seek_img" :src="seekImg">
            <form action="javascript:void(0);">
                <input type="search" placeholder="Search Product...">
            </form>
        </div>
    </div>
    <mt-swipe :auto="3000">
      <mt-swipe-item>
        <img class="home-banner-img" src="../../assets/images/Covercopy.png" />
      </mt-swipe-item>
      <mt-swipe-item>
        <img class="home-banner-img" src="../../assets/images/s1.png" />
      </mt-swipe-item>
      <mt-swipe-item>
        <img class="home-banner-img" src="../../assets/images/s2.png" />
      </mt-swipe-item>
    </mt-swipe>

    <!-- 快捷链接加快讯 -->
    <news-flash></news-flash>
    <div class="flash-sale">
      <div class="title">
        <div class="name">Flash Sale</div>
        <div class="end-time">
          <div class="block hour">{{showTimeH}}</div>
           <div class="aa">:</div>
          <div class="block minute">{{showTimeM}}</div>
           <div class="aa">:</div>
          <div class="block second">{{showTimes}}</div>
        </div>
        <div class="more">See More</div>
      </div>
      <div class="cards">
          <div class="card" v-for="good in 3" :key="good">
            <div class="card-image">
              <img src="../../assets/images/c2.png" />
            </div>
            <div class="price-box">
              <span class="price">1000 ks</span>
              <span>5 sold</span>
            </div>
          </div>		
      </div>
    </div>
    <div class="store-shops">
      <div class="title">
        <div class="name">Store Shop
          <!-- <i class="fa-solid fa-shop"></i> -->
        </div>
      </div>
      <div class="store-cart">
        <div class="cart">
          <img class="image" src="../../assets/store-shop.jpg"/>
        </div>
        <div class="cart">
          <img class="image" src="../../assets/store-shop1.jpg"/>
        </div>
        <div class="cart">
          <img class="image" src="../../assets/store-shop.jpg"/>
        </div>
        <div class="cart">
          <img class="image" src="../../assets/store-shop1.jpg"/>
        </div>
        <div class="cart">
          <img class="image" src="../../assets/store-shop.jpg"/>
        </div>
        <div class="cart">
          <div class="see-more">See More</div>
        </div>
      </div>
    </div>
    <div>
      <div class="goods_new">
        <div class="title">
          <div class="name">Popular Product</div>
        </div>
        <div class="cards">
            <div class="card" v-for="good in 6" :key="good">
              <div class="card-image">
                <img src="../../assets/images/c2.png" />
              </div>
              <div class="title">K-Lite Rechargeable 5W Led Torch Light Kl-7131</div>
              <div class="price-box">
                <div class="price">10000 ks</div>
              </div>
            </div>	
            <div class="card">
              <div class="see-more">See More</div>
            </div>	
        </div>
      </div>
    </div>
    <div>
      <div class="promotion-goods">
        <div class="title">
          <div class="name">Promotion Product</div>
        </div>
        <div class="cards">
            <div class="card" v-for="good in 6" :key="good">
              <div class="card-image">
                <img src="../../assets/cate.jpg" />
              </div>
              <!-- <div class="promotion-discount">
                <img src="../../assets/Promo .png" class="img"/>
                <div class="percent">-33%</div>
              </div> -->
              <div class="title">Blue label and Spy Red Wine Cooler 4X275Ml</div>
              <div class="price-box">
                <div class="price">15000 ks</div>
                <div class="dis-price">15500 ks</div>
              </div>
              <div class="rating">
                <img v-for = 'n in parseInt(4)' :key = 'n' :src="imgYes">
                <img v-for = 'n in 5-parseInt(4)' :key ="n + 'i'" :src="imgNo">
              </div>
            </div>
            <div class="card">
              <div class="see-more">See More</div>
            </div>		
        </div>
      </div>
    </div>
    <ul class="floor">
      <li class="floor-item">
        <div class="top">
          <div class="title">Just For You</div>
        </div>
        <div class="goods-box">
          <div
            class="floor-goods"
            @click="goToProduct()"
          >
            <img src="../../assets/images/c1.png"/>
            <div class="promotion-discount">
              <img src="../../assets/Promo .png" class="img"/>
              <div class="percent">-33%</div>
            </div>
            <p class="title">
              Ceramic Tile Slide charge (10*10) and ceramic Tile charge
            </p>
            <p class="price">1000 ks</p>
            <p class="dis-price">1500 ks</p>
            <div class="rating">
              <img v-for = 'n in parseInt(4)' :key = 'n' :src="imgYes">
              <img v-for = 'n in 5-parseInt(4)' :key ="n + 'i'" :src="imgNo">
            </div>
          </div>

            <div
            :key="all"
            class="floor-goods"
            v-for="all in 2"
            @click="goToProduct()"
          >
            <img src="../../assets/cate.jpg"/>
            <div class="promotion-discount">
              <img src="../../assets/Promo .png" class="img"/>
              <div class="percent">-20%</div>
            </div>
            <p class="title">
              Blue label and Spy Red Wine Cooler
            </p>
            <p class="price">1000 ks</p>
            <p class="dis-price">1500 ks</p>
            <div class="rating">
              <img v-for = 'n in parseInt(3)' :key = 'n' :src="imgYes">
              <img v-for = 'n in 5-parseInt(3)' :key ="n + 'i'" :src="imgNo">
            </div>
          </div>

            <div
            :key="all"
            class="floor-goods"
            v-for="all in 2"
            @click="goToProduct()"
          >
            <img src="../../assets/images/c2.png"/>
            <p class="title">
              Bathroom accessories and ceramic Tile charge
            </p>
            <p class="price">1000 ks</p>
            <p class="dis-price">1500 ks</p>
            <div class="rating">
              <img v-for = 'n in parseInt(1)' :key = 'n' :src="imgYes">
              <img v-for = 'n in 5-parseInt(1)' :key ="n + 'i'" :src="imgNo">
            </div>
          </div>

            <div
            :key="all"
            class="floor-goods"
            v-for="all in 2"
            @click="goToProduct()"
          >
            <img src="../../assets/cate.jpg"/>
            <p class="title">
              Blue label and Spy Red Wine Cooler
            </p>
            <p class="price">1000 ks</p>
            <p class="dis-price">1500 ks</p>
            <div class="rating">
              <img v-for = 'n in parseInt(3)' :key = 'n' :src="imgYes">
              <img v-for = 'n in 5-parseInt(3)' :key ="n + 'i'" :src="imgNo">
            </div>
          </div>

        </div>
      </li>
    </ul>
    <to-Top></to-Top>
  </div>
</template>
<script>
import NewsFlash from "./children/newsFlash";
import toTop from "@/mobile/components/home/top"; 
import { Indicator, Toast, MessageBox, Popup } from "mint-ui";
import QS from "qs";
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: "home",
  data() {
    return {
      seekImg:require('@/mobile/assets/images/sousuo@2x.png'),
      imgNo:require('@/mobile/assets/xinxin.png'),
      imgYes:require('@/mobile/assets/starrecom.png'),
      showTimeH:'00',
      showTimeM:'00',
      showTimes:'00',
      countDownTime:0,
    };
  },
  created(){
    this.countDownTime = '23451';
    this.countDownTimer();
  },
  methods:{
    goToProduct(){
      this.$router.push({
        path: "/product"
      });
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
  },
  components: {
    NewsFlash,
    toTop
  }
};
</script>
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
    padding: 0 .2rem 0 .2rem;
    /* background-color: #327f9d; */
    background: linear-gradient(to right,#442e93 0,#25a5d8 100%);
    display: flex;
    .header_logo{  
      width: 3rem;
      height: 0.94rem;
      display: block;
      /* background-image: url("../../assets/images/logo.png"); */
      background-size: 100% 100%;
    }
    .header_seek{
      width: 3.9rem;
      height: 0.6rem;
      background-color: #eac9eb;
      margin: .2rem 0 .2rem .2rem;
      border-radius: 0.25rem;
      /* position: relative;  */
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
        top:0.35rem;
        left: 3.65rem;
        display: block;
        width: 0.26rem;
        height: 0.27rem;
      }   
      .header_seek input::-webkit-input-placeholder{
        color: #999;
      }
  }
.home {
  .mint-swipe-indicators {
    width: 100%;
    text-align: center;
  }
  .flash-sale{
    background-color: #fff;
    margin-top: .3rem;
    padding-bottom: .3rem;
		.title{
			display:flex;
			padding:.3rem .2rem;
			.name{
        font-size: .26rem;
        color: #0d7199;
        font-weight: bold;
      }	
      .more{
        font-size: .24rem;
        color:#ff6700;
        right: .2rem;
        position: absolute;
      }	
      .end-time{
				display: flex;
				color:#909399;
				align-items: center;
        margin-left: .1rem;
				.block{
					width:.4rem;
					height:.4rem;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: .1rem;
					color:white;
					background-color: #0d7199;
				}
        .aa{
          color: #0d7199;
          padding: 0 .05rem;
        }
			}	
		}
		.cards{
			display: flex;
			flex-direction: row;
			padding:0 0 0 .2rem;
			flex-wrap: nowrap;
			.card{
				width:2.24rem;
				flex: 0 0 auto;
				background:white;
        margin-right: 0.13rem;
        overflow: hidden;
        border-radius: 0.1rem;
        border: 0.02rem solid #f1f1f1;
				.card-image{
					width:2.24rem;
					height:2.24rem;
					opacity:1 !important;
					img{
						width:100%;
						height:100%;
						
					}
					background-color: #f0f0f0;
				}
				.price-box{
					display: flex;
					justify-content: space-between;
					padding:.2rem;
					color:#999;
					font-size: .16rem;
					align-items: center;
					.price{
						color:#ff6700;
						font-size:.24rem;
						
					}
				}
			}
		}
	}
  .store-shops{
    .title{
      padding: .3rem .2rem;
      .name{
        font-size: .26rem;
        color: #0d7199;
        font-weight: bold;
      }
    }
    .store-cart{
			display: flex;
			flex-direction: row;
			overflow-x: auto;
			padding:0 .2rem;
			flex-wrap: nowrap;
      .cart{
        width: 3rem;
        height: 3rem;
        border: .01rem solid #f1f1f1;
        margin-right:.2rem;
        flex: 0 0 auto;
        overflow: hidden;
        border-radius: 0.15rem;
        background-color:#fff;
          .image{
            width: 100%;
            height: 100%;
          }
          .see-more{
            font-size: .3rem;
            text-align: center;
            font-weight: bold;
            color: #000;
            margin: 1.3rem 0 0 0;
          }
      }
    }
  }
  .goods_new{
		.title{
			padding:.3rem .2rem;
			.name{
        font-size: .26rem;
        color: #0d7199;
        font-weight: bold;
      }		
		}
		.cards{
			display: flex;
			flex-direction: row;
			overflow-x: auto;
			padding:0 .2rem;
			flex-wrap: nowrap;
			.card{
				width:3rem;
				flex: 0 0 auto;
				/* height:4.5rem; */
				background:white;
				margin-right:.2rem;
				overflow: hidden;
        border-radius:.1rem;
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
          color: #000;
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
					padding:0 .2rem;
					.price{
						color:#ff6700;
						font-size:.24rem;
            padding:.1rem 0 .15rem 0;		
					}
				}
        .see-more{
            font-size: .3rem;
            text-align: center;
            font-weight: bold;
            color: #000;
            margin: 2rem 0 0 0;
          }
			}
		}
	}
  .promotion-goods{
		padding: 0 0 .2rem 0;	
		.title{
			padding:.3rem .2rem;
			.name{
        font-size: .26rem;
        color: #0d7199;
        font-weight: bold;
      }		
		}
		.cards{
			display: flex;
			flex-direction: row;
			overflow-x: auto;
			padding:0 .2rem;
			flex-wrap: nowrap;
			.card{
				width:3rem;
				flex: 0 0 auto;
				/* height:4.5rem; */
				background:white;
				margin-right:.2rem;
				overflow: hidden;
        border-radius:.1rem;
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
					padding:0 .2rem;
					.price{
						color:#ff6700;
						font-size:.24rem;
            padding-top:.1rem;		
					}
          .dis-price{
						color:#303133;
						font-size:.24rem;
            padding:.1rem 0;
            text-decoration: line-through;				
					}
				}
        .rating{
          padding: 0 0 .15rem .2rem;
          img{
            width: 0.25rem;
            height: 0.25rem;
            margin-right: 0.04rem;
          }
        }
        .see-more{
            font-size: .3rem;
            text-align: center;
            font-weight: bold;
            color: #000;
            margin: 2.5rem 0 0 0;
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
          color: #0d7199;
          font-weight: bold;
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
          .promotion-discount{
            z-index: 10;
            margin: 0rem 0 0 2.75rem;
            position: absolute;
            .img{
              width: 0.9rem;
              height: 0.4rem;
            }
            .percent{
              font-size: .24rem;
              color: #fff;
              z-index: 10;
              margin: -0.4rem 0 0 0.2rem;
            }
          }
          .title {
            display: -webkit-box;
            overflow: hidden;
            white-space: normal !important;
            text-overflow: ellipsis;
            word-wrap: break-word;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            color: #000;
            height: .8rem;
            line-height: .4rem;
            text-align: left;
            padding: 0 0.2rem;
            font-size: .26rem;
            margin-top: .1rem;
          }
        .price {
          color: #ff6700;
          font-size: .24rem;
          padding: .1rem 0.2rem 0 .2rem;
        }
        .dis-price{
          color:#303133;
          font-size:.24rem;
          padding:.2rem;
          text-decoration: line-through;				
				}
        .rating{
          padding: 0 0 .2rem .2rem;
          img{
            width: 0.25rem;
            height: 0.25rem;
            margin-right: 0.04rem;
          }
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
      height: 3.5rem;
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
}
</style>