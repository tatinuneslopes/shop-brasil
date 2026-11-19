// Vercel Serverless Function: Check status of a transaction via BravoPay & Webhook cache
const BRAVOPAY_CONFIG = {
  apiBase: process.env.BRAVOPAY_API_BASE || "https://bravopay.club/api/v1",
  apiKey: process.env.BRAVOPAY_API_KEY || "bp_live_8mCi6pbppR6bMMARRk_bzgbJmHQxXFS2PMpvZQ"
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

  // Direct status verification with BravoPay API
  if (!isPaid && (id || ref) && BRAVOPAY_CONFIG.apiKey) {
    try {
      // 1. Check by BravoPay transaction ID
      if (id && !id.startsWith("BRAVO_") && !id.startsWith("SHOPPING-")) {
        const bravoRes = await fetch(`${BRAVOPAY_CONFIG.apiBase}/transactions/${encodeURIComponent(id)}`, {
          headers: {
            "Authorization": `Bearer ${BRAVOPAY_CONFIG.apiKey}`,
            "Accept": "application/json"
          }
        });

        if (bravoRes.ok) {
          const tx = await bravoRes.json();
          const st = String((tx && tx.status) || "").toUpperCase();
          if (st === "PAID" || st === "APPROVED" || st === "COMPLETED") {
            isPaid = true;
            global.confirmedTx[String(id)] = true;
            if (ref) global.confirmedTx[String(ref)] = true;
            if (tx.external_reference) global.confirmedTx[String(tx.external_reference)] = true;
          }
        }
      }

      // 2. Check by external_reference
      if (!isPaid && ref) {
        const listRes = await fetch(`${BRAVOPAY_CONFIG.apiBase}/transactions?external_reference=${encodeURIComponent(ref)}`, {
          headers: {
            "Authorization": `Bearer ${BRAVOPAY_CONFIG.apiKey}`,
            "Accept": "application/json"
          }
        });

        if (listRes.ok) {
          const listData = await listRes.json();
          if (listData && Array.isArray(listData.data) && listData.data.length > 0) {
            const tx = listData.data[0];
            const st = String((tx && tx.status) || "").toUpperCase();
            if (st === "PAID" || st === "APPROVED" || st === "COMPLETED") {
              isPaid = true;
              if (id) global.confirmedTx[String(id)] = true;
              global.confirmedTx[String(ref)] = true;
            }
          }
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
