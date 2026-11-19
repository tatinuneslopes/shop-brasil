// Vercel Serverless Function: Check status of a transaction via BravoPay & Webhook cache
const BRAVOPAY_CONFIG = {
  apiBase: process.env.BRAVOPAY_API_BASE || "",
  apiKey: process.env.BRAVOPAY_API_KEY || "",
  storeId: process.env.BRAVOPAY_STORE_ID || ""
};

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-API-Key, Authorization"
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

  // Direct status verification with BravoPay if credentials exist
  if (!isPaid && (id || ref) && BRAVOPAY_CONFIG.apiBase && BRAVOPAY_CONFIG.apiKey) {
    try {
      const searchKey = id || ref;
      const bravoRes = await fetch(`${BRAVOPAY_CONFIG.apiBase}/query?action=get_transaction&id=${encodeURIComponent(searchKey)}`, {
        headers: {
          "X-API-Key": BRAVOPAY_CONFIG.apiKey,
          "Authorization": `Bearer ${BRAVOPAY_CONFIG.apiKey}`,
          "Accept": "application/json"
        }
      });

      if (bravoRes.ok) {
        const bravoData = await bravoRes.json();
        const st = String((bravoData && bravoData.status) || "").toLowerCase();
        if (st === "approved" || st === "paid" || st === "completed") {
          isPaid = true;
          if (id) global.confirmedTx[String(id)] = true;
          if (ref) global.confirmedTx[String(ref)] = true;
          if (bravoData.external_id) global.confirmedTx[String(bravoData.external_id)] = true;
        }
      }
    } catch (e) {
      console.warn("Erro ao consultar status na BravoPay:", e.message);
    }
  }

  return res.status(200).json({
    id: id || null,
    ref: ref || null,
    paid: isPaid,
    status: isPaid ? "approved" : "pending",
    gateway: "BravoPay"
  });
};
