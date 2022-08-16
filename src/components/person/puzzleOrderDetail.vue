<template>
    <!-- 拼团订单 -->
    <div class="puzzleOrderDetail">
        <coup-header :set="true" :text="'拼团订单'"></coup-header>
        <div class="headers">
            <div >
                <div class="p_title" >{{title}}</div>
                <div class="p_desc">{{subTitle}}</div>
            </div>
            <div>
                <img src="../../assets/activity/shadow.png" alt />
            </div>
        </div>
        <div class="address"  >
            <div class="divleft" >
                <img src="../../assets/activity/loca.png" alt />
                <div class="info">
                    <div class="detail">
                        <div class="name">{{orderData.realname}}</div>
                        <div class="phone">{{orderData.mobile}}</div>
                    </div>
                    <div class="addr">{{orderData.prov_name}}-{{orderData.city_name}}-{{orderData.dist_name}}-{{orderData.address}}</div>
                </div>
            </div>


        </div>
        <div class="pin" @click="inviteFriends">
            <div class="p">
                <div class="r">{{groupStatus}}</div>
                <div class="l" v-if="isCommander == 1">

                   <!-- <img src="../../assets/images/121.jpg">-->
                    <img :src="URL+orderData.commander_header" alt />
                    <!--<div class="name">{{orderData.commander_name}}</div>-->
                </div>
            </div>
            <div class="pr" v-if="isCommander == 1" >
                <span class="rjt" ></span>
            </div>
            <div class="pr" v-else >
                <span class="rjx" ></span>
            </div>

        </div>
        <div class="order">
            <div class="up">
                <img :src="URL+orderData.pic_url" alt />
                <div class="l">
                    <div class="p_title">{{orderData.title}}</div>
                    <div class="p_desc">
                       <!-- <div class="xh">型号：c0754-8</div>
                        <div class="ys">颜色：红</div>
                        <div class="bz">包装方式：24</div> -->
                    </div>
                    <div class="p_price">
                        <div class="p_l">￥{{orderData.price_num}}</div>
<!--                        <div class="p_r">×1</div>-->
                    </div>
                </div>
            </div>
            <ul class="down" v-if="orderData.status == 0">  <!--  取消订单    去付款  -->
                <li class="cancel" :class="{'gopayment' :indexColor==index}" v-for="(item,index) in nav" :key="index" @click="Gocancel(index)" >{{item}}</li>
                <!--<li class="cancel gopayment" @click="Gopayment">去付款</li>-->
            </ul>
        </div>
        <div class="pay">
            <div class="pay_full">
                实付：
                <span v-if="$route.query.TotalPrice">￥{{$route.query.TotalPrice}}</span>
                <span v-else>￥{{orderData.price_num}}</span>
            </div>
            <div class="free"></div>
        </div>
        <div v-if="orderData.pay_type == null"></div>
        <div v-else class="btn">
            <div class="sub" @click="shareOrInvitation($event)">邀请好友拼团</div>
        </div>
        <div class="footers">
            <div class="num">
                <div class="order_name">订单编号</div>
                <div class="order_no">{{orderData.order_sn_id}}</div>
                <div class="btn_copy "  @click='copyActiveCode($event,orderData.order_sn_id )'>复制</div>

            </div>
            <div class="method">
                <div class="pay_way">支付方式</div>
                <div class="wechat">{{payName}}</div>
            </div>
            <div class="parent" v-if="isCommander == 1">
                <div class="commander">开团团长</div>
                <div class="member">{{commander}}</div>
            </div>
            <div class="leage" v-if="isCommander == 1">
                <div class="my">我是</div>
                <div class="member">团员</div>
            </div>
            <div class="leage" v-if="isCommander == 0">
                <div class="my">我是</div>
                <div class="member">团长</div>
            </div>
            <div class="time">
                <div class="order_time">下单时间</div>
                <div class="date">
                    {{orderData.add_time*1000| formatDate}}
                </div>
            </div>
        </div>
        <wx-share v-if="shareFlag" @closeShare="closeShare" :status="status" ></wx-share>
    </div>
</template>

