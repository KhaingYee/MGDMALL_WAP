<template>
  <div class="markupBuy">
    <div class="title" @click="toDetail">
      加价购
      <div class="xiala">
        更多
        <img src="../../../assets/activity/btn-right.png" />
      </div>
    </div>
    <div class="list">
      <div
        @click="toDetail"
        class="product"
        v-for="(item,index) in markupBug"
        :key="index"
        v-if="index<3 && item.goods_id != id"
      >
        <div>
          <img src="../../../assets/qq.png" alt />
        </div>
        <div class="message">{{item.title}}</div>
        <div class="price">
          <span>￥{{item.discount}}</span>
          <span>￥{{item.price_market}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "markupBuy",
  data() {
    return {
      id: this.$route.params.id
    };
  },
  props: {
    markupBug: {
      type: Array
    }
  },
  methods: {
    toDetail() {
      this.$router.push({
        name: "markupDetail",
        params: {
          id: this.$route.params.id
        }
      });
    }
  },
  mounted() {
  }
};
</script>

<style lang="less" scoped>
.markupBuy {
  background: #fff;
  padding-bottom: 0.2rem;
  .list {
    display: flex;

    .product {
      width: 30%;
      margin-left: 0.2rem;

      img {
        display: block;
        width: 100%;
        border-radius: 0.1rem;
      }

      .message {
        display: -webkit-box;
        overflow: hidden;
        width: 100%;
        color: #666666;
        line-height: 0.35rem;
        margin: 0.1rem 0;
        height: 0.7rem;
        white-space: normal !important;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .price {
        span {
          font-size: 0.33rem;
        }

        span:nth-child(1) {
          color: #a22d2b;
        }

        span:nth-child(2) {
          color: #888888;
          font-size: 0.22rem;
          text-decoration: line-through;
        }
      }
    }
  }

  .title {
    padding: 0.2rem;
    font-size: 0.28rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .xiala {
      color: #999999;

      img {
        display: inline-block;
        width: 0.14rem;
        height: 0.24rem;
        vertical-align: middle;
        margin-left: 0.05rem;
      }
    }
  }
}
</style>