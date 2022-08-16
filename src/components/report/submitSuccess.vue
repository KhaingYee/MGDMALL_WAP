<template>
    <div class="success-wrapper">
        <com-header></com-header>
<!--        <img src="../../assets/notice_3.jpg" alt="" />-->
        <div class="image">
            <img src="../../assets/notice_1.jpg" alt="" />
        </div>
        <el-button @click="backHome">返回主页</el-button>
    </div>
</template>

<script>
import ComHeader from "./comHeader";
export default {
    name: 'submitSuccess',
    data() {
        return {

        };
    },
    methods: {
        backHome() {
            this.$emit("handleBack");
        }
    },
    components: {
        ComHeader
    }
};
</script>
<style lang="less">
.success-wrapper {
    .el-button {
        position: relative;
        left: 37%;
        margin: .2rem 0;
    }
}
</style>
<style lang="less" scoped>
.success-wrapper {
    width: 100%;
    height: 100%;
    background: #ffffff;
    /*img {*/
    /*    display: block;*/
    /*    margin: 10px auto;*/
    /*}*/
    .image {
        padding: .2rem 0;
        img {
            width: 7rem;
            background-size: 100% 100%;
        }
    }
}
</style>
