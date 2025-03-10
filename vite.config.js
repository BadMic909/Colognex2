import { defineConfig } from 'vite'; 
import react from '@vitejs/plugin-react'; 
import githubPages from 'vite-plugin-github-pages'; 

export default defineConfig({ 
  plugins: [react(), githubPages()], 
  base: '/', // Adjust based on your GitHub project name 
}); 