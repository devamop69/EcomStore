import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  MenuItem,
  Badge,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon,
  SportsEsports as GamepadIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.length;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
    handleCloseUserMenu();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: 'rgba(22, 28, 36, 0.8)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <GamepadIcon 
            sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              mr: 1,
              color: '#00ffa3'
            }} 
          />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Orbitron',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: '#fff',
              textDecoration: 'none',
              '&:hover': {
                color: '#00ffa3',
              },
            }}
          >
            GAMING SHOP
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: '#fff' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  background: 'rgba(22, 28, 36, 0.95)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <MenuItem 
                onClick={() => {
                  handleCloseNavMenu();
                  navigate('/booking');
                }}
                sx={{ 
                  color: '#fff',
                  '&:hover': { color: '#00ffa3' }
                }}
              >
                <Typography textAlign="center">Book a Slot</Typography>
              </MenuItem>
              <MenuItem 
                onClick={() => {
                  handleCloseNavMenu();
                  navigate('/products');
                }}
                sx={{ 
                  color: '#fff',
                  '&:hover': { color: '#00ffa3' }
                }}
              >
                <Typography textAlign="center">Products</Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <GamepadIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: '#00ffa3' }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Orbitron',
              fontWeight: 700,
              letterSpacing: '.1rem',
              fontSize: { xs: '1rem', sm: '1.25rem' },
              color: '#fff',
              textDecoration: 'none',
              '&:hover': {
                color: '#00ffa3',
              },
            }}
          >
            GAMING SHOP
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={() => navigate('/booking')}
              sx={{
                my: 2,
                color: '#fff',
                display: 'block',
                '&:hover': {
                  color: '#00ffa3',
                },
              }}
            >
              Book a Slot
            </Button>
            <Button
              onClick={() => navigate('/products')}
              sx={{
                my: 2,
                color: '#fff',
                display: 'block',
                '&:hover': {
                  color: '#00ffa3',
                },
              }}
            >
              Products
            </Button>
          </Box>

          {/* Cart & User Menu */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 2 }}>
            {user && (
              <IconButton 
                onClick={() => navigate('/cart')}
                sx={{ 
                  color: '#fff',
                  '&:hover': {
                    color: '#00ffa3',
                  }
                }}
              >
                <Badge 
                  badgeContent={cartItemCount} 
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#00ffa3',
                      color: '#000',
                    }
                  }}
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            )}

            {user ? (
              <>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: '#00ffa3',
                      color: '#000',
                      fontFamily: 'Orbitron',
                      fontWeight: 600,
                    }}
                  >
                    {user.email[0].toUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu
                  sx={{
                    mt: '45px',
                    '& .MuiPaper-root': {
                      background: 'rgba(22, 28, 36, 0.95)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    },
                  }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem 
                    onClick={handleLogout}
                    sx={{ 
                      color: '#fff',
                      '&:hover': { color: '#00ffa3' }
                    }}
                  >
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                component={RouterLink}
                to="/login"
                sx={{
                  color: '#fff',
                  borderColor: '#00ffa3',
                  '&:hover': {
                    borderColor: '#03e1ff',
                    backgroundColor: 'rgba(0, 255, 163, 0.1)',
                  },
                }}
                variant="outlined"
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
