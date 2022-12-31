# Toggly Checkout

John is a daily customer of Toggly and has reported a few issues on the checkout to the customer service team. This project aims to resolve these issues and make John a happy customer of Toggly.

## Features

- User Story 1: Show and select saved cards during checkout
- User Story 2: Add new cards to the vault with proper validation
- User Story 3: Option to pay through Paypal
- User Story 4: Display any errors that occur during payment
- User Story 5: Full screen overlay for Paypal authentication with a link to re-open or focus on the already opened tab
- User Story 6: Select and update to desired currency during checkout

## Resources

- [Figma mockup](https://figma.com/mockup)
- [Currencies API documentation](https://developers.swell.is/frontend-api/currencies)
- [Session management API documentation](https://developers.swell.is/frontend-api/session-management)
- [Account recovery API documentation](https://developers.swell.is/frontend-api/payments)
- [Toggly storefront](https://toggly--dev.swell.store/)

## User Account Login

- Email: help@devkind.com.au
- Password: test123

## Paypal Sandbox Login

- Email: sb-img4824035611@personal.example.com
- Password: =X1pmlu+

## Initilize Project

To install the necessary dependencies, run the following command:

```bash
npm run dev

```
## Configuration

To configure the application, you will need to set the following environment variables:

- `NEXT_SWELL_PUBLIC_STORE`: The name of the Toggly storefront
- `NEXT_SWELL_PUBLIC_API_TOKEN`: The API token for accessing the Toggly API

For example, you might include the following in your `.env` file:
- NEXT_SWELL_PUBLIC_STORE="toggly"
- NEXT_SWELL_PUBLIC_API_TOKEN="pk_Qo600k0BZTFLNJzuwLIgqAdmzkh720h5"

You can then access these variables in your code using `process.env.NEXT_SWELL_PUBLIC_STORE` and `process.env.NEXT_SWELL_PUBLIC_API_TOKEN`.

### License

Licensed under the MIT License, Copyright © 2022

See [LICENSE](LICENSE) for more information.
