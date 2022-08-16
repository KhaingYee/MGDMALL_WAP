<template>
    <div class="notive-container">
        <div v-title :data-title="text">{{text}}</div>
        <header class="header"><span @click="Return"></span>{{text}}</header>
        <div class="contentchioce">
            <h1 class="title" v-html="content.title"></h1>
            <!-- <h1 class="datetime"> {{ content.create_time | formatDate }} </h1> -->
            <p class="datetime">{{content.create_time | formatDate}}</p>
            <div class="line"></div>
            <div class="contentpha" v-html="content.content" id="pic_article"></div>
        </div>
    </div>
</template>

<script>
import qs from 'qs';
export default {
    name: 'notice_child',
    data() {
        return {
            text: this.$constant.mainName + '公告详情',
            content: ''
        }
    },
    methods: {
        Return: function () {
            this.$router.go(-1);
        },
        unescape(html) {
            return String(html)
                .replace(/&amp;/g, '&')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, '\'')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>');
        }
    },
    mounted() {
        this.axios.post(this.$httpConfig.announcement_list, qs.stringify({
            id: this.$route.params.id,
            token: sessionStorage.getItem("data_token")
        })).then((res) => {
            this.content = res.data.data;
            this.content.content = this.unescape(this.content.content);
            // this.content.content=this.content.content.replace(/<img [^>]*src=['"]/g,'<img alt="" src="'+this.URL);
            this.content.content=this.content.content.replace('<img alt="" src="'+this.URL);
        }).catch((err) => {
            console.log(err);
        });
    },
    created() {

    }
}
</script>
<style lang="less">
.notive-container{
    width: 100%;
.header {
  width: 100%;
  height: 0.9rem;
  background: #d02629;
  text-align: center;
  line-height: 0.9rem;
  color: #fff;
  font-size: 0.36rem;
  position: relative;
  span {
    width: 0.46rem;
    height: 0.46rem;
    border-radius: 50%;
    display: block;
    position: absolute;
    left: 0.2rem;
    top: 50%;
    margin-top: -0.23rem;
    text-align: center;
    line-height: 0.46rem;
    font-family: "宋体";
    font-size: 0.4rem;
    background: url(../../../assets/btn-return.png) no-repeat;
    background-size: 100% 100%;
  }
}
.contentchioce {
 width: 100% !important;
  
  .title {
    font-size: 0.3rem;
    text-align: center;
    padding: .2rem 0;
  }
  .datetime {
    padding-top: .2rem;
    text-align: center;
     padding: .2rem 0;
  }
  .contentpha {
      width: 100% !important;
      p{
        width: 100% !important;
          line-height: .5rem !important;
          padding: .2rem 0;
      }
      img{
          width: 100%;
         
      }
  }
  
  .line {
    margin: 0.2rem 0;
    height: 0.02rem;
    background: #999;
  }
}
}
</style>

