<template>
    <div class="inform-wrapper">
        <div class="table-list" v-if="showListData">
            <com-header></com-header>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="相关产品" width="100">
                    <template slot-scope="scope">
                        <span id="goods-title">{{ scope.row.title }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="原因" width="60">
                    <template slot-scope="scope">
                        <span id="goods-content">{{ scope.row.content }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="举报时间" width="90">
                    <template slot-scope="scope">
                        <span>{{ scope.row.create_time | formatDate }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="60">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == 0">待审核</span>
                        <span v-else>处理成功</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                        <el-button
                            style="margin-bottom: .1rem;"
                            size="mini"
                            @click="handleCheck(scope.$index, scope.row)"
                            >查看</el-button
                        >
                        <el-button
                            style="margin-left: 0rem;"
                            size="mini"
                            type="danger"
                            @click="handleCancel(scope.$index, scope.row)"
                            >取消</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
<!--            <el-pagination-->
<!--                @size-change="handleSizeChange"-->
<!--                @current-change="handleCurrentChange"-->
<!--                :current-page="currentPage"-->
<!--                :page-size="pagesize"-->
<!--                layout="total, sizes, prev, pager, next, jumper"-->
<!--                :total="total"-->
<!--            >-->
<!--            </el-pagination>-->
        </div>

        <div class="wrapper-contailer" v-if="showFirstList">
          <!--  <com-header></com-header>-->
           <!-- <div class="process">
                <img src="../../assets/notice_1.jpg" alt="" />
            </div>-->
            <header class="violation-header">
                <span @click="btnGo" class="btnGo"></span>
                <div class="header-text">举报违规</div>
                <img src="../../assets/about.png" class="btn-ng clearfix" v-if="!btn" v-show="!set" @click="addClass">
            <transition name="fade">
				<div class="box-wrap" v-if="sta">
					<div class="box-bg" @click="addClass"></div>
					<div class="bomb-box">
						<div class="polygon"></div>
						<div class="btn" @click="toLink('/home')">
							<span class="icon"><i></i></span>首页
						</div>
						<div class="btn">
							<span class="icon" @click="toLink('/myNews')"><i></i></span>消息
						</div>
						<div class="btn">
							<span class="icon" @click="popupVisible=true"><i></i></span>分享
						</div>
					</div>
				</div>
			</transition>
            </header>
            <div class="fill">
                <div class="mer-text">被举报商家</div>
                <div class="store-text">{{noticeInfo.shop}}</div>
            </div>
            <div class="card">
                <div class="cart-title">相关商品</div>
                <div class="sec-card">
                    <div class="photo">
                        <img :src="URL + productInform.img[0].pic_url">
                    </div>
                    <div class="title">{{productInform.title.title}}</div>
                </div>
            </div>
            <div class="repo-fill" @click="popupVisible=true">
                <div v-if="nextRadioValue === ''" class="choice">
                    <div class="report-text">举报类型</div>
                     <div class="pic-text">图片侵权</div>
                     <div class="image">
                         <img src="../../assets/vioback.png">
                     </div>
                </div>
                <div v-else class="choice">
                    <div class="report-text">举报类型</div>
                    <div class="pic-text">{{nextRadioValue}}</div>
                    <div class="image">
                        <img src="../../assets/vioback.png">
                    </div>
                </div>
            </div>
            <mt-popup v-model="popupVisible" position="bottom" class="pop-rad">
                <div class="type">
                    <div class="rad-title">举报类型</div>
                    <div class="container-radio">
                        <el-radio-group v-model="radio" @change="handleRadioChange">
                            <el-radio
                                    :label="index"
                                    v-for="(item, index) in noticeInfo.report"
                                    :key="index"
                            >{{ item.type_name }}</el-radio
                            >
                        </el-radio-group>
                    </div>
                    <button class="red-btn" @click="popupVisible=false">提交</button>
                </div>
            </mt-popup>
           <!-- <div class="shop">
                <p>被举报商家</p>
                <span @click="goShopDetail">{{ noticeInfo.shop }}</span>
            </div>-->
            <div class="detail" v-if="noticeInfo.title">
                <div class="top">
                    <h5>相关商品</h5>
                    <img :src="imgUpload + noticeInfo.title.pic_url" alt="" />
                </div>
                <div class="inner">
                    <span>商品名称:</span>
                    <span @click="goGoodsDetail">
                        {{ noticeInfo.title.title }}
                    </span>
                </div>
            </div>
            <div class="select-option">
                <span>举报主题 :</span>
                <el-select
                    id="select-change"
                    v-model="value"
                    placeholder="请选择"
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
                <el-input
                    type="text"
                    :rows="4"
                    placeholder="请描述详细情况，有助于举报快速处理"
                    v-model="textarea"
                >
                </el-input>
            </div>
            <div class="pic">
                图片 :
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
                    <img width="100%" :src="dialogImageUrl" alt="" />
                </el-dialog>
            </div>
            <div class="describe">
                <div class="describe-text">1. 请提供充分的证据确保举报成功,珍惜会员权利,帮助更好管理会员网站</div>
                <div class="describe-text">2. 被举报商品信息不能反复提交,下架商品不能举报,商家继续上传违规商品可进行举报</div>
                <div class="describe-text">3. 举报进针对商品本身,若产生纠纷可进行投诉</div>
                <div class="describe-text">4. 举报按顺序进行,上传图片包括三张</div>
            </div>
            <div class="notice">
                <div class="btn" @click="submit">提交</div>
            </div>
        </div>
        <!-- 显示单条数据 -->
        <singal-data
            v-if="showSingalData"
            @cancel="handleSingalCancel"
            :singalData="singalData"
            @goShopHome="goShopHome"
            @goGoodsHome="goGoodsHome"
        ></singal-data>
        <!-- 二级列表 -->
        <second-list
            v-if="showSecondList"
            :nextRadioValue="nextRadioValue"
            :nextSelectValue="nextSelectValue"
            :receivedValue="receivedValue"
            :picArr="picArr"
            @confirm="confirm"
            @enterShopName="enterShopName"
            @enterGoodsDetail="enterGoodsDetail"
            :noticeInfo="noticeInfo"
            :store_id="store_id"
            :main_id="main_id"
        ></second-list>
        <!-- 提交成功显示的数据 -->
        <success-data
            v-if="showSuccessData"
            @handleBack="handleBack"
        ></success-data>
        <!-- 取消投诉的提示信息 -->
        <cancel-notice
            v-if="showCancelMessage"
            :cancelIndex="cancelIndex"
            @handleYse="handleYes"
            @handleNo="handleNo"
        ></cancel-notice>
    </div>
</template>

<script>
import SecondList from "./backInform";
import ComHeader from "./comHeader";
import SingalData from "./informSingalData";
import SuccessData from "./submitSuccess";
import CancelNotice from "./cancelNotice";
export default {
    data() {
        return {
            popupVisible: false,
            popupVisible2: false,
            sta: false,
            file: "",
            saveArr: [],
            computedArr: [],
            goodsTitle: "",
            shopName: "",
            currentPage: 1, //初始页
            cancelIndex: -1,
            checkPic: [], //检查图片是否满足要求
            message: "",
            // imgUpload: imgRequest + "/",
            imgUpload: URL,
            page: 1, //传的page
            pagesize: 10, //    每页的数据
            showListData: true, //列表数据
            figureCollection: [], //图片路径
            showFirstList: false,
            showSingalData: false,
            showSuccessData: false,
            showCancelMessage: false,
            tableData: [],
            singalData: {}, //显示单条数据
            picArr: [], //接受多张图片
            resStatus: "", //正确获取图片状态
            showSecondList: false,
            radioValue: "",
            noticeInfo: {},
            main_id: 0,
            store_id: 0,
            radio: "",
            receivedValue: "", //接受输入框值
            options: [],
            value: "",
            textarea: "",
            total: 0,
            productInform:{},
            dialogImageUrl: "",
            dialogVisible: false,
            nextRadioValue: "", //提交之后单选值
            nextSelectValue: "" ,//提交之后下拉框值
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

    components: {
        SecondList,
        ComHeader,
        SingalData,
        SuccessData,
        CancelNotice
    },
    props: {
        btn: null,
        set: null,
    },
    created() {
        if (this.$route.query.notice == 1) {
            this.showFirstList = true;
            this.showListData = false;
        }
        this.main_id = this.$route.query.main_id;
        this.store_id = this.$route.query.store_id;

        let title = "举报违规" + sessionStorage.getItem('titleKey') + '-' + sessionStorage.getItem('updateDescription');
        this.showScroll.scrollTitle(title);
        this.productInform = JSON.parse(sessionStorage.getItem('productInform'))
    },
    mounted() {
        //举报显示
        this.getNoticeInfo();
        // this.getNoticeType();
        //列表数据
        this.getTableData();
    },
    methods: {
        addClass() {
            if(this.sta == false) {
                this.sta = true;
            } else {
                this.sta = false;
            }
        },
        btnGo(){
            this.$router.go(-1);
        },
        showTitle() {
            let title =
                this.goodsTitle +
                "-" +
                this.shopName +
                sessionStorage.getItem('titleKey') + '-' + sessionStorage.getItem('updateDescription');
            this.showScroll.scrollTitle(title);
        },
        //单条数据返回店铺
        goShopHome(goods_id) {
            this.$router.push({
                path: "storehome",
                query: {
                    id: goods_id
                }
            });
        },
        //单条数据进入商品详情
        goGoodsHome(store_id) {
            this.$router.push({
                path: "/shopsn_product",
                query: {
                    id: store_id
                }
            });
        },
        //举报成功返回主页
        handleBack() {
            this.showListData = true;
            this.showSuccessData = false;
        },
        //取消举报
        handleYes(index) {
            this.tableData.splice(index, 1);
            this.showCancelMessage = false;
            this.$message.success("取消成功");
        },
        //不取消举报
        handleNo() {
            this.showCancelMessage = false;
        },
        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange(size) {
            this.pagesize = size;
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            this.getTableData();
        },
        //进入商品详情
        goGoodsDetail() {
            this.$router.push({
                path: "/shopsn_product",
                query: {
                    id: this.$route.query.main_id
                }
            });
        },

        //跳转店铺详情
        goShopDetail() {
            this.$router.push({
                path: "storehome",
                query: {
                    id: this.$route.query.store_id
                }
            });
        },
        //二级列表进入店铺详情
        enterShopName(id) {
            this.$router.push({
                path: "storehome",
                query: {
                    id: this.$route.query.main_id
                }
            });
        },
        //二级列表进入商品详情
        enterGoodsDetail(id) {
            this.$router.push({
                path: "/shopsn_product",
                query: {
                    id: id
                }
            });
        },
        getTableData() {
            this.$HTTP(
                this.$httpConfig.noticeList,
                {
                    page: this.currentPage
                },
                "post"
            )
                .then(res => {
                    if (res.data.status == 10001) {
                        this.$router.push("/Login");
                        return;
                    }
                    this.total = Number(res.data.data.count);

                    this.tableData = res.data.data.list;
                })
                .catch(err => {
                    console.error(err);
                });
        },
        //上传路径
        difficulty() {
            return this.$httpConfig.uploadImage;
        },
        //上传成功，在数组中添加获取后的路径
        succeed(response, file, fileList) {
            //判断有没有上传图片
            this.resStatus = fileList;
            //存储删除的状态
            this.checkPic.push(Number(response.status));
            //将传入的图片放进数组
            this.picArr.push(response.data);
            this.figureCollection.push(file.response.data);
        },
        //取消图片上传
        handleRemove(file, fileList) {
            let index = this.figureCollection.indexOf(file.response.data);
            if (index > -1) {
                console.log("index值:" + index);
                this.figureCollection.splice(index, 1);
                this.picArr.splice(index, 1);
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
        //下拉框显示的数据
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
        //获取举报类型数据
        getNoticeInfo() {
            this.$HTTP(
                this.$httpConfig.noticeReport,
                {
                    goods_id: this.$route.query.goods_id,
                    store_id: this.$route.query.store_id
                },
                "post"
            )
                .then(res => {
                    this.noticeInfo = res.data.data;
                    this.goodsTitle = res.data.data.title.title;
                    this.shopName = res.data.data.shop;
                    if (this.$route.query.notice == 1) {
                        this.showTitle();
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        },
        handleCheck(index, row) {
            this.showListData = false;
            this.showFirstList = false;
            this.showSecondList = false;
            this.showSingalData = true;
            //处理每条数据
            this.getSingleData(row.id);
        },
        getSingleData(id) {
            this.$HTTP(
                this.$httpConfig.noticeCheckSingle,
                {
                    id: id
                },
                "post"
            )
                .then(res => {
                    this.singalData = res.data.data;
                    sessionStorage.setItem(
                        "singalKey",
                        JSON.stringify(this.singalData)
                    );
                })
                .catch(err => {
                    console.error(err);
                });
        },
        handleCancel(index, row) {
            this.$HTTP(
                this.$httpConfig.cancelNotice,
                {
                    id: row.id
                },
                "post"
            )
                .then(res => {
                    if (res.data.status == 1) {
                        this.showCancelMessage = true;
                        this.cancelIndex = index;
                    } else {
                        this.$message.error("操作失败");
                        return;
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        },
        //单选框选中值
        handleRadioChange(index) {
            this.options = [];
            this.value = "";
            this.nextRadioValue = this.noticeInfo.report[index].type_name;
            let typeIndex = this.noticeInfo.report[index].id;
            this.getNoticeType(typeIndex);
        },
        //下拉框选中值
        handleSelectChange(val) {
            this.nextSelectValue = this.value;
        },
        // 图片最大数之后
        beyond() {
            this.$message.warning("做多五张图片");
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        confirm() {
            this.showListData = false;
            this.showFirstList = false;
            this.showSecondList = false;
            this.showSingalData = false;
            this.showSuccessData = true;
        },
        handleSingalCancel() {
            this.showListData = true;
            this.showFirstList = false;
            this.showSecondList = false;
            this.showSingalData = false;
        },
        submit() {
            if (this.nextRadioValue == null || this.nextRadioValue == "") {
                this.$message.error("请选择举报类型");
                return;
            }/* else if (this.value == null || this.value == "") {
                this.$message.error("请选择举报主题");
                return;
            }*/ else if (this.textarea.match(/^\s*$/)) {
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
                            // this.$router.go(-1);
                            this.$message.success(res.data.message);
                            this.showFirstList = false;
                            this.showSecondList = true;

                            this.$router.push({
                                name: "product",
                                params: {
                                    id: this.$route.query.goods_id,
                                    status: 1
                                }
                            });

                        } else {
                            this.$message.error("操作失败");
                            return;
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        }
    }
};
</script>
<style lang="less">
    .inform-wrapper .el-input__inner {
        /* margin-left: 18px; */
        width: 95%;
        border: none;
    }
    .el-radio__inner {
        border: .02rem solid #DCDFE6;
        border-radius: 100%;
        width: .5rem;
        height: .5rem;
        background-color: #FFF;
        cursor: pointer;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin: 0 -7rem 0 6rem;
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
</style>
<style lang="less">
#goods-title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 可以显示的行数，超出部分用...表示*/
    -webkit-box-orient: vertical;
}
#goods-content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 可以显示的行数，超出部分用...表示*/
    -webkit-box-orient: vertical;
}
.inform-wrapper .el-input__inner {
    margin-left: 0;
}
.el-textarea__inner {
    margin-top: .2rem;
}
.el-table__header {
    width: 100% !important;
}
.el-table__body {
    width: 100% !important;
}
.el-upload--picture-card {
    margin-top: .2rem !important;
}
.el-table__body-wrapper {
    overflow: hidden;
    position: relative;
    border-bottom: 1px solid #000;
}
</style>
<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0
}
.box-wrap {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 99;
    .box-bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }
    .bomb-box {
        background: #535353;
        padding: .11rem;
        box-sizing: border-box;
        position: absolute;
        right: .15rem;
        top: .8rem;
        border-radius: 5px;
        z-index: 99999;
        .polygon {
            width: .4rem;
            height: .4rem;
            position: absolute;
            top: 0;
            left: .8rem;
            transform: rotate(45deg);
            background: #535353;
        }
        .btn:nth-child(2) {
            border-bottom: 1px solid #666;
            color: #fff;
            .icon {
                i {
                    width: .24rem;
                    height: .24rem;
                    background: url(../../assets/home.png) no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
        .btn:nth-child(3) {
            border-top: 1px solid #444;
            color: #fff;
            .icon {
                i {
                    width: .24rem;
                    height: .24rem;
                    background: url(../../assets/news1.png) no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
        .btn:nth-child(4) {
            border-top: 1px solid #444;
            color: #fff;
            .icon {
                i {
                    width: .24rem;
                    height: .24rem;
                    background: url(../../assets/sharebtn.png) no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
        .btn {
            width: 1.1rem;
            height: .56rem;
            box-sizing: border-box;
            text-align: center;
            line-height: .56rem;
            position: relative;
            padding-left: .5rem;
            font-size: .24rem;
            .icon {
                position: absolute;
                left: 0;
                top: 0;
                width: .56rem;
                height: 100%;
                margin: 0;
                border: none;
                background: none;
                i {
                    position: absolute;
                    left: 0%;
                    top: 0%;
                    bottom: 0;
                    right: 0;
                    margin: auto;
                }
            }
        }
    }
}
.inform-wrapper {
    float: left;
    width: 100%;
    height: auto;
    background: #FFF;
    .violation-header {
        background: #D22529;
        height: 1rem;
        line-height: 1rem;
        display: flex;
        .btnGo {
            margin: .22rem .2rem 0 .2rem;
            width: .45rem;
            height: .45rem;
            background: url(../../assets/arrow1@2x.png) no-repeat;
            background-size: 100% 100%;
        }
        .header-text {
            font-size: .45rem;
            padding: 0 1rem 0 2rem;
            color: #fff;
        }
        .btn-ng {
			position: absolute;
			top: .25rem;
			right: .2rem;
			width: .45rem;
			height: .45rem;
			span {
				display: block;
				border: .024rem solid #fff;
				border-radius: 50%;
				box-sizing: border-box;
				margin-left: .076rem;
				margin-top: .19rem;
			}
		}
    }
    .fill{
        display: flex;
        background-color: #ffffff;
        padding: .33rem .2rem;
        margin: .3rem 0;
        .mer-text{
            font-size: .33rem;
            padding: 0 3.5rem 0 0;
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
    .repo-fill {
        background-color: #ffffff;
        padding: .33rem .2rem;
        margin: .3rem 0;
        .choice{
            display: flex;
        .report-text {
            font-size: .33rem;
            padding: 0 2rem 0 0;
        }

        .el-input {
            position: relative;
            font-size: .26rem;
            display: inline-block;
            width: 100%;
        }

        .pic-text {
            font-size: .33rem;
            color: #999999;
            padding: 0 .5rem 0 0;
            width: 40%;
        }

        .image {
            img {
                width: .2rem;
            }
        }
    }
    }
    .pop-rad{
        width: 100%;
        .type {
            .rad-title{
                font-size: .3rem;
                text-align: center;
                border-bottom: .03rem solid #f1f1f1;
                padding: .2rem 0 .3rem 0;
            }
            .container-radio {
                padding: .2rem 0;
                .el-radio {
                    color: #606266;
                    cursor: pointer;
                    width: 100%;
                    padding: .3rem;
                    border-bottom: .03rem solid #f1f1f1;
                }
            }
            .red-btn{
                padding: .2rem;
                width: 100%;
                border: none;
                margin: 2rem 0 0 0;
                background-color: #D22529;
                color: white;
                font-size: .3rem;
            }
        }
    }
    .table-list {
        h1 {
            font-size: .34rem;
            border-bottom: 1px solid #e3e3e3;
        }
    }
    .el-table--fit {
        border-right: 0;
        border-bottom: 0;
        margin-bottom: .2rem;
        padding: 0 .2rem;
    }
    .wrapper-contailer {
        .process {
            padding: .2rem 0;
                img {
                    width: 7.4rem;
                    background-size: 100% 100%;
                }
        }
        .shop {
            margin: .2rem;
            background: #f6f6f6;
            padding: .4rem;
            p {
                font-size: .26rem;
                color: #333333;
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
                h5{
                    font-size: .26rem;
                    color: #333333;
                    padding-bottom: .2rem;
                    // margin-left: .1rem;
                }
                margin-left: .2rem;

                img {
                    width: 5.3rem;
                    height: 6rem;
                    background-size: 100% 100%;
                    margin-left: .9rem;
                }
            }
            .inner {
                span {
                    font-size: .26rem;
                    color: #333333;
                    padding-right: .1rem;
                    line-height: 1.5;
                }
                & :nth-child(2) {
                    cursor: pointer;
                    &:hover {
                        color: rgb(134, 163, 226);
                    }
                }
                margin-left: .2rem;
                margin-top: .2rem;
            }
        }
        .select-option {
            background: #ffffff;
            padding: .2rem 0;
            span {
                display: inline-block;
                padding: 0 1rem 0 .2rem;
                font-size: .26rem;
                color: #333333;
            }
            .el-input {
                position: relative;
                font-size: .26rem;
                display: inline-block;
                width: 100%;
            }
        }
       /* .content {
            margin: .5rem;
            font-size: .26rem;
            color: #333333;
            .el-textarea {
                position: relative;
                display: inline-block;
                width: 100%;
                vertical-align: bottom;
                font-size: .28rem;
                padding-top: .2rem;
            }
        }*/
        .content{
            display: flex;
            background-color: #ffffff;
            padding: .33rem .2rem;
            margin: .3rem 0;
            .content-text{
                font-size: .33rem;
                width: 23%;
                padding: .2rem 0 0 0;
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
        .describe{
            padding: .3rem .2rem;
            .describe-text{
                font-size: .3rem;
                color: #555555;
                line-height: .5rem;
            }
        }
        .notice {
            margin: .5rem;
            .btn {
                font-size: .3rem;
                padding: .1rem;
                background: #D22529;
                width: 90%;
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
}
</style>
