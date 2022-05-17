import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/home',
        name: 'home',
        redirect: '/home/index',
        component: () => import('@/layout/index.vue'),
        children: [
            {
                name: 'home',
                path: 'index',
                component: () => import('@/pages/home/index.vue'),
            },
        ]
    },
]


export default routes
