<template>
  <div>
      <div v-title :data-title="title">{{title}}</div>
      <top-header :text="title"></top-header>
      <header>
            <!-- <div><img :src="titleImg" alt="">和平苑店</div> -->
            <h4>￥{{changes_balance}}</h4>
            <h6>{{description}}</h6>
      </header>
      <ul>
        <li>
            <span>可用余额</span>
            <p>￥{{account_balance}} </p>
        </li>
         <li>
            <span>余额状态</span>
            <p>{{status}} </p>
        </li>
        <li>
            <span>冻结余额</span>
            <p>￥{{lock_balance}} </p>
        </li>
        <li>
            <span>支付时间</span>
            <p>{{modify_time | formatDate}} </p>
        </li>  
      </ul>
  </div>
</template>
<script>
import topHeader from '@/components/page/children/header.vue';
import qs from 'qs';
export default {
  data () {
      return {
          title:"账单详情",
          titleImg:require("@/assets/images/e_default.png"),
          modify_time : 0,
          account_balance : 0,
          lock_balance : 0,
          changes_balance : 0,
          status : "",
          description : "",
      }
  },
  components:{
      topHeader
  },
  methods :{
   getWalletDetail() {
       this.axios.post(this.$httpConfig.walletDetail, qs.stringify({
           id : this.$route.params.wallet_id,
           token: sessionStorage.getItem("data_token")
       })).then((res) => {
          
           if(res.data.status == 1){
               
          var result = res.data.data;
          this.modify_time = result.modify_time;
          this.changes_balance = result.changes_balance;
          this.account_balance = result.account_balance;
          this.lock_balance = result.lock_balance;
          this.status = result.status;
          this.description = result.description;
             
           }
       }).catch((err) => {
                console.log(err);
        });
   }
  },
  created()  {
      this.getWalletDetail();
  },
}
</script>
<style lang="less" scoped>
ul{
    background-color: #fff;
    padding:.1rem .3rem;
    li{
        
        display: flex;
        align-items: center;
        margin: .5rem 0;
        justify-content: space-between;
        span{
            font-size: .32rem;
            width: 3rem;
        }
        p{
            font-size: .32rem;
            text-align: right;
            line-height: .5rem;
        }
    }
}
header{
    height: 2.75rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-bottom: .01rem solid #E8E8E8;
    div{
        display: flex;
        align-items: center;
        font-size: .32rem;
        img{
            width: .55rem;
            height: .55rem;
            margin-right: .2rem;
        }
    }
   
    h4{
        margin-top: .25rem;
        font-size: .50rem;
    }
     h6{
        margin-top: .25rem;
        font-size: .24rem;
        color: #9E9E9E;
    }
}
</style>
