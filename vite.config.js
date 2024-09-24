// import { fileURLToPath, URL } from "node:url";
// import { defineConfig } from "vite";
// import vue from "@vitejs/plugin-vue";
// import vueJsx from "@vitejs/plugin-vue-jsx";
// import vueDevTools from "vite-plugin-vue-devtools";
// import { VitePWA } from "vite-plugin-pwa";
// export default defineConfig(({ mode }) => {
//   const isDevelopment = mode === "development";

//   return {
//     plugins: [
//       vue(),
//       vueJsx(),
//       VitePWA({
//         registerType: "autoUpdate",
//         workbox: {
//           globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
//           maximumFileSizeToCacheInBytes: 50000000,
//           runtimeCaching: [
//             {
//               urlPattern: ({ request }) => request.mode === "navigate",
//               handler: "NetworkFirst",
//               options: {
//                 cacheName: "pages",
//               },
//             },
//             {
//               urlPattern: /.*\.(?:js|css|html|png|svg|ico)$/,
//               handler: "CacheFirst", 
//               options: {
//                 cacheName: "assets",
//               },
//             },
//           ],
//         },
//         devOptions: {
//           enabled: true,
//           type: "module",
       
//         },
//         manifest: {
//           name: "SNC Contracting",
//           short_name: "SNC",
//           theme_color: "#304452",
//           background_color: "#BB936A",
//           display: "standalone",
//           scope: "/",
//           start_url: "/",
//           icons: [
//             {
//               src: "/img/icons/snc1.png",
//               sizes: "511x410",
//               type: "image/png",
//             },
//             // {
//             //   src: "/img/icons/snc2.png",
//             //   sizes: "192x192",
//             //   type: "image/png",
//             // },
//           ],
//           screenshots: [
//             {
//               src: "/img/screenshots/desktop-screenshot.png",
//               sizes: "1920x1080",
//               type: "image/png",
//               form_factor: "wide",
//             },
//             {
//               src: "/img/screenshots/mobile-screenshot.png",
//               sizes: "720x1280",
//               type: "image/png",
//               form_factor: "narrow",
//             },
//           ],
//         },
//         server: {
//           mimeTypes: {
//             js: "application/javascript",
//             webmanifest: "application/manifest+json",
//           },
//         },
//       }),
//       // Conditionally include devtools plugin in development mode
//       isDevelopment && vueDevTools(),
//     ].filter(Boolean),
//     resolve: {
//       alias: {
//         "@": fileURLToPath(new URL("./src", import.meta.url)),
//       },
//     },
//   };
// });
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL } from 'url';
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
            },
          },
          {
            urlPattern: ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'assets-cache',
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 يومًا
              },
            },
          },
        ],
      },
      manifest: {
        name: 'SNC Contracting',
        short_name: 'SNC',
        theme_color: '#304452',
        background_color: '#BB936A',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/img/icons/snc2.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/img/icons/snc3.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
