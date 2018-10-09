const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  order: Number,
  boardId: mongoose.Schema.Types.ObjectId,
  archived: {type: Boolean, default: false}
});

module.exports = mongoose.model('List', listSchema);
