import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  define: {
    // Make BUILD_VARIANT available as a global constant
    'import.meta.env.VITE_BUILD_VARIANT': JSON.stringify(process.env.VITE_BUILD_VARIANT || 'default')
  },
  build: {
    outDir: process.env.VITE_BUILD_VARIANT === 'customised' ? 'dist-customised' : 'dist',
    rollupOptions: {
      input: {
        popup: './index.html'
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
}))
