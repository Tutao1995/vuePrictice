<template>
  <Teleport to="body">
    <Transition @beforeEnter="beforeEnterHandler" @beforeLeave="leaveHandler" @enter="enterHandler">
      <ul class="context-menu-wrapper" v-if="isShow" :style="{
        left: left + 'px', top: top + 'px'
      }">
        <li @click="itemClickHandler($event, item)" class="context-menu-item" v-for="item of options" :key="item.id">{{
          item.label
        }}</li>
      </ul>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { defineProps, PropType, defineEmits } from 'vue'
import { optionItemType } from '../types'
defineProps({
  options: Object as PropType<optionItemType[]>,
  left: Number,
  top: Number,
  isShow: Boolean
})

const emit = defineEmits(['itemClick'])

const itemClickHandler = ($event: MouseEvent, item: optionItemType) => {
  $event.stopPropagation()
  emit('itemClick', item);
}



const beforeEnterHandler = (el: HTMLElement) => {
  el.style.height = '0px';
}

const enterHandler = (el: HTMLElement) => {
  el.style.height = 'auto'
  el.style.overflow = 'hidden'
  const height = el.clientHeight
  el.style.height = '0'
  requestAnimationFrame(() => {
    el.style.height = height + 'px';
    el.style.overflow = 'auto'
    el.style.transition = 'height 0.2s ease-out'
  })
}

const leaveHandler = (el: HTMLElement) => {
  el.style.transition = 'none'
}
</script>

<style lang="scss" scoped>
ul,
li {
  padding-inline-start: 0;
  list-style: none;
}

.context-menu-wrapper {
  position: fixed;
  width: 200px;
  max-height: 200px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 6px;

  .context-menu-item {
    padding: 0 10px;
    width: 100%;
    height: 38px;
    line-height: 38px;
    text-align: left;
    box-sizing: border-box;
    transition: background .3s ease;

    &:hover {
      background: burlywood;
    }
  }
}
</style>