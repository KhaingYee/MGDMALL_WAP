<template>
    <div class="report">
        <div class="report_page">
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
<!--            <div class="image">-->
<!--                <img src="../../assets/notice_1.jpg" alt="" />-->
<!--            </div>-->
            <div class="step">
                <el-steps :space="200" :active="1" finish-status="success" align-center>
                    <el-step status="danger" class="step_text" title="填写举报内容"></el-step>
                    <el-step status="danger" class="step_text" title="平台审核处理"></el-step>
                    <el-step status="danger" class="step_text" title="举报完成"></el-step>
                </el-steps>
            </div>
            <div class="shop">
                <p>被举报商家</p>
                <span>我的自营</span>
            </div>
            <div class="detail"  v-if="radioButton.title">
                <div class="top">
                    <h5>相关商品</h5>
<!--                    <img src="../../assets/con23.jpg" alt="" />-->
                    <img :src="URL + radioButton.title.pic_url" alt="" />
                </div>
                <div class="inner">
                    <span>商品名称: </span>
<!--                    <span>-->
<!--                        妮维雅（NIVEA）保湿身体慕斯200ml（滋润精华 身体乳 原装进口） 去黑头-->
<!--                    </span>-->
                    <span>
                        {{radioButton.title.title}}
                    </span>
                </div>
            </div>
            <div class="type">
                举报类型 :
                <div class="container-radio">
                    <el-radio-group v-model="radio" @change="handleRadioChange">
                        <el-radio
                                :label="index"
                                v-for="(item, index) in radioButton.report"
                                :key="index"
                        >{{item.type_name}}</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div class="select-option">
                <span>举报主题 :</span>
                <el-select
                        id="select-change"
                        v-model="value"
                        placeholder="请选择"
                >
                    <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="content">
                举报内容 :
                <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"
                        v-model="textarea"
                >
                </el-input>
            </div>
            <div class="pic">
                图片 :
                <div class="pic_div">
                    <el-upload
                            :action="difficulty()"
                            list-type="picture-card"
                            :with-credentials="true"
                            :on-success="succeed"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :on-exceed="beyond"
                            :limit="5"
                            name="adv_content"
                            accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF,.PNG,"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img src="../../assets/notice_1.jpg" alt="" />
                    </el-dialog>
                </div>
            </div>
            <div class="notice">
                <button class="button">提交</button>
            </div>
        </div>
    </div>
</template>

