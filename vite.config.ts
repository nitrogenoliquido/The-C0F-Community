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
        controlFlowFlattening: false, // DESACTIVADO: Causa principal de crashes en React
        deadCodeInjection: false,     // DESACTIVADO: Rompe la carga de módulos
        debugProtection: false,       // DESACTIVADO: Evita loops infinitos molestos al depurar
        disableConsoleOutput: true,   // Limpia los logs
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        renameGlobals: false,
        rotateStringArray: true,
        selfDefending: true,
        stringArray: true,
        stringArrayEncoding: ['rc4'], // Encripta los textos
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
