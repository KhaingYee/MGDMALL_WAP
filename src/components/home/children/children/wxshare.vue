<template>
    <div class="wx-sahre">
        <div class="share-center">
            <img class="share-img" src="../../../../assets/activity/yifuzhi1.png" alt="">
            <div class="share-desc">地址已复制</div>
            <!-- <div class="share-desc bom" v-if="status==1">去微信粘贴给好友帮忙拼团</div> -->
            <div class="share-desc bom" v-if="status==1">去粘贴给好友帮忙拼团</div>
            <div class="share-desc bom" v-else-if="status==0">去微信粘贴给好友帮忙砍价</div>
            <div class="share-desc bom" v-else-if="status==3">去微信粘贴给好友下载69居家</div>
            <!-- <div @click="toWx" class="btn">去微信粘贴</div> -->
            <img src="../../../../assets/activity/quxiao1.png" @click="close" class="quxiao" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        name: "wxshare",
        data(){
            return{

            }
        },
        props:{
            status:'',
        },
        methods:{
            toWx(){
                var nativeUrl = 'weixin://';
                window.location.href = nativeUrl;
            },
            close(){
                this.$emit('closeShare')
            }
        }
    }
</script>

<style lang="less" scoped>
    .wx-sahre{
        position: fixed;
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 5;
        background: rgba(0,0,0,.7);
        .share-center{
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            background: #ffffff;
            margin:  auto;
            width: 5.5rem;
            height: 5rem;
            border-radius: .2rem;

            .quxiao{
                display: block;
                width: .5rem;
                height: .5rem;
                position: absolute;
                right: .1rem;
                top: .1rem;
                z-index: 11;
            }
            .share-img{
                display: block;
                width: 2rem;
                height: 2rem;
                margin: .3rem auto;
            }

            .share-desc{
                text-align: center;
                font-size: .26rem;
                font-weight: bold;
                margin-bottom: .2rem;
            }
            .bom{
                margin-bottom: .4rem;
            }

            .btn{
                width: 4rem;
                height: .6rem;
                line-height: .6rem;
                color: #ffffff;
                text-align: center;
                background: #ff9536;
                margin: 0 auto;
            }
        }
    }
</style>
