// Vercel Serverless Function: SigiloPay & Multi-Gateway Webhook Listener
// Secure, idempotent transaction status updater

global.confirmedTx = global.confirmedTx || {};
global.processedWebhooks = global.processedWebhooks || {};

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    try {
      const data = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
      console.log("SigiloPay Webhook Received:", JSON.stringify(data));

      const event = String(data.event || "").toUpperCase();
      const transaction = data.transaction || data.order || {};
      const status = String(transaction.status || data.status || data.payment_status || "").toUpperCase();

      const txId = String(transaction.id || data.transaction_id || data.id || "");
      const identifier = String(transaction.identifier || data.identifier || data.reference || "");
      const primaryKey = txId || identifier;

      // 1. Idempotency Check: prevent duplicate event processing
      if (primaryKey && global.processedWebhooks[primaryKey]) {
        console.log(`Webhook already processed for transaction: ${primaryKey}`);
        return res.status(200).json({ ok: true, saved: false, reason: "already_processed", transactionId: primaryKey });
      }

      // 2. Identify if Pix is paid (SigiloPay standard)
      const isPaid = (
        event === "TRANSACTION_PAID" ||
        event === "TRANSACTION_COMPLETED" ||
        status === "COMPLETED" ||
        status === "PAID" ||
        status === "APPROVED" ||
        status === "PAGO"
      );

      if (!isPaid) {
        console.log(`Webhook event ignored (not paid yet): event=${event}, status=${status}`);
        return res.status(200).json({ ok: true, saved: false, reason: "not_paid_yet" });
      }

      // 3. Mark transaction as Confirmed & Approved
      if (txId) {
        global.confirmedTx[txId] = true;
      }
      if (identifier) {
        global.confirmedTx[identifier] = true;
      }
      if (primaryKey) {
        global.processedWebhooks[primaryKey] = Date.now();
      }

      console.log(`Payment APPROVED successfully for transaction: ${primaryKey}`);

      return res.status(200).json({
        ok: true,
        saved: true,
        transactionId: primaryKey,
        status: "COMPLETED"
      });
    } catch (err) {
      console.error("Webhook processing error:", err);
      return res.status(200).json({ ok: false, error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};
