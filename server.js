'use strict';

require('dotenv').config();
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
//const FormData = require('form-data');

app.use(cors());

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
app.post('/memes', postMemesAPI);

app.get('/memeDB', getMemesDB);
app.post('/memeDB', postMemesDB);
app.delete('/memeDB/:id', deleteMemesDB);
app.put('/memeDB/:id', putMemesDB);

async function getMemesAPI(req, res, next) {
  try {
    let memeURL = `https://api.imgflip.com/get_memes`;
    let memeResult = await axios.get(memeURL);
    res.status(200).send(memeResult.data);
  } catch (error) {
    next(error);
  }
}

function postMemesAPI(req, response, next) {
  let bodyFormData = new URLSearchParams();
  bodyFormData.append('template_id', req.body.template_id);
  bodyFormData.append('username', process.env.API_USERNAME);
  bodyFormData.append('password', process.env.API_PASSWORD);
  bodyFormData.append('text0', 'AB');
  bodyFormData.append('text1', 'CD');
  req.body.boxes.map((box, index) => bodyFormData.append(`boxes[${index}][text]`, req.body.boxes[index].text));
  console.log(bodyFormData);
  axios({
    method: 'post',
    url: process.env.API_URL,
    data: bodyFormData,
    header: { 'Content-type': 'application/x-www-form-urlencoded' }
  }).then(res => {
    console.log(res);
    response.status(200).send(res.data);
  }).catch(error => {
    next(error);
  });
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

app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`server up on ${PORT}`));
