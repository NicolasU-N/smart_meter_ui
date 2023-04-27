import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@components',
        replacement: path.resolve(__dirname, './src/components/')
      },
      {
        find: '@store',
        replacement: path.resolve(__dirname, './src/store/')
      },
      {
        find: '@axiosInstance',
        replacement: path.resolve(__dirname, './src/utils/axiosInstance')
      }
      // {
      //   find: '@globalComponents',
      //   replacement: path.resolve(__dirname, './src/global-components/')
      // },
      // {
      //   find: '@icons',
      //   replacement: path.resolve(__dirname, './src/components/util/icons/')
      // },
      // {
      //   find: '@hooks',
      //   replacement: path.resolve(__dirname, './src/hooks/')
      // },
      // {
      //   find: '@helpers',
      //   replacement: path.resolve(__dirname, './src/utils/helpers/')
      // },
    ]
  },
  server: {
    port: 3000
  },
  build: {
    outDir: 'build'
  },
  plugins: [react()]
})
