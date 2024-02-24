/** @type {import('tailwindcss').Config} */
const { fontSize, minWidth } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      padding: {
        0.75: '0.1875rem',
        1.75: '0.438rem',
        2.25: '0.563rem',
        2.5: '0.625rem',
        2.75: '0.6875rem',
        3.25: '0.813rem',
        3.5: '0.875rem',
        3.75: '0.9375rem',
        4.5: '1.125rem',
        5.5: '1.375rem',
        5.6: '1.412rem',
        6.5: '1.625rem',
        7.5: '1.875rem',
        18: '4.5rem'
      }
    },
    colors: {
      'blue-gray': {
        500: '#2D3748',
        800: '#1A202C'
      },
      white: '#FFF',
      gray: {
        ...colors.gray,
        30: '#F6F9FC',
        40: '#F2F5F8',
        50: '#ECF2F9',
        60: '#F7F9FC',
        80: '#EDF0F4',
        90: '#8A94A2',
        100: '#C5CDDA',
        250: '#DEE3EA',
        300: '#D1D5DB',
        400: '#C2CDD2',
        500: '#6F777B',
        550: '#919191',
        525: '#7D7F82',
        830: '#444444',
        850: '#26292E',
        900: '#222222'
      },
      blue: {
        ...colors.blue,
        40: '#F3FDFF',
        60: '#EDF0F4',
        100: '#E6F2F8',
        200: '#DEE3EA',
        300: '#F2F9FF',
        400: '#E1F0FF',
        500: '#2B6CB0',
        700: '#0056AC'
      },
      red: {
        ...colors.red,
        100: '#E36B6B',
        200: '#FFF3F3',
        300: '#DC362E',
        500: '#FF0707',
        700: '#CF000B',
        750: '#BF0909'
      },
      stone: {
        ...colors.stone,
        800: "#242424"
      },
      orange: {
        ...colors.orange
      }
    },
    lineHeight: {
      13: '3.25rem'
    },
    fontSize: {
      ...fontSize,
      3.5: '2.625rem'
    },
  },
  plugins: []
}
