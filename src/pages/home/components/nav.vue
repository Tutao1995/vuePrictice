<template>
    <div v-if="navs.length">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
        >
            <el-sub-menu v-for="nav of navs" :index="nav.index" :key="nav.index">
                <template #title>
                    <span>{{ nav.label }}</span>
                </template>
                <template v-if="nav.children.length">
                    <span>{{ nav.label }}</span>
                </template>
                <el-menu-item-group>
                    <template #title><span>Group One</span></template>
                    <el-menu-item index="1-1">item one</el-menu-item>
                    <el-menu-item index="1-2">item two</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group Two">
                    <el-menu-item index="1-3">item three</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="1-4">
                    <template #title><span>item four</span></template>
                    <el-menu-item index="1-4-1">item one</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="2">
                <template #title>Navigator Two</template>
            </el-menu-item>
            <el-menu-item index="3" disabled>
                <template #title>Navigator Three</template>
            </el-menu-item>
            <el-menu-item index="4">
                <template #title>Navigator Four</template>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

interface Props {
    label: String
    index: String
    children?: Props[]
}

export default defineComponent({
    props: {
        navs: {
            type: Array,
            default: [],
        },
    },
    emits: ['open', 'close'],
    setup(props, { emit }) {
        const handleOpen = (key: string, keyPath: string[]) => {
            console.log(key, keyPath)
            emit('open', key, keyPath)
        }
        const handleClose = (key: string, keyPath: string[]) => {
            console.log(key, keyPath)
            emit('close', key, keyPath)
        }
        const navs = reactive<Props[]>(props.navs)
        return {
            navs,
            handleOpen,
            handleClose,
        }
    },
})
</script>

<style scoped lang="scss"></style>
