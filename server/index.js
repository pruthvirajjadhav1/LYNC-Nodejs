const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.json());
require('dotenv').config();

mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log(`CONNECTED TO DB`))
    .catch((error) => {
      console.log(`DB NOT COONECTED`);
      console.log(error);
      process.exit(1);
    });


const authRoutes = require('./routes/authRoutes');
const webhookRoutes = require('./routes/webhookRoutes');

app.get("/",(req,res)=>{
  res.status(200).json("Working fine");
})

app.use('/auth', authRoutes);
app.use('/webhook', webhookRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
