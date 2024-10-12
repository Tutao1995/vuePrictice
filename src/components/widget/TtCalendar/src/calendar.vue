<template>
    <div :class="calendarClass">
        <div :class="[n('header')]" v-if="props.showHeader">
            <slot name="header"></slot>
        </div>
        <div :class="[n('selectors')]">
            <div :class="[n('selector--year')]">
                <tt-select v-model="year" :options="years" />
            </div>
            <div :class="[n('selector--month')]">
                <tt-select v-model="month" :options="months" />
            </div>
            <div :class="[n('selector--month--year')]"></div>
        </div>
        <div :class="[n('body')]">
            <table :class="[n('table')]" cellpadding="0">
                <tbody>
                    <tr>
                        <th v-for="item in weeks" :key="item">
                          <div :class="n('cell')">{{ item }}</div>
                        </th>
                    </tr>
                    <tr v-for="row in rows">
                        <td v-for="cell in row">
                            <div :class="[
                                n('cell'), 
                                cell.selected ? n('cell--selected') : '', 
                                cell.disabled ? n('cell--disabled') : '', 
                                cell.current ? n('cell--current') : '', 
                                cell.isCurrentMonth ? n('cell--other-month') : ''
                              ]">
                                {{ cell.text }}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineEmits, computed } from 'vue'
import { CalendarProps } from './calendar'
import { createNamespace } from '../../utils/index'
import TtIcon from '../../TtIcon'
import TtButton from '../../TtButton'
import TtSelect from '../../TtSelect'
import { dayjs } from 'element-plus'

defineOptions({
    name: 'TtCalendar',
})
const { n } = createNamespace('calendar')

const props = defineProps(CalendarProps)

const emit = defineEmits(['update:modelValue', 'change'])

const calendarClass = computed(() => {
    return [n()]
})

const year = ref('')
const month = ref('')
const currentType = ref('month')
const years = [
    {
        label: '2023',
        value: '2023',
    },
    {
        label: '2024',
        value: '2024',
    },
]

const months = [
    {
        label: '1月',
        value: '1',
    },
    {
        label: '2月',
        value: '2',
    },
    {
        label: '3月',
        value: '3',
    },
    {
        label: '4月',
        value: '4',
    },
    {
        label: '5月',
        value: '5',
    },
    {
        label: '6月',
        value: '6',
    },
    {
        label: '7月',
        value: '7',
    },
    {
        label: '8月',
        value: '8',
    },
    {
        label: '9月',
        value: '9',
    },
    {
        label: '10月',
        value: '10',
    },
    {
        label: '11月',
        value: '11',
    },
    {
        label: '12月',
        value: '12',
    },
]

const weeks = ['日', '一', '二', '三', '四', '五', '六'];

const currentDate = computed({
  get() {
    return props.modelValue ? dayjs(props.modelValue) : dayjs(selectedDate.value)
  },
  set() {}
})

const selectedDate = ref(new Date().getTime())

type cellType = {
  text: number,
  type: string,
  date: Date,
  disabled: boolean,
  current: boolean,
  selected: boolean,
  isCurrentMonth: boolean
}

const rows = computed<cellType[][]>(() => {
    const result = [[], [], [], [], [], []]
    /* 
      当前时间是周几，当前月第一天是周几，当前月有多少天
      currentDate.add(2, 'day');
    */

    const currentMonthFirstDay = currentDate.value.startOf('month');
    const beforeDays = currentMonthFirstDay.day();
    const firstCellDate = currentMonthFirstDay.subtract(beforeDays, 'day');
    console.log(currentMonthFirstDay, "currentMonthFirstDay", firstCellDate)
    result.forEach((row: any, rowIndex) => {
        weeks.forEach((week: any, cellIndex) => {
            const cell:any = {}
            cell.text = firstCellDate.add(rowIndex * 7 + cellIndex, 'day').get('date');
            cell.type = 'normal';
            cell.date = firstCellDate.add(rowIndex * 7 + cellIndex, 'day').toDate();
            cell.disabled = props.disabledDate(cell.date);
            cell.current = currentDate.value.isSame(cell.date, 'day');
            cell.selected = dayjs(selectedDate.value).isSame(cell.date, 'day');
            cell.isCurrentMonth = dayjs(selectedDate.value).isSame(cell.date, 'month');
            row[cellIndex] = cell as cellType
        })
    })
    console.log(result, "result")
    return result
})
</script>

<style lang="scss" scoped></style>
