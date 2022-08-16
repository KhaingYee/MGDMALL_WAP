<template>
	<div ref="package_list">
		<div v-title :data-title="$store.state.order_title" v-if="$store.state.order_title">{{$store.state.order_title}}</div>
		<order-header text="推广金额"></order-header>
		<div class="commission">
      <div class="total-commission">
          <div class="statistics">
            <p>推广金额</p>
            <p><span class="price">{{withdrawInfo.total}}</span> 元</p>
          </div>
          <div class="btn" @click="toPersentationDetail">
            提现明细
          </div>
      </div>
      <div class="option mg5">
        <div>可提现金额</div>
        <div>{{withdrawInfo.can_carry}} 元</div>
      </div>
      <div class="option mg5">
        <div>已提现金额</div>
        <div>{{withdrawInfo.withdrawals}} 元</div>
      </div>
      <div class="option mg5">
        <div>不可提现金额</div>
        <div>{{withdrawInfo.no_withdraw}} 元</div>
      </div>

      <div class="btn1" @click="addToBalance">我要提现</div>
    </div>
	</div>
</template>
<script>
	import orderHeader from '@/components/page/children/header.vue';
	import { MessageBox, Toast } from 'mint-ui';
	import Shopsn from '@/components/page/Shopsn.vue';
	import toTop from '@/components/page/toTop.vue';
	import qs from 'qs';
	export default {
		name: 'orderNav',
		data() {
			return {			
              // headParams: {
              //     title: sessionStorage.getItem('titleKey'),
              //     description: sessionStorage.getItem('updateDescription'),
              //     keywords: sessionStorage.getItem('contentKey'),        
              // },
              withdrawInfo:{
                no_mention:null,
                total:0.00,
                withdrawals:0.00
              },
            }
        },
    // head: {
    //     meta: function(){
    //         return [
    //             { name: 'title', content: this.headParams.title, id: 'desc' },
    //             { name: 'description', content: this.headParams.description, id: 'desc1' },
    //             { name: 'keywords', content: this.headParams.keywords, id: 'desc2' },
    //         ]
    //     }
    // },
		components: {
			orderHeader,
			Shopsn,
			toTop
		},
		mounted() {
      this.$store.state.order_title = '分销佣金';
      // let title = this.$store.state.order_title + '-' + sessionStorage.getItem('titleKey') + '-' + sessionStorage.getItem('updateDescription');
      // this.showScroll.scrollTitle(title);
			let _this = this;
      this.axios.get(this.$httpConfig.promoteCommission).then((res)=>{
        if(res.data.data){
          this.withdrawInfo = res.data.data;
        }
      }).then((e)=>{
        console.log(e);
      })
			window.addEventListener('scroll',function(){ 
				if(!_this.$refs.package_list) return;
				if(document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) { 
					//如果第一次请求没数据或数据没达到每页个数就不会再请求数据
					if(_this.roll_switch == false){
						return;
					}
					if(_this.slide_switch == true){
						_this.slide_switch = false;
						_this.page++;
					}
				}
			})
    },
		methods: {
      toPersentationDetail(){
        this.$router.push('/presentationDetail')
      },
      addToBalance(){
        
        this.$prompt('请输入金额', '', {
          confirmButtonText: '提现',
          cancelButtonText: '取消',
          inputPattern: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
          inputErrorMessage: '金额格式0.00'
        }).then(({ value }) => {   
          if(value<=this.withdrawInfo.can_carry){
            this.axios.post(
              this.$httpConfig.promoteAddToBalance,
              qs.stringify({price:value})
            ).then((res)=>{
              console.log(res);
              if(res.data.status==0){
                this.$message({
                  type: 'error',
                  message: res.data.message
                });
              }
              if(res.data.status==1){
                this.$message({
                  type: 'success',
                  message: "提现成功"
                });
                this.axios.get(this.$httpConfig.promoteCommission).then((res)=>{
                  if(res.data.data){
                    this.withdrawInfo = res.data.data;
                  }
                }).then((e)=>{
                  console.log(e);
                })
              }
              
            }).catch((e)=>{
              console.log(e);
            })    
          }else{
            this.$message({
                type: 'error',
                message: '余额不足!'
              });
          }  
          
        }).catch(() => {
                
        });
      }
		}
	}
</script>
<style lang="less" >
    .commission{
      .total-commission{
        display:flex;
        justify-content: space-between;
        align-items: center;
        padding: .33rem;
        background: #d02629;
        color:#fff;
        .statistics{
            p:nth-child(1){
              margin-bottom:.3rem;  
            }
            .price{
              font-size: .35rem;
            }
        }
        .btn{
          font-size: .25rem;
          padding: .1rem;
          border: 1px solid #fff;
          border-radius: .13rem;
        }
      }
      .option{
        display:flex;
        justify-content: space-between;
        align-items: center;
        padding: .23rem;
        background: #fff;
        color:#353535;
        div{
          font-size: .3rem;
        }
        >div:nth-child(2){
          color: #666666;
        }
      }
      .mg5{
        margin-bottom: .15rem;
      }
      .bor1{
        border-bottom: 1px solid #e3e3e3;
      }
      .btn1{
        width: 94%;
        margin: .4rem auto;
        text-align: center;
        background: #ff0000;
        height: .9rem;
        line-height: .9rem;
        color:#fff;
        border-radius: .1rem;
        font-size: .3rem;
        letter-spacing: .05rem;
      }
    }
    .el-message-box{
      width:300px !important;
    }
    .el-message{
      min-width:300px !important;
    }
</style>