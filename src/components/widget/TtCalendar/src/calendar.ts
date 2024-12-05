import { PropType } from 'vue'

type valueFormat = 'YYYY-MM-DD' | 'YYYY-MM' | 'YYYY' | 'MM-DD' | 'MM' | 'DD'

export const CalendarProps = {
    modelValue: {
        type: String,
        default: '',
    },
    valueFormat: {
        type: String as PropType<valueFormat>,
        default: 'YYYY-MM-DD',
    },
    type: {
        type: String as PropType<'date' | 'month' | 'year'>,
        default: 'date',
    },
    disabledDate: {
        type: Function as PropType<(date: Date) => boolean>,
        default: () => false,
    },
    showHeader: {
        type: Boolean,
        default: true,
    },
}
