// tailwind.config.js
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import vue from '@vitejs/plugin-vue';

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
     './node_modules/@ipaat/vue3-tailwind3-cookie-comply/dist/vue3-tailwind3-cookie-comply.umd.js',
     'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class', // أو 'media' إذا كنت تريد التفعيل بناءً على تفضيلات النظام
   theme: {
    colors: {
      'primary': '#BB936A',
      'secondary': '#324654',
      'secondaryDark':'#1F2937',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
    },
    fontFamily: {
     
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [
    tailwindcss(),
    autoprefixer(),
    vue(),
    // eslint-disable-next-line no-undef
 
    require('flowbite/plugin'),
  ],

  
};


