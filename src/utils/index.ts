const isString = (val: any) => {
    return Object.prototype.toString.call(val).slice(8, -1) === 'String'
}
const isNumber = (val: any) => {
    return Object.prototype.toString.call(val).slice(8, -1) === 'Number'
}

export function addUnit(value?: string | number, defaultUnit = 'px') {
    if (!value) return ''
    if (isString(value)) {
        return value
    } else if (isNumber(value)) {
        return `${value}${defaultUnit}`
    }
}
export function buildDate() {
    const current = new Date()
    const year = current.getFullYear()
    const month = current.getMonth()
    const day = current.getDate()
    const hour = current.getHours()
    const minutes = current.getMinutes()
    const seconds = current.getSeconds()
    return {
        year,
        month,
        day,
        hour,
        minutes,
        seconds,
    }
}
export function addZero(value: number) {
    return value.toString().padStart(2, '0')
    return value > 9 ? value : '0' + value
}
