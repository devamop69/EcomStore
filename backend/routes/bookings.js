import express from 'express';
import {
  createBooking,
  getAvailableSlots,
  getAllBookings,
  updateBookingStatus
} from '../controllers/bookingController.js';

const router = express.Router();

// Create a new booking
router.post('/', createBooking);

// Get available slots for a date
router.get('/available-slots', getAvailableSlots);

// Get all bookings (admin only)
router.get('/', getAllBookings);

// Update booking status (admin only)
router.put('/:id/status', updateBookingStatus);

export default router;
