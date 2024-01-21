/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'primary-hover': 'rgba(255, 90, 0, 0.3) 0px 1px 2.5rem',
      }
    },
  },
  plugins: [],
})

