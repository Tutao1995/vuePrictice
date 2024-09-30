import draggable from "@/directives/modules/draggable";


export const DialogProps = {
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '提示'
  },
  content: {
    type: String,
    default: ''
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  // 是否显示关闭按钮
  showClose: {
    type: Boolean,
    default: true
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  showMask: {
    type: Boolean,
    default: true
  },
  maskClosable: {
    type: Boolean,
    default: true
  },
  onOK: {
    type: Function,
    default: () => {}
  },
  onCancel: {
    type: Function,
    default: () => {}
  },
  width: {
    type: [String, Number],
    default: '50%'
  },
  height: {
    type: [String, Number],
    default: '50%'
  },
  modalClass: {
    type: [String, Array],
    default: ''
  },
  modalStyle: {
    type: Object,
    default: () => ({})
  },
  okButtonDisabled: {
    type: Boolean,
    default: false
  },
  cancelButtonDisabled: {
    type: Boolean,
    default: false
  },
  okButtonText: {
    type: String,
    default: '确定'
  },
  cancelButtonText: {
    type: String,
    default: '取消'
  },
  draggable: {
    type: Boolean,
    default: false
  }
}