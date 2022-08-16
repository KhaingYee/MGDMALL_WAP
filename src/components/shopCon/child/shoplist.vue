<template>
   <ul class="list-shop" id="list-shop">
            <li v-for="item in shoplist" :key="item.id">
                <div class="header">
                    <div class="title">
                        <img :src="URL+item.store_logo" alt="">
                        <div>
                            <h4>{{item.shop_name}}&nbsp;     
                            <el-dropdown v-if="item.store_grade_name">
                                <span class="shop-gradename">{{item.store_grade_name}}</span>
                                <el-dropdown-menu slot="dropdown" v-if="item.classification">
                                <el-dropdown-item>{{item.classification}}</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            </h4>
                            <p class="goods-num">销量{{item.store_sales}} &nbsp;&nbsp;共{{item.good_number}}件</p>
                        </div>
                    </div>
                    <router-link :to="{name:shopHome,params:{id:item.id,index:0}}" class="initShop" > 进店</router-link>
                </div>
                
                <div class="con">
                    <div  v-for=" val in item.store_goods" :key="val.id" @click="goproduct(val)">
                        <img v-if="val.pic_url" v-lazy="URL+val.pic_url" >
                        <img v-else :src="imgs" alt="">
                        <div>￥{{val.goods_price}}</div>
                    </div>
                </div>
               
            </li>
        </ul>
</template>
<script>
export default {
	  data () {
	      return {
	          imgs:require('@/assets/cp.png'),
	          shopHome:'shopHome'
	      }
      },
      methods:{
          goproduct(goods){
              this.$router.push({
                  name:"product",
                  params:{
                      id:goods.id,
                      status: 1
                  }
              })
          }
      },
	 
		props: ["shoplist"],
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
   
}
.el-dropdown-menu {
    /* width: 230px !important; */
    position: absolute !important;
    margin: .18rem 0 0 0 !important;
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
/*// 店铺分类*/
.list-shop{
    li{
        background-color: #fff;
        margin-top:20/100rem;
        padding:0 25/100rem 35/100rem;
        .header{
            display: flex;
            justify-content: space-between;
            align-items: center;
            img{
                width: 80/100rem;
                height: 70/100rem;
                margin-right:30/100rem;
            }
            .title{
                height: 130/100rem;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                h4{
                    font-size: 30/100rem;
                    .shop-gradename{
                        font-size: .23rem;
                        background: #de2d35;
                        color: white;
                        border-radius: .05rem;
                        padding: .05rem .1rem;
                        text-align: center;
                    }
                }
                .goods-num{
                    margin-top: .1rem;
                }
                h6{
                    font-size: 26/100rem;  
                }
            }
            .initShop{
                width: 100/100rem;
                height: 48/100rem;
                border-radius: 48/100rem;
                border:2/100rem solid #d02629;
                color: #d02629;
                 display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        .con{
            display: flex;
                justify-content: flex-start;
                align-items: center;
            div{
                margin:0 .05rem;
                margin-top:10/100rem;
                position: relative;
                width: 225/100rem;
                 img{
                     width: 100%;
                    
                }
                div{
                    display: flex;
                    justify-content:flex-end;
                    align-items: center;
                    margin:0;
                    position: absolute;
                    width: 100%;
                    height: .4rem;
                    bottom: 0;
                    padding:0 .15rem;
                    box-sizing: border-box;
                    background-color: rgba(0, 0, 0, .7);
                    font-size: 24/100rem;
                    color: #fff;
                }
            }
           
        }
    }
}
</style>