<script>
 import Clipboard from 'clipboard'
 import { Toast } from 'mint-ui';
 import wxShare from '@/components/home/children/children/wxshare';
import coupHeader from "@/components/page/children/header.vue";
import qs from "qs";
import message from "./message";
export default {
    name: "puzzleOrder",
    components: {
        coupHeader,
        wxShare
    },
    data() {
        return {
            status:1,
            countTotal: "",
            orderData:'',
            id:'',
            indexColor:1,
            nav:['取消订单','去付款'],
            successInfo:'',//拼团成功数据
            message:'请支付订单后开团!',
            paymentWhether:0,
            orderNumber:'',
            title: "",
            subTitle : "",
            groupStatus : "",
            commander : "",
            isCommander : "",
            payName : "",
            shareFlag:'',//复制弹窗提示
                headParams: {
                    title: sessionStorage.getItem('titleKey'),
                    description: sessionStorage.getItem('updateDescription'),
                    keywords: sessionStorage.getItem('contentKey'),        
                }
            }
        },
        head: {
            meta: function(){
                return [
                    { name: 'title', content: this.headParams.title, id: 'desc' },
                    { name: 'description', content: this.headParams.description, id: 'desc1' },
                    { name: 'keywords', content: this.headParams.keywords, id: 'desc2' },
                ]
            }
        },
    created() {
        let title = "拼团订单" + '-' + sessionStorage.getItem('titleKey') + '-' + sessionStorage.getItem('updateDescription');
        this.showScroll.scrollTitle(title);
    },
    methods: {
        //复制
        copyActiveCode(e, text) {
            const clipboard = new Clipboard(e.target, { text: () => text })
            clipboard.on('success', e => {
                this.$message({ type: 'success', message: '复制成功' })
                // 释放内存
                clipboard.off('error')
                clipboard.off('success')
                clipboard.destroy()
            })
            clipboard.on('error', e => {
                // 不支持复制
                this.$message({ type: 'waning', message: '该浏览器不支持自动复制' })
                // 释放内存
                clipboard.off('error')
                clipboard.off('success')
                clipboard.destroy()
            })
            clipboard.onClick(e)
        },
        Gocancel(index){
            this.indexColor=index
            if(index==0){  //取消订单
                this.axios
                    .post(
                        this.$httpConfig.cancellationOfOrder,
                        qs.stringify({
                            id: this.id,
                            token: sessionStorage.getItem("data_token")
                        })
                    )
                    .then(res => {
                        if(res.data.status==1){
                            Toast({
                                message: '订单已取消',
                                duration: 1000
                            });
                            this.$router.push( "/puzzleOrder");
                        }

                    })
                    .catch(err => {
                        console.log(err);
                    });
            }else {  //去支付
                if(this.$route.query.TotalPrice){
                    this.$router.push({
                        name: 'cashier',
                        params: {
                            id: 1,
                            number : this.$route.query.TotalPrice,
                            activityOrder: 1
                        }
                    });
                }else {
                    this.$router.push({
                        name: 'cashier',
                        params: {
                            id: 1,
                            number: this.orderData.price_num,
                            activityOrder: 1
                        }
                    });
                }
            }
        },
        AssembleSpellsuccess(){
             this.axios
                 .post(
                     this.$httpConfig.orderGroupLeagueMember,
                     qs.stringify({
                         id: this.$route.params.id,
                         token: sessionStorage.getItem("data_token")
                     })
                 )
                 .then(res => {
                     this.successInfo = res.data.data;
                     this.payName = res.data.data.payName;
                     this.title = res.data.data.message[0];
                     this.subTitle = res.data.data.message[1];
                     this.groupStatus = res.data.data.message[2];
                     this.commander = res.data.data.commander_name;
                     this.isCommander = res.data.data.commander;
                 })
                 .catch(err => {
                     console.log(err);
                 });
         },
        //拼团  团圆
        inviteFriends() {

            if(this.orderData.status == 0 || this.orderData.status == -1){
                Toast('拼团未成功')
                return
            }
            this.$router.push({
                name: "puzzleSuccess",
                params:{
                    data:this.successInfo
                }
            });
        },
        closeShare(){
            this.shareFlag = false
        },
        //邀请好友拼团
        shareOrInvitation(e){
            var that = this;
            var url='https://m.adminit.cn/#/shareAssemble/'+this.id;
            this.$copyText(url).then(function (e) {
                that.shareFlag = true
            }, function (e) {
                Toast('复制错误,请手动复制')
            })
        },
        getorderGroupDetail(){
            this.axios.post(this.$httpConfig.orderGroupDetail,qs.stringify({
                id:this.$route.params.id,
                token: sessionStorage.getItem("data_token")
            })).then((res)=>{
                this.orderData=res.data.data
                this.orderNumber=res.data.data.order_sn_id
                this.id=res.data.data.id
            }).catch((err)=>{
                console.log(err)
            })
        }
    },
    filters: {
        formatDate: function (value) {
            let date = new Date(value);
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? ('0' + MM) : MM;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            let h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            let m = date.getMinutes();
            m = m < 10 ? ('0' + m) : m;
            let s = date.getSeconds();
            s = s < 10 ? ('0' + s) : s;
            return y + '/' + MM + '/' + d+'/'+h+':'+m+':'+s;
        }
        },
    mounted() {
        this.getorderGroupDetail();
        this.AssembleSpellsuccess();
    }
};
</script>

