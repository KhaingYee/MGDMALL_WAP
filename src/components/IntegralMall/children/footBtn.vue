<template>
	<div class="footer2017">
		<div class="seat"></div>
		<div class="btn-main clearfix">
			<div class="but">
                <p class="foot-but">
                    我的积分:
                    <span>{{myIntegralData}}</span>积分
                </p>
                <div class="imm fr" @click="exchange">我要兑换</div>
                <!-- <div class="imm fr" v-else @click="exchange" :class="{'immActive':imstart}">我要兑换</div> -->
            </div>
		</div>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui';
	import qs from 'qs';
	export default {
		name: 'footBtn',
		data() {
			return {
				type: 0,
				imgs: require('@/assets/images/footer_star.png'),
				imgsNo: require('@/assets/images/footer_star.png'),
				imgsYes: require('@/assets/images/xu_xinxin.png'),
				dataCol: [],
				choice:true,
				imstart: true,
				
				
			}
		},
		props: {
			data: '',
			message: '',
			nb: '',
			Number: '',
			money: '',
			myIntegralData:'',
		},
		created() {
		},
		methods: {
			exchange() {
            if (this.data.stock == 0 && this.data.is_presell == 0) {
                Toast({
                    message: "库存不足",
                    duration: 1000,
                });
                return;
            }
				this.$router.push({
					name: 'confirmOrderIntegral',
					params: {
						good_id: this.data.id,
						num:this.$store.state.commodity_val,
						id:3
					},
				})
			},
		}
	}
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

        background: #fff;
        .but {
            width: 100%;
            display: flex;
            flex-direction: row;
            p {
                text-indent: 0.2rem;
                width: 80%;
                height: 1rem;
                line-height: 1rem;
                font-size: 0.3rem;
                color: #2d2d2d;
                span {
                    margin-left: 0.05rem;
                    margin-right: 0.05rem;
                    color: rgb(255, 149, 54);
                    font-size: 0.3rem;
                }
            }
        }
        em {
            // width:.5rem;
            // height:.5rem;
            // position:absolute;
            // top:.1rem;
            // left:50%;
            text-align: center;
            margin-right: 0.25rem;
            font-style: normal;
            color: #d21923;
            font-size: 0.5rem;
        }
        .col {
            margin-top: 10/100rem;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            box-sizing: border-box;
            img {
                width: 50/100rem;
                height: 50/100rem;
                margin-bottom: 5/100rem;
            }
            width: 2.5rem;
            color: #333;
            font-size: 0.22rem;
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
        .join {
            width: 2.5rem;
            height: 100%;
            background: #e9c440;
            color: #fff;
            font-size: 0.32rem;
            line-height: 1rem;
        }
        .foot-but {
        }
        .imm {
            width: 2.5rem;
            height: 100%;
            text-align: center;
            background: #d02629;
            color: #fff;
            font-size: 0.3rem;
            line-height: 1rem;
        }
        .immActive {
            background: rgb(255, 149, 54);
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