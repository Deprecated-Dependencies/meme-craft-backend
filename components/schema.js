'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const memeSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  box_count: { type: [], required: true },
});

const Meme = mongoose.model('Meme', memeSchema);

module.exports = Meme;
