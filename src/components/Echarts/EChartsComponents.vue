<template>
    <div class="chart" ref="MyEcharts"></div>
</template>

<script lang="ts" setup>
import { onMounted, Ref, ref } from 'vue'
import echarts from './library'
import { useECharts } from './useECharts'
import { RenderType, ThemeType } from './echarts-types'
import { EChartsOption } from 'echarts/types/dist/shared'

interface Props {
    option: EChartsOption
}

const props = defineProps<Props>()

const { option } = toRefs(props)

//获取echarts实例
const MyEcharts = ref<HTMLDivElement | null>(null)
const { setOption, getInstance } = useECharts({
    elParams: MyEcharts as Ref<HTMLDivElement>,
    autoUpdateSize: false,
    render: RenderType.SVGRenderer,
    theme: ThemeType.Default,
    animation: true,
})

onMounted(() => {
    setOption(option.value)
    const echartsInstance = getInstance()
})
</script>

<style scoped lang="scss">
.chart {
    height: 100%;
    width: 100%;
}
</style>
