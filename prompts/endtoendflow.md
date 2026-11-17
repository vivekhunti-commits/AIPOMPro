Role: Senior Automation Test Architect

Act as a Senior QA Automation Engineer with expertise in Playwright, TypeScript, automation framework architecture, and Page Object Model (POM) design patterns.

I want you to build a robust, scalable, reusable, and maintainable end-to-end test automation framework for the sample application:

Application URL: https://www.saucedemo.com/

Technology Stack:

Playwright
TypeScript
Node.js
Page Object Model (POM) design pattern
Playwright Test Runner
HTML Reporting
1. First, Analyze the Existing Project

Before writing any code:

Analyze the existing VS Code workspace and project structure.
Check whether Playwright and TypeScript are already configured.
Identify existing dependencies, configuration files, test scripts, and utilities.
Reuse existing configurations wherever possible.
Do not overwrite existing files unnecessarily.
If the project is empty or missing required configurations, initialize the framework with the necessary dependencies and configurations.

Explain the proposed folder structure before implementing it.

2. Framework Architecture

Implement a clean Page Object Model architecture with the following recommended folder structure:

text
Playwright-POM-Framework/
│
├── tests/
│   ├── login.spec.ts
│   ├── products.spec.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   └── end-to-end-order.spec.ts
│
├── pages/
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── OrderConfirmationPage.ts
│
├── fixtures/
│   └── testFixtures.ts
│
├── test-data/
│   └── testData.ts
│
├── utils/
│   └── testHelpers.ts
│
├── playwright-report/
│
├── test-results/
│
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md


You can adjust the structure if you identify a better approach, but maintain proper separation between test scripts, page objects, test data, fixtures, and utilities.

3. Page Object Model Implementation

Create separate Page Object classes for each application page.

BasePage.ts
Implement common reusable methods.
Navigation methods.
Common element interaction methods where appropriate.
Common assertion helpers where appropriate.
Avoid unnecessary abstractions.
LoginPage.ts

Application: https://www.saucedemo.com/

Implement:

Username locator.
Password locator.
Login button locator.
Error message locator.
Login functionality.
Invalid login validation.
Empty username/password validation.
ProductsPage.ts

Implement:

Products page title.
Product listing.
Product names and prices.
Add to Cart functionality.
Remove from Cart functionality.
Shopping cart icon.
Product sorting functionality.
Product count validation.
CartPage.ts

Implement:

Cart page title.
Cart items.
Item quantity.
Item price.
Remove item functionality.
Continue Shopping functionality.
Checkout functionality.
CheckoutPage.ts

Implement:

First Name field.
Last Name field.
Postal Code field.
Continue button.
Checkout overview.
Item total.
Tax calculation.
Grand total.
Finish button.
Checkout validation messages.
OrderConfirmationPage.ts

Implement:

Successful order confirmation.
Confirmation heading.
Order completion message.
Back Home button.

All page objects should:

Use TypeScript.
Use appropriate locators such as getByRole(), getByLabel(), getByText(), and locator().
Prefer resilient locators over XPath and hardcoded CSS selectors.
Encapsulate page-specific actions and locators.
Avoid duplicating code.
Use meaningful method and variable names.
4. Test Scenarios to Automate

Create independent test scripts covering the following scenarios.

A. Login Tests – login.spec.ts
Verify successful login with valid credentials.
Verify login failure with invalid username.
Verify login failure with invalid password.
Verify login failure with empty username.
Verify login failure with empty password.
Verify error message for locked-out user.
Verify successful navigation to the Products page after login.

Use the following SauceDemo test credentials:

Standard User: standard_user
Locked Out User: locked_out_user
Problem User: problem_user
Performance Glitch User: performance_glitch_user
Password: secret_sauce
B. Products Tests – products.spec.ts
Verify products are displayed after successful login.
Verify product names and prices.
Add a single product to the cart.
Add multiple products to the cart.
Remove a product from the cart.
Verify shopping cart badge count.
Verify sorting by Name (A to Z).
Verify sorting by Name (Z to A).
Verify sorting by Price (Low to High).
Verify sorting by Price (High to Low).
C. Shopping Cart Tests – cart.spec.ts
Verify added products appear in the cart.
Verify product names and prices.
Verify product quantity.
Remove products from the cart.
Verify cart count after removing products.
Navigate back to products.
Proceed to checkout.
D. Checkout Tests – checkout.spec.ts
Verify checkout information page.
Complete checkout information using valid data.
Validate mandatory field errors.
Verify checkout overview.
Verify item total calculation.
Verify tax calculation.
Verify total amount.
Finish checkout.
E. Complete End-to-End Order Flow – end-to-end-order.spec.ts

