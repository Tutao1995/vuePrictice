import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import NProgress from "@/config/nprogress/index";
import { useMainStore } from '@/stores/index'

const metaRouters = import.meta.globEager("./modules/*.ts");
export const routerArray: RouteRecordRaw[] = [];
Object.keys(metaRouters).forEach(item => {
    Object.keys(metaRouters[item]).forEach((key: any) => {
        routerArray.push(...metaRouters[item][key]);
    });
});

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: 'login',
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/login/index.vue'),
    },
    ...routerArray
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: () => ({ left: 0, top: 0 })
})


router.beforeEach((to, from, next) => {
    NProgress.start();
    const isLogin = useMainStore().isLogin;
    if (to.name === 'login') {
        next()
    } else {
        if (!isLogin) {
            next('/')
            return
        }
        next()
    }

});

router.afterEach(() => {
    NProgress.done();
});

export default router
