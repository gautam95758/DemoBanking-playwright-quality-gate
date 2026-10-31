# Build a Playwright Quality Gate for a Financial Web Application

## Goal

Create a deterministic, local-only fictional banking application and demonstrate a maintainable Playwright quality gate for critical UI, API, authorization, and UI/API consistency behavior.

## Starting materials

An empty project workspace and the requested workflow requirements. All demo records and credentials are synthetic.

## Main workflow steps

1. Implement the Express server, local banking UI, and deterministic JSON fixtures.
2. Add typed API clients, page objects, and reusable Playwright fixtures.
3. Cover health, authentication, account, transaction, dashboard, login, and logout behavior.
4. Compare API account balances with dashboard-rendered values.
5. Execute the test suites, inspect the HTML report, and document outcomes and limitations.

## Expected deliverables

Runnable Node/Express app; Playwright TypeScript UI/API suites; centralized test data; HTML reporting configuration; architecture, strategy, API, demonstration, and regression-summary documentation.

## Applications used

Node.js, npm, Express, Playwright Test, TypeScript, Chromium, and a compatible code editor.

## Constraints

Local execution only; no external financial services or real customer data. Mock authentication is intentionally not production security. A proposal is not an approval or a claim that execution has occurred.