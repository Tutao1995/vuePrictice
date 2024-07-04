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
      <span>{{ start }}</span>
      <el-button @click="changeStart">点我</el-button>
      <el-button @click="stop">点我</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType, ref } from 'vue';
import { useModel } from '@/hooks/useModel';
import { useCountTransition } from '@/hooks/useCountTransition'
import { FormType } from '../types/index'
const model = defineProps({
  modelValue: Object as PropType<FormType>
})
const emit = defineEmits(['update:modelValue'])
const obj:any = useModel(model, 'modelValue', emit);

const start = ref(10);
const end = ref(1000);
const changeStart = () => {
  end.value += 100
  const { timer } = useCountTransition(start, end, 3, () => {
  })
}

const stop = () => {
  end.value -= 100
  const { timer } = useCountTransition(start, end, 3, () => {
  })
}

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