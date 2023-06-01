<template>
    <div>
        {{ time }}
    </div>
</template>

<script setup lang="ts">
import { buildDate, addZero } from '@/utils/index'

const time = ref('')
function updateDateTime() {
    const { year, month, day, hour, minutes, seconds } = buildDate()
    time.value = `${addZero(year)}-${addZero(month + 1)}-${addZero(day)} ${addZero(hour)}:${addZero(minutes)}:${addZero(seconds)}`
}

let timerId: NodeJS.Timeout

onMounted(() => {
    timerId = setInterval(updateDateTime, 1000)
    window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            clearInterval(timerId)
            updateDateTime()
        }
    })
})

onUnmounted(() => {
    clearInterval(timerId)
})

</script>

<style lang="scss" scoped></style>