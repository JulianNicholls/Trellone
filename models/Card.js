const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  text: { type: String, required: true },
  order: Number,
  listId: mongoose.Schema.Types.ObjectId,
  archived: { type: Boolean, default: false }
});

module.exports = mongoose.model('Card', cardSchema);
