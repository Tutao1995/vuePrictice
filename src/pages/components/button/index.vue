<template>
  <div ref="showRef">x: {{ x }}, y: {{ y }}</div>
  <div class="box" ref="showRef">
    <div ref="countRef">{{ count }}</div>
  </div>

  <el-button @click="add">+</el-button>
  <el-button @click="cut">-</el-button>
  <el-button @click="openModal">openModal</el-button>
  <el-button @click="dialogVisibleShow">dialogVisible</el-button>


  <el-button @click="openChatDialogHandler">openChatDialog</el-button>
  <Modal v-model="modalVisible" @ok-handle="onOk" @cancel-handle="onCancel" />
  <ChatDialog :visible="visible" @close="closeDialogHandler">
    <p>我是谈拆给你</p>
  </ChatDialog>
  <el-dialog v-model="dialogVisible" title="Tips" width="30%">
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import useMouse from '@/hooks/useMouse'
import { useDraggable } from '@/hooks/useDraggable'
import Modal from '@/components/Modal.vue'
import ChatDialog from '@/components/Dialog.vue'
/**
 *
 * 自定义弹窗相关
 */
let modalVisible = ref<boolean>(false)
const openModal = () => {
  modalVisible.value = true
}
const onOk = () => {
  modalVisible.value = false
}
const onCancel = (value: boolean) => {
  console.log(value)
  modalVisible.value = value
}
/**
 *
 * elementPlus 弹窗
 */
let dialogVisible = ref<boolean>(false)
const dialogVisibleShow = () => {
  dialogVisible.value = true
}

/**
 *
 * 加减
 */
const count = ref<number>(0)
const add = () => {
  count.value++
}
const cut = () => {
  count.value--
}

/**
 * 鼠标移动
 */
const { x, y } = useMouse()

/**
 * 拖拽
 */
const showRef = ref<HTMLElement>()
const countRef = ref<HTMLElement>()
const draggableComputed = computed(() => true)
useDraggable(countRef, countRef, showRef, draggableComputed);



/* 
chatgpt 组件
*/
const visible = ref<boolean>(false);

const closeDialogHandler = () => {
  visible.value = false
}
const openChatDialogHandler = () => {
  visible.value = true
}
</script>

<style lang="scss" scoped>
.box {
  width: 500px;
  height: 500px;
  border: 1px solid #eee;
}
</style>