Create one complete business-critical end-to-end test:

Scenario: Login to Successful Order Placement

Navigate to SauceDemo.
Login using standard_user credentials.
Verify successful login.
Verify Products page is displayed.
Add two or more products to the cart.
Verify cart badge count.
Open the shopping cart.
Verify selected products.
Click Checkout.
Enter First Name, Last Name, and Postal Code.
Click Continue.
Verify Checkout Overview.
Validate product names and prices.
Validate item total.
Validate tax.
Validate grand total.
Click Finish.
Verify successful order placement.
Verify confirmation heading: "Thank you for your order!"
Verify order completion message.
Click Back Home.
Verify navigation back to Products page.

This test must validate the complete user journey from login to successful order placement.

5. Test Framework Best Practices

Follow these standards:

Use Page Object Model consistently.
Use Playwright's built-in expect assertions.
Use async/await properly.
Avoid fixed wait statements such as page.waitForTimeout().
Use auto-waiting and web-first assertions.
Use meaningful test descriptions.
Use beforeEach and afterEach hooks where appropriate.
Use reusable fixtures for page object initialization.
Keep test data separate from test implementation.
Avoid hardcoding test data inside page object classes.
Use proper TypeScript interfaces and types where useful.
Avoid unnecessary code duplication.
Keep each test independent.
Ensure proper test isolation.
Do not use unnecessary inheritance or over-engineering.
Do not put test assertions inside page objects unless there is a strong architectural reason.
Use descriptive error messages for important assertions.
6. Playwright Configuration

Configure playwright.config.ts with:

Test directory: ./tests
Base URL: https://www.saucedemo.com/
Browser: Chromium by default.
Headless execution enabled by default.
Screenshot on test failure.
Trace on first retry.
Video on failure.
HTML reporter.
Appropriate timeout settings.
Retry configuration.
Parallel test execution.

Keep configuration easy to modify.

7. Test Data Management

Create a centralized test data file.

Include:

Valid login credentials.
Invalid login credentials.
Locked-out user credentials.
Checkout user information.
Product names used in tests.

Do not duplicate credentials across multiple test files.

8. Reporting and Execution

Configure scripts in package.json:

npm test – Run all tests.
npm run test:headed – Run tests in headed mode.
npm run test:debug – Run tests in debug mode.
npm run test:ui – Run Playwright UI mode.
npm run test:chromium – Run tests in Chromium.
npm run report – Open HTML report.

Ensure the HTML report is generated after execution.

9. README Documentation

Create a detailed README.md containing:

Framework overview.
Technology stack.
Project folder structure.
Installation instructions.
Playwright browser installation.
How to execute all tests.
How to execute individual test files.
How to run tests in headed mode.
How to debug tests.
How to generate and view HTML reports.
How to add a new Page Object.
How to add new test scenarios.
How to maintain test data.
10. Code Quality and Validation

After implementing the framework:

Review all generated files.
Verify TypeScript compilation.
Verify all imports and exports.
Verify page object constructors and fixture initialization.
Verify locators against the actual SauceDemo application.
Check that test scripts follow POM architecture.
Remove unused imports and unnecessary code.
Execute the test suite.
Fix any failures caused by implementation issues.
Ensure the final framework is executable.

Do not simply generate sample code or placeholders. Implement working test scripts.

If a test fails because of an application issue or an application-specific user behavior, investigate and report it rather than hiding the failure or weakening the assertion.

11. Final Deliverables

Once implementation is complete, provide:

Final project folder structure.
List of files created or modified.
Explanation of the POM architecture.
List of automated test scenarios.
Installation and execution commands.
Test execution results.
Any known limitations or remaining issues.
Important Instructions
Work directly in the existing VS Code workspace.
Use GitHub Copilot Agent capabilities to create and modify files.
Do not just explain how to build the framework; actually implement it.
Follow industry-standard Playwright TypeScript automation practices.
Prioritize clean, reusable, readable, and maintainable code.
Do not skip validation or test execution.
Make implementation decisions independently when requirements are clear.
If something is ambiguous, inspect the application and existing project before making assumptions.

Start by analyzing the existing project, propose the implementation structure, and then proceed with the complete framework implementation.