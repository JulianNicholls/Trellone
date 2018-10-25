const mongoose = require('mongoose');
const taskSchema = require('./Task');

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  order: Number,
  boardId: mongoose.Schema.Types.ObjectId,
  archived: { type: Boolean, default: false },
  tasks: [taskSchema]
});

module.exports = mongoose.model('List', listSchema);
