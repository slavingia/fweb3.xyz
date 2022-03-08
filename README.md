### Website

Get a [PolygonScan API key](https://polygonscan.com/apis) and put it in `.env.local`:

`POLYGON_API_KEY=`

Run local server:

```
npm run dev
```

Push to `main` branch to deploy.

### Smart contract

Setup:

```
npm install @openzeppelin/contracts
```

Verify:

```
npx hardhat verify --network mainnet 0x95cd50f9d591630db85d95c932bbc704dc0ae92a
```

#### Testing

To run the tests using [Cypress](https://cypress.io):

1. Install dev dependencies: `npm install`
2. Run local server: `npm run dev`
3. Run Cypress tests in a separate terminal: `npm run e2e`

To run unit tests with jest

bash```
npm run test

# watch mode

npm run test:watch

```

#### Debugging with devtools

Supports using either the VS Code debugger or Chrome DevTools.

See official Next.js docs: https://nextjs.org/docs/advanced-features/debugging

#### Debugging with variables

You can use `?wallet=` to test using a specific wallet address, and `?debug=0,1,1,1,1,` to test with sample data.
```
