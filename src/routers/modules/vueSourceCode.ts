import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/vueSourceCode',
        name: 'vueSourceCode',
        redirect: '/vueSourceCode/index',
        component: () => import('@/layout/index.vue'),
        children: [
            {
                name: 'reactivity',
                path: 'reactivity',
                component: () => import('@/pages/vueSourceCode/reactivity/index.vue'),
                meta: {
                    title: 'vueSourceCode/reactivity'
                }
            },
        ]
    },
]

export default routes
