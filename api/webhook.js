// Vercel Serverless Function: BravoPay Webhook Listener
// Secure, idempotent transaction status updater for real-time payment approval

global.confirmedTx = global.confirmedTx || {};
global.processedWebhooks = global.processedWebhooks || {};

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-API-Key, Authorization, BravoPay-Signature, X-Bravopay-Signature"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    try {
      const data = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});

      console.log("BravoPay Webhook Received:", {
        id: data.id,
        type: data.type,
        data: data.data || {}
      });

      // Handle test ping from dashboard
      if (data.type === "test" || data.event === "test" || data.action === "test") {
        return res.status(200).json({ ok: true, message: "Webhook test received successfully" });
      }

      const eventType = String(data.type || data.event || "").toLowerCase();
      const txNode = data.data || data;
      const txId = String(txNode.id || data.id || "");
      const externalRef = String(txNode.external_reference || txNode.reference || "");
      const status = String(txNode.status || "").toUpperCase();

      const deliveryId = String(data.id || txId || externalRef || Date.now());

      // 1. Idempotency Check: prevent duplicate event processing
      if (deliveryId && global.processedWebhooks[deliveryId]) {
        console.log(`Webhook already processed for delivery: ${deliveryId}`);
        return res.status(200).json({ ok: true, saved: false, reason: "already_processed" });
      }

      // 2. Identify if Pix is paid (BravoPay standard: type === 'transaction.paid' or status === 'PAID')
      const isPaid = (
        eventType === "transaction.paid" ||
        status === "PAID" ||
        status === "APPROVED" ||
        status === "COMPLETED" ||
        txNode.paid === true
      );

      if (!isPaid) {
        console.log(`Webhook event ignored: type=${eventType}, status=${status}`);
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

      console.log(`BravoPay payment APPROVED successfully: txId=${txId}, ref=${externalRef}`);

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
