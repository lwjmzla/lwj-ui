module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-unused-vars': 'off',
    'no-param-reassign': 'off',
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': 'off', // 回车换行风格
    'import/prefer-default-export': 'off',
    'prefer-object-spread': 'off',
    'prefer-promise-reject-errors': 'off',
    'no-restricted-properties': 'off',
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
    'operator-assignment': ['error', 'always'],
    'arrow-body-style': 'off',
    'no-underscore-dangle': 'off',
    'no-async-promise-executor': 'off',
    'no-shadow': 'off',
    'vue/no-multi-spaces': 'error', // 不允许有多余的空格
    'vue/html-end-tags': 'error',
    'vue/no-spaces-around-equal-signs-in-attribute': ['error'],
    'vue/html-closing-bracket-newline': ['error', { // 多行 html 结束符需要换行
      singleline: 'never',
      multiline: 'always',
    }],
    'vue/max-attributes-per-line': ['error', {
      singleline: 3,
      multiline: {
        max: 1,
        allowFirstLine: false,
      },
    }],
    'vue/html-indent': ['error', 2, {
      attribute: 1,
      baseIndent: 1,
      closeBracket: 0,
      alignAttributesVertically: true,
      ignores: ['VExpressionContainer'],
    }],
    'vue/html-closing-bracket-spacing': ['error', {
      startTag: 'never',
      endTag: 'never',
      selfClosingTag: 'always',
    }],
    // 'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],

    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
