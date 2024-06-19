/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['"Inter"'],
      },
      colors: {
        primary: '#143cdb',
        primaryhover: '#1236C5',
        secondary: '#213690'
      },
    },
  },
  plugins: [],
}

