<template lang="html">
    <div class="refreshMoudle" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)" :style="{transform: 'translate3d(0,' + top + 'px, 0)'}">
        <!-- <header class="pull-refresh"> -->
            <slot name="pull-refresh">
                <!-- <div v-if="dropDownState==1 || dropDownState==2" class="down-tip">
                    <img class="down-tip-img" :class="{rotate:dropDownState == 1}" src="../../../assets/totop-1.png">
                    <span v-if="dropDownState==1" class="down-tip-text">{{dropDownStateText.downTxt}}</span>
                    <span v-if="dropDownState==1" class="down-tip-text"></span>
                    <span v-if="dropDownState==2" class="down-tip-text">{{dropDownStateText.upTxt}}</span>
                </div> -->
            </slot>
        <!-- </header> -->
        <slot></slot>
    </div>
</template>

<script>
import $ from "jquery";
export default {
  props: {
    onRefresh: {
      type: Function,
      required: false
    }
  },
  mounted() {},
  data() {
    return {
      defaultOffset: 10, // 默认高度, 相应的修改.releshMoudle的margin-top和.down-tip, .up-tip, .refresh-tip的height
      top: 0,
      scrollIsToTop: 0,
      startY: 0,
      isDropDown: true, // 是否下拉
      dropDownState: 1, // 显示1:下拉刷新, 2:松开刷新, 3:刷新中……
      dropDownStateText: {
        downTxt: "下拉返回顶部",
        upTxt: "释放返回顶部",
        refreshTxt: "刷新中..."
      }
    };
  },
  created() {},
  methods: {
    touchStart(e) {
      this.startY = e.targetTouches[0].pageY;
    },
    touchMove(e) {
      this.scrollIsToTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop; // safari 获取scrollTop用window.pageYOffset
      if (e.targetTouches[0].pageY > this.startY) {
        // 下拉
        this.isDropDown = true;
        if (this.scrollIsToTop == 0) {
          // 拉动的距离
          let diff =
            e.targetTouches[0].pageY - this.startY - this.scrollIsToTop;
          this.top =
            Math.pow(diff, 0.8) +
            (this.dropDownState === 3 ? this.defaultOffset : 0);
          if (this.top >= this.defaultOffset) {
            this.dropDownState = 2;
            e.preventDefault();
          } else {
            this.dropDownState = 1;
            if (e.cancelable) {
              e.preventDefault();
            }
          }
        }
      } else {
        this.isDropDown = false;
        this.dropDownState = 1;
      }
    },
    touchEnd(e) {
      if (this.isDropDown) {
        if (this.top >= this.defaultOffset) {
          // do refresh
          this.refresh();
        } else {
          // cancel refresh
          this.isDropDown = false;
          this.dropDownState = 1;
          this.top = 0;
        }
      }
    },
    refresh() {
      this.top = 0;
      this.isDropDown = false;
      this.dropDownState = 1;
      this.top = 0;
      this.onRefresh(this.refreshDone);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.refreshMoudle {
  width: 100%;
  background: #fff;
  -webkit-overflow-scrolling: touch; /* ios5+ */
}
.pull-refresh {
  width: 100%;
  color: #999;
  transition-duration: 200ms;
  padding-bottom: .6rem;
  /* height: 0.9rem; */
}
.refreshMoudle .down-tip,
.up-tip,
.refresh-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: -.51rem;
}
.rotate {
  transform: rotate(180deg);
}
.refreshMoudle .down-tip-img,
.up-tip-img,
.refresh-tip-img {
  width: 0.8rem;
  height: 0.8rem;
  transition: 0.5s;
  margin-bottom: 0.1rem;
}
</style>
