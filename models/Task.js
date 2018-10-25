const { Schema } = require('mongoose');

const taskSchema = new Schema({
  text: { type: String, required: true },
  order: Number,
  archived: { type: Boolean, default: false }
});

module.exports = taskSchema;
