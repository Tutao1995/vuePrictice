<template>
    <Teleport to="body">
        <transition name="modal">
            <div class="modal-mask" v-if="visible">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="modal-header">
                            <h3>{{ title }}</h3>
                            <button @click="closeModal">X</button>
                        </div>
                        <div class="modal-body">
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </Teleport>
</template>

<script>
import { defineComponent, Teleport } from 'vue'

export default defineComponent({
    name: 'ChatDialog',
    props: {
        title: {
            type: String,
            default: 'Modal Title',
        },
        visible: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        closeModal() {
            this.$emit('close')
        },
    },
})
</script>

<style scoped>
.modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9998;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.modal-container {
    width: 500px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    animation: modal-show 0.3s ease;
}

.modal-header {
    padding: 10px;
    background-color: #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h3 {
    margin: 0;
}

.modal-header button {
    border: none;
    background-color: transparent;
    font-size: 20px;
    cursor: pointer;
}

.modal-body {
    padding: 20px;
}

@keyframes modal-show {
    from {
        transform: scale(0.8);
        opacity: 0;
    }

    to {
        transform: scale(1);
        opacity: 1;
    }
}
</style>
