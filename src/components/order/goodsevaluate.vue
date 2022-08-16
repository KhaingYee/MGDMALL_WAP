<template>
  <div class="goods_evaluate">
    <div class="header">
      <img src="../../assets/activity/re.png" @click='goback'/>
      <span class="title">精选评价</span>
    </div>
    <div class="hederbottom">
      <ul class="navlist">
        <li v-for="(item,index) in topattention" @click="topnav(index)" :class="{'active' :indexColor==index}">
          <p class="pnumber">{{item.text}}</p>
          <p class="ptext">{{item.num}}</p>
        </li>
      </ul>
    </div>
    <div class="info" v-for="(item,index) in PraiseList" :key="index">
      <div class="top">
        <div class="t_1">
          <img :src="item.user_header" alt />
        </div>
        <div class="t_2">{{item.user_name}}</div>
        <div class="t_3">
          <img v-if="item.score !=0" v-for="a in Number(item.score)" src="../../assets/activity/sh@2x.png" alt/>
          <img v-if="item.score != 5" v-for="a in (5-item.score)" src="../../assets/activity/kx@2x.png" alt/>
        </div>
      </div>
      <div class="title">{{item.content}}</div>
      <div class="ban">
        <img :src="itemimg.path" v-for="itemimg in item.img" />
      </div>
      <div class="spec">
        <div class="divlist">
          <div class="sp"  v-for="(itemx,indexx) in item.goods_apace" >{{itemx.item}}/{{itemx.speName}}</div>
        </div>

        <div class="date">{{ item.create_time*1000| formatDate}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import qs from 'qs';
  import {Toast} from "mint-ui";
export default {
  data() {
    return {
      topattention: [
        { text: "全部评价", num: 4233 },
        { text: "好评", num: 33 },
        { text: "中评", num: 1 },
        { text: "差评", num: 1 },
        { text: "有图", num: 10 }
      ],
      indexColor:0,
      status:4,
      PraiseList:[],
      level:'',
      headParams: {
                title: sessionStorage.getItem('titleKey'),
                description: sessionStorage.getItem('updateDescription'),
                keywords: sessionStorage.getItem('contentKey'),        
            }
        }
    },
    head: {
        meta: function(){
            return [
                { name: 'title', content: this.headParams.title, id: 'desc' },
                { name: 'description', content: this.headParams.description, id: 'desc1' },
                { name: 'keywords', content: this.headParams.keywords, id: 'desc2' },
            ]
        }
    },
  filters: {
    formatDate: function (value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return y + '-' + MM + '-' + d ;
    }
  },
  	created() {
			let title = "精选评价" + '-' + sessionStorage.getItem('titleKey') + '-' + sessionStorage.getItem('updateDescription');
			this.showScroll.scrollTitle(title);
		},
  methods: {
    goback(){
      this.$router.go(-1)
    },
    topnav(index){
      this.indexColor=index
      switch (index) {
        case 0:
          this.status=4;
          this.getUserCon()
          break;
        case 1:
          this.status=5;
          this.level=2
          this.getUserCon()
          break;
        case 2:
          this.status=5;
          this.level=1
          this.getUserCon()
          break;
        case 3:
          this.status=5;
          this.level=0
          this.getUserCon()
          break;
        case 4:
          status = 3
          this.getUserCon()
          break;
      }

    },
    //获取用户评价数量    qs.stringify({page: this.page})
    getUserNum(){
      this.axios.post( this.$httpConfig.sereEvaluateNum ,qs.stringify({goods_id:this.$route.params.goodId, token: sessionStorage.getItem("data_token") })).then((res) => {
        if(res.data.status!=0){
          var numarr=[];
          numarr=res.data.data
          this.topattention[0].num=res.data.data.allcount
          this.topattention[1].num=res.data.data.nice
          this.topattention[2].num=res.data.data.height
          this.topattention[3].num=res.data.data.bad
          this.topattention[4].num=res.data.data.image
        }else {
          Toast(res.data.message);
        }

      }).catch((err) => {
        console.log(err);
      });
    },
    //获取用户评价内容
    /* 全部status = 4
   有图status = 3
   好评status = 5   level=2 好评
   中评tatus  = 5    level=1 中评
   差评tatus  = 5    level=0 差评*/
    getUserCon(){
      this.axios.post( this.$httpConfig.getAllCommentContent,qs.stringify(
              {goods_id:this.$route.params.goodId  ,status:this.status, level:this.level, token: sessionStorage.getItem("data_token")}

      )).then((res) => {
        if(res.data.status!=0){
          this.PraiseList=res.data.data.records
        }else {
          Toast(res.data.message);
        }

      }).catch((err) => {
        console.log(err);
      });
    },

  },
  mounted() {
    this.getUserNum();
    this.getUserCon();
  }
};
</script>
<style lang="less" scope>
.goods_evaluate {
  .header {
    display: flex;
    align-items: center;
    padding: 0.2rem 0;
    background: #fff;
    img {
      height: 0.5rem;
      padding-left: 0.2rem;
    }
    .title {

      font-size: 0.35rem;
      margin: 0 34%;
    }
  }
  .hederbottom {
    margin-top: 0.2rem;
    width: 100%;
    height: 1rem;
    .navlist {
      width: 100%;
      height: 1rem;
      margin: auto;
      list-style: none;
      display: flex;
      flex-direction: row;
      li {
        flex: 1;
        p {
          width: 100%;
          height: 0.3rem;
          text-align: center;
        }
        .pnumber {
          font-size: 0.3rem;
          color: #757575;
          font-weight: 500;
          height: 0.36rem;
        } //
        .ptext {
          color: #333;
          padding-top: 0.05rem;
        }
      }
      .active{
        border-bottom: 0.01rem solid  #ec7467;
        p {
          color: #ec7467
        }

      }
    }
  }
  .info {
    padding: 0.2rem;
    .top {
      display: flex;
      align-items: center;
      .t_1 {
      }
      .t_2 {
        padding-left: 0.5rem;
        font-size: 0.3rem;
      }
      .t_3 {
        position: absolute;
        right: 0.2rem;
        img {
          height: 0.35rem;
          padding: 0 0.05rem;
        }
      }
    }
    .title {
      margin-top: 0.1rem;
      font-size: 0.25rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      width: 8rem;
    }
    .ban {
      padding: 0.2rem 0;
      position: relative;
      left: -0.1rem;
      img {
        height: 1.5rem;
        padding: 0 0.1rem;
      }
    }
    .spec {
      display: flex;
      flex-direction: row;
      .divlist{
        width: 40%;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .sp {
          color: #b0b0b0;
          font-size: 0.25rem;
        }
      }

      .col {
        color: #b0b0b0;
        font-size: 0.25rem;
        padding-left: 0.2rem;
      }
      .pack {
        color: #b0b0b0;
        font-size: 0.25rem;
        padding-left: 0.2rem;
      }
      .date {
        color: #b0b0b0;
        font-size: 0.25rem;
        padding-left: 0.3rem;
      }
    }
  }
}
</style>
