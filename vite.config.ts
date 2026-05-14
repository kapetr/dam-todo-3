import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/dam-todo-3/',
  plugins: [react()],
  test: {
    environment: 'node',
  },
})
