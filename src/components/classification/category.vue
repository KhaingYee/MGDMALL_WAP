<template>
  <div ref="wrap" class="classif-wrap" style="height:100%">
    <div v-title data-title="category">category</div>
    <div class="header">
        <div>
          <img src="../../assets/images/MGD_Logo_Text.png" class="header_logo"/>
        </div>
        <div class="header_seek">
            <img class="header_seek_img" :src="seekImg">
            <form action="javascript:void(0);">
                <input type="search" placeholder="Search Category...">
            </form>
        </div>
    </div>
      <div class="content-wrap clearfix">
      <ul class="nav-left fl">
        <li
          v-for="(item,index) in data"
          :key="item.id"
          :class="{active:status ==item.id  }"
          @click="tab(item,index)"
        >
            <img :src="item.pic_url" class="category-img"/>
            <p>{{item.class_name}}</p>
        </li>
      </ul>
      <div class="content fr">
        <div class="tab-content-wrap">
            <div class="item-one">
            <el-collapse accordion>
              <el-collapse-item :title="item.class_name" v-for="item in condata" :key="item.id">
                <ul class="con clearfix" v-if="item.three">
                  <li class="fl" v-for="con in item.three" :key="con.id">
                    <img :src="con.pic_url" />
                    <p class="text1-hidden">{{con.class_name}}</p>
                  </li>
                </ul>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "classification",
  data() {
    return {
        seekImg:require('@/assets/images/sousuo@2x.png'),
        data: [
            {   "id":1,
                "class_name":"Electronic",
                "pic_url":require('@/assets/images/category.jpg')
            },

            {   "id":2,
                "class_name":"BathRoom",
                "pic_url":require('@/assets/images/c2.png')
            },

            {   "id":3,
                "class_name":"Ceramic Tile and Accessories",
                "pic_url":require('@/assets/cate.jpg')
            },
        ],
        condata: [
        {"id":4,
        "class_name":"Phone",
        "three":[
            {"id":5,"class_name":"iPhone","pic_url":require('@/assets/images/category.jpg'),"fid":4},
            {"id":6,"class_name":"Samsung","pic_url":require('@/assets/images/category.jpg'),"fid":4},
            {"id":7,"class_name":"Xiaomi","pic_url":require('@/assets/images/category.jpg'),"fid":4},
            ],},

            {"id":8,
        "class_name":"Mouse",
        "three":[
            {"id":9,"class_name":"HCJM","pic_url":require('@/assets/sonymouse.jpg'),"fid":8},
            {"id":10,"class_name":"Wireless","pic_url":require('@/assets/showmouse.jpg'),"fid":8},
            {"id":11,"class_name":"Logitech","pic_url":require('@/assets/showmouse.jpg'),"fid":8},
            ],},

            {"id":21,
        "class_name":"Laptop",
        "three":[
            {"id":22,"class_name":"Asus","pic_url":require('@/assets/showlaptop.jpg'),"fid":21},
            {"id":23,"class_name":"Dell","pic_url":require('@/assets/showlaptop.jpg'),"fid":21},
            {"id":34,"class_name":"Acer","pic_url":require('@/assets/showlaptop.jpg'),"fid":21},
            ],},
        ],
        status: 1,

    };
  },
  methods: {
    tab(item, index) {
      if (item.id != this.status) {
        this.status = item.id;
      }
    },
  },
  mounted() {

  },
};
</script>
<style lang="less">

