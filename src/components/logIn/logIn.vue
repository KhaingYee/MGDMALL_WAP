<template>
    <div class="logoin-main" ref="content">
        <div v-title data-title="登录">登录</div>
        <div>
            <header class="logoIn-header">
                <span @click="remove" class="btn-back">取消</span>{{title}}
            </header>
            <div class="from">
                <div class="input-main userName" v-if="$store.state.loginMethod == 0">
                    <span class="icon"></span>
                    <input type="text" placeholder="邮箱/用户名/已验证手机" v-model="userName" >
                    <!-- <input type="text" oninput="if(value.length > 11)value=value.slice(0, 11)" placeholder="邮箱/用户名/已验证手机" v-model="userName" > -->
                </div>
                <div class="input-main userName" v-if="$store.state.loginMethod == 1">
                    <span class="icon"></span>
                    <input type="text" placeholder="邮箱/用户名" v-model="userName" >
                </div>
                <div class="input-main passWord">
                    <span class="icon"></span>
                    <input type="text" placeholder="请输入密码...." v-model="passWord" v-if="checked">
                    <input type="password" placeholder="请输入密码...." v-model="passWord" v-else>
                    <!--@focus="focu" @blur="blu"-->
                    <!--<span class='open'></span>-->
                    <img class='open'  @click="open" v-show="!eye" src="../../assets/openeye.png"/>
                    <img class='close' @click="close" v-show="eye" src="../../assets/closeeye.png"/>
                </div>
                <button class="btn-in" @click="logoIn">登&nbsp;&nbsp;录</button>
            </div>
            <ul class="fail-link clearfix">
                <li class="fl" @click="other">无法登录?</li>
                <li class="fl" @click="goNow">现在注册 ></li>
            </ul>
        </div>
        <dl class="tplogin" v-show="show">
            <dt>
                社交账号一键登录
                <span></span><span></span>
            </dt>
            <dd @click="qqLogin" v-if="$store.state.loginMethod == 0" class="Ch-qq"></dd>
            <dd v-if="$store.state.loginMethod == 1" class="mm-facebook">
                <facebook-login
                    :appId="facebook_client_id"
                    loginLabel=""
                    logoutLabel=""
                    class="fb_button"
                    @login="getUserData"
                    @logout="onLogout"
                    >
                </facebook-login>
            </dd>
            <dd v-if="$store.state.loginMethod == 1" class="mm-google">     
                <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure" class="new-google"></GoogleLogin>
            </dd>
        </dl>
        <mt-popup v-model="popupVisibleBind">         
            <div class="Bindfrom">
                <div class="TitlePage">请绑定邮箱</div>
                <div class="input-main userName">
                    <span class="icon"></span>
                    <input type="text" placeholder="用户名" v-model="BindUserName" disabled>
                </div>
                <div class="input-main message">
                    <span class="icon"></span>
                    <input type="text" placeholder="请输入邮箱地址" v-model="mailAcc">
                </div>
                <div class="input-main message">
                    <span class="icon"></span>
                    <input type="number" placeholder="请输入验证码" v-model="message">
                    <button class="btn-ver" :class="{active:BindActive}" @click="obtain">{{btnText}}</button>
                </div>
                <button class="btncomfir" @click="BindEmailLogin">确认</button>
            </div>
        </mt-popup>
        <div class="actionsheet" v-show="isActive">
            <div class="box" @click="increment"></div>
            <div class="acti-box" :class="{active:isActive}">
                <ul v-if="$store.state.loginMethod == 0">
                    <li @click="toback">忘记密码</li>
                    <li @click="toSms">短信验证登录</li>
                </ul>
                <ul v-if="$store.state.loginMethod == 1">
                    <li @click="toback">忘记密码</li>
                </ul>
                <div class="btn" @click="increment">{{cancelText}}</div>
            </div>
        </div>

        <div class="load" v-show="load" @touchmove.prevent><mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner></div>
    </div>
