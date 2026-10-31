# Demonstration Guide

This is a practical outline for a Quality Engineer presenting the project. It does not represent a completed recording.

1. **Introduction:** State that Northstar is fictional and the quality gate exercises a local demo, not a financial service.
2. **Application overview:** Start `npm start`, open the app, and show the synthetic demo hint and login.
3. **Framework architecture:** Walk through Express, shared test-data JSON, the Playwright configuration, and the API/UI split.
4. **Page objects and fixtures:** Show the login/dashboard/transaction page objects and the `signedIn` fixture.
5. **UI automation:** Run `npm run test:ui`; point out validation, masked account values, transactions, and logout coverage.
6. **API automation:** Run `npm run test:api`; review response contracts, unauthorized access, and unknown-account behavior.
7. **UI/API consistency:** Highlight the test that compares account data retrieved through the API with displayed dashboard balances.
8. **Full regression:** Run `npm test` and explain the local server lifecycle and Chromium project.
9. **HTML report:** Run `npm run report`; inspect suite status, durations, and failure artifacts if present.
10. **Conclusion:** Summarize the coverage and call out the mock auth, in-memory state, and synthetic-data limitations.