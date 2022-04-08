import { createRouter, createWebHashHistory } from 'vue-router';

export const constantRoutes = [
    {
        path: '/',
        component: () => import(/* webpackChunkName: "login" */ '@/views/Login/index.vue'),
        meta: {
            title: '登录'
        }
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior: () => ({
        top: 0
    }),
    routes: constantRoutes
});

export default router;
