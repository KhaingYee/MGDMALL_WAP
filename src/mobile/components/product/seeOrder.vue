<template>
    <div class="seeOrder">
        <div class="header">
            <i class="fa-solid fa-circle-chevron-left" id="backbtn" @click="back"></i>
            <div class="title">Check Out</div>
        </div>
        <div class="address">
            <div class="title">
                <span class="name">Address</span>
                <span class="edit" @click="gotoaddress">Edit</span>
            </div>
            <div class="detail">
                <i class="fa-solid fa-location-dot" id="img"></i>
                <div class="des">No(12),Hlaing,Yangon</div>
            </div>
            <div class="detail">
                <i class="fa-regular fa-user" id="img"></i>
                <div class="des">KYM</div>
            </div>
            <div class="detail">
                <i class="fa-solid fa-phone" id="img"></i>
                <div class="des">09768637387</div>
            </div>
        </div>
        <div class="order-product">
            <img src="../../assets/images/c2.png"/>
            <div class="detail">
                <div class="title">Acer Aspire 3 ( A314 ) ( Celeron ) Electric Blue Color, Laptop, Notebook, Office Laptop</div>
                <div class="price">10000 ks</div>
                <div class="qty-box">
                    Quanlity&nbsp;:&nbsp;
                    <span class="qty">1</span>
                </div>
            </div>
        </div>
        <div class="tax">
            <div class="total">
                <span class="name">Total</span>
                <span class="number">10000ks</span>
            </div>
            <div class="total">
                <span class="name">Delivery</span>
                <span class="number">1000ks</span>
            </div>
            <div class="total">
                <span class="name">Discount</span>
                <span class="number">100ks</span>
            </div>
        </div>
        <div class="order-footer">
            <div class="buy-now">Total : <span>11100 ks</span></div>
            <div class="add-cart">Place Order</div>
          </div>
    </div>
</template>
<script>
    export default {
    name: "seeOrder",
    data() {
        return {

        };
    },
    methods:{
        back() {
            this.$router.go(-1);
        },
        gotoaddress(){
            this.$router.push({
                path:'/addAddress'
            })
        }
    }
    };
</script>
<style lang="less" scoped>
.seeOrder{
    .header{
        display: flex;
        padding: 0.3rem 0.2rem;
        background: #fff;
        border-bottom: .01rem solid #f1f1f1;
        #backbtn{
            font-size: .4rem;
            color: #777;
        }
        .title{
            font-size: .3rem;
            margin-left: 2.4rem;
        }
    }
    .address{
        background-color: #fff;
        padding: .3rem .2rem .1rem .2rem;
        border-bottom: 0.1rem solid #f1f1f1;
        .title{
            display: flex;
            justify-content: space-between;
            padding-bottom: 0.2rem;
            .name{
                font-size: .28rem;
                float: left;
                color:@second-color;
                font-weight: bold;
            }
            .edit{
                font-size: .28rem;
                float: right;
                color: @price-color;
                font-weight: bold;
            }
        }
        .detail{
            display: flex;
            padding: .2rem 0;
            #img{
                font-size: .35rem;
                color:@second-color;
            }
            .des{
                font-size: .24rem;
                margin-left: 0.2rem;
                color:@product-title;
            }
        }
    }
    .order-product{
      display: flex;
      padding: 0.3rem 0 0.3rem 0.3rem;
      border-bottom: 0.04rem solid #f1f1f1;
      background-color: #fff;
      img{
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 0.1rem;
      }
      .detail{
        margin-left: .2rem;
        .title{
            font-size: .26rem;
            display: -webkit-box;
            overflow: hidden;
            white-space: normal !important;
            text-overflow: ellipsis;
            word-wrap: break-word;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            color: @product-title;
            height: .8rem;
            line-height: .4rem;
        }
        .price{
            font-size: .3rem;
            color: @price-color;
            line-height: .5rem;
        }
        .qty-box{
          .qty{
            font-size: .3rem;
            color: @product-title;
          }
        }
      }
    }
    .tax{
        background-color: #fff;
        margin-top: .1rem;
        padding: 0.2rem;
        .total{
        display: flex;
        justify-content: space-between;
        line-height: .7rem;
        .name{
            font-size: .28rem;
            float: left;
            color:#000;
        }
        .number{
            font-size: .28rem;
            float: right;
            color: #000;
        }
    }
    }
    .order-footer{
        width: 100%;
        height: 1rem;
        display: flex;
        position: fixed;
        bottom: 0;
        background-color: #fff;
        .buy-now{
        width: 60%;
        font-size: .3rem;
        text-align: center;     
        line-height: 1rem;
        color:@second-color;
        font-weight:bold;
        span{
            font-size: .3rem;  
            color:@price-color;
        }
        }
        .add-cart{
        font-size: .26rem;
        text-align: center;
        background: linear-gradient(to right,#25a5d8 0,#442e93 100%);
        color:#fff;
        line-height: 1rem;
        width: 40%;
        }
    }
}
</style>