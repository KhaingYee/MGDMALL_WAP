<template>
	<div class="cashier">
		<div v-title :data-title="title">{{title}}</div>
		<cashier-header :text="title" :btn="btn"></cashier-header>
		<div class="payment-wrap">
			<div class="status">
				<div class="pull-left fl">订单金额</div>
				<div class="pull-right fr">
					<span>{{$route.params.number}}</span>元</div>
			</div>
		</div>
		<div class="choice" >
			<span class="span-main">当前余额：<span> {{balance}} </span>元</span>
		</div>
		<div class="default-pay">
			<el-button class="pay-btn" v-for="item in paymentType" v-if="item.is_default == 1" :key="item.id" type="success" @click="paymentMethod(item.id)">
				{{item.type_name}}
			</el-button>
			<span v-else></span>
		</div>
		<dl class="other" v-if="$route.params.id != 3">
			<dt>其他支付方式</dt>
			<dd v-if="item.is_default!= 1" v-for="item in paymentType" :key="item.id" class="clearfix" @click="payment(item.id)">
				<img :src="URL+item.logo" class="fl">
				<div class="fl pull-right">
					<h6 class="title">{{item.type_name}}</h6>
					<!--<p class="con">支付宝安全支付</p>-->
				</div>
				<span class="icon"></span>
			</dd>
		</dl>
		<div class="popup_div" v-show="popupVisible">
			<div class="popup_box">
				<span class="box_cross" @click="cancelArea">×</span>
				<div class="password_div">
				<p class="password_text">支付密码：</p>
				<div class="input_box">
				<v-otp-input
					ref="otpForm"
					input-classes="otp-input"
					separator="-"
					:num-inputs="6"
					:should-auto-focus="true"
					:is-input-num="true"
					input-type="password"
					@on-change="handleOnChange"
					@on-complete="handleOnComplete"
				/>
				</div>
				</div>
				<p class="time_message">{{this.verifyMessage}}</p>
				<button
					class="next_button"
					@click="confirmVerifyBtn">确认支付
				</button>
			</div>
		</div>
		<Shopsn></Shopsn>
		<div class="load" v-show="load" @touchmove.prevent>
			<mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner>
		</div>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui';
	import btn from '@/components/Widget/maxBtn.vue';
	import cashierHeader from '@/components/home/children/header.vue';
	import Shopsn from '@/components/page/Shopsn.vue';
	import qs from 'qs';
	export default {
		name: 'cashier',
		data() {
			return {
				title: this.$constant.mainTitle+'收银台',
				img1: require('@/assets/yuan.png'),
				img2: require('@/assets/duihao.png'),
				text: '立即支付',
				btn: '订单中心',
				scrollWatch: true,
				load: false,
				data: '',
				orderId: '',
				flag: false,
				paymentType: '',
				balance: '',
				integralMoney:'',
				payType:{
					1:'wechatPay',
					2:'aliPay',
					3:'ylPay',
					4:'banlancePay'
				},
				payData:'', //支付时返回的数据
				popupVisible: false,
				payId: '',
				balancePassID: '',
				verifyMessage: '',
				verifyID: '',
			}
		},
		created() {
			this.getPaymentType();
			this.orderId=sessionStorage.getItem('integral_orderID');
		},
		methods: {
			confirmVerifyBtn() {
				this.axios.post(this.$httpConfig.verifyPassword, qs.stringify({
					balance_password: this.balancePassID,
                    code: this.verifyID,
					token: sessionStorage.getItem("data_token")
				}))
                .then(res => {
                    // this.verifyMessage = res.data.message;
                    if(res.data.status == 1) {
                        // this.passwordError();
						this.callInitiate();
                    }
                })
                .catch(err => {
                    this.verifyMessage = err.data.message;
                });
			},
			cancelArea(){
				this.popupVisible = false;
			},
			handleOnChange(value) {
				this.balancePassID = value;
				this.verifyID = value;
			},
			handleOnComplete(value) {
			},
			theChecked() {
				this.flag = !this.flag
			},
			getPaymentType() {
				this.axios.post(this.$httpConfig.paymentType, qs.stringify({
					token: sessionStorage.getItem("data_token")
				})).then((res) => {
					if(res.data.status == 10001) {
						this.$router.push('/LogIn');
					} else {
						this.paymentType = res.data.data
					}
				}).catch((err) => {
					console.log(err);
				});
			},
			wechatPay(){
				window.location.href = this.payData;
			},
			aliPay(){
				const oDiv = document.createElement('div');
				oDiv.innerHTML = this.payData;
				document.body.appendChild(oDiv);
				document.forms.Alipaysubmit.submit();
			},
			ylPay(){
				//银联
			},
			banlancePay(){
				//余额支付
				var url_ = this.payData;
				var that = this;
				that.axios.post(url_).then((res)=>{
					if(res.data.status == 1){
						Toast('支付成功!');
						var type = sessionStorage.getItem('pay_sourse');
						if(type == 'goods'){
							this.$router.push({
								name:'orderList',
								params:{id:0}
							})
						}else if(type == 'goodsPackage'){
							this.$router.push({
								name:'packageList',
								params:{id:0}
							})
						}else if(type == 'integral'){
							this.$router.push({
								name:'intOrder'
							})
						}else{
							this.$router.push({
								name:'person'
							})
						}
					}else{
						Toast('支付失败，请选择其他支付方式!');
						return;
					}
				})
			},
			payment(id) {
				this.paymentMethod(id);
			},
			paymentMethod(id) {
				if(id == 4) {
					this.payId = id
					this.popupVisible = true;
				} else {
					this.callInitiate()
				}
			},
			callInitiate() {
				if(this.$route.params.id != 3){
					var that = this;
					this.axios.post(this.$httpConfig.orderPackageBuyPay, qs.stringify({
						pay_type_id: this.payId,
						platform: 1,
						token: sessionStorage.getItem("data_token")
					})).then(function(res) {
						that.payData = res.data.data;
						if(res.data.status == 30000 || res.data.status == 0) {
							Toast({
								message:res.data.message
							})
							var type = sessionStorage.getItem('pay_sourse');
							if(type == 'goods'){
								that.$router.push({
									name:'orderList',
									params:{id:0}
								})
							}else if(type == 'goodsPackage'){
								that.$router.push({
									name:'packageList',
									params:{id:0}
								})
							}else if(type=='integral'){
								that.$router.push({
									name:'intOrder'
								})
							}else{
								that.$router.push({
									name:'person'
								})
							}
						} else {
							eval('that.'+ that.payType[that.payId]+'()');
						}
					}).catch((err) => {
						console.log(err);
					})
				}else{
					if (this.$route.params.isAgain) {
						//再次购买
						this.axios.post(this.$httpConfig.orderNewBuy,qs.stringify({
							id:this.orderId,
							token: sessionStorage.getItem("data_token")
						})).then((res)=>{
							Toast({
								message:res.data.message
							});
							this.$router.push({name:'intOrder'})
						}).catch((err)=>{
							Toast(err);
						})
					} else {
						//直接购买
						this.axios.post(this.$httpConfig.confirmPay, qs.stringify({
							orderId:this.orderId,
							token: sessionStorage.getItem("data_token")
						})).then((res)=> {
							Toast(res.data.message);
							this.$router.push({name:'intOrder'})
						}).catch((err)=>{
							console.log(err)
						});
						
					}
				}
				
			},
			getBanlance() {
				//获取余额
				//var that = this;
				this.axios.post(this.$httpConfig.getBalance, qs.stringify({
					token: sessionStorage.getItem("data_token")
				})).then((res) => {
					if(res.data.status == 1) {
						this.balance = res.data.data;
					}
				}).catch((err) => {
					console.log(err);
				});
			}
		},

		mounted() {
			this.getBanlance();
			document.body.scrollTop = 0;
		},
		destroyed() {
			this.scrollWatch = false;
		},
		components: {
			cashierHeader,
			btn,
			Shopsn
		}
	}
