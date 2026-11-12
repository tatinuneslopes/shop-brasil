// Vercel Serverless Function: BlackPay Webhook Listener
// Secure, idempotent transaction status updater

global.confirmedTx = global.confirmedTx || {};
global.processedWebhooks = global.processedWebhooks || {};

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-BlackPay-Event, X-BlackPay-Signature"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    try {
      const data = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
      const eventHeader = req.headers["x-blackpay-event"] || "";
      const event = String(data.event || eventHeader || "").toLowerCase();

      console.log("BlackPay Webhook Received:", {
        event: event,
        deliveryId: data.id,
        txData: data.data || {}
      });

      // Handle test event from BlackPay dashboard ("Enviar teste")
      if (event === "test") {
        return res.status(200).json({ ok: true, message: "Webhook test received successfully" });
      }

      const txNode = data.data || data.transaction || data.order || data;
      const txId = String(txNode.id || data.id || "");
      const externalRef = String(txNode.externalRef || txNode.identifier || data.externalRef || "");
      const status = String(txNode.status || data.status || "").toLowerCase();

      const deliveryId = String(data.id || txId || externalRef);

      // 1. Idempotency Check: prevent duplicate event processing
      if (deliveryId && global.processedWebhooks[deliveryId]) {
        console.log(`Webhook already processed for delivery: ${deliveryId}`);
        return res.status(200).json({ ok: true, saved: false, reason: "already_processed" });
      }

      // 2. Identify if Pix is paid (BlackPay standard: event === 'payment.paid' or status === 'paid')
      const isPaid = (
        event === "payment.paid" ||
        event === "transaction_paid" ||
        status === "paid" ||
        status === "completed" ||
        status === "approved"
      );

      if (!isPaid) {
        console.log(`Webhook event ignored: event=${event}, status=${status}`);
        return res.status(200).json({ ok: true, saved: false, reason: "not_paid_yet" });
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

      console.log(`Payment APPROVED successfully for transaction: txId=${txId}, ref=${externalRef}`);

      return res.status(200).json({
        ok: true,
        saved: true,
        status: "paid",
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
