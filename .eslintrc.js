/* eslint-disable quote-props */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    objectCurlySpacing: false,
  },
  plugins: ['prettier'],
  rules: {
    'no-use-before-define': 'off', // this rule makes for less readable code
    'react/prop-types': 'off',
    'react/no-danger': 'off',
    'prettier/prettier': ['error'],
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
  },
};
