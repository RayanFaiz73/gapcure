import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./public/**/*.html",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
          // Configure your color palette here
          'theme-primary': {
            '50': '#584EB3',
            '100': '#5147A5',
            '200': '#433B89',
            '300': '#352F6C',
            '400': '#272250',
            '500': '#191633',
            '600': '#121128',
            '700': '#0C091F',
            '800': '#0D0B1E',
            '900': '#0A0816',
            '950': '#000000'
          },
          'theme-success': {
            '50': '#D2D5F6',
            '100': '#C1C6F2',
            '200': '#9FA7EB',
            '300': '#7E87E4',
            '400': '#5C68DD',
            '500': '#3A49D6',
            '600': '#2533B3',
            '700': '#1C2684',
            '800': '#121856',
            '900': '#080B27',
            '950': '#030510'
          },
  
          'theme-danger': {
              '50': '#fdf4f3',
              '100': '#fbe9e8',
              '200': '#f6d7d5',
              '300': '#efb5b2',
              '400': '#e58987',
              '500': '#d75c5c',
              '600': '#c44147',
              '700': '#a32d36',
              '800': '#892832',
              '900': '#752630',
              '950': '#411015',
          },
          'theme-warning': {
              '50': '#fdfdea',
              '100': '#fafbc6',
              '200': '#f8f590',
              '300': '#f4e950',
              '400': '#efd820',
              '500': '#dfc013',
              '600': '#c0970e',
              '700': '#996e0f',
              '800': '#7f5714',
              '900': '#6c4717',
              '950': '#3f2509',
          },
  
          'theme-info': {
              '50': '#ecfcff',
              '100': '#cff8fe',
              '200': '#a5f0fc',
              '300': '#67e6f9',
              '400': '#22d3ee',
              '500': '#06b9d4',
              '600': '#089bb2',
              '700': '#0e7f90',
              '800': '#156875',
              '900': '#165963',
              '950': '#083c44',
          },
          'theme-secondary': {
              '50': '#f6f6f6',
              '100': '#e7e7e7',
              '200': '#d1d1d1',
              '300': '#b0b0b0',
              '400': '#888888',
              '500': '#6d6d6d',
              '600': '#5d5d5d',
              '700': '#4c4c4c',
              '800': '#454545',
              '900': '#3d3d3d',
              '950': '#262626',
          },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
    require('@headlessui/tailwindcss')
  ],
}
export default config
