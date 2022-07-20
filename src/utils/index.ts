
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