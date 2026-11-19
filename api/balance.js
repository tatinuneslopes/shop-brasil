// Vercel Serverless Function: Check real balance & transactions from BravoPay
const BRAVOPAY_CONFIG = {
  apiBase: process.env.BRAVOPAY_API_BASE || "https://bravopay.club/api/v1",
  apiKey: process.env.BRAVOPAY_API_KEY || "bp_live_8mCi6pbppR6bMMARRk_bzgbJmHQxXFS2PMpvZQ"
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

  try {
    const bravoRes = await fetch(`${BRAVOPAY_CONFIG.apiBase}/balance`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${BRAVOPAY_CONFIG.apiKey}`,
        "Accept": "application/json"
      }
    });

    if (bravoRes.ok) {
      const data = await bravoRes.json();
      return res.status(200).json(data);
    } else {
      return res.status(bravoRes.status).json({ error: "BravoPay balance error" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
