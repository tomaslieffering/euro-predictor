/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['"Roboto Slab"'],
      },
      colors : {
        primary: '#143cdb',
        primaryhover: '#1236C5',
      },
    },
  },
  plugins: [],
}

