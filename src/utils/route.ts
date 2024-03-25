
import { RouteRecordRaw } from 'vue-router'
export type Modules = Record<string, () => Promise<{
    [key: string]: any;
}>>

export const subRoutesHandle = async (metaModules: Modules, compModules: Modules, route: string) => {
    const subRoutes: RouteRecordRaw[] | undefined = []
    for (const pagePath in metaModules) {
        await metaModules[pagePath]().then((mod: any) => {
            let path = pagePath.replace(`../../pages/${route}/`, '').replace('/meta.ts', '') || '/';
            const name = pagePath.replace(`../../pages/${route}/`, '').replace('/meta.ts', '') || '/';
            const comPath = pagePath.replace('meta.ts', 'index.vue');
            subRoutes.push({
                path,
                name,
                component: compModules[comPath],
                meta: mod.default
            })
        })
    }
    return subRoutes
}