const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; 
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || '12345678901234567890123456789012'; 
const IV = process.env.IV || '1234567890123456'; 

const encrypt = (payload) => {
  try {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), IV);
    let encrypted = cipher.update(token, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    console.log('✅ Token Encrypted Successfully');
    return encrypted;
  } catch (error) {
    console.error('❌ Encryption Error:', error);
    return null;
  }
};

const decrypt = (encryptedToken) => {
  try {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), IV);
    let decrypted = decipher.update(encryptedToken, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    const decoded = jwt.verify(decrypted, JWT_SECRET);

    console.log('✅ Token Decrypted & Verified Successfully');
    return decoded;
  } catch (error) {
    console.error('❌ Decryption or Verification Error:', error);
    return null;
  }
};

module.exports = {
  encrypt,
  decrypt
};