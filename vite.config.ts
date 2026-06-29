import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 3000, // Three.js + Rapier physics are naturally large
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) {
              return 'vendor-three';
            }
            if (id.includes('gsap') || id.includes('framer-motion')) {
              return 'vendor-animation';
            }
            return 'vendor-core';
          }
        }
      }
    }
  }
})
