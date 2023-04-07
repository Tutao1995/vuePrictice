<template>
  <div>
    <el-form>
      <div>
        input:<el-input v-model="obj.input"></el-input>
      </div>
      <div>
        select:<el-select v-model="obj.select">
          <el-option v-for="item of options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType } from 'vue';
import { useModel } from '@/hooks/useModel';
import { FormType } from '../types/index'
const model = defineProps({
  modelValue: Object as PropType<FormType>
})
const emit = defineEmits(['update:modelValue'])
const obj = useModel(model, 'modelValue', emit);
console.log(obj, "obj")


const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>

<style scoped></style>