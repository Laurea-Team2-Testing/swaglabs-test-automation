# Swag Labs test automation

Functional test automation for the Swag Labs demo web shop (https://www.saucedemo.com) using **Robot Framework** and **Playwright with TypeScript**.
Team 2 project for the Fundamentals of Functional Testing course (TO00CD53-3002) at Laurea University of Applied Sciences.

Team: Johnny Kuoppala, Lisa Shakya

The test plan, test execution log and defect log are stored in Microsoft Teams: Functional Testing Team 2 → General channel → Shared files.

## Repository structure

```
swaglabs-test-automation/
├── robot/                      Robot Framework (Browser library)
│   ├── requirements.txt        Python packages
│   ├── resources/
│   │   ├── variables.resource  Shared test data (URL, users, password)
│   │   └── common.resource     Shared keywords
│   └── tests/                  Test suites (.robot)
└── playwright/                 Playwright + TypeScript
    ├── package.json
    ├── playwright.config.ts
    ├── pages/                  Page objects
    ├── test-data/              Shared test data
    └── tests/                  Test files (.spec.ts)
```

## Test files and owners

Every automated test case is implemented in both tools. Each member works in their own files to avoid merge conflicts.

| Test cases | Workflow | Owner | Robot Framework | Playwright |
|---|---|---|---|---|
| TC-01 – TC-04 | Authentication | Lisa | `robot/tests/authentication.robot` | `playwright/tests/auth.spec.ts` |
| TC-05 – TC-07 | Sorting and product details | Lisa | `robot/tests/products.robot` | `playwright/tests/products.spec.ts` |
| TC-08 – TC-09 | Logout and Reset App State | Johnny | `robot/tests/session.robot` | `playwright/tests/session.spec.ts` |
| TC-10 – TC-11 | Shopping cart | Johnny | `robot/tests/cart.robot` | `playwright/tests/cart.spec.ts` |
| TC-12 – TC-15 | Checkout | Johnny | `robot/tests/checkout.robot` | `playwright/tests/checkout.spec.ts` |

TC-01 is already implemented in both tools as a setup check.

## Setup (Windows)

Get the code:

```
git clone https://github.com/Laurea-Team2-Testing/swaglabs-test-automation.git
```

Requirements: Python 3, Node.js, Git and Visual Studio Code. When the folder is opened in VS Code, it suggests the Playwright and RobotCode extensions.

### Robot Framework

```
cd robot
pip install -r requirements.txt
rfbrowser init
```

### Playwright

```
cd playwright
npm install
npx playwright install chromium
```

## Running the tests

### Robot Framework (in the `robot` folder)

```
robot --outputdir results tests
```

To watch the browser while the tests run:

```
robot --outputdir results --variable HEADLESS:False tests
```

The report is saved to `robot/results/report.html` and the log to `robot/results/log.html`.

### Playwright (in the `playwright` folder)

```
npm test
```

Other options: `npm run test:headed` (shows the browser), `npm run test:ui` (Playwright UI mode) and `npm run report` (opens the HTML report).

## Way of working

- Create a branch for your work, for example `lisa/authentication` or `johnny/checkout`.
- Commit often with clear messages, for example `Add TC-13 checkout validation (Playwright)`.
- Open a pull request to `main` and ask the other member to review it before merging.
- Generated reports are not committed (see `.gitignore`). Save reports used as evidence to Teams and link them in the test execution log.
- Locators use the `data-test` attributes of Swag Labs, for example `[data-test="username"]`.
