import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// https://vite.dev/config/
export default defineConfig({
    server: {
        allowedHosts: ['vedics.ai', 'staging.vedics.ai']
    },
    plugins: [react()],
});
