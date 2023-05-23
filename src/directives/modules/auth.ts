import type { Directive } from "vue";
import { useMainStore } from '@/stores/index'


interface newEl extends HTMLElement {
    _placeholderNode?: Comment,
    _parentNode?: ParentNode | null
}

const getAuth = () => {
    const store = useMainStore()
    const authList = store.authority
    return authList
}

const addAuth = (el: newEl) => {
    if (el._placeholderNode) {
        el._parentNode?.replaceChild(el, el._placeholderNode)
    }
}

const removeAuth = (el: newEl) => {
    // 在绑定元素上存储父级元素
    el._parentNode = el.parentNode
    // 在绑定元素上存储一个注释节点
    el._placeholderNode = document.createComment("auth")
    // 使用注释节点来占位
    el.parentNode?.replaceChild(el._placeholderNode, el)
}


const auth: Directive = {
    mounted(el, binding) {
        const authList = binding.value;
        const userAuth = getAuth()
        if (!authList.includes(userAuth)) {
            el.parentNode && el.parentNode.removeChild(el);
        }
    },
    updated(el, binding) {
        const oldAuth = binding.oldValue;
        const newAuth = binding.value;
        if (oldAuth === newAuth) return
        const update = () => {
            const userAuth = getAuth()
            if (!newAuth.includes(userAuth)) {
                removeAuth(el)
            } else {
                addAuth(el)
            }
        }
        if (el._watchEffect) {
            update()
        } else {
            el._watchEffect = watchEffect(() => {
                update()
            })
        }
    }
}

export default auth