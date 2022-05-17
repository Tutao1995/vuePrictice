<template>
    <div class="home-wrapper">
        <div class="home-header">
            <header>头</header>
        </div>
        <div class="home-content">
            <the-nav
                class="home-content-nav"
                :nav="navList"
                @open="handleOpen"
                @close="handleClose"
            />
            <div class="home-content-box">
                <router-view v-slot="{ Component }">
                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </router-view>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import theNav from './components/nav.vue'

const navList = reactive([
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
])
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>

<style lang="scss" scoped>
.home-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    .home-header {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        background: #eee;
    }
    .home-content {
        flex: 1;
        overflow: auto;
        display: flex;
        &-nav {
            margin-right: 20px;
            width: 200px;
            height: 100%;
        }
        &-box {
            position: relative;
            height: 100%;
            width: calc(100% - 220px);
        }
    }
}
</style>
