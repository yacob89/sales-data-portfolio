# Gemini Project Overview: sales-data

This project is a Google Apps Script application developed locally using TypeScript. It utilizes modern web development tools like Rollup for bundling, Jest for unit testing, and `clasp` for managing and deploying the script to the Google Apps Script environment.

## Tech Stack

- **Language:** TypeScript
- **Platform:** Google Apps Script (V8 Runtime)
- **Bundler:** Rollup
- **Testing Framework:** Jest with `ts-jest`
- **Deployment Tool:** `@google/clasp`
- **Linting & Formatting:** ESLint, Prettier
- **License Management:** `license-check-and-add`, `rollup-plugin-license`

## Project Structure

```text
/
├── .clasp-dev.json       # Clasp configuration for development environment
├── .clasp-prod.json      # Clasp configuration for production environment
├── appsscript.json       # Apps Script manifest file
├── jest.config.json      # Jest testing configuration
├── rollup.config.mjs     # Rollup bundling configuration
├── tsconfig.json         # TypeScript configuration
├── src/                  # Source code (TypeScript)
│   ├── index.ts          # Entry point
│   └── example-module.ts # Example module
└── test/                 # Unit tests
    └── example-module.test.ts
```

## Development Workflow

### Common Commands

- **Build the project:**
  ```bash
  npm run build
  ```
  This cleans the `build` and `dist` directories, bundles the TypeScript code using Rollup, and copies the `appsscript.json` to the `dist` folder.

- **Run tests:**
  ```bash
  npm test
  ```
  Executes unit tests using Jest.

- **Lint and format code:**
  ```bash
  npm run lint
  ```
  Runs ESLint with auto-fix and ensures license headers are present.

- **Deploy to Development:**
  ```bash
  npm run deploy
  ```
  Lints, tests, builds, and then pushes the code to the development Apps Script project using `clasp`. It temporarily swaps in `.clasp-dev.json`.

- **Deploy to Production:**
  ```bash
  npm run deploy:prod
  ```
  Lints, tests, builds, and then pushes the code to the production Apps Script project using `clasp`. It temporarily swaps in `.clasp-prod.json`.

## Key Conventions

- **Module System:** The project uses ES modules in the source code, which are bundled into a format compatible with the Apps Script V8 runtime.
- **License Headers:** All source and test files must include the Apache-2.0 license header. This is enforced by `npm run license`.
- **Apps Script Environment:** Since the code runs in the Apps Script environment, global variables like `SpreadsheetApp`, `DriveApp`, etc., are available. Type definitions are provided by `@types/google-apps-script`.
- **Clasp Environments:** The project uses separate Clasp configuration files for development and production, which are swapped during the deployment process.
