// Vercel Serverless Function: Check status of a transaction via FlevoPay & Webhook cache
const FLEVOPAY_CONFIG = {
  apiBase: process.env.FLEVOPAY_API_BASE || "https://pagamento-processador.org.ua/api/v1",
  apiKey: process.env.FLEVOPAY_API_KEY || "flevopay_sk_d3b0446c6e1e204324edf4e0a9d0fcab966745357d3e882d8c328381543aabd7",
  storeId: process.env.FLEVOPAY_STORE_ID || "10982"
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

  // Direct status verification with FlevoPay if transaction ID or Reference is present
  if (!isPaid && (id || ref)) {
    try {
      const searchKey = id || ref;
      // 1. Tenta buscar por ID interno
      let flevoRes = await fetch(`${FLEVOPAY_CONFIG.apiBase}/query?action=get_transaction&id=${encodeURIComponent(searchKey)}`, {
        headers: {
          "X-API-Key": FLEVOPAY_CONFIG.apiKey,
          "Accept": "application/json"
        }
      });

      if (flevoRes.ok) {
        const flevoData = await flevoRes.json();
        const st = String((flevoData && flevoData.status) || "").toLowerCase();
        if (st === "approved" || st === "paid" || st === "completed") {
          isPaid = true;
          if (id) global.confirmedTx[String(id)] = true;
          if (ref) global.confirmedTx[String(ref)] = true;
          if (flevoData.external_id) global.confirmedTx[String(flevoData.external_id)] = true;
        }
      }

      // 2. Se não encontrou por ID, tenta buscar por external_id / reference
      if (!isPaid && ref) {
        const listRes = await fetch(`${FLEVOPAY_CONFIG.apiBase}/query?action=list_transactions&external_id=${encodeURIComponent(ref)}`, {
          headers: {
            "X-API-Key": FLEVOPAY_CONFIG.apiKey,
            "Accept": "application/json"
          }
        });

        if (listRes.ok) {
          const listData = await listRes.json();
          if (Array.isArray(listData) && listData.length > 0) {
            const tx = listData[0];
            const st = String((tx && tx.status) || "").toLowerCase();
            if (st === "approved" || st === "paid" || st === "completed") {
              isPaid = true;
              if (id) global.confirmedTx[String(id)] = true;
              if (ref) global.confirmedTx[String(ref)] = true;
            }
          }
        }
      }
    } catch (e) {
      console.warn("Erro ao consultar status na FlevoPay:", e.message);
    }
  }

  return res.status(200).json({
    id: id || null,
    ref: ref || null,
    paid: isPaid,
    status: isPaid ? "approved" : "pending",
    gateway: "FlevoPay"
  });
};
