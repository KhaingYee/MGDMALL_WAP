<template>
    <div class="QA">
        <div class="header">
            <i class="fa-solid fa-circle-chevron-left" id="backbtn" @click="back"></i>
            <div class="title">Question & Answer</div>
        </div>
        <div class="all-qa">
            <div class="write-q">
              <i class="fa-solid fa-message" id="qicon"><span class="text">Q</span></i>
              <div class="ques">
                <div class="wq">stock shi lar</div>
                <div class="show-detail">
                  <span class="name">kym</span>
                  <span class="date">20.10.2022</span>
                </div>
              </div>
            </div>
            <div class="write-a">
              <i class="fa-solid fa-message" id="qicon"><span class="text">A</span></i>
              <div class="ques">
                <div class="wq">shi tal</div>
                <div class="show-detail">
                  <span class="name">admin</span>
                  <span class="date">20.10.2022</span>
                </div>
              </div>
            </div>
            <div class="write-q">
              <i class="fa-solid fa-message" id="qicon"><span class="text">Q</span></i>
              <div class="ques">
                <div class="wq">what is this</div>
                <div class="show-detail">
                  <span class="name">user</span>
                  <span class="date">21.10.2022</span>
                </div>
              </div>
            </div>
        </div>
        <div class="footer">
            <input type="text" placeholder="Please enter the comment" v-model="comment" class="input-text">
            <div class="send-btn">
                <i class="far fa-paper-plane fa-spin" id="send-icon"></i>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
    name: "question",
    data() {
        return {
            comment:'',
        };
    },
    methods:{
        back() {
            this.$router.go(-1);
        },
    }
    };
</script>
<style lang="less">
.QA{
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
            margin-left: 1.7rem;
        }
    }
    .all-qa{
        background-color: #fff;
      .write-q{
        display: flex;
        padding: 0.2rem;
        #qicon{
          font-size: .3rem;
          color:#0d7199;
          line-height: .5rem;
          .text{
            color: #fff;
            position: absolute;
            font-size: .2rem;
            margin: -0.02rem 0 0 -0.24rem;
          }
        }
        .ques{
          margin-left: .2rem;
          .wq{
            font-size: .26rem;
          }
          .show-detail{
            .name{
              font-size: .24rem;
              color:#777;
            }
            .date{
              font-size: .22rem;
              color: #777;
              margin-left: .1rem;
            }
          }
        }
      }
      .write-a{
        display: flex;
        padding: 0.2rem;
        #qicon{
          font-size: .3rem;
          color:#ff6700;
          line-height:.5rem;
          .text{
            color: #fff;
            position: absolute;
            font-size: .2rem;
            margin: -0.035rem 0 0 -0.22rem;
          }
        }
        .ques{
          margin-left: .2rem;
          .wq{
            font-size: .26rem;
          }
          .show-detail{
            .name{
              font-size: .24rem;
              color:#777;
            }
            .date{
              font-size: .22rem;
              color: #777;
              margin-left: .1rem;
            }
          }
        }
      }
    }
    .footer{
        display: flex;
        background: #fff;
        bottom: 0;
        position: fixed;
        padding: 0.3rem 0.2rem 0.3rem 0.3rem;
        width: 100%;
        .input-text{
            font-size: .26rem;
            width: 5.5rem;
            height: 0.7rem;
            line-height: .5rem;
            border: none;
            background: #f1f1f1;
            text-indent: 0.2rem;
        }
        .send-btn{
            background-color: #0d7199;
            margin: 0.1rem 0 0 0.3rem;
            width: 1rem;
            height: 0.5rem;
            border-radius: .2rem;
            #send-icon{
                font-size: .3rem;
                padding: 0.08rem 0 0 0.33rem;
                color: #fff;
            }
        }
    }
}
</style>