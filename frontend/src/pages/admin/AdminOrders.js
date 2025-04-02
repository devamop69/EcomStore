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
  Collapse,
  IconButton,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { format } from 'date-fns';

// Note: Add these API functions to your api.js file
const OrderRow = ({ order, onStatusUpdate }) => {
  const [open, setOpen] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'processing':
        return 'info';
      case 'shipped':
        return 'primary';
      case 'delivered':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{order._id}</TableCell>
        <TableCell>
          {order.user.name}
          <br />
          <Typography variant="caption" color="textSecondary">
            {order.user.email}
          </Typography>
        </TableCell>
        <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
        <TableCell>
          <Chip
            label={order.status.toUpperCase()}
            color={getStatusColor(order.status)}
            size="small"
          />
        </TableCell>
        <TableCell>
          {format(new Date(order.createdAt), 'MMM dd, yyyy')}
        </TableCell>
        <TableCell>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {order.status === 'pending' && (
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => onStatusUpdate(order._id, 'processing')}
              >
                Process
              </Button>
            )}
            {order.status === 'processing' && (
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => onStatusUpdate(order._id, 'shipped')}
              >
                Ship
              </Button>
            )}
            {order.status === 'shipped' && (
              <Button
                size="small"
                variant="contained"
                color="success"
                onClick={() => onStatusUpdate(order._id, 'delivered')}
              >
                Mark Delivered
              </Button>
            )}
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order Details
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.orderItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.product.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        ${(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Shipping Address:</Typography>
                <Typography variant="body2">
                  {order.shippingAddress.address}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                  <br />
                  {order.shippingAddress.country}
                </Typography>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Add this API endpoint
      const response = await fetch('/api/orders/admin');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      setError('Failed to fetch orders');
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      // Add this API endpoint
      await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      setSuccess('Order status updated successfully');
      fetchOrders();
    } catch (error) {
      setError('Failed to update order status');
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Manage Orders
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
              <TableCell />
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <OrderRow
                key={order._id}
                order={order}
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AdminOrders;
