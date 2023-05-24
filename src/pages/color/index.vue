<template>
    <div class="wrapper">
        <div class="content" :style="contentStyle">
            <p class="content-color-text">{{ contentStyle.background }}</p>
            <div class="circle-box">
                <div class="circle-item" v-for="(item, index) of colorJson" :class="[
                    'circle-item',
                    'circle-item-' + index,
                    +index === active ? 'circle-item-active' : '111',
                ]" :style="{ background: calculateColor(item) }" :key="index" @click="colorItemClickHandle(index)">
                    {{ item.text }}
                </div>
                <el-button @click="randomColor" class="random-button">随机色</el-button>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import colorJson, { listItemType, colorItemType } from '@/assets/js/color'

const contentStyle = reactive({
    background: '#ffff',
})
const active = ref(1)

onMounted(() => {
    contentStyle.background = colorJson[active.value].bgColor
})

const calculateColor = (item: colorItemType) => {
    return item.bgColor
}

const colorItemClickHandle = (index: number) => {
    active.value = index
    contentStyle.background = colorJson[index].bgColor
}

const buildNumber = () => {
    return Math.round(Math.random() * 255)
}

const buildColor = () => {
    const r = buildNumber();
    const g = buildNumber();
    const b = buildNumber();
    const a = Math.random().toFixed(2)
    return `rgba(${r}, ${g}, ${b}, ${a})`
}

const randomColor = () => {
    const color = buildColor();
    contentStyle.background = color
}
</script>

<style lang="scss" scoped>
$wrapper: wrapper;

.#{$wrapper} {
    position: relative;
    height: 100%;
    width: 100%;
    background: url('../../assets/images/tile.png') repeat;
    background-position: 0 0;
    background-repeat: repeat-x;
    padding: 50px 20px 20px 20px;
    box-sizing: border-box;

    .content {
        position: relative;
        height: 100%;
        width: 100%;

        &-color-text {
            color: #fff;
        }

        .circle-box {
            position: absolute;
            bottom: 100px;
            right: 360px;

            .circle-item {
                position: absolute;
                width: 74px;
                height: 74px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                font-weight: 800;
                color: #fff;
                border-radius: 50%;
                background: #fff;
                box-shadow: black 0px 0px 0.8rem;
                cursor: pointer;
                transition: all ease 0.2s;
            }

            @for $i from 1 through 10 {
                .circle-item-#{$i} {
                    left: $i * 20px;
                    z-index: $i;
                }
            }

            .circle-item-active {
                top: -10px;
                z-index: 99;
                transition: all ease 0.5s;
            }
        }

        .random-button {
            position: absolute;
            right: 30px;
            top: 17px;
        }
    }
}
</style>
