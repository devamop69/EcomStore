import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from '@mui/material';
import {
  Dashboard,
  Inventory,
  EventSeat,
  ShoppingCart,
} from '@mui/icons-material';
import AdminProducts from './admin/AdminProducts';
import AdminBookings from './admin/AdminBookings';
import AdminOrders from './admin/AdminOrders';
import AdminOverview from './admin/AdminOverview';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState('overview');

  const menuItems = [
    { text: 'Overview', icon: <Dashboard />, path: '/admin', id: 'overview' },
    { text: 'Products', icon: <Inventory />, path: '/admin/products', id: 'products' },
    { text: 'Bookings', icon: <EventSeat />, path: '/admin/bookings', id: 'bookings' },
    { text: 'Orders', icon: <ShoppingCart />, path: '/admin/orders', id: 'orders' },
  ];

  const handleMenuClick = (path, id) => {
    setSelectedMenu(id);
    navigate(path);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, px: 2 }}>
              Admin Dashboard
            </Typography>
            <List>
              {menuItems.map((item) => (
                <ListItem
                  button
                  key={item.id}
                  selected={selectedMenu === item.id}
                  onClick={() => handleMenuClick(item.path, item.id)}
                  sx={{
                    borderRadius: 1,
                    mb: 1,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'white',
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: selectedMenu === item.id ? 'white' : 'inherit',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          <Box sx={{ width: '100%' }}>
            <Routes>
              <Route path="/" element={<AdminOverview />} />
              <Route path="/products" element={<AdminProducts />} />
              <Route path="/bookings" element={<AdminBookings />} />
              <Route path="/orders" element={<AdminOrders />} />
            </Routes>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
