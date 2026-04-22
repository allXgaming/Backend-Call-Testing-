const cors = require('./cors');

module.exports = async (req, res) => {
  if (!cors(req, res)) return;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Firebase কনফিগ .env থেকে নেওয়া (সবগুলো পাবলিক, তবু চাইলে রাখতে পারো)
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };

  // চেক করো কোনো ফাঁকা আছে কিনা
  const missing = Object.entries(firebaseConfig).filter(([_, v]) => !v);
  if (missing.length > 0) {
    return res.status(500).json({ error: 'Firebase configuration missing' });
  }

  res.status(200).json(firebaseConfig);
};