// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  if (req.query.debug !== undefined) {
    let dots = req.query.debug.split(",");

    return res.status(200).json({
      hasEnoughTokens: parseInt(dots[0]),
      hasUsedFaucet: parseInt(dots[1]),
      hasSentTokens: parseInt(dots[2]),
      hasMintedNFT: parseInt(dots[3]),
      hasBurnedTokens: parseInt(dots[4]),
      hasSwappedTokens: parseInt(dots[5]),
      hasVotedInPoll: parseInt(dots[6]),
      hasDeployedContract: parseInt(dots[7]),
      hasWonGame: parseInt(dots[8]),
    });
  }


  if (req.query.wallet_address === undefined) {
    return res.status(500).json({
      message: "Wallet address undefined",
    });
  }
  let tokenBalance: number = 0;
  let hasEnoughTokens: boolean = false;
  let hasUsedFaucet: boolean = false;
  let hasSwappedTokens: boolean = false;
  let hasVotedInPoll: boolean = false;
  let hasDeployedContract: boolean = false;
  let hasSentTokens: boolean = false;
  let hasBurnedTokens: boolean = false;
  let hasMintedNFT: boolean = false;
  let hasWonGame: boolean = false;
  const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

  const responseTokenBalance = await fetch(
    "https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=0x4a14ac36667b574b08443a15093e417db909d7a3&address=" +
      req.query.wallet_address +
      "&tag=latest&apikey=" +
      process.env.POLYGON_API_KEY
  );
  const balanceJson = await responseTokenBalance.json();
  await delay();

  if (
    balanceJson.status === "0" &&
    balanceJson.result.includes("Invalid address")
  ) {
    return res.status(400).json({
      message: "Wallet address invalid",
    });
  }

  if (balanceJson.status === "0") {
    return res.status(500).json({
      message: balanceJson.message,
      result: balanceJson.result,
    });
  }

  tokenBalance = balanceJson.result;
  hasEnoughTokens = balanceJson.result >= 100;

  const response = await fetch(
    "https://api.polygonscan.com/api?module=account&action=txlist&address=" +
      req.query.wallet_address +
      "&startblock=0&endblock=99999999&sort=asc&apikey=" +
      process.env.POLYGON_API_KEY
  );
  const json = await response.json();
  await delay();

  for (let i = 0; i < json.result.length; i++) {
    let transaction = json.result[i];
    if (
      transaction.to === "0x67806adca0fd8825da9cddc69b9ba8837a64874b" &&
      transaction.isError === "0"
    ) {
      hasUsedFaucet = true;
    }

    if (transaction.to === "" && transaction.isError === "0") {
      hasDeployedContract = true;
    }

    if (
      transaction.to ===
        "0x718ad63821a6a3611Ceb706f15971ee029812365".toLowerCase() &&
      transaction.isError === "0"
    ) {
      hasVotedInPoll = true;
    }
  }

  const internalTxnResponse = await fetch(
    "https://api.polygonscan.com/api?module=account&action=txlistinternal&address=" +
      req.query.wallet_address +
      "&startblock=0&endblock=99999999&sort=asc&apikey=" +
      process.env.POLYGON_API_KEY
  );
  const internalTxnJson = await internalTxnResponse.json();
  await delay();

  for (let i = 0; i < internalTxnJson.result.length; i++) {
    let transaction = internalTxnJson.result[i];
    if (
      transaction.from === "0x67806adca0fd8825da9cddc69b9ba8837a64874b" &&
      transaction.isError === "0"
    ) {
      hasUsedFaucet = true;
    }

    if (
      transaction.from === "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45" &&
      transaction.isError === "0"
    ) {
      hasSwappedTokens = true;
    }
  }

  const erc20response = await fetch(
    "https://api.polygonscan.com/api?module=account&action=tokentx&contractaddress=0x4a14ac36667b574b08443a15093e417db909d7a3&address=" +
      req.query.wallet_address +
      "&startblock=0&endblock=99999999&sort=asc&apikey=" +
      process.env.POLYGON_API_KEY
  );
  const erc20json = await erc20response.json();
  await delay();

  for (let i = 0; i < erc20json.result.length; i++) {
    let transaction = erc20json.result[i];
    if (
      transaction.from === req.query.wallet_address.toLowerCase() &&
      transaction.value !== undefined &&
      parseInt(transaction.value) >= 100 * 10 ** 18
    ) {
      hasSentTokens = true;
    }

    if (
      transaction.from === req.query.wallet_address.toLowerCase() &&
      transaction.to === "0x000000000000000000000000000000000000dead" &&
      transaction.value !== undefined &&
      parseInt(transaction.value) > 0
    ) {
      hasBurnedTokens = true;
    }
  }

  const nftResponse = await fetch(
    "https://api.polygonscan.com/api?module=account&action=tokennfttx&contractaddress=0x9a323979dD8AebC6ecc156d965C417D39Eb61a5B&address=" +
      req.query.wallet_address +
      "&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=" +
      process.env.POLYGON_API_KEY
  );
  const nftJson = await nftResponse.json();

  for (let i = 0; i < nftJson.result.length; i++) {
    let transaction = nftJson.result[i];
    if (transaction.from === "0x0000000000000000000000000000000000000000") {
      hasMintedNFT = true;
    }
  }

  const trophyResponse = await fetch(
    "https://api.polygonscan.com/api?module=account&action=tokennfttx&contractaddress=0x2a0493dee4f4b5e4b595326f0e73645f6f493923&address=" +
      req.query.wallet_address +
      "&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=" +
      process.env.POLYGON_API_KEY
  );
  const trophyJson = await trophyResponse.json();

  for (let i = 0; i < trophyJson.result.length; i++) {
    let transaction = trophyJson.result[i];
    if (transaction.from === "0x0000000000000000000000000000000000000000") {
      hasWonGame = true;
    }
  }

  res.status(200).json({
    tokenBalance: tokenBalance,
    hasEnoughTokens: hasEnoughTokens,
    hasUsedFaucet: hasUsedFaucet,
    hasSentTokens: hasSentTokens,
    hasMintedNFT: hasMintedNFT,
    hasBurnedTokens: hasBurnedTokens,
    hasSwappedTokens: hasSwappedTokens,
    hasVotedInPoll: hasVotedInPoll,
    hasDeployedContract: hasDeployedContract,
    hasWonGame: hasWonGame,
  });
}
