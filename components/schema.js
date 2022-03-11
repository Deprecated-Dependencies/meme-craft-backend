'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const memeSchema = new Schema({
  userName: { type: String, required: true },
  url: { type: String, required: true },
  page_url: {type: String, required: true},
  boxes: { type: [], required: true },
  template: {type: {}, required: true}
});

const Meme = mongoose.model('Meme', memeSchema);

module.exports = Meme;
