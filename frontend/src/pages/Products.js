import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
  CardMedia,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  SportsEsports as GamepadIcon,
  VideogameAsset as GameControllerIcon,
} from '@mui/icons-material';
import { addToCart } from '../redux/cartSlice';
import { useAuth } from '../context/AuthContext';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const cartItems = useSelector((state) => state.cart.items);
  const [products, setProducts] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    // Simulated products data
    setProducts([
      {
        id: 1,
        name: 'Pro Gaming Mouse',
        price: 2999,
        description: 'High-precision gaming mouse with RGB lighting and 16000 DPI',
        features: ['16000 DPI', 'RGB Lighting', 'Programmable Buttons']
      },
      {
        id: 2,
        name: 'Mechanical Keyboard',
        price: 4999,
        description: 'RGB mechanical gaming keyboard with Cherry MX switches',
        features: ['Cherry MX Blue', 'RGB Backlight', 'N-Key Rollover']
      },
      {
        id: 3,
        name: 'Gaming Headset',
        price: 3499,
        description: '7.1 surround sound gaming headset with noise-canceling mic',
        features: ['7.1 Surround', 'Noise Canceling', 'RGB Lighting']
      },
      {
        id: 4,
        name: 'Gaming Chair',
        price: 15999,
        description: 'Ergonomic gaming chair with lumbar support and adjustable armrests',
        features: ['Lumbar Support', 'Adjustable Arms', 'Reclining']
      },
      {
        id: 5,
        name: 'Gaming Monitor',
        price: 29999,
        description: '27" 1440p gaming monitor with 165Hz refresh rate and 1ms response time',
        features: ['165Hz', '1ms Response', 'G-Sync Compatible']
      },
      {
        id: 6,
        name: 'Gaming Console',
        price: 49999,
        description: 'Next-gen gaming console with 4K gaming and ray tracing support',
        features: ['4K Gaming', 'Ray Tracing', '120 FPS Support']
      }
    ]);
  }, []);

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
    dispatch(addToCart(product));
    setShowSnackbar(true);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        pt: { xs: 12, md: 20 },
        pb: 4,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
          backgroundSize: '15px 15px',
          opacity: 0.5,
          pointerEvents: 'none',
        }
      }}
    >
      {user ? (
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                color: '#fff',
                fontWeight: 700,
                textShadow: '0 0 20px rgba(0, 255, 163, 0.3)',
                fontFamily: 'Orbitron',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                mt: { xs: 4, md: 0 }
              }}
            >
              <GamepadIcon sx={{ color: '#00ffa3' }} />
              Gaming Products
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'rgba(22, 28, 36, 0.8)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    }
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      pt: '60%', // 3:5 aspect ratio
                      background: 'linear-gradient(45deg, rgba(0,255,163,0.1), rgba(3,225,255,0.1))',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <GameControllerIcon
                        sx={{
                          fontSize: 80,
                          color: 'rgba(255, 255, 255, 0.2)',
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      p: 2,
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        color: '#fff',
                        fontFamily: 'Orbitron',
                        fontWeight: 600
                      }}
                    >
                      {product.name}
                    </Typography>
                  </Box>
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        mb: 2
                      }}
                    >
                      {product.description}
                    </Typography>
                    <Box sx={{ mb: 'auto' }}>
                      {product.features.map((feature, index) => (
                        <Typography
                          key={index}
                          variant="caption"
                          component="span"
                          sx={{
                            mr: 1,
                            mb: 1,
                            display: 'inline-block',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            background: 'rgba(0, 255, 163, 0.1)',
                            color: '#00ffa3',
                            border: '1px solid rgba(0, 255, 163, 0.2)',
                          }}
                        >
                          {feature}
                        </Typography>
                      ))}
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 3,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#00ffa3',
                          fontWeight: 600,
                          textShadow: '0 0 10px rgba(0, 255, 163, 0.3)',
                        }}
                      >
                        ₹{product.price.toLocaleString()}
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => handleAddToCart(product)}
                        startIcon={<ShoppingCartIcon />}
                        sx={{
                          background: 'linear-gradient(45deg, #00ffa3, #03e1ff)',
                          color: '#000',
                          fontWeight: 600,
                          '&:hover': {
                            background: 'linear-gradient(45deg, #03e1ff, #00ffa3)',
                          }
                        }}
                      >
                        Add to Cart
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Snackbar
            open={showSnackbar}
            autoHideDuration={3000}
            onClose={() => setShowSnackbar(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert
              onClose={() => setShowSnackbar(false)}
              severity="success"
              sx={{
                background: 'rgba(22, 28, 36, 0.8)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#fff',
                '& .MuiAlert-icon': {
                  color: '#00ffa3'
                }
              }}
            >
              Product added to cart!
            </Alert>
          </Snackbar>
        </Container>
      ) : null}
    </Box>
  );
};

export default Products;
