<template>
    <div class="header-wrapper">
        <div class="report">
        <div class="header">举报违规</div>
        <span @click="btnGo" class="btnGo" ></span>
        <div class="report_box">
            <ol class="box">
                <li>1. 请提供充分的证据确保举报成功,珍惜会员权利,帮助更好管理会员网站</li>
                <li>2. 被举报商品信息不能反复提交,下架商品不能举报,商家继续上传违规商品可进行举报</li>
                <li>3. 举报进针对商品本身,若产生纠纷可进行投诉</li>
                <li>4. 举报按顺序进行,上传图片包括三张</li>
            </ol>
        </div>
        <p class="header" style="color: #333333; padding-top: .2rem;">举报商品</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'comHeader',
    data(){
        return {

        }
    },
    methods: {
        btnGo(){
            this.$router.go(-1);
        },
    }
};
</script>

<style lang="less" scoped>
.header-wrapper {
    width: 100%;
    height: auto;
    background: #ffffff;
    .report {
        padding: .2rem;
    }
    .header {
        color: #d19e29;
        font-size: .32rem;
        border-bottom: 1px solid #e7e7e7;
        padding: .1rem 0 .2rem .1rem;
        text-align: center;
    }
    .btnGo {
        position: absolute;
        top: 2.5%;
        width: .25rem;
        height: .4rem;
        background: url(../../assets/backauction.png) no-repeat;
        background-size: 100% 100%;
    }
    .report_box {
        height: 3.5rem;
        background: #eff8ff;
        border: 1px solid #e7e7e7;
        margin-top: .3rem;
        .box {
            padding: .3rem;
            li {
                font-size: .28rem;
                color: #333333;
                letter-spacing: .01rem;
                line-height: 1.5;
                padding-bottom: .15rem;
            }
        }
    }
}
</style>
