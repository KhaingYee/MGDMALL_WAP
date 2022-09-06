<template>
    <div class="flash-wrap">
    <div class="index_Ctrl">
        <div class="title">
            <div class="name">Category</div>
        </div>
      <div class="index_Ctrl_auto">
          <span class="link">
              <img src="../../../assets/images/c1.png"/>
              <span> Ceramic Tile</span>
          </span>
          <span class="link">
            <img src="../../../assets/images/c2.png"/>
            <span>Bathroom accessories</span>
        </span>
        <span class="link">
            <img src="../../../assets/images/category.jpg"/>
            <span>This is the electronic accessories</span>
        </span>
        <span class="link">
            <img src="../../../assets/images/c1.png"/>
            <span> Ceramic Tile</span>
        </span>
        <span class="link">
          <img src="../../../assets/images/c2.png"/>
          <span>Bathroom accessories</span>
      </span>
      <span class="link">
          <img src="../../../assets/images/category.jpg"/>
          <span>This is the electronic accessories</span>
      </span>
      </div>
    </div>
    </div>
</template>
<script>
import axios from 'axios'
import qs from "qs"
    export default {
        name: 'newsflash',
        data() {
            return {

            }
        },       
        methods:{
            Category() {
                this.axios.get(this.$httpConfig.getCategory,{
                })
                .then(res => {
                   
                })
                .catch(error => {
                    console.log(error);
                });
            },
            
        },
        mounted (){
            this.Category();
        }
    }
</script>
<style lang="less" scoped>
    .flash-wrap{
        background:#f2f2f2;
    }
         .index_Ctrl{
           width: 100%;
           overflow: hidden;
           margin-top: 3.49rem;
           background: #fff;
           padding-bottom: 0.2rem;
           .title{
			    padding:.3rem .2rem .1rem .2rem;
                .name{
                    font-size: .26rem;
                    color: #0d7199;
                    font-weight: bold;
                }		
		    }
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
            width:1.66rem;
            height: 2.5rem;
            float: left;
            margin-right: 0.15rem;
            margin-top: 0.2rem;
            overflow: hidden;
            background-color: #fff;
            border-radius:.1rem;
            /* border: 0.01rem solid #0985b6; */
        }
        .index_Ctrl_auto .link:nth-child(4n){
            margin-right: 0;
        }
        .index_Ctrl_auto .link img{
            width: 1.66rem;
            height: 1.66rem;
            display: block;    
        }
        .index_Ctrl_auto .link span{
            height: 0.62rem;
            color: #000;
            line-height: 0.35rem;
            padding: .1rem .2rem;
            font-size: .24rem;
            display: -webkit-box;
            overflow: hidden;
            white-space: normal !important;
            text-overflow: ellipsis;
            word-wrap: break-word;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }  
    }
</style>