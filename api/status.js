// Vercel Serverless Function: Check status of a transaction
module.exports = async (req, res) => {
  // Enable CORS
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

  return res.status(200).json({
    id: id || null,
    ref: ref || null,
    paid: isPaid,
    status: isPaid ? "approved" : "pending"
  });
};
