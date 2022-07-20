import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/echarts',
    name: 'echarts',
    redirect: '/echarts/index',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        name: 'columnChart',
        path: 'columnChart',
        component: () => import('@/pages/echarts/columnChart/index.vue'),
        meta: {
          title: 'echarts/柱状图'
        }
      },
      {
        name: 'lineEchart',
        path: 'lineEchart',
        component: () => import('@/pages/echarts/lineEchart/index.vue'),
        meta: {
          title: 'echarts/折线图'
        }
      },
      {
        name: 'pieChart',
        path: 'pieChart',
        component: () => import('@/pages/echarts/pieChart/index.vue'),
        meta: {
          title: 'echarts/水状图'
        }
      },
    ]
  },
]


export default routes
