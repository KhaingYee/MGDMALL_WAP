<template>
  <div class="box" v-loading="loading">
    <div v-title data-title="店铺主页">店铺主页</div>
    <div class="headMain">
      <!-- <img :src="URL+storeInfo.store_cover" v-if="storeInfo.store_cover != ''" /> -->
      <img :src="URL+storeInfo.store_cover" v-if="storeInfo.store_cover" />
       <img src="../../assets/shopdefault.jpg" v-else>
      <!-- 顶部头 -->
      <shop-header></shop-header>
      <!-- 店铺信息 -->
      <div class="shopTitle">
        <div>
          <img :src="URL+storeInfo.store_logo" v-show="storeInfo.store_logo" />
          <p class="shop-display">{{storeInfo.shop_name}}</p>
          <el-dropdown v-if="storeInfo.store_grade_name">
            <span class="shop-gradename">{{storeInfo.store_grade_name}}</span>
            <el-dropdown-menu slot="dropdown" v-if="storeInfo.classification">
            <el-dropdown-item>{{storeInfo.classification}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div>
          <p>
            {{shophomedata.storeFans}}
            <br />
            <span>粉丝数</span>
          </p>
          <div @click="attenStoreAjax(0)" class="btn" v-show="atten == 1">已关注</div>
          <div @click="attenStoreAjax(1)" class="btn" v-show="atten == 0">关注</div>
        </div>
      </div>
      <!-- tab切换 -->
      <title-tab :sortData="sortData" v-on:sortCon="sortindex" :tabdata="tabIndex"></title-tab>
      <!-- 全部宝贝的列表排序 -->
      <ul class="babylistSort" v-if="titleData==1">
        <li
          v-for="(item,index) in babyList"
          :key="index"
          @click="proSortTab(index)"
          :class="{active:proSortindex ==index && proSortindex !=1}"
        >
          {{item}}
          <div class="sorts">
            <div :class="{sortActiveTop:proSortindex ==index&& !prosortUpDown}"></div>
            <div :class="{sortActivebtm:proSortindex ==index&& prosortUpDown}"></div>
          </div>
        </li>
      </ul>
    </div>
    <div class="content">
      <!-- 店铺首页 -->
      <div v-if="titleData == 0">
        <!-- 轮播图 -->
        <mt-swipe :auto="4000" v-show="banner.length!=0">
          <mt-swipe-item v-for="(item, index) in banner.slice(0,8)" :key="index">
            <a :href="item.ad_url">
              <img :src="URL+item.adv_content" />
            </a>
          </mt-swipe-item>
        </mt-swipe>
        <!-- 广告部分 -->
        <div class="advertImg" v-if="irregular.left.length!=0 && irregular.right.length!=0">
          <img
            v-if="irregular.left && irregular.left.length > 0"
            :src="URL+irregular.left[0].adv_content"
            @click="imgLeft(irregular)"
          />
          <div class="box" v-if="irregular.right">
            <img
              v-for="(image, index) in irregular.right"
              :key="index"
              :src="URL+image.adv_content"
              :alt="image.adv_title"
              @click="imgRight(image)"
            />
          </div>
        </div>
        <div class="advertList" v-show="buttonImage.length!=0">
          <div class="item" v-for="(img, i) in buttonImage" :key="i">
            <a :href="img.ad_url">
              <img :src="URL+img.adv_content" :alt="img.adv_title" />
            </a>
          </div>
        </div>

        <div class="recommend">
          <img :src="recommendImg" /> 新品上架
        </div>

        <div class="newgood">
          <ul class="newgoodlist">
            <li v-for="(item,index) in shopgood" :key="item.id" @click="enterProduct(item.id)">
              <img :src="URL+item.pic_url" alt="">
              <p>{{item.title}}</p>
              <div class="more">
                <span>￥{{item.price_member}}</span>
              </div>
            </li>
          </ul>
        </div>
        <!-- 推荐商品部分 -->
        <div class="recommend">
          <img :src="recommendImg" />推荐商品
        </div>

        <!-- 店铺首页的热门商品 -->
        <article-list :temList="0" :hotList="recommondGoods"></article-list>
      </div>
      <div v-if="titleData == 1" class="contentBabyList">
        <article-list :temList="1" :goodsAlls="goodsAlls"></article-list>
      </div>
      <div v-if="titleData == 2">
        <article-list :temList="2" :data="data"></article-list>
      </div>
    </div>
    <!-- 底部内容 -->
    <ul class="btm">
      <li @click="details">店铺详情</li>
      <li @click="alertHotList">
        <img :src="hotlist" alt />热门分类
        <div class="alert" ref="boxMessage" v-show="$store.state.shop_class_show">
          <p class="rotate" v-show="rotate_show"></p>
          <p
            @click="alertclick(item.id)"
            v-for="(item,index) in alertData"
            :key="index"
          >{{item.class_name}}</p>
        </div>
        <img
          class="jiantou"
          v-show="$store.state.shop_class_show"
          src="../../assets/arrow-down-b.png"
        />
      </li>
      <li @click="goToCustomerService">
        <img :src="Smiley" alt />联系卖家
      </li>
    </ul>
    <!-- tan框 -->
  </div>
</template>
<script>
import shopHeader from "./child/shopHeader.vue"; // 引入请求头
import titleTab from "./child/tabHeader.vue"; //切换
import articleList from "./child/article.vue"; //物品列表
import { Toast } from "mint-ui";
import qs from "qs";
export default {
  data() {
    return {
      rotate_show: true,
      recommendImg: require("@/assets/images/tj.png"),
      Smiley: require("@/assets/images/lxmj.png"),
      hotlist: require("@/assets/images/hotlist.png"),
      sortData: ["店铺首页", "全部宝贝", "店铺动态"],
      babyList: ["按销量", "价格", "按人气"],
      titleData: 0,
      proSortindex: -1,
      prosortUpDown: false,
      tabIndex: this.$route.params.index,

      atten: 0,
      // 临时数据
      alertData: [],
      shopgood:[],
      shophomedata: "",
      storeInfo: "",
      style: "",
      data: [],
      banner: [],
      irregular: {
        left: [],
        right: []
      },
      buttonImage: [],
      goodsAlls: "",
      page: sessionStorage.getItem("page"),
      loading: false,
      recommondGoods: []
    };
  },
  created() {
    this.sortindex(parseInt(this.$route.params.index));
    this.getBanner();
    this.getIrregular();
  },
  mounted() {
    this.$store.state.shop_class_show = false;
    this.getRecommondGoods();
    this.newGoods();
    this.getButton();
    this.storeHomeAjax();
    // this.storeInfo = res.data.data.storeInfo;
  },
  methods: {
    goToCustomerService() {
      // easemobim.bind({configId:this.$constant.serviceConfig});
      this.axios
        .post(
          this.$httpConfig.customerservice1,
          qs.stringify({
            store_id: this.$route.params.id,
            token: sessionStorage.getItem("data_token")
          })
        )
        .then(res => {
          if (res.data.status === 1) {
            // window.location.href = "http://chat.shopsn.cn/mobile.php?sender_id="+res.data.data.sender_id +"&receiver_id=" + res.data.data.receiver_id
            window.location.href = res.data.data;
          } else {
            Toast({
              message: res.data.message,
              duration: 800
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    enterProduct(item) {
      this.$router.push({
        name: "product",
        params: {
          id: item,
          status: 1
        }
      });
    },
    imgLeft(val) {
      let link_address = val.left[0].ad_url;
      window.location = link_address;
    },
    imgRight(arr) {
      window.location = arr.ad_url;
    },
    details() {
      this.storeDynamicAjax();
      this.$router.push({
        name: "shopDetails",
        params: {
          id: this.$route.params.id
        }
      });
    },
    // 全部宝贝的排序
    proSortTab(index) {
      this.proSortindex = index;

      if (this.goodsAlls.data.length == 10) {
        //分页情况
        if (index == 0) {
          if ((this.prosortUpDown = this.prosortUpDown)) {
            this.axios
              .post(
                this.$httpConfig.storeGoodsAll,
                qs.stringify({
                  id: parseFloat(this.$route.params.id),
                  sort: 2,
                  page: this.page,
                  token: sessionStorage.getItem("data_token")
                })
              )
              .then(res => {
                this.goodsAlls = res.data.data;
                document.body.scrollTop = 0;
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            this.axios
              .post(
                this.$httpConfig.storeGoodsAll,
                qs.stringify({
                  id: parseFloat(this.$route.params.id),
                  sort: 1,
                  page: this.page,
                  token: sessionStorage.getItem("data_token")
                })
              )
              .then(res => {
                this.goodsAlls = res.data.data;
                document.body.scrollTop = 0;
              })
              .catch(err => {
                console.log(err);
              });
          }
          this.prosortUpDown = !this.prosortUpDown;
        }
        if (index == 1) {
          if ((this.prosortUpDown = this.prosortUpDown)) {
            this.axios
              .post(
                this.$httpConfig.storeGoodsAll,
                qs.stringify({
                  id: parseFloat(this.$route.params.id),
                  sort: 4,
                  page: this.page,
                  token: sessionStorage.getItem("data_token")
                })
              )
              .then(res => {
                this.goodsAlls = res.data.data;
                document.body.scrollTop = 0;
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            this.axios
              .post(
                this.$httpConfig.storeGoodsAll,
                qs.stringify({
                  id: parseFloat(this.$route.params.id),
                  sort: 3,
                  page: this.page,
                  token: sessionStorage.getItem("data_token")
                })
              )
              .then(res => {
                this.goodsAlls = res.data.data;
                document.body.scrollTop = 0;
              })
              .catch(err => {
                console.log(err);
              });
          }
          this.prosortUpDown = !this.prosortUpDown;
        }
        if (index == 2) {
          if ((this.prosortUpDown = this.prosortUpDown)) {
            this.axios
              .post(
                this.$httpConfig.storeGoodsAll,
                qs.stringify({
                  id: parseFloat(this.$route.params.id),
                  sort: 6,
                  page: this.page,
                  token: sessionStorage.getItem("data_token")
                })
              )
              .then(res => {
                this.goodsAlls = res.data.data;
                document.body.scrollTop = 0;
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            this.axios
              .post(
                this.$httpConfig.storeGoodsAll,
                qs.stringify({
                  id: parseFloat(this.$route.params.id),
                  sort: 5,
                  page: this.page,
                  token: sessionStorage.getItem("data_token")
                })
              )
              .then(res => {
                this.goodsAlls = res.data.data;
                document.body.scrollTop = 0;
              })
              .catch(err => {
                console.log(err);
              });
          }
          this.prosortUpDown = !this.prosortUpDown;
        }
      } else {
        if (index == 0) {
          if ((this.prosortUpDown = this.prosortUpDown)) {
            this.axios
              .post(
                this.$httpConfig.storeGoodsAll,
                qs.stringify({
                  id: parseFloat(this.$route.params.id),
                  sort: 2,
                  page: 1,
                  token: sessionStorage.getItem("data_token")
                })
              )
              .then(res => {
                this.goodsAlls = res.data.data;
                document.body.scrollTop = 0;
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            this.axios
              .post(
                this.$httpConfig.storeGoodsAll,
                qs.stringify({
                  id: parseFloat(this.$route.params.id),
                  sort: 1,
                  page: 1,
                  token: sessionStorage.getItem("data_token")
                })
              )
              .then(res => {
                this.goodsAlls = res.data.data;
                document.body.scrollTop = 0;
              })
              .catch(err => {
                console.log(err);
              });
          }
          this.prosortUpDown = !this.prosortUpDown;
        }
        if (index == 1) {
          if ((this.prosortUpDown = this.prosortUpDown)) {
            this.axios
              .post(
                this.$httpConfig.storeGoodsAll,
                qs.stringify({
                  id: parseFloat(this.$route.params.id),
                  sort: 4,
                  page: 1,
                  token: sessionStorage.getItem("data_token")
                })
              )
              .then(res => {
                this.goodsAlls = res.data.data;
                document.body.scrollTop = 0;
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            this.axios
              .post(
                this.$httpConfig.storeGoodsAll,
                qs.stringify({
                  id: parseFloat(this.$route.params.id),
                  sort: 3,
                  page: 1,
                  token: sessionStorage.getItem("data_token")
                })
              )
              .then(res => {
                this.goodsAlls = res.data.data;
                document.body.scrollTop = 0;
              })
              .catch(err => {
                console.log(err);
              });
          }
          this.prosortUpDown = !this.prosortUpDown;
        }
        if (index == 2) {
          if ((this.prosortUpDown = this.prosortUpDown)) {
            this.axios
              .post(
                this.$httpConfig.storeGoodsAll,
                qs.stringify({
                  id: parseFloat(this.$route.params.id),
                  sort: 6,
                  page: 1,
                  token: sessionStorage.getItem("data_token")
                })
              )
              .then(res => {
                this.goodsAlls = res.data.data;
                document.body.scrollTop = 0;
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            this.axios
              .post(
                this.$httpConfig.storeGoodsAll,
                qs.stringify({
                  id: parseFloat(this.$route.params.id),
                  sort: 5,
                  page: 1,
                  token: sessionStorage.getItem("data_token")
                })
              )
              .then(res => {
                this.goodsAlls = res.data.data;
                document.body.scrollTop = 0;
              })
              .catch(err => {
                console.log(err);
              });
          }
          this.prosortUpDown = !this.prosortUpDown;
        }
      }
    },
    //获取店铺推荐商品
    getRecommondGoods() {
      this.axios
        .post(
          this.$httpConfig.getRecommondGoods,
          qs.stringify({
            store_id: this.$route.params.id,
            token: sessionStorage.getItem("data_token")
          })
        )
        .then(res => {
          Toast(res.data.message);
          if (res.data.status == 0) {
            return;
          }
          this.recommondGoods = res.data.data;
        });
    },
    //全部宝贝请求
    goodsAll(class_id) {
      this.axios
        .post(
          this.$httpConfig.storeGoodsAll,
          qs.stringify({
            id: parseFloat(this.$route.params.id),
            class_id: class_id,
            token: sessionStorage.getItem("data_token")
          })
        )
        .then(res => {
          this.goodsAlls = res.data.data;
          if (!res.data.status) {
            Toast(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 店铺首页请求
    storeHomeAjax() {
      this.axios({
        method: "post",
        url: this.$httpConfig.storeHome,
        data: qs.stringify({
          id: parseFloat(this.$route.params.id),
          token: sessionStorage.getItem("data_token")
        })
      }).then(res => {
        this.shophomedata = res.data.data;
        this.storeInfo = res.data.data.storeInfo;
        this.atten = this.shophomedata.if_atten;
      });
    },
    // 店铺动态请求
    storeDynamicAjax() {
      this.axios({
        method: "post",
        url: this.$httpConfig.storeDynamic,
        data: qs.stringify({
          id: parseFloat(this.$route.params.id),
          token: sessionStorage.getItem("data_token")
        })
      }).then(res => {
        this.data = res.data.data;
      });
    },
    // 店铺热门分类请求
    storeHotClassAjax() {
      this.axios({
        method: "get",
        url: this.$httpConfig.storeClass,
        params: {
          store_id: parseFloat(this.$route.params.id),
          token: sessionStorage.getItem("data_token")
        }
      }).then(res => {
        if (res.data.status) {
          this.alertData = res.data.data;
          this.rotate_show = false;
        } else {
          Toast(res.data.message);
          this.$store.state.shop_class_show = false;
        }
      });
    },

    // 关注店铺请求
    attenStoreAjax(index) {
      let urls = "";
      if (index == 1) {
        urls = this.$httpConfig.attenStore;
      } else {
        urls = this.$httpConfig.cancelAttenStore;
      }
      this.axios({
        method: "post",
        url: urls,
        data: qs.stringify({
          store_id: this.shophomedata.store_id,
          token: sessionStorage.getItem("data_token")
        })
      }).then(res => {
        if (res.data.status == 10001) {
          this.$router.push("/LogIn");
        }
        this.atten = index;
        console.log(res);
      });
    },
    // tab切换
    sortindex(data, id) {
      this.titleData = data;
      switch (data) {
        case 1:
          this.goodsAll(id);
          break;
        case 2:
          this.storeDynamicAjax();
          break;
      }
    },
    // 热门分类显示隐藏
    alertHotList() {
      if (this.$store.state.shop_class_show === false) {
        this.$store.state.shop_class_show = true;
        this.storeHotClassAjax();
      } else {
        this.$store.state.shop_class_show = false;
      }
    },
    //选择热门分类去列表
    alertclick(id) {
      this.titleData = 1;
      this.sortindex(1, id);
    },
    //获取banner
    getBanner() {
      this.axios.post(
          this.$httpConfig.storeBanner, qs.stringify({
            store_id: this.$route.params.id,
            token: sessionStorage.getItem("data_token")
          })
        )
        .then(res => {
          if (res.data.status == 0) {
            Toast(res.data.message);
            return;
          }
          this.banner = res.data.data;
        });
    },
    newGoods(){
      this.axios.post(this.$httpConfig.newGoods, qs.stringify({
                store_id:this.$route.params.id,
                token: sessionStorage.getItem("data_token")
              })).then(res => {
                this.shopgood = res.data.data;
              })
              .catch(err => {
                console.log(err);
              })
    },
    //获取不规则图片
    getIrregular() {
      this.axios
        .post(
          this.$httpConfig.storeIrregular,
          qs.stringify({
            store_id: this.$route.params.id,
            token: sessionStorage.getItem("data_token")
          })
        )
        .then(res => {
          if (res.data.status == 0) {
            Toast(res.data.message);
            return;
          }
          this.irregular = res.data.data;
        });
    },
    //最下面广告
    getButton() {
      this.axios
        .post(
          this.$httpConfig.buttonAdv,
          qs.stringify({
            store_id: this.$route.params.id,
            token: sessionStorage.getItem("data_token")
          })
        )
        .then(res => {
          if (res.data.status == 0) {
            Toast(res.data.message);
            return;
          }
          this.buttonImage = res.data.data;
        });
    }
  },
  components: {
    shopHeader,
    titleTab,
    articleList,
    Toast
  }
};
</script>
<style>
.el-popper[x-placement^=bottom] .popper__arrow {
  border-bottom-color: red !important;
  top: -6px !important;
}
.el-popper .popper__arrow {
  border-width: 6px;
  filter: drop-shadow(0 0.04rem .24rem rgba(0,0,0,.03));   
}
</style>
<style lang="less" scoped>
.el-dropdown{
   
}
.el-dropdown-menu {
    /* width: 230px !important; */
    position: absolute !important;
    margin: .1rem 0 0 0 !important;
    background-color: #FFF;
    border: .02rem solid #de2d35;
    border-radius: .08rem;
    -webkit-box-shadow: 0 0.04rem .24rem 0 rgba(0,0,0,.1);
    box-shadow: 0 0.04rem .24rem 0 rgba(0,0,0,.1);
}
.el-dropdown-menu:hover .row{
    color: #444 !important;
}
.el-dropdown-menu__item {
  line-height: .2rem !important;
  font-size: .24rem !important;
  color:rgb(101, 101, 101) !important;
}
  .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
    color:rgb(101, 101, 101) !important;
    background-color: #ffffff !important;
  }

.el-popper .popper__arrow {
  border-width: 6px;
  filter: drop-shadow(0 0.04rem .24rem rgba(0,0,0,.03));   
}

.el-popper[x-placement^=bottom] .popper__arrow {
  border-bottom-color: red !important;
  top: -6px !important;
}
.el-popper .popper__arrow, .el-popper .popper__arrow:after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;  
}
</style>
<style lang="less" scoped>
.box {
  margin-bottom: 1.1rem;
}

/*// 整个头部分*/
.headMain {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 199;
  // background:url(../../assets/shopping.jpg);
  background-size: cover;
}

/*// 主体*/
.content {
  margin-top: 348/100rem;
}

.contentBabyList {
  margin-top: 430/100rem;
}

/*// 轮播图样式*/
.mint-swipe {
  width: 100%;
  height: 3.28rem;
  img {
    width: 100%;
    height: 100%;
  }
  .mint-swipe-indicators {
    .mint-swipe-indicator {
      width: 20px;
      height: 20px;
    }
  }
}

/*// 广告图片*/
.advertImg {
  width: 100%;
  overflow: hidden;
  height: 5rem;
  margin-bottom: 0.1rem;
  img {
    width: 2.68rem;
    height: 5rem;
    float: left;
    border-right: 0.01rem solid #cecece;
  }
  .box {
    float: right;
    height: 5rem;
    width: 4.8rem;
    img {
      width: 100%;
      height: 2.5rem;
      border-bottom: 0.03rem solid #cecece;
    }
  }
}

/*// 广告列表*/
.advertList {
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  .item {
    width: 3.7rem;
    height: 1.5rem;
    float: left;
    border: 1/100rem solid #e0e0e0;
    img {
      width: 3.7rem;
      height: 1.5rem;
    }
  }
}

/*// 推荐商品*/
.recommend {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90/100rem;
  font-size: 28/100rem;
  color: #d02629;
  img {
    width: 0.3rem;
    height: 0.3rem;
    margin-right: 15/100rem;
  }
}

.newgoodlist {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  .bttom {
    width: 100%;
    display: flex;
    margin: 0.3rem 0 0 0;
    justify-content: center;
  }
  li {
    margin-top: 2%;
    background-color: #fff;
    width: 49%;
    float: left;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    img {
      width: 100%;
      height: 3.5rem;
      align-self: center;
      border-bottom: 0.5px solid #f2f1f2;
    }
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0.15rem 0.25rem;
      font-size: 28/100rem;
    }
    .more {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 0.5rem;
      span {
        padding: 0 0.25rem;
        font-size: 0.28rem;
        color: #d12f2d;
      }
    }
  }
}

/*// 底部*/
.btm {
  position: fixed;
  bottom: 0;
  background-color: #fff;
  height: 90/100rem;
  width: 7.5rem;
  border-top: 0.01rem solid #e6e6e8;
  li {
    float: left;
    width: 33%;
    height: 50/100rem;
    border-right: 0.01rem solid #e7e7e7;
    text-align: center;
    line-height: 0.5rem;
    font-size: 28/100rem;
    margin: 0.2rem 0;
    img {
      margin-right: 0.15rem;
      margin-top: 0.05rem;
      width: 0.4rem;
      height: 0.4rem;
    }
    &:nth-child(2) {
      position: relative;
      img {
        margin-top: 0.03rem;
        width: 27/100rem;
      }
    }
    &:last-child {
      border: 0;
    }
  }
  .jiantou {
    position: absolute;
    top: -0.6rem;
    left: 50%;
    z-index: 9999;
  }
  /*// 热门弹框*/
  .alert {
    z-index: 999;
    position: absolute;
    background-color: #fff;
    left: 0.2rem;
    width: 1.8rem;
    padding: 0 0.2rem;
    bottom: 90/100rem;
    height: 3rem;
    overflow: auto;
    border-radius: 10/100rem;
    border: 1/100rem solid #e6e6e8;
    p {
      height: 0.6rem;
      text-align: center;
      line-height: 0.6rem;
      border-bottom: 1/100rem solid #e6e6e8;
      &:last-child {
        border: 0;
      }
    }
    .rotate {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      margin-top: 1rem;
      border: 1px solid gray !important;
      border-bottom-color: transparent !important;
    }
    .rotate {
      display: inline-block;
      -webkit-animation: rotate 0.6s linear infinite;
      animation: rotate 0.6s linear infinite;
    }
    @-webkit-keyframes rotate {
      0% {
        -webkit-transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
      }
    }
    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
}

/*// 全部宝贝的列表排序*/
.babylistSort {
  background-color: #fff;
  height: 80/100rem;
  border-bottom: 1/100rem solid #cbcbcb;
  display: flex;
  
  display: -ms-flexbox;
  display: -webkit-flex;
  li {
    display: flex;
    display: -ms-flexbox;
    display: -webkit-flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    color: #636363;
    font-size: 28/100rem;
    .sorts {
      margin-left: 0.1rem;
      div {
        width: 0;
        height: 0;
        border-top: 0.09rem solid transparent;
        border-left: 0.09rem solid transparent;
        border-right: 0.09rem solid transparent;
        border-bottom: 0.09rem solid transparent;
        &:first-child {
          margin-bottom: 0.04rem;
          border-bottom: 0.09rem solid #757577;
        }
        &:last-child {
          border-top: 0.09rem solid #757577;
        }
        &:first-child.sortActiveTop {
          border-bottom-color: #d02629;
        }
        &:last-child.sortActivebtm {
          border-top-color: #d02629;
        }
      }
    }
  }
  .active {
    color: #d02629;
  }
}
/*// 标题*/
.shopTitle {
  color: #fff;
  overflow: hidden;
  padding: 20/100rem;
  height: 125/100rem;
  // background-color: #003d34;
  display: flex;
  display: -ms-flexbox;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  z-index: 999;
  margin-top: -3.1rem;
  div {
    display: flex;
    display: -ms-flexbox;
    display: -webkit-flex;
    align-items: center;
  }
  img {
    border: none;
    width: 80/100rem;
    height: 80/100rem;
    margin-right: 20/100rem;
  }
  .shop-display{
    font-size: 28/100rem;
    padding: 0 .15rem 0 0;
  }
  .shop-gradename{
    font-size: .25rem;
    background: #de2d35;
    color: white;
    border-radius: .05rem;
    padding: .05rem .1rem;
    text-align: center;
  }
  p {
    font-size: 28/100rem;
  }
  span {
    font-size: 20/100rem;
  }
  .btn {
    margin-left: 15/100rem;
    width: 120/100rem;
    height: 50/100rem;
    border-radius: 50/100rem;
    display: flex;
    display: -ms-flexbox;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    align-items: center;
    background-color: #d02629;
  }
}
</style>