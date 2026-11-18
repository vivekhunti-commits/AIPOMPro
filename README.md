# SauceDemo Playwright POM Framework

End-to-end browser tests for [SauceDemo](https://www.saucedemo.com/) using Playwright Test, TypeScript, and the Page Object Model. Tests run independently in Chromium and produce an HTML report with failure artifacts.

## Technology

- Node.js 20 or newer
- Playwright Test
- TypeScript
- Chromium
- Playwright HTML reporter

## Project Structure

```text
.
├── fixtures/testFixtures.ts       # Per-test page object initialization
├── pages/                          # Page-specific locators and actions
├── test-data/testData.ts           # Shared credentials, products, and checkout data
├── tests/                          # Login, products, cart, checkout, and E2E specs
├── utils/testHelpers.ts            # Small shared formatting and parsing helpers
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

Playwright writes HTML output to `playwright-report/` and test artifacts to `test-results/`; both directories are ignored by Git.

## Installation

```bash
npm install
npx playwright install chromium
```

## Run Tests

```bash
npm test                              # Run the complete suite
npm run test:chromium                 # Run the Chromium project
npm run test:headed                   # Show the browser
npm run test:debug                    # Open the Playwright debugger
npm run test:ui                       # Open Playwright UI mode
npm run typecheck                     # Check TypeScript without emitting files
```

Run an individual spec with Playwright's CLI:

```bash
npx playwright test tests/login.spec.ts
npx playwright test tests/end-to-end-order.spec.ts
npx playwright test tests/apiTestmode.spec.ts
```

The Authors API tests accept an optional `FAKE_REST_API_KEY` environment variable for the `api-key` header.

The Books API tests use the `LIBRARY_API_KEY` environment variable for authenticated requests. On Windows PowerShell, set it before running the API spec:

```powershell
$env:LIBRARY_API_KEY = "your-api-key"
npx playwright test tests/apiTestmode.spec.js
```

The authenticated cases are skipped when the variable is unset; the invalid-key case can run independently.

After a test run, open the report with:

```bash
npm run report
```

The report is generated at the end of each run and opens only when requested. Screenshots and videos are retained on failure; traces are recorded on the first retry.

## Architecture

Each page object extends `BasePage` and owns that page's locators and user actions. Tests compose these objects through fixtures in `fixtures/testFixtures.ts`; assertions remain in specs and use Playwright's web-first `expect` API. Shared credentials, product data, and checkout information live in `test-data/testData.ts` rather than page objects or individual specs.

## Extending the Framework

To add a page, create a class in `pages/` with a `Page`-backed constructor via `BasePage`, then expose it through `PageFixtures` and the fixture definition in `fixtures/testFixtures.ts`. Keep locators and page actions in that class; put expectations in tests.

To add a scenario, create or extend a spec under `tests/`, import `test` and `expect` from `fixtures/testFixtures.ts`, and use the shared page objects. Add reusable credentials or business data to `test-data/testData.ts`. Keep tests independent by signing in and establishing required cart state within each test or its `beforeEach` hook.