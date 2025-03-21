import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'
import visualizer from 'rollup-plugin-visualizer';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
            imports: ['vue'],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        vueJsx(),
        visualizer({ open: true, gzipSize: true, brotliSize: true })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            api: path.resolve(__dirname, 'api'),
            components: path.resolve(__dirname, 'src/components'),
            routers: path.resolve(__dirname, 'src/routers'),
            stores: path.resolve(__dirname, 'src/stores'),
            utils: path.resolve(__dirname, 'src/utils'),
            hooks: path.resolve(__dirname, 'src/hooks'),
            pages: path.resolve(__dirname, 'src/pages'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/styles/variables.scss";',
            },
        },
    },
    build: {
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
        target: 'esnext',
        rollupOptions: {
            output: {
                // manualChunks 配置
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString()
                    }
                    if(id.includes('src/pages')) {
                      return id.toString().split('src/pages/')[1].split('/')[0].toString() + '-page'
                    }
                    if(id.includes('src/assets')) {
                      return 'assets'
                    }
                },
                // manualChunks: {
                //     // 将 React 相关库打包成单独的 chunk 中
                //     'vue-vendor': ['vue', 'vue-router', 'pinia'],
                //     // 将 Lodash 库的代码单独打包
                //     // 将组件库的代码打包
                //     library: ['element-plus', 'vue-prism-editor', 'echarts'],
                // },
            },
        },
    },
    server: {
        hmr: true,
    },
})
