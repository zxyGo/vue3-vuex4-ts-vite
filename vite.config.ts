import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join, resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      { find: '@', replacement: resolve('./src') },
      { find: '_c', replacement: resolve('./src/components') },
      { find: '_v', replacement: resolve('./src/views') },
      {
        find: /~(.+)/,
        replacement: join(process.cwd(), 'node_modules/$1')
      }
    ]
  },
  base: './', // 打包路径
  server: {
    port: 4000, // 服务端口号
    open: true, // 服务启动时是否自动打开浏览器
    cors: true // 允许跨域
  }
})
