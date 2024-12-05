import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/directives',
        name: 'directives',
        redirect: '/directives/draggable',
        component: () => import('@/layout/index.vue'),
        children: [
            {
                name: 'copy',
                path: 'copy',
                component: () => import('@/pages/directives/copy/index.vue'),
                meta: {
                    title: '自定义指令/复制',
                },
            },
            {
                name: 'draggable',
                path: 'draggable',
                component: () => import('@/pages/directives/draggable/index.vue'),
                meta: {
                    title: '自定义指令/拖拽',
                },
            },
            {
                name: 'debounce',
                path: 'debounce',
                component: () => import('@/pages/directives/debounce/index.vue'),
                meta: {
                    title: '自定义指令/防抖',
                },
            },
            {
                name: 'throttle',
                path: 'throttle',
                component: () => import('@/pages/directives/throttle/index.vue'),
                meta: {
                    title: '自定义指令/节流',
                },
            },
            {
                name: 'clickOutside',
                path: 'clickOutside',
                component: () => import('@/pages/directives/clickOutside/index.vue'),
                meta: {
                    title: '自定义指令/clickOutside',
                },
            },
            {
                name: 'useModel',
                path: 'useModel',
                component: () => import('@/pages/directives/vModel/index.vue'),
                meta: {
                    title: '自定义指令/useModel',
                },
            },
            {
                name: 'contextMenu',
                path: 'contextMenu',
                component: () => import('@/pages/directives/contextMenu/index.vue'),
                meta: {
                    title: '自定义指令/contextMenu',
                },
            },
        ],
    },
]

export default routes
