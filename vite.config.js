import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers:[ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle:"sass",
        })
      ]
    })
  
  ],
  //静态资源服务的文件夹
 publicDir: "public",
 base: './',
 resolve: {
  alias: {
  // 关键代码
    '@': path.resolve(__dirname, './src')
  }
},
  
})
