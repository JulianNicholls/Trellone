const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  text: { type: String, required: true },
  order: Number,
  archived: { type: Boolean, default: false },
  ownerId: mongoose.Schema.Types.ObjectId,
  boardId: mongoose.Schema.Types.ObjectId,
  listId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Card', cardSchema);
