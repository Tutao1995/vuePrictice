import { onUpdated, ref, Ref } from "vue";
export function useCountTransition(start: Ref, end: Ref, duration: number = 1000, callback: Function) {
  const total = end.value - start.value;
  const step = total / duration / 10;
  let timer = setInterval(() => {
    start.value += +parseInt(step + '');
    callback()
    if (start.value >= end.value) {
      start.value = end.value
      clearInterval(timer)
    }
  }, 10);
  return {
    timer
  }
}