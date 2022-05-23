<template>
    <div v-if="props.nav.length">
        <el-menu
            class="el-menu-vertical"
            :default-active="defaultRoute"
            :collapse="expand"
            active-text-color="rgb(80, 97, 109)"
            background-color="#545c64"
            text-color="#fff"
            @open="handleOpen"
            @close="handleClose"
            router
        >
            <template v-for="item of props.nav" :key="item.index">
                <template v-if="item.children">
                    <el-sub-menu :index="item.index">
                        <template #title
                            ><el-icon><component :is="item.icon" /></el-icon
                            ><span>{{ item.label }}</span></template
                        >
                        <template v-if="item.children">
                            <el-menu-item
                                v-for="cItem of item.children"
                                :index="cItem.index"
                                :key="cItem.index"
                            >
                                <el-icon><component :is="cItem.icon" /></el-icon>
                                <span>{{ cItem.label }}</span>
                            </el-menu-item>
                        </template>
                    </el-sub-menu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index"
                        ><el-icon><component :is="item.icon" /></el-icon
                        ><span>{{ item.label }}</span></el-menu-item
                    >
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, PropType, onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMainStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
const store = useMainStore()
const { expand } = storeToRefs(store)

const route = useRoute()

const defaultRoute = ref<string>('/home/index')

interface Nav {
    label: String
    index: String
    icon: String
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
    let router = useRouter()
    defaultRoute.value = router.currentRoute.value.fullPath
})

watch(route, (newValue, oldValue) => {
    defaultRoute.value = newValue.path
})

const emits = defineEmits(['open', 'close'])

const handleOpen = (key: string, keyPath: string[]) => {
    emits('open', key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    emits('close', key, keyPath)
}
</script>

<style scoped lang="scss">
.el-menu-vertical {
    // width: 200px;
    height: 100%;
    overflow: hidden;
}
.el-menu-item.is-active {
    position: relative;
    background: #d6ecf0;
    &::before {
        position: absolute;
        left: 0;
        content: '';
        width: 4px;
        height: 100%;
        background: $red;
    }
}
</style>
