<template>
  <div class="foot2017">
    <ul class="footer clearfix">
      <li
        class="fl"
        :class="{isSelected:0 == parseInt(isClass)}"
        @click="tab(0)"
      >
        <div class="icon">
          <i class="fa-solid fa-house" style="color: #555;" id="iconimg"></i>
        </div>
        <div class="icon active">
          <i class="fa-solid fa-house" style="color: #0d7199;" id="iconimg"></i>
        </div>
        <div class="font">Home</div>
      </li>
      <li
        class="fl"
        :class="{isSelected:1 == parseInt(isClass)}"
        @click="tab(1)"
      >
        <div class="icon">
          <i class="fa-solid fa-list" style="color: #555;" id="iconimg"></i>
        </div>
        <div class="icon active">
          <i class="fa-solid fa-list" style="color: #0d7199;" id="iconimg"></i>
        </div>
        <div class="font">Category</div>
      </li>
      <li
        class="fl"
        :class="{isSelected:2 == parseInt(isClass)}"
        @click="tab(2)"
      >
        <div class="icon">
          <i class="fa-solid fa-cart-shopping" style="color: #555;" id="iconimg"></i>
        </div>
        <div class="icon active">
          <i class="fa-solid fa-cart-shopping" style="color: #0d7199;" id="iconimg"></i>
        </div>
        <div class="font">Cart</div>
      </li>
      <li
        class="fl"
        :class="{isSelected:3 == parseInt(isClass)}"
        @click="tab(3)"
      >
        <div class="icon">
          <i class="fa-solid fa-user" style="color: #555;" id="iconimg"></i>
        </div>
        <div class="icon active">
          <i class="fa-solid fa-user" style="color: #0d7199;" id="iconimg"></i>
        </div>
        <div class="font">Account</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "footer",
  data() {
    return {
      isClass: sessionStorage.getItem("router_index"),
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
            path: "/cart"
          });
          break;
        case 3:
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
      width: 25%;
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
        #iconimg {
          position: absolute;
          left: 0;
          top: 6;
          bottom: 0;
          right: 0;
          margin: auto;
          font-size:.4rem;
        }
      }
      .icon.active {
        display: none;
        border-top: 3px solid @second-color;
      }
    }
    li.isSelected {
      .font {
        color: @second-color;
        font-weight:bold;
      }
      .icon.active {
        display: block;
      }

      .icon {
        display: none;
      }
    }

  }
}
</style>