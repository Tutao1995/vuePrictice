<template>
    <div class="wrapper">
        <Particles id="tsparticles" class="login-wrapper" :options="options" />
        <div class="login-form">
            <div class="login-form-title">Hello，vue3!</div>
            <div class="login-form-item">
                <el-input
                    suffix-icon="UserFilled"
                    v-model.trim="username"
                    placeholder="请输入账号"
                    :maxlength="20"
                />
            </div>
            <div class="login-form-item">
                <el-input
                    suffix-icon="View"
                    v-model.trim="password"
                    placeholder="请输入密码"
                    :maxlength="20"
                    @keydown.prevent.enter="login"
                />
            </div>
            <div class="login-form-button">
                <el-button type="primary" @click="login">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { option1, option2, option3 } from '@/assets/js/particles'
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import { useMainStore } from '@/stores/index'
import { useRouter } from 'vue-router'
import { authorityType } from '@/assets/js/authority'

const mainStore = useMainStore()
const updateLoginState = (value: authorityType) => {
    mainStore.$patch({
        isLogin: true,
        authority: value,
    })
}
const router = useRouter()

const username = ref<string>('')
const password = ref<string>('')
const options = option3

const login = () => {
    if (!username.value) {
        ElNotification({
            type: 'warning',
            message: '请输入用户名',
        })
        return
    }
    if (!password.value) {
        ElNotification({
            type: 'warning',
            message: '请输入密码',
        })
        return
    }
    if (['admin', 'system', 'common'].includes(username.value)) {
        updateLoginState(username.value as authorityType)
        router.push({ name: 'home' })
    }
}
</script>

<style scoped lang="scss">
.wrapper {
    flex: auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;

    .login-form {
        width: 500px;
        height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        background: rgb(58 58 58 / 80%);

        &-title {
            margin-bottom: 40px;
            font-size: 24px;
            font-weight: bold;
            color: #fff;
            animation: bounce ease 2s infinite;
        }

        &-item {
            display: flex;
            align-items: center;
            margin-bottom: 20px;

            :deep(.el-input__wrapper) {
                background: none;
                border: 1px solid #3cb2be;
                box-shadow: none;
            }

            :deep(.el-input__inner) {
                color: #fff;
            }
        }

        &-button {
            .el-button {
                width: 215px;
                background: $red;
                border: none;
                transition: background ease 0.5s;

                &:hover {
                    background: $lightRed;
                }
            }
        }
    }
}

.login-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000000;
    z-index: -10;
}

@keyframes bounce {
    from {
        transform: translate3d(0, 0, 0);
    }

    15% {
        transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);
    }

    30% {
        transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);
    }

    45% {
        transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);
    }

    60% {
        transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);
    }

    75% {
        transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);
    }

    to {
        transform: translate3d(0, 0, 0);
    }
}
</style>
