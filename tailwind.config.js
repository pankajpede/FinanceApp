module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#01205f',
        secondary: '#0039ac',
        warning: '#f57c00',
        danger: '#ff4032',
        success: '#4caf50',
      },
    },
  },
  plugins: [],
};

