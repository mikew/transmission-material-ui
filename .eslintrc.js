module.exports = {
  extends: [
    require.resolve('eslint-config-react-app-tsc'),
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',

    // Disables rules that TypeScript already checks.
    'plugin:@typescript-eslint/eslint-recommended',

    // disables rules that prettier fixes.
    'prettier',
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        // Allow function hoisting.
        functions: false,
        classes: false,
        variables: false,
        typedefs: false,
      },
    ],

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

    // '@typescript-eslint/no-explicit-any': 'off',
    'react/react-in-jsx-scope': 'off',
  },

  settings: {
    'import/internal-regex': '^@src/',
  },
}
