import Vue from 'vue'
import VueRouter from 'vue-router'
import {
    Message
} from 'element-ui';

Vue.use(VueRouter)

const routes = [{
        path: '/login',
        alias: '/',
        name: 'Login',
        component: () =>
            import ('../views/Admin/Login.vue'),
    },
    {
        path: '/register',
        name: 'Register',
        component: () =>
            import ('../views/Admin/Register.vue')
    },
    {
        path: '/goods',
        name: 'Goods',
        meta: { requiresAuth: true },
        component: () =>
            import ('../components/Layout.vue'),
        children: [{
            path: 'list',
            name: 'GoodsList',
            component: () =>
                import ('../views/Goods/List.vue')
        }, {
            path: 'category',
            name: 'GoodsCategory',
            component: () =>
                import ('../views/Goods/Category.vue')
        }, {
            path: 'release',
            name: 'GoodsRelease',
            component: () =>
                import ('../views/Goods/Release.vue')
        }, {
            path: 'edit/:id',
            name: 'GoodsEdit',
			props: true,
            component: () =>
                import ('../views/Goods/Edit.vue')
        }]
    }, {
        path: '/order',
        name: 'Order',
        meta: { requiresAuth: true },
        component: () =>
            import ('../components/Layout.vue'),
        children: [{
            path: 'list',
            name: 'OrderList',
            component: () =>
                import ('../views/Order/list.vue')
        }]
    }, {
        path: '/power',
        name: 'Power',
        meta: { requiresAuth: true },
        component: () =>
            import ('../components/Layout.vue'),
        children: [{
            path: 'menu',
            name: 'PowerMenu',
            component: () =>
                import ('../views/Power/Menu.vue')
        }, {
            path: 'role',
            name: 'PowerRole',
            component: () =>
                import ('../views/Power/Role.vue')
        }]
    }, {
        path: '/user',
        name: 'User',
        meta: { requiresAuth: true },
        component: () =>
            import ('../components/Layout.vue'),
        children: [{
            path: 'list',
            name: 'UserList',
            component: () =>
                import ('../views/User/list.vue')
        }]
    }, {
        path: '/account',
        name: 'Account',
        meta: { requiresAuth: true },
        component: () =>
            import ('../components/Layout.vue'),
        children: [{
            path: 'infos',
            name: 'AccountInfos',
            component: () =>
                import ('../views/Account/Infos.vue')
        }]
    }
]

const router = new VueRouter({
    routes
})

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
    // to要进入的页面，from从那个页面跳转，next跳转的函数
    // 判断是否需要登录
    let isAuth = to.matched.some((item) => item.meta.requiresAuth);
    if (!isAuth) {
        // 不需要登录
        next();
        return;
    }
    // 获取token
    let { token } = sessionStorage;
    //    如果token不存在导航跳转至login，并提示用户
    // 组件外部使用message提示
    if (!token) {
        Message.error('您将要访问的页面需要登录才能继续浏览')
        next({
            path: '/login',
            query: {
                redirect: to.fullPath
            }
        });
    } else {
        // 存在token则放行
        next();
    }
})

export default router