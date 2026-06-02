# Test Strategy

## What would I not automate in this flow and why?

I would not automate a strict numeric validation of the price sorting. During execution, the site displayed prices with inconsistent formatting in the DOM, for example values such as `$1,23240`, which can be interpreted incorrectly as a much larger number if parsed automatically.

I would also avoid validating third-party services such as analytics, tracking, marketing widgets, personalization tools, or external scripts. These services are outside the functional scope of this test and can return 503 or 404 responses without meaning that the product search flow is broken.

## If Liverpool added a CAPTCHA to the search flow, how would I manage it?

I would not try to bypass or solve the CAPTCHA in the automated suite. CAPTCHA is specifically designed to block automation, so bypassing it would not be a valid testing practice.

For automation, I would request a test environment with CAPTCHA disabled, a test flag, or a whitelisted test session. If that were not possible, I would keep CAPTCHA validation as a manual or separate security validation and automate the flow only after a valid session has been established.

## What instability risks exist in this test and how were they mitigated?

The main risks are dynamic rendering, duplicated hidden elements, changing selectors, third-party scripts, network delays, inconsistent price formatting, and internal APIs that are not documented.

To reduce instability, the test focuses on the user-facing flow: search, sort, filter, validate that the filter is applied, and extract the first five visible products. It avoids global network interception such as `cy.intercept('**')` because that captures unrelated traffic and creates noise.

Screenshots on failure are configured through Cypress using `screenshotOnRunFailure`, and an HTML report is generated using Mochawesome.

## If this were added to a CI pipeline with more than 50 test suites, what would I change?

I would classify this as a smoke or critical user journey test, not as a low-level regression test. I would avoid running it with every small change because it depends on a public third-party website.

For a large CI pipeline, I would add retries only in CI, isolate this suite from faster tests, upload HTML reports and screenshots as artifacts, and consider running it on a scheduled basis or before releases.

I would also improve maintainability by moving selectors and repeated actions into helper functions or page objects, and by parameterizing the search term to support more data-driven scenarios.