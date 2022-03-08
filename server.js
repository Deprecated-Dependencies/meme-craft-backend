'use strict';

require('dotenv').config();
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());

mongoose.connect(process.env.DATABASE_URL);


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});


app.use(express.json());

const PORT = process.env.PORT || 3002;

app.get('/memes', getMemes);


async function getMemes(req, res) {
  try{
    let memeURL =  `https://api.imgflip.com/get_memes`;
    let memeResult = await axios.get(memeURL);
    res.status(200).send(memeResult.data);
  }catch(error) {
    res.status(500).send(error.message);
  }
}



app.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`server up on ${PORT}`));
