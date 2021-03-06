import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3002,
    proxy: {
      '/api': 'http://localhost:3000',
    }
  },
  plugins: [reactRefresh()]
});
