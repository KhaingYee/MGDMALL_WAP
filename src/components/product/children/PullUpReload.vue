<template lang="html">
    <div id="loadMoudle" class="loadMoudle" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)" :style="{transform: 'translate3d(0,' + top + 'px, 0)'}">
        <slot></slot>
        <!-- <div class="load-more">
            <slot name="load-more">
                <div v-if="pullUpState==1 || pullUpState==2" class="down-tip">
                    <span v-if="pullUpState==1" class="down-tip-text">{{pullUpStateText.downTxt}}</span>
                    <span v-if="pullUpState==2" class="down-tip-text">{{pullUpStateText.upTxt}}</span>
                    <img class="down-tip-img" :class="{rotate:pullUpState == 1}" src="../../../assets/totop-1.png">
                </div>
            </slot>
        </div> -->
    </div>
</template>

<script>
import $ from "jquery";
export default {
  props: {
    parentPullUpState: {
      default: 0
    },
    onInfiniteLoad: {
      type: Function,
      require: false
    }
  },
  data() {
    return {
      top: 0,
      startY: 0,
      isDropDown: true, // 是否上拉
      defaultOffset: 10,
      pullUpState: 1, // 1:上拉加载更多, 2:加载中……, 3:我是有底线的
      isLoading: false, // 是否正在加载
      pullUpStateText: {
        downTxt: "上拉查看更多详情",
        upTxt: "释放查看更多详情",
        refreshTxt: "刷新中..."
      }
    };
  },
  methods: {
    touchStart(e) {
      this.startY = e.targetTouches[0].pageY;
    },
    getClientHeight() {
      var clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight =
          document.body.clientHeight < document.documentElement.clientHeight
            ? document.body.clientHeight
            : document.documentElement.clientHeight;
      } else {
        clientHeight =
          document.body.clientHeight > document.documentElement.clientHeight
            ? document.body.clientHeight
            : document.documentElement.clientHeight;
      }
      return clientHeight;
    },
    touchMove(e) {
      if (this.startY > e.targetTouches[0].pageY) {
        let innerHeight = document.querySelector(".loadMoudle").clientHeight;
        this.isDropDown = true;
        // 变量scrollTop是滚动条滚动时，距离顶部的距离
        let scrollTop =
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop;
        // 变量scrollHeight是滚动条的总高度
        let scrollHeight = window.innerHeight || this.getClientHeight();
        // 滚动条到底部的条件
        if (scrollTop + scrollHeight >= innerHeight) {
          //计算往下拉动的距离
          let diff = this.startY - e.targetTouches[0].pageY;
          this.top = -(
            Math.pow(diff, 0.8) +
            (this.pullUpState === 3 ? this.defaultOffset : 0)
          );
          if (-this.top >= this.defaultOffset) {
            this.pullUpState = 2;
            e.preventDefault();
          } else {
            this.pullUpState = 1;
            if (e.cancelable) {
              e.preventDefault();
            }
          }
        }
      } else {
        this.isDropDown = false;
        this.pullUpState = 1;
      }
    },
    touchEnd(e) {
      if (this.isDropDown) {
        if (-this.top >= this.defaultOffset) {
          this.pullUpState = 1;
          this.refresh();
        } else {
          this.isDropDown = false;
          this.pullUpState = 1;
          this.top = 0;
        }
      }
    },
    refresh() {
      this.top = 0;
      this.onInfiniteLoad(this.infiniteLoadDone);
    },

    // infiniteLoad () {
    //     this.pullUpState = 2
    //     this.isLoading = true
    //     setTimeout(() => {
    //         this.onInfiniteLoad(this.infiniteLoadDone)
    //     }, 800)
    // },
    infiniteLoadDone() {
      this.pullUpState = 0;
      this.isLoading = false;
    }
  },
  watch: {
    parentPullUpState(curVal, oldVal) {
      this.pullUpState = curVal;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.load-more {
  width: 100%;
  color: #c0c0c0;
  padding-top: 1rem;
  height: 2rem;
}

.down-tip,
.refresh-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.moreData-tip,
.loadingMoreData-tip,
.noMoreData-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1rem;
}
.loadMoudle {
  width: 100%;
  background: #fff;
  -webkit-overflow-scrolling: touch;
}
.loadMoudle .icon-loading {
  display: inline-flex;
  width: 35px;
  height: 35px;
  background-size: cover;
  margin-right: 5px;
  animation: rotating 2s linear infinite;
}

.rotate {
  transform: rotate(-180deg);
}
.down-tip-img,
.up-tip-img,
.refresh-tip-img {
  width: 0.8rem;
  height: 0.8rem;
  transition: 0.5s;
  margin-bottom: 0.1rem;
}
.connectingLine {
  display: inline-flex;
  width: 150px;
  height: 2px;
  background: #ddd;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
