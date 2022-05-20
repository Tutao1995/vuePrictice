export default {
    admin: [
        {
            label: '首页',
            index: '/home/index',
            icon: 'HomeFilled'
        },
        {
            label: '组件',
            index: '/components/button',
            icon: 'Menu',
            children: [
                {
                    label: 'button',
                    index: '/components/button',
                    icon: 'Minus'
                },
                {
                    label: 'table',
                    index: '/components/table',
                    icon: 'Minus'
                },
            ],
        },
        {
            label: 'echarts',
            index: '/echarts/index',
            icon: 'TrendCharts'
        },
    ],
    system: [
        {
            label: '首页',
            index: '/home/index',
            icon: 'HomeFilled'
        },
        {
            label: '组件',
            index: '/components/button',
            icon: 'Menu',
            children: [
                {
                    label: 'button',
                    index: '/components/button',
                    icon: 'Minus'
                },
                {
                    label: 'table',
                    index: '/components/table',
                    icon: 'Minus'
                },
            ],
        },
        {
            label: 'echarts',
            index: '/echarts/index',
            icon: 'TrendCharts'
        },
    ],
    common: [
        {
            label: '首页',
            index: '/home/index',
            icon: 'HomeFilled'
        },
        {
            label: '组件',
            index: '/components/button',
            icon: 'Menu',
            children: [
                {
                    label: 'button',
                    index: '/components/button',
                    icon: 'Minus'
                },
                {
                    label: 'table',
                    index: '/components/table',
                    icon: 'Minus'
                },
            ],
        },
        {
            label: 'echarts',
            index: '/echarts/index',
            icon: 'TrendCharts'
        },
    ]
}

export type authorityType = 'admin' | 'system' | 'common'