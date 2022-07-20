import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import NProgress from "@/config/nprogress/index";
import { useMainStore } from '@/stores/index'

const metaRouters = import.meta.globEager("./modules/*.ts");
export const routerArray: RouteRecordRaw[] = [];
Object.keys(metaRouters).forEach(item => {
  Object.keys(metaRouters[item]).forEach((key: any) => {
    routerArray.push(...metaRouters[item][key]);
  });
});

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue'),
  },
  ...routerArray
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})


router.beforeEach((to, from, next) => {
  NProgress.start();
  const isLogin = useMainStore().isLogin;
  const title = to.meta.title
  if (to.name === 'login') {
    useMainStore().$patch({
      isLogin: false,
      title: ''
    })
    next()
  } else {
    if (!isLogin) {
      useMainStore().$patch({
        isLogin: false,
        title: ''
      })
      next('/')
      return
    }
    useMainStore().changeTitleState(title as string)
    next()
  }

});

router.afterEach(() => {
  NProgress.done();
});

export default router
