// import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss()
//   ],
//   server: {
//     host: true
//   }
// })

import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://omcmultipleconcept.com',
        changeOrigin: true,
        secure: false, // set true if backend has valid TLS and you don't need to ignore cert issues
        // no rewrite needed if you want /api/register -> https://.../public/api/register
      }
    }
  }
})
