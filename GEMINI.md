<!--
Copyright 2025 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->
# Gemini Project Overview: sales-data

This project is a Google Apps Script application developed locally using TypeScript. It utilizes modern web development tools like Rollup for bundling, Jest for unit testing, and `clasp` for managing and deploying the script to the Google Apps Script environment.

## Tech Stack

- **Language:** TypeScript
- **Platform:** Google Apps Script (V8 Runtime)
- **Bundler:** Rollup
- **Testing Framework:** Jest with `ts-jest`
- **Deployment Tool:** `@google/clasp`
- **Inventory Management:** Custom logic for low inventory alerts and custom spreadsheet menus.
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

## Sheet Name

sales_data

## Sheet Structure

A = Date
B = Store ID
C = Product ID
D = Category
E = Region
F = Inventory Level
G = Units Sold
H = Units Ordered
I = Price
J = Discount
K = Weather Condition
L = Promotion
M = Competitor Pricing
N = Seasonality
O = Epidemic
P = Demand

## Development Workflow

### Inventory Alert System

The project includes an inventory monitoring system that:
1.  Adds an **Inventory Tools** menu to the Google Sheet.
2.  Provides a **Check Inventory Levels** function that:
    -   Scans the sheet for headers: "Inventory Level", "Store ID", "Product ID", "Category", and "Product Name".
    -   Identifies items where "Inventory Level" is below 50.
    -   Sends a summary email to the active user (can be customized in `src/inventory.ts`).

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
