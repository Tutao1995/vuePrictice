import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: 'login',
    },
    {
        path: '/home',
        name: 'home',
        redirect: '/home/table',
        component: () => import('@/layout/index.vue'),
        children: [
            {
                name: 'table',
                path: 'table',
                component: () => import('@/pages/table/index.vue'),
            },
            {
                name: 'button',
                path: 'button',
                component: () => import('@/pages/button/index.vue'),
            },
            {
                name: 'echarts',
                path: 'echarts',
                component: () => import('@/pages/echarts/index.vue'),
            },
        ]
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
