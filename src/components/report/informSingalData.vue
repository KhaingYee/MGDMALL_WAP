<template>
    <div class="singal-data">
        <con-header></con-header>
        <div class="shop">
            <p>被举报商家</p>
            <span @click="goShopHome">{{ singalData.shop_name }}</span>
        </div>
        <div class="detail">
            <div class="top">
                <span>相关商品:</span>
                <span @click="goGoodsHome">{{ singalData.title }}</span>
            </div>
        </div>
        <div class="type">
            <span>举报类型: </span>
            <div class="show-detail">
                {{ singalData.type }}
            </div>
        </div>
        <div class="select-option">
            <span>举报主题: </span>
            <div class="show-select">
                {{ singalData.topic }}
            </div>
        </div>
        <div class="content">
            <span>举报内容: </span>
            <div class="show-text">
                {{ singalData.content }}
            </div>
        </div>
        <div id="showPic">图片:</div>
        <div class="pic" v-for="(item, index) in handlePicUrl" :key="index">
            <img :src="imgUpload + item" alt="" />
        </div>

        <div class="notice">
            <div class="btn" @click="back">返回列表</div>
        </div>
    </div>
</template>

<script>
import ConHeader from "./comHeader";
export default {
    name: 'informSingalData',
    data() {
        return {
            imgUpload: URL
        };
    },
    mounted() {
        let newData = JSON.parse(sessionStorage.singalKey);
    },

    computed: {
        handlePicUrl() {
            if (Object.prototype.toString.call(this.singalData.pic_url)=="[object String]") {
                return this.singalData.pic_url.split(",");
            } else {
                return this.singalData.pic_url;
            }
        }
    },
    props: {
        singalData: {
            type: Object,
            default: null
        }
    },
    methods: {
        back() {
            this.$emit("cancel");
        },
        goShopHome() {
            this.$emit("goShopHome",this.singalData.store_id);
        },
        goGoodsHome() {
            this.$emit("goGoodsHome",this.singalData.goods_id);
        }
    },
    components: {
        ConHeader
    }
};
</script>
<style lang="less">
#showPic {
    margin-left: 26px;
}
</style>
<style lang="less" scoped>
.singal-data {
    background: #ffffff;
    width: 100%;
    height: 100%;
    h6 {
        font-size: .34rem;
        border-bottom: 1px solid #e3e3e3;
        margin: .32rem;
        padding-bottom: .14rem;
    }

    .shop {
        margin: .2rem;
        background: #f6f6f6;
        padding: .4rem;

        p {
            display: inline-block;
        }

        span {
            margin-left: .6rem;
            cursor: pointer;

            &:hover {
                color: rgb(134, 163, 226);
            }
        }
    }

    .detail {
        .top {
            margin-left: .56rem;
            span {
                &:nth-child(2) {
                    &:hover {
                        cursor: pointer;
                        color: rgb(134, 163, 226);
                    }
                }
            }
        }
    }

    .type {
        margin: .56rem;

        .show-detail {
            display: inline-block;
        }

        .container-radio {
            margin-left: 1.3rem;
            line-height: .96rem;
            margin-top: -.66rem;
        }
    }

    .select-option {
        margin-left: .56rem;

        .show-select {
            display: inline-block;
        }
    }

    .content {
        margin: .52rem;

        .show-text {
            display: inline-block;
        }
    }

    .pic {
        margin: .5rem;
        img {
            width: 4rem;
            height: 2rem;
            margin: .2rem 0;
        }
    }

    .notice {
        margin: .5rem;

        .btn {
            background: red;
            width: 2rem;
            margin: .2rem auto;
            text-align: center;
            border-radius: .1rem;
            height: .72rem;
            line-height: .72rem;
            color: #fff;
            font-weight: bold;
            cursor: pointer;
        }
    }
}
</style>
