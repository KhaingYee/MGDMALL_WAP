<template>
  <div class="footer2017">
    <div class="seat"></div>
    <div class="btn-main clearfix">
      <div class="colAP fl">
        <div class="collect" @click="serviceBtn">
          <img :src="service" alt />
        </div>
        <div class="collect" @click="toBuycar">
          <img :src="Buycar" alt />
        </div>
        <div class="collect" @click="col">
          <img v-if="type==2" :src="imgsYes" alt />
          <img :src="imgsNo" alt v-else />
        </div>
      </div>
      <!-- v-if="assemPro && assemPro.name == 'AP'"  -->
      <div style="display: flex; ">
          <div class="join fr leftBtn" @click="originalPrice">
              <span v-if="assemPro.priceMember" class="span-css">{{assemPro.priceMember}}</span>
              <span v-else class="span-css">0.00</span>
              <span>原价购</span>
          </div><!-- normal buy -->
          <div class="imm fr rightBtn" @click="groupBbuying">
              <span v-if="assemPro.activityPrice" class="span-css">{{assemPro.activityPrice}}</span>
              <span v-else class="span-css">0.00</span>
              <span>我要开团</span>
          </div><!-- group Buy -->
      </div>
      <!-- <div v-else class="select-guige fr" @click="hide">选择规格</div> -->
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import qs from "qs";
export default {
  name: "footBtn",
  data() {
    return {
      type: 0,
      imgs: require("@/assets/images/footer_star.png"),
      imgsNo: require("@/assets/images/sc.png"),
      imgsYes: require("@/assets/images/star_angle.png"),
      service: require("@/assets/images/service_er.png"),
      Buycar: require("@/assets/images/car_shop.png"),
      dataCol: [],
      choice: true,
      specification: '',
      specification_id: '',
      specific: '',
      specId: '',
      IId: '',
      specific_id: '',
      option: '',

    };
  },
  props: {
    data: "",
    message: "",
    nb: "",
    Number: "",
    money: "",
    storeid: "",
    productData: "",
    assemPro: "",
    selspec: "",
    promId: ""
  },
  created() {
    this.post();
  },
  methods: {
    originalPrice(){
        if(this.selspec == '') {
            Toast({
                message: '请选择规格',
                duration: 800
            });
            return;
        }
        this.$router.push({
            name:'order',
            params:{good_id: this.data.goods.id, num: this.Number}
        })
        this.$store.state.confirmorderstatus = 1//0普通商品的确认订单 1 活动商品确认订单
    },
    groupBbuying(){
        if(this.selspec == '') {
            Toast({
                message: '请选择规格',
                duration: 800
            });
            return;
        }
        // 48, 414, 1
        this.$router.push({
            name:'activityOrder',
            params:{
                // id: this.data.goods.id,
                // promId: this.promId,
                id: this.promId,
                goods_num: this.Number,
                // goodId: this.data.goods.id,
                goods_id: this.data.goods.id,
                stat: 1
            }
        })
    },
    serviceBtn() {
      // easemobim.bind({configId:this.$constant.serviceConfig});
      this.axios
        .post(
          this.$httpConfig.customerservice1,
          qs.stringify({
            store_id: this.storeid,
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
    toBuycar() {
      this.$router.push({ name: "Cart" });
    },
    col() {
      //收藏
      if (this.type == 2) {
        this.imgs = this.imgsYes;
        this.type = 1;
      } else {
        this.imgs = this.imgsNo;
        this.type = 2;
      }
      this.axios
        .post(
          this.$httpConfig.addCollection,
          qs.stringify({
            goods_id: this.$route.params.id,
            type: this.type,
            token: sessionStorage.getItem("data_token")
          })
        )
        .then(res => {
          if (res.data.status == 10001) {
            this.$router.push("/LogIn");
          } else {
            Toast({
              message: res.data.message,
              position: "bottom",
              duration: 800
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //进来就算是收藏状态
    hide() {
      this.$store.state.const_join = true;
      // this.opt = !this.opt;

    },
    buy() {
      sessionStorage.removeItem("invoiceGroup");
      sessionStorage.removeItem("invoiceInit");
      this.$store.state.invoice = false;
      this.$store.state.rise = null;
      this.$store.state.type = null;
      this.$store.state.content = null;
      this.$store.state.invoice_id = "";
      if (this.$store.state.commodity_data.stock <= 0) {
        Toast({
          message: "库存不足",
          duration: 1000
        });
        return;
      }
      // let goods_id = "";
      // if(this.productData.id) {
      //   goods_id = this.productData.id;
      // }
      // else if (this.$store.state.goods_id) {
      //   goods_id = this.$store.state.goods_id;
      // } else {
      //   goods_id = this.$route.params.id;
      // }
      let goods_id = "";
      // if(this.addClassClick == true) {
      //
      // }
      if (this.$store.state.goods_id) {
        goods_id = this.$store.state.goods_id;
      }
      //  else {
      //   goods_id = this.$route.params.id;
      // }
      else if(this.productData.id) {
        goods_id = this.productData.id;
      }
      this.$router.push({
        name: "order",
        params: {
          good_id: goods_id,
          num: this.$store.state.commodity_val,
          id: 2
        }
      });
    },
    post() {
      this.axios({
        url: this.$httpConfig.myCollection,
        method: "get",
        params: {
          token: sessionStorage.getItem("data_token")
        }
      })
        .then(res => {
          if (res.data.data == "") {
            this.isCol = false;
            this.type = 2;
          } else {
            this.dataCol = res.data.data.goods;
            let cols = this.dataCol;
            for (var i in cols) {
              if (cols[i].goods_id == this.$route.params.id) {
                this.isCol = true;
                this.type = 1;
                break;
              } else {
                this.isCol = false;
                this.type = 2;
              }
            }
          }
          this.load = false;
          this.load_wrap = false;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.footer2017 {
  width: 100%;
  height: 1rem;
  .choose {
    width: 100%;
    height: 2rem;
    /*z-index: 100;*/
  }
  .ex {
    font-size: 0.22rem;
    color: #999;
    padding-left: 0.2rem;
    line-height: 0.9rem;
    img {
      width: 40/100rem;
      height: 40/100rem;
    }
  }
  .seat {
    width: 100%;
    height: 100%;
    background: #f1f1f1;
  }
  .btn-main {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    text-align: center;
    background: #fff;
    em {
      // width:.5rem;
      // height:.5rem;
      // position:absolute;
      // top:.1rem;
      // left:50%;
      margin-right: 0.25rem;
      font-style: normal;
      color: #d21923;
      font-size: 0.5rem;
    }
    .colAP {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      width: 40%;
      color: #333;
      font-size: 0.22rem;
      .collect {
        width: 33.3%;
        background: #fafafa;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #e6e6e6;
        box-sizing: border-box;
        img {
          width: 50/100rem;
          height: 50/100rem;
          margin-bottom: 5/100rem;
        }
        span {
          display: block;
        }
        em {
          width: 0.5rem;
          height: 0.5rem;
          position: absolute;
          top: 0.1rem;
          left: 50%;
          margin-left: -0.25rem;
          font-style: normal;
          color: #d21923;
          font-size: 0.5rem;
        }
      }
    }
    .join {
      width: 2.5rem;
      height: 100%;
      background: #d02629;
      color: #fff;
      font-size: 0.32rem;
      line-height: 0.5rem;
    }
    .leftBtn {
      background: #FFE4D0;
      color: #E5511D;
    }
    .rightBtn {
      background: #F40;
    }
    .imm {
      width: 2.5rem;
      height: 100%;
      background: #d02629;
      color: #fff;
      font-size: 0.32rem;
      line-height: 0.5rem;
    }
    .span-css {
      display: block;
    }
    .select-guige {
      width: 40%;
      height: 1rem;
      background: #d02629;
      font-size: 0.28rem;
      color: #ffffff;
      line-height: 1rem;
    }
  }
}
</style>

<style lang="less" scoped>
.mint-toast {
  .mint-toast-text {
    font-size: 0.3rem;
  }
}
</style>
