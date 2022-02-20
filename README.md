### Website

Get a Polygonscan API key and put it in `.env.local`:

`POLYGON_API_KEY=`

Run local server:

`npm run dev`

Push to `main` branch to deploy.

### Smart contract

Setup:

`npm install @openzeppelin/contracts`

Verify:

`npx hardhat verify --network mainnet 0x95cd50f9d591630db85d95c932bbc704dc0ae92a`

#### Testing

To run the tests using [Cypress](https://cypress.io):

1. Install dev dependencies: `npm install`
2. Run local server: `npm run dev`
3. Run Cypress tests in a separate terminal: `npm run e2e`
