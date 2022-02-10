import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import storage from 'good-storage'
import routes from './router'

const router = createRouter({
        history: createWebHistory(),
        routes
    })
    // 路由拦截
router.beforeEach((to, from, next) => {
    const isLogin = storage.get('isLogin')
    if (to.path == '/login' || to.path == '/home') {
        next();
    } else {
        // 是否在登录状态下
        isLogin ? next() : next('/login');
    }
});
export default router