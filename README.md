# Northstar Demo Banking - Playwright Quality Gate

A local fictional banking dashboard and an executable Playwright quality gate. The Express application and all demo data run on the developer machine; no bank, payment service, or production system is contacted.

## Technology

Node.js 20+, Express 5, HTML/CSS/vanilla JavaScript, Playwright Test, and TypeScript. The browser test project uses Chromium and the built-in HTML reporter.

## Prerequisites and setup

Install Node.js 20 or newer, then from the project root run:

```sh
npm install
npx playwright install chromium
```

Playwright starts `npm start` before a test run and reuses an existing local server outside CI. To run the application by itself:

```sh
npm start
```

Open <http://127.0.0.1:4173>. The API health check is at <http://127.0.0.1:4173/api/health>.

## Demo credentials

Username: `alex`  
Password: `DemoPass123!`

All customer, account, and transaction records are fictional. The predictable demo credential is intentionally not a secure password store.

## Run the quality gate

```sh
npm test
npm run test:ui
npm run test:api
npm run test:headed
npm run test:debug
npm run report
```

The HTML report is generated at `playwright-report/index.html`. Test results, traces, and failure media are written under `test-results/`.

## Project structure

```text
src/app/                 Express API and static browser application
src/app/data/            Shared synthetic data loader
src/app/public/          Login and dashboard UI
test-data/               Central JSON fixture data
tests/api/               Health, authentication, accounts, transactions
tests/ui/                Login, dashboard, account, transaction, logout, consistency
tests/clients/           Reusable API request clients
tests/fixtures/          Shared page/API and signed-in fixtures
tests/pages/             Login, dashboard, and transaction page objects
tests/types/             API request/response TypeScript types
tests/helpers/           Shared typed test data
docs/                    Architecture, strategy, API, and demo documentation
```

## Known limitations

This is a test demonstration, not production banking software. Authentication uses a random in-memory session token and a single hard-coded synthetic user; sessions disappear when the server restarts. Data is static and in memory. There is no database, CSRF protection, rate limiting, real account access, or production-grade identity/security model. Account numbers are masked and balances/transactions are fictional. The page uses system fonts and makes no runtime external asset requests.

## GitHub Actions CI pipeline

The workflow at `.github/workflows/playwright.yml` runs the complete Playwright quality gate on pushes, pull requests, and manual dispatch. It installs Node.js dependencies and Chromium, runs UI and API tests, and uploads the HTML report and test artifacts even if tests fail.

To enable it:
1. Push this project to a GitHub repository.
2. Ensure the repository's default branch is `main` (or update the workflow branch filters).
3. Open the **Actions** tab and enable workflows if prompted.
4. Push a commit or open a pull request to trigger the pipeline.
5. Open the workflow run and download the `playwright-report` artifact to inspect results.

The workflow currently uses `npm install` so it can run before a lockfile has been generated. For reproducible CI, run `npm install` locally, commit the generated `package-lock.json`, then change the workflow install step to `npm ci`.
