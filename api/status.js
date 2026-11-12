// Vercel Serverless Function: Check status of a transaction
const BLACKPAY_CONFIG = {
  apiBase: process.env.BLACKPAY_API_BASE || "https://blackpays.site/api/public/v1",
  apiKey: process.env.BLACKPAY_API_KEY || "bp_live_8f2888b9462bc210a1a39c0cd1c38052bf3219ce7de8a645"
};

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-API-Key"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { id, ref } = req.query || {};
  global.confirmedTx = global.confirmedTx || {};

  let isPaid = false;
  if (id && global.confirmedTx[String(id)]) {
    isPaid = true;
  }
  if (ref && global.confirmedTx[String(ref)]) {
    isPaid = true;
  }

  // Direct status verification with BlackPay if transaction ID is present
  if (!isPaid && id && String(id).startsWith("TX_")) {
    try {
      const bpRes = await fetch(`${BLACKPAY_CONFIG.apiBase}/pix/${encodeURIComponent(id)}`, {
        headers: {
          "Authorization": `Bearer ${BLACKPAY_CONFIG.apiKey}`,
          "Accept": "application/json"
        }
      });
      if (bpRes.ok) {
        const bpData = await bpRes.json();
        if (bpData && (bpData.status === "paid" || bpData.status === "completed")) {
          isPaid = true;
          global.confirmedTx[String(id)] = true;
          if (bpData.externalRef) {
            global.confirmedTx[String(bpData.externalRef)] = true;
          }
        }
      }
    } catch (e) {
      console.warn("Error querying BlackPay status:", e);
    }
  }

  return res.status(200).json({
    id: id || null,
    ref: ref || null,
    paid: isPaid,
    status: isPaid ? "approved" : "pending"
  });
};
