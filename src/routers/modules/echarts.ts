import { RouteRecordRaw } from 'vue-router'


const metaModules = import.meta.glob('../../pages/echarts/**/meta.ts')
const compModules = import.meta.glob('../../pages/echarts/**/index.vue');


let subRoutes: any = [];


const subRoutesHandle = async () => {
    for (const pagePath in metaModules) {
        await metaModules[pagePath]().then((mod) => {
            let path = pagePath.replace('../../pages/echarts/', '').replace('/meta.ts', '') || '/';
            const name = pagePath.replace('../../pages/echarts/', '').replace('/meta.ts', '') || '/';
            const comPath = pagePath.replace('meta.ts', 'index.vue');
            subRoutes.push({
                path,
                name,
                component: compModules[comPath],
                meta: mod.default
            })
        })
    }
}
await subRoutesHandle()

console.log(subRoutes, "subRoutes");

// const subRoutes = Object.entries(metaModules).map(item => {
//     console.log(item)
//     const [pagePath, config] = item
//     let path = pagePath.replace('../../pages/echarts/', '').replace('/meta.ts', '') || '/';
//     const name = pagePath.replace('../../pages/echarts/', '').replace('/meta.ts', '') || '/';
//     const comPath = pagePath.replace('meta.ts', 'index.vue');
//     return {
//         path,
//         name,
//         component: compModules[comPath],
//         meta: config.default
//     }
// })

const routes: RouteRecordRaw[] = [
    {
        path: '/echarts',
        name: 'echarts',
        redirect: '/echarts/index',
        component: () => import('@/layout/index.vue'),
        children: subRoutes
    },
]


export default routes
