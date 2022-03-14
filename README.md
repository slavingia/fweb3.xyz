### Website

![Statements](https://img.shields.io/badge/statements-87.5%25-yellow.svg?style=flat&logo=jest)
![Branches](https://img.shields.io/badge/branches-60%25-red.svg?style=flat&logo=jest)
![Functions](https://img.shields.io/badge/functions-100%25-brightgreen.svg?style=flat&logo=jest)
![Lines](https://img.shields.io/badge/lines-87.5%25-yellow.svg?style=flat&logo=jest)

Get a [PolygonScan API key](https://polygonscan.com/apis) and put it in `.env.local`:

`POLYGON_API_KEY=`

Run local server:

```
npm run dev
```

Push to `main` branch to deploy.

#### Testing

To run the tests using [Cypress](https://cypress.io):

1. Install dev dependencies: `npm install`
2. Run local server: `npm run dev`
3. Run Cypress tests in a separate terminal: `npm run e2e`

To run unit tests with jest

```
npm run test
```

Watch mode:

```
npm run test:watch
```

#### Debugging with devtools

Supports using either the VS Code debugger or Chrome DevTools.

See official Next.js docs: https://nextjs.org/docs/advanced-features/debugging

#### Debugging with variables

You can set `DEBUG` to console.debug request responses and override the production blocking for the dot switch described below.

You can use `?wallet=` to test using a specific wallet address

To enable individual dots (bypasses any external polygon api calls)
set `NEXT_PUBLIC_DEBUG_ENABLE_DOTS=`
To enable dots one at a time or multiple dots. Use a string of 1/0 switches to enable/disable
ex: NEXT_PUBLIC_DEBUG_ENABLE_DOTS=1111111
This would enable the first 7 game tasks. Not avail in production
