const crypto = require('crypto');

const generateKeyPair = () => {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
  });
  return { privateKey, publicKey };
};

const verifySignature = (publicKey, signature, message) => {
  const verify = crypto.createVerify('RSA-SHA256');
  verify.update(message);
  return verify.verify(publicKey, signature, 'base64');
};

module.exports = {
  generateKeyPair,
  verifySignature,
};
