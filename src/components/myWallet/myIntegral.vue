<template>
    <div ref="integral_list">
        <div v-title :data-title="title">{{title}}</div>
        <div class="header-bj">
            <integ-header class="header-bg" :text="title" :rule="rule" @addShow="addShow"></integ-header>
            <div class="myInte-banner text-center">
                <!-- <p class="title">可用积分</p> -->
                <div class="monthPicker">
                    <month-picker-input lang="zh" :default-month="currentMonth+1" :default-year="currentYear" @change="showDate"></month-picker-input>
                    <img src="../../assets/down-arrow.png" class="Dimg"/>
                </div>
                <p class="number" v-if="integralChange.income">{{integralChange.income}}<span>&nbsp;&nbsp;积分</span></p>
                <p class="number" v-else>0<span>&nbsp;&nbsp;积分</span></p>
                <div class="golink" @click="gotolink('/IntegralMall')">兑换商品</div>
                <!-- <p class="link" @click="tolink('/intOrder')">我的兑换</p> -->
            </div>
        </div>
        <div class="allintegral" v-if="integralChange">
            <div class="income" :class="{active: sortHead == 0}" @click="proSort(0)">
                <div class="plu" v-if="integralChange.incomeMonth">+{{integralChange.incomeMonth}}</div>
                <div class="plu" v-else>+0</div>
                <div class="txt">积分获取</div>
            </div>
            <div class="exepen" :class="{active: sortHead == 1}" @click="proSort(1)">
                <div class="min" v-if="integralChange.spendingMonth">-{{integralChange.spendingMonth}}</div>
                 <div class="min" v-else>-0</div>
                <div class="text">积分支出</div>
            </div>
        </div>
        <div class="black" v-if="integralPro"></div>
        <!-- <integ-shares :rule="ruleCon" @addShow="addHide"></integ-shares> -->
        <dl class="accDetails" v-if="integralPro">
            <dt></dt>
            <dd class="clearfix" v-for="item in integralPro" :key="item.id">
                <div class="fl text">
                    <h2>{{item.remarks}}</h2>
                    <p class="time">{{item.trading_time}}</p>
                </div>
                <div class="fr status">{{item.changes_integral}}</div>
            </dd>
        </dl>
        <div class="noRec" v-if="Chtype == 1 && integralChange.count == 0">本月占时没有积分获取哦~</div>
        <div class="noRec" v-if="Chtype == 0 && integralChange.count == 0">本月占时没有积分支出哦~</div>
        <!-- <integ-btn :text="btnText" :to="'/IntegralMall'"></integ-btn> -->
        <to-top></to-top>

        <div class="load-wrap" v-show="load_wrap" @touchmove.prevent>
            <mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner>
        </div>
    </div>
