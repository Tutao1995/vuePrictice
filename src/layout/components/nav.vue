<template>
    <div v-if="props.nav.length">
        <el-menu
            class="el-menu-vertical-demo"
            default-active="/home/table"
            @open="handleOpen"
            @close="handleClose"
            router
        >
            <el-sub-menu index="/home">
                <template #title>home</template>
                <el-menu-item v-for="item of props.nav" :index="item.index" :key="item.index">{{
                    item.label
                }}</el-menu-item>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, PropType, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

interface Nav {
    label: String
    index: String
    children?: Nav[]
}

const props = defineProps({
    nav: {
        type: Array as PropType<Nav[]>,
        required: false,
        default() {
            return []
        },
    },
})

onMounted(() => {
    console.log(props.nav, 'props')
})

const emits = defineEmits(['open', 'close'])

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
    emits('open', key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
    emits('close', key, keyPath)
}
</script>

<style scoped lang="scss"></style>