<script>
    import ElementUI from 'element-ui';
    import qs from "qs";
    export default {
        name: 'report',
        data(){
            return {
                radio: '',
                radioButton: [],
                // banner: [],
                // pId: [],
                value: "",
                options: [],
                textarea: "",
                dialogVisible: false,
                nextRadioValue: "",
                resStatus: "",
                checkPic: [],
                picArr: [],
                figureCollection: [],
                dialogImageUrl: "",
            }
        },
        methods: {
            btnGo(){
                this.$router.go(-1);
            },
            report(){
                this.axios({
                    url: this.$httpConfig.report,
                    method: "get",
                    params: {
                       goods_id: this.$route.params.goods_id,
                       store_id: this.$route.params.store_id,
                       token: sessionStorage.getItem("data_token")
                    }
                })
                    .then(res => {
                        this.radioButton = res.data.data;
                        // this.banner = res.data.data.title;
                        // this.pId = res.data.data.title.p_id;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // reportTopic(){
            //     this.axios({
            //         url: this.$httpConfig.reportTopic,
            //         method: "post",
            //         params: {
            //             id: this.$route.params.goods_id,
            //         }
            //     })
            //         .then(res => {
            //             // this.options = res.data.data;
            //         })
            //         .catch(err => {
            //             console.log(err);
            //         });
            // },
            reportTopic(index) {
                this.$HTTP(
                    this.$httpConfig.reportTopic,
                    {
                        id: index
                    },
                    "post"
                )
                    .then(res => {
                        this.options = res.data.data;
                    })
                    .catch(err => {
                        console.error(err);
                    });
            },
            commitReport(){
                this.axios({
                    url: this.$httpConfig.commitReport,
                    method: "get",
                    params: {
                        token: sessionStorage.getItem("data_token")
                        // id: this.$store.state.commodity_data.goods.store_id
                    }
                })
                    .then(res => {
                        // this.shopData = res.data.data;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            handleRadioChange(index) {
                this.options = [];
                this.value = "";
                this.nextRadioValue = this.radioButton.report[index].type_name;
                let typeIndex = this.radioButton.report[index].id;
                this.reportTopic(typeIndex);
            },
            difficulty() {
                return this.$httpConfig.uploadImageByImageComment;
            },
            succeed(response, file, fileList) {
                //判断有没有上传图片
                this.resStatus = fileList;
                //存储删除的状态
                this.checkPic.push(Number(response.status));
                //将传入的图片放进数组
                this.picArr.push(response.data);
                this.figureCollection.push(file.response.data);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleRemove(file, fileList) {
                let index = this.figureCollection.indexOf(file.response.data);
                if (index > -1) {
                    this.figureCollection.splice(index, 1);
                    this.picArr.splice(index, 1);
                    this.checkPic.splice(index, 1);
                }
                //后台删除当前图片
                this.HTTP(
                    this.$httpConfig.uploadImageByImageComment,
                    {
                        fileName: file.response.data
                    },
                    "post"
                )
                    .then(e => {
                        console.log(e);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            beyond() {
                this.$message.warning("做多五张图片");
            },
        },
        mounted(){
            this.report();
            this.reportTopic();
            this.commitReport();
        }
    }
</script>

<style lang="less" scoped>
    .report {
        width: 100%;
        height: auto;
        background: #ffffff;

        .report_page {
            padding: .2rem;
        }
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
    /*.image {*/
    /*    padding: .2rem 0;*/
    /*    img {*/
    /*        width: 7rem;*/
    /*        background-size: 100% 100%;*/
    /*    }*/
    /*}*/
    .step {
        padding: .8rem 0 .2rem 0;
        .step_text {
            color: #d02629 !important;
            border-color: #d02629 !important;
        }
        .el-steps--horizontal {
            width: 7rem;
        }
        .el-step__head.is-success {
            color: #d02629 !important;
            border-color: #d02629 !important;
        }
        .el-step__title.is-success {
            color: #d02629 !important;
        }
        .el-step__title {
            font-size: .28rem;
            line-height: .8rem;
        }
    }
    .shop {
        margin: .2rem 0;
        background: #f6f6f6;
        padding: .4rem;
        p {
            display: inline-block;
            font-size: .28rem;
            color: #333333;
        }
        span {
            margin-left: .6rem;
            cursor: pointer;
            font-size: .28rem;
            color: #333333;
            &:hover {
                color: rgb(134, 163, 226);
            }
        }
    }
    .detail {
        .top {
            margin-left: .5rem;
            h5 {
                font-size: .28rem;
                color: #333333;
                padding-bottom: .2rem;
            }
            img {
                width: 5rem;
                height: 5rem;
                background-size: 100% 100%;
                margin-left: .5rem;
            }
        }
        .inner {
            span {
                font-size: .28rem;
                color: #333333;
                padding-right: .1rem;
                line-height: 1.5;
            }
            & :nth-child(2) {
                color: #333333;
                cursor: pointer;
                &:hover {
                    color: rgb(134, 163, 226);
                }
            }
            margin-left: .5rem;
            margin-top: .2rem;
        }
    }
    .type {
        margin: .5rem .5rem 0 .5rem;
        font-size: .28rem;
        color: #333;
        .container-radio {
            padding: .2rem 0;
            .el-radio {
                color: #606266;
                cursor: pointer;
                width: 4rem;
                height: .6rem;
                font-size: .28rem;
            }
        }
    }
    .select-option {
        margin-left: .5rem;
        span {
            display: inline-block;
            margin-right: .35rem;
            font-size: .28rem;
            color: #333333;
        }
        .el-input {
            position: relative;
            font-size: .28rem;
            display: inline-block;
            width: 100%;
        }
    }
    #select-change {
        .el-select-dropdown .el-popper {
            min-width: 213px;
            position: absolute;
            top: 1212px;
            left: 697px !important;
            transform-origin: center top;
            z-index: 2001;
        }
    }
    .content {
        margin: .5rem;
        font-size: .28rem;
        color: #333333;
        .el-textarea {
            position: relative;
            display: inline-block;
            width: 100%;
            vertical-align: bottom;
            font-size: .28rem;
            padding-top: .2rem;
        }
    }
    .pic {
        margin: .5rem;
        font-size: .28rem;
        color: #333333;
        .pic_div {
            padding-top: .2rem;
        }
        .el-upload--picture-card i {
            font-size: 28px;
            color: #8c939d;
            padding-top: .9rem;
        }
    }
    .notice {
        margin: .5rem;
        text-align: center;
        .button {
            background: red;
            width: 1.5rem;
            height: .6rem;
            text-align: center;
            border: none;
            border-radius: .1rem;
            color: #fff;
            font-size: .28rem;
        }
    }
</style>