export default {
    admin: [
        {
            label: '首页',
            index: '/home/index',
            icon: 'HomeFilled',
        },
        {
            label: '颜色',
            index: '/color/index',
            icon: 'PictureFilled',
        },
        {
            label: '画板',
            index: '/draw/index',
            icon: 'EditPen',
        },
        {
            label: '组件',
            index: '/components/button',
            icon: 'Menu',
            children: [
                {
                    label: 'button',
                    index: '/components/button',
                    icon: 'ArrowRightBold',
                },
                {
                    label: 'table',
                    index: '/components/table',
                    icon: 'ArrowRightBold',
                },
                {
                    label: 'virtualList',
                    index: '/components/virtualList',
                    icon: 'ArrowRightBold',
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
                    icon: 'ArrowRightBold',
                },
                {
                    label: 'lineEchart',
                    index: '/echarts/lineEchart',
                    icon: 'ArrowRightBold',
                },
                {
                    label: 'pieChart',
                    index: '/echarts/pieChart',
                    icon: 'ArrowRightBold',
                },
                {
                    label: 'categoryChart',
                    index: '/echarts/categoryChart',
                    icon: 'ArrowRightBold',
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
                    icon: 'ArrowRightBold',
                },
                {
                    label: 'clickOutside',
                    index: '/directives/clickOutside',
                    icon: 'ArrowRightBold',
                },
                {
                    label: 'draggable',
                    index: '/directives/draggable',
                    icon: 'ArrowRightBold',
                },
                {
                    label: 'debounce',
                    index: '/directives/debounce',
                    icon: 'ArrowRightBold',
                },
                {
                    label: 'throttle',
                    index: '/directives/throttle',
                    icon: 'ArrowRightBold',
                },
                {
                    label: 'useModel',
                    index: '/directives/useModel',
                    icon: 'ArrowRightBold',
                },
                {
                    label: 'contextMenu',
                    index: '/directives/contextMenu',
                    icon: 'ArrowRightBold',
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
                    icon: 'ArrowRightBold',
                },
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
                    icon: 'ArrowRightBold',
                },
            ],
        },
    ],
    system: [
        {
            label: '首页',
            index: '/home/index',
            icon: 'HomeFilled',
        },
        {
            label: '组件',
            index: '/components/button',
            icon: 'Menu',
            children: [
                {
                    label: 'button',
                    index: '/components/button',
                    icon: 'ArrowRightBold',
                },
                {
                    label: 'table',
                    index: '/components/table',
                    icon: 'ArrowRightBold',
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
                    icon: 'ArrowRightBold',
                },
                {
                    label: 'lineEchart',
                    index: '/echarts/lineEchart',
                    icon: 'ArrowRightBold',
                },
                {
                    label: 'pieChart',
                    index: '/echarts/pieChart',
                    icon: 'ArrowRightBold',
                },
            ],
        },
    ],
    common: [
        {
            label: '首页',
            index: '/home/index',
            icon: 'HomeFilled',
        },
        {
            label: '组件',
            index: '/components/button',
            icon: 'Menu',
            children: [
                {
                    label: 'button',
                    index: '/components/button',
                    icon: 'ArrowRightBold',
                },
                {
                    label: 'table',
                    index: '/components/table',
                    icon: 'ArrowRightBold',
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
                    icon: 'ArrowRightBold',
                },
                {
                    label: 'lineEchart',
                    index: '/echarts/lineEchart',
                    icon: 'ArrowRightBold',
                },
                {
                    label: 'pieChart',
                    index: '/echarts/pieChart',
                    icon: 'ArrowRightBold',
                },
            ],
        },
    ],
}

export type authorityType = 'admin' | 'system' | 'common'
