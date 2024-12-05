<template>
    <div :class="calendarClass">
        <div :class="[n('header')]" v-if="props.showHeader">
            <slot name="header"></slot>
        </div>
        <div :class="[n('selectors')]">
            <div :class="[n('selector'), n('selector--year')]">
                <tt-select
                    v-model="year"
                    :options="years"
                    size="small"
                    @change="onYearChangeHandle"
                />
            </div>
            <div :class="[n('selector'), n('selector--month')]">
                <tt-select
                    v-model="month"
                    :options="months"
                    size="small"
                    @change="onMonthChangeHandle"
                />
            </div>
            <div :class="[n('selector--month--year')]"></div>
        </div>
        <div :class="[n('body')]">
            <div :class="n('weeks')">
                <div v-for="item in weeks" :key="item" :class="n('cell--wrapper')">
                    <div :class="n('cell')">{{ item }}</div>
                </div>
            </div>
            <div :class="n('row')" v-for="row in rows">
                <div v-for="cell in row" :key="cell.text" :class="n('cell--wrapper')">
                    <div
                        :class="[
                            n('cell'),
                            cell.selected ? n('cell--selected') : '',
                            cell.disabled ? n('cell--disabled') : '',
                            cell.current ? n('cell--current') : '',
                            cell.isCurrentMonth ? '' : n('cell--other-month'),
                        ]"
                        @click.stop="cellClickHandle(cell)"
                    >
                        {{ cell.text }}
                    </div>
                </div>
            </div>
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
import { dayjs, ElDatePicker } from 'element-plus'

defineOptions({
    name: 'TtCalendar',
})
const { n } = createNamespace('calendar')

const props = defineProps(CalendarProps)

const emit = defineEmits(['update:modelValue', 'change'])

const calendarClass = computed(() => {
    return [n()]
})

const year = ref()
const month = ref()
const currentType = ref('month')

type yearType = {
    label: string
    value: number
}

const years = ref<yearType[]>([])

// [
//     {
//         label: '2023',
//         value: 2023,
//     },
//     {
//         label: '2024',
//         value: 2024,
//     },
// ]

const months = [
    {
        label: '1月',
        value: 1,
    },
    {
        label: '2月',
        value: 2,
    },
    {
        label: '3月',
        value: 3,
    },
    {
        label: '4月',
        value: 4,
    },
    {
        label: '5月',
        value: 5,
    },
    {
        label: '6月',
        value: 6,
    },
    {
        label: '7月',
        value: 7,
    },
    {
        label: '8月',
        value: 8,
    },
    {
        label: '9月',
        value: 9,
    },
    {
        label: '10月',
        value: 10,
    },
    {
        label: '11月',
        value: 11,
    },
    {
        label: '12月',
        value: 12,
    },
]

const weeks = ['日', '一', '二', '三', '四', '五', '六']

const currentDate = ref(new Date().getTime())

const value = ref<string | number>(new Date().getTime())

const selectedDate = computed({
    get() {
        return props.modelValue ? props.modelValue : value.value
    },
    set(val) {
        emit('update:modelValue', val)
        emit('change', val)
        value.value = val
    },
})

type cellType = {
    text: number | string
    type: string
    date: Date
    disabled: boolean
    current: boolean
    selected: boolean
    isCurrentMonth: boolean
}

const rows = computed<cellType[][]>(() => {
    const result = [[], [], [], [], [], []]
    /* 
      当前时间是周几，当前月第一天是周几，当前月有多少天
    */
    const currentMonthFirstDay = dayjs(selectedDate.value).startOf('month')
    const beforeDays = currentMonthFirstDay.day()
    const firstCellDate = currentMonthFirstDay.subtract(beforeDays, 'day')
    result.forEach((row: any, rowIndex) => {
        weeks.forEach((week: any, cellIndex) => {
            const cell: any = {}
            const firstDay = firstCellDate.add(rowIndex * 7 + cellIndex, 'day')
            const date = firstDay.get('date')
            cell.text = date > 9 ? date : '0' + date
            cell.type = 'normal'
            cell.date = firstDay.toDate()
            cell.disabled = props.disabledDate(cell.date)
            cell.current = dayjs(currentDate.value).isSame(cell.date, 'day')
            cell.selected = dayjs(selectedDate.value).isSame(cell.date, 'day')
            cell.isCurrentMonth = dayjs(selectedDate.value).isSame(cell.date, 'month')
            row[cellIndex] = cell as cellType
        })
    })
    console.log(result, 'result')
    return result
})

