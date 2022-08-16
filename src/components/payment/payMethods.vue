<template>
	<div>
		<dl class="other">
			<!-- <dt>其他支付方式</dt> -->
			<dd v-for="item in paymentType" :key="item.id" class="clearfix" @click="paymentMethod(item.id)">
				<img :src="URL+item.logo" class="fl">
				<div class="fl pull-right">
					<h6 class="title">{{item.type_name}}</h6>
					<!-- <p class="con">{{otherdata.content[index]}}</p> -->
				</div>
				<span class="icon"></span>
			</dd>
			<div v-if="payId === 5" class="voucherCss">
				<span class="spa">*</span><span>收据凭证图片: </span>
				<el-upload
					:action="difficulty()"
					list-type="picture-card"
					:with-credentials="true"
					:on-success="succeed"
					:on-preview="handlePictureCardPreview"
					:on-remove="handleRemove"
					:on-exceed="beyond"
					:limit="1"
					name="voucher"
					accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF,.PNG,"
					class="uploadel"
				>
					<i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
				<div class="offlinecss" v-if="payBtn" @click="offlinePay">提交凭据</div>
			</div>
		</dl>
	</div>
</template>
<script>
import qs from 'qs';
import { Toast } from 'mint-ui';
	export default {
		name: 'payMethods',
		data (){
			return {
				paymentType:'',
				payType:{
					1:'wechatPay',
					2:'aliPay',
					5:'ylPay',
					4:'banlancePay'
				},
				payData:'', //支付时返回的数据
				payId: null,
				dialogVisible: false,
				dialogImageUrl: '',
				voucherImg: '',
				payBtn: false
			}
		},
		created(){
			this.getPaymentType();
		},
		methods: {
			offlinePay(){
				let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
				if(!reg.test(this.$store.state.amount)){
					Toast({
						message: '金额错误',
						duration: 1000
					});
					return false;
				}
				var that = this;
				this.axios.post(this.$httpConfig.balanceRecharge, qs.stringify({
					pay_type_id: this.payId,
					money: this.$store.state.amount,
					voucher: this.voucherImg,
					token: sessionStorage.getItem("data_token")
				})).then(function(res) {
					that.payData = res.data.data;
					if(res.data.status == 10001) {
						that.$router.push({name: 'logIn'})
					} else {
						if(res.data.status == 1) {
							that.$message.success({
								message: "提交成功 待审核",
								duration: 3000
							})
							that.$router.push("/myWallet");
						} else {
							that.$message.error({
								message: "提交失败",
								duration: 3000
							})
						}
					}
				}).catch((err) => {
					console.log(err);
				})
			},
			difficulty() {
                return this.$httpConfig.uploadVoucher;
            },
			succeed(response, file, fileList) {
				this.voucherImg = response.pic
				this.payBtn = true
            },
			handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
			handleRemove(file, fileList) {
                this.voucherImg = ''
            },
            beyond() {
                this.$message.warning("最多一张图片");
            },
			//获取充值类型
			getPaymentType() {
				this.axios.post(this.$httpConfig.rechargeType, qs.stringify({
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
			//充值
			paymentMethod(id) {
				this.payId = id
				if(id !== 5) {
					let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
					if(!reg.test(this.$store.state.amount)){
						Toast({
							message: '金额错误',
							duration: 1000
						});
						return false;
					}
					var that = this;
					this.axios.post(this.$httpConfig.balanceRecharge, qs.stringify({
						pay_type_id: id,
						money: this.$store.state.amount,
						token: sessionStorage.getItem("data_token")
					})).then(function(res) {
						that.payData = res.data.data;
						if(res.data.status == 10001) {
							that.$router.push({name: 'logIn'})
						} else {
							if(res.data.status == 0) {
								Toast(res.data.message + '，即将跳到订单页面!');
								setTimeout(function() {
									that.$router.push({
										name: 'myWallet'
									})
								}, 1000);
							} else{
								eval('that.'+ that.payType[id]+'()');
							}
						}
					}).catch((err) => {
						console.log(err);
					})
				}
			},
		}
	}
</script>
<style>
	.el-upload--picture-card i {
		font-size: 28px;
		color: #8c939d;
		padding-top: .7rem;
	}
	.el-upload.el-upload--picture-card {
		width: 125px !important;
		height: 125px !important;
	}
	.el-upload-list__item-actions {
		width: 125px !important;
		height: 125px !important;
	}
	.el-upload-list--picture-card .el-upload-list__item {
		width: 125px !important;
		height: 125px !important;
	}
</style>
<style lang="less" scoped>
	.other {
		padding: 0 .2rem;
		background: #fff;
		.voucherCss {
			padding: 10px 0;
			.uploadel {
				padding-top: 10px;
			}
			.spa {
				padding-top: 10px;
				color: #f34545;
			}
		}
		.offlinecss {
			background: #d02629;
			width: auto;
			width: 103px;
			padding: 10px;
			border-radius: 7px;
			margin-top: 10px;
			color: #FFF;
			text-align: center;
		}
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
</style>