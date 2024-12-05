<template>
    <svg class="icon" aria-hidden="true">
        <use :xlink:href="`#${iconName}`"></use>
    </svg>
</template>

<script setup>
const props = defineProps({
    iconName: {
        type: String,
        default: '',
    },
})
</script>

<style lang="scss" scoped></style>
