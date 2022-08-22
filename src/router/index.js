import Vue from 'vue'
import App from '@/App'
import Router from 'vue-router'

const Home = r => require(['@/components/home/home'], r);
const category = r => require(['@/components/classification/category'], r);
const cart = r => require(['@/components/cart/cart'], r);
const personal = r => require(['@/components/personal/personal'], r);
const subject = r => require(['@/components/subject'], r);

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
            // { // 
            //     path: '/LogIn',
            //     name: 'LogIn',
            //     component: LogIn
            // },

        ]
    }],
});
export default router;
