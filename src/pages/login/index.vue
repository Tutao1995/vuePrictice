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
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import { useMainStore } from '@/stores/index'
import { useRouter } from 'vue-router'
const mainStore = useMainStore()
const updateLoginState = () => {
    mainStore.$patch({
        isLogin: true,
    })
}
const router = useRouter()

const username = ref<string>('')
const password = ref<string>('')
const options = {
    particles: {
        number: {
            value: 50,
            density: {
                enable: true,
                valueArea: 400,
            },
        },
        color: {
            value: '#3CB2BE',
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000',
            },
            polygon: {
                nbSides: 5,
            },
        },
        opacity: {
            value: 1,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacityMin: 0.1,
                sync: false,
            },
        },
        size: {
            value: 5,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                sizeMin: 0.1,
                sync: false,
            },
        },
        lineLinked: {
            enable: true,
            distance: 160,
            color: '#3CB2BE',
            opacity: 0.5,
            width: 1,
        },
        move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: true,
            straight: false,
            outMode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
            },
        },
    },
    interactivity: {
        detectsOn: 'canvas',
        events: {
            onHover: {
                enable: true,
                mode: 'bubble',
            },
            onClick: {
                enable: false,
                mode: 'push',
            },
            resize: true,
        },
        modes: {
            grab: {
                distance: 400,
                lineLinked: {
                    opacity: 1,
                },
            },
            bubble: {
                distance: 400,
                size: 8,
                duration: 10,
                opacity: 0.248,
                speed: 3,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
            push: {
                particlesNb: 4,
            },
            remove: {
                particlesNb: 2,
            },
        },
    },
    detectRetina: true,
}

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
    updateLoginState()
    router.push({ name: 'home' })
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
            text-shadow: 0 0 5px #fff, 0 0 5px #eee, 0 0 5px #111;
        }
        &-item {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            &:deep .el-input__wrapper {
                background: none;
                border: 1px solid #3cb2be;
                box-shadow: none;
            }
            &:deep .el-input__inner {
                color: #fff;
            }
        }
        &-button {
            .el-button {
                width: 215px;
                background: rgb(58 58 58 / 80%);
                border: none;
                transition: background ease 0.5s;
                &:hover {
                    background: rgb(120 120 120 / 80%);
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
</style>
