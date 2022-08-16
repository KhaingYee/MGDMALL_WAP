import wx from 'weixin-js-sdk' //微信sdk依赖
// import http from '../config/HTTP.js' // 引用全局 Reference Global
import qs from "qs";
import axios from 'axios';
const jsApiList = [
  'checkJsApi',
  'updateAppMessageShareData',
  'updateTimelineShareData',
]
//要用到微信API
function getUrl() {
  if (window.entryUrl === '') {
    window.entryUrl = location.href.split('#')[0]
  }
  let u = navigator.userAgent
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // g
  return isAndroid ? location.href.split('#')[0] : window.entryUrl
}
function getJSSDK(weiXin, invitation) {
  // 调用后台接口换取参数
  let url = getUrl()
    //   let wxShareData = {
    //     title: "微信分享测试",
    //     linkurl: location.origin + "/index.html#/test?shareId=154545",
    //     desc: "分享链接添加动态参数",
    //     img: "http://a2.att.hudong.com/36/48/19300001357258133412489354717.jpg"
    //   };
    //   getJSSDK.getJSSDK(wxShareData, "154545");

    // alert(url + " http://localhost:8087/product/25/1")
    // alert(invitation + " 154545")

    // http('api-wechat/share/get-info', { invitation: invitation, url: url }, "post")
    // http("http://api.shopsn.cn/wap/index.php/WeChat/getWxConfig", "get")
    axios
    .post(
        request + "WeChat/getWxConfig",
        qs.stringify({
            url: location.href.split('#')[0]
        })
    )
    .then(res => {
        // console.log("hello thank you " + JSON.stringify(weiXin))
        // console.log("hello thank you " + JSON.stringify(res.data.data))
        // console.log("hello thank you " + JSON.stringify(jsApiList))
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            beta : true,
            appId: res.data.data.appId, // 必填，公众号的唯一标识
            timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
            signature: res.data.data.signature, // 必填，签名
            jsApiList: jsApiList // 必填，需要使用的JS接口列表
        })
        wx.ready(function() {
            wx.checkJsApi({
                jsApiList: [
                    // 'showAllNonBaseMenuItem',
                    'updateAppMessageShareData',
                    'updateTimelineShareData',
                ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function(res) {
                    console.log('检测', res)
                }
            })
            // wx.onMenuShareAppMessage({
            //     title: weiXin.title,
            //     desc: weiXin.desc,
            //     link: window.location.href, //weiXin.linkurl
            //     imgUrl: weiXin.img,
            //     trigger: function trigger(res) {},
            //     success: function success(res) {
            //         console.log('已分享')
            //     },
            //     cancel: function cancel(res) {
            //         console.log('已取消')
            //     },
            //     fail: function fail(res) {
            //         alert("onMenuShareAppMessage " + JSON.stringify(res))
            //     }
            // })
            wx.updateAppMessageShareData({
                title: weiXin.title, // share title
                link: weiXin.linkurl, // window.location.href, // share link 
                imgUrl: weiXin.img, // share icon
                desc: weiXin.desc, // share description
                trigger: function trigger(res) {
                    alert('appmessage-用户点击分享到朋友圈');
                },
                success: function success(res) {
                    alert('appmessage-updateAppMessageShareData 已分享');
                },
                cancel: function cancel(res) {
                    alert('appmessage-已取消');
                },
                fail: function fail(res) {
                    alert("appmessage-updateAppMessageShareData " + JSON.stringify(res))
                } 
            });
            
            // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
            // wx.onMenuShareTimeline({
            //     title: weiXin.title,
            //     link: window.location.href, //weiXin.linkurl
            //     imgUrl: weiXin.img,
            //     trigger: function trigger(res) {
            //         // alert('用户点击分享到朋友圈');
            //     },
            //     success: function success(res) {
            //         //alert('已分享');
            //     },
            //     cancel: function cancel(res) {
            //         //alert('已取消');
            //     },
            //     fail: function fail(res) {
            //         alert("onMenuShareTimeline " + JSON.stringify(res))
            //     }
            // })
            
            wx.updateTimelineShareData({
                title: weiXin.title, // share title
                link: weiXin.linkurl, // window.location.href, // share link 
                imgUrl: weiXin.img, // share icon
                trigger: function trigger(res) {
                    alert('timeline-用户点击分享到朋友圈');
                },
                success: function success(res) {
                    alert('timeline-updateTimelineShareData 已分享');
                },
                cancel: function cancel(res) {
                    alert('timeline-已取消');
                },
                fail: function fail(res) {
                    alert("timeline-updateTimelineShareData " + JSON.stringify(res))
                } 
            });
            
            // wx.showAllNonBaseMenuItem() //显示所有非基础组件
        })
        wx.error(function(res) {
            // alert("Not Ready " + JSON.stringify(res));
        })
    })
    .catch(err => {
        console.log("error !! " + err);
    })
}
export default {
  // 获取JSSDK
  getJSSDK: getJSSDK
}


// https://juejin.im/post/6859335686416236552
