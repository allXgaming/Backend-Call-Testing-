const cors = require('./cors');

module.exports = async (req, res) => {
  if (!cors(req, res)) return;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    return res.status(500).json({ error: 'Cloudinary configuration missing' });
  }

  res.status(200).json({ cloudName, uploadPreset });
};