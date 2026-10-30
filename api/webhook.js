// Vercel Serverless Function: In-memory & KV transaction status cache
// Stores confirmed payments received via FlevoPay Webhook

let confirmedTransactions = new Set();
let transactionStore = {};

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-API-Key"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    try {
      const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      console.log("FlevoPay Webhook Received:", JSON.stringify(data));

      const status = (data.status || data.payment_status || data.event || "").toLowerCase();
      const txId = String(data.transaction_id || data.id || (data.data && data.data.id) || "");
      const ref = String(data.reference || (data.data && data.data.reference) || "");

      // If payment is paid, approved, or confirmed
      const isPaid = status === "paid" || 
                     status === "approved" || 
                     status === "completed" || 
                     status === "success" || 
                     status === "pago" ||
                     status.includes("paid") ||
                     status.includes("approv");

      if (isPaid) {
        if (txId) {
          global.confirmedTx = global.confirmedTx || {};
          global.confirmedTx[txId] = true;
        }
        if (ref) {
          global.confirmedTx = global.confirmedTx || {};
          global.confirmedTx[ref] = true;
        }
      }

      return res.status(200).json({ received: true, status: status, paid: isPaid });
    } catch (err) {
      console.error("Webhook processing error:", err);
      return res.status(200).json({ received: true, error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};
