import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import hooksPlugin from 'eslint-plugin-react-hooks';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import tailwind from 'eslint-plugin-tailwindcss';
import globals from 'globals';
import tsEslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

const compat = new FlatCompat();

export default [
  { settings: { react: { version: 'detect' } } },
  prettier,
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  // Tailwind
  ...tailwind.configs['flat/recommended'],
  // Typescript
  ...tsEslint.configs.recommended,
  // React
  ...fixupConfigRules(pluginReactConfig),
  {
    plugins: {
      'react-hooks': hooksPlugin,
      prettier: prettier,
    },
    rules: hooksPlugin.configs.recommended.rules,
  },
  // NextJS
  {
    ignores: ['.next/'],
  },
  ...fixupConfigRules(compat.extends('plugin:@next/next/core-web-vitals')),
  // Rules config
  {
    rules: {
      'react/react-in-jsx-scope': 0,
      'react/no-unescaped-entities': 0,
      'react/prop-types': 0,
      '@next/next/no-img-element': 0,
    },
  },
  // Ignore files
  {
    ignores: [
      'tailwind.config.ts',
      'next.config.js',
      '*.js',
      '*.d.ts',
      'src/components/ui/*',
    ],
  },
];
