const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  backgroundURL: String,
  ownerId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Board', boardSchema);
