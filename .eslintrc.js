module.exports = {
  extends: [require.resolve('eslint-config-react-app-tsc')],
  rules: {
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',

        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'index',
        ],
      },
    ],
  },

  settings: {
    'import/internal-regex': '^@src/',
  },
}
