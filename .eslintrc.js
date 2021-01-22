/* eslint-disable import/no-commonjs */
module.exports = {
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: ['./tsconfig.json']
  },
  extends: [
    '@tribecamp/base',
    '@tribecamp/typescript',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/unicorn'
  ],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/camelcase': 'off',
    'no-console': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  }
};
