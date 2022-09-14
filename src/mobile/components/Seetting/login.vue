<template>
    <div class="login">
        <div class="login-title">Login</div>
        <div class="user-box">
            <div class="name">Phone Number</div>
            <div class="enter-box">
                <i class="fa-regular fa-user" id="photo"></i>
                <input type="text" placeholder="Enter your phone number" v-model="phone" class="input-enter">
            </div>
        </div>
        <div class="password-box">
            <div class="name">Password</div>
            <div class="enter-box">
                <i class="fa-solid fa-lock" id="photo"></i>
                <input type="text" placeholder="Enter your password" v-model="password" class="input-enter">
            </div>
        </div>
        <div class="forgot">Forgot Password?</div>
        <div class="btn-log">LOGIN</div>
        <div class="or-div">
            <span class="orline"></span>
            <span class="ortext">OR</span>
            <span class="orliner"></span>
        </div>
        <div class="facebook-div">
            <i class="fa-brands fa-facebook" id="iconf"></i>
            <span class="text">Sign In With Facebook</span>
        </div>
        <div class="gmail-div">
            <i class="fa-brands fa-google" id="iconf"></i>
            <span class="text">Sign In With Gmail</span>
        </div>
        <div class="phone-div">Sign UP With Phone</div>
    </div>
</template>
<script>

    export default {
        name : 'login',
        data(){
            return {
                phone:'',
                password:''
            }
        },
    }
</script>
<style lang="less">
.login{
    background-color: #fff;
    height: 100%;
    .login-title{
        font-size: .5rem;
        font-weight: bold;
        padding: .8rem 0;
        text-align: center;
        color: @main-color;
    }
    .user-box{
        padding: 0 .5rem;
        .name{
            font-size: .26rem;
        }
        .enter-box{
            border-bottom: 0.05rem solid #f1f1f1;
            padding: 0.3rem 0;
           #photo{
            font-size: .3rem;
           }
           .input-enter{
            font-size: .26rem;
            width: 90%;
            margin-left: 0.2rem;
            border: none;
           }
        }
    }
    .password-box{
        padding: .3rem .5rem .2rem .5rem;
        .name{
            font-size: .26rem;
        }
        .enter-box{
            border-bottom: 0.05rem solid #f1f1f1;
            padding: 0.3rem 0;
           #photo{
            font-size: .3rem;
            color:#999;
           }
           .input-enter{
            font-size: .26rem;
            width: 90%;
            margin-left: 0.2rem;
            border: none;
           }
        }
    }
    .forgot{
        font-size: .26rem;
        right: 0.5rem;
        position: absolute;
    }
    .btn-log{
        font-size: .3rem;
        margin: .8rem 0.5rem 0.3rem 0.5rem;
        text-align: center;
        background: linear-gradient(to right,#014E40 0,#25a5d8 100%);
        color: #fff;
        height: 0.8rem;
        line-height: .8rem;
        border-radius: 0.5rem;
    }
    .or-div{
        display: flex;
        align-items: center;
        margin: 0.5rem 1rem;
        .orline{
            width: 3rem;
            height:.05rem;
            background-color:#f1f1f1;
        }
        .ortext{
            font-size: .3rem;
            font-weight: bold;
            color: @main-color;
            padding: 0 0.2rem;
        }
        .orliner{
            width: 3rem;
            height:.05rem;
            background-color:#f1f1f1;
        }
    }
    .facebook-div{
        display: flex;
        align-items: center;
        margin: 0 0.5rem;
        /* background: #3A5897; */
        background: linear-gradient(to right,#3A5897 0,#409eff 100%);
        height: 0.8rem;
        line-height: .8rem;
        border-radius: 0.5rem;
        #iconf{
        font-size: .5rem;
        color:#ecf5ff;
        margin: 0 0.2rem 0 1.4rem;
        }
        .text{
            font-size: .28rem;
            color:#fff
        }
    }
    .gmail-div{
        display: flex;
        align-items: center;
        margin: 0 0.5rem;
        /* background: #f56c6c; */
        background: linear-gradient(to right,#d80a0a 0,#f56c6c 100%); 
        height: 0.8rem;
        line-height: .8rem;
        margin-top: .5rem;
        border-radius: 0.5rem;
        #iconf{
        font-size: .5rem;
        color:#ecf5ff;
        margin: 0 0.2rem 0 1.4rem;    
        }
        .text{
            font-size: .28rem;
            color:#fff
        }
    }
    .phone-div{
        margin: 1.5rem 0 0 0;
        color: #014E40;
        text-align: center;
        font-size: .3rem;
        font-weight: bold;
    }
}
</style>
