module.exports = {
  plugins: {
    'postcss-nested': {},
    tailwindcss: {
      purge: [
        './src/**/*.js',
        './src/**/*.jsx',
        './src/**/*.ts',
        './src/**/*.tsx',
      ],
      darkMode: 'media',
      theme: {
        extend: {
          fontFamily: {
            title: ['Impact', 'Helvetica neue', 'helvetica', 'sans-serif'],
            display: ['Helvetica neue', 'helvetica', 'sans-serif'],
            body: ['tienne', 'Georgia', 'Cambria', 'serif'],
          },
          borderWidth: {
            // DEFAULT: '1px',
            // 0: '0px',
            // 2: '2px',
            // 4: '4px',
            10: '10px',
            12: '12px',
          },

          colors: {
            primary: '#5b64a5',
            secondary: '#4b789b',
            tertiary: '#83658b',
          },
          container: {
            center: true,
            padding: '2rem',
          },
        },
      },
    },
    autoprefixer: {},
  },
};
