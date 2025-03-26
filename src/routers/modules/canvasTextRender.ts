

import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/canvasTextRenderer',
    name: 'canvasTextRenderer',
    redirect: '/canvasTextRenderer/index',
    component: () => import('@/layout/index.vue'),
    children: [
        {
            name: 'canvasTextRenderer',
            path: 'index',
            component: () => import('@/pages/canvasTextRenderer/index.vue'),
            meta: {
                title: '文本渲染',
            },
        },
    ],
},
]

export default routes