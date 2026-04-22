module.exports = (req, res) => {
  // সব ডোমেইন থেকে রিকোয়েস্ট গ্রহণ করবে
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return false;
  }
  return true;
};
