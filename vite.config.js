import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';

  return {
    plugins: [
      vue(),
      vueJsx(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
        workbox: {
          clientsClaim: true,
          skipWaiting: true
        },
         devOptions: {
        enabled: true
      },
        manifest: {
          "name": "SNC Contracting",
          "short_name": "SNC",
          "theme_color": "#304452",
          "background_color": "#BB936A",
          "display": "standalone",
          "scope": "/",
          "start_url": "/",
          "icons": [
            {
              "src": "/img/icons/snc2.png",
              "sizes": "192x192",
              "type": "image/png"
            },
            {
              "src": "/img/icons/snc1.png",
              "sizes": "512x512",
              "type": "image/png"
            }
          ]
        }
        ,
      }),
      // Conditionally include devtools plugin in development mode
      isDevelopment && vueDevTools(),
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

  };
});
