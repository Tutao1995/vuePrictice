import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, 'src'),
            "api": path.resolve(__dirname, 'api'),
            "components": path.resolve(__dirname, 'src/components'),
            "routers": path.resolve(__dirname, 'src/routers'),
            "stores": path.resolve(__dirname, 'src/stores'),
            "utils": path.resolve(__dirname, 'src/utils'),
            "hooks": path.resolve(__dirname, 'src/hooks'),
            "pages": path.resolve(__dirname, 'src/pages')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData:'@import "@/styles/variables.scss";'
            }
        }
    },
    build: {
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
    },
})

