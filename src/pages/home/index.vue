<template>
    <div class="home-wrapper">
        <div class="home-header">
            <header>头</header>
        </div>
        <div class="home-content">
            <nav class="home-content-nav" />
            <div class="home-content-box">
                <div class="grid-content bg-purple">1</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import nav from './components/nav.vue'

const navList = [
    {
        key: '',
        label: '',
    },
]
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>

<style lang="scss" scoped>
.home-wrapper {
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
            width: 200px;
        }
        &-box {
            flex: 1;
        }
    }
    .bg-purple {
        background: purple;
        color: #fff;
    }
}
</style>
