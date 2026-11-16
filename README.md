# Authorized Partner Signup Automation

## Project Overview

This project automates the complete signup process of the Authorized Partner website using Playwright.

**Website:** https://authorized-partner.vercel.app/

The automation completes the registration process without manual intervention.

## Features

- Opens the registration website.
- Accepts terms and conditions.
- Enters personal and account details.
- Retrieves OTP automatically using the Mailsac API.
- Verifies the OTP.
- Completes agency details.
- Completes professional experience details.
- Fills verification preferences.
- Uploads the company registration document.
- Submits the final registration form.
- Verifies successful navigation to the admin profile page.

## Technologies and Environment

| Technology | Version / Purpose |

| JavaScript | Programming language |
| Node.js | v24.20.0 |
| npm | 11.19.0 |
| Playwright Test | 1.65.0 |
| Chromium | Browser used for testing |
| Mailsac API | Automatic OTP retrieval |
| dotenv | Environment variable management |

## Project Structure

```text
Qa-Automation/
├── tests/
│   ├── signup.spec.js
│   └── temp-mail.js
├── Company registration.pdf
├── TEST REPORT.pdf
├── playwright.config.js
├── package.json
├── package-lock.json
├── .gitignore
├── .env.example
└── README.md
```

## Prerequisites

- Node.js and npm installed.
- A free Mailsac account.
- Visual Studio Code (recommended).

## Installation and Setup

Clone the repository:

```bash
git clone https://github.com/aayushachann/Qa-Automation
```

Navigate to the project directory:

```bash
cd Qa-Automation
```

Install project dependencies:

```bash
npm install
```

Install the Chromium browser:

```bash
npx playwright install chromium
```

## Environment Configuration

This project uses the Mailsac API to retrieve OTP verification emails automatically.

To configure the API key:

1. Create a free account at [Mailsac](https://mailsac.com/).
2. Log in to your Mailsac account.
3. Open the **API Keys & Users** section.
4. Under **API Keys**, find **Integrate with API Services**.
5. Click **Manage Keys**.
6. Create a new API key and copy it.
7. Create a `.env` file in the project root directory.
8. Add the following:

```env
MAILSAC_API_KEY=your_mailsac_api_key
```

Replace the placeholder with your own Mailsac API key.

The API key is required for automatic OTP retrieval during test execution.

**Note:** Do not upload your actual `.env` file or API key to GitHub. The `.env` file is excluded using `.gitignore`. The `.env.example` file is provided as a reference.

## Running the Automation

Execute the following command:

```bash
npx playwright test tests/signup.spec.js --project=chromium --headed
```

The browser will open and execute the signup process automatically.

The script retrieves the OTP, completes all registration pages, uploads the required document, and submits the registration.

## Test Data

The automation uses sample registration details for testing.

- Sample names and agency information.
- Email addresses created using Mailsac for OTP verification.
- Sample phone numbers sourced from [FakeNumber.in – Nepal](https://fakenumber.in/nepal).
- Sample professional experience and verification details.
- Company registration PDF used for document upload.

**Important:** The script currently contains predefined sample email and phone number values. For each new registration attempt, replace them in `tests/signup.spec.js` with a new, unused Mailsac email address (e.g., `hello2026@mailsac.com`) and phone number (e.g., `9855508061`). Mailsac email addresses must end with `@mailsac.com` to receive OTP verification emails. Previously registered details may not be accepted.

## Test Validation and Expected Result

The test verifies successful registration by checking that the browser navigates to the admin profile page.

Expected terminal output:

```text
Registration completed successfully
1 passed
```

## Security

- API keys are stored in environment variables.
- `.env` is excluded from GitHub using `.gitignore`.
- Credentials and sensitive authentication files should never be committed.
- Test passwords and private account information should not be published.

## Author

QA Automation Project

**Project:** Automated Signup Testing using Playwright
