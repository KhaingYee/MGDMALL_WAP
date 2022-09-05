<template>
    <div class="account">
        <div class="header">
            <i class="fa-solid fa-circle-chevron-left" id="backbtn" @click="back"></i>
            <div class="title">Account</div>
        </div>
    </div>
</template>
<script>
import { MessageBox, Toast } from "mint-ui";
import qs from "qs";
    export default {
    name: "personal",
    data() {
        return {

        };
    },
    methods:{
        back() {
            this.$router.go(-1);
        },
    }
    };
</script>
<style lang="less">
.account{
    .header{
        display: flex;
        padding: 0.3rem 0.2rem;
        background: #fff;
        border-bottom: .01rem solid #f1f1f1;
        #backbtn{
            font-size: .4rem;
            color: #777;
        }
        .title{
            font-size: .3rem;
            margin-left: 2.1rem;
        }
    }
}
</style>