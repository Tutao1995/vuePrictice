<template>
    <Teleport to="body">
        <Transition name="dialog-fade">
            <div :class="dialogClass" v-if="props.modelValue" :style="dialogStyle">
                <div :class="dialogMaskClass" @click="onMaskClick"></div>
                <div :class="dialogContentClass" :style="dialogBodyStyle" ref="ttDialog">
                    <div :class="dialogHeaderClass" @mousedown="onMouseDown">
                        <slot name="header"
                            ><span>{{ props.title }}</span></slot
                        >
                        <TtIcon :class="n('close')" iconName="icon-x" @click.stop="onCancel" />
                    </div>
                    <div :class="dialogBodyClass">
                        <slot name="content"
                            ><span>{{ props.content }}</span></slot
                        >
                    </div>
                    <div :class="dialogFooterClass">
                        <slot name="footer">
                            <TtButton
                                :class="n('button')"
                                @click="onOK"
                                type="primary"
                                :disabled="props.okButtonDisabled"
                                >{{ props.okButtonText }}</TtButton
                            >
                            <TtButton
                                :class="n('button')"
                                @click="onCancel"
                                :disabled="props.cancelButtonDisabled"
                                >{{ props.cancelButtonText }}</TtButton
                            >
                        </slot>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { defineEmits, computed } from 'vue'
import { DialogProps } from './dialog'
import { createNamespace } from '../../utils/index'
import TtIcon from '../../TtIcon'
import TtButton from '../../TtButton'
import { useDrag } from './hooks/use-drag'
import { useZIndex } from '../../hooks/use-z-index.ts'

defineOptions({
    name: 'TtDialog',
})

const { n } = createNamespace('dialog')

const props = defineProps(DialogProps)

const emit = defineEmits(['update:modelValue', 'change'])

const { nextZIndex } = useZIndex()

const dialogStyle = {
  zIndex: nextZIndex()
}

const dialogClass = computed(() => {
    return [n()]
})

const dialogMaskClass = computed(() => {
    return [n('mask')]
})

const dialogContentClass = computed(() => {
    return [n('content')]
})

const dialogHeaderClass = computed(() => {
    return [n('header')]
})
const dialogBodyClass = computed(() => {
    return [n('body')]
})
const dialogFooterClass = computed(() => {
    return [n('footer')]
})

const hasUnit = (value: any) => {
    value = String(value)
    return (
        value.includes('px') || value.includes('rem') || value.includes('em') || value.includes('%')
    )
}



const onOK = () => {
    props.onOK && props.onOK()
    emit('update:modelValue', false)
}

const onCancel = () => {
    props.onCancel && props.onCancel()
    emit('update:modelValue', false)
}

const onMaskClick = () => {
    props.maskClosable && onCancel()
}

const { translateX, translateY, onMouseDown, ttDialog } = useDrag(props)

const dialogBodyStyle = computed(() => {
    return {
        width: hasUnit(props.width) ? props.width : props.width + 'px',
        height: hasUnit(props.height) ? props.height : props.height + 'px',
        transform: `translate(calc(-50% + ${translateX.value}px), calc(-50% + ${translateY.value}px))`,
    }
})

</script>

<style lang="scss" scoped>
@import '../../scss/variables.scss';
$N: 'tt-dialog';
.#{$N} {
    position: fixed;
    inset: 0;
    &__mask {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
    }
    &__content {
        position: absolute;
        top: 50%;
        left: 50%;
        display: flex;
        flex-direction: column;
        transform: translate(-50%, -50%);
        background: $bg-color;
        border-radius: $border-radius;
        overflow: hidden;
    }
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        flex-shrink: 0;
        border-bottom: 1px solid $border-color;
        .#{$N}__close {
            cursor: pointer !important;
            &:hover {
                color: $primary-color;
                font-size: 16px;
            }
        }
    }
    &__body {
        flex: 1;
        padding: 10px 20px;
        overflow: auto;
    }
    &__footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-shrink: 0;
        padding: 10px 20px;
        border-top: 1px solid $border-color;
        .#{$N}__button {
            margin-left: 16px;
        }
    }
}

.dialog-fade-enter-active {
    animation: modal-fade-in 0.3s;
}

.dialog-fade-leave-active {
    animation: modal-fade-out 0.3s;
}

@keyframes dialog-fade-in {
    0% {
        transform: translate3d(0, -20px, 0);
        opacity: 0;
    }
    100% {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
}

@keyframes dialog-fade-out {
    0% {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
    100% {
        transform: translate3d(0, -20px, 0);
        opacity: 0;
    }
}

@keyframes modal-fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes modal-fade-out {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>
