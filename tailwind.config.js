/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#fffdf7',
        slate: {50:'#faf8f0',100:'#f1eee4',200:'#dddcd0',300:'#c1c6b8',400:'#7e8d80',500:'#5d7063',600:'#465d50',700:'#304e3e',800:'#203d2f',900:'#142f24',950:'#0e241b'},
        indigo: {50:'#edf2e9',100:'#dfebd8',200:'#c3d6b8',300:'#9bb98b',400:'#729962',500:'#4b7850',600:'#28583f',700:'#204d36',800:'#193f2c',900:'#153626',950:'#102b20'},
        violet: {50:'#f0f2e9',100:'#e5ebd8',200:'#c9d6b8',300:'#afbe91',400:'#8c9f6d',500:'#5d7a4b',600:'#345d40',700:'#2b5035',800:'#24432d',900:'#1b3524',950:'#112a1b'},
        purple: {50:'#f2f3e9',100:'#e5ebd8',200:'#c9d6b8',300:'#afbe91',400:'#8c9f6d',500:'#5d7a4b',600:'#345d40',700:'#2b5035',800:'#24432d',900:'#1b3524',950:'#112a1b'},
      },
      borderRadius: {lg:'0.375rem',xl:'0.5rem','2xl':'0.625rem','3xl':'0.75rem'},
      boxShadow: {sm:'0 1px 3px rgb(20 47 36 / 0.04)',DEFAULT:'0 3px 12px rgb(20 47 36 / 0.05)',md:'0 4px 16px rgb(20 47 36 / 0.05)',lg:'0 6px 24px rgb(20 47 36 / 0.06)',xl:'0 10px 32px rgb(20 47 36 / 0.06)','2xl':'0 16px 48px rgb(20 47 36 / 0.08)'},
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
