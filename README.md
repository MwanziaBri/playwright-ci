# OrangeHRM Playwright Test Automation

Automated test suite using Playwright. This project covers happy path testing across authentication, and employee management workflows.

**Test Report:** [View Latest Report](https://briammwanzia.github.io/playwright-ci/latest/)

---

## 📋 Project Overview

- **Framework:** Playwright (TypeScript)
- **Target Application:** OrangeHRM Opensource Demo
- **Test Type:** Happy Path + Critical Workflows
- **Coverage:** Authentication, Employee Management, Dashboard Navigation
- **CI/CD:** GitHub Actions with scheduled runs

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20 or higher
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/MwanziaBri/playwright-ci.git
cd playwright-ci

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps
```

### Run Tests Locally

```bash
# Run all tests
npm test

# Run specific test file
npm test -- tests/auth/auth.spec.ts

# Run tests in UI mode (interactive)
npm run test:ui

# Run tests in debug mode
npm run test:debug

# Run with headed browser (see browser)
npx playwright test --headed
```

---

## 📁 Project Structure

```
playwright-ci/
├── tests/
│   ├── auth/
│   │   ├── auth.setup.ts           # Setup: Login once, reuse session
│   │   └── auth.spec.ts            # Login/logout tests
│   ├── employee/
│   │   └── employee.spec.ts        # Employee list, view, search tests\\
├── screenshots/                     # Test screenshots
├── playwright-report/               # HTML report (generated)
├── auth.json                        # Auth session state (git ignored)
├── playwright.config.ts             # Playwright configuration
├── package.json                     # Dependencies & scripts
└── README.md                        # This file
```

---

## 🧪 Test Suites

### Auth Tests (`tests/auth/auth.spec.ts`)

- ✅ User on login page
- ✅ Invalid login attempt (error handling)
- ✅ Valid login (successful authentication)

**Setup:** `auth.setup.ts` runs first to create authenticated session (`auth.json`)

### Employee Tests (`tests/employee/employee.spec.ts`)

- ✅ Navigate to Employee List
- ✅ View employee details
- ✅ Search employees by name

**Dependencies:** Requires valid session from `auth.setup.ts`

---

## 🔑 Key Features

### Session Reuse with Storage State

Tests reuse the authenticated session to save time:

```typescript
// auth.setup.ts runs ONCE
// Saves auth session to auth.json

// All other tests load auth.json
// No need to login repeatedly
```
### Smart Strategies

Tests wait for page elements, Automatic screenshots on failure + manual captures:

```bash
# Screenshots saved to: screenshots/
# View in test report: playwright-report/index.html
```

---

## ⚙️ Configuration

### playwright.config.ts

Key settings:

```typescript
// Base URL
baseURL: 'https://opensource-demo.orangehrmlive.com'

// Timeouts
timeout: 30000                      // Per test
navigationTimeout: 30000            // Navigation only

// Retries (CI only)
retries: process.env.CI ? 2 : 0

// Parallel workers
workers: process.env.CI ? 1 : undefined

// Screenshots
screenshot: 'only-on-failure'       // Capture on failure
video: 'retain-on-failure'          // Record video on failure
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions

Tests run automatically on:

- **Schedule:** Every 15 minutes (weekdays), Monday 8 AM, 1st of month 2 AM
- **Push:** To `main` or `develop` branches
- **Pull Requests:** Before merge

### View Workflow

1. Go to: **Actions** tab → **Playwright Tests**
2. Click latest run
3. Check status & logs
4. Download test report (Artifacts)
5. View on GitHub Pages

### GitHub Pages Report

**URL:** `https://briammwanzia.github.io/playwright-ci/`

- Latest report: `latest/` 
- Numbered runs: `1/`, `2/`, `3/`, etc.
- Auto-cleanup: Kept for 30 days

---

## 📊 Test Metrics

| Metric | Target |
|--------|--------|
| Test Cases | 10+ |
| Coverage | 70%+ |
| Pass Rate | 95%+ |
| Execution Time | < 5 minutes |
| Platform | Chromium | Firefox

---

## 🛠️ Troubleshooting

### Tests Fail Locally but Pass in CI

**Cause:** Different environment, timing issues  
**Fix:**
```bash
# Clear auth state
rm auth.json

# Re-run setup
npm test -- auth.setup.ts

# Run all tests
npm test
```

### "browser._wrapApiCall: Error reading storage state from auth.json"

**Cause:** `auth.json` doesn't exist yet  
**Fix:**
```bash
# Run setup first
npx playwright test auth.setup.ts

# Then run other tests
npm test
```

### Tests Timeout (30s+)

**Cause:** Slow network or element not loading  
**Fix:**
- Check selectors are correct
- Increase timeout: `test.setTimeout(60000)`
- Check if element exists: `await page.waitForSelector(selector, { timeout: 5000 })`

### Screenshots Not Captured

**Cause:** Test passed (screenshots only on failure by default)  
**Fix:** Add manual screenshot:
```typescript
await page.screenshot({ path: 'screenshots/my-test.png', fullPage: true });
```

### Flaky Tests

**If test passes/fails randomly:**

1. Add better wait strategies
2. Check selectors are specific
3. Log issues: `console.log()` in test for debugging

---

## 📝 Writing New Tests

### Test Template
### Best Practices

✅ **DO:**
- Use `getByRole()` (more accessible)
- Add meaningful test descriptions
- Wait for page load before assertions
- Use specific selectors
- Keep tests independent

❌ **DON'T:**
- Use `page.waitForTimeout()` (hardcoded waits)
- Rely on order of tests
- Use generic selectors like `div`, `span`
- Share state between tests
- Commit large videos/screenshots

---

## 🔗 Useful Links

- **Playwright Docs:** https://playwright.dev/docs/intro
- **Locator Guide:** https://playwright.dev/docs/locators
- **Best Practices:** https://playwright.dev/docs/best-practices
- **OrangeHRM Demo:** https://opensource-demo.orangehrmlive.com/

---

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@playwright/test` | ^1.40.0 | Test framework |
| `playwright` | ^1.40.0 | Browser automation |

---

## 📄 License

This project is for demo purposes only. For usage questions, contact me.

---

**Last Updated:** August 18, 2026  
**Maintained By:** QA Team  
**Status:** Active Development
