<template>
    <div class="top-wrapper">
        <div class="left" @click="goBack">
            <div class="left-logo">涂</div>
            <div class="left-text" :style="styleComputed">Tt Admin</div>
        </div>
        <div class="center">
            <el-icon
                class="center-icon"
                style="cursor: pointer"
                @click="store.expandToggle()"
                :size="24"
            >
                <component :is="expand ? 'Expand' : 'Fold'" />
            </el-icon>
            <div class="center-text">{{ title }}</div>
        </div>
        <div class="right">
            <el-button @click="changeTheme">换肤</el-button>
            <timer />
        </div>
    </div>
</template>

<script setup lang="ts">
import timer from './timer.vue'
import { ref, computed, Ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMainStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
const store = useMainStore()
const { title, expand } = storeToRefs(store)
const router = useRouter()
const styleComputed = computed(() => {
    return expand.value
        ? {
              width: '0px',
              opacity: 0,
              padding: '0',
          }
        : {
              width: '120px',
              opacity: 1,
              padding: '0 10px',
          }
})

const goBack = () => {
    router.push({ name: 'home' })
}

const changeTheme = () => {
    document.documentElement.style.setProperty('--theme-color', buildColor())
}

const buildNumber = () => {
    return Math.round(Math.random() * 255)
}

const buildColor = () => {
    const r = buildNumber()
    const g = buildNumber()
    const b = buildNumber()
    const a = Math.random().toFixed(2)
    return `rgba(${r}, ${g}, ${b}, ${a})`
}
</script>

<style lang="scss" scoped>
.top-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    background: #545c64;

    .left {
        padding-left: 20px;
        display: flex;
        align-items: center;
        cursor: pointer;

        &-logo {
            margin-right: 20px;
            height: 38px;
            width: 38px;
            line-height: 38px;
            text-align: center;
            background: var(--theme-color);
            color: #fff;
            border-radius: 50%;
        }

        &-text {
            padding: 0 10px;
            height: 26px;
            font-size: 20px;
            font-weight: bold;
            border-left: 3px solid rgb(0, 147, 211);
            border-right: 3px solid rgb(0, 147, 211);
            box-sizing: border-box;
            transition: all ease 1s;
            overflow: hidden;
        }
    }

    .center {
        padding-left: 20px;
        display: flex;
        align-items: center;
        flex: 1;
        text-align: left;

        &-icon {
            margin-right: 20px;
        }
    }

    .right {
        display: flex;
        align-items: center;
        min-width: 200px;
        column-gap: 10px;
    }
}
</style>
