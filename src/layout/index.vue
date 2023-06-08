<template>
    <div class="home-wrapper">
        <the-top />
        <div class="home-content">
            <the-nav
                class="home-content-nav"
                :style="{ width: expand ? '65px' : '200px' }"
                :nav="navList"
                @open="handleOpen"
                @close="handleClose"
            />
            <div class="home-content-box">
                <router-view v-slot="{ Component }">
                    <keep-alive >
                        <component :is="Component" />
                    </keep-alive>
                </router-view>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useMainStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
import authority from '@/assets/js/authority'
import theNav from './components/nav.vue'
import theTop from './components/top.vue'

const mainStore = useMainStore()
const { expand } = storeToRefs(mainStore)
const authorityStore = mainStore.authority
const authorities = authority[authorityStore]

const navList = reactive(authorities)
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
            // width: 200px;
            height: 100%;
            transition: width ease 1s;
        }
        &-box {
            position: relative;
            height: 100%;
            // width: calc(100% - 220px);
            flex: 1;
            overflow-x: hidden; // 防止缩放菜单栏出现横向滚动条
            box-shadow: 0 0 14px #b4b1b1;
        }
    }
}
</style>
