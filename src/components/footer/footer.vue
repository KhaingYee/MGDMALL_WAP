<template>
  <div class="foot2017">
    <ul class="footer clearfix">
      <li
        class="fl"
        :class="{isSelected:index == parseInt(isClass)}"
        v-for="(item,index) in tabbar.font"
        :key="item.id"
        @click="tab(index)"
      >
        <div class="icon">
          <img :src="tabbar.Icon[index]" />
        </div>
        <div class="icon active">
          <img :src="tabbar.isIcon[index]" />
        </div>
        <div class="font">{{item}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "page-footer",
  data() {
    return {
      isClass: sessionStorage.getItem("router_index"),
      tabbar: {
        isIcon: [
          require("@/assets/images/HomeColor.png"),
          require("@/assets/images/CategoriesColor.png"),
          require("@/assets/images/MessageColor.png"),
          require("@/assets/images/CartColor.png"),
          require("@/assets/images/AccountColor.png")
        ],
        Icon: [
          require("@/assets/images/HomeBW.png"),
          require("@/assets/images/CategoriesBW.png"),
          require("@/assets/images/MessageBW.png"),
          require("@/assets/images/CartBW.png"),
          require("@/assets/images/AccountBW.png")
        ],
        font: ["Home", "Categories","Message", "Cart", "Account"]
      }
    };
  },
  methods: {
    tab: function(index) {
      switch (index) {
        case 0:
          this.$router.push({
            path: "/home"
          });
          break;
        case 1:
          this.$router.push({
            path: "/category"
          });
          break;
        case 2:
          this.$router.push({
              path: "/messenger"
          });
          break; 
        case 3:
          this.$router.push({
            path: "/cart"
          });
          break;
        case 4:
          this.$router.push({
            path: "/personal"
          });
          break;
      }
    }
  },
  watch: {
    $route(to, from) {
      this.isClass = sessionStorage.getItem("router_index");
    }
  },
  created() {}
};
</script>
<style lang="less" scoped>
.foot2017 {
  width: 100%;
  height: 1rem;
  .footer {
    width: 100%;
    height: 1rem;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;

    z-index: 2;
    background: #fff;
    box-shadow: border-box;
    z-index: 99999999;
    li {
      width: 20%;
      text-align: center;

      .font {
        font-size: 0.24rem;
        color: #000;
        padding-bottom: 5/100rem;
        display: inline-block;
      }
      .icon {
        height: 0.5rem;
        position: relative;
        display: block;
        border-top: 3px solid #313133;
        img {
          position: absolute;
          left: 0;
          top: 6;
          bottom: 0;
          right: 0;
          margin: auto;
        }
      }
      .icon.active {
        display: none;
        border-top: 3px solid #0d7199;
      }
    }
    li.isSelected {
      .font {
        color: #0d7199;
        font-weight:bold;
      }
      .icon.active {
        display: block;
      }

      .icon {
        display: none;
      }
    }
    li:nth-child(1) {
      img {
        width: 0.5rem;
        height: 0.5rem;
      }
    }
    li:nth-child(2) {
      img {
        width: 0.5rem;
        height: 0.5rem;
      }
    }
    li:nth-child(3) {
      img {
        width: 0.5rem;
        height: 0.5rem;
      }
    }
    li:nth-child(4) {
      img {
        width: 0.5rem;
        height: 0.5rem;
      }
    }
    li:nth-child(5) {
      img {
        width: 0.5rem;
        height: 0.5rem;
      }
    }
  }
}
</style>