.classif-wrap {
  background: #fff;
  height:auto;
  min-height: 100% !important;
  .mint-tab-item {
    display: inline-block;
    flex: none;
    .mint-tab-item-label {
      font-size: 0.26rem;
      line-height: 0.7rem;
    }
  }
}
.el-collapse-item__header {
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    height: rem;
    line-height: .95rem;
    background-color: #fff;
    color: #333;
    cursor: pointer;
    border-bottom: 1px solid #EBEEF5;
    font-size: .26rem;
    font-weight: 500;
    -webkit-transition: border-bottom-color .3s;
    transition: border-bottom-color .3s;
    outline: 0;
    padding-left: .2rem;
}
.el-collapse-item__wrap {
    will-change: height;
    background-color: #fff;
    overflow: hidden;
    box-sizing: border-box;
    border-bottom: 1px solid #EBEEF5;
}
.el-collapse-item__content {
    padding-bottom: 0;
    font-size: 13px;
    color: #303133;
    line-height: 1.769230769230769;
}
</style>
<style lang="less" scoped>
.header{
    padding: 0 .2rem 0 .2rem;
    background-color: #06306a;
    display: flex;
    .header_logo{  
      width: 3rem;
      height: 0.94rem;
      display: block;
      background-size: 100% 100%;
    }
    .header_seek{
      width: 3.9rem;
      height: 0.6rem;
      background-color: #eac9eb;
      margin: .2rem 0 .2rem .2rem;
      border-radius: 0.25rem;
      /* position: relative;  */
    }
    .header_seek input{
      width: 100%;
      height: 0.6rem;
      border-radius: 0.25rem ;
      border: 0.01rem solid #ffffff;
      outline: none;
      font-size: 0.26rem;
      text-indent: 0.75rem;
      background-color: #ffffff;
      color:#fff;
      margin: 0 !important;
      }
      .header_seek_img{
        position: absolute;
        top:0.35rem;
        left: 3.65rem;
        display: block;
        width: 0.26rem;
        height: 0.27rem;
      }   
      .header_seek input::-webkit-input-placeholder{
        color: #999;
      }
}
.content-wrap {
  background: #f2f2f2;
  overflow: hidden;
  width: 100%;
  min-height: 100% !important;
  .nav-left {
    width: 1.8rem;
    min-height: 100vh !important;
    overflow: auto;
    display: block;
    background: #fff;
    li {
      overflow: hidden;
      font-size: 0.24rem;
      color: #333;
      border-bottom: 0.08px solid #f2f2f2;
      padding:.2rem;
    }
    li.active {
      border-left: 3px solid #06306a;
      box-sizing: border-box;
      background: #f2f2f2;
      color: #06306a;
    }
    .category-img{
        width: 1.3rem;
        height: 1rem;
        margin-bottom: 0.1rem;
    }
    p {
      display: -webkit-box;
      overflow: hidden;
      white-space: normal !important;
      text-overflow: ellipsis;
      word-wrap: break-word;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: .36rem;
      text-align: center;
    }
  }
  .content {
    overflow: auto;
    width: 5.7rem;
    // height: 100%;
    height: auto;
    background: #f2f2f2;
    overflow: scroll;
    .tab-content-wrap {
      img {
        width: 1.52rem;
        height: 1.52rem;
      }
    }
    .item-one {
      .title {
        height: 0.73rem;
        line-height: 0.73rem;
        font-size: 0.3rem;
        color: #666;
        text-indent: 0.16rem;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        .crumbs-arrow {
          float: right;
          margin-right: 0.2rem;
          margin-left: -0.1rem;
          font-family: "Helvetica Neue", "Hiragino Sans GB", SimSun, serif;
          font-style: normal;
          font-size: 0.4rem;
        }
        span {
          font-size: 0.3rem;
        }
      }
      .con {
        li {
          width: 1.68rem;
          height: 2.44rem;
          text-align: center;
          margin-left: 0.16rem;
          background: #fff;
          box-sizing: border-box;
          margin-bottom: 0.12rem;
          img {
            width: 1.6rem;
            height: 1.6rem;
            border-radius: .15rem;
            background: #f2f2f2;
          }
          p {
            font-size: 0.24rem;
            color: #797979;
            height: 0.64rem;
            line-height: 0.64rem;
            padding: 0 0.2rem;
          }
        }
      }
    }
    .item-tab {
      margin-top: 0.1rem;
      .mint-navbar {
        border-bottom: 1px solid #f2f2f2;
      }
      .mint-tab-item {
        padding: 0;
        color: #666;
        border-color: #f9781e;
        margin: 0;
        height: 0.7rem;
        line-height: 0.7rem;
        margin-left: 0.4rem;
      }
      .mint-tab-item.is-selected {
        color: #f9781e;
      }
    }
    .ification-wrap {
      .title {
        height: 1rem;
        line-height: 1rem;
        font-size: 0.26rem;
        color: #333;
        font-weight: bold;
      }
      .tab-content {
        li {
          margin-left: 0.3rem;
          margin-right: 0.1rem;
          text-align: center;
          img {
            width: 1.24rem;
            height: 1.24rem;
            border-radius: 100%;
            box-sizing: border-box;
          }
          p {
            font-size: 0.24rem;
            color: #797979;
            line-height: 0.7rem;
            width: 1.24rem;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>