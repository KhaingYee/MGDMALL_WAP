<template>
    <div>
        <ul class="list-wrap" v-if="data">
            <li class="clearfix" v-for="item in data" :key="item.id">
                <img v-lazy="URL + item.image" class="fl" @click="tolink(item)">
                <div class="list-text fl">
                    <p class="text" @click="tolink(item)">{{item.title}}</p>
                    <p class="new-price" @click="tolink(item)" v-if="integral"><span>{{item.integral}}&nbsp;<em>积分</em></span></p>
                    <p class="new-price" @click="tolink(item)" v-if="!integral">￥<span>{{item.price_market}}</span></p>
                    <p class="status" @click="tolink(item)" v-if="!integral"><span>已有{{item.comment}}条评论</span><span>{{item.trade}}笔交易成功</span></p>
                    <p class="status" @click="tolink(item)" v-if="!integral" style="padding-top:.2rem;"><span>市场参考价：{{item.price_market}}元</span></p>
                    <div class="show-shop">
                        <div class="show-name" @click="goToShop(item.store_id)">{{item.shop_name}}</div>
                        <img @click="goToShop(item.store_id)" src="../../assets/btn-right.png" class="btn-shop" v-if="item.shop_name"/>
                        <el-dropdown v-if="item.store_grade_name">
                            <span class="shop-gradename">{{item.store_grade_name}}</span>
                            <el-dropdown-menu slot="dropdown" v-if="item.classification">
                                <el-dropdown-item>{{item.classification}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </li>
        </ul>
        <div class="text-center status" v-if="!data">没有此类商品！</div>

        <div class="load" v-show="load" @touchmove.prevent><mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner></div>
    </div>
</template>
<script>
   import qs from 'qs';
    export default {
        name:'searchList',
        data(){
            return {
                load_wrap:true
            }
        },
        props:{
            data:'',
            integral:'',
            load:''
        },
        watch:{
            integral(){
                return this.integral
            }
        },
        created(){
        	
        },
        methods:{
            goToShop(id){
				this.$router.push({
					name:"shopHome",
					params:{
					id:id,
					index:0
					}
				})
			},
            tolink(item){
                if(item.id){
                    this.$router.push({
                        name:'integralDetail',
                        params:{
                            id:item.id,
                            status:2,//积分
                            money:item.money
                        }
                    });
                }else{
                    this.$router.push({
                        name:'product',
                        params:{
                            id:item.id,
                            status:1//商品订单
                        }
                    });
                }
                
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
  margin: .03rem 0 0 0; 
  width: 2rem;  
}
.el-dropdown-menu {
    /* width: 230px !important; */
    position: absolute !important;
    margin: .13rem 0 0 0 !important;
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
    .status{
        padding-top:.2rem;
        font-size:.3rem;
        color:#333;
    }
    .list-wrap{
        padding-top:.3rem;
        background:#fff;
        li{
            padding:.13rem;
            height:2.3rem;
            border-bottom:1px solid #cbcbcb;
            img{
                width:2.2rem;
                height:2.2rem;
            }
            .list-text{
                width:4.3rem;
                padding-left:.25rem;
                .text{
                    font-size:.32rem;
                    color:#333;
                    line-height:.45rem;
                    overflow:hidden; 
                    text-overflow:ellipsis;
                    display:-webkit-box; 
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:2; 
                }
                .new-price{
                    font-size:.32rem;
                    color:#f23030;
                    padding-top:.1rem;
                    span{
                        font-size:.4rem;
                        font-weight:bold;
                        em{
                            font-style:normal;
                            font-size:.25rem;
                            color:#7c7c7d;
                            line-height: .25rem;
                        }
                    }
                }
                .status{
                    color:#ddd;
                    padding-top:.1rem;
                    span{
                        font-size:.24rem;
                    }
                    span:nth-child(2){
                        padding-left:.3rem;
                    }
                }
                .show-shop{
                    display: flex;
                    margin: .15rem 0 .05rem 0;
                    .show-name{
                        font-size: .24rem;
                        padding: .03rem .1rem 0 0;
                        color: #999999;
                    }
                    .btn-shop{
                        width: .18rem;
                        height: .2rem;
                        margin: .10rem .2rem 0 0;
                    }
                    .shop-gradename{
                        font-size: .22rem;
                        background: #de2d35;
                        color: white;
                        border-radius: .05rem;
                        padding: .05rem .1rem;
                        text-align: center;
                    }
                }  
            }
        }
    }
</style>