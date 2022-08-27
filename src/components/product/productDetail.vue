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
        <div class="selectColor">
          <div class="title">Selected Color :<span class="name">&nbsp;Black</span></div>
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
      <div class="comment-display">
        <div class="for_comment">
            <span class="coupon_title">Customer Review&nbsp;&nbsp;(10)</span>
            <span class="coupon_number"> See More</span>
            <span class="btn-right"></span>
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
      <div class="pro-footer">
        <div class="buy-now">Buy Now</div>
        <div class="add-cart">Add To Cart</div>
      </div>
      <div class="blance"></div>
    </div>
</template>
<script>
    export default {
      name: "home",
      data() {
        return {
          currentImgSlideIndex:0,
          images: [
            { 
              "pic_url":require('@/assets/showlaptop.jpg')
            },

            {  
              "pic_url":require('@/assets/images/category.jpg')
            },

            { 
              "pic_url":require('@/assets/showlaptop.jpg')
            },
        ],
        imgNo:require('@/assets/xinxin.png'),
        imgYes:require('@/assets/starrecom.png'),
        rice: 1,
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
    padding: 0.3rem 0.2rem;
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
    margin-top: .08rem;
    .for_comment {
        padding: 0 0.5rem 0 0.2rem;
        min-height: 0.8rem;
        line-height: 0.8rem;
        font-size: 0.3rem;
        color: #777;
        position: relative;
        background: #fff;
        border-top: 1px solid #f1f1f1;
        .coupon_title {
          font-size: .26rem;
          color: #777;
        }
        .coupon_number {
          float:right;
          padding-right: .05rem; 
          font-size: .26rem;
        }
        .btn-right {
          position: absolute;
          right: 0.2rem;
          top: 50%;
          margin-top: -0.15rem;
          width: 0.16rem;
          height: 0.3rem;
          background: url(../../assets/btn-right.png) no-repeat;
          background-size: 100% 100%;
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
</style>