import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/color',
    name: 'color',
    redirect: '/color/index',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        name: 'color',
        path: 'index',
        component: () => import('@/pages/color/index.vue'),
        meta: {
          title: '颜色'
        }
      },
    ]
  },
]


export default routes
