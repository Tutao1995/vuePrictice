/**
 * v-clickOutside
 * 复制某个值至剪贴板
 * 接收参数：string类型/Ref<string>类型/Reactive<string>类型
 */
 import type { Directive, DirectiveBinding, VNode } from "vue";
 interface ElType extends HTMLElement {
     __handleClick__: any;
 }
const clickOutside: Directive = {
    // 初始化事件
    beforeMount(el: ElType, binding: DirectiveBinding, vNode: VNode) {
        function handleClick(e: Event) {
            // 如果为元素本身，则返回
            if (el.contains(e.target as HTMLElement)) {
                return false;
            }
            // 如果绑定了函数，则返回执行
            binding.value(e);
        }
        el.__handleClick__ = handleClick;
        document.addEventListener('click', handleClick);
    },
    // 解除事件监听
    beforeUnmount(el: ElType) {
        document.removeEventListener('click', el.__handleClick__);
        delete el.__handleClick__;
    }
};


 export default clickOutside;