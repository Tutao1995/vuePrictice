export default {
    admin: [
        {
            label: '首页',
            index: '/home/index',
            icon: 'HomeFilled'
        },
        {
            label: '颜色',
            index: '/color/index',
            icon: 'PictureFilled'
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
        {
            label: 'directives',
            index: '/directives/index',
            icon: 'Management',
            children: [
                {
                    label: 'copy',
                    index: '/directives/copy',
                    icon: 'PriceTag'
                },
                {
                    label: 'clickOutside',
                    index: '/directives/clickOutside',
                    icon: 'PriceTag'
                },
                {
                    label: 'draggable',
                    index: '/directives/draggable',
                    icon: 'PriceTag'
                },
                {
                    label: 'debounce',
                    index: '/directives/debounce',
                    icon: 'PriceTag'
                },
                {
                    label: 'throttle',
                    index: '/directives/throttle',
                    icon: 'PriceTag'
                },
                {
                    label: 'useModel',
                    index: '/directives/useModel',
                    icon: 'PriceTag'
                },
                {
                    label: 'contextMenu',
                    index: '/directives/contextMenu',
                    icon: 'PriceTag'
                },
            ],
        },
        {
            label: 'leetCode',
            index: '/leetCode/index',
            icon: 'Aim',
            children: [
                {
                    label: '队列',
                    index: '/leetCode/queue',
                    icon: 'PriceTag'
                }
            ],
        },
        {
            label: 'vue3 源码',
            index: '/vueSourceCode/index',
            icon: 'Money',
            children: [
                {
                    label: 'reactivity',
                    index: '/vueSourceCode/reactivity',
                    icon: 'PriceTag'
                }
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