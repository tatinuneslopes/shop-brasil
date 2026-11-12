// Vercel Serverless Function: Secure SigiloPay Pix Creator
// Keeps Client Secret safe on server-side without exposing it to the browser

const SIGILOPAY_CONFIG = {
  apiBase: process.env.SIGILOPAY_API_BASE || "https://app.sigilopay.com.br/api/v1",
  publicKey: process.env.SIGILOPAY_PUBLIC_KEY || "ajonassilvadeandrade_ooo8le6gm3kqi6j9",
  secretKey: process.env.SIGILOPAY_SECRET_KEY || "vbb380iopyhccr0t72z8oqfv0yqehg9zrgcw0hqy7aovc8bjcwq7ksznru1mpq2e",
  endpoint: "/gateway/pix/receive"
};

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const amount = Number(body.amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Valor inválido" });
    }

    const host = req.headers["x-forwarded-host"] || req.headers.host || "shop-brasil.vercel.app";
    const proto = req.headers["x-forwarded-proto"] || "https";
    const callbackUrl = `${proto}://${host}/api/webhook`;

    const identifier = body.identifier || `cashin_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    const payload = {
      identifier: identifier,
      amount: Number(amount.toFixed(2)),
      callbackUrl: callbackUrl,
      client: {
        name: (body.client && body.client.name) || "Cliente Shopping Brasil",
        email: (body.client && body.client.email) || "cliente@gmail.com",
        phone: ((body.client && body.client.phone) || "11987654321").replace(/\D/g, ""),
        document: ((body.client && body.client.document) || "52998224725").replace(/\D/g, "")
      }
    };

    const targetUrl = `${SIGILOPAY_CONFIG.apiBase.replace(/\/$/, "")}${SIGILOPAY_CONFIG.endpoint}`;

    const sigiloRes = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "x-public-key": SIGILOPAY_CONFIG.publicKey,
        "x-secret-key": SIGILOPAY_CONFIG.secretKey
      },
      body: JSON.stringify(payload)
    });

    const data = await sigiloRes.json();

    if (!sigiloRes.ok) {
      console.warn("SigiloPay error response:", data);
      return res.status(sigiloRes.status).json({
        success: false,
        error: data.message || "Erro na SigiloPay",
        data: data
      });
    }

    let pixPayload = null;
    let qrImageSrc = null;

    const pixNode = data.pix || (data.order && data.order.pix);
    if (pixNode) {
      pixPayload = pixNode.code || pixNode.payload || pixNode.emv || pixNode.qrCode || pixNode.qrcode;
      if (pixNode.base64) {
        qrImageSrc = pixNode.base64.startsWith("data:") ? pixNode.base64 : `data:image/png;base64,${pixNode.base64}`;
      } else if (pixNode.image || pixNode.imageUrl || pixNode.qrCodeImageUrl) {
        qrImageSrc = pixNode.image || pixNode.imageUrl || pixNode.qrCodeImageUrl;
      }
    }

    return res.status(200).json({
      success: true,
      transactionId: data.transactionId || identifier,
      identifier: identifier,
      pixCode: pixPayload,
      qrImageSrc: qrImageSrc,
      amount: payload.amount
    });
  } catch (err) {
    console.error("Erro interno ao processar Pix SigiloPay:", err);
    return res.status(500).json({ error: "Erro interno do servidor", details: err.message });
  }
};
