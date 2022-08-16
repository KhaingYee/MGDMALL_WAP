import Vue from 'vue'
import App from '@/App'
import Router from 'vue-router'

// 发票
const documents = r => require(['@/components/documents/documents'], r); //发票
const IncreaseDoc = r => require(['@/components/documents/IncreaseDoc'], r); //增资发票
const ordinaryDoc = r => require(['@/components/documents/ordinaryDoc'], r); //普通发票
const editIncrease = r => require(['@/components/documents/editIncrease'], r); //编辑增值发票
const editOrdinary = r => require(['@/components/documents/editOrdinary'], r); //编辑普通发票

// 品牌馆
const brandList = r => require(['@/components/brandMuseum/list'], r); //品牌列表
const braDetails = r => require(['@/components/brandMuseum/listDetails'], r); //品牌详情页
const latestProm = r => require(['@/components/latestProm/latestProm'], r); //最新促销

// 积分相关
const IntegralMall = r => require(['@/components/IntegralMall/index'], r); //积分商城-列表
const intOrder = r => require(['@/components/IntegralMall/integral_order'], r); //积分订单
const integralDetail = r => require(['@/components/IntegralMall/integralDetail'], r); //积分商品详情

//搜索
const Search = r => require(['@/components/search/Search'], r); // 首页热搜
const SearchStoreGoods = r => require(['@/components/search/SearchStoreGoods'], r); // 在店铺搜索商品

// 购物车
const Cart = r => require(['@/components/cart/Cart'], r); // 购物车
const cartPackage = r => require(['@/components/cart/cartPackage'], r); // 购物车

// 确认订单
const Order = r => require(['@/components/confirmOrder/confirmOrder'], r); // 立即购买确认订单
const FlashOrder = r => require(['@/components/confirmOrder/FlashOrder'], r);
const activityOrder = r => require(['@/components/confirmOrder/activityOrder'], r);
const confirmOrderIntegral = r => require(['@/components/confirmOrder/confirmOrderIntegral'], r); // 积分立即购买确认订单
const cartOrder = r => require(['@/components/confirmOrder/cartOrder'], r); // 购物车确认订单
const cartOrderPackage = r => require(['@/components/confirmOrder/cartOrderPackage'], r); // 购物车套餐确认订单
const orderPackage = r => require(['@/components/confirmOrder/orderPackage'], r); // 套餐立即购买确认订单
const comboOrder = r => require(['@/components/confirmOrder/comboOrder'], r) // 组合订单页
const confirmPanic = r => require(['@/components/confirmOrder/confirmPanic'], r) // 抢购确认订单页

// 支付
const cashier = r => require(['@/components/payment/Cashier'], r); // 收银台 
const cashierPackage = r => require(['@/components/payment/CashierPackage'], r); // 套餐收银台
const CashierOpenShopPay = r => require(['@/components/payment/CashierOpenShopPay'], r); // 店铺入驻收银台
const CashierIntegral = r => require(['@/components/payment/CashierIntegral'], r); // 收银台

// 支付结果
const success = r => require(['@/components/paymentResult/success'], r); // 微信支付商品结果
const success_alipay = r => require(['@/components/paymentResult/success_alipay'], r); // 支付宝支付商品结果
const recharge_success = r => require(['@/components/paymentResult/recharge_success'], r); // 支付宝支付积分结果
const recharge_wx_success = r => require(['@/components/paymentResult/recharge_wx_success'], r); // 微信支付积分结果
const open_shop_alipay_success = r => require(['@/components/paymentResult/open_shop_alipay_success'], r); // 支付宝支付入驻结果
const open_shop_wx_success = r => require(['@/components/paymentResult/open_shop_wx_success'], r); // 微信支付入驻结果

// 订单
const orderWrap = r => require(['@/components/order/order'], r); // 订单
const orderList = r => require(['@/components/order/orderList'], r); // 订单
const orderDetails = r => require(['@/components/order/orderDetails'], r); // 订单详情
const progress = r => require(['@/components/order/progressQuery'], r); // 进度查询
const serviceBack = r => require(['@/components/order/serviceBack'], r); // 申请售后
const evaluate = r => require(['@/components/order/evaluate'], r); // 商品评价
const logis = r => require(['@/components/order/logistics'], r); // 物流查询
const repair = r => require(['@/components/order/returnRepair'], r); // 退货返修

// 套餐订单
const packageList = r => require(['@/components/packageOrder/packageOrderList'], r); // 套餐订单
const packageOrderInfo = r => require(['@/components/packageOrder/packageOrderInfo'], r); // 套餐订单详细信息
//我的钱包
const myWallet = r => require(['@/components/myWallet/myWallet'], r); //我的钱包
const recharge = r => require(['@/components/myWallet/recharge'], r); //充值
const withdr = r => require(['@/components/myWallet/Withdrawals'], r); //提现
const bankCash = r => require(['@/components/myWallet/bankCash'], r); //银行卡提现
const alipayCash = r => require(['@/components/myWallet/alipayCash'], r); //支付宝提现
const billingDetails = r => require(['@/components/myWallet/billingDetails'], r); //我的帐单详情
const myIntegral = r => require(['@/components/myWallet/myIntegral'], r); //我的积分
const pointsRules = r => require(['@/components/myWallet/pointsRules'], r) // 积分规则

// 个人中心的菜单
const subject = r => require(['@/components/subject'], r); // 主页-分类-购物车-个人中心入口
const myCollection = r => require(['@/components/person/myCollection'], r); //我的收藏
const myNews = r => require(['@/components/person/news_list'], r); //我的消息
const newsConent = r => require(['@/components/person/news_content'], r); //我的消息-内容
const newsDetail = r => require(['@/components/person/news_detail'], r); //我的消息-详情
const feedback = r => require(['@/components/person/Feedback'], r); //意见反馈
const message = r => require(['@/components/person/message'], r); //意见反馈
const footprint = r => require(['@/components/person/footprint'], r); //我的足迹
const myComment = r => require(['@/components/person/myComment'], r); //我的评论
const customer = r => require(['@/components/person/customerService'], r); // 客户服务
const invoice = r => require(['@/components/person/invoice'], r); // 发票信息
const cutPrice = r => require(['@/components/home/children/cutPrice'],r);
const puzzleSuccess = r => require(['@/components/person/puzzleSuccess'], r);
const puzzleOrderDetail = r => require(['@/components/person/puzzleOrderDetail'], r);
const shareAssemble = r => require(['@/components/person/shareAssemble'], r);
const puzzleOrder = r => require(['@/components/person/puzzleOrder'], r);

// 地址管理
const address = r => require(['@/components/person/address'], r); //收货地址
const EdiAddress = r => require(['@/components/person/EditDelAddress'], r); //管理收货地址
const newAddress = r => require(['@/components/person/newAddress'], r); //新建收货地址

// 个人中心
const person = r => require(['@/components/person/PersonalCenter'], r); //个人中心
const personalData = r => require(['@/components/person/personalData'], r); //个人资料
const add = r => require(['@/components/add/add'],r);
const seetin = r => require(['@/components/person/settings'], r); //账户设置
const phone = r => require(['@/components/person/ModifyPhone'], r); //修改手机号绑定
const modifyPassword = r => require(['@/components/person/modifyPassword'], r); //修改密码

// 注册登录
const LogIn = r => require(['@/components/logIn/logIn'], r); //登录
const Register = r => require(['@/components/logIn/register'], r); //注册
const Sms = r => require(['@/components/logIn/SMSLogin'], r); //短信登录
const bachWord = r => require(['@/components/logIn/retrievePassword'], r); //忘记密码
const logInBind = r => require(['@/components/logIn/logInBind'], r); //绑定
const authLogin = r => require(['@/components/logIn/children/authLogin'], r); //授权成功
const authError = r => require(['@/components/logIn/authError'], r); //授权失败
const reset = r => require(['@/components/logIn/resetPassword'], r); // 重置密码
const phoneVerify = r => require(['@/components/logIn/phoneVerify'], r); // 修改密码手机验证

