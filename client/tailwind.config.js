/** @type {import('tailwindcss').Config} */

const pxToRem = (px, base = 16) => `${px / base}rem`;

const range = (start, end) => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    spacing: {
      ...range(1, 100).reduce((acc, px) => {
        acc[`${px}pxr`] = pxToRem(px);
        return acc;
      }, {}),
    },
    extend: {
      colors: {
        gray: {
          100: '#F4F4F4',
          200: '#E2E2E2',
          300: '#D1D1D1',
          400: '#C6C6C6',
          500: '#B6B6B6',
          600: '#A1A1A1',
          700: '#929292',
          800: '#626262',
          900: '#4D4D4D',
        },
        purple: {
          100: '#EFDBFF',
          200: '#B75EFF',
          300: '#7A22C3',
          400: '#5B0D9A',
        },
        kakao: {
          100: '#FFE600',
          200: '#E6CF00',
          300: '#381E1E',
        },
        cherry: '#FF5E5E',
      },
    },
  },
  plugins: [],
};
