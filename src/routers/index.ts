import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: 'login',
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/pages/home/index.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/login/index.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
