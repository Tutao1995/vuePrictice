<template>
    <div class="home-wrapper">echarts</div>
</template>

<script setup lang="ts"></script>

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
