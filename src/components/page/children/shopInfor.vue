<template>
    <div class="box">
        <div class="header">
            <img v-show="shopData.store_logo" :src="URL+shopData.store_logo" alt="" @click="toShop">
            <div class="shopNameCss">
                <h4 @click="toShop">{{shopData.shop_name}}</h4>
                <h6 class="description" @click="toShop">{{shopData.description}}</h6>
            </div>
            <el-dropdown v-if="shopData.store_grade_name">
                <span class="shop-gradename">{{shopData.store_grade_name}}</span>
                <el-dropdown-menu slot="dropdown" v-if="shopData.classification">
                <el-dropdown-item>{{shopData.classification}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <ul class="cotent" @click="toShop">
            <li>
                <h4>{{shopData.goodsNumber}}</h4>
                <p>全部宝贝</p>
            </li>
            <li>
                <h4>{{shopData.store_collect}}</h4>
                <p>关注人数</p>
            </li>
            <li>
                <p>描述相符: <span>{{shopData.desccredit}}</span></p>
                <p>服务态度: <span>{{shopData.servicecredit}}</span></p>
                <p>发货速度: <span>{{shopData.deliverycredit}}</span></p>
            </li>
        </ul>
        <div class="footer">
            <div @click="toShopList">查看分类</div>
            <div @click="toShop">进店逛逛</div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
            }
        },
        props:{
            shopData:'',
            data:''
        },
        methods: {
            toShopList(){
                event.stopPropagation();
                this.$router.push({
                    name:'shoplist',
                    params:{
                        id:this.data.goods.store_id
                    }})
            },
            toShop(){
                this.$router.push({
                    name:"shopHome",
                    params:{
                        id:this.data.goods.store_id,
                        index:0
                    }})
            }
        }
    }
</script>
<style>
.el-popper[x-placement^=bottom] .popper__arrow {
  border-bottom-color: red !important;
  top: -6px !important;
}
.el-popper .popper__arrow {
  border-width: 6px;
  filter: drop-shadow(0 0.04rem .24rem rgba(0,0,0,.03));   
}
</style>
<style lang="less" scoped>

.el-dropdown{
    margin: .08rem 0 0 0;
}
.el-dropdown-menu {
    /* width: 230px !important; */
    position: absolute !important;
    margin: -.3rem 0 0 0 !important;
    background-color: #FFF;
    border: .02rem solid #de2d35;
    border-radius: .08rem;
    -webkit-box-shadow: 0 0.04rem .24rem 0 rgba(0,0,0,.1);
    box-shadow: 0 0.04rem .24rem 0 rgba(0,0,0,.1);
}
  .el-dropdown-menu:hover .row{
      color: #444 !important;
  }
.el-dropdown-menu__item {
  line-height: .2rem !important;
  font-size: .24rem !important;
  color:rgb(101, 101, 101) !important;
}
  .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
    color:rgb(101, 101, 101) !important;
    background-color: #ffffff !important;
  }

.el-popper .popper__arrow {
  border-width: 6px;
  filter: drop-shadow(0 0.04rem .24rem rgba(0,0,0,.03));   
}

.el-popper[x-placement^=bottom] .popper__arrow {
  border-bottom-color: red !important;
  top: -6px !important;
}
.el-popper .popper__arrow, .el-popper .popper__arrow:after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;  
}
</style>
<style lang="less" scoped>
    .box{
        .header{
            display: flex;
            border-top:1/100rem solid #F1F1F1;
            padding:25/100rem 0 20/100rem 0;
            .shopNameCss {
                width: 4.7rem;
            }
            img{
                margin: 0 25/100rem 0 20/100rem;
                width: 95/100rem;
                height: 95/100rem;
                border:1/100rem solid #F1F1F1;
            }
            h4{
                font-size: 36/100rem;
                margin-bottom: 10/100rem;
            }
            h6.description{
                color:#989898;
                display: -webkit-box;
                overflow: hidden;
                white-space: normal!important;
                text-overflow: ellipsis;
                word-wrap: break-word;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .shop-gradename{
                font-size: .25rem;
                background: #de2d35;
                color: white;
                border-radius: .05rem;
                padding: .05rem .1rem;
                text-align: center;
            }
        }
        .cotent{
            display: flex;
            li{
                width: 254/100rem;
                height: 115/100rem;
                border-right: 1/100rem solid #F1F1F1;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
            }
            h4{
                font-size: 32/100rem;
                margin-bottom:7/100rem;
            }
            p{
                margin: 3px 0;
                font-size: 18/100rem;
                color:#989898;
                line-height: 30/100rem;
            }
            span{
                color: #d02629;
                font-size: .21rem;
                padding: 0 0 0 .1rem;
            }
        }
        .footer{
            padding: 50/100rem 0;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid #f1f1f1;
            div{
                margin: 0 30/100rem;
                width: 150/100rem;
                height: 50/100rem;
                border:1/100rem solid #d02629;
                color: #d02629;
                border-radius: 50/100rem;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
</style>
