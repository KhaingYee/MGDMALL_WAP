<template>
    <div class="inform-wrapper">
        <div class="header">
            <h1>举报违规</h1>
        </div>
        <div class="container">
            <ol>
                <li>
                    1.
                    请提供充分的证据确保举报成功,珍惜会员权利,帮助更好管理会员网站
                </li>
                <li>
                    2.
                    被举报商品信息不能反复提交,下架商品不能举报,商家继续上传违规商品可进行举报
                </li>
                <li>3. 举报进针对商品本身,若产生纠纷可进行投诉</li>
                <li>4. 举报按顺序进行,上传图片包括三张</li>
            </ol>
        </div>
        <h6>举报商品</h6>
        <div class="process">
            <img :src="URL + noticeInfo.title.pic_url" alt="" />
        </div>
        <div class="shop">
            <p>被举报商家</p>
            <span @click="goShopName(store_id)">{{ noticeInfo.shop }}</span>
        </div>
        <div class="detail">
            <div class="top">
                <h5>相关商品:</h5>
                <span @click="enterGoodsDetail(main_id)">{{ noticeInfo.title.title }}</span>
            </div>
        </div>
        <div class="type">
            举报类型 :
            <div class="show-detail">
                {{ nextRadioValue }}
            </div>
        </div>
        <div class="select-option">
            举报主题 :
            <div class="show-select">
                {{ nextSelectValue }}
            </div>
        </div>
        <div class="content">
            举报内容 :
            <div class="show-text">
                {{ receivedValue }}
            </div>
        </div>
        <div class="pic">
            <span>图片:</span>
            <div  v-for="(item, index) in picArr" :key="index">
                <img :src="imgUpload + item" alt="" />
            </div>
        </div>
        <div class="notice">
            <div class="btn" @click="confirm">确认提交</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgUpload: imgRequest
        };
    },
    props: {
        noticeInfo: {
            type: Object,
            default: ""
        },
        receivedValue: {
            type: String
        },
        nextRadioValue: {
            type: String
        },
        nextSelectValue: {
            type: String
        },
        picArr: {
            type: Array,
            default: []
        },
        store_id: {
            type: String,
            default: ''
        },
        main_id: {
            type: String,
            default: ''
        }
    },
    methods: {
        confirm() {
            this.$emit("confirm");
        },
        goShopName(id){
            this.$emit('enterShopName',id)
        },
        enterGoodsDetail(id){
            this.$emit('enterGoodsDetail',id)
        }
    }
};
</script>
<style lang="less">
    .inform-wrapper{
        .el-input__inner {
            margin-left: 18px;
        }
        .el-textarea__inner {
            margin-top: 10px;
        }
        .el-upload--picture-card {
            margin-top: 10px !important;
        }
    }
</style>
<style lang="less" scoped>
.inform-wrapper {
    background-color: #ffffff;
    float: left;
    width: 100%;
    height: auto;
    .header {
        margin: .4rem;
        border-bottom: 1px solid #e7e7e7;
        padding-bottom: .2rem;
        h1 {
            color: #d19e29;
            font-size: .32rem;
        }
    }
    .container {
        background: #eff8ff;
        display: flex;
        margin: 0 .3rem;
        ol {
            padding: .6rem;
            li {
                padding: .1rem;
            }
        }
    }
    h6 {
        font-size: .34rem;
        border-bottom: 1px solid #e3e3e3;
        margin: .32rem;
        padding-bottom: .14rem;
    }
    .process {
        img {
            margin: .2rem;
        }
    }
    .shop {
        margin: .2rem;
        background: #f6f6f6;
        padding: .2rem;
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
            h5 {
                display: inline-block;
            }
            img {
                margin-left: .6rem;
            }
            span {
                cursor: pointer;
                &:hover {
                    color: rgb(134, 163, 226);
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
        img{
            width:4rem;
            height: 2rem;
            margin: .1rem 0;
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
