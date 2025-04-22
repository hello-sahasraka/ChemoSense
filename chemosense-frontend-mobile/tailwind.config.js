/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
<<<<<<< HEAD
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components//*.{js,jsx,ts,tsx}",
  ],
=======
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
>>>>>>> 517003294b8693b95218c3339774deb7f918c215
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}