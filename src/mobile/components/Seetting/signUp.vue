<template>
    <div class="signup">
        <div class="signup-title">Sign Up</div>
        <div class="user-box">
            <div class="name">User Name</div>
            <div class="enter-box">
                <i class="fa-regular fa-user" id="photo"></i>
                <input type="text" placeholder="Enter your user name" v-model="userName" class="input-enter">
            </div>
        </div>
        <div class="password-box">
            <div class="name">Phone Number</div>
            <div class="enter-box">
                <i class="fa-solid fa-phone" id="photo"></i>
                <input type="text" placeholder="Enter your phone number" v-model="phone" class="input-enter">
            </div>
        </div>
        <div class="password-box">
            <div class="name">Verification Code</div>
            <div class="enter-box">
                <i class="fa-solid fa-envelope" id="photo"></i>
                <input type="text" placeholder="Enter your verification code" v-model="verification" class="input-enter">
                <div class="sms">Send Via SMS</div>
            </div>
        </div>
        <div class="password-box">
            <div class="name">Password</div>
            <div class="enter-box">
                <i class="fa-solid fa-lock" id="photo"></i>
                <input type="text" placeholder="Enter your password" v-model="password" class="input-enter">
            </div>
        </div>
        <div class="password-box">
            <div class="name">Confirm Password</div>
            <div class="enter-box">
                <i class="fa-solid fa-lock" id="photo"></i>
                <input type="text" placeholder="Enter your confirm password" v-model="conpassword" class="input-enter">
            </div>
        </div>
        <div class="btn-log">Sign Up</div>
        <div class="gologin" @click="gobacklogin">Already have an account?<span>&nbsp;Login</span></div>
    </div>
</template>
<script>

    export default {
        name : 'singUp',
        data(){
            return {
                phone:'',
                password:'',
                conpassword:'',
                userName:'',
                verification:''
            }
        }, 
        methods:{
            gobacklogin(){
                this.$router.push({
                path:"/login"
                })
            }
        }  
    }
</script>
<style lang="less">
.signup{
    background-color: #fff;
    height: 100%;
    .signup-title{
        font-size: .5rem;
        font-weight: bold;
        padding: .6rem 0;
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
    .password-box{
        padding: .2rem .5rem 0 .5rem;
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
        .sms{
            font-size: .26rem;
            width: 2.3rem;
            height: .8rem;
            text-align: center;
            line-height: .8rem;
            position: absolute;
            top: 39%;
            right: 5%;
            color:#fff;
            background: linear-gradient(to right,#014E40 0,#25a5d8 100%);
            border-radius: 0.3rem;
        }
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
    .gologin{
        font-size: .26rem; 
        text-align: center;
        padding: .4rem 0;
        span{
            font-size: .26rem; 
            color:#014E40;
            font-weight:bold;
        }
    }
}
</style>
