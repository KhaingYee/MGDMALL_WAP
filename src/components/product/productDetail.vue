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
        font-size: 0.25rem;
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
</style>