import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  css: {
    postcss: {
      config: false
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://109.73.206.144:6969',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
        headers: {
          'X-API-KEY': 'E6kUTYwZq2tN4QEtyzsbEBk3ie'
        }
      }
    }
  }
})