</template>
<script>
    import GoogleLogin from 'vue-google-login';
    import facebookLogin from 'facebook-login-vuejs';
    import { Toast,Popup } from 'mint-ui';
    import QS from 'qs';
    export default {
        name : 'logIn',
        data(){
            return {
                title:this.$constant.mainTitle+'登录',
                show:true,
                userName:'',
                passWord:'',
                cancelText:'取消',
                isActive:false,
                popupVisible:false,
                popupVisibleBind:false,
                scrollWatch:true,
                load:false,
                eye:false,
                checked:false, 
                mailAcc:'',
                BindActive:false,
                message:'',
                BindUserName:'',
                BindOpenId:'',
                BindUserToken:'',
                btnText:'获取验证码',           
            	screenWidth: document.body.clientWidth,
                facebook_client_id: facebook_client_id,
                params: {
                    client_id: google_client_id
                },
            }
        },
        components:{
			GoogleLogin,
            facebookLogin
        },
        watch:{
        	'$route':'fetchdata'
        },
        watch: {
            screenWidth (val) {
                if (!this.timer) {
                    this.screenWidth = val
                    this.timer = true
                    let that = this
                    setTimeout(function () {
                        that.init()
                        that.timer = false
                    }, 400)
                }
            }
        },
        mounted() {
        	const that = this
	        window.onresize = () => {
	            return (() => {
	                window.screenWidth = document.body.clientWidth
	                that.screenWidth = window.screenWidth
	            })()
	        }
            let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            this.$refs.content.style.height = h + 'px';
            document.body.scrollTop = 0;
            //记录一下路径
        },
        destroyed(){
            this.scrollWatch = false;
        },
        methods:{
            obtain(){
                if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.mailAcc)){
                    // Toast("请输入正确的邮箱地址");
                    Toast({
                        message: "请输入正确的邮箱地址",
                        position: 'bottom',
                        duration: 3000
                    }); 
                    return false;
                }
                if(this.BindActive == true)return;
                    var N = 60,
                    _this = this,
                    clear = null;
                    _this.BindActive = true;
                    _this.btnText = '请'+ N +'秒后重试';
                    _this.BindActive = true;
                    clear = setInterval(function(){
                        _this.btnText = '请'+ N-- +'秒后重试';
                        if(N < 0){
                            clearInterval(clear);
                            _this.btnText = '再次获取验证码';
                            _this.BindActive = false;
                        }
                    },1000);
                this.axios.post(this.$httpConfig.getSendMailbox,QS.stringify({
                    email:_this.mailAcc,
                    user_name:_this.BindUserName,
                    token: _this.BindUserToken
                })).then((res) => {
                    // Toast(res.data.message);
                    Toast({
                        message: res.data.message,
                        position: 'bottom',
                        duration: 3000
                    }); 
                    if(res.data.status ==1){
                    }else{
                        clearInterval(clear);
                        _this.btnText = '再次获取验证码';
                        _this.BindActive = false;
                    }
                }).catch((err) => {
                    console.info('FailtrueErr', err);
                });
            },
            BindEmailLogin(){
                if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.mailAcc)){
                    // Toast("请输入正确的邮箱地址");
                    Toast({
                        message: "请输入正确的邮箱地址",
                        position: 'bottom',
                        duration: 3000
                    }); 
                    return false;
                }
                if(isNaN(this.message)){
                    // Toast("请输入短信验证码");
                    Toast({
                        message: "请输入短信验证码",
                        position: 'bottom',
                        duration: 3000
                    });
                    return false;
                }
                this.axios({
                    method: 'post',
                    url: this.$httpConfig.bindingEmail,
                    data:QS.stringify({
                        user_name:this.BindUserName,
                        email:this.mailAcc,
                        code:this.message,
                        open_id:this.BindOpenId,
                        token: this.BindUserToken
                    })
                }).then((res) => {
                    // Toast(res.data.message);
                    Toast({
                        message: res.data.message,
                        position: 'bottom',
                        duration: 3000
                    }); 
                    if(res.data.status == 1){
                        sessionStorage.clear(); 
                        sessionStorage.setItem("data_token", res.data.data.token);
                        let redirect = this.$route.query.redirect;
                        if(redirect) {
                            window.location.href = redirect;
                        } else {
                            this.$router.push('/home')
                        }
                    }
                }).catch((err) => {
                    console.log(err)
                });
            },
            getUserData(data){
                if(data.response.authResponse == null){
                    Toast({
                        message: "登陆失败",
                        position: 'middle',
                        duration: 3000
                    });
                    return false;
                }
                // console.log('facebook'+JSON.stringify(data.response.authResponse.accessToken))
                this.axios.post(this.$httpConfig.FacebookLogin,QS.stringify({
                    access_token:data.response.authResponse.accessToken,
                })).then((res) => {
                    Toast(res.data.message);
                    if(res.data.status == 1){
                        sessionStorage.clear(); 
                        sessionStorage.setItem("data_token", res.data.data.token);
                        let redirect = this.$route.query.redirect;
                        if(redirect) {
                            window.location.href = redirect;
                        }
                        else if(res.data.data.binding == 1){
                            Toast({
                                message: '请绑定邮箱',
                                position: 'middle',
                                duration: 2000
                            }); 
                            this.popupVisibleBind = true;
                            this.BindUserName = res.data.data.name;
                            this.BindOpenId = res.data.data.open_id; 
                            this.BindUserToken = res.data.data.token;   
                        }
                        else {
                            this.$router.push('/home')
                        }
                    }
                }).catch((err) => {
                    console.log('newfacebookCatch'+err);
                });
            },
            onLogout(data){
                console.log('facebookout'+JSON.stringify(data))
            },
            onSuccess(googleUser) {
                console.log('newgoogle'+googleUser.wc.access_token);
                this.axios.post(this.$httpConfig.GoogleLogin,QS.stringify({
                    access_token:googleUser.wc.access_token,
                })).then((res) => {
                    Toast(res.data.message);
                    if(res.data.status == 1){
                        sessionStorage.clear(); 
                        sessionStorage.setItem("data_token", res.data.data.token);
                        let redirect = this.$route.query.redirect;
                        if(redirect) {
                            window.location.href = redirect;
                        } else {
                            this.$router.push('/home')
                        }
                    }
                }).catch((err) => {
                    console.log('newgoogleCatch'+err);
                });
            },
            onFailure(err) {
                console.log('newgoogleErr'+err);
            },
            OnFacebookAuthSuccess(idToken) {
                 console.log('facebook'+idToken);
            },
            OnFacebookAuthFail(error) {
                console.log('facebookError'+error)
                console.log('facebookErr'+JSON.stringify(error))
            },
        	init(){
        		this.show = document.body.clientHeight<500?false:true
        	},
        	open(){
        		this.eye=!this.eye;
        		this.checked=true;
        	},
        	close(){
        		this.checked=false;
        		this.eye=!this.eye
            },
        	qqLogin() {
                
                this.axios.post(this.$httpConfig.qqThirdParty,QS.stringify({
                    type:1,
                    token: sessionStorage.getItem("data_token")
                })).then((res) => {
                    location.href = res.data.data;
                }).catch((err) => {
                    console.log(err)
                });
        	},
            remove(){//路由回退一步
                this.$router.go(-2);
            },
            //设置登录时的时间
            setTime(){
                let curTime = new Date().getTime();
                localStorage.setItem('cur_Time',curTime);
            },
            logoIn(){//帐户名密码是否正确如果正确跳转主页
                if(this.userName == ''){
                    Toast({
                        message: '账号不能为空',
                        position: 'bottom',
                        duration: 1000
                    });
                    return;
                }
                if(this.passWord.length<6){
                    Toast('请输入密码');
                    return;
                }
                this.load = true;
                this.axios.post(this.$httpConfig.login,QS.stringify({
                    account:this.userName,
                    password:this.passWord
                })).then((res) => {
                    Toast(res.data.message);
                    this.load = false;
                    if(res.data.status == 1){
                        sessionStorage.clear(); 
                        // this.setTime(); //不要删除
                        sessionStorage.setItem("data_token", res.data.data.token);
                        let redirect = this.$route.query.redirect;
                        if(redirect) {
                            window.location.href = redirect;
                        } else {
                            this.$router.push('/home')
                        }
                        this.show = false;
                    }
                }).catch((err) => {
                    console.log(err)
                });
            },
            goNow(){//跳转注册页
                this.$router.push({
                    path : '/Register'
                });
                this.show = false;
            },
            other(){//无法登录
                this.isActive = true;
            },
            increment(){
                this.isActive = false;
            },
            toSms(){
                this.$router.push({
                    path:'/sms'
                });
                this.show = false;
            },
            toback(){
                this.$router.push({
                    path : '/bachWord'
                });
                this.show = false;
            },
            bindNumber(){
                this.$router.push({
                    path:'/logInBind'
                });
            },
        }
    }
