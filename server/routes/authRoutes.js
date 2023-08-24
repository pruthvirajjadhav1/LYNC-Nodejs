const express = require('express');
const router = express.Router();
const { generateKeyPair, verifySignature } = require('../utils/cryptoUtils');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const { username } = req.body;
  const { publicKey, privateKey } = generateKeyPair();
  
  try {
    const user = new User({ username, publicKey });
    await user.save();
    res.json({ publicKey });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

router.post('/authenticate', async (req, res) => {
  const { username, signature, message } = req.body;

  try {
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isVerified = verifySignature(user.publicKey, signature, message);
    
    if (isVerified) {
      return res.json({ message: 'Authentication successful' });
    } else {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error authenticating user' });
  }
});

module.exports = router;
