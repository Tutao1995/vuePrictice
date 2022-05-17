import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/echarts',
        name: 'echarts',
        redirect: '/echarts/index',
        component: () => import('@/layout/index.vue'),
        children: [
            {
                name: 'echarts',
                path: 'index',
                component: () => import('@/pages/echarts/index.vue'),
            },
        ]
    },
]


export default routes
