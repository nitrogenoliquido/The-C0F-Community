import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import obfuscator from 'rollup-plugin-javascript-obfuscator'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    obfuscator({
      options: {
        compact: true,
        controlFlowFlattening: true,
        deadCodeInjection: true,
        debugProtection: true,
        stringArray: true,
        rotateStringArray: true,
        shuffleStringArray: true,
        splitStrings: true,
      },
      include: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx'],
      exclude: [/node_modules/]
    })
  ],
  server: {
    port: 3000,
  }
})
