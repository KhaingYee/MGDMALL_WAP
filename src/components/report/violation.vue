<template>
    <div class="viocontainer">
        <header class="violation-header">
            <span @click="btnGo" class="btnGo"></span>
            <div class="header-text">举报违规</div>
        </header>
        <div class="fill">
            <div class="mer-text">被举报商家</div>
            <div class="store-text" @click="popupVisible=true">美的空调官方旗舰店</div>
        </div>
        <mt-popup v-model="popupVisible" position="bottom" class="pop">
            <div class="rad-pop">
                <div class="rad-title">举报类型</div>
                <div class="first-rad" v-for="(item,index) in reports" :key="item.id" :id="id">
                    <div class="rad-text">{{item.type_name}}</div>
                    <div class="rad-choice">
                        <el-radio-group v-model="radio">
                            <el-radio :label="index"></el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <button class="red-btn">提交</button>
            </div>
        </mt-popup>
        <div class="card">
            <div class="cart-title">相关商品</div>
            <div class="sec-card">
                <div class="photo">
                    <img src="../../assets/sky.png">
                </div>
                <div class="title">洁妮维雅（NIVEA）保湿身体慕斯200ml滋润精华 身体乳 原装进口 去黑头</div>
            </div>
        </div>
        <div class="repo-fill">
            <div class="report-text">举报类型</div>
            <!-- <div class="pic-text">图片侵权</div>
             <div class="image">
                 <img src="../../assets/vioback.png">
             </div>-->
            <el-select
                    id="select-change"
                    v-model="value"
                    placeholder="图片侵权"
                    @change="handleSelectChange"
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
            <div class="content-text">举报内容</div>
            <!-- <div class="detail-text"> 请描述详细情况，有助于举报快速处理</div>-->
            <el-input
                    type="text"
                    :rows="4"
                    placeholder="请描述详细情况，有助于举报快速处理"
                    v-model="textarea"
            >
            </el-input>
        </div>
        <div class="pic">
            上传凭证 :
            <el-upload
                    :action="easy()"
                    list-type="picture-card"
                    :with-credentials="true"
                    :on-success="organizationsucceed"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="organizationhandleRemove"
                    :on-exceed="beyond"
                    :limit="1"
                    name="adv_content"
                    accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF,.PNG,"
            >
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
        </div>
        <div class="describe">
            <div class="describe-text">1. 请提供充分的证据确保举报成功,珍惜会员权利,帮助更好管理会员网站</div>
            <div class="describe-text">2. 被举报商品信息不能反复提交,下架商品不能举报,商家继续上传违规商品可进行举报</div>
            <div class="describe-text">3. 举报进针对商品本身,若产生纠纷可进行投诉</div>
            <div class="describe-text">4. 举报按顺序进行,上传图片包括三张</div>
        </div>
        <button class="btn-click">提交</button>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                dialogImageUrl: "",
                dialogVisible: false,
                popupVisible:false,
                radio: '',
                reports:[],
                value: "",
                options: [],
                textarea: "",
            }
        },
        created() {
            this.report();
        },
        mounted() {
            this.getNoticeType();
        },
        methods:{
            submit() {
                if (this.nextRadioValue == null || this.nextRadioValue == "") {
                    this.$message.error("请选择举报类型");
                    return;
                } else if (this.value == null || this.value == "") {
                    this.$message.error("请选择举报主题");
                    return;
                } else if (this.textarea.match(/^\s*$/)) {
                    this.$message.error("请输入举报内容");
                    return;
                } else if (this.resStatus.length == 0) {
                    this.$message.error("必须上传图片作为凭证");
                    return;
                } else if (this.checkPic.indexOf(0) != -1) {
                    try {
                        this.resStatus.forEach((el, index) => {
                            if (el.response.status == 0) {
                                setTimeout(() => {
                                    this.$message.error(
                                        "第" +
                                        (index + 1) +
                                        "图片的要求" +
                                        el.response.message
                                    );
                                }, 300);
                            }
                        });
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    //去除输入框带有空格的字符
                    this.receivedValue = this.textarea.replace(/\s+/g, "");
                    this.$HTTP(
                        this.$httpConfig.noticeSubmit,
                        {
                            goods_id: this.$route.query.goods_id,
                            store_id: this.$route.query.store_id,
                            content: this.receivedValue,
                            type: this.nextRadioValue,
                            topic: this.nextSelectValue,
                            pic_url: this.picArr.join(",")
                        },
                        "post"
                    )
                        .then(res => {
                            if (res.data.status == 1) {
                                this.$message.success(res.data.message);
                                this.showFirstList = false;
                                this.showSecondList = true;
                            } else {
                                this.$message.error("操作失败");
                                return;
                            }
                        })
                        .catch(err => {
                            console.error(err);
                        });
                }
            },
            btnGo(){
                this.$router.go(-1);
            },
            handleSelectChange(val) {
                this.nextSelectValue = this.value;
            },
            getNoticeType(index) {
                this.$HTTP(
                    this.$httpConfig.noticeType,
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
            handleRadioChange(index) {
                this.options = [];
                this.value = "";
                this.nextRadioValue = this.noticeInfo.report[index].type_name;
                let typeIndex = this.noticeInfo.report[index].id;
                this.getNoticeType(typeIndex);
            },
            easy() {
                return this.$httpConfig.uploadImage;
            },
            organizationsucceed(response, file, fileList) {
                //判断有没有上传图片
                this.resStatus = fileList;
                //存储删除的状态
                this.checkPic.push(Number(response.status));
                //将传入的图片放进数组
                this.organization_electronic.push(response.data);

                this.figureCollection.push(file.response.data);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            organizationhandleRemove(file, fileList) {
                let index = this.figureCollection.indexOf(file.response.data);
                if (index > -1) {
                    this.figureCollection.splice(index, 1);
                    this.organization_electronic.splice(index, 1);
                    this.checkPic.splice(index, 1);
                }
                //后台删除当前图片
                this.$HTTP(
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
            report(){
                this.axios.post(this.$httpConfig.noticeReport,  qs.stringify({
                    token: sessionStorage.getItem("data_token")
                }))
                    .then(res => {
                        this.reports = res.data.data.report
                    })
                    .catch(e => {console.log(e)})
            },
        }
    }
</script>

<style lang="less">
    .viocontainer{
        .violation-header {
            background: #D22529;
            height: 1rem;
            line-height: 1rem;
            display: flex;
            .btnGo {
                margin: .22rem .2rem 0 .2rem;
                width: .5rem;
                height: .5rem;
                background: url(../../assets/btn-returnvio.png) no-repeat;
                background-size: 100% 100%;
            }
            .header-text {
                font-size: .45rem;
                padding: 0 1rem 0 2rem;
                color: #fff;
            }
        }
        .fill{
            display: flex;
            background-color: #ffffff;
            padding: .33rem .2rem;
            margin: .3rem 0;
            .mer-text{
                font-size: .33rem;
                padding: 0 2.3rem 0 0;
            }
            .store-text{
                font-size: .33rem;
            }
        }
        .card{
            background-color: #ffffff;
            padding: .3rem 0;
            .cart-title{
                font-size: .3rem;
                padding: 0 .2rem .2rem .2rem;
                border-bottom: .03rem solid #f1f1f1;
            }
            .sec-card{
                padding: .2rem .2rem .1rem .2rem;
                display: flex;
                .photo{
                    img{
                        width: 2.3rem;
                        height: 2.3rem;
                    }
                }
                .title{
                    font-size: .3rem;
                    padding: .3rem 0 0 .2rem;
                    color: #999999;
                }
            }
        }
        .repo-fill{
            display: flex;
            background-color: #ffffff;
            padding: .33rem .2rem;
            margin: .3rem 0;
            .report-text{
                font-size: .33rem;
                padding: .2rem 1.3rem 0 0;
            }
            .el-input {
                position: relative;
                font-size: .26rem;
                display: inline-block;
                width: 100%;
            }
            .pic-text{
                font-size: .33rem;
                color: #999999;
                padding: 0 .5rem 0 1.7rem;
            }
            .image{
                img{
                    width: .2rem;
                }
            }
        }
        .content{
            display: flex;
            background-color: #ffffff;
            padding: .33rem .2rem;
            margin: .3rem 0;
            .content-text{
                font-size: .33rem;
                padding: 0 .2rem 0 0;
            }
            .detail-text{
                font-size: .32rem;
                color: #999999;
            }
        }
        .pic {
            margin: 0;
            padding: .2rem;
            font-size: .28rem;
            color: #333333;
            background: #ffffff;
            .pic_div {
                padding-top: .2rem;
            }
            .el-upload--picture-card i {
                font-size: 28px;
                color: #8c939d;
                padding-top: .9rem;
            }
            .image{
                margin: .5rem .2rem .3rem .2rem;
            }
        }
        .el-upload--picture-card {
            background-color: #fbfdff;
            border: .02rem dashed #c0ccda;
            border-radius: .12rem;
            box-sizing: border-box;
            width: 3rem;
            height: 3rem;
            line-height: 3rem;
            vertical-align: top;
        }
        .describe{
            padding: .3rem .2rem;
            .describe-text{
                font-size: .3rem;
                color: #555555;
                line-height: .5rem;
            }
        }
        .btn-click{
            background-color: #D22529;
            color: white;
            width: 91%;
            padding: .23rem 0;
            border: none;
            margin: .5rem .3rem 1rem .33rem;
            font-size: .3rem;
        }
        .rad-pop{
            width: 100%;
            .rad-title{
                font-size: .3rem;
                text-align: center;
                border-bottom: .03rem solid #f1f1f1;
                padding: .2rem 0 .3rem 0;
            }
            .first-rad{
                display: flex;
                width: 100%;
                border-bottom: .03rem solid #f1f1f1;
                .rad-text{
                    font-size: .3rem;
                    padding: .2rem 5rem 0 .3rem;
                    width: 100%;
                }
                .rad-choice{
                    width: 2rem;
                    height: .7rem;
                    padding: .2rem 0 0 0;
                }
            }
            .red-btn{
                padding: .2rem;
                width: 100%;
                border: none;
                margin: 3rem 0 0 0;
                background-color: #D22529;
                color: white;
                font-size: .3rem;
            }
        }
        .el-radio__inner {
            border: 1px solid #DCDFE6;
            border-radius: 100%;
            width: .5rem;
            height: .5rem;
            background-color: #FFF;
            cursor: pointer;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }
    }
</style>