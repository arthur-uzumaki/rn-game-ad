import { THEME } from './src/theme'
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: THEME.COLORS,
      fontFamily: THEME.FONT_FAMILY,
      fontSize: THEME.FONT_SIZE
    },
  },
  plugins: [],
}