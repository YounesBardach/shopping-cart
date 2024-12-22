# Installs

npm create vite@latest . -- --template react-ts
npm install
npm install modern-normalize
npm install vitest --save-dev
npm install jsdom --save-dev
npm install @testing-library/react @testing-library/jest-dom @testing-library/user-event --save-dev
npm install vite-tsconfig-paths --save-dev
npm install typescript @types/react @types/react-dom --save-dev
npm install @eslint/js typescript-eslint --save-dev
npm install @typescript-eslint/eslint-plugin --save-dev
npm install @typescript-eslint/parser --save-dev
npm install react-router-dom
npm install prettier eslint --save-dev
npm install eslint-plugin-prettier eslint-config-prettier --save-dev

# Configs

- package.json: defines the project's metadata, dependencies, and scripts.
- package-lock.json: locks the exact versions of all dependencies (direct and transitive) installed in your project to ensure consistent builds.
- .gitignore: used by Git to specify which files and directories should be ignored when tracking changes in a repository.
- eslint.config.js: eslint configuration file that controls how ESLint analyzes and enforces rules on your code.
- tsconfig.json: main Typescript configuration file.
- tsconfig.app.json: Typescript configuration file for browser environment
- #tsconfig.node.json: Typescript configuration file for node environment
- vite-env.d.ts: TypeScript declaration file that helps your project understand and properly type Vite-specific features and constructs.
- vite.config.ts: Vite config file
- setup.ts: configure and initialize things before the tests run.
- .vscode/settings.json: configure workspace-specific settings in Visual Studio Code (VS Code).
