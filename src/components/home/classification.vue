<template>
  <div ref="wrap" class="classif-wrap" style="height:100%">
    <div v-title data-title="分类">分类</div>
    <cation-header ref="hd"></cation-header>
    <!-- <div class="content-wrap clearfix" ref="content"> -->
      <div class="content-wrap clearfix">
      <ul class="nav-left fl">
        <li
          v-for="(item,index) in data"
          :key="item.id"
          :class="{active:status ==item.id  }"
          @click="tab(item,index)"
        ><p>{{item.class_name}}</p></li>
      </ul>
      <div class="content fr">
        <div class="tab-content-wrap">
          <!-- <div class="item-one" v-for="item in condata" :key="item.id"> -->
            <div class="item-one">
            <el-collapse accordion>
              <el-collapse-item :title="item.class_name" v-for="item in condata" :key="item.id">
                <div @click="link(item)">
                  <!-- <h2 class="title">
                    <span>{{item.class_name}}</span>
                    <span>
                      查看更多
                      <i class="crumbs-arrow">&gt;</i>
                    </span>
                  </h2> -->
                </div>
                <img v-lazy="URL+item.pic_url" v-if="item.pic_url" @click="tolink(item)" />
                <ul class="con clearfix" v-if="item.three">
                  <li class="fl" v-for="con in item.three" :key="con.id" @click="tolink(con)">
                    <img v-lazy="URL + con.pic_url" />
                    <p class="text1-hidden">{{con.class_name}}</p>
                  </li>
                </ul>
              </el-collapse-item>
            </el-collapse>
            <!-- <div @click="link(item)">
              <h2 class="title">
                <span>{{item.class_name}}</span>
                <span>
                  查看更多
                  <i class="crumbs-arrow">&gt;</i>
                </span>
              </h2>
            </div> -->
            <!-- <img v-lazy="URL+item.pic_url" v-if="item.pic_url" @click="tolink(item)" />
            <ul class="con clearfix" v-if="item.three">
              <li class="fl" v-for="con in item.three" :key="con.id" @click="tolink(con)">
                <img v-lazy="URL + con.pic_url" />
                <p class="text1-hidden">{{con.class_name}}</p>
              </li>
            </ul> -->
          </div>
        </div>
      </div>
    </div>
    <Shopsn></Shopsn>
    <div class="footer" ref="nav"></div>
    <div class="load" v-show="load" @touchmove.prevent>
      <mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner>
    </div>
    <div class="load-wrap" v-show="$store.state.class_load" @touchmove.prevent>
      <mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner>
    </div>
  </div>
