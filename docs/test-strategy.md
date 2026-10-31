# Test Strategy

## Objectives and scope

The quality gate protects the local fictional customer's main read-only banking experience: service availability, login validation, session termination, account and transaction contracts, access control, and agreement between displayed balances and API values.

**In scope:** health readiness, valid and invalid login, empty input, password masking, dashboard summary, multiple masked accounts, transaction details/types, account and transaction API responses, 404/401 handling, logout invalidation, and a UI/API account-balance consistency check.

**Out of scope:** real banking integrations, payment execution, persistent storage, third-party identity, performance certification, penetration testing, regulatory compliance, and real customer data.

## Approach

- UI tests use Chromium, accessible locators, page objects, fixtures, and Playwright's auto-waiting assertions.
- API tests use isolated Playwright `APIRequestContext` instances and reusable clients. Contract checks cover response shape, values, statuses, and authorization.
- Static shared JSON records provide deterministic data. Tests do not depend on order; server sessions are isolated by unique login tokens.
- Run `npm test` for a regression gate. Use `npm run test:ui` or `npm run test:api` to diagnose a layer. Review traces, screenshots, and the HTML report for failures.

## Entry and exit criteria

**Entry:** dependencies are installed, Chromium is installed, and the local port is available or its existing server is the intended demo app.

**Exit:** all required checks complete with no unexplained failures; authorization checks reject missing/invalid tokens; UI/API consistency holds; the report is generated and reviewed. Record any accepted failure or environment limitation in the regression summary rather than treating it as a pass.

## Risks

The mock authentication model does not model production security. In-memory sessions reset on restart. The UI/API share fixtures, so tests prove application consistency against the contract, not independent correctness of business data. Chromium-only coverage does not establish cross-browser behavior. Tests require local Node dependencies and a browser binary.