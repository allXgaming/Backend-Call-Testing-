// lib/cors.js – Domain lock + CORS middleware
module.exports = (req, res) => {
  const allowedOrigin = process.env.ALLOWED_ORIGIN;
  const origin = req.headers.origin;

  // Strict domain check – শুধুমাত্র নির্দিষ্ট ডোমেইন অনুমোদিত
  if (origin !== allowedOrigin) {
    res.status(403).json({ error: 'Forbidden: Invalid origin' });
    return false;
  }

  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return false;
  }
  return true;
};