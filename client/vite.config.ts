import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "hooks": path.resolve(__dirname, "./src/hooks"),
      "pages": path.resolve(__dirname, "./src/pages"),
      "api": path.resolve(__dirname, "./src/api"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@interfaces": path.resolve(__dirname, "./src/interfaces"),
      "@utils": path.resolve(__dirname, "./src/lib/utils"),
      "@store-actions": path.resolve(__dirname, "./src/redux"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
    },
  },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  }
})