module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        brown: {
          50: 'fdf8f6',
          
        },
        discover: '#24325E',
        background: '#E5E5E5',
        border_color: '#CBCBCB'
      },
      flex: {
        0.5: '0.5',
        0.8: '0.8'
      },
      width:{
        100: '1200px',
      },
      height: {
        100: '1200px'
      },
  fontFamily: {
    'lato': ['Lato'],
    'lato_light': ['outfit'],
    'lato_italic': ['Lato italic'],
    'lato_l': ['Lato Light'],
    'poppins_italic': ['Poppins italic'],
    'poppins_Regular': ['Poppins Regular'],
    'poppins_semiBold': ['Poppins SemiBold']
  } 
    },
    
  },
  plugins: [],
}
