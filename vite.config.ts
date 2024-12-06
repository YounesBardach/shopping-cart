import { defineConfig } from "vite"; // Imports the `defineConfig` function from Vite, which is used to define Vite's configuration in a type-safe manner.
import react from "@vitejs/plugin-react"; // Imports the Vite plugin for React, which enables features like fast refresh and JSX transformation in Vite.
import viteTsconfigPaths from "vite-tsconfig-paths"; // Imports a Vite plugin that automatically resolves TypeScript paths defined in the `tsconfig.json` file.

// https://vite.dev/config/  // Link to the Vite configuration documentation for reference.
export default defineConfig(() => ({
  plugins: [react(), viteTsconfigPaths()], // Specifies the plugins to be used by Vite: React plugin and the plugin for TypeScript path resolution.
  test: {
    // Configuration for testing (likely using Vitest or other test runners in Vite).
    globals: true, // Enables global test functions (like `describe`, `it`, `expect`) to be available without imports.
    environment: "jsdom", // Specifies the environment for testing (in this case, simulating a browser environment using JSDOM).
    setupFiles: "./src/tests/setup.ts", // Specifies the path to the setup file that will be run before tests, typically used for global configurations or test setups.
  },
}));
