<template>
    <div class="shopping-cart">
        <div class="header">
            <i class="fa-solid fa-circle-chevron-left" id="backbtn" @click="back"></i>
            <div class="title">Shopping Cart</div>
        </div>
        <div>
            <dl class="mark-wrap" v-for="(items,index1) in cartdata" v-bind:key="index1">
				<dt>
                    <label class="checkBoxOri" :class="{active:items.checked}">
                        <span></span>
                    </label>
					<span class="shop-name">{{items.store_name}}</span>
					<span class="delete">Delete</span>
				</dt>
                <dd class="clearfix clearfix1" 
                    v-for="(item,index) in 2" 
                    :key="item.id" 
                    :class="{active:!total.deit}">
                    <label
                    class="checkBox"
                    :class="{active:item.checked}"
                   
                    checked
                    >
                        <span></span>
                    </label>
                    <label
                        v-show="isEdit"
                        class="checkBox"
                        :class="{active:item.checked}"
                  
                        checked
                    >
                        <span></span>
                    </label>
                    <img src="../../assets/showlaptop.jpg" class="fl">
                    <div class="pull-right fl">
                        <p class="text">title</p>
                        <div class="price">20000 ks</div>
                        <div class="old-price">15000 ks</div>
                        <div class="quantity">
                            <button @click="reduceRice">-</button>
                            <input type="text" class v-model="rice" @blur.prevent="minRice" />
                            <button class="rightB" @click="plusRcie">+</button>
                        </div>
                    </div>
                </dd>
			</dl>
        </div>
    </div>
</template>
<script>
import { MessageBox, Toast } from "mint-ui";
import qs from "qs";
    export default {
    name: "cart",
    data() {
        return {
            cartdata: [
            {   "id":1,
                "store_name":"ABC",
                "checked":"1",
            },

            {   "id":2,
                "store_name":"City Mark",
                "checked":"0",
            },

            {   "id":3,
                "store_name":"mall",
                "checked":"1",
            },
        ],
        total: {
            deit: true,
        },
        isEdit: true,
        rice: 1,
        };
    },
    methods:{
        back() {
            this.$router.go(-1);
        },
        reduceRice() {
          if (this.rice <= 1) return;
          this.rice = (this.rice - 1);
        },
        plusRcie() {
          this.rice = (Number(this.rice) + 1);
        },
    }
    };
</script>
<style lang="less">
.shopping-cart{
    .header{
        display: flex;
        padding: 0.3rem 0.2rem;
        background: #fff;
        border-bottom: .01rem solid #f1f1f1;
        background: linear-gradient(to right,#014E40 0,#25a5d8 100%);
        #backbtn{
            font-size: .4rem;
            color: #fff;
        }
        .title{
            font-size: .3rem;
            margin-left: 2.1rem;
            color: #fff;
        }
    }
    .mark-wrap {
        margin-bottom: 0.2rem;
    dt {
        box-sizing: border-box;
        width: 100%;
        height: 0.9rem;
        line-height: 0.9rem;
        text-align: center;
        font-size: 0.32rem;
        background: #fff;
        border-bottom: 1px solid #dfdfdd;
        position: relative;
        .checkBoxOri {
            position: absolute;
            left: 0.2rem;
            top: 0;
            width: 0.7rem;
            height: 100%;
            z-index: 1;
            span {
                position: absolute;
                top: 50%;
                left: 0;
                margin-top: -0.2rem;
                width: 0.4rem;
                height: 0.4rem;
                border: 1px solid #8d8d8d;
                border-radius: 50%;
                text-align: center;
                line-height: 0.4rem;
                font-size: 0.3rem;
                color: #f9781e;
            }
        }
        .shop-name{
            font-size: .26rem;
            left: 0.9rem;
            position: absolute;
            color: @main-color;
            font-weight: bold;
        }
        .delete{
            font-size: .26rem;
            right: 0.2rem;
            position: absolute;
            color: @main-color;
            font-weight: bold;
        }
  }
  dd.active {
    background: #fafafa;
  }
  dd + dd {
    border-top: 1px solid #dfdfdd;
  }
  dd {
    background: #fff;
    padding: 0.25rem .2rem;
    height: 1.55rem;
    position: relative;
    .checkBox.active {
        span {
        border: none;
        width: 0.44rem;
        height: 0.44rem;
        background: url(../../assets/check_bj.png) no-repeat;
        background-size: 100% 100%;
        }
    }
    .checkBox {
        position: absolute;
        left: 0.2rem;
        width: 0.7rem;
        span {
        position: absolute;
        margin-top: 0.5rem;
        width: 0.4rem;
        height: 0.4rem;
        border: 1px solid #8d8d8d;
        border-radius: 50%;
        text-align: center;
        line-height: 0.4rem;
        font-size: 0.3rem;
        color: #f9781e;
        }
    }
    img {
      width: 1.55rem;
      height: 1.55rem;
      margin-left: 0.7rem;
    }
    .pull-right {
      padding-left: 0.2rem;
      .text {
        width: 4.6rem;
        height: 0.65rem;
        font-size: 0.24rem;
        color: @product-title;
        line-height: 0.32rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
        .price {
            font-size: 0.26rem;
            color: @price-color;
        }
        .old-price {
            font-size: 0.24rem;
            text-decoration: line-through;
            color: #999;
            line-height: .5rem;
        }
        .quantity {
            overflow: hidden;
            display: flex;
            right: 0.2rem;
            position: absolute;
            top: 1.3rem;
            button {
                width: 0.6rem;
                border: none;
                font-size: 0.33rem;
                line-height: 0.4rem;
                outline: none;
                height: .4rem;
                background: #f1f1f1;
                color: #8b8b8b;
            }
            button:nth-child(1) {
            margin-right: 0.1rem;
            }

            .rightB {
            margin-left: 0.1rem;
            }

            input {
            width: 1.4rem;
            height: .4rem;
            border: 1px solid #f1f1f1;
            text-align: center;
            font-size: 0.26rem;
            color: #000;
            padding-left: 0.1rem;
            }
        }
    }
  }
}
}
</style>