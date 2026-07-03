import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiUrl = env.VITE_HAWKEYE_API_URL || 'https://crm.flent.in'

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/hawkeye': {
          target: apiUrl,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/hawkeye/, ''),
        },
      },
    },
  }
})
