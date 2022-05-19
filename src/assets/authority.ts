export default {
    admin: [
        {
            label: '首页',
            index: '/home/index',
        },
        {
            label: '组件',
            index: '/components/button',
            children: [
                {
                    label: 'button',
                    index: '/components/button',
                },
                {
                    label: 'table',
                    index: '/components/table',
                },
            ],
        },
        {
            label: 'echarts',
            index: '/echarts/index',
        },
    ],
    system: [
        {
            label: '首页',
            index: '/home/index',
        },
        {
            label: '组件',
            index: '/components/button',
            children: [
                {
                    label: 'button',
                    index: '/components/button',
                },
                {
                    label: 'table',
                    index: '/components/table',
                },
            ],
        },
        {
            label: 'echarts',
            index: '/echarts/index',
        },
    ],
    common: [
        {
            label: '首页',
            index: '/home/index',
        },
        {
            label: '组件',
            index: '/components/button',
            children: [
                {
                    label: 'button',
                    index: '/components/button',
                },
                {
                    label: 'table',
                    index: '/components/table',
                },
            ],
        },
        {
            label: 'echarts',
            index: '/echarts/index',
        },
    ]
}

export type authorityType = 'admin' | 'system' | 'common'