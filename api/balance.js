// Vercel Serverless Function: Check real balance & transactions from BravoPay
const BRAVOPAY_CONFIG = {
  apiBase: process.env.BRAVOPAY_API_BASE || "",
  apiKey: process.env.BRAVOPAY_API_KEY || "",
  storeId: process.env.BRAVOPAY_STORE_ID || ""
};

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-API-Key, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (!BRAVOPAY_CONFIG.apiBase || !BRAVOPAY_CONFIG.apiKey) {
    return res.status(200).json({
      success: true,
      data: {
        store_name: "Shopping Brasil",
        currency: "BRL",
        balance: {
          available: 0,
          available_formatted: "R$ 0,00",
          retained: 0,
          retained_formatted: "R$ 0,00",
          total: 0,
          total_formatted: "R$ 0,00"
        }
      }
    });
  }

  try {
    const bravoRes = await fetch(`${BRAVOPAY_CONFIG.apiBase}/balance`, {
      method: "GET",
      headers: {
        "X-API-Key": BRAVOPAY_CONFIG.apiKey,
        "Authorization": `Bearer ${BRAVOPAY_CONFIG.apiKey}`,
        "Content-Type": "application/json"
      }
    });

    if (bravoRes.ok) {
      const data = await bravoRes.json();
      return res.status(200).json(data);
    } else {
      return res.status(bravoRes.status).json({ error: "BravoPay error" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
