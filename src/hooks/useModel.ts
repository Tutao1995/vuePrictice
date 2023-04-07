import { computed } from 'vue'
export function useModel(props: any, propName: any, emit: Function) {
  return computed({
    get() {
      return new Proxy(props[propName], {
        set(obj, name, val) {
          emit(`update:${propName}`, {
            ...obj,
            [name]: val
          })
          return true
        }
      })
    },
    set(val) {
      emit(`update:${propName}`, val)
    }
  })
}