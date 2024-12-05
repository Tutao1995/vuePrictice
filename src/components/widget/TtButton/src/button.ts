import { PropType } from 'vue'

export const ButtonProps = {
    type: {
        type: String as PropType<'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'>,
        default: 'default',
    },
    size: {
        type: String as PropType<'small' | 'medium' | 'large'>,
        default: 'medium',
    },
    shape: {
        type: String as PropType<'circle' | 'round'>,
        default: 'round',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false,
    },
    icon: {
        type: String,
        default: '',
    },
    text: {
        type: String,
    },
}
