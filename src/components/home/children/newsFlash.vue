<template>
    <div class="flash-wrap">
    <div class="index_Ctrl">
      <div class="index_Ctrl_auto">
          <span class="link">
              <img src="../../../assets/images/c1.png"/>
              <span>ကြွေပြားများ</span>
          </span>
          <span class="link">
            <img src="../../../assets/images/c2.png"/>
            <span>ရေချိုးခန်းသုံးပစ္စည်းများ</span>
        </span>
        <span class="link">
            <img src="../../../assets/images/category.jpg"/>
            <span>အီလက်ထရောနစ်ပစ္စည်းများ</span>
        </span>
        <span class="link">
            <img src="../../../assets/images/c1.png"/>
            <span>ကြွေပြားများ</span>
        </span>
        <span class="link">
          <img src="../../../assets/images/c2.png"/>
          <span>ရေချိုးခန်းသုံးပစ္စည်းများ</span>
      </span>
      <span class="link">
          <img src="../../../assets/images/category.jpg"/>
          <span>အီလက်ထရောနစ်ပစ္စည်းများ</span>
      </span>
      </div>
    </div>
    </div>
</template>
<script>
import qs from "qs"
    export default {
        name: 'newsflash',
        data() {
            return {

            }
        },
    }
</script>
<style lang="less" scoped>
    .flash-wrap{
        background:#f2f2f2;
    }
         .index_Ctrl{
           width: 100%;
           overflow: hidden;
           background-color: #fff;
        //    border-top:1px solid #DEDEDE;
           padding-bottom: 0.2rem;
           margin-top: 3.52rem;
         .index_Ctrl_auto{
            width: 7.1rem;
            overflow: hidden;
            margin: auto;
            display: flex;
            justify-content: flex-start;
            flex-direction: row;
            flex-wrap: wrap;
         }
         .index_Ctrl_auto .link{
            display: block;
            width:1.62rem;
            height: 2.5rem;
            float: left;
            margin-right: 0.2rem;
            margin-top: 0.2rem;
            overflow: hidden;
        }
        .index_Ctrl_auto .link:nth-child(4n){
            margin-right: 0;
        }
        .index_Ctrl_auto .link img{
            width: 1.62rem;
            height: 1.62rem;
            display: block;    
        }
        .index_Ctrl_auto .link span{
            width: 100%;
            height: 0.6rem;
            display: block;
            color: #333;
            font-size: 0.26rem;
            text-align: center;
            line-height: 0.35rem;
            padding-top: 0.1rem;
            font-weight: 500;
        }  
    }
</style>