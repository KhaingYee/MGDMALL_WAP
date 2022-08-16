<template>
  <div>
      <top-header text = "分享二维码"></top-header>
      <div class="qrcode">
       
            <div class="container">
                <div id="qrCode" ref="qrCode"></div>
            </div>
            <div class="text">
                邀请好友扫描加入
            </div>
          
      </div>
  </div>
</template>

<script>
import topHeader from '@/components/page/children/header.vue';
import QRCode from 'qrcodejs2';
export default {
    components:{
        topHeader
    },
    data(){
        return {
            code:''
        }
    },
    mounted(){
        
        this.axios.get(this.$httpConfig.promoteCode).then((res)=>{
            this.code = res.data.data.user_id;
            let url = this.$httpConfig.register+"?code="+this.code;
            this.$nextTick(()=>{
                this.qrcode(url);
            })
        }).catch((e)=>{
            console.log(e);
        })
    },
    methods:{
        qrcode(url){
            this.qrCode = new QRCode('qrCode',{
                text:url,
                width:300,
                height:300
            }) 
        }
    }
}
</script>

<style lang="less">
    .qrcode{
        height:100%;
        // padding-top:100px;
        background: white;
        text-align: center;
        .container{
            width: 300px;
            height:300px;
            margin:0px auto;
            padding:100px 0px 50px 0px;
        }
        .qrCode{
            text-align: center;
            display: flex;
            justify-items: center;
        }
    }
</style>