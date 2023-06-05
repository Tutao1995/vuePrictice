<template>
    <div ref="list" class="infinite-list-container" @scroll="scrollEvent()">
        <div class="infinite-list-phantom" :style="{ height: listHeight + 'px' }"></div>
        <div class="infinite-list" :style="{ transform: getTransform }">
            <div ref="items" class="infinite-list-item" v-for="item in visibleData" :key="item.id"
                :style="{ height: itemSize + 'px', lineHeight: itemSize + 'px' }">{{ item.value }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">

interface visibleDataType {
    id: number,
    value: any
}

interface Props {
    listData: visibleDataType[] | [],
    itemSize?: number
}

const props = withDefaults(defineProps<Props>(), {
    listData: () => [],
    itemSize: 200
})


const screenHeight = ref(0)
const startOffset = ref(0)
const start = ref(0)
const end = ref<number | null>(null)

const list = ref<HTMLElement>()


const listHeight = computed(() => {
    return props.listData.length * props.itemSize;
})
const visibleCount = computed(() => {
    return Math.ceil(screenHeight.value / props.itemSize)
})
const getTransform = computed(() => {
    return `translate3d(0,${startOffset.value}px,0)`;
})
const visibleData = computed(() => {
    if (end.value) {
        return props.listData.slice(start.value, Math.min(end.value, props.listData.length))
    }
    return []
})


const scrollEvent = () => {
    //当前滚动位置
    if (list.value) {
        let scrollTop = list.value.scrollTop;
        //此时的开始索引
        start.value = Math.floor(scrollTop / props.itemSize);
        //此时的结束索引
        end.value = start.value + visibleCount.value;
        //此时的偏移量  scrollTop % props.itemSize 偏移量动画，让页面滚动看起来自然一些
        startOffset.value = scrollTop - (scrollTop % props.itemSize)
    }
}


onMounted(() => {
    if (list.value) {
        screenHeight.value = list.value.clientHeight;
        start.value = 0;
        end.value = start.value + visibleCount.value;
    }
})

</script>

<style scoped>
.infinite-list-container {
    height: 100%;
    overflow: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: -1;
}

.infinite-list {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    text-align: center;
}

.infinite-list-item {
    padding: 10px;
    color: #555;
    box-sizing: border-box;
    border-bottom: 1px solid #999;
}
</style>