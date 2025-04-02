import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookings: [],
  availableSlots: [],
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    fetchBookingsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBookingsSuccess: (state, action) => {
      state.loading = false;
      state.bookings = action.payload;
      state.error = null;
    },
    fetchBookingsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setAvailableSlots: (state, action) => {
      state.availableSlots = action.payload;
    },
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
    },
    updateBookingStatus: (state, action) => {
      const { id, status } = action.payload;
      const booking = state.bookings.find(b => b._id === id);
      if (booking) {
        booking.status = status;
      }
    },
  },
});

export const {
  fetchBookingsStart,
  fetchBookingsSuccess,
  fetchBookingsFailure,
  setAvailableSlots,
  addBooking,
  updateBookingStatus,
} = bookingSlice.actions;

export default bookingSlice.reducer;
