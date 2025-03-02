import tsEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname
      },
      globals: {
        ...globals.node,
        ...globals.es2022
      }
    },
    plugins: {
      '@typescript-eslint': tsEslint
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      
      // Base ESLint rules
      'no-console': 'warn',
      'no-debugger': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': 'error',
      
      // New ESLint 9.x rules
      'no-constant-binary-expression': 'error',
      'prefer-object-has-own': 'error',
      'logical-assignment-operators': 'error'
    },
    settings: {
      'import/resolver': {
        typescript: {}
      }
    }
  },
  {
    ignores: [
      '**/node_modules/',
      'dist/',
      'tests/',
      'coverage/',
      '*.d.ts',
      '*.config.js',
      '*.config.ts',
      '*.config.mjs',
    ]
  }
];