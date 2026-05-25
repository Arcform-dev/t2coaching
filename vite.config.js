import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          gsap: ['gsap'],
        },
      },
    },
    // Cloudflare Workers/Pages limit: 25MB per file
    chunkSizeWarningLimit: 1000,
  },
})
