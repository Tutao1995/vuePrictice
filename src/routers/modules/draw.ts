import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/draw',
    name: 'draw',
    redirect: '/draw/index',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        name: 'draw',
        path: 'index',
        component: () => import('@/pages/draw/index.vue'),
        meta: {
          title: '颜色'
        }
      },
    ]
  },
]


export default routes
