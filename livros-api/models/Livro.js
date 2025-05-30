const mongoose = require('mongoose');

const LivroSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  favorite: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Livro', LivroSchema);
