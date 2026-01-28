import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// هذا الملف هو "العقل" الذي يخبر المتصفح بكيفية قراءة ملفات الـ Markdown
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
})