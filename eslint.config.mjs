import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginCypress from 'eslint-plugin-cypress/flat';
import pluginChaiFriendly from 'eslint-plugin-chai-friendly';
import mochaPlugin from 'eslint-plugin-mocha';

export default [
  {
    ignores: ['node_modules', 'app', 'eslint.config.mjs'],
  },
  {
    files: ['**/*.js'],
    plugins: {
      prettier: eslintPluginPrettierRecommended,
    },
    ...eslint.configs.recommended,
    rules: {
      'import/prefer-default-export': 'off',
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'no-console': 'error',
      'class-methods-use-this': 'off',
      'max-classes-per-file': 'off',
      'no-useless-constructor': 'off',
      'no-empty-function': 'off',
      'func-names': 'off',
      'import/no-extraneous-dependencies': 'off',
      'no-empty-pattern': 'off',
      'no-mixed-spaces-and-tabs': 'error',
      'no-unused-vars': 'error',
      'no-unused-expressions': 'error',
    },
  },
  // Cypress ESlint config
  {
    plugins: {
      cypress: pluginCypress,
    },
    rules: {
      'cypress/unsafe-to-chain-command': 'error',
      'cypress/no-unnecessary-waiting': 'error',
    },
  },
  // Plugin Chai-friendly ESlint config
  {
    plugins: { 'chai-friendly': pluginChaiFriendly },
    rules: {
      'no-unused-expressions': 'error',
      'chai-friendly/no-unused-expressions': 'error',
    },
  },
  {
    plugins: {
      mocha: mochaPlugin,
    },
    rules: {
      'mocha/no-hooks-for-single-case': 'error',
      'mocha/no-mocha-arrows': 'off',
      'mocha/max-top-level-suites': 'error',
      'mocha/no-skipped-tests': 'error',
      'mocha/no-exclusive-tests': 'error',
      'mocha/no-setup-in-describe': 'error',
    },
  },
];
