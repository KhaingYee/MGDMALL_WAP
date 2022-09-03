<template>
    <div class="product">
      <mt-swipe :auto="4000" @change="imgSlideChange">
        <img class="headerimg" src="../../assets/arrow1@2x.png" @click="goLastPage">
        <span class="slide-count-indicator">{{(images.length>0?currentImgSlideIndex+1:0)+' / '+images.length}}</span>  
        <mt-swipe-item v-for="(item,index) in images" :key="index">                     
        <img :src="item.pic_url" />
        </mt-swipe-item>
      </mt-swipe>
      <div class="describe">
        <p class="description-fn">Acer Aspire 3 ( A314 ) ( Celeron ) Electric Blue Color, Laptop, Notebook, Office Laptop, Online Learning Laptop</p>
        <p class="price">
          <span style="color:#ff6700;font-size:.36rem">
          15000 ks
          </span>
          <span class="new">
            Original Price ：
          <s>15500 ks</s>
          </span>
          <img class="fav" src="../../assets/fav.png"/>
        </p>
        <div class="rating">
          <img v-for = 'n in parseInt(4)' :key = 'n' :src="imgYes">
          <img v-for = 'n in 5-parseInt(4)' :key ="n + 'i'" :src="imgNo">
        </div>
        <div class="shop-name"><span>Shop Name :</span>&nbsp;ABC Store</div>
      </div>
      <div class="specification">
        <div class="selectColor" @click="selectpro">
          <div class="title">Selected Color :<span class="name">&nbsp;Black</span>
            <i class="fa-solid fa-angle-right" id="btn-right"></i></div>
          <div class="spec-image">
            <img class="show-image" src="../../assets/showlaptop.jpg"/>
            <img class="show-image" src="../../assets/images/category.jpg"/>
            <img class="show-image" src="../../assets/showlaptop.jpg"/>
          </div>
        </div>
      </div>
      <div class="comment-display">
        <div class="for_comment">
            <span class="coupon_title">Customer Review&nbsp;&nbsp;(10)</span>
            <span class="coupon_number"> See More</span>
            <i class="fa-solid fa-angle-right" id="btn-right"></i>
        </div>
        <div class="list-wrap" v-for="item in 2" :key="item">
            <div class="list-hd">
                <div class="pull-left">
                    <img src="../../assets/my_user_pic.png">
                    <span >kym</span>
                </div>
                <div class="list-purTimer">20.5.2022</div>
                <div class="pull-right">
                    <img v-for = 'n in parseInt(3)' :key = 'n' :src="imgYes">
                    <img v-for = 'n in 5-parseInt(3)' :key ="n + 'i'" :src="imgNo">
                </div>
            </div>
            <div class="list-com">goods item</div>
            <div class="list-img-main clearfix">
              <img src="../../assets/showlaptop.jpg"/>
              <img src="../../assets/images/category.jpg"/>
              <img src="../../assets/showlaptop.jpg"/>
            </div>
        </div>
    </div>
    <div class="Question">
      <div class="fortitle">
        <span class="title">Question for this product&nbsp;&nbsp;(10)</span>
        <span class="more"> See More</span>
        <i class="fa-solid fa-angle-right" id="btn-right"></i>      
      </div>
      <div class="all-qa">
        <div class="write-q">
          <i class="fa-solid fa-message" id="qicon"><span class="text">Q</span></i>
          <div class="ques">
            <div class="wq">stock shi lar</div>
            <div class="show-detail">
              <span class="name">kym</span>
              <span class="date">20.10.2022</span>
            </div>
          </div>
        </div>
        <div class="write-a">
          <i class="fa-solid fa-message" id="qicon"><span class="text">A</span></i>
          <div class="ques">
            <div class="wq">shi tal</div>
            <div class="show-detail">
              <span class="name">admin</span>
              <span class="date">20.10.2022</span>
            </div>
          </div>
        </div>
        <div class="write-q">
          <i class="fa-solid fa-message" id="qicon"><span class="text">Q</span></i>
          <div class="ques">
            <div class="wq">what is this</div>
            <div class="show-detail">
              <span class="name">user</span>
              <span class="date">21.10.2022</span>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-next" @click="gotoquestion">Ask Question</div>
    </div>
    <div class="related">
      <div class="title">Related Product</div>
      <div class="all-card">
        <div class="card" v-for="r in 6" :key="r">
          <img src="../../assets/showlaptop.jpg" class="image" />
          <div class="price">1000 ks</div>
        </div>
      </div>
    </div>
    <ul class="floor">
      <li class="floor-item">
        <div class="top">
          <div class="title">Same Store</div>
        </div>
        <div class="goods-box">
          <div
          :key="all"
          class="floor-goods"
          v-for="all in 6"
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
      <div class="pro-footer">
        <div class="buy-now">Buy Now</div>
        <div class="add-cart">Add To Cart</div>
      </div>
      <div class="blance"></div>
      <mt-popup
        v-model="popupVisible"
        position="bottom">
       <div class="popbox">
        <div class="show-product">
          <img src="../../assets/images/c2.png"/>
          <div class="detail">
            <div class="price-box">
              <span class="price">1000 ks</span>
              <span class="dis-price">1500 ks</span>
            </div>
            <div class="color">green</div>
            <div class="size">32</div>
          </div>
          <i class="fa-solid fa-circle-xmark" id="cross" @click="close"></i>
        </div>
        <div class="specification">
          <div class="selectColor" @click="selectpro">
            <div class="title">Selected Color</div>
            <div class="spec-image">
              <img class="show-image" src="../../assets/showlaptop.jpg"/>
              <img class="show-image" src="../../assets/images/category.jpg"/>
              <img class="show-image" src="../../assets/showlaptop.jpg"/>
            </div>
          </div>
          <div class="site-chat">
            <div class="title">Size :&nbsp;&nbsp;
              <span class="name">32</span>
              <span class="name">62</span>
              <span class="name">77</span>
            </div>
          </div>
          <div class="addQty">
            <span class="pull-left">Quality :</span>&nbsp;&nbsp;&nbsp;
            <div class="pull-right">
              <div class="input-main fl clearfix">
                <button @click="reduceRice">-</button>
                <input type="text" class v-model="rice" @blur.prevent="minRice" />
                <button class="rightB" @click="plusRcie">+</button>
              </div>
            </div>
          </div>
        </div>
        <div class="pro-footer">
          <div class="buy-now">Buy Now</div>
          <div class="add-cart">Add To Cart</div>
        </div>
       </div>
    </mt-popup>
    </div>
