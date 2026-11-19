// Vercel Serverless Function: FlevoPay Webhook Listener
// Secure, idempotent transaction status updater for real-time payment approval

global.confirmedTx = global.confirmedTx || {};
global.processedWebhooks = global.processedWebhooks || {};

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

  if (req.method === "POST") {
    try {
      const data = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});

      console.log("FlevoPay Webhook Received:", {
        id: data.id || data.transaction_id,
        external_id: data.external_id || data.store_reference || data.reference,
        status: data.status || data.raw_status,
        amount: data.amount
      });

      // Handle test ping from dashboard
      if (data.event === "test" || data.status === "test") {
        return res.status(200).json({ ok: true, message: "Webhook test received successfully" });
      }

      const txId = String(data.transaction_id || data.id || "");
      const externalRef = String(data.external_id || data.store_reference || data.reference || "");
      const status = String(data.status || data.raw_status || "").toLowerCase();

      const deliveryId = String(data.e2e_id || data.id || txId || externalRef || Date.now());

      // 1. Idempotency Check: prevent duplicate event processing
      if (deliveryId && global.processedWebhooks[deliveryId]) {
        console.log(`Webhook already processed for delivery: ${deliveryId}`);
        return res.status(200).json({ ok: true, saved: false, reason: "already_processed" });
      }

      // 2. Identify if Pix is paid (FlevoPay standard: status === 'approved' or 'paid' or 'completed')
      const isPaid = (
        status === "approved" ||
        status === "paid" ||
        status === "completed" ||
        data.paid === true
      );

      if (!isPaid) {
        console.log(`Webhook event ignored: status=${status}`);
        return res.status(200).json({ ok: true, saved: false, reason: "not_paid_yet", status: status });
      }

      // 3. Mark transaction as Confirmed & Approved
      if (txId) {
        global.confirmedTx[txId] = true;
      }
      if (externalRef) {
        global.confirmedTx[externalRef] = true;
      }
      if (deliveryId) {
        global.processedWebhooks[deliveryId] = Date.now();
      }

      console.log(`FlevoPay payment APPROVED successfully: txId=${txId}, ref=${externalRef}`);

      return res.status(200).json({
        ok: true,
        saved: true,
        status: "approved",
        id: txId,
        externalRef: externalRef
      });
    } catch (err) {
      console.error("Webhook processing error:", err);
      return res.status(200).json({ ok: false, error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};
