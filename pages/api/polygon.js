// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  if (req.query.wallet_address == "undefined") {
    return res.status(500).json({
      message: "Wallet address undefined"
    });
  }

  const response = await fetch("https://api.polygonscan.com/api?module=account&action=txlist&address=" + req.query.wallet_address + "&startblock=0&endblock=99999999&sort=asc&apikey=" + process.env.POLYGON_API_KEY);
  const json = await response.json();

  let hasUsedFaucet = false;

  for (let i = 0; i < json.result.length; i++) {
    let transaction = json.result[i];
    if (transaction["to"] == "0x67806adca0fd8825da9cddc69b9ba8837a64874b" && transaction["isError"] == "0") {
      hasUsedFaucet = true;
    }
  }

  const internalTxnResponse = await fetch("https://api.polygonscan.com/api?module=account&action=txlistinternal&address=" + req.query.wallet_address + "&startblock=0&endblock=99999999&sort=asc&apikey=" + process.env.POLYGON_API_KEY);
  const internalTxnJson = await internalTxnResponse.json();

  for (let i = 0; i < internalTxnJson.result.length; i++) {
    let transaction = internalTxnJson.result[i];
    if (transaction["from"] == "0x67806adca0fd8825da9cddc69b9ba8837a64874b" && transaction["isError"] == "0") {
      hasUsedFaucet = true;
    }
  }

  const erc20response = await fetch("https://api.polygonscan.com/api?module=account&action=tokentx&contractaddress=0x4a14ac36667b574b08443a15093e417db909d7a3&address=" + req.query.wallet_address + "&startblock=0&endblock=99999999&sort=asc&apikey=" + process.env.POLYGON_API_KEY)
  const erc20json = await erc20response.json();

  let hasSentTokens = false;

  for (let i = 0; i < erc20json.result.length; i++) {
    let transaction = erc20json.result[i];
    if (transaction["from"] == req.query.wallet_address.toLowerCase() && transaction["value"] !== undefined && (parseInt(transaction["value"]) >= 100 * 10 ** 18)) {
      hasSentTokens = true;
    }
  }

  const nftResponse = await fetch("https://api.polygonscan.com/api?module=account&action=txlist&address=" + req.query.wallet_address + "&startblock=0&endblock=99999999&sort=asc&apikey=" + process.env.POLYGON_API_KEY);
  const nftJson = await nftResponse.json();

  let hasMintedNFT = false;

  for (let i = 0; i < json.result.length; i++) {
    let transaction = json.result[i];
    if (transaction["to"] == "0x67806adca0fd8825da9cddc69b9ba8837a64874b" && transaction["isError"] == "0") {
      hasMintedNFT = true;
    }
  }


  res.status(200).json({
    hasUsedFaucet: hasUsedFaucet,
    hasSentTokens: hasSentTokens,
    hasMintedNFT: hasMintedNFT,
  });
}