</template>

<script>
  import { Popup } from 'mint-ui';
    export default {
      name: "product",
      data() {
        return {
          currentImgSlideIndex:0,
          images: [
            { 
              "pic_url":require('@/mobile/assets/showlaptop.jpg')
            },

            {  
              "pic_url":require('@/mobile/assets/images/category.jpg')
            },

            { 
              "pic_url":require('@/mobile/assets/showlaptop.jpg')
            },
        ],
        imgNo:require('@/mobile/assets/xinxin.png'),
        imgYes:require('@/mobile/assets/starrecom.png'),
        rice: 1,
        popupVisible:false,
        };
      },
      components: {

      },
      methods:{
        imgSlideChange(index){
          this.currentImgSlideIndex = index;
        },
        goLastPage() {
          this.$router.go(-1);
        },
        reduceRice() {
          if (this.rice <= 1) return;
          this.rice = (this.rice - 1);
        },
        plusRcie() {
          this.rice = (Number(this.rice) + 1);
        },
        selectpro(){
          this.popupVisible=true;
        },
        close(){
          this.popupVisible=false;
        },
        gotoquestion(){
          this.$router.push({
            path:"/question"
          })
        }
      }
    };
</script>
<style lang="less">
  .mint-swipe {
    height: 7.75rem;
    .mint-swipe-items-wrap {
      div {
        width: 100%;
        height: 7.75rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .headerimg{
    width: 0.5rem;
    position: absolute;
    height: 0.5rem;
    left: 0.2rem;
    z-index: 100;
    top: 0.2rem;
  }
  .slide-count-indicator{
    position:absolute;
    z-index: 10;
    bottom:25px;
    background:rgba(0, 0, 0, 0.2);
    color:white;
    right:0;
    padding:5px 10px;
    border-radius: 50px 0px 0px 50px;
  }
  .describe {
    padding: 0.2rem;
    position: relative;
    background-color: #f1f1f1;
    .description-fn{
      font-size: 0.28rem;
      color: #000;
      line-height: 0.5rem;
    }
    .price {
      padding-top: 0.2rem;
      .new {
        color: #000;
        font-size: 0.26rem;
        padding-left: 0.2rem;
        s {
          font-size: 0.24rem;
        }
      }
      .fav{
        float: right;
        width: 0.6rem;
      }
    }
    .rating{
      padding: .15rem 0;
      img{
        width: 0.3rem;
        height: 0.3rem;
        margin-right: 0.05rem;
      }
    }
    .shop-name{
      font-size: .26rem;
      color: #000;
      span{
        font-size: .26rem;
        color: #0d7199;
        font-weight:bold;
      }
    }
  }
  .specification{
    background-color: #fff;
  }
  .selectColor{
    background-color: #fff;
    padding: .2rem;
    .title{
      font-size: .26rem;
      color:#000;
      .name{
        font-size: .26rem;
        color:#000;
      }
      #btn-right {
        position: absolute;
        right: 0.2rem;
        font-size: .3rem; 
        color: #999;      
      }
    }
    .spec-image{
      padding: .2rem .2rem 0 .2rem;
      .show-image{
        width: 1rem;
        height: 1rem;
        border: 0.05rem solid #f1f1f1;
        margin-right:.05rem;
      }
    }
  }
  .site-chat{
    background-color: #fff;
    padding: 0.5rem 0.2rem;
    border-bottom: 0.04rem solid #f1f1f1;
    .title{
      font-size: .26rem;
      color:#000;
      .name{
        font-size: .26rem;
        color:#000;
        background-color: #f1f1f1;
        padding: .2rem;
        margin-right: 0.05rem;
      }
    }
  }
  .addQty {
    height: 1rem;
    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 0 .2rem;
    justify-content: space-between;
    .pull-left {
      font-size: 0.26rem;
      color: #000;
    }

    .pull-right {
      .stock {
        font-size: 0.24rem;
        color: #aeadad;
      }

      .input-main {
        height: 0.79rem;
        border-radius: 5px;
        overflow: hidden;
        line-height: 0.79rem;
        display: flex;
        align-items: center;

        button {
          width: 0.7rem;
          border: none;
          font-size: 0.4rem;
          line-height: 0.6rem;
          outline: none;
          height: 80%;
          background: #f1f1f1;
          color: #8b8b8b;
        }
        button:nth-child(1) {
          margin-right: 0.2rem;
        }

        .rightB {
          margin-left: 0.2rem;
        }

        input {
          width: 1.45rem;
          height: 80%;
          border: 1px solid #f1f1f1;
          text-align: center;
          font-size: 0.3rem;
          color: #000;
          padding-left: 0.1rem;
        }
      }
    }
  }
  .comment-display{
    margin-top: .1rem;
    .for_comment {
        padding: 0 0.5rem 0 0.2rem;
        min-height: 0.8rem;
        line-height: 0.8rem;
        font-size: 0.3rem;
        color: #777;
        position: relative;
        background: #fff;
        .coupon_title {
          font-size: .26rem;
          color: #777;
        }
        .coupon_number {
          float:right;
          padding-right: .05rem; 
          font-size: .26rem;
        }
        #btn-right {
          position: absolute;
          right: 0.2rem;
          top: .26rem;
          font-size: .3rem;  
          color: #999;     
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
    .list-wrap{
      width:7.1rem;
      padding:0 .2rem;
      height:3rem;
      background:#fff;
      margin-bottom:.1rem;
      margin-top: -0.01rem;
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
              right: .2rem;
              position: absolute;
              img{
                  width: 23/100rem;
              }
          }
          .list-purTimer{
            font-size:.21rem;
            color:#999;
            margin: 0.05rem 0 0 .2rem;
          }
      }
      .list-img-main{
          height:1rem;
          width: 18%;
          display: flex;
          img{
              width:1rem;
              height:1rem;
              margin-right:.2rem;
              transform: scale(1);           
              transition: all ease 0.5s;    
          }
          img.active {
              transform: scale(5);         
              position: absolute;           
              z-index: 100;
              margin-left: 3rem;
          }
      }
    }
}
.Question{
  margin-top: .1rem;
  background-color: #fff;
  padding-bottom: 0.2rem;
    .fortitle {
        padding: 0 0.5rem 0 0.2rem;
        min-height: 0.8rem;
        line-height: 0.8rem;
        font-size: 0.3rem;
        color: #777;
        position: relative;
        background: #fff;
        .title {
          font-size: .26rem;
          color: #777;
        }
        .more {
          float:right;
          padding-right: .05rem; 
          font-size: .26rem;
        }
        #btn-right {
          position: absolute;
          right: 0.2rem;
          top: .26rem;
          font-size: .3rem;  
          color: #999;     
        }
    }
    .all-qa{
      .write-q{
        display: flex;
        padding: 0.2rem;
        #qicon{
          font-size: .3rem;
          color:#0d7199;
          line-height: .5rem;
          .text{
            color: #fff;
            position: absolute;
            font-size: .2rem;
            margin: -0.01rem 0 0 -0.24rem;
          }
        }
        .ques{
          margin-left: .2rem;
          .wq{
            font-size: .26rem;
          }
          .show-detail{
            .name{
              font-size: .24rem;
              color:#777;
            }
            .date{
              font-size: .22rem;
              color: #777;
              margin-left: .1rem;
            }
          }
        }
      }
      .write-a{
        display: flex;
        padding: 0.2rem;
        #qicon{
          font-size: .3rem;
          color:#ff6700;
          line-height:.5rem;
          .text{
            color: #fff;
            position: absolute;
            font-size: .2rem;
            margin: -0.025rem 0 0 -0.22rem;
          }
        }
        .ques{
          margin-left: .2rem;
          .wq{
            font-size: .26rem;
          }
          .show-detail{
            .name{
              font-size: .24rem;
              color:#777;
            }
            .date{
              font-size: .22rem;
              color: #777;
              margin-left: .1rem;
            }
          }
        }
      }
    }
    .btn-next{
      font-size: .26rem;
      text-align: center;
      border: 0.01rem solid #ff6700;
      width: 2rem;
      height: 0.5rem;
      line-height: .45rem;
      margin: 0.1rem auto 0 auto;
      color: #ff6700;
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
        padding: .3rem 0.2rem 0.2rem 0.2rem;
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
            margin: 0rem 0 0 2.87rem;
            position: absolute;
            .percent{
              font-size: .24rem;
              color: #fff;
              z-index: 10;
              padding:.1rem;
              background: #0d7199;
              border-bottom-left-radius: 0.5rem;
              border-top-left-radius: 0.5rem;
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
  .pro-footer{
    width: 100%;
    height: 1rem;
    display: flex;
    position: fixed;
    bottom: 0;
    .buy-now{
      width: 50%;
      font-size: .26rem;
      text-align: center;
      background: -webkit-linear-gradient(left,#ff9f36,#ff6700);
      line-height: 1rem;
      color:#fff;
    }
    .add-cart{
      width: 50%;
      font-size: .26rem;
      text-align: center;
      background: linear-gradient(to right,#25a5d8 0,#442e93 100%);
      line-height: 1rem;
      color:#fff;
    }
  }
  .blance{
    height: 1.05rem;
    background-color: #f1f1f1;
  }
  .popbox{
    width: 7.5rem;
    height: 10rem;
    .show-product{
      display: flex;
      padding: 0.3rem 0 0.3rem 0.3rem;
      border-bottom: 0.04rem solid #f1f1f1;
      img{
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 0.1rem;
      }
      .detail{
        margin-left: .2rem;
        .price-box{
          line-height: .5rem;
          .price{
            font-size: .3rem;
            color: #ff6700;
          }
          .dis-price{
            font-size: .26rem;
            color: #999;
            margin-left: .2rem;
            text-decoration: line-through;
          }
        }
        .color{
          font-size: .26rem;
          line-height: .5rem;
        }
        .size{
          font-size: .26rem;
          line-height: .5rem;
        }
      }
      #cross{
        font-size: .45rem;
        color: #777;
        right: 0.2rem;
        position: absolute;
      }
    }
  }
  .related{
    background-color: #fff;
    margin-top: 0.1rem;
    padding-bottom: 0.3rem;
    .title{
      font-size: .26rem;
      padding: 0.3rem .2rem .1rem .2rem;
      color: #0d7199;
      font-weight: bold;
    }
    .all-card{
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      flex-wrap: wrap;
      padding: 0 .2rem;
      .card{
        width: 2.2rem;
        margin: 0.2rem 0.2rem 0 0;
        .image{
          width: 2.2rem;
          height: 2.2rem;
        }
        .price{
          font-size: .26rem;
          text-align: center;
          color: #ff6700;
        }
      }
      .card:nth-child(3){
        margin-right: 0;
      }
      .card:nth-child(6){
        margin-right: 0;
      }
    }
  }
</style>