// 主页
const Home = r => require(['@/components/home/home'], r); //主页
const activity = r => require(['@/components/home/activity'], r); //主页  
const productList = r => require(['@/components/home/productList'], r);
const storeList = r => require(['@/components/home/storeList'], r);
const newList = r => require(['@/components/home/newList'], r);
const popularList = r => require(['@/components/home/popularList'], r);
const flashDetail = r => require(['@/components/home/flashDetail'], r);
const Class = r => require(['@/components/home/classification'], r); //分类

// page页
const prTab = r => require(['@/components/page/children/tab'], r); //商品详情图
const commentPage = r => require(['@/components/page/children/commentPage'], r);
const quesanswer = r => require(['@/components/page/children/ans'], r);
const detailspage = r => require(['@/components/page/children/detailspage'], r);
const attributespage = r => require(['@/components/page/children/attributespage'], r);
const answerDetails = r => require(['@/components/page/children/answerDetails'], r); //商品咨询详情
const list = r => require(['@/components/page/list'], r); //商品列表
const listHomeMore = r => require(['@/components/page/listHomeMore'], r); //商品列表
const integralTab = r => require(['@/components/page/children/integralTab'], r); //商品详情图
const listStoreGoods = r => require(['@/components/page/listStoreGoods'], r); // 在店铺搜索商品
const payment = r => require(['@/components/page/payment'], r); // 付款
const paymentinfo = r => require(['@/components/page/paymentinfo'], r); // 付款信息 不要删除
const Notice = r => require(['@/components/page/Notice'], r); // 公告
const noticeChild = r => require(['@/components/page/children/notice_child'], r); //公告查询

// 商品详情页
const withPackages = r => require(['@/components/product/withPackages'], r) // 套餐配件
const product = r => require(['@/components/product/product'], r); //商品详情
const flashproduct = r => require(['@/components/product/flashproduct'], r);
const report = r => require(['@/components/product/report'], r);
const coupon = r => require(['@/components/product/coupon'], r); //优惠券
const appointment = r => require(['@/components/product/appointment'], r); //优惠券

//activity
const assembleproduct = r => require(['@/components/product/assembleproduct'], r); 
// const withCombination = r => require(['@/components/product/withCombination'], r)
const seckill = r => require(['@/components/page/seckill'],r); 
const bargain = r => require(['@/components/page/bargain'],r); 
const assemble = r => require(['@/components/page/assemble'],r); 
const seckillcommoditydetails = r => require(['@/components/page/seckillcommoditydetails'], r); 
const goodsevaluate = r => require(['@/components/order/goodsevaluate'], r);

// report
const backInform = r => require(['@/components/report/backInform'], r);
const cancelNotice = r => require(['@/components/report/cancelNotice'], r);
const checkInform = r => require(['@/components/report/checkInform'], r);
const comHeader = r => require(['@/components/report/comHeader'], r);
const informOutline = r => require(['@/components/report/informOutline'], r);
const violation = r => require(['@/components/report/violation'], r);
const informSingalData = r => require(['@/components/report/informSingalData'], r);
const noticeList = r => require(['@/components/report/noticeList'], r);
const submitSuccess = r => require(['@/components/report/submitSuccess'], r);

// 抢购
const auction = r => require(['@/components/auction/auction'], r) // 抢购页面
const auctionList = r => require(['@/components/auction/auctionList'], r) // 抢购页面

// 个人入驻
const checkProadd = r => require(['@/components/shopOpen/perShop/addInformation'], r); //填写个人资料
const checkProIdInfor = r => require(['@/components/shopOpen/perShop/proId'], r); //填写身份证
const checkProBankInfor = r => require(['@/components/shopOpen/perShop/proBank'], r); //填写银行打款信息（挪到个人资料处了）
const checkProBusinessInfor = r => require(['@/components/shopOpen/perShop/Business'], r); //提交

