const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Game', 'Console', 'Accessory']
  },
  imageUrl: {
    type: String,
    required: true
  },
  stockCount: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});
