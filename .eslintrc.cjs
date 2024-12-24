module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh', 
    '@typescript-eslint', 
    'jsx-a11y',
    'import',
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    
    // Import rules
    'import/order': ['error', {
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index',
      ],
      'newlines-between': 'always',
      alphabetize: { order: 'asc', caseInsensitive: true },
    }],
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
      alias: {
        map: [
          ['@', './src'],
          ['@components', './src/components'],
          ['@shared', './src/components/shared'],
          ['@atoms', './src/components/shared/atoms'],
          ['@molecules', './src/components/shared/molecules'],
          ['@hooks', './src/hooks'],
          ['@utils', './src/utils'],
          ['@types', './src/types'],
          ['@contexts', './src/contexts'],
          ['@styles', './src/styles'],
          ['@config', './src/config'],
          ['@images', './src/images'],
          ['@public', './public'],
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
  },
}
