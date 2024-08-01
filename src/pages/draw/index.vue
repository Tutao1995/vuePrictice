<template>
    <div class="draw-wrapper">
        <selection class="shapes-section">
            <div v-for="item in shapeList" :title="item.title" :key="item.key" :class="['shape-item', item.key === currentShape ? 'shape-active-item' : '']"  @click="setCurrentShapeHandle(item)">
                <DrawIcon :iconName="item.iconName" />
            </div>
        </selection>
        <div ref="canvasWrapper" id="canvas-wrapper"></div>
    </div>
</template>

<script setup>
import DrawIcon from './components/DrawIcon.vue'
import BoardCanvas from './js/board'
const shapeList = [
    {
        title: '圆形',
        iconName: 'icon-yuanxing',
        key: 'circle'
    },
    {
        title: '矩形',
        iconName: 'icon-juxing',
        key: 'rect'
    },
    {
        title: '箭头',
        iconName: 'icon-youjiantou',
        key: 'arrow'
    },
    {
        title: '直线',
        iconName: 'icon-hengxian',
        key: 'line'
    },
    {
        title: '菱形',
        iconName: 'icon-tubiao',
        key: 'diamond'
    },
    {
        title: '笔',
        iconName: 'huabi',
        key: 'pencil'
    }
]

const currentShape = ref('circle')
const setCurrentShapeHandle = (e) => {
    currentShape.value = e.key;
    BoardCanvasInstance.changeShape(e.key)
}

const canvasWrapper = ref(null)
let BoardCanvasInstance = null
onMounted(() => {
    BoardCanvasInstance = new BoardCanvas({
        container: canvasWrapper.value, 
        type: currentShape.value
    })
})
</script>

<style lang="scss" scoped>
.draw-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    .shapes-section {
        padding: 10px;
        position: absolute;
        top: 40px;
        left: 50%;
        z-index: 2;
        transform: translateX(-50%);
        display: flex;
        gap: 16px;
        border-radius: 4px;
        box-shadow: 0 0 5px #999;
        background: #fff;
        .shape-item {
            cursor: pointer;
            transition: all 0.3s;
            width: 32px;
            height: 32px;
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            &:hover {
                background: hsl(244, 100%, 97%);
            }
        }
        .shape-active-item {
            background: hsl(244deg 85.43% 90.26%);
        }
    }
    #canvas-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}
</style>