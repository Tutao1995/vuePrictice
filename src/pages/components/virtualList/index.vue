<template>
    <div class="virtual-list-wrapper">
        <virtual-list :listData="data" />
    </div>
</template>

<script setup lang="ts">
import VirtualList from '@/components/VirtualList.vue'

interface dataInfoItem {
    id: number,
    value: any
}

const data = ref<dataInfoItem[]>([]);

for (let i = 0; i < 1000; i++) {
    data.value.push({
        id: i,
        value: i
    })
}

</script>

<style lang="scss" scoped>
$spaceWrapper: virtual-list;

.#{$spaceWrapper}-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>