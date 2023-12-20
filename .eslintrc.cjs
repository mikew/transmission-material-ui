module.exports = {
  plugins: ['import'],
  extends: ['next/core-web-vitals', 'next', 'eslint:recommended'],
  parserOptions: {
    // If the project uses graphql, set the path/url to your schema below.
    // skipGraphQLConfig: true,
    // schema: 'node_modules/@promoboxx/graphql-server-types/graphql.schema.json',
  },
  rules: {
    // copied from @promoboxx/eslint-config
    'object-shorthand': [2, 'always'],
    'prefer-spread': 1,
    'prefer-template': 1,

    // gotta sort imports
    'import/no-duplicates': 1,
    'import/order': [
      1,
      {
        'alphabetize': { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
        'groups': [
          'builtin',
          'external',
          'internal',
          'parent',
          ['sibling', 'index'],
        ],
      },
    ],
  },
  // from https://github.com/facebook/create-react-app/blob/main/packages/eslint-config-react-app/index.js
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      plugins: ['@typescript-eslint'],
      // If adding a typescript-eslint version of an existing ESLint rule,
      // make sure to disable the ESLint rule here.
      rules: {
        // TypeScript's `noFallthroughCasesInSwitch` option is more robust (#6906)
        'default-case': 'off',
        // 'tsc' already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/291)
        'no-dupe-class-members': 'off',
        // 'tsc' already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/477)
        'no-undef': 'off',

        // Add TypeScript specific rules (and turn off ESLint equivalents)
        '@typescript-eslint/consistent-type-assertions': 'warn',
        'no-array-constructor': 'off',
        '@typescript-eslint/no-array-constructor': 'warn',
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': 'warn',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': [
          'warn',
          {
            functions: false,
            classes: false,
            variables: false,
            typedefs: false,
          },
        ],
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': [
          'error',
          {
            allowShortCircuit: true,
            allowTernary: true,
            allowTaggedTemplates: true,
          },
        ],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            args: 'none',
            ignoreRestSiblings: true,
          },
        ],
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'warn',
      },
    },
  ],
  settings: {
    'import/internal-regex': '^(@?src)/',
    'import/extensions': ['.js', '.jsx'],
  },
}