</script>
<style lang="less">
.mint-popup {
  border-radius: .2rem !important;
}
.fb_button {
    width: 1.21rem !important;
    border: 0px solid #fff !important;
    height:1.21rem;
    .spinner {
        box-sizing: border-box;
        width: 30px;
        height: 90%;
        border-radius: 50%;
        border: 5px solid #f3f3f3;
        border-top-color: rgb(243, 243, 243);
        border-top-style: solid;
        border-top-width: 5px;
        border-top: 5px solid #3498db;
        -webkit-animation: spin-data-v-0af1f3c3 2s linear infinite;
        animation: spin-data-v-0af1f3c3 2s linear infinite;
        position: absolute;
        left: 5px;
        display: none !important;
    }
    .fb_button .container {
        border: 0px solid #fff !important;
        width: 1.21rem !important;
        overflow: hidden;
        height: 1.21rem !important;
        line-height: 1.21rem !important;
    }
    button {
        position: relative;
        padding: 0 !important;
        border: none;
        line-height: 1.21rem !important;
        font-size: .6rem !important;
        color: #FFF;
        min-width: 1.21rem !important;
        // background-image: linear-gradient(#4C69BA, #3B55A0) !important;
        background-image:url(../../assets/Facebook_Logo.png) !important;
        background-size:100% 100%;
        width:1.21rem;
        height:1.21rem;
        border-radius: 50% !important;
        font-weight: bold;
        }
        img {
            border: 0;
            vertical-align: middle;
            display: none !important;

        }
}
</style>
<style lang="less" scoped>
.Bindfrom{
    padding: .3rem;
    width: 6rem;
    .TitlePage{
        font-size: .28rem;
        text-align: center;
    }
    .input-main{
        height:1.1rem;
        margin-top:.3rem;
        position:relative;
        .icon{
            width:1.1rem;
            height:100%;
            position:absolute;
            left:0;
            top:0;
        }
        input{
            width:100%;
            height:100%;
            border:none;
            background:#f5f5f5;
            text-indent:1.1rem;
            border-radius:5px;
            font-size:.28rem;
        }
    }
    .userName{
        .icon{
            background:url(../../assets/images/yhm.png) no-repeat center;
            background-size:.44rem .55rem;
        }
    }
    .message{
        .icon{
            background:url(../../assets/message.png) no-repeat center;
            background-size:.41rem .33rem;
        }
        .btn-ver{
            width:1.88rem;
            height:1.04rem;
            position:absolute;
            right:.04rem;
            top:50%;
            margin-top:-.52rem;
            border:none;
            background:#fff;
            font-size:.26rem;
            color:#333;
            border-radius:5px;
            outline:none;
        }
        .btn-ver:active{
            background:#ccc;
            color:#333;
        }
        .btn-ver.active{
            background:#f9781e;
            color:#fff;
        }
    }
    .btncomfir{
        width:100%;
        height:1rem;
        border:none;
        border-radius:.1rem;
        outline:none;
        margin-top:.3rem;
        background: #d02629;
        font-size:.36rem;
        color:#fff;
    }
}
    .logoin-main{
        padding:0 .6rem;
        background:#fff;
        position: relative;
        .logoIn-header{
            width:100%;
            height:.9rem;
            line-height:.9rem;
            text-align:center;
            font-size:.36rem;
            color:#333;
            position:relative;
            .btn-back{
                width:1.3rem;
                height:100%;
                font-size:.28rem;
                color:#999;
                position:absolute;
                left:-.6rem;
                top:0;
            }
        }
        .logo{
            width:100%;
            height:2.26rem;
            position:relative;
            img{
                width:3.4rem;
                height:.95rem;
                position:absolute;
                left:0;
                bottom:0;
                right:0;
                top:0;
                margin:auto;
            }
        }
        .from{
            padding-top:.8rem;
            .input-main{
                height:1rem;
                margin-bottom:.3rem;
                position:relative;
                .icon{
                    width:1rem;
                    height:90%;
                    position:absolute;
                    left:0;
                    top:0;
                }
                input{
                    width:100%;
                    height:85%;
                    border:none;
                    background:#fff;
                    text-indent:1.1rem;
                    border-radius:5px;
                    font-size:.28rem;
                    border: 1px solid #ccc;
                }
                .open{
                	position: absolute;
                	top: .2rem;
                	width: .5rem;
                	right: .15rem;
                	color: #CCCCCC;
                }
                .close{
                	position: absolute;
                	top: .44rem;
                	width: .35rem;
                	right: .2rem;
                	color: #FF0000;
                }
            }
            .userName{
                .icon{
                    background:url(../../assets/images/yhm.png) no-repeat center;
                    background-size:.44rem .55rem;
                }
            }
            .passWord{
                .icon{
                    background:url(../../assets/passWord.png) no-repeat center;
                    background-size:.44rem .51rem;
                }
            }
        }
        .btn-in{
            width:100%;
            height:.95rem;
            border:none;
            border-radius:25/100rem;
            outline:none;
            margin-top:.3rem;
            background: #d02629;
            font-size:.36rem;
            color:#fff;
        }
        .fail-link{
            padding-top:.3rem;
            li{
                width:50%;
                text-align:center;
                font-size:.28rem;
            }
            li:nth-child(1){
                border-right:1px solid #dedede;
                box-sizing:border-box;
                -moz-box-sizing:border-box;
                -webkit-box-sizing:border-box;
                color:#797979;
            }
            li:nth-child(2){
                color:#d02629;
            }
        }
        .tplogin{
            width:6.3rem;
            text-align:center;
            position:absolute;
            left:.6rem;
            bottom:0;
            dt{
                width:100%;
                font-size:.24rem;
                color:#9f9f9f;
                text-align:center;
                height:.5rem;
                line-height:.5rem;
                position:relative;
                span{
                    position:absolute;
                    top:50%;
                    width:2rem;
                    height:1px;
                    background:#ccc;
                }
                span:nth-child(1){
                    left:0;
                }
                span:nth-child(2){
                    right:0;
                }
            }
            .Ch-qq{
                display:inline-block;
                width:1.21rem;
                height:1.21rem;
                background:url(../../assets/qq_icon_login.png) no-repeat;
                background-size:100% 100%;
                margin:.3rem 0;
            }
            .mm-facebook{
                display:inline-block;
                width:1.21rem;
                height:1.21rem;
                margin:.3rem .5rem .3rem -1.5rem;
                // background:url(../../assets/Facebook_Logo.png) no-repeat;
                // background-size:100% 100%;
            }
            .mm-google{
                display:inline-block;
                width:1.21rem;
                height:1.21rem;
                margin:.3rem 0 .3rem .5rem;  
                position: absolute;        
            }
            .new-google{
                width:1.21rem;
                height:1.21rem;
                background:url(../../assets/google_logo.png) no-repeat;
                background-size:100% 100%;
                border: none;
            }
            // dd:nth-child(3){
            //     margin-left:1.2rem;
            //     margin-right:1.2rem;
            //     background:url(../../assets/wx.jpg) no-repeat;
            //     background-size:100% 100%;
            // }
            // dd:nth-child(4){
            //     background:url(../../assets/logoIn-wb.jpg) no-repeat;
            //     background-size:100% 100%;
            // }
        }
        .actionsheet{
            .box{
                position:fixed;
                top:0;
                left:0;
                width:100%;
                height:100%;
                background:rgba(0,0,0,.5);
            }
            .acti-box.active{
                transition:all .5s ease;
                bottom:0;
            }
            .acti-box{
                position:absolute;
                left:.2rem;
                bottom:-3rem;
                width:7.1rem;
                transition:all .5s ease;
                ul{
                    border-radius:5px;
                    overflow:hidden;
                    text-align:center;
                    li{
                        width:100%;
                        height:.9rem;
                        background:#fff;
                        line-height:.9rem;
                        font-size:.36rem;
                        color:#007aff;
                    }
                    li:nth-child(1){
                        border-bottom:1px solid #d6d6de;
                    }
                }
                .btn{
                    width:100%;
                    background:#fff;
                    line-height:.9rem;
                    font-size:.36rem;
                    color:#007aff;
                    text-align:center;
                    margin:.15rem 0;
                    border-radius:5px;
                }
            }
        }
    }
</style>