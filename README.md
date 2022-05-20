# Vue 3 + TypeScript + Vite

# 开发遇见的问题

### 登录页使用 particles.vue3 无效

降低 particles.vue3 版本以及下载 tsparticles

### particles.vue3 ts 报文件引入类型的错误

在 env.d.ts 中添加对应的声明

```javascript
    declare module "particles.vue3";
```

### 页面安装依赖经常 ts 报类型错误

npm i @type/node

### 页面刷新 store 内容没有了

store 持续化：

-   添加 pinia-plugin-persist 依赖
-   在 store 中添加 persist 参数
-   pinia.use(piniaPluginPreset);

### 菜单页签刷新，页面变化但是页签 active 不对

监听路由变化，默认 active 跟随路由

### 嵌套路由无法访问

在子路由 path 中开头不写‘/’
