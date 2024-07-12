module.exports = {
  plugins: ['unused-imports', 'prettier', 'react', '@typescript-eslint', 'import', '@emotion'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-user-var': ['off'],
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-explicit-any': ['error'],
    'unused-imports/no-unused-imports': 'error',
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    '@emotion/jsx-import': 'error',
    '@emotion/pkg-renaming': 'error',
    'import/order': [
      'error',
      {
        'newlines-between': 'always-and-inside-groups',
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
          orderImportKind: 'ignore',
        },
      },
    ],
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'react/self-closing-comp': 'error',
  },
  ignorePatterns: ['node_modules', 'dist', '**/*.cjs', '*.md'],
};
