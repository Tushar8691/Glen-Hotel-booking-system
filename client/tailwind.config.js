/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: 'class', // <-- remove or comment out this line
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  ttheme: {
    extend: {
      animation: {
        'spotlight-move': 'spotlight-move 7s ease-in-out infinite',
        'spotlight-move-left': 'spotlight-move-left 7s ease-in-out infinite',
        'spotlight-move-right': 'spotlight-move-right 7s ease-in-out infinite',
      },
      keyframes: {
        'spotlight-move': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(-350px) translateX(-50px) rotate(-10deg)',
          },
          '20%': { 
            opacity: '1',
            transform: 'translateY(-300px) translateX(0px) rotate(0deg)',
          },
          '80%': { 
            opacity: '1',
            transform: 'translateY(-250px) translateX(50px) rotate(5deg)',
          },
          '100%': { 
            opacity: '0',
            transform: 'translateY(-200px) translateX(100px) rotate(10deg)',
          },
        },
        'spotlight-move-left': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(-350px) translateX(-150px)',
          },
          '30%': { 
            opacity: '0.6',
            transform: 'translateY(-300px) translateX(-100px)',
          },
          '70%': { 
            opacity: '0.6',
            transform: 'translateY(-250px) translateX(-50px)',
          },
          '100%': { 
            opacity: '0',
            transform: 'translateY(-200px) translateX(0px)',
          },
        },
        'spotlight-move-right': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(-350px) translateX(250px)',
          },
          '40%': { 
            opacity: '0.4',
            transform: 'translateY(-300px) translateX(200px)',
          },
          '60%': { 
            opacity: '0.4',
            transform: 'translateY(-250px) translateX(150px)',
          },
          '100%': { 
            opacity: '0',
            transform: 'translateY(-200px) translateX(100px)',
          },
        },
      },
    },
  },
  plugins: [],
}