<style scoped lang="less">
.puzzleOrderDetail {
    .headers {
        background: #ffa136;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 2rem;
        .p_title {
            font-size: 0.3rem;
            color: #fff;
            margin: 0.2rem;
        }
        .p_desc {
            font-size: 0.2rem;
            color: #fff;
            margin: 0.2rem;
        }
        img {
            width: 1rem;
            height: 1rem;
            margin: 0.2rem;
        }
    }
    .address {
        justify-content: space-between;
        align-items: center;
        display: flex;
        padding: 0 0.2rem;
        background: #fff;
        padding-bottom: 0.3rem;
        .divleft {
            display: flex;
            flex-direction: row;
            img {
                margin-top: 0.3rem;
                height: 0.5rem;
                width: 0.4rem;

            }
            .info {
                margin-left: 0.2rem;
                .detail {
                    display: flex;
                    padding: 0.2rem 0;
                    .name {
                        font-size: 0.25rem;
                    }
                    .phone {
                        padding-left: 0.2rem;
                        font-size: 0.25rem;
                    }
                    .addr {
                        padding-bottom: 0.2rem;
                    }
                }
            }
        }

        .btn {
            font-size: 0.3rem;
            border: 0.01rem solid #ffa136;
            border-radius: 0.1rem;
            text-align: center;
            color: #ffa136;
            line-height: 0.5rem;
            height: auto;
            width: 1rem;
            margin-top: 0.3rem;
            background: #fff;
        }
    }
    .pin {

        display: flex;
        flex-direction: row;
        .p{
            width: 95%;
            display: flex;
            align-items: center;
            background: #fff;
            justify-content: space-between;
            margin-top: 0.2rem;
            .l {
                display: flex;
                align-items: center;
                padding: 0 0.2rem;
                img {
                    padding: 0.1rem 0.1rem;
                    width: 0.7rem;
                    height: 0.7rem;
                    border-radius: 50%;
                }
                .name {
                    padding: 0 0.2rem;
                    font-size: 0.3rem;
                }
            }
            .r {
                padding: 0 0.2rem;
                color: #ffa136;
                font-size: 0.3rem;
            }
        }
        .pr{
            background: white;
            width: 0.5rem;
            margin-top: 0.2rem;
           /* justify-content: center;
            align-items: center;*/
            .rjt{
                display: inline-block;
                width: 0.25rem;
                height: 0.35rem;
                margin-top: 0.27rem;
                background: url("../../assets/btn-right.png") no-repeat;
                background-size: 100% 100%;
            }
            .rjx{
                display: inline-block;
                width: 0.25rem;
                height: 0.35rem;
                margin-top: 0.27rem;
                background-size: 100% 100%;
                height : 0.5rem;
            }
        }

    }
    .order {
        .up {
            display: flex;
            align-items: center;
            padding-left: 0.2rem;
            padding-top: 0.2rem;
            padding-bottom: 0.2rem;
            border-bottom: 0.01rem solid #dfdfdd;
            img {
                width: 2rem;
                height: 2rem;
            }
            .l {

                .p_title {
                    padding-left: 0.2rem;
                    font-size: 0.28rem;
                }
                .p_desc {

                    font-size: 0.4rem;
                    display: flex;
                    padding: 0.3rem 0.1rem;
                    color: #afafaf;

                    .ys {

                        padding-left: 0.3rem;
                    }
                    .bz {
                        border: 1px solid black;
                        padding-left: 0.3rem;
                    }
                }
                .p_price {
                    display: flex;
                    justify-content: space-between;
                    padding: 0 0.3rem;
                    .p_l {
                        font-size: 0.33rem;
                        padding-left: 0.1rem;
                        position: relative;
                        left: -0.2rem;
                        color: #ffa136;
                    }
                    .p_r {
                        font-size: 0.4rem;
                    }
                }
            }
            .r {
                display: flex;
                flex-direction: column;
            }
        }
        .down {
            display: flex;
            justify-content: flex-end;
            padding: 0 0.2rem;
            margin-top: 0.2rem;
            .cancel {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.3rem;
                border: 0.01rem solid #747576;
                border-radius: 0.1rem;
                width: 1.5rem;
                text-align: center;
                color: #454648;
                height: 0.6rem;
                margin-right: 0.2rem;
                margin-top: 0.1rem;
            }
            .gopayment{
                background: #ffa136;
                color: white;
            }
            .check {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.3rem;
                border: 0.01rem solid #747576;
                border-radius: 0.1rem;
                width: 2rem;
                text-align: center;
                color: #454648;
                height: 0.6rem;
                margin-top: 0.1rem;
            }
        }
    }
    .pay {
        display: flex;
        justify-content: flex-end;
        background: #fff;
        height: 1rem;
        margin-top: 0.2rem;
        align-items: center;
        .pay_full {
            span {
                font-size: 0.4rem;
                color: #ff9536;
                padding-right : 0.5rem;
            }
        }
        .free {
            font-size: 0.3rem;
        }
    }
    .btn {
        height: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f1f1f1;
        .sub {
            background: #ff9536;
            font-size: 0.35rem;
            width: 90%;
            color: #fff;
            border-radius: 0.15rem;
            height: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 100;
        }
    }
    .footers {
        background: #fff;
        padding: 0.2rem;
        margin-bottom: 0.2rem;
        .num {
            display: flex;
            padding: 0 0.2rem;
            margin-bottom: 0.2rem;
            .order_name {
                width: 1.7rem;
                font-size: 0.3rem;
            }
            .order_no {
                padding-left: 0.8rem;
                font-size: 0.3rem;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            .btn_copy {
                font-size: 0.3rem;
                width: 1rem;
                height: 0.5rem;
                border: 1px solid #000;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: 0.3rem;
                border-radius: 0.05rem;
                margin-top: -0.1rem;
            }
        }
        .method {
            display: flex;
            padding: 0 0.2rem;
            margin-bottom: 0.2rem;
            .pay_way {
                font-size: 0.3rem;
            }
            .wechat {
                padding-left: 1rem;
                font-size: 0.3rem;
            }
        }
        .parent{
            display: flex;
            padding: 0 0.2rem;
            margin-bottom: 0.2rem;
            .commander {
                font-size: 0.3rem;
            }
            .member {
                padding-left: 1rem;
                font-size: 0.3rem;
            }
        }
        .leage{
             display: flex;
            padding: 0 0.2rem;
            margin-bottom: 0.2rem;
            .my {
                font-size: 0.3rem;
            }
            .member {
                padding-left: 1.58rem;
                font-size: 0.3rem;
            }
        }
        .time {
            display: flex;
            padding: 0 0.2rem;
            .order_time {
                font-size: 0.3rem;
            }
            .date {
                padding-left: 1rem;
                font-size: 0.3rem;
                span {
                    margin-left: 0.1rem;
                    font-size: 0.3rem;
                }
            }
        }
    }
}
</style>
