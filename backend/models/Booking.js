const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true // in hours
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  totalPrice: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