</template>
<script>
import cationHeader from "./children/header";
import Shopsn from "@/components/page/Shopsn.vue";
export default {
  name: "classification",
  data() {
    return {
      scrollWatch: true,
      // logoImg: require("@/assets/logo.png"),
      lcassif: {
        status: [true, false, false, false]
      },
      data: "",
      condata: "",
      status: "",
      load_wrap: true,
      load: false
    };
  },
  components: {
    cationHeader,
    Shopsn
  },
  methods: {
    tab(item, index) {
      if (item.id != this.status) {
        this.load = true;
        this.status = item.id;
        this.succ();
      }
    },
    succ() {
      this.axios({
        url: this.$httpConfig.getOtherClass,
        method: "post",
        params: {
          fid: this.status,
          token: sessionStorage.getItem("data_token")
        }
      })
        .then(res => {
          if (!res) {
            this.$router.push({
              name: "comList",
              params: {
                status: this.status
              }
            });
          }
          if (res.data.status == 1) {
            this.condata = res.data.data;
            this.load = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    link(item) {
      if (!item.pic_url) {
        this.$router.push({
          name: "comList",
          params: {
            status: item.id
          },
          query: {
            type: 2
          }
        });
      }
    },
    tolink(item) {
      this.$router.push({
        name: "comList",
        params: {
          status: item.id
        }
      });
    }
  },
  mounted() {
    document.body.scrollTop = 0;
    const hdH = this.$refs.hd.$el.offsetHeight;
    const navH = this.$refs.nav.offsetHeight;
    const clHeight = document.body.clientHeight;
    // this.$refs.content.style.height = `${clHeight - hdH - navH}px`;
    this.axios({
      url: this.$httpConfig.getFirstId,
      method: "post",
      params: {
        token: sessionStorage.getItem("data_token")
      }
    })
      .then(res => {
        this.data = res.data.data;
        this.status = res.data.data[0].id;
        this.succ();
      })
      .catch(err => {
        console.log(err);
      });
  },
  updated() {
    var that = this;
    setTimeout(function() {
      that.$store.state.class_load = false;
    }, 1000);
  },
  destroyed() {
    this.scrollWatch = false;
  }
};
</script>
<style lang="less">

.classif-wrap {
  background: #fff;
  height:auto;
  min-height: 100% !important;
  .mint-tab-item {
    display: inline-block;
    flex: none;
    .mint-tab-item-label {
      font-size: 0.26rem;
      line-height: 0.7rem;
    }
  }
}
.el-collapse-item__header {
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    height: rem;
    line-height: .95rem;
    background-color: #fff;
    color: #333;
    cursor: pointer;
    border-bottom: 1px solid #EBEEF5;
    font-size: .26rem;
    font-weight: 500;
    -webkit-transition: border-bottom-color .3s;
    transition: border-bottom-color .3s;
    outline: 0;
    padding-left: .2rem;
}
.el-collapse-item__wrap {
    will-change: height;
    background-color: #fff;
    overflow: hidden;
    box-sizing: border-box;
    border-bottom: 1px solid #EBEEF5;
}
.el-collapse-item__content {
    padding-bottom: 0;
    font-size: 13px;
    color: #303133;
    line-height: 1.769230769230769;
}
</style>
<style lang="less" scoped>
.footer {
  height: 1rem;
  border-top: 3px solid #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: -1;
}
.content-wrap {
  background: #f2f2f2;
  overflow: hidden;
  width: 100%;
  // height: 100% !important;
  // height: auto;
  min-height: 100% !important;
  .nav-left {
    width: 1.8rem;
    // height: auto;
    min-height: 100vh !important;
    overflow: auto;
    display: block;
    background: #fff;
    li {
      // width: 100%;
      // height: 1rem;
      // line-height: 1rem;
      // text-align: center;
      overflow: hidden;
      font-size: 0.24rem;
      color: #333;
      border-bottom: 0.08px solid #f2f2f2;
      padding: .3rem.2rem;
    }
    li.active {
      border-left: 3px solid #d02629;
      box-sizing: border-box;
      background: #f2f2f2;
      color: #d02629;
    }
    p {
      display: -webkit-box;
      overflow: hidden;
      white-space: normal !important;
      text-overflow: ellipsis;
      word-wrap: break-word;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: .36rem;
      text-align: center;
    }
  }
  .content {
    overflow: auto;
    width: 5.7rem;
    // height: 100%;
    height: auto;
    background: #f2f2f2;
    overflow: scroll;
    .tab-content-wrap {
      img {
        width: 1.52rem;
        height: 1.52rem;
      }
    }
    .item-one {
      .title {
        height: 0.73rem;
        line-height: 0.73rem;
        font-size: 0.3rem;
        color: #666;
        text-indent: 0.16rem;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        .crumbs-arrow {
          float: right;
          margin-right: 0.2rem;
          margin-left: -0.1rem;
          font-family: "Helvetica Neue", "Hiragino Sans GB", SimSun, serif;
          font-style: normal;
          font-size: 0.4rem;
        }
        span {
          font-size: 0.3rem;
        }
      }
      .con {
        li {
          width: 1.68rem;
          height: 2.44rem;
          text-align: center;
          margin-left: 0.16rem;
          background: #fff;
          box-sizing: border-box;
          margin-bottom: 0.12rem;
          img {
            width: 1.6rem;
            height: 1.6rem;
            border-radius: .15rem;
            background: #f2f2f2;
          }
          p {
            font-size: 0.24rem;
            color: #797979;
            height: 0.64rem;
            line-height: 0.64rem;
            padding: 0 0.2rem;
          }
        }
      }
    }
    .item-tab {
      margin-top: 0.1rem;
      .mint-navbar {
        border-bottom: 1px solid #f2f2f2;
      }
      .mint-tab-item {
        padding: 0;
        color: #666;
        border-color: #f9781e;
        margin: 0;
        height: 0.7rem;
        line-height: 0.7rem;
        margin-left: 0.4rem;
      }
      .mint-tab-item.is-selected {
        color: #f9781e;
      }
    }
    .ification-wrap {
      .title {
        height: 1rem;
        line-height: 1rem;
        font-size: 0.26rem;
        color: #333;
        font-weight: bold;
      }
      .tab-content {
        li {
          margin-left: 0.3rem;
          margin-right: 0.1rem;
          text-align: center;
          img {
            width: 1.24rem;
            height: 1.24rem;
            border-radius: 100%;
            box-sizing: border-box;
          }
          p {
            font-size: 0.24rem;
            color: #797979;
            line-height: 0.7rem;
            width: 1.24rem;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>