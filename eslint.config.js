// @ts-check
// Enables TypeScript checking in this JavaScript file. It helps with type checking, linting, and editor integrations like VS Code.

import eslint from "@eslint/js";
// Imports the recommended ESLint configuration for JavaScript. This provides a base set of rules that ESLint recommends for JavaScript files.

import tseslint from "typescript-eslint";
// Imports TypeScript-specific ESLint configuration and plugin. This ensures ESLint can handle and lint TypeScript files (.ts and .tsx).

import eslintConfigPrettier from "eslint-config-prettier";
// Imports the ESLint configuration to disable formatting rules that conflict with Prettier. This ensures that Prettier handles all code formatting instead of ESLint.

import reactRefresh from "eslint-plugin-react-refresh";
// Imports the React Refresh ESLint plugin. Useful when working with Vite and React Fast Refresh.

import globals from "globals";
// Imports predefined global variables for various environments from the 'globals' package.

import reactHooks from "eslint-plugin-react-hooks";
// Imports the 'eslint-plugin-react-hooks' package to enforce best practices for React hooks.

export default [
  // ESLint JavaScript configuration: Applies ESLint's recommended configuration for JavaScript files.
  eslint.configs.recommended,

  // TypeScript ESLint configuration: Applies TypeScript-specific recommended ESLint rules to handle TypeScript files (.ts, .tsx).
  ...tseslint.configs.recommended,

  // Prettier ESLint configuration: Disables ESLint formatting rules that conflict with Prettier so that Prettier handles all code formatting.
  eslintConfigPrettier,

  // React Refresh configuration: Useful when using Vite for React projects to enable fast refresh.
  reactRefresh.configs.vite,

  // React hooks rules configuration: Enforces best practices for React hooks.
  {
    files: ["src/**/*.{js,ts,jsx,tsx}"],
    // Specifies the files to which these rules apply (JavaScript, TypeScript, JSX, TSX)

    plugins: {
      "react-hooks": reactHooks,
      // Enables the 'react-hooks' plugin for linting React hooks (e.g., useEffect, useState)
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      // Disables the 'react-in-jsx-scope' rule (no need for React in scope in React 17+)

      "react/prop-types": "off",
      // Disables the 'react/prop-types' rule (not necessary if using TypeScript, which handles type-checking)

      ...reactHooks.configs.recommended.rules,
      // Applies the recommended set of rules for React hooks, such as ensuring hooks are called in valid contexts.
    },
  },

  // Global configuration for browser environment: Declares global variables for the browser (e.g., window, document).
  { languageOptions: { globals: globals.browser } },

  // Files and directories to ignore during linting (e.g., build directories like dist).
  {
    ignores: ["dist/*"],
    // Ignores all files inside the 'dist' directory from being linted.
  },
];