const dateChangeHandleYearAndMonth = () => {
    year.value = dayjs(selectedDate.value).get('year')
    month.value = dayjs(selectedDate.value).get('month') + 1
}

dateChangeHandleYearAndMonth()

const cellClickHandle = (cell: cellType) => {
    selectedDate.value = cell.date.getTime()
    dateChangeHandleYearAndMonth()
}

const onMonthChangeHandle = (val: number) => {
    selectedDate.value = dayjs(selectedDate.value)
        .set('month', val - 1)
        .toDate()
        .getTime()
}

const onYearChangeHandle = (val: number) => {
    selectedDate.value = dayjs(selectedDate.value).set('year', val).toDate().getTime()
}

const onKeypressHandle = (e: KeyboardEvent) => {
    e.preventDefault()
    e.stopPropagation()

    switch (e.keyCode) {
        case 37:
            selectedDate.value = dayjs(selectedDate.value).subtract(1, 'day').toDate().getTime()
            break
        case 38:
            selectedDate.value = dayjs(selectedDate.value).subtract(1, 'week').toDate().getTime()
            break
        case 39:
            selectedDate.value = dayjs(selectedDate.value).add(1, 'day').toDate().getTime()
            break
        case 40:
            selectedDate.value = dayjs(selectedDate.value).add(1, 'week').toDate().getTime()
            break
        default:
    }
    dateChangeHandleYearAndMonth()
}

const getYears = () => {
    for (let i = 1921; i < 2900; i++) {
        years.value.push({
            label: String(i),
            value: i,
        })
    }
}

onMounted(() => {
    getYears()
    document.addEventListener('keydown', onKeypressHandle)
})
</script>

<style lang="scss" scoped>
@import '../../scss/variables.scss';
$N: 'tt-calendar';
$CN: 'tt-calendar__cell';
$SCN: 'tt-calendar__cell--selected';
$DCN: 'tt-calendar__cell--disabled';
$CCN: 'tt-calendar__cell--current';
$OCN: 'tt-calendar__cell--other-month';
.#{$N} {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial,
        Noto Sans, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', Segoe UI Symbol,
        'Noto Color Emoji';
    background: $bg-color;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    &__header {
    }
    &__selectors {
        padding: 11px 16px 11px 0;
        text-align: right;
        border-bottom: 1px solid $border-color;
        .#{$N}__selector {
            display: inline-block;
            margin-left: 8px;
        }
        .#{$N}__selector--year {
            width: 70px;
            min-width: 70px;
        }
        .#{$N}__selector--month {
            width: 70px;
            min-width: 70px;
        }
    }
    &__body {
        padding: 8px 12px;
    }
    &__row,
    &__weeks {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .#{$CN}--wrapper {
        flex: 1;
    }
    .#{$CN} {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        box-sizing: border-box;
        transition: all 0.16s ease;
        user-select: none;

        &--selected {
            background-color: $active-color !important;
            color: #fff;
        }
        &--current {
            border: 1px solid $active-color !important;
            &:after {
                content: '';
                position: absolute;
                right: 0;
                top: 2px;
                right: 2px;
                width: 6px;
                height: 6px;
                background-color: var(--theme-color);
                border-radius: 50%;
            }
        }
        &--disabled {
            color: $disabled-color;
            cursor: not-allowed;
        }
        &--other-month {
            color: #00000040;
        }
    }
    &__row {
        .#{$CN} {
            &:hover {
                color: $text-color-white;
                background-color: $active-color;
                opacity: 0.3;
            }
        }
    }
}
</style>
