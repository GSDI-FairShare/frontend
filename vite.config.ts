import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv';

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Especifica el nombre del directorio de salida
  },
  define: {
    'process.env': {
      REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    },
  },
})
