<template>
   <ul class="tt-select__dropdown">
        <li class="tt-select__dropdown-item"
            v-for="item of options"
            :key="item.value"
            @click="$emit('update:value', item.value)"
            :class="{'is-selected': item.value === value}"
            >{{ item.label }}
        ></li>
   </ul>
</template>

<script setup lang="ts">
const selectProps = withDefaults(defineProps<{
    options: {label: string, value: string}[]
    value: string
}>(), {
    options: () => [],
    value: ''
})

</script>

<style lang="scss" scoped>
.tt-select__dropdown {
    .is-selected {
        color: #409eff;
        font-size: 14px;
    }
}

</style>