</script>
<style lang="less">
	.otp-input {
		width: .5rem;
		height: .6rem;
		padding: .1rem .1rem .1rem .1rem;
		margin: 0 .1rem;
		font-size: .2rem;
		border-radius: .06rem;
		border: 1px solid rgba(0, 0, 0, 0.3);
		text-align: center;
		&.error {
		border: 1px solid red !important;
		}
	}
	.otp-input::-webkit-inner-spin-button,
	.otp-input::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
<style lang="less" scoped>
	.cashier {
		background: #fff;
	}
	
	.cashier.active {
		background: none;
	}
	
	.payment-wrap {
		.status {
			padding: 0 .2rem;
			height: 1rem;
			width: 7.1rem;
			line-height: 1rem;
			border-bottom: 1px solid #dfdfdd;
			.pull-left {
				font-size: .3rem;
				color: #999;
			}
			.pull-right {
				font-size: .32rem;
				color: #f23030;
				span {
					font-size: .36rem;
					margin-right: .2rem;
				}
			}
		}
	}
	
	.choice {
		padding: .25rem .2rem;
		width: 7.1rem;
		min-height: .5rem;
		line-height: 1rem;
		border-bottom: 1px solid #dfdfdd;
		line-height: .5rem;
		.img {
			width: 0.56rem;
			height: 0.56rem;
			float: left;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.radio-core {
			box-sizing: border-box;
			display: inline-block;
			background-color: #fff;
			border-radius: 100%;
			border: 1px solid #ccc;
			position: relative;
			width: .5rem;
			//  min-height: .5rem;
			vertical-align: middle;
		}
		.radio-input {
			display: none;
		}
		.radio-input:checked+.radio-core:after {
			background-color: #fff;
			-webkit-transform: scale(1);
			transform: scale(1);
		}
		.radio-input:checked+.radio-core {
			background-color: #26a2ff;
			border-color: #26a2ff;
		}
		.radio-core:after {
			box-sizing: border-box;
			content: " ";
			border-radius: 100%;
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			right: 0;
			margin: auto;
			width: 0.5rem;
			height: 0.5rem;
			-webkit-transition: -webkit-transform .2s;
			transition: -webkit-transform .2s;
			transition: transform .2s;
			transition: transform .2s, -webkit-transform .2s;
			-webkit-transform: scale(0);
			transform: scale(0);
		}
		.radio-label {
			display: inline-block;
			vertical-align: middle;
			margin-left: .23rem;
			// height: .5rem;
			width: 6.1rem;
			// overflow: hidden;
			font-size: .32rem;
			color: #333;
		}
		.span-main {
			width: 100%;
			font-size: .28rem;
			color: #999;
			span {
				width: 7.1rem;
				font-size: .28rem;
				color: #f23030;
			}
		}
	}
	
	.default-pay {
		padding: 10px;
		text-align: center;
		.pay-btn {
			width: 100%;
		}
	}
	
	.other {
		padding: 0 .2rem;
		background: #fff;
		dt {
			font-size: .3rem;
			color: #333;
			height: .7rem;
			line-height: .7rem;
			border-bottom: 1px solid #dfdfdf;
		}
		dd {
			padding: .3rem 0;
			height: .83rem;
			border-bottom: 1px solid #dfdfdf;
			position: relative;
			img {
				width: .83rem;
				height: .83rem;
			}
			.icon {
				position: absolute;
				top: 50%;
				right: .2rem;
				width: .2rem;
				height: .35rem;
				background: url(../../assets/btn-right.png) no-repeat;
				background-size: 100% 100%;
				margin-top: -.175rem;
			}
			.pull-right {
				padding-left: .3rem;
				.title {
					line-height: .83rem;
					font-size: .32rem;
					color: #333;
				}
				.con {
					padding-top: .15rem;
					font-size: .26rem;
					color: #999;
				}
			}
		}
	}
	.popup_div {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
	  z-index: 1;
      .popup_box {
		position: absolute;
		height: 4rem;
		width: 7rem;
		margin-left: .25rem;
        top:6.1rem;
        left: 0;
        bottom: 0;
		background: #fff;
		border-radius: .2rem;
		.box_cross {
			position: absolute;
			right: 3%;
			top: 0.15rem;
			width: 0.4rem;
			line-height: 0.34rem;
			height: 0.4rem;
			border: 1px solid #bfbfbf;
			text-align: center;
			font-size: 0.4rem;
			color: #bfbfbf;
			border-radius: 100%;
			cursor: pointer;
		}
		.password_div {
			padding: .9rem .35rem .1rem .35rem;
            .password_text {
				padding-top: .3rem;
				font-size: .3rem;
			}
			.input_box {
				float: right;
				margin-top: -.45rem;
			}
		}
		.time_message {
            margin: .4rem 0 0 2rem;
            color: red;
        }
        .next_button {
			cursor: pointer;
			border-radius: .1rem;
			width: 2.3rem;
			height: .8rem;
			background: #67C23A;
			text-align: center;
			line-height: .8rem;
			color: #fff;
			font-size: .3rem;
			margin: .3rem 0 0 1.94rem;
			border: none;
		}
	  }
	}
</style>