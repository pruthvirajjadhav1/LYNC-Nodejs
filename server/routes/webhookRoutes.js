const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const eventData = req.body;
  console.log('Received event:', eventData);

  // Perform actions based on the event data
  // You can send notifications or trigger other processes here

  res.sendStatus(200);
});

module.exports = router;
