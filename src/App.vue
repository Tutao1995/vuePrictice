<template>
    <el-config-provider :locale="locale">
        <div id="app">
            <router-view></router-view>
        </div>
    </el-config-provider>
</template>

<script setup>
import { ElConfigProvider } from 'element-plus';
import zhLocale from 'element-plus/lib/locale/lang/zh-cn';
import enLocale from 'element-plus/lib/locale/lang/en';

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md

const locale = enLocale;
</script>

<style>
html,
body {
    position: relative;
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
}
#app {
    position: relative;
    height: 100%;
    width: 100%;
}
</style>
