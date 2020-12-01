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
          colors: {
            primary: '#5b64a5',
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
