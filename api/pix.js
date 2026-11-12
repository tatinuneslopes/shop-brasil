// Vercel Serverless Function: Secure BlackPay Pix Creator
// Keeps Private API Key safe on server-side without exposing it to the browser

const BLACKPAY_CONFIG = {
  apiBase: process.env.BLACKPAY_API_BASE || "https://blackpays.site/api/public/v1",
  apiKey: process.env.BLACKPAY_API_KEY || "bp_live_8f2888b9462bc210a1a39c0cd1c38052bf3219ce7de8a645",
  endpoint: "/pix"
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

    // BlackPay expects amountCents (minimum 200 = R$ 2,00)
    const amountCents = Math.max(200, Math.round(amount * 100));

    const identifier = body.identifier || `shop_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const client = body.client || {};
    const customerName = (client.name && client.name.trim()) || "Cliente Shop Brasil";
    const customerEmail = (client.email && client.email.trim()) || "cliente@shopbrasil.com";
    const customerPhone = String(client.phone || "11999999999").replace(/\D/g, "");
    const customerDocument = String(client.document || "52998224725").replace(/\D/g, "");

    const payload = {
      amountCents: amountCents,
      description: `Pedido ${identifier} - Shop Brasil`,
      customerName: customerName,
      customerEmail: customerEmail,
      customerPhone: customerPhone,
      customerDocument: customerDocument,
      externalRef: String(identifier).substring(0, 100),
      tracking: body.tracking || {
        utm_source: "loja",
        utm_campaign: "blackfriday"
      }
    };

    const targetUrl = `${BLACKPAY_CONFIG.apiBase.replace(/\/$/, "")}${BLACKPAY_CONFIG.endpoint}`;

    const bpRes = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${BLACKPAY_CONFIG.apiKey}`
      },
      body: JSON.stringify(payload)
    });

    const data = await bpRes.json();

    if (!bpRes.ok) {
      console.warn("BlackPay API Error:", data);
      return res.status(bpRes.status).json({
        success: false,
        error: data.message || data.error || "Erro na BlackPay",
        details: data
      });
    }

    let qrImageSrc = null;
    if (data.qrCodeBase64) {
      qrImageSrc = data.qrCodeBase64.startsWith("data:")
        ? data.qrCodeBase64
        : `data:image/png;base64,${data.qrCodeBase64}`;
    }

    return res.status(200).json({
      success: true,
      transactionId: data.id || identifier,
      identifier: data.externalRef || identifier,
      pixCode: data.pixCopyPaste,
      qrImageSrc: qrImageSrc,
      amount: Number((amountCents / 100).toFixed(2)),
      expiresAt: data.expiresAt
    });
  } catch (err) {
    console.error("Erro interno ao gerar Pix BlackPay:", err);
    return res.status(500).json({
      success: false,
      error: "Erro interno no servidor ao processar pagamento Pix",
      message: err.message
    });
  }
};