// 企业入驻
const checkCompanyadd = r => require(['@/components/shopOpen/companyShop/addInformation'], r); //填写资料
const companyPhotos = r => require(['@/components/shopOpen/companyShop/companyPhotos'], r); //营业执照
const organizationPhotos = r => require(['@/components/shopOpen/companyShop/organizationPhotos'], r); //组织结构代码
const checkCompanyBankInfor = r => require(['@/components/shopOpen/companyShop/checkCompanyBankInfor'], r); //组织结构代码
const checkComBusinessInfor = r => require(['@/components/shopOpen/companyShop/Business'], r); //提交

// 入驻协议
const settledAgreement = r => require(['@/components/shopOpen/settledAgreement'], r); //入驻协议
const settledAgreementSuc = r => require(['@/components/shopOpen/settledAgreementSuc'], r); //入驻成功
const agreementDetial = r => require(['@/components/shopOpen/child/agreement_detial'], r); //入驻协议详情页面
const shopOpen = r => require(['@/components/shopOpen/index'], r); // 我要开店
const description = r => require(['@/components/shopOpen/description'], r); // 入驻须知

// 店铺
const shopHomeList = r => require(['@/components/shopCon/shopHomeList'], r); //首页进入的店铺列表
const shopHome = r => require(['@/components/shopCon/shopHome'], r); // 店铺
const shopDetails = r => require(['@/components/shopCon/shopDetails'], r); // 店铺详情
const paperwork = r => require(['@/components/shopCon/paperwork'], r); // 证照信息
const shoplist = r => require(['@/components/shopCon/shoplist'], r); //店铺列表

//分销中心
const distribution = r => require(['@/components/distribution/index'],r); //分销中心
const myTeam = r => require(['@/components/distribution/myTeam'],r); //我的团队
const distributionOrder = r => require(['@/components/distribution/distributionOrder'],r); //分销订单
const commission = r => require(['@/components/distribution/commission'],r); //分销佣金
const presentationDetail = r => require(['@/components/distribution/presentationDetail'],r); //提现明细
const disqrcode = r => require(['@/components/distribution/qrcode'],r);

Vue.use(Router)
const router = new Router({
    mode: 'history',
    routes: [{
        path: '/',
        component: App, //顶层路由，对应index.html
        children: [ //二级路由。对应App.vue
            //地址为空时跳转home页面
            {
                path: '',
                redirect: '/subject'
            },
            {
                path: '/subject',
                name: 'subject',
                component: subject,
                children: [ //地址为/subject跳转home
                    {
                        path: '/subject',
                        redirect: '/home'
                    },
                    { // 主页
                        path: '/home',
                        name: 'home',
                        component: Home
                    },
                    { // 分类
                        path: '/class',
                        name: 'class',
                        component: Class
                    }, { // 购物车
                        path: '/Cart',
                        name: 'Cart',
                        component: Cart
                    },
                    { // 购物车
                        path: '/cartPackage',
                        name: 'cartPackage',
                        component: cartPackage
                    },
                    { // 个人中心
                        path: '/person',
                        name: 'person',
                        component: person
                    },
                    { 
                        path: '/activity',
                        name: 'activity',
                        component: activity
                    },
                ]
            },
            { // 登录
                path: '/LogIn',
                name: 'LogIn',
                component: LogIn
            },
            {
                path: '/authLogin/:auth_id',
                name: 'authLogin',
                component: authLogin
            },
            {
                path: '/authError/:info',
                name: 'authError',
                component: authError
            },
            { // 短信验证登录
                path: '/sms',
                name: 'sms',
                component: Sms
            },
            { // 注册
                path: '/Register',
                name: 'register',
                component: Register
            },
            {
                path:'/add',
                name:'add',
                component:add
            },
            { // 忘记密码
                path: '/bachWord',
                name: 'bachWord',
                component: bachWord
            },
            { // 登录绑定
                path: '/logInBind',
                name: 'logInBind',
                component: logInBind
            },
            { // 公告
                path: '/Notice',
                name: 'Notice',
                component: Notice
            },
            { // 公告详情
                path: '/noticeChild/:id',
                name: 'noticeChild',
                component: noticeChild
            },
            { // 品牌馆列表
                path: '/brandList',
                name: 'brandList',
                component: brandList
            },
            { // 品牌馆详情
                path: '/braDetails/:ID',
                name: 'braDetails',
                component: braDetails
            },
            { // 最新促销
                path: '/latestProm',
                name: 'latestProm',
                component: latestProm
            },
            { //热搜商品列表
                path: '/list/:id/:status',
                name: 'list',
                component: list
            },
            { //商品列表
                path: '/comList/:status',
                name: 'comList',
                component: list
            },
            { //从首页“更多”进入的商品列表
                path: '/listHomeMore/:status',
                name: 'listHomeMore',
                component: listHomeMore
            },
            { //积分商城-列表
                path: '/IntegralMall',
                name: 'IntegralMall',
                component: IntegralMall
            },
            { //优惠券
                path: '/coupon',
                name: 'coupon',
                component: coupon
            },
            { //我的足迹
                path: '/footprint',
                name: 'footprint',
                component: footprint
            },
            { //我的评论
                path: '/myComment',
                name: 'myComment',
                component: myComment
            },
            { //意见反馈
                path: '/feedback',
                name: 'feedback',
                component: feedback
            },
            { //商品详情Tbg
                path: '/tab/:id/:p_id/',
                name: 'tab',
                component: prTab
            },
            { //我的评论
                path: '/commentPage/:id/:p_id/',
                name: 'commentPage',
                component: commentPage
            },
            {//商品咨询页
                path: '/ans/:id/:p/',
                name: 'quesanswer',
                component: quesanswer
            },
            { //商品详情页
                path: '/detailspage',
                name: 'detailspage',
                component: detailspage
            },
            { //商品属性页
                path: '/attributespage',
                name: 'attributespage',
                component: attributespage
            },
            { //商品咨询详情
                path: '/answerDetails',
                name: 'answerDetails',
                component: answerDetails
            },
            { //积分商品详情Tbg
                path: '/integralTab/:id',
                name: 'integralTab',
                component: integralTab
            },
            { //我的消息
                path: '/myNews',
                name: 'myNews',
                component: myNews
            },
            { //我的消息-内容
                path: '/newsConent/:id/:status',
                name: 'newsConent',
                component: newsConent
            },
            { //我的消息-详情
                path: '/newsDetail/:id/:status',
                name: 'newsDetail',
                component: newsDetail
            }, { //搜索页
                path: '/search',
                name: 'search',
                component: Search
            },
            { //搜索页--在店铺搜索商品
                path: '/SearchStoreGoods/:id',
                name: 'SearchStoreGoods',
                component: SearchStoreGoods
            },
            { //搜索列表页--在店铺搜索商品
                path: '/listStoreGoods/:data/:id',
                name: 'listStoreGoods',
                component: listStoreGoods
            },
            { //商品详情
                path: '/product/:id/:status',
                name: 'product',
                component: product
            },
            { //商品详情
                path: '/flashproduct/:id/:status',
                name: 'flashproduct',
                component: flashproduct
            },
            { //商品详情
                path: 'appointment',
                name: 'appointment',
                component: appointment
            },
            { 
                path: '/assembleproduct/:id/:goodId',
                name: 'assembleproduct',
                component: assembleproduct
            },
            { //商品详情
                path: '/report/:goods_id/:store_id',
                name: 'report',
                component: report
            },
            { //商品详情
                path: '/backInform',
                name: 'backInform',
                component: backInform
            },
            { //商品详情
                path: '/cancelNotice',
                name: 'cancelNotice',
                component: cancelNotice
            },
            { //商品详情
                path: '/checkInform',
                name: 'checkInform',
                component: checkInform
            },
            { //商品详情
                path: '/comHeader',
                name: 'comHeader',
                component: comHeader
            },
            { //商品详情
                path: '/informOutline',
                name: 'informOutline',
                component: informOutline
            },
            { //商品详情
                path: '/violation',
                name: 'violation',
                component: violation
            },
            { //商品详情
                path: '/informSingalData',
                name: 'informSingalData',
                component: informSingalData
            },
            { //商品详情
                path: '/noticeList',
                name: 'noticeList',
                component: noticeList
            },
            { //商品详情
                path: '/submitSuccess',
                name: 'submitSuccess',
                component: submitSuccess
            },
            { //积分商品详情
                path: '/integralDetail/:id/:status',
                name: 'integralDetail',
                component: integralDetail
            },
            { //积分订单订单
                path: '/intOrder',
                name: 'intOrder',
                component: intOrder
            },
            { //商品立即购买确认订单
                path: '/order/:good_id/:num',
                name: 'order',
                component: Order
            },
            { //商品立即购买确认订单
                path: '/FlashOrder/:good_id/:num',
                name: 'FlashOrder',
                component: FlashOrder
            },
            { //商品立即购买确认订单
                path: '/activityOrder/:id/:goods_num/:goods_id',
                name: 'activityOrder',
                component: activityOrder
            },
            { //商品立即购买确认订单
                path: '/confirmPanic/:good_id/:num',
                name: 'confirmPanic',
                component: confirmPanic
            },
            { //积分商品立即购买确认订单
                path: '/confirmOrderIntegral/:good_id/:num',
                name: 'confirmOrderIntegral',
                component: confirmOrderIntegral
            },
            { //购物车确认订单
                path: '/cartOrder/:cart_id',
                name: 'cartOrder',
                component: cartOrder
            },
            { //购物车套餐确认订单
                path: '/cartOrderPackage/:cart_id/:oldPrice/:reduction',
                name: 'cartOrderPackage',
                component: cartOrderPackage
            }, ,
            { //购物车套餐确认订单
                path: '/orderPackage/:set_meal_id',
                name: 'orderPackage',
                component: orderPackage
            },
            // 付款
            {
                path: '/payment',
                name: 'payment',
                component: payment
            },
            // 付款信息 不要删除
            {
                path: '/paymentinfo',
                name: 'paymentinfo',
                component: paymentinfo
            },
            { //支付
                path: '/cashier/:id/:number',
                name: 'cashier',
                component: cashier
            },
            { //支付
                path: '/cashierPackage/:id/:number',
                name: 'cashierPackage',
                component: cashierPackage
            },
            { //店铺入驻支付
                path: '/CashierOpenShopPay/:id/:number',
                name: 'CashierOpenShopPay',
                component: CashierOpenShopPay
            },
            { // 积分商城支付
                path: '/CashierIntegral/:id/:integral/:money',
                name: 'CashierIntegral',
                component: CashierIntegral
            },
            { //微信支付商品结果
                path: '/success',
                name: 'success',
                component: success
            },
            { //支付宝支付商品结果
                path: '/success_alipay',
                name: 'success_alipay',
                component: success_alipay
            },
            { //支付宝支付积分结果
                path: '/recharge_success',
                name: 'recharge_success',
                component: recharge_success
            },
            { //微信支付积分结果
                path: '/recharge_wx_success/:id',
                name: 'recharge_wx_success',
                component: recharge_wx_success
            },
            { //支付宝支付入驻结果
                path: '/open_shop_alipay_success',
                name: 'open_shop_alipay_success',
                component: open_shop_alipay_success
            },
            { //微信支付入驻结果
                path: '/open_shop_wx_success',
                name: 'open_shop_wx_success',
                component: open_shop_wx_success
            },
            { //账户管理
                path: '/seetin',
                name: 'seetin',
                component: seetin
            },
            { //积分
                path: '/Integral',
                name: 'myIntegral',
                component: myIntegral
            },
            { //我的收藏
                path: '/Collection',
                name: 'myCollection',
                component: myCollection
            },
            { //收货地址
                path: '/address/:status',
                name: 'address',
                component: address
            },
            { //编辑收货地址
                path: '/EdiAddress/:status',
                name: 'EdiAddress',
                component: EdiAddress
            },
            { //新增收货地址
                path: '/newAddress/:status',
                name: 'newAddress',
                component: newAddress
            },
            { //客服服务
                path: '/customer',
                name: 'customer',
                component: customer
            },
            { //修改密码
                path: '/mPassword',
                name: 'mPassword',
                component: modifyPassword
            },
            { //发票信息
                path: '/invoice/:status/:id',
                name: 'invoice',
                component: invoice
            },
            { //砍价详情
                path: '/cutPrice/:id',
                name: 'cutPrice',
                component: cutPrice
            },
            { //发票信息
                path: '/puzzleSuccess/:id',
                name: 'puzzleSuccess',
                component: puzzleSuccess
            },
            { //发票信息
                path: '/puzzleOrderDetail/:id',
                name: 'puzzleOrderDetail',
                component: puzzleOrderDetail
            },
            { //发票信息
                path: '/shareAssemble/:id',
                name: 'shareAssemble',
                component: shareAssemble
            },
            { //发票信息
                path: '/puzzleOrder',
                name: 'puzzleOrder',
                component: puzzleOrder
            },
            { //订单/:status
                path: '/orderWrap',
                name: 'orderWrap',
                component: orderWrap
            },
            { //订单列表
                path: '/orderList/:id',
                name: 'orderList',
                component: orderList
            },
            { //套餐列表
                path: '/packageList/:id',
                name: 'packageList',
                component: packageList
            },
            { //套餐列表
                path: '/packageOrderInfo/:id/:status',
                name: 'packageOrderInfo',
                component: packageOrderInfo
            },
            { //物流查询
                path: '/logis/:id',
                name: 'logis',
                component: logis
            },
            { //订单详情
                path: '/details/:status/:order/:order_type',
                name: 'orderDetails',
                component: orderDetails
            },
            { //退货返修
                path: '/repair',
                name: 'repair',
                component: repair
            },
            { //进度查询
                path: '/progress/:id',
                name: 'progress',
                component: progress
            },
            { //重置密码
                path: '/reset',
                name: 'reset',
                component: reset
            },
            { //修改密码手机验证
                path: '/phoneVerify',
                name: 'phoneVerify',
                component: phoneVerify
            },
            { //个人资料
                path: '/personal',
                name: 'personal',
                component: personalData
            },
            { //修改手机号绑定
                path: '/phone',
                name: 'phone',
                component: phone
            },
            { //申请售后
                path: '/service/:id/:goods_id/:status',
                name: 'serviceBack',
                component: serviceBack
            },
            { //评价商品
                path: '/evaluate/:id',
                name: 'evaluate',
                component: evaluate
            },
            { //我的钱包
                path: '/myWallet',
                name: 'myWallet',
                component: myWallet
            },
            { //充值
                path: '/recharge',
                name: 'recharge',
                component: recharge
            },
            { //提现
                path: '/withdr',
                name: 'withdr',
                component: withdr
            },
            { //银行卡提现
                path: '/bankCash',
                name: 'bankCash',
                component: bankCash
            },
            { //支付宝提现
                path: '/alipayCash',
                name: 'alipayCash',
                component: alipayCash
            },
            { //个人开店信息首页
                path: '/checkProadd',
                name: 'checkProadd',
                component: checkProadd
            },
            { //个人开店信息id
                path: '/checkProIdInfor',
                name: 'checkProIdInfor',
                component: checkProIdInfor

            },
            { //个人开店银行卡
                path: '/checkProBankInfor',
                name: 'checkProBankInfor',
                component: checkProBankInfor

            },
            { //个人开店经营
                path: '/checkProBusinessInfor',
                name: 'checkProBusinessInfor',
                component: checkProBusinessInfor

            },
            { //企业信息入驻
                path: '/checkCompanyadd',
                name: 'checkCompanyadd',
                component: checkCompanyadd

            }, {
                path: '/companyPhotos',
                name: 'companyPhotos',
                component: companyPhotos

            },
            {
                path: '/organizationPhotos',
                name: 'organizationPhotos',
                component: organizationPhotos

            },
            {
                path: '/checkCompanyBankInfor',
                name: 'checkCompanyBankInfor',
                component: checkCompanyBankInfor
            },
            {
                path: '/checkComBusinessInfor',
                name: 'checkComBusinessInfor',
                component: checkComBusinessInfor
            },
            {
                path: '/settledAgreement',
                name: 'settledAgreement',
                component: settledAgreement
            },
            {
                path: '/settledAgreementSuc',
                name: 'settledAgreementSuc',
                component: settledAgreementSuc
            },
            {
                path: '/agreementDetial',
                name: 'agreementDetial',
                component: agreementDetial
            },
            {
                path: '/shoplist/:id',
                name: 'shoplist',
                component: shoplist
            },
            {
                path: '/withPackages/:package_goods_id/:store_id',
                name: 'withPackages',
                component: withPackages
            },
            {
                path: '/comboOrder/:obj',
                name: 'comboOrder',
                component: comboOrder
            },
            {
                path: 'shopHomeList',
                name: 'shopHomeList',
                component: shopHomeList
            },
            {
                path: '/shopDetails/:id',
                name: 'shopDetails',
                component: shopDetails
            },
            {
                path: '/shopHome/:id/:index',
                name: 'shopHome',
                component: shopHome
            },
            {
                path: '/paperwork/:id',
                name: 'paperwork',
                component: paperwork
            },
            {
                path: '/shopOpen',
                name: 'shopOpen',
                component: shopOpen
            },
            {
                path: '/description',
                name: 'description',
                component: description
            },
            {
                path: '/pointsRules',
                name: 'pointsRules',
                component: pointsRules
            },
            {
                path: '/documents',
                name: 'documents',
                component: documents
            },
            {
                path: '/ordinaryDoc',
                name: 'ordinaryDoc',
                component: ordinaryDoc
            },
            {
                path: '/editOrdinary',
                name: 'editOrdinary',
                component: editOrdinary
            },
            {
                path: '/IncreaseDoc',
                name: 'IncreaseDoc',
                component: IncreaseDoc
            },
            {
                path: '/editIncrease',
                name: 'editIncrease',
                component: editIncrease
            },
            {
                path: '/billingDetails/:wallet_id',
                name: 'billingDetails',
                component: billingDetails
            },
            {
                path: '/auction',
                name: 'auction',
                component: auction
            },
            {
                path: '/auctionList/:goods_id',
                name: 'auctionList',
                component: auctionList
            },
            {
                path: '/message',
                name: 'message',
                component: message
            },
            {
                path: '/distribution',
                name: 'distribution',
                component: distribution
            },
            {
                path: '/myTeam',
                name: 'myTeam',
                component: myTeam
            },
            {
                path: '/distributionOrder/:id',
                name: 'distributionOrder',
                component: distributionOrder
            },
            {
                path: '/commission',
                name: 'commission',
                component: commission
            },
            {
                path: '/presentationDetail',
                name: 'presentationDetail',
                component: presentationDetail
            },
            {
                path: '/disqrcode',
                name: 'disqrcode',
                component: disqrcode
            },
            {
                path: '/productList/:id/:name',
                name: 'productList',
                component: productList
            },
            {
                path: '/storeList',
                name: 'storeList',
                component: storeList
            },
            {
                path: '/newList',
                name: 'newList',
                component: newList
            },
            {
                path: '/popularList',
                name: 'popularList',
                component: popularList
            },
            {
                path: '/flashDetail',
                name: 'flashDetail',
                component: flashDetail
            },
            { 
                path: '/seckill',
                name: 'seckill',
                component: seckill
            },
            { 
                path: '/seckillcommoditydetails/:id',
                name: 'seckillcommoditydetails',
                component: seckillcommoditydetails
            },
            { 
                path: '/bargain',
                name: 'bargain',
                component: bargain
            },
            { 
                path: '/assemble',
                name: 'assemble',
                component: assemble
            },
            {
                path: '/goodsevaluate/:goodId',
                name: 'goodsevaluate',
                component: goodsevaluate
            },

        ]
    }],
});
export default router;
