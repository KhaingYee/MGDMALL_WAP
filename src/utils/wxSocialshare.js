//utils.js
import wx from 'weixin-js-sdk'



const wxApi = {
    wxRegister(data, option) {
           //data is the configuration information of WeChat, option is the configuration content shared
           //The option content here will be the same according to the parameters passed by the route, and the content shared will be the same
          
        if (location.pathname !== "/home") {
            option = {
                title: "微信分享测试", //Title to share
                desc: "分享链接添加动态参数", //Shared content
                link: window.location.href, //location.origin + "/index.html#/test?shareId=154545",//Shared path
                imgUrl: "http://a2.att.hudong.com/36/48/19300001357258133412489354717.jpg"
                //Shared picture 
            };
        }
        wx.config({
            debug: true, // enable debug mode
            appId: data.appId, // required, the only identifier of the official account
            timestamp: data.timestamp, // required, the timestamp for generating the signature
            nonceStr: data.nonceStr, // required, generate random string of signature
            signature: data.signature, // required, signature, see appendix 1
            jsApiList: [
                "updateTimelineShareData", //The latest sharing circle of friends
                "updateAppMessageShareData", //The latest sharing friends
                "onMenuShareAppMessage", //The previous method to share the circle of friends
                "onMenuShareTimeline"//The previous method to share friends
            ] // Required, a list of JS interfaces to be used, see Appendix 2 for a list of all JS interfaces
        });
        
        wx.ready(function() { //需在用户可能点击分享按钮前就先调用
            // Data shared by WeChat
            var shareData = {
                title: option.title, // share title
                link: option.link, // share link
                imgUrl: option.imgUrl, // share icon
                desc: option.desc, // share description
                success(res){
                    alert('微信接口成功' + res.errMsg);
                },
                fail(res){
                    alert('微信接口失败' + res.errMsg);
                },
                complete(res){
                    alert('微信调用完成' + res.errMsg);
                }  
            };
            
            wx.updateTimelineShareData(shareData);
            wx.updateAppMessageShareData(shareData);
            wx.onMenuShareTimeline(shareData);
            wx.onMenuShareAppMessage(shareData);
            
        });
        wx.error(function(res){
            alert(res)
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });

       
        // var weixinShareData = {
        //     title: "微信分享测试", // share title
        //     link: location.origin + "/index.html#/test?shareId=154545", // share link
        //     imgUrl: "http://a2.att.hudong.com/36/48/19300001357258133412489354717.jpg", // share icon
        //     desc: "分享链接添加动态参数", // share description
        //     success(res){
        //         alert('微信接口成功' + res.errMsg);
        //     },
        //     fail(res){
        //         alert('微信接口失败' + res.errMsg);
        //     },
        //     complete(res){
        //         alert('微信调用完成' + res.errMsg);
        //     }  
        // };
        // shareWeChat.onclick = function(){
        //     wx.updateAppMessageShareData(weixinShareData);
        // }
    }
  };
  export default wxApi;


  
  