<template>
    <div :style="style" class="home-wrapper">
        <canvas id="canvas"></canvas>
    </div>
</template>

<script setup lang="ts">
import Ball, { getRandom } from '@/assets/js/ball'
import { buildDate, addZero } from '@/utils/index'
import { reactive } from 'vue'
import useWindowSize from '@/hooks/useWindowResize'
const { width, height, widthPixel, heightPixel } = useWindowSize()
const style = reactive({
    width: widthPixel,
    height: heightPixel,
})

let ctx: CanvasRenderingContext2D | null = null;
let canvas: HTMLCanvasElement | null = null;
let ballList: Ball[] = [];
let text = setDate();
let timer: any


function setDate() {
    const { year, month, day, hour, minutes, seconds } = buildDate()
    return `${addZero(year)}-${addZero(month + 1)}-${addZero(day)} ${addZero(hour)}:${addZero(minutes)}:${addZero(seconds)}`
}

function clear() {
    if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(timer)
    }
}

function updateText() {
    let currentText = setDate();
    if (currentText === text) return
    text = currentText;
    if (ctx && canvas) {
        const { width, height } = canvas;
        ctx.fillStyle = '#000';
        ctx.textBaseline = 'middle'
        ctx.font = '60px DS-Digital sans-serif'
        const textWidth = ctx.measureText(text).width
        ctx.fillText(text, (width - textWidth) / 2, height / 2)
        const points = getPoints();
        clear();
        for (let i = 0; i < points.length; i++) {
            let p = ballList[i];
            if (!p) {
                p = new Ball({ canvas: canvas });
                ballList.push(p)
            }
            const [x, y] = points[i];
            p.moveTo(x, y)
        }
        if (points.length < ballList.length) {
            ballList.splice(points.length)
        }

    }
}

function getPoints() {
    const points = []
    if (ctx && canvas) {
        const { width, height, data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const gaps = 2;
        for (let i = 0; i < width; i += gaps) {
            for (let j = 0; j < height; j += gaps) {
                const index = (i + j * width) * 4;
                const r = data[index]
                const g = data[index + 1]
                const b = data[index + 2]
                const a = data[index + 3]
                if (r === 0 && g === 0 && b === 0 && a === 255) {
                    points.push([i, j])
                }
            }
        }
        console.log(points.length)
    }
    return points
}

function draw() {
    if (ctx && canvas) {
        clear()
        ballList.forEach(item => {
            item.draw()
        })
        updateText()
        timer = requestAnimationFrame(draw)
    }
}

onActivated(() => {
    canvas = <HTMLCanvasElement>document.querySelector('#canvas');
    canvas.width = document.body.clientWidth
    canvas.height = document.body.clientHeight
    ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (ctx) {
        draw()
    }
})
onMounted(() => {
    canvas = <HTMLCanvasElement>document.querySelector('#canvas');
    canvas.width = document.body.clientWidth
    canvas.height = document.body.clientHeight
    ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (ctx) {
        draw()
    }
})
onUnmounted(() => {
    console.log('unmounted', timer)
    if (timer) {
        cancelAnimationFrame(timer)
    }
})

onDeactivated(() => {
    console.log('onDeactivated', timer)
    if (timer) {
        cancelAnimationFrame(timer);
        ballList.forEach(item => {
            item.clear()
        })
    }
})


</script>

<style lang="scss" scoped>
.home-wrapper {
    background: #eee;

    #canvas {
        background: radial-gradient(#fff, #8c738c);
        display: block;
        width: 1865px;
        height: 969px;
    }
}
</style>
