import globals from 'globals';
import js from '@eslint/js';
import typescriptLint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['node_modules/**/*', '**/dist/**/*'],
  },
  js.configs.recommended,
  ...typescriptLint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  // Disable a set of rules that may conflict with prettier
  // You can safely remove this if you don't use prettier
  eslintConfigPrettier,
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    ...reactPlugin.configs.flat.recommended,
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['packages/preload/**'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },
  {
    files: ['packages/main/**', 'scripts/**', '*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['packages/renderer/**'],
    languageOptions: {
      globals: {
        ...Object.fromEntries(Object.entries(globals.node).map(([key]) => [key, 'off'])),
        ...globals.browser,
      },
    },
  },

  {
    files: ['**/tests/**'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.jest,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },

  {
    files: ['**/vite.config.*'],
    languageOptions: {
      globals: {
        ...Object.fromEntries(Object.entries(globals.browser).map(([key]) => [key, 'off'])),
        ...globals.node,
      },
    },
  },
];
