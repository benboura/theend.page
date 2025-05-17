
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // ⬅️ clé pour corriger les chemins en production
  plugins: [react()],
})
