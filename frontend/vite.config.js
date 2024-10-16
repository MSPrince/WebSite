import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: { port: 5173 },
  optimizeDeps: {
    include: ["@mui/x-charts"],
    // include: ["@mui/x-charts"],
  },
});
