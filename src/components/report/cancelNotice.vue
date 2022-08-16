<template>
    <div class="cancel-notice-wrapper">
        <div class="notify">
            <div class="title">确认要取消这个举报吗?</div>
            <div class="yes" @click="handleYes(cancelIndex)">yes</div>
            <div class="no" @click="handleNo">no</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: {
        cancelIndex: {
            type: Number,
            default: -1
        }
    },
    methods: {
        handleYes(index) {
            this.$emit("handleYse",index);
        },
        handleNo() {
            this.$emit("handleNo");
        }
    }
};
</script>

<style lang="less" scoped>
.cancel-notice-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 11111;
    .notify {
        position: absolute;
        left: 9%;
        top: 30%;
        background: #fff;
        border: 1px solid #e8e8e8;
        padding: 1rem;
        .title {
            font-size: .4rem;
        }
        .yes {
            font-size: .36rem;
            float: left;
            border: 1px solid #e8e8e8;
            padding: .1rem .45rem;
            border-radius: .15rem;
            cursor: pointer;
        }
        .no {
            font-size: .36rem;
            float: right;
            border: 1px solid #e8e8e8;
            padding: .1rem .45rem;
            border-radius: .15rem;
            cursor: pointer;
        }
    }
}
</style>
