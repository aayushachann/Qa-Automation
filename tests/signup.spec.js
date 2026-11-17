
import { test, expect } from '@playwright/test';
import { getLatestOtp, getExistingMessageIds } from './temp-mail.js';
import path from 'node:path';

test('complete full signup', async ({ page }) => {
    test.setTimeout(180000);

    const emailAddress = 'luffy2035@mailsac.com';

    await page.goto('https://authorized-partner.vercel.app/');

    await page.getByRole('link', { name: 'Get Started' }).getByRole('button').click();

    await expect(page.getByRole('checkbox')).toBeVisible();
    await page.getByRole('checkbox').check();
    await expect(page.getByRole('checkbox')).toBeChecked();

    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();

    await page.getByRole('textbox', { name: 'First Name' }).fill('Luffy');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('KC.');
    await page.getByRole('textbox', { name: 'Email Address' }).fill(emailAddress);
    await page.getByRole('textbox', { name: 'Phone Number' }).fill('9855597261');

    await page.locator('input[name="password"]').fill('L1234567@');
    await page.locator('input[name="confirmPassword"]').fill('L1234567@');

    await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();

    page.on('response', async response => {
        const method = response.request().method();

        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            console.log('SERVER STATUS:', response.status());
            console.log('SERVER URL:', response.url());

            if (!response.ok()) {
                console.log(
                    'SERVER RESPONSE:',
                    await response.text().catch(() => 'Could not read response')
                );
            }
        }
    });

    const previousMessageIds = await getExistingMessageIds(emailAddress);

    await page.getByRole('button', { name: 'Next' }).click();

    await page.locator('input[maxlength="6"]')
        .waitFor({ state: 'visible', timeout: 30000 });

    const otp = await getLatestOtp(emailAddress, previousMessageIds);

    console.log('New OTP retrieved from Mailsac');

    await page.locator('input[maxlength="6"]').fill(otp);

    console.log('OTP entered automatically');

    await page.getByRole('button', { name: 'Verify Code' }).click();

    await expect(page.locator('input[name="agency_name"]'))
        .toBeVisible({ timeout: 30000 });

    await page.locator('input[name="agency_name"]').fill('Test Agency');
    await page.locator('input[name="role_in_agency"]').fill('Quality Assurance');
    await page.locator('input[name="agency_email"]').fill('agency@example.com');
    await page.locator('input[name="agency_website"]').fill('www.example.com');
    await page.locator('input[name="agency_address"]').fill('Lalitpur, Nepal');

    await page.getByRole('combobox').click();
    await page.getByText('Australia', { exact: true }).click();

    await page.getByRole('button', { name: 'Next' }).click();

    await page.waitForURL('**/register?step=professional-experience', {
        timeout: 30000
    });
    console.log('Opening Years of Experience dropdown');
    await page.getByRole('combobox', { name: 'Years of Experience' }).click();
    await page.getByRole('option', { name: '3 years' }).click();
    console.log('Years of Experience selected');

    await page.getByRole('textbox', { name: 'Focus Area' })
        .fill('Graduate Admission to Australia');

    await page.getByRole('spinbutton', { name: 'Number of Students Recruited Annually' }).fill('67');
    await page.getByRole('spinbutton', { name: 'Success Metrics' }).fill('90');

    await page.getByRole('checkbox', { name: 'Career Counseling' }).check();
    await page.getByRole('checkbox', { name: 'Admission Applications' }).check();
    await page.getByRole('checkbox', { name: 'Visa Processing' }).check();
    await page.getByRole('checkbox', { name: 'Test Prepration' }).check();

    await page.getByRole('button', { name: 'Next' }).click();

    await page.getByRole('textbox', { name: 'Business Registration Number' })
        .fill('098765432');

    await page.getByRole('combobox', { name: 'Preferred Countries' }).click();
    await page.getByText('India', { exact: true }).click();
    await page.getByText('Nepal', { exact: true }).click();

    await page.getByRole('checkbox', { name: 'Universities' }).check();
    await page.getByRole('checkbox', { name: 'Colleges' }).check();
    await page.getByRole('checkbox', { name: 'Vocational School' }).check();

    await page.getByRole('textbox', { name: 'Certification Details (' })
        .fill('Test certification details');

    await page.getByRole('button', { name: 'Add Documents' }).click();

    await page.getByRole('button', { name: 'Choose File' }).first().setInputFiles(
        path.resolve('Company registration.pdf')
    );

    await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled();

    console.log('All registration steps completed. Submitting registration.');

    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page).toHaveURL(/\/admin\/profile/, { timeout: 30000 });
    console.log('Registration completed successfully');
});

