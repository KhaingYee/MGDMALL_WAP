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

    <div>
      <div class="goods_new slide">
        <div class="title">
          <div class="name">Popular Product</div>
          <div class="more">More</div>
        </div>
        <div class="cards">
            <div class="card" v-for="good in 6" :key="good">
              <div class="card-image">
                <img src="../../assets/images/c2.png" />
              </div>
              <div class="title">ရေချိုးခန်းသုံးပစ္စည်းများ</div>
              <div class="price-box">
                <span class="price">၁၀၀၀၀ ကျပ်</span>
              </div>
            </div>		
        </div>
      </div>
    </div>
    <ul class="floor">
      <li class="floor-item">
        <div class="top">
          <div class="title">All Product</div>
        </div>
        <div class="goods-box">
          <div
            :key="all"
            class="floor-goods"
            v-for="all in 12"
          >
            <img src="../../assets/images/c1.png"/>
            <p class="title">
              Ceramic Tile
            </p>
            <p class="price">1000 kyats</p>
          </div>
        </div>
      </li>
    </ul>
    <to-Top></to-Top>
  </div>
</template>
<script>
import NewsFlash from "./children/newsFlash";
import toTop from "@/components/home/top"; 
import { Indicator, Toast, MessageBox, Popup } from "mint-ui";
import QS from "qs";
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: "home",
  data() {
    return {
      seekImg:require('@/assets/images/sousuo@2x.png'),
    };
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
    background-color: #eac9eb;
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
  .slide{
		padding: 0 0 .2rem 0;
	
		.title{
			display:flex;
			justify-content: space-between;
			// width:100%;
			padding:.3rem .3rem .3rem .3rem;
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
          /* height: .7rem; */
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
            /* height: .8rem; */
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
              /* background: url(../../assets/showcoupon.png) no-repeat; */
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