'use strict';

require('dotenv').config();
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());

// Require in the verifyUser function from auth.js
const verifyUser = require('./auth.js');

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const Meme = require('./components/schema');

app.use(express.json());

const PORT = process.env.PORT || 3002;

app.get('/memes', getMemesAPI);
app.get('/memesDB', getMemesDB);
app.post('/memes', postMemesDB);
app.delete('/memes/:id', deleteMemesDB);
app.put('/memes/:id', putMemesDB);

app.get('/token', getToken);

async function getToken(req, res, next){

  verifyUser(req, async (err, user) => { // eslint-disable-line
    if(err) {
      console.error(err);
      res.send('Invalid token');
    } else {
      try {
        console.log('user authenticated');
        res.status(200).send('Authenticated');
      } catch (error) {
        next(error);
      }
    }
  });
}

async function getMemesAPI(req, res, next) {
  try {
    let memeURL = `https://api.imgflip.com/get_memes`;
    let memeResult = await axios.get(memeURL);
    res.status(200).send(memeResult.data);
  } catch (error) {
    next(error);
  }
}

async function getMemesDB(req, res, next) {
  try {
    let queryObject = {};
    if (req.query.name) {
      queryObject.name = req.query.name;
    }
    let results = await Meme.find(queryObject);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
}

async function postMemesDB(req, res, next) {
  try {
    let createdMeme = await Meme.create(req.body);
    res.status(200).send(createdMeme);
  } catch (error) {
    next(error);
  }
}

async function deleteMemesDB(req, res, next) {
  try {
    let id = req.params.id;
    await Meme.findByIdAndDelete(id);
    res.status(200).send('Meme deleted');
  } catch (error) {
    next(error);
  }
}

async function putMemesDB(req, res, next) {
  try {
    let id = req.params.id;
    let updateMeme = await Meme.findByIdAndUpdate(id, req.body, {
      new: true,
      overwrite: true,
    });
    res.status(200).send(updateMeme);
  } catch (error) {
    next(error);
  }
}

app.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.use((error, req, res, next) => { // eslint-disable-line
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`server up on ${PORT}`));
