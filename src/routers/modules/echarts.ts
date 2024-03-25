import { RouteRecordRaw } from 'vue-router'
import { subRoutesHandle, Modules } from '@/utils/route'
import { Worker } from 'cluster';
import { type } from 'os';

const metaModules: Modules = import.meta.glob('../../pages/echarts/**/meta.ts')
const compModules: Modules = import.meta.glob('../../pages/echarts/**/index.vue');
const subRoutes = await subRoutesHandle(metaModules, compModules, 'echarts')
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

interface Button {
    type: string,
    text: string
}

interface Link {
    url: string,
    click: () => void
}


/* 
    交叉类型    &
*/

const linkButton: Button & Link = {
    type: 'linkButton',
    text: 'linkButton',
    url: 'http://www.baidu.com',
    click: () => {
        console.log('test')
    }
}

/* 
    联合类型  |
*/

interface Button1 {
    type: 'default' | 'primary' | 'danger'
}

const btn1: Button1 = {
    type: 'default'
}


/* 
    类型别名
*/

type Button2Type = 'default' | 'primary' | 'danger'



/* 
    条件  Extract
*/

interface Worker {
    name: string,
    age: number,
    salary: number
}

interface Student {
    name: string,
    age: number,
    grade: number
}

type CommonKeys = Extract<keyof Worker, keyof Student>  // name, age


/* 
    工具泛型   
*/

/* 

    Partial 用于将一个接口的所有属性设置为可选状态，首先通过 keyof T，取出类型变量 T 的所有属性，然后通过 in 进行遍历，最后在属性后加上一个 ?。
*/

type Partial<T> = {
    [p in keyof T]?: T[p]
}

interface ButtonProps {
    type: 'button' | 'submit' | 'reset'
    text: string
    disabled: boolean
    onClick: () => void
}
const buttonProps: Partial<ButtonProps> = {
    disabled: false,
    type: 'button',
    onClick: () => { },
}

/* 
    Record 接受两个类型变量，Record 生成的类型具有类型 K 中存在的属性，值为类型 T。这里有一个比较疑惑的点就是给类型 K 加一个类型约束
    Record<K, T>是 Typescript 中的内置类型，它可以创建一个包含指定属性和对应值类型的对象类型，其中：
        1. K为该对象的键的类型，必须为字符串，或者数字、符号的联合类型。
        2. T为该对象的值的类型，可以为任意类型。

*/

type Person = {
    name: string,
    age: number
}

type PersonRecord = Record<string, Person>


type Person1 = {
    [key: string]: {
        name: string,
        age: number
    }
}
const person2: Person1 = {
    name: {
        name: '1',
        age: 1
    }
}

const person1: PersonRecord = {
    name: {
        name: '1',
        age: 1
    }
}

/* 
    Pick<T, K> 是 Typescript 中的内置类型，它可以从一个接口 T 中选取部分需要的属性 K 组成一个新的接口类型，其中：
        1. T 表示原始接口类型。
        2. K 表示需要被选取的属性名组成的字符串字面量联合类型
*/

type PickPerson = {
    name: string,
    age: number,
    address: string
}

type PersonWithoutAddress = Pick<PickPerson, 'name' | 'age'>