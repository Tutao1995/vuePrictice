<template>
    <div class="top-wrapper">
        <div class="left" @click="goBack">
            <div class="left-logo">涂</div>
            <div class="left-text">Tt Admin</div>
        </div>
        <div class="center">
            <el-icon class="center-icon" :size="24"><Expand /></el-icon>
            <div class="center-text">{{ title }}</div>
        </div>
        <div class="right">right</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMainStore } from '@/stores/index'

const store = useMainStore()
const title = store.title

const router = useRouter()

const goBack = () => {
    router.push({ name: 'home' })
}
</script>

<style lang="scss" scoped>
.top-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    background: #eee;

    .left {
        padding-left: 20px;
        display: flex;
        align-items: center;
        cursor: pointer;
        &-logo {
            height: 38px;
            width: 38px;
            line-height: 38px;
            text-align: center;
            background: #db5a6b;
            color: #fff;
            border-radius: 50%;
        }
        &-text {
            padding: 0 10px;
            margin-left: 20px;
            font-size: 20px;
            font-weight: bold;
            border-left: 3px solid rgb(0, 147, 211);
            border-right: 3px solid rgb(0, 147, 211);
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
        width: 200px;
    }
}
</style>
