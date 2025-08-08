import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

/** @type {import('postcss').Plugin[]} */
export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
  ],
};
