<template>
    <div class="parent">
        <span class="text">拖拽指令 🍇🍇🍇🍓🍓🍓</span>
        <div v-draggable="true" class="child">拖拽元素</div>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.parent {
    position: relative;
    height: 100%;
    width: 100%;
    .child {
        width: 300px;
        height: 300px;
        line-height: 300px;
        text-align: center;
        color: #b2bec3;
        background: #dfe6e9;
        border-radius: 50%;
    }
}
</style>
