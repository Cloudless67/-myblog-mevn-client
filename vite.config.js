import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteCompression from 'vite-plugin-compression';
import purgecss from '@fullhuman/postcss-purgecss';

export default defineConfig({
    plugins: [vue(), viteCompression()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        port: 8080,
        proxy: {
            '/api': 'http://localhost:3000',
        },
    },
    css: {
        postcss: {
            plugins: [
                purgecss({
                    content: ['./src/**/*.vue'],
                    //  Should not remove data-v- style selectors created by Vue
                    safelist: () => [/v-/],
                }),
            ],
        },
    },
    build: {
        outDir: '../server/dist/public',
    },
});
