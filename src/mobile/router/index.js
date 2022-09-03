import Vue from 'vue'
import App from '@/App'
import Router from 'vue-router'

const Home = r => require(['@/mobile/components/home/home'], r);
const category = r => require(['@/mobile/components/classification/category'], r);
const messenger = r => require(['@/mobile/components/message/messenger'], r);
const cart = r => require(['@/mobile/components/cart/cart'], r);
const personal = r => require(['@/mobile/components/personal/personal'], r);
const product = r => require(['@/mobile/components/product/productDetail'], r);
const question = r => require(['@/mobile/components/product/question'], r);
const subject = r => require(['@/mobile/components/subject'], r);

Vue.use(Router)
const router = new Router({
    mode: 'history',
    routes: [{
        path: '/',
        component: App, 
        children: [ 
            {
                path: '',
                redirect: '/subject'
            },
            {
                path: '/subject',
                name: 'subject',
                component: subject,
                children: [ 
                    {
                        path: '/subject',
                        redirect: '/home'
                    },
                    { 
                        path: '/home',
                        name: 'home',
                        component: Home
                    },
                    {
                        path: '/category',
                        name: 'category',
                        component: category
                    },
                    {
                        path: '/messenger',
                        name: 'messenger',
                        component: messenger
                    },
                    {
                        path: '/cart',
                        name: 'cart',
                        component: cart
                    },
                    {
                        path: '/personal',
                        name: 'personal',
                        component: personal
                    },
                ]
            },
            {
                path: '/product',
                name: 'product',
                component: product
            },
            {
                path: '/question',
                name: 'question',
                component: question
            },

        ]
    }],
});
export default router;
