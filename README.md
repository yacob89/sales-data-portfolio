# 🚀 Sales Data & Automated Inventory Engine
### Enterprise-Grade Google Apps Script & TypeScript Workflow

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-V8%20Runtime-4285F4.svg)](https://developers.google.com/apps-script)
[![Bundler](https://img.shields.io/badge/Bundled%20With-Rollup-ff3e00.svg)](https://rollupjs.org/)
[![Testing](https://img.shields.io/badge/Tested%20With-Jest-C21325.svg)](https://jestjs.io/)
[![License](https://img.shields.io/badge/License-Apache%202.0-green.svg)](LICENSE)

---

## 📖 The Story: Modernizing Enterprise Google Workspace Automation

Every growing retail and e-commerce business relies heavily on spreadsheets to manage inventory levels, region demand, and daily sales metrics. But as data scales across stores, categories, and inventory items, standard web scripts often fail: manual monitoring causes costly stockouts, unhandled dynamic headers lead to silent runtime crashes, and unbundled Apps Script code quickly turns into unmaintainable legacy code.

**This project reimagines Google Workspace automation as a modern, software engineering discipline.** 

Instead of relying on fragile, uncompiled scripts edited directly in the browser, this portfolio application treats Google Apps Script as a compiled, fully typed deployment target. Built with TypeScript, bundled using Rollup, and tested with Jest, it delivers real-time inventory monitoring, custom spreadsheet menus, and automated email alerts wrapped in an automated multi-environment deployment pipeline (`clasp`).

---

## ✨ Key Features & Business Impact

- ⚡ **Automated Low-Inventory Monitoring**: Real-time scanner checking stock levels across stores and categories, sending formatted email notifications when threshold limits are breached.
- 🎨 **Dynamic Custom Menus**: Injects custom Google Sheet native menus (`Inventory Tools`) seamlessly on file load for one-click manual triggers.
- 🛡️ **Defensive Header Mapping**: Dynamic column discovery tolerates changing column order across datasets (e.g. `Product Name` vs `Product`).
- 🔄 **Multi-Environment Pipeline**: Seamless deployment across `Development` and `Production` Apps Script projects with auto-swapping `clasp` configurations.
- 🧪 **Zero-Breakage CI Workflow**: Strict unit testing via Jest and static linting via ESLint/Prettier to block bad code from reaching production sheets.

---

## 🏗️ Technical Stack

- **Core Language**: TypeScript 5.x compiled targeting Google Apps Script V8 Engine.
- **Bundling & Optimization**: Rollup with custom global scope exposure plugins.
- **Deployment & Orchestration**: `@google/clasp` for multi-stage deployments.
- **Testing & Quality Assurance**: Jest + `ts-jest`, ESLint, Prettier, and Apache License header checks.

---

## 📁 Project Architecture

```text
sales-data-portfolio/
├── src/
│   ├── index.ts           # Global entry point & Apps Script menu initialization
│   ├── inventory.ts       # Core logic for inventory monitoring & automated mailer
│   └── example-module.ts  # Modular helper routines
├── test/                  # Unit test suite powered by Jest
├── .clasp-dev.json        # Staging / Development deployment target
├── .clasp-prod.json       # Live Production deployment target
├── appsscript.json        # Apps Script manifest settings
└── rollup.config.mjs      # Production bundle settings (ESM -> Apps Script standard)
```

---

## 📊 Sheet Data Schema

The workflow is tailored to process rich multi-dimensional retail records formatted as follows:

| Column | Name | Description |
| :--- | :--- | :--- |
| **A - E** | `Date`, `Store ID`, `Product ID`, `Category`, `Region` | Core transactional metadata |
| **F** | `Inventory Level` | Tracked for low-stock automated alerts (< 50 units) |
| **G - I** | `Units Sold`, `Units Ordered`, `Price` | Financial and movement performance |
| **J - P** | `Discount`, `Weather`, `Promotion`, `Epidemic`, `Demand` | External demand factors |

---

## 🛠️ Developer Guide & Operations

### Installation
```bash
npm install
```

### Build & Bundle
Bundles TypeScript source files into a clean `dist/` build output optimized for Apps Script V8 execution:
```bash
npm run build
```

### Run Unit Tests
```bash
npm test
```

### Multi-Stage Deployment
Deploy seamlessly to **Development** or **Production** instances:
```bash
# Deploys to Staging / Development Apps Script Project
npm run deploy

# Deploys directly to Production Apps Script Project
npm run deploy:prod
```

---
