import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = `${__dirname}/../data/bookings.json`;

const readDB = () => {
  const data = fs.readFileSync(dbPath);
  return JSON.parse(data);
};

const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public
const createBooking = async (req, res) => {
  try {
    const { name, email, phone, date, timeSlot } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !date || !timeSlot) {
      res.status(400);
      throw new Error('Please fill in all fields');
    }

    const db = readDB();
    
    // Check if slot is already booked
    const isSlotBooked = db.bookings.some(
      (booking) => booking.date === date && booking.timeSlot === timeSlot
    );

    if (isSlotBooked) {
      res.status(400);
      throw new Error('This time slot is already booked');
    }

    const newBooking = {
      _id: Date.now().toString(),
      name,
      email,
      phone,
      date,
      timeSlot,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    db.bookings.push(newBooking);
    writeDB(db);

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    res.json({
      message: error.message || 'Something went wrong',
    });
  }
};

// @desc    Get available slots for a date
// @route   GET /api/bookings/available-slots
// @access  Public
const getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      res.status(400);
      throw new Error('Please provide a date');
    }

    const db = readDB();
    const bookedSlots = db.bookings
      .filter((booking) => booking.date === date)
      .map((booking) => booking.timeSlot);

    const allTimeSlots = [
      '10:00 AM - 12:00 PM',
      '12:00 PM - 2:00 PM',
      '2:00 PM - 4:00 PM',
      '4:00 PM - 6:00 PM',
      '6:00 PM - 8:00 PM',
      '8:00 PM - 10:00 PM'
    ];

    const availableSlots = allTimeSlots.filter(
      (slot) => !bookedSlots.includes(slot)
    );

    res.json(availableSlots);
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    res.json({
      message: error.message || 'Something went wrong',
    });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
const getAllBookings = async (req, res) => {
  try {
    const db = readDB();
    res.json(db.bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Something went wrong',
    });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      res.status(400);
      throw new Error('Please provide a status');
    }

    const db = readDB();
    const booking = db.bookings.find((b) => b._id === id);

    if (!booking) {
      res.status(404);
      throw new Error('Booking not found');
    }

    booking.status = status;
    writeDB(db);

    res.json(booking);
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    res.json({
      message: error.message || 'Something went wrong',
    });
  }
};

export { createBooking, getAvailableSlots, getAllBookings, updateBookingStatus };
