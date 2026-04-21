const cors = require('./cors');

module.exports = async (req, res) => {
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

    // GET /api/recaptcha-site-key
    if (path === '/api/recaptcha-site-key' && req.method === 'GET') {
      const siteKey = process.env.RECAPTCHA_SITE_KEY;
      if (!siteKey) {
        return res.status(500).json({ error: 'reCAPTCHA site key missing' });
      }
      return res.status(200).json({ siteKey });
    }

    res.status(404).json({ error: 'Endpoint not found' });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
