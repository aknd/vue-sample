module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
    // '@vue/typescript/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: [
    // '@typescript-eslint',
    'import'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-shadow': 'off',
    'no-multiple-empty-lines': [
      'error',
      {
        'max': 1
      }
    ],
    'no-unused-vars': [
      'off'
      // 'error',
      // {
      //   'argsIgnorePattern': '^_'
      // }
    ],
    // '@typescript-eslint/no-unused-vars': [
    //   'error',
    //   {
    //     'argsIgnorePattern': '^_'
    //   }
    // ],
    'import/imports-first': 'error',
    'import/newline-after-import': 'error'
  }
}
