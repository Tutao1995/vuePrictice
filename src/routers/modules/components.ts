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
                meta: {
                    title: '组件/表格',
                },
            },
            {
                name: 'button',
                path: 'button',
                component: () => import('@/pages/components/button/index.vue'),
                meta: {
                    title: '组件/按钮',
                },
            },
            {
                name: 'virtualList',
                path: 'virtualList',
                component: () => import('@/pages/components/virtualList/index.vue'),
                meta: {
                    title: '组件/虚拟列表',
                },
            },
        ],
    },
]

export default routes