</template>
<script>
import { MonthPickerInput } from 'vue-month-picker'
import integHeader from '@/components/page/children/header.vue';
import integShares from '@/components/Widget/rule.vue';
import integBtn from '@/components/Widget/fixedBtn.vue';
import toTop from '@/components/page/toTop.vue';
import qs from 'qs';
export default {
    name: 'myIntegral',
    data() {
        return {
            title: '我的积分',
            rule: true,
            ruleCon: false,
            accDetails: {
                title: '积分明细',
                content: []
            },
            btnText: '马上兑换商品',
            data: '',
            load_wrap: true,
            isactive: '',
            slide_switch: false, //避免多次下拉
            load_show: true, //滚动动画
            roll_switch: true, //触发下拉加载开关
            no_data: false, //第一次没数据时的样式
            sliding_no_data: false, //下拉没数据时的样式
            page: 1,
            integralChange:null,
            currentMonth: "",
            currentYear: "",
            sortHead:0,
            Chtype:1,
            integralPro:[],
            Dateinte:'',
        }
    },
    components: {
        integHeader,
        integShares,
        integBtn,
        toTop,
        MonthPickerInput
    },
    created() {
        this.goodsList();
        // this.userIntegral();
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
    },
    mounted() {
        let _this = this;
        window.addEventListener('scroll', function () {
            if (!_this.$refs.integral_list) return;
            if (document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {
                //如果第一次请求没数据或数据没达到每页个数就不会再请求数据
                if (_this.roll_switch == false) {
                    return;
                }
                if (_this.slide_switch == true) {
                    _this.slide_switch = false;
                    _this.page++;
                    _this.goodsList();
                }
            }
        })
    },
    methods: {
        showDate(data){
        this.Dateinte = data.selectedYear + '-' + data.monthIndex;
        this.integralPro = [];
        this.goodsList();
        },
        addShow() {
            this.ruleCon = true;
        },
        addHide() {
            this.ruleCon = false;
        },
        tolink() {
            this.$router.push('/intOrder')
        },
        gotolink() {
            this.$router.push('/IntegralMall')
        },
        updated() {
            var that = this;
            setTimeout(function () {
                that.load_wrap = false;
            }, 1000);
        },
        proSort(index){
            this.sortHead = index;
            if(this.sortHead==0){
                this.Chtype = 1;
                this.integralPro = [];
                this.goodsList();
                
            }else if(this.sortHead==1){
                this.Chtype = 0;
                this.integralPro = [];
                this.goodsList();
                
            }
        },
        goodsList() {
            this.axios.post(this.$httpConfig.integralLog, qs.stringify({
                page: this.page,
                date:this.Dateinte,
                type:this.Chtype,
                token: sessionStorage.getItem("data_token")
            })).then((res) => {
                this.integralChange = res.data.data;
                this.stateHandling(res.data.status, res.data.data.records);
                this.load_wrap = false;
            }).catch((err) => {
                console.log(err);
            });
        },
        returnOperation(data) {
            if (data.length < 10 && this.page == 1) { //第一次请求成功如果数据没达到每页页数就禁止下拉
                this.load_show = false; //动画隐藏
                this.roll_switch = false; //禁止下拉加载
            }
            for (let index = 0; index < data.length; index++) {
                this.integralPro.push(data[index]);
            }
            this.slide_switch = true;
        },
        //请求后返回不同状态时的处理
        stateHandling(status, data) {
            this.sw = true;
            if (status == 10001) {
                this.$router.push('/LogIn');
            } else if (status == 1) { //成功后的处理
                this.returnOperation(data);
            } else if (status == 0 && this.page == 1) { //第一次请求失败时
                this.no_data = true; //无数据时的样式
                this.load_show = false; //动画隐藏
                this.roll_switch = false; //禁止下拉加载
            } else { //第二次或更多次无数据时
                this.sliding_no_data = true; //无数据时的样式
                this.load_show = false; //动画隐藏
                this.roll_switch = false; //禁止下拉加载
            }
        },
        // userIntegral() {
        //     this.axios.post(
        //         this.$httpConfig.userIntegral, qs.stringify({
        //             token: sessionStorage.getItem("data_token")
        //         })).then((res) => {
        //             if (res.data.status == 10001) {
        //                 this.$router.push('/LogIn');
        //             } else if (res.data.status == 0) {
        //                 return;
        //             } else {
        //                 this.data = res.data.data;
        //             }
        //         }).catch((err) => {
        //             console.log(err);
        //         });
        // }

    },
}
</script>
<style>
.month-picker__container {
  position: relative !important;
  top: .2rem !important;
  width: 100% !important;
}
.month-picker-input-container {
  position: relative;
  width: 2.5rem !important;
  min-width: 0;
}
.month-picker-input {
    padding: .07rem .2rem !important;
    font-size: .26rem !important;
    border-radius: .1rem;
    outline: none;
    border: 1px solid rgba(0, 0, 0, 0.15);
    -webkit-transition: all 350ms cubic-bezier(0.165, 0.84, 0.44, 1);
    transition: all 350ms cubic-bezier(0.165, 0.84, 0.44, 1);
    width: 2.1rem;
}
.month-picker__year button {
  background-color: #f4f4f4;
  position: absolute;
  width: .3rem;
  height: .6rem;
  font-size: .4rem;
  border-radius: 5px;
  outline: none;
  top: 0.1rem;
  border: 1px solid #e8e8e8;
  z-index: 2;
  color: #686868;
  line-height: .2rem;
}
.month-picker__year p {
  width: 100%;
  font-weight: 600;
  letter-spacing: 1px;
  font-size: .5rem;
  margin: 0;
}
.month-picker__month {
  padding: 0.5rem 0.25rem !important;
}
.month-picker {
    width: 5rem;
    border-radius: 0;
    position: relative !important;
}
.month-picker__year {
  padding: 0.2rem;
  background-color: #fcfcfc;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  width: 4.6rem;
  position: relative !important;
}
</style>
<style lang="less">
.header-bj {
  background: url(../../assets/images/integral_bg.png) no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 3.62rem;
  position: fixed;
  top: 0;
  .header-bg {
    .header {
    //   background: none !important;
    }
  }
  .myInte-banner {
    width: 100%;
    height: 2.62rem;
    background: url("../../assets/jfbg.png");
    .monthPicker{
        padding: .1rem;
        z-index: 1;
        position: absolute;
        display: flex;
    }
    .Dimg{
        width: .2rem;
        height: .2rem;
        margin: 0.15rem 0rem 0 -0.53rem;
        z-index: 10;
    }
    .title {
      font-size: 0.24rem;
      color: #80060c;
      padding-top: 0.7rem;
    }
    .number {
      font-size: 0.64rem;
      color: #fff;
      padding: 0.1rem 0;
      position:relative;
      top:.7rem;
    }
    .link {
      font-size: 0.3rem;
      color: #ffffa0;
    }
    .golink {
        font-size: 0.3rem;
        color: #fff;
        background: #df7a31;
        border: .01rem solid #df7a31;
        width: 1.5rem;
        text-align: center;
        padding: 0rem .06rem;
        left: 2.93rem;
        right: 2.85rem;
        position: relative;
        border-radius: .5rem;
        line-height: .47rem;
        height: .5rem;
        top: .8rem;
    }
  }
}
.allintegral{
    background: #fff;
    margin-top: 3.6rem;
    // top: 3.65rem;
    // position: fixed;
    // padding: .2rem;
    .income{
        background: #fff;
        float: left;
        text-align: center;
        padding: .2rem 0;
        // width: 3.55rem;
         width: 3.75rem;
        .plu{
            font-size: .28rem;
        }
        .txt{
            font-size: .26rem;
            height: .4rem;
            line-height: .4rem;
        }
    }
    .exepen{
        padding: .2rem 0;
        background: #fff;
        float: right;
        text-align: center;
        width: 3.75rem;
        .min{
            font-size: .28rem;
        }
        .text{
            font-size: .26rem;  
            height: .4rem;
            line-height: .4rem; 
        }
    }
    .active {
        color: #d02629;
    }
}
.black{
    background: #f1f1f1;
    padding: .1rem;
    margin: .2rem;
}
.noRec{
    font-size: .3rem;
    color: #999;
    text-align: center;
    margin-top: 3rem;
}
.accDetails {
    // margin-top: 4rem;
  dt {
    padding: 0 0.2rem;
    height: 0.9rem;
    line-height: 0.9rem;
    font-size: 0.32rem;
    color: #333;
  }
  dd {
    background: #fff;
    padding: 0.2rem;
    border-bottom: 1px solid #dfdfdf;
    height: 0.8rem;
    .text {
      h2 {
        font-size: 0.28rem;
        color: #333;
      }
      .time {
        padding-top: 0.2rem;
        font-size: 0.28rem;
        color: #999;
      }
    }
    .status {
      font-size: 0.32rem;
      color: #d0111b;
      line-height: 0.8rem;
    }
    .status.Profit {
      color: #39ab04;
    }
  }
}
</style>