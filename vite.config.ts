import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [react()],
    base: isProduction ? './' : '/',
    build: {
      outDir: 'dist',
      assetsDir: '.',  // Place assets in the root of `dist`
      rollupOptions: {
        input: {
          main: './index.html', // or the correct path to your entry HTML
        },
      },
    },
  };
});