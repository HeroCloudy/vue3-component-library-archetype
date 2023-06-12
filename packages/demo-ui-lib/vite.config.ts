import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import VueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'

export default defineConfig({
  root: './',
  plugins: [
    vue(),
    VueJsx(),
    dts({
      insertTypesEntry: true,
      staticImport: true,
      copyDtsFiles: true,
      skipDiagnostics: true
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, './index.ts'),
      name: '{{libraryName}}',
      fileName: format => `{{libraryName}}.${format}.js`
    },
    outDir: path.resolve(__dirname, '../../lib'),
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
