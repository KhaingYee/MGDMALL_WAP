<template>
  <div class="share" v-show="state">
    <div class="contain">
      <div class="options">
        <div class="option" @click="share(1)">
          <img src="../../../assets/wx.jpg" alt />
          微信好友
        </div>
        <div class="option" @click="share(0)">
          <img src="../../../assets/wx.jpg" alt />
          微信朋友圈
        </div>
        <!--<div class="option">-->
        <!--<img src="../../../assets/blog@2x.png" alt="">-->
        <!--新浪微博-->
        <!--</div>-->
        <!--<div class="option" @click="share(2)">-->
        <!--<img src="../../../assets/qqh@2x.png" alt="">-->
        <!--QQ好友-->
        <!--</div>-->
        <!--<div class="option" @click="share(3)">-->
        <!--<img src="../../../assets/qqk@2x.png" alt="">-->
        <!--QQ空间-->
        <!--</div>-->
      </div>
      <div class="cancel">
        <img @click="close" src="../../../assets/close.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "share",
  props: {
    state: {
      type: Boolean
    }
  },
  methods: {
    close() {
      this.$emit("change");
    },
    share(to) {
      var that = this;
      var img = that.URL + that.$store.state.commodity_data.images[0].pic_url;
      jsBridge.share({
        //0 微信朋友圈
        //1 微信好友
        //2 QQ好友
        //3 QQ空间
        to: to,
        title: that.$store.state.commodity_data.goods.title,
        link: location.href,
        imgUrl: img,
        desc: that.$store.state.commodity_data.goods.description
      });
    }
  }
};
</script>

<style lang="less" scoped>
.share {
  position: fixed;
  left: 0;
  width: 100%;
  height: 100%;
  bottom: 0;
  background: rgba(22, 22, 21, 0.95);
  z-index: 312;

  .options {
    display: flex;
    flex-wrap: wrap;
    .option {
      width: 33.3%;
      height: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 0.3rem;
      flex-direction: column;
    }
    img {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      margin-bottom: 0.1rem;
    }
  }
  .cancel {
    text-align: center;
    margin-top: 0.6rem;
    img {
      display: inline-block;
      width: 0.6rem;
      height: 0.6rem;
    }
  }

  .contain {
    position: absolute;
    width: 100%;
    height: 5.2rem;
    left: 0;
    bottom: 1rem;
  }
}
</style>