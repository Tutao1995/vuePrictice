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
                    icon: 'PriceTag'
                },
                {
                    label: 'table',
                    index: '/components/table',
                    icon: 'PriceTag'
                },
            ],
        },
        {
            label: 'echarts',
            index: '/echarts/index',
            icon: 'TrendCharts',
            children: [
                {
                    label: 'columnChart',
                    index: '/echarts/columnChart',
                    icon: 'PriceTag'
                },
                {
                    label: 'lineEchart',
                    index: '/echarts/lineEchart',
                    icon: 'PriceTag'
                },
                {
                    label: 'pieChart',
                    index: '/echarts/pieChart',
                    icon: 'PriceTag'
                },
            ],
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
                    icon: 'PriceTag'
                },
                {
                    label: 'table',
                    index: '/components/table',
                    icon: 'PriceTag'
                },
            ],
        },
        {
            label: 'echarts',
            index: '/echarts/index',
            icon: 'TrendCharts',
            children: [
                {
                    label: 'columnChart',
                    index: '/echarts/columnChart',
                    icon: 'PriceTag'
                },
                {
                    label: 'lineEchart',
                    index: '/echarts/lineEchart',
                    icon: 'PriceTag'
                },
                {
                    label: 'pieChart',
                    index: '/echarts/pieChart',
                    icon: 'PriceTag'
                },
            ],
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
                    icon: 'PriceTag'
                },
                {
                    label: 'table',
                    index: '/components/table',
                    icon: 'PriceTag'
                },
            ],
        },
        {
            label: 'echarts',
            index: '/echarts/index',
            icon: 'TrendCharts',
            children: [
                {
                    label: 'columnChart',
                    index: '/echarts/columnChart',
                    icon: 'PriceTag'
                },
                {
                    label: 'lineEchart',
                    index: '/echarts/lineEchart',
                    icon: 'PriceTag'
                },
                {
                    label: 'pieChart',
                    index: '/echarts/pieChart',
                    icon: 'PriceTag'
                },
            ],
        },
    ]
}

export type authorityType = 'admin' | 'system' | 'common'