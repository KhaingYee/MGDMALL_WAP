<template>
    <div class="notice-list-wrapper">
        <com-header></com-header>

        <el-table :data="tableListData" style="width: 100%">
            <el-table-column label="相关产品" width="180">
                <template slot-scope="scope">
                    <span id="goods-title">{{ scope.row.title }}</span>
                </template>
            </el-table-column>
            <el-table-column label="举报原因" width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.content }}</span>
                </template>
            </el-table-column>
            <el-table-column label="举报时间" width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.create_time | formatDate }}</span>
                </template>
            </el-table-column>
            <el-table-column label="状态结果处理" width="180">
                <template slot-scope="scope">
                    <span v-if="scope.row.status == 0">待审核</span>
                    <span v-else>处理成功</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleCheck(scope.$index, scope.row)"
                        >查看</el-button
                    >
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleCancel(scope.$index, scope.row)"
                        >取消</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import ComHeader from "./comHeader";
export default {
    data() {
        return {
            tableListData: []
        };
    },
    mounted() {
        this.getNoticeList();
    },
    methods: {
        getNoticeList() {
            this.$HTTP(this.$httpConfig.noticeList, {}, "post")
                .then(res => {
                    this.tableListData = res.data.data.list;
                })
                .catch(err => {
                    console.error(err);
                });
        }
    },
    components: {
        ComHeader
    }
};
</script>

<style lang="less" scoped>
.notice-list-wrapper {
    background-color: #fff;
    float: left;
    width: 100%;
    height: 100%;
}
</style>
