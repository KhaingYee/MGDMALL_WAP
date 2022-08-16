<template>
    <div class="puzzle_success">
        <com-header></com-header>
        <div class="pos">
            <div class="c_1">
                <img :src="successIcon" alt />
                <p>{{message}}</p>
            </div>
            <!-- <div class="desc">商家正在努力发货，请耐心等待</div> -->
            <div class="banner">
                <div class="group">
                    <div class="signal" v-if="successInfo.commander_name !=''">{{successInfo.commander_name}}</div>
                    <div class="img">
                        <img :src="URL+successInfo.commander_header" class="myself" />
                    </div>
                </div>
                <div class="avatar" v-for="(item,index) in successInfo.league_member" :key='index'>
                    <img :src="URL+item.user_header" alt />
                </div>
            </div>

            <div class="btn">

                <div class="btn_down" @click="selectOrder">查看订单详情</div>
                <div class="btn_up" @click="gohome">去首页逛逛</div>

            </div>
        </div>
    </div>
</template>
<script>

import ComHeader from "./children/puzzleheader";
import qs from 'qs';
export default {
    name: "puzzleSuccess",
    components: {
        ComHeader
    },
    data() {
        return {
            successIcon: require("../../assets/activity/arrow.png"),
            successInfo:'',
            message : '',
            message:'拼团人数不足,请耐心等待!'
        };
    },
    mounted() {
        this.successInfo.commander_name=='firefly'
        this.axios
            .post(
                this.$httpConfig.orderGroupLeagueMember,
                qs.stringify({
                    id: this.$route.params.id,
                    token: sessionStorage.getItem("data_token")
                })
            )
            .then(res => {
                if(res.data.status !=0){
                    this.successInfo = res.data.data;
                    this.message = res.data.data.message[1]
                    this.$store.state.teamSuccess=res.data.data;
                }

            })
            .catch(err => {
                console.log(err);
            });

        this.payment();
    },
    methods: {
        payment(){
            if(this.successInfo.message == this.message){
                this.$router.push({
                    name: "cashier",
                    params: {
                        id:1,
                        number: this.$route.params.price
                    }
                });
            }
        },
        gohome() {
            this.$router.push("/home");
        },
        selectOrder() {
            this.$router.push({
                name: "puzzleOrderDetail",
                params: {
                    id: this.$route.params.id,
                    data:this.successInfo
                }
            });
        }
    }
};
</script>
<style lang="less" scope>
.puzzle_success {
    .pos {
        position: fixed;
        top: 2rem;
        width: 100%;
        height: 5.8rem;
        background: #fff;
        border-radius: 0.2rem;
        .c_1 {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.2rem;
            img {
                height: 0.5rem;
                width: 0.5rem;
            }
            p {
                font-size: 0.3rem;
                padding-left: 0.2rem;
                color: #0ac002;
            }
        }
        .desc {
            font-size: 0.26rem;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .banner {
            justify-content: center;
            display: flex;
            align-items: center;
            margin: 0.2rem;
            .group {
                margin-right: 0.2rem;
                .myself {
                    height: 0.8rem;
                    width: 0.8rem;
                }
                .signal {
                    position: absolute;
                    background: #ff9536;
                    padding: 0.01rem;
                    top: 1.35rem;
                    border-radius: 0.1rem;
                    transition: transfer(scale());
                    transform: scale(0.7);
                }

            }
            .avatar {
                margin-right: 0.1rem;
                img {
                    height: 0.8rem;
                    width: 0.8rem;
                }
            }
        }

        .btn {
            display: flex;
            flex-direction: column;
            height: 2.2rem;
            .btn_up {

                border: 0.01rem solid #ff9536;
                color: #ff9536;
                height: 50%;
                width: 90%;
                margin-left: 0.3rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.3rem;
                border-radius: 0.1rem;
                margin-top: 0.1rem;
            }
            .btn_down {

                color: #fff;
                border-radius: 1px solid #ff9536;
                background: #fff;
                height: 50%;
                width: 90%;
                margin-left: 0.3rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.3rem;
                border-radius: 0.1rem;
                background: #ff9536;
                margin-top: 0.2rem;
            }
        }
    }
}
</style>
