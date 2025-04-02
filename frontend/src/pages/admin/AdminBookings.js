import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Alert,
  Box,
  Chip,
} from '@mui/material';
import { format } from 'date-fns';
import { getAllBookings, updateBookingStatus } from '../../services/api';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await getAllBookings();
      setBookings(data);
    } catch (error) {
      setError('Failed to fetch bookings');
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateBookingStatus(id, newStatus);
      setSuccess('Booking status updated successfully');
      fetchBookings();
    } catch (error) {
      setError('Failed to update booking status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'confirmed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Manage Bookings
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell>
                  {format(new Date(booking.date), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell>{booking.startTime}</TableCell>
                <TableCell>{booking.duration} hours</TableCell>
                <TableCell>
                  {booking.user.name}
                  <br />
                  <Typography variant="caption" color="textSecondary">
                    {booking.user.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={booking.status.toUpperCase()}
                    color={getStatusColor(booking.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {booking.status === 'pending' && (
                      <>
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          onClick={() =>
                            handleStatusUpdate(booking._id, 'confirmed')
                          }
                        >
                          Confirm
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          color="error"
                          onClick={() =>
                            handleStatusUpdate(booking._id, 'cancelled')
                          }
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                    {booking.status === 'confirmed' && (
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() =>
                          handleStatusUpdate(booking._id, 'cancelled')
                        }
                      >
                        Cancel
                      </Button>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AdminBookings;
