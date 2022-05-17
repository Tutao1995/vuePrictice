import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/components',
        name: 'components',
        redirect: '/components/table',
        component: () => import('@/layout/index.vue'),
        children: [
            {
                name: 'table',
                path: 'table',
                component: () => import('@/pages/components/table/index.vue'),
            },
            {
                name: 'button',
                path: 'button',
                component: () => import('@/pages/components/button/index.vue'),
            },
        ]
    },
]


export default routes
