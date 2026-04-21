const cors = require('./cors');

module.exports = async (req, res) => {
  // CORS middleware কল করবে কিন্তু ডোমেইন চেক করবে না
  if (!cors(req, res)) return;

  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  try {
    // GET /api/cloudinary-config
    if (path === '/api/cloudinary-config' && req.method === 'GET') {
      const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        return res.status(500).json({ error: 'Cloudinary configuration missing' });
      }

      return res.status(200).json({ cloudName, uploadPreset });
    }

    // POST /api/verify-recaptcha
    if (path === '/api/verify-recaptcha' && req.method === 'POST') {
      const secretKey = process.env.RECAPTCHA_SECRET_KEY;
      if (!secretKey) {
        return res.status(500).json({ error: 'reCAPTCHA secret missing' });
      }

      const { token } = req.body || {};
      if (!token) {
        return res.status(400).json({ error: 'Missing reCAPTCHA token' });
      }

      const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
      const response = await fetch(verificationUrl, { method: 'POST' });
      const data = await response.json();

      if (data.success) {
        return res.status(200).json({ success: true });
      } else {
        return res.status(400).json({ success: false, error: 'reCAPTCHA verification failed' });
      }
    }

    res.status(404).json({ error: 'Endpoint not found' });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
