<template>
    <teleport to="body">
        <transition name="modal">
            <div class="modal" v-if="props.modelValue">
                <div class="modal-content">
                    <div class="modal-header">{{ props.title }}</div>
                    <div class="modal-body" :style="{ height: height + 'px' }">
                        <div>{{ props.content }}</div>
                        <slot></slot>
                    </div>
                    <div class="modal-footer">
                        <el-button @click="onOk" type="primary">确认</el-button>
                        <el-button @click="onCancel">取消</el-button>
                    </div>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script lang="ts" setup>
import { defineProps, PropType, defineEmits } from 'vue'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default() {
            return false
        },
    },
    title: {
        type: String,
        default: '提示',
    },
    content: {
        type: String,
        default: '',
    },
    height: {
        type: Number,
        default: 250,
    },
})

const emit = defineEmits(['update:modelValue', 'okHandle', 'cancelHandle'])
const onOk = () => {
    emit('okHandle')
}
const onCancel = () => {
    emit('update:modelValue', false)
}
</script>

<style lang="scss" scoped>
.modal {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
    &-content {
        position: relative;
        width: 500px;
        background: #fff;
        border-radius: 8px;
    }
    &-header {
        padding: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
    }
    &-body {
        padding: 10px;
    }
    &-footer {
        padding: 10px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 50px;
        border-top: 1px solid #eee;
    }
}
.modal-content {
    transform: translateY(20px);
    opacity: 1;
}
.modal-enter-from {
    transform: translateY(0);
    opacity: 0;
}
.modal-enter-active {
    transition-property: transform, opacity;
    transition-duration: 0.5s;
    transition-timing-function: linear;
}
</style>
