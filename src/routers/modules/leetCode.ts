import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/leetCode',
        name: 'leetCode',
        redirect: '/leetCode/index',
        component: () => import('@/layout/index.vue'),
        children: [
            {
                name: 'queue',
                path: 'queue',
                component: () => import('@/pages/leetCode/queue/index.vue'),
                meta: {
                    title: 'leetCode/队列',
                },
            },
        ],
    },
]

export default routes
