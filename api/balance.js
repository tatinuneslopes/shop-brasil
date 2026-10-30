// Vercel Serverless Function: Check real balance & transactions from FlevoPay
module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-API-Key"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const flevoRes = await fetch("https://pagamento-processador.org.ua/api/v1/balance", {
      method: "GET",
      headers: {
        "X-API-Key": "flevopay_sk_d3b0446c6e1e204324edf4e0a9d0fcab966745357d3e882d8c328381543aabd7",
        "Content-Type": "application/json"
      }
    });

    if (flevoRes.ok) {
      const data = await flevoRes.json();
      return res.status(200).json(data);
    } else {
      return res.status(flevoRes.status).json({ error: "FlevoPay error" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
