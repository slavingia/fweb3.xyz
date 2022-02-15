// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const response = await fetch("https://api.polygonscan.com/api?module=account&action=txlist&address=" + req.query.wallet_address + "&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=" + process.env.POLYGON_API_KEY);
  const json = await response.json();

  let hasUsedFaucet = false;

  for (let i = 0; i < json.result.length; i++) {
    if (json.result[i]["to"] == "0x67806adca0fd8825da9cddc69b9ba8837a64874b") {
      hasUsedFaucet = true;
    }
  }

  res.status(200).json({ hasUsedFaucet: hasUsedFaucet });
}
