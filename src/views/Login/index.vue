<template>
    <div class="login-wrapper">
        <div class="login-form">
            <div class="login-form-item" v-for="item of loginItemList" :key="item.prop">
                <div class="login-form-item-label">{{ item.label }}</div>
                <div class="login-form-item-content">
                    <el-input v-model="loginProps[item.prop]" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineComponent, ref, reactive } from 'vue';

const loginItemList = reactive([
    {
        label: '账号',
        prop: 'account'
    },
    {
        label: '密码',
        prop: 'pwd'
    }
]);
const loginProps = reactive({
    account: '',
    pwd: ''
});
</script>

<style lang="scss" scoped>
.login-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: auto;
    background: linear-gradient(90deg, #ebebeb, #f5f7f6);
    .login-form {
        &-item {
            display: flex;
            align-items: center;
        }
    }
}
</style>
