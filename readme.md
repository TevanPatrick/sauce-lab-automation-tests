### 🎭 Playwright UI Test Automation

This project uses [Microsoft Playwright](https://playwright.dev/) to automate end-to-end (E2E) UI tests for a web application, including login, cart operations, checkout flow, and visual checks.

---

### Project Structure

- `page-objects/`: Page Object Model (POM) classes for reusability
- `tests/`: Playwright test specs
- `.env`: Stores environment variables like credentials and URLs

---

### Getting Started (VS Code)

Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [VS Code](https://code.visualstudio.com/)
- Playwright Test extension (optional)

### Installation

git clone https://github.com/TevanPatrick/sauce-lab-automation-tests
cd your-repo

Install dependencies
npm install

Install Playwright browsers:
npx playwright install

---

### Browsers

1. Chrome
2. Firefox

---

### Set environment variables

Find variables in the .env file located in the main project folder.

---

### Running Tests

**Run all tests**
npx playwright test

**Run in headed mode (for debugging)**
npx playwright test --headed

**Pause on a step**
npx playwright test --debug

**Run a specific test file**
npx playwright test tests/shopping_cart_functionality.spec.js

**Run in Specific Browser**
npx playwright test --project=chromium
npx playwright test --project=firefox

---

### View Traces and Reports

**Generate trace**
npx playwright test --trace on

**Open trace viewer**
npx playwright show-trace trace.zip

**View HTML report**
npx playwright show